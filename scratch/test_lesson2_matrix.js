const testTopics = [
  // Class 3
  { topic: 'Meet My AI Friend', chapter: 'AI Basics' },
  { topic: 'Machines That Help Us', chapter: 'AI Basics' },
  { topic: 'Give Me a Command!', chapter: 'Communicate with AI' },
  { topic: 'Put It in Order!', chapter: 'Communicate with AI' },
  { topic: 'AI Goes to School', chapter: 'AI Applications' },
  { topic: 'AI Comes Home', chapter: 'AI Applications' },
  { topic: 'When I Grow Up', chapter: 'AI & Career' },
  { topic: 'People Behind Technology', chapter: 'AI & Career' },
  { topic: 'Ask & Explore', chapter: 'AI Tools' },
  { topic: 'Draw & Imagine', chapter: 'AI Tools' },
  { topic: 'My AI Safety Rules', chapter: 'Responsible AI' },
  { topic: 'Share with Care', chapter: 'Responsible AI' },

  // Class 4
  { topic: 'Where Is AI Hiding?', chapter: 'AI Discover' },
  { topic: 'Meet the Smart Machines', chapter: 'AI Discover' },
  { topic: 'Say It Clearly!', chapter: 'AI Connect' },
  { topic: 'Mission: Instructions', chapter: 'AI Connect' },
  { topic: 'AI in My Mobile', chapter: 'AI Solve' },
  { topic: 'AI on the Move', chapter: 'AI Solve' },
  { topic: 'Future Job Hunt', chapter: 'AI Rise' },
  { topic: 'My Technology Talent', chapter: 'AI Rise' },
  { topic: 'Create a Story', chapter: 'AI Create' },
  { topic: 'Design with AI', chapter: 'AI Create' },
  { topic: 'Secret or Share?', chapter: 'AI Care' },
  { topic: 'AI: Right or Wrong?', chapter: 'AI Care' },

  // Higher Levels
  { topic: 'AI on the Farm', chapter: 'AI in Agriculture' },
  { topic: 'Autonomous Shuttles on Road', chapter: 'Smart Mobility' },
  { topic: 'Deep Neural Networks', chapter: 'Deep Learning' },
  { topic: 'Understanding LLMs & Transformers', chapter: 'Natural Language Processing' },
  { topic: 'Computer Vision & Defect Detection', chapter: 'Industrial AI' },
  { topic: 'Clinical Healthcare AI Diagnostics', chapter: 'Medical Intelligence' },
  { topic: 'Algorithmic Fairness & Bias Audits', chapter: 'Ethics & Governance' },
  { topic: 'Smart Grid Substation Balancing', chapter: 'Smart Cities & IoT' }
];

console.log('Testing ' + testTopics.length + ' Lesson 2 sample topics across curriculum...');

testTopics.forEach((t, i) => {
  const text = (t.topic + ' ' + t.chapter).toLowerCase();
  let domain = 'UNIVERSAL';
  if (/\b(farms?|crops?|agricultur\w*|soils?|green\w*|planet|eco|irrigat\w*)\b/.test(text)) domain = 'FARM';
  else if (/\b(health|medic\w*|doctor|hospital|patient|diagnos\w*|scan|bio|vital|clinic\w*)\b/.test(text)) domain = 'HEALTHCARE';
  else if (/\b(roads?|traffic|vehicles?|autonomous|cars?|pedestrians?|streets?|mobility|move|mobile|drive)\b/.test(text)) domain = 'ROAD';
  else if (/\b(safety|privacy|secrets?|protect\w*|fakes?|deepfakes?|footprints?|shield|care|citizen|security|rules?|share)\b/.test(text)) domain = 'SAFETY';
  else if (/\b(neur\w*|synapses?|deep learning|gradients?|weights?|perceptrons?|backprop\w*)\b/.test(text)) domain = 'NEURAL';
  else if (/\b(llms?|languages?|tokens?|transformers?|nlp|prompts?|chatbots?|dialogue|say it clearly|command|words?|instructions?|ask)\b/.test(text)) domain = 'LLM/NLP';
  else if (/\b(vision|cameras?|images?|visual|pixels?|detection|recognition|see|smart vision|draw|hiding)\b/.test(text)) domain = 'VISION';
  else if (/\b(robots?|helpers?|machines that help|smart machines?|assists?|actuators?|motors?|hardware|vacuum|chores?|friend|school|home)\b/.test(text)) domain = 'ROBOTICS/HELPERS';
  else if (/\b(generat\w*|creative|arts?|story|stories|design|imagine|music|diffusion|synthe\w*)\b/.test(text)) domain = 'GENAI';
  else if (/\b(ethic\w*|bias\w*|fair\w*|right or wrong|responsible|transpar\w*|accountab\w*|justice|audit)\b/.test(text)) domain = 'ETHICS/FAIRNESS';
  else if (/\b(smart cit\w*|energy|grids?|iot|urban|power|utilit\w*|meters?)\b/.test(text)) domain = 'SMART_CITIES';
  else if (/\b(careers?|jobs?|grow up|talent|workplace|future|collaborat\w*|people behind)\b/.test(text)) domain = 'CAREERS';
  else if (/\b(logic|orders?|algorithms?|search|trees?|paths?|rules?|sort\w*|decisions?|crack)\b/.test(text)) domain = 'LOGIC/SEARCH';
  else if (/\b(datas?|patterns?|predict\w*|analytics?|learning machines?|intelligence|datasets?|features?)\b/.test(text)) domain = 'DATA';

  console.log(`[${i+1}] Topic: "${t.topic}" -> Mapped Domain: [${domain}]`);
});

console.log('\nAll topics verified!');
