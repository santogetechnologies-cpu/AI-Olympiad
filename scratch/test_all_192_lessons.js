// Validation script for checking all 16 levels, 96 chapters, and 192 lesson topics

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userSyllabus = [
  {
    grade: 'CLASS 3',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Meet My AI Friend', 'Machines That Help Us'] },
      { name: 'AI CONNECT', topics: ['Give Me a Command!', 'Put It in Order!'] },
      { name: 'AI SOLVE', topics: ['AI Goes to School', 'AI Comes Home'] },
      { name: 'AI RISE', topics: ['When I Grow Up', 'People Behind Technology'] },
      { name: 'AI CREATE', topics: ['Ask & Explore', 'Draw & Imagine'] },
      { name: 'AI CARE', topics: ['My AI Safety Rules', 'Share with Care'] }
    ]
  },
  {
    grade: 'CLASS 4',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Where Is AI Hiding?', 'Meet the Smart Machines'] },
      { name: 'AI CONNECT', topics: ['Say It Clearly!', 'Mission: Instructions'] },
      { name: 'AI SOLVE', topics: ['AI in My Mobile', 'AI on the Move'] },
      { name: 'AI RISE', topics: ['Future Job Hunt', 'My Technology Talent'] },
      { name: 'AI CREATE', topics: ['Create a Story', 'Design with AI'] },
      { name: 'AI CARE', topics: ['Secret or Share?', 'AI: Right or Wrong?'] }
    ]
  },
  {
    grade: 'CLASS 5',
    chapters: [
      { name: 'AI DISCOVER', topics: ['The Secret Behind AI', 'Learning Machines'] },
      { name: 'AI CONNECT', topics: ['Crack the Logic!', 'Command to Creation'] },
      { name: 'AI SOLVE', topics: ['AI in the Hospital', 'AI in the Classroom'] },
      { name: 'AI RISE', topics: ['My Future with AI', 'Skills of Tomorrow'] },
      { name: 'AI CREATE', topics: ['AI Study Buddy', 'AI Creative Corner'] },
      { name: 'AI CARE', topics: ['Can AI Be Wrong?', 'Be a Smart AI User'] }
    ]
  },
  {
    grade: 'CLASS 6',
    chapters: [
      { name: 'AI DISCOVER', topics: ['How Machines Get Smart', 'Learning from Examples'] },
      { name: 'AI CONNECT', topics: ['Think → Plan → Code', 'Coding Made Friendly'] },
      { name: 'AI SOLVE', topics: ['AI on the Road', 'AI on the Farm'] },
      { name: 'AI RISE', topics: ['Explore Tech Careers', 'Discover Your Skills'] },
      { name: 'AI CREATE', topics: ['AI Learning Lab', 'Create with AI'] },
      { name: 'AI CARE', topics: ['Protect Your Data', 'Think Before You Trust'] }
    ]
  },
  {
    grade: 'CLASS 7',
    chapters: [
      { name: 'AI DISCOVER', topics: ['AI Learns from Data', 'Patterns Make It Smart'] },
      { name: 'AI CONNECT', topics: ['Hello, Python!', 'Code Your First Idea'] },
      { name: 'AI SOLVE', topics: ['AI in Money Matters', 'AI for a Greener World'] },
      { name: 'AI RISE', topics: ['Career Compass: AI', 'Skills That Matter'] },
      { name: 'AI CREATE', topics: ['AI Content Creator', 'AI Learning Assistant'] },
      { name: 'AI CARE', topics: ['Fact, Fake or AI?', 'Fairness Matters'] }
    ]
  },
  {
    grade: 'CLASS 8',
    chapters: [
      { name: 'AI DISCOVER', topics: ['How AI Makes Choices', 'Learning from Data'] },
      { name: 'AI CONNECT', topics: ['Python Playground', 'Code a Solution'] },
      { name: 'AI SOLVE', topics: ['AI for Better Health', 'AI for Better Cities'] },
      { name: 'AI RISE', topics: ['Find Your Future Path', 'AI Career Discovery'] },
      { name: 'AI CREATE', topics: ['Build with GenAI', 'AI Media Studio'] },
      { name: 'AI CARE', topics: ['Deepfake Alert!', 'Your Data, Your Right'] }
    ]
  },
  {
    grade: 'CLASS 9',
    chapters: [
      { name: 'AI DISCOVER', topics: ['From Data to Intelligence', 'Machines That Predict'] },
      { name: 'AI CONNECT', topics: ['Python in Action', 'Solve It with Code'] },
      { name: 'AI SOLVE', topics: ['AI for Our Planet', 'AI for Public Good'] },
      { name: 'AI RISE', topics: ['Design Your AI Future', 'Skill-to-Career Map'] },
      { name: 'AI CREATE', topics: ['AI Research Room', 'AI Creator Studio'] },
      { name: 'AI CARE', topics: ['Think Before You Believe', 'Digital Footprints & AI'] }
    ]
  },
  {
    grade: 'CLASS 10',
    chapters: [
      { name: 'AI DISCOVER', topics: ['How AI Thinks with Data', 'Generative AI Uncovered'] },
      { name: 'AI CONNECT', topics: ['AI-Assisted Coding', 'Code → Test → Improve'] },
      { name: 'AI SOLVE', topics: ['AI at Work', 'AI Solving Real Problems'] },
      { name: 'AI RISE', topics: ['Your Road to an AI Career', 'AI Skills Beyond School'] },
      { name: 'AI CREATE', topics: ['AI Productivity Booster', 'Create Your AI Project'] },
      { name: 'AI CARE', topics: ['Original or AI-Made?', "Use AI, Don't Misuse AI"] }
    ]
  },
  {
    grade: 'CLASS 11',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Inside Intelligent Machines', 'Predict, Learn & Improve'] },
      { name: 'AI CONNECT', topics: ['Python for Smart Solutions', 'The Art of Prompting'] },
      { name: 'AI SOLVE', topics: ['AI Powers Innovation', 'AI Across Industries'] },
      { name: 'AI RISE', topics: ['AI Career Universe', 'Create Your Career Blueprint'] },
      { name: 'AI CREATE', topics: ['AI Research Desk', 'AI Creation Studio'] },
      { name: 'AI CARE', topics: ['Fair AI Challenge', 'Privacy in an AI World'] }
    ]
  },
  {
    grade: 'CLASS 12',
    chapters: [
      { name: 'AI DISCOVER', topics: ['The World of Generative AI', 'Understanding LLMs'] },
      { name: 'AI CONNECT', topics: ['Prompt → Plan → Produce', 'AI Workflow Basics'] },
      { name: 'AI SOLVE', topics: ['AI for Innovation', 'AI for Enterprise'] },
      { name: 'AI RISE', topics: ['Your AI Career Launchpad', 'Build Your Professional Profile'] },
      { name: 'AI CREATE', topics: ['AI Assistant Lab', 'AI Project Studio'] },
      { name: 'AI CARE', topics: ['Verify Before You Trust', 'Humans Behind AI Decisions'] }
    ]
  },
  {
    grade: 'UG 1st YEAR',
    chapters: [
      { name: 'AI DISCOVER', topics: ['AI Demystified', 'The Intelligence Behind Machines'] },
      { name: 'AI CONNECT', topics: ['Python + AI Starter', 'Prompt with Purpose'] },
      { name: 'AI SOLVE', topics: ['AI in the Real World', 'AI in Your Profession'] },
      { name: 'AI RISE', topics: ['Navigate the AI Job World', 'Build Your AI Skillset'] },
      { name: 'AI CREATE', topics: ['AI Workbench', 'AI Coding Companion'] },
      { name: 'AI CARE', topics: ['Responsible Digital Intelligence', 'Data Privacy Matters'] }
    ]
  },
  {
    grade: 'UG 2nd YEAR',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Learning from Data', 'Making Machines Smarter'] },
      { name: 'AI CONNECT', topics: ['Program with AI', 'Data into Decisions'] },
      { name: 'AI SOLVE', topics: ['AI for Smarter Business', 'AI for Engineering Solutions'] },
      { name: 'AI RISE', topics: ['Pick Your AI Path', 'Portfolio to Profession'] },
      { name: 'AI CREATE', topics: ['AI Data Studio', 'Smart Automation Tools'] },
      { name: 'AI CARE', topics: ['Fair AI, Fair Future', 'Ownership in the AI Age'] }
    ]
  },
  {
    grade: 'UG 3rd YEAR',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Generative Intelligence', 'Inside LLMs'] },
      { name: 'AI CONNECT', topics: ['AI-Powered Development', 'Connect, Create & Automate'] },
      { name: 'AI SOLVE', topics: ['AI Automation at Work', 'AI for Innovation'] },
      { name: 'AI RISE', topics: ['Become Industry Ready', 'AI Opportunity Map'] },
      { name: 'AI CREATE', topics: ['Chatbot Builder', 'AI Automation Studio'] },
      { name: 'AI CARE', topics: ['Truth in the AI Era', 'Safe AI Systems'] }
    ]
  },
  {
    grade: 'UG FINAL YEAR',
    chapters: [
      { name: 'AI DISCOVER', topics: ['The Age of AI Agents', 'Intelligence at Scale'] },
      { name: 'AI CONNECT', topics: ['Build Smart Applications', 'Design AI Workflows'] },
      { name: 'AI SOLVE', topics: ['AI for Enterprise', 'AI for Start-ups'] },
      { name: 'AI RISE', topics: ['From Campus to AI Career', 'Idea to AI Venture'] },
      { name: 'AI CREATE', topics: ['AI Prototype Lab', 'Agent Builder Studio'] },
      { name: 'AI CARE', topics: ['Accountable AI', 'AI Governance Essentials'] }
    ]
  },
  {
    grade: 'PG 1st YEAR',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Modern Intelligence Explained', 'AI Beyond Automation'] },
      { name: 'AI CONNECT', topics: ['Develop with Intelligence', 'Design Smart Workflows'] },
      { name: 'AI SOLVE', topics: ['AI for Advanced Research', 'AI for Professional Innovation'] },
      { name: 'AI RISE', topics: ['AI Specialist Roadmap', 'Research to Profession'] },
      { name: 'AI CREATE', topics: ['AI Research Workbench', 'Intelligent Prototype Lab'] },
      { name: 'AI CARE', topics: ['Transparent AI', 'Trustworthy AI Systems'] }
    ]
  },
  {
    grade: 'PG FINAL YEAR',
    chapters: [
      { name: 'AI DISCOVER', topics: ['Frontiers of AI', 'Human + Machine Intelligence'] },
      { name: 'AI CONNECT', topics: ['Engineer Intelligent Solutions', 'AI System Thinking'] },
      { name: 'AI SOLVE', topics: ['AI for Transformation', 'AI for Breakthrough Innovation'] },
      { name: 'AI RISE', topics: ['Lead with AI', 'Research → Innovation → Enterprise'] },
      { name: 'AI CREATE', topics: ['Future AI Lab', 'Innovation to Prototype'] },
      { name: 'AI CARE', topics: ['AI & Society', 'Building AI for Humanity'] }
    ]
  }
];

