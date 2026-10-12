// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE LEVEL AI OLYMPIAD: JARGON BUSTER & KID-FRIENDLY CONCEPT DICTIONARY
// Super-simple, crystal-clear analogies that even a 5-year-old can understand!
// ─────────────────────────────────────────────────────────────────────────────

export interface GlossaryTerm {
  id: string
  term: string
  category: 'AI Basics' | 'Coding & Data' | 'AI Applications' | 'Tools & GenAI' | 'Ethics & Privacy'
  inOneSentence: string
  superAnalogy: string
  realWorldExample: string
  funFact: string
}

export const MIDDLE_LEVEL_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'ai',
    term: 'Artificial Intelligence (AI)',
    category: 'AI Basics',
    inOneSentence: 'Teaching computers how to think, learn, and solve problems like humans do.',
    superAnalogy: 'Imagine building a toy robot and giving it a magical brain that gets smarter every time it plays with your toys!',
    realWorldExample: 'Siri answering your voice questions, or YouTube knowing what cartoon you want to watch next.',
    funFact: 'Computers do not actually have feelings—they are just super-fast calculators solving giant puzzles!'
  },
  {
    id: 'algorithm',
    term: 'Algorithm',
    category: 'Coding & Data',
    inOneSentence: 'A step-by-step recipe of instructions that tells a computer exactly what to do.',
    superAnalogy: 'Think of baking chocolate chip cookies! Step 1: Mix flour and sugar. Step 2: Stir in chocolate chips. Step 3: Bake for 10 minutes. If you put the chocolate chips in the oven with no flour, you do not get cookies! That recipe is an algorithm.',
    realWorldExample: 'A recipe for brushing your teeth, or the exact math steps Google Maps uses to find the quickest road to school.',
    funFact: 'Even tying your shoelaces is an algorithm because you follow the same steps every single morning.'
  },
  {
    id: 'machine-learning',
    term: 'Machine Learning (ML)',
    category: 'AI Basics',
    inOneSentence: 'When a computer learns how to do things by looking at lots of examples instead of following strict rules.',
    superAnalogy: 'Think about how you learned what a dog is. Nobody gave you a 500-page book of rules saying "A dog has exactly 4 legs and fur." You just saw hundreds of dogs in the park and your brain learned the pattern!',
    realWorldExample: 'An app that looks at photos of food and instantly tells you if it is an apple or a pizza.',
    funFact: 'The more examples a machine looks at, the smarter its guesses become!'
  },
  {
    id: 'training-data',
    term: 'Training Data',
    category: 'Coding & Data',
    inOneSentence: 'The giant collection of pictures, words, or numbers we show a computer so it can practice and learn.',
    superAnalogy: 'Like flashcards your teacher uses to teach you the alphabet! If you only see flashcards of the letter "A", you will never learn what "B" looks like.',
    realWorldExample: 'Showing an AI 10,000 photos of cats so it learns what pointy ears, whiskers, and furry tails look like.',
    funFact: 'If your training data has mistakes in it (like a picture of a dog labeled "cat"), the AI will get confused!'
  },
  {
    id: 'model',
    term: 'AI Model',
    category: 'AI Basics',
    inOneSentence: 'The brain of the AI after it has finished studying all its training lessons.',
    superAnalogy: 'Think of a student who just studied all night for a spelling bee. The "model" is the student ready to take the test and answer questions!',
    realWorldExample: 'The speech recognition model inside your phone that converts your voice into text messages.',
    funFact: 'A model is really just billions of tiny mathematical numbers saved together in a computer file.'
  },
  {
    id: 'overfitting',
    term: 'Overfitting (The Memorizer Trap)',
    category: 'Coding & Data',
    inOneSentence: 'When an AI memorizes the exact practice questions by heart, but fails completely when given a slightly new question.',
    superAnalogy: 'Imagine a student who memorizes that "Question 3 on page 5 is 42." If the teacher asks the exact same question, they get 100%. But if the teacher changes the numbers to "2 + 2", they have no idea what to do because they never understood the real rule!',
    realWorldExample: 'A self-driving car that only knows how to drive on one sunny road in California, but gets completely lost when it sees snow in Chicago.',
    funFact: 'AI engineers deliberately test their models on "secret unseen data" to catch overfitting!'
  },
  {
    id: 'underfitting',
    term: 'Underfitting',
    category: 'Coding & Data',
    inOneSentence: 'When an AI is too simple or did not study enough to even learn the basic pattern.',
    superAnalogy: 'Like trying to play a guitar after taking only a 1-minute lesson! You just do not know the chords yet.',
    realWorldExample: 'An AI that thinks every single animal is a cat because it only practiced for 5 seconds.',
    funFact: 'Fixing underfitting usually means giving the AI a bigger neural network and letting it practice longer.'
  },
  {
    id: 'decision-boundary',
    term: 'Decision Boundary',
    category: 'Coding & Data',
    inOneSentence: 'An invisible dividing line or fence that the AI draws to separate one group of things from another.',
    superAnalogy: 'Imagine drawing a chalk line down the middle of a playground to keep the soccer players on the left and the basketball players on the right!',
    realWorldExample: 'An email spam filter drawing a line: emails on the left are friendly messages, emails on the right are junk mail.',
    funFact: 'In advanced AI, these dividing lines are not flat—they can be wavy, circular, or twist in 1,000 dimensions!'
  },
  {
    id: 'latency',
    term: 'Inference Latency',
    category: 'AI Basics',
    inOneSentence: 'How fast the AI gives you an answer after you ask it a question.',
    superAnalogy: 'When your friend tosses you a ball, latency is how many split-seconds it takes between your eyes seeing the ball and your hands catching it!',
    realWorldExample: 'A self-driving car needs super-low latency (less than 0.05 seconds) to hit the brakes if a squirrel runs across the street.',
    funFact: 'Latency is measured in milliseconds (ms). One millisecond is one-thousandth of a second!'
  },
  {
    id: 'pii',
    term: 'Personally Identifiable Information (PII)',
    category: 'Ethics & Privacy',
    inOneSentence: 'Private information that belongs only to you and can reveal who you are in real life.',
    superAnalogy: 'Your secret personal identity badge! Things like your full legal name, your home address, your phone number, or your school ID number.',
    realWorldExample: 'Never type your home address or phone number into a public chatbot!',
    funFact: 'Privacy laws make it illegal for companies to sell children\'s PII without their parents\' permission.'
  },
  {
    id: 'dark-pattern',
    term: 'Dark Pattern',
    category: 'Ethics & Privacy',
    inOneSentence: 'A sneaky design trick on a website or app meant to trick you into doing something you did not want to do.',
    superAnalogy: 'Imagine a board game where the "Do Not Give Me Any Candy" button is painted in giant glowing rainbow colors, but the "Give Me Chocolate" button is invisible gray text hidden under a rug!',
    realWorldExample: 'A game showing a big glowing green button saying "SPEND 500 GEMS NOW!" and hiding the tiny gray "X" button so you accidentally tap the purchase.',
    funFact: 'Many countries have banned dark patterns because they are considered unfair digital traps!'
  },
  {
    id: 'confirmshaming',
    term: 'Confirmshaming',
    category: 'Ethics & Privacy',
    inOneSentence: 'Making a user feel guilty or foolish for clicking "No".',
    superAnalogy: 'Like a bully saying: "Either give me your lunch money, or click the button that says I am a silly baby who hates delicious food."',
    realWorldExample: 'A popup asking you to share your location, where the cancel button says: "No thanks, I hate staying safe."',
    funFact: 'Ethical apps always give you a simple, neutral "No thanks" button without any guilt trips.'
  },
  {
    id: 'deepfake',
    term: 'Deepfake',
    category: 'Ethics & Privacy',
    inOneSentence: 'A fake video, photo, or audio recording made by an AI that looks and sounds completely real.',
    superAnalogy: 'A digital disguise! Like someone wearing a hyper-realistic rubber mask and using a voice changer to pretend to be someone else in a video.',
    realWorldExample: 'A video pretending a celebrity said something silly when they never actually said it.',
    funFact: 'You can often spot deepfakes by looking for unnatural blinking, blurry teeth, or weird shadows around the neck!'
  },
  {
    id: 'hallucination',
    term: 'AI Hallucination',
    category: 'Tools & GenAI',
    inOneSentence: 'When an AI makes up completely fake facts with supreme confidence.',
    superAnalogy: 'Like a friend who does not know the answer to a question, but makes up a crazy bedtime story on the spot and pretends it is 100% true history!',
    realWorldExample: 'Asking an AI: "When did elephants build spaceships?" and the AI inventing a fake year like "In 1842, elephant scientists flew to Mars."',
    funFact: 'Always double-check what an AI chatbot says against trusted books or teachers!'
  },
  {
    id: 'prompt',
    term: 'Prompt & Prompt Engineering',
    category: 'Tools & GenAI',
    inOneSentence: 'The exact question, words, or instructions you give to an AI to get the best possible answer.',
    superAnalogy: 'Like making a wish to a very literal genie! If you say "Give me something hot," you might get a cup of boiling water. But if you say "Give me a freshly baked warm chocolate brownie with sprinkles," you get exactly what you wanted!',
    realWorldExample: 'Telling an image generator: "Draw a friendly golden retriever wearing astronaut goggles on the moon in watercolor style."',
    funFact: 'Good prompts include the Role, the Goal, the Context, and the Format!'
  },
  {
    id: 'token',
    term: 'Token / Tokenization',
    category: 'Tools & GenAI',
    inOneSentence: 'Tiny puzzle pieces of words that AI uses to read and write text.',
    superAnalogy: 'Think of words made out of LEGO bricks! Instead of reading the whole castle at once, the computer breaks the word into small 3-letter or 4-letter building blocks.',
    realWorldExample: 'The word "unbelievable" gets broken into 3 tokens: "un", "believ", and "able".',
    funFact: 'Roughly 100 English words equal about 130 tokens for an AI model.'
  },
  {
    id: 'bias',
    term: 'Algorithmic Bias (Unfairness)',
    category: 'Ethics & Privacy',
    inOneSentence: 'When an AI treats one group of people unfairly because its training data was unbalanced.',
    superAnalogy: 'Imagine a referee who has only ever watched boys play basketball. When girls play, the referee does not recognize their moves and makes unfair calls because he never saw them practice!',
    realWorldExample: 'A facial recognition door that only opens for adults because it was never trained on photos of children.',
    funFact: 'The fix is simple: Make sure the training data represents everyone equally!'
  },
  {
    id: 'sensor-fusion',
    term: 'Sensor Fusion',
    category: 'AI Applications',
    inOneSentence: 'Combining cameras, radar, and sensors together so an AI robot gets a complete picture of the world.',
    superAnalogy: 'Just like crossing the street: you use your eyes to see cars, your ears to hear honking, and your skin to feel the wind! Combining all your senses is sensor fusion.',
    realWorldExample: 'A self-driving car using cameras for color, radar for speed, and LIDAR laser beams for distance.',
    funFact: 'If fog blocks the car\'s cameras, radar can still see through the fog using radio waves!'
  },
  {
    id: 'federated-learning',
    term: 'Federated Learning',
    category: 'Ethics & Privacy',
    inOneSentence: 'Training an AI across thousands of phones without ever sending private photos or messages to a central server.',
    superAnalogy: 'Like every student doing their homework quietly at their own desk, and the teacher only collecting the final grade percentage, without ever reading anyone\'s private personal diary!',
    realWorldExample: 'Your smartphone keyboard learning the words you type so it can auto-correct better, without sending your private chats to Google or Apple.',
    funFact: 'This keeps your data safe on your device while still making the global AI smarter.'
  },
  {
    id: 'confusion-matrix',
    term: 'Confusion Matrix (Accuracy Scorecard)',
    category: 'Coding & Data',
    inOneSentence: 'A 2x2 grid that counts how many times an AI guessed right versus how many times it made a mistake.',
    superAnalogy: 'Like a soccer game scoreboard showing: Goals Scored, Goals Saved, Missed Shots, and Offside Fouls!',
    realWorldExample: 'In a medical test: True Positives (correctly spotting a sick person) vs False Positives (falsely telling a healthy person they are sick).',
    funFact: 'Doctors care way more about False Negatives—they never want to miss a patient who is actually sick!'
  },
  {
    id: 'right-to-erasure',
    term: 'Right to Erasure ("Right to be Forgotten")',
    category: 'Ethics & Privacy',
    inOneSentence: 'Your legal superpower to force an app or website to permanently delete all your photos, messages, and account history.',
    superAnalogy: 'A magical giant eraser! When you leave a playground, you have the right to erase all your drawings off the chalkboard so nobody can copy them.',
    realWorldExample: 'Under laws like GDPR and India\'s DPDP Act, when you close a social media account, the company must wipe your data within 30 days.',
    funFact: 'Companies can be fined millions of dollars if they keep your data after you ask them to delete it!'
  },
  {
    id: 'heuristic',
    term: 'Heuristic (Rule of Thumb)',
    category: 'Coding & Data',
    inOneSentence: 'A quick shortcut or educated guess that finds a good-enough answer when an exact calculation takes too long.',
    superAnalogy: 'If you want to catch a bus and see dark thunderclouds in the sky, you grab an umbrella! You did not measure the exact barometric air pressure—you used a smart rule of thumb.',
    realWorldExample: 'Chess AI computers evaluating board positions in a tenth of a second instead of calculating every possible move till the end of time.',
    funFact: 'The word heuristic comes from the ancient Greek word "Eureka!", which means "I found it!"'
  }
]

export const getGlossaryTermById = (id: string): GlossaryTerm | undefined => {
  return MIDDLE_LEVEL_GLOSSARY.find((t) => t.id === id)
}

export const searchGlossary = (query: string): GlossaryTerm[] => {
  if (!query.trim()) return MIDDLE_LEVEL_GLOSSARY
  const q = query.toLowerCase()
  return MIDDLE_LEVEL_GLOSSARY.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.inOneSentence.toLowerCase().includes(q) ||
      t.superAnalogy.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  )
}
