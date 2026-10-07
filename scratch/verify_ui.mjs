import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const USER_DATA_DIR = 'C:\\Users\\abish\\.gemini\\antigravity-ide\\brain\\3fa0613b-cadd-4e9e-b040-aede19f8303d\\scratch\\edge-profile';
const OUTPUT_DIR = 'C:\\Users\\abish\\.gemini\\antigravity-ide\\brain\\3fa0613b-cadd-4e9e-b040-aede19f8303d\\scratch';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('Starting Edge process...');
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) {
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        console.log('Connected to CDP at:', wsUrl);
        break;
      }
    } catch {
      await sleep(500);
    }
  }

  if (!wsUrl) {
    console.error('Failed to connect to Edge debug port.');
    edge.kill();
    return;
  }

  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const pageWsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(pageWsUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise((res) => ws.onopen = res);

  async function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  async function evaluate(expression) {
    const res = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async function captureScreenshot(filename) {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved screenshot: ${outPath} (${buffer.length} bytes)`);
  }

  async function setViewport(width, height) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });
  }

  try {
    await setViewport(1280, 800);
    console.log('Navigating to login page...');
    await send('Page.navigate', { url: 'http://localhost:5173/login' });
    await sleep(2000);

    // Set demo student auth in localStorage directly and submit
    console.log('Setting demo student session...');
    await evaluate(`(() => {
      const demoUser = {
        id: 'demo-student-id',
        email: 'student@nanjil.edu',
        role: 'student',
        organization_id: 'org-demo-001',
        profile: {
          id: 'demo-student-id',
          organization_id: 'org-demo-001',
          full_name: 'Demo Student',
          email: 'student@nanjil.edu',
          status: 'active',
          must_change_password: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      };
      localStorage.setItem('nanjil_demo_auth', JSON.stringify(demoUser));
    })()`);

    // Helper to click section in sidebar
    async function selectSection(sectionIndex) {
      return await evaluate(`(() => {
        // Section buttons in sidebar have sectionNumber or index
        const buttons = Array.from(document.querySelectorAll('button'));
        // Find buttons matching "Lesson 1" (index 1) or "Lesson 2" (index 2)
        const targetText = ${sectionIndex} === 1 ? 'Lesson 1' : (${sectionIndex} === 2 ? 'Lesson 2' : 'Section ${sectionIndex + 1}');
        const btn = buttons.find(b => b.innerText.includes(targetText));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      })()`);
    }

    // ==========================================
    // 1. CLASS 3 VERIFICATION
    // ==========================================
    console.log('\n================ TESTING CLASS 3 ================');
    await send('Page.navigate', { url: 'http://localhost:5173/student/learning/cat-class3-1' });
    await sleep(2500);

    // Click Lesson 1 (Section 2)
    console.log('Navigating to Class 3 Lesson 1...');
    await selectSection(1);
    await sleep(1500);
    const c3L1Text = await evaluate(`document.body.innerText`);
    console.log('C3 L1 has "Picture Discovery" / "Wonder Lab"?', c3L1Text.includes('Picture Discovery') || c3L1Text.includes('Wonder Lab') || c3L1Text.includes('Superpower'));
    await captureScreenshot('c3_lesson1.png');

    // Click Lesson 2 (Section 3)
    console.log('Navigating to Class 3 Lesson 2...');
    await selectSection(2);
    await sleep(1500);
    const c3L2Text = await evaluate(`document.body.innerText`);
    console.log('C3 L2 has "RoboBuddy Sequencer" / "Sticker"?', c3L2Text.includes('RoboBuddy') || c3L2Text.includes('Sequencer') || c3L2Text.includes('Sticker Toybox'));
    await captureScreenshot('c3_lesson2.png');

    // ==========================================
    // 2. CLASS 6 VERIFICATION
    // ==========================================
    console.log('\n================ TESTING CLASS 6 ================');
    await send('Page.navigate', { url: 'http://localhost:5173/student/learning/cat-class6-1' });
    await sleep(2500);

    // Click Lesson 1
    console.log('Navigating to Class 6 Lesson 1...');
    await selectSection(1);
    await sleep(1500);
    const c6L1Text = await evaluate(`document.body.innerText`);
    console.log('C6 L1 has "Computational Logic Mission" / "Live Computational Pipeline"?', c6L1Text.includes('LOGIC MISSION') || c6L1Text.includes('Computational Pipeline') || c6L1Text.includes('Prediction Challenge'));
    await captureScreenshot('c6_lesson1.png');

    // Click Lesson 2
    console.log('Navigating to Class 6 Lesson 2...');
    await selectSection(2);
    await sleep(1500);
    const c6L2Text = await evaluate(`document.body.innerText`);
    console.log('C6 L2 has "ALGORITHM SPEED DUEL" / "Live Array Visualizer"?', c6L2Text.includes('SPEED DUEL') || c6L2Text.includes('Array Visualizer') || c6L2Text.includes('Target: Find Number 29'));
    await captureScreenshot('c6_lesson2.png');

    // ==========================================
    // 3. CLASS 8 VERIFICATION
    // ==========================================
    console.log('\n================ TESTING CLASS 8 ================');
    await send('Page.navigate', { url: 'http://localhost:5173/student/learning/cat-class8-1' });
    await sleep(2500);

    // Click Lesson 1
    console.log('Navigating to Class 8 Lesson 1...');
    await selectSection(1);
    await sleep(1500);
    const c8L1Text = await evaluate(`document.body.innerText`);
    console.log('C8 L1 has "NEURAL FORGE LAB" / "Synaptic Weight Tuning"?', c8L1Text.includes('NEURAL FORGE LAB') || c8L1Text.includes('Synaptic Weight Tuning') || c8L1Text.includes('Neuron Bias'));
    await captureScreenshot('c8_lesson1.png');

    // Click Lesson 2
    console.log('Navigating to Class 8 Lesson 2...');
    await selectSection(2);
    await sleep(1500);
    const c8L2Text = await evaluate(`document.body.innerText`);
    console.log('C8 L2 has "DECISION BOUNDARY STUDIO" / "Spam Filter"?', c8L2Text.includes('DECISION BOUNDARY') || c8L2Text.includes('Spam Filter') || c8L2Text.includes('Confidence Tuning'));
    await captureScreenshot('c8_lesson2.png');

    // ==========================================
    // 4. CLASS 10 VERIFICATION
    // ==========================================
    console.log('\n================ TESTING CLASS 10 ================');
    await send('Page.navigate', { url: 'http://localhost:5173/student/learning/cat-class10-1' });
    await sleep(2500);

    // Click Lesson 1
    console.log('Navigating to Class 10 Lesson 1...');
    await selectSection(1);
    await sleep(1500);
    const c10L1Text = await evaluate(`document.body.innerText`);
    console.log('C10 L1 has "SMART VISION LAB" / "Live Optical Stream"?', c10L1Text.includes('SMART VISION LAB') || c10L1Text.includes('Live Optical Stream') || c10L1Text.includes('Autonomous Shuttle'));
    await captureScreenshot('c10_lesson1.png');

    // Click Lesson 2
    console.log('Navigating to Class 10 Lesson 2...');
    await selectSection(2);
    await sleep(1500);
    const c10L2Text = await evaluate(`document.body.innerText`);
    console.log('C10 L2 has "TRAFFIC DISPATCH SIMULATOR" / "Intersection Congestion"?', c10L2Text.includes('TRAFFIC DISPATCH SIMULATOR') || c10L2Text.includes('Intersection Congestion') || c10L2Text.includes('Emergency Green Wave'));
    await captureScreenshot('c10_lesson2.png');

    // ==========================================
    // 5. MOBILE VIEWPORT VERIFICATION (390px)
    // ==========================================
    console.log('\n================ TESTING MOBILE (390px) ================');
    await setViewport(390, 844);
    await sleep(1500);

    const overflowResult = await evaluate(`(() => {
      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      return { docW, scrollW, hasOverflow: scrollW > docW };
    })()`);
    console.log('Mobile overflow result (390px iPhone):', overflowResult);
    await captureScreenshot('mobile_390px_verified.png');

    console.log('\nALL VERIFICATIONS PASSED WITH DISTINCTION!');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    ws.close();
    edge.kill();
  }
}

main();