console.log('Validating 16 Academic Grades x 6 Chapters = 96 Chapters, 192 Topics...');

let totalTopics = 0;
for (const grade of userSyllabus) {
  if (grade.chapters.length !== 6) {
    console.error(`Grade ${grade.grade} does not have 6 chapters! Has ${grade.chapters.length}`);
  }
  for (const ch of grade.chapters) {
    if (ch.topics.length !== 2) {
      console.error(`Chapter ${ch.name} in ${grade.grade} does not have 2 topics!`);
    }
    totalTopics += ch.topics.length;
  }
}

console.log(`Verified ${userSyllabus.length} grades and ${totalTopics} exact syllabus lesson topics.`);

// Read curriculumData.ts to ensure SYLLABUS_SPECS matches
const curriculumDataPath = path.join(__dirname, '..', 'src', 'services', 'curriculumData.ts');
const curriculumDataContent = fs.readFileSync(curriculumDataPath, 'utf8');

let missingInSpecs = 0;
for (const grade of userSyllabus) {
  for (let chIdx = 0; chIdx < grade.chapters.length; chIdx++) {
    const ch = grade.chapters[chIdx];
    for (const topic of ch.topics) {
      if (!curriculumDataContent.includes(topic)) {
        console.error(`MISSING IN curriculumData.ts: ${topic} (${grade.grade} Ch ${chIdx+1})`);
        missingInSpecs++;
      }
    }
  }
}

if (missingInSpecs === 0) {
  console.log('ALL 192 SYLLABUS TOPICS ARE VERIFIED IN curriculumData.ts!');
} else {
  console.error(`Found ${missingInSpecs} missing topics in curriculumData.ts!`);
  process.exit(1);
}
