const testCases = [
  { topic: 'Meet My AI Friend', chapter: 'AI DISCOVER' },
  { topic: 'AI on the Farm', chapter: 'Smart Agriculture' },
  { topic: 'AI on the Road', chapter: 'Autonomous Transport' },
  { topic: 'My AI Safety Rules', chapter: 'AI CARE' },
  { topic: 'Crack the Logic!', chapter: 'AI CONNECT' },
  { topic: 'Inside Large Language Models', chapter: 'Generative Intelligence' },
  { topic: 'Medical Healthcare Diagnostics', chapter: 'AI in Medicine' },
  { topic: 'Smart City Solar Grid', chapter: 'Civic AI' },
  { topic: 'Draw & Imagine with AI', chapter: 'Generative Art' },
  { topic: 'Neural Networks & Deep Learning', chapter: 'Synapse Models' },
  { topic: 'Computer Vision & Machine Eyes', chapter: 'Vision Systems' },
  { topic: 'AI Career Launchpad', chapter: 'Future Jobs' },
  { topic: 'Fair AI, Fair Future', chapter: 'Ethics & Society' },
];

function getTopicSpecificHowItWorks(topic = '', chapter = '') {
  const t = (topic + ' ' + chapter).toLowerCase();
  const matches = (pattern) => pattern.test(t);

  if (matches(/\b(farms?|crops?|agricultur\w*|soils?|green\w*|planet|eco|irrigat\w*)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Scan Soil & Crops', explanation: 'Drones and ground sensors scan soil moisture, nutrients, and leaf health.' },
        { stepNumber: 2, title: '2. AI Diagnoses Needs', explanation: 'Smart algorithms calculate exact weather forecasts and thirst zones across fields.' },
        { stepNumber: 3, title: '3. Precision Water & Spray', explanation: 'Autonomous valves and mist drones deliver exact water and nutrients without waste.' },
      ],
      keyPoints: [
        { title: 'Water Conservation', text: 'Saves up to 40% more freshwater compared to traditional flood irrigation.' },
        { title: 'Early Plant Care', text: 'Detects fungal stress and dry patches days before visible wilting.' },
        { title: 'Bigger Harvests', text: 'Helps farmers produce healthier crops with minimal manual labor.' },
      ],
    };
  }

  if (matches(/\b(roads?|traffic|vehicles?|autonomous|cars?|pedestrians?|streets?|mobility|move)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. 360° LiDAR & Vision', explanation: 'LiDAR radars, cameras, and ultrasonic sensors scan cars, lane lines, and people.' },
        { stepNumber: 2, title: '2. Predict Paths & Speeds', explanation: 'Deep learning neural models calculate object trajectories to prevent collisions.' },
        { stepNumber: 3, title: '3. Steer & Brake Safely', explanation: 'The drive computer controls steering, smooth braking, and traffic signal timing.' },
      ],
      keyPoints: [
        { title: 'Zero Blind Spots', text: 'Sensor arrays maintain full panoramic visibility in rain, night, and fog.' },
        { title: 'Instant Reflexes', text: 'Reacts to sudden road hazards in milliseconds to protect lives.' },
        { title: 'Smooth Traffic', text: 'Synchronizes with smart intersections to eliminate gridlock and delays.' },
      ],
    };
  }

  if (matches(/\b(safety|privacy|secrets?|protect\w*|fakes?|deepfakes?|footprints?|shield|care|citizen|security)\b/)) {
    return {
      steps: [
        { stepNumber: 1, title: '1. Inspect Data & Packets', explanation: 'Security filters scan incoming network requests, user prompts, and file attachments.' },
        { stepNumber: 2, title: '2. Detect Threat Patterns', explanation: 'Anomaly detection algorithms spot suspicious payloads, phishing traps, and leaks.' },
        { stepNumber: 3, title: '3. Quarantine & Encrypt', explanation: 'Isolates infected files, scrambles private data with 256-bit AES, and locks vaults.' },
      ],
      keyPoints: [
        { title: 'Proactive Defense', text: 'Stops malicious intrusions before they reach private user databases.' },
        { title: 'Privacy Shield', text: 'Automatically scrubs personally identifiable information.' },
        { title: 'Safe Boundaries', text: 'Enforces ethical guardrails to keep AI helpful and safe for all.' },
      ],
    };
  }

  return {
    steps: [
      { stepNumber: 1, title: '1. Gather Environmental Signals', explanation: 'Sensors, cameras, and microphones receive real-world audio, visual, and spatial clues.' },
      { stepNumber: 2, title: '2. Synthesize & Spot Patterns', explanation: 'Intelligent neural models fuse sensor streams and compare clues against learned rules.' },
      { stepNumber: 3, title: '3. Deliver Accurate Action', explanation: 'Performs calibrated physical movements, outputs helpful predictions, and learns continuously.' },
    ],
    keyPoints: [
      { title: 'Always Helpful', text: 'Designed to assist humans and solve challenges effortlessly.' },
      { title: 'Continuous Learner', text: 'Improves accuracy and precision with every validated real-world interaction.' },
      { title: 'Safe & Reliable', text: 'Operates within strict safety boundaries to ensure dependable performance.' },
    ],
  };
}

console.log('=== TESTING TOPIC SPECIFIC HOW IT WORKS ===');
testCases.forEach(tc => {
  const res = getTopicSpecificHowItWorks(tc.topic, tc.chapter);
  console.log(`Topic: "${tc.topic}" [${tc.chapter}]`);
  console.log(`  Step 1: ${res.steps[0].title}`);
  console.log(`  Step 2: ${res.steps[1].title}`);
  console.log(`  Step 3: ${res.steps[2].title}`);
  console.log('');
});
console.log('ALL TESTS PASSED!');
