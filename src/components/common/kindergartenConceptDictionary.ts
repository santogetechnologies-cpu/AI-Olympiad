// ─────────────────────────────────────────────────────────────────────────────
// KINDERGARTEN AI CONCEPT DICTIONARY & ANALOGY ENGINE (CLASSES 6–12)
// Ultra-clear, story-driven, "Explain Like I'm 5" (ELI5) analogies for every
// single technical term, mathematical formula, and algorithmic foundation.
// ─────────────────────────────────────────────────────────────────────────────

export interface KindergartenConcept {
  id: string
  term: string
  aliases?: string[]
  category:
    | 'AI Foundations'
    | 'Neural Math & Architecture'
    | 'Machine Learning & Tuning'
    | 'NLP & Generative AI'
    | 'Robotics & Industry'
    | 'Ethics, Bias & Society'
  kindergartenAnalogy: string
  simpleExplanation: string
  technicalDefinition: string
  funExample: string
  emoji: string
}

export const KINDERGARTEN_CONCEPTS: KindergartenConcept[] = [
  // ── 1. AI FOUNDATIONS ──
  {
    id: 'ai-definition',
    term: 'Artificial Intelligence (AI)',
    aliases: ['AI', 'Intelligent Machine', 'Machine Intelligence'],
    category: 'AI Foundations',
    emoji: '🤖',
    kindergartenAnalogy:
      'Imagine giving a toy robot a pair of eyes, a memory book, and the ability to learn from its mistakes—just like you learned how to ride a tricycle after falling off once!',
    simpleExplanation:
      'AI is computer software that can look at clues, make smart guesses, and learn from experience without a human typing every single rule.',
    technicalDefinition:
      'Computational systems capable of performing tasks typically requiring human intelligence, including pattern recognition, inference, planning, and continuous adaptation.',
    funExample:
      'Your phone recognizing your smiling face to unlock, or music apps suggesting songs that match your mood.'
  },
  {
    id: 'data-vs-information',
    term: 'Data vs. Information',
    aliases: ['Data', 'Raw Data', 'Telemetry', 'DIKW Hierarchy'],
    category: 'AI Foundations',
    emoji: '🧩',
    kindergartenAnalogy:
      'Data is like a messy pile of loose Lego bricks scattered on the rug. Information is when you sort all the blue bricks together and build a mini spaceship you can play with!',
    simpleExplanation:
      'Data is raw numbers and measurements. Information is what happens when you organize those numbers so they tell a useful story.',
    technicalDefinition:
      'Data represents unstructured symbols and sensory measurements. Information represents processed, contextualized data that reduces uncertainty for decision-making.',
    funExample:
      'The number "38" is just raw data. "Your forehead thermometer says 38°C, which means you have a fever" is useful information.'
  },
  {
    id: 'feature-vector',
    term: 'Feature Vector',
    aliases: ['Vector', 'Feature Array', 'Numerical Embedding', 'Vectorization'],
    category: 'AI Foundations',
    emoji: '🎴',
    kindergartenAnalogy:
      'Think of a superhero trading card! The computer can’t see the superhero’s face, but it reads the numbers on the card: Height = 4, Speed = 9, Fluffiness = 10. That list of stats is the feature vector!',
    simpleExplanation:
      'A neat list of numbers that describes the important details of a picture, sound, or sentence so computers can do math with it.',
    technicalDefinition:
      'An n-dimensional ordered numerical array representing quantifiable characteristics or measurable properties of an observed phenomenon.',
    funExample:
      'Describing a puppy as [weight: 5kg, ear_length: 8cm, bark_loudness: 3] so the AI can distinguish it from a cat.'
  },

  // ── 2. NEURAL MATH & ARCHITECTURE ──
  {
    id: 'neural-network',
    term: 'Neural Network',
    aliases: ['Artificial Neural Network', 'ANN', 'Deep Learning', 'Perceptron'],
    category: 'Neural Math & Architecture',
    emoji: '🧠',
    kindergartenAnalogy:
      'Imagine a team of little ants standing in line passing secret whispered clues to each other. The first ant whispers "it has fur", the second whispers "it has whiskers", and the last ant shouts "It’s a kitten!"',
    simpleExplanation:
      'A network of tiny mathematical calculators connected in layers that work together to recognize complicated patterns.',
    technicalDefinition:
      'A layered computational graph of interconnected mathematical nodes (neurons) that transform inputs through parameterized non-linear activations.',
    funExample:
      'Self-driving car cameras processing billions of pixels per second to identify stop signs, pedestrians, and bikes.'
  },
  {
    id: 'neural-weight',
    term: 'Weight (w)',
    aliases: ['Weights', 'Synaptic Weight', 'Weight Parameter', 'w1', 'w2'],
    category: 'Neural Math & Architecture',
    emoji: '📢',
    kindergartenAnalogy:
      'Think of weight as a megaphone volume knob! If your mom says "Wear a raincoat" (weight = +10), her voice is super loud and you put it on. If a stranger whispers "Eat rocks" (weight = 0), their volume is muted and you ignore them.',
    simpleExplanation:
      'A number that controls how much attention the computer pays to a specific clue. Big weights mean important clues; tiny weights mean ignore it.',
    technicalDefinition:
      'Learnable scalar coefficients multiplied by input feature dimensions, quantifying the relative importance and directional influence of each feature on the neuron activation.',
    funExample:
      'When guessing if tomorrow will rain, dark storm clouds get a giant weight (+8.5), while what color socks you are wearing gets zero weight (0.0).'
  },
  {
    id: 'neural-bias',
    term: 'Bias (b)',
    aliases: ['Bias Parameter', 'Threshold Bias', 'Intercept'],
    category: 'Neural Math & Architecture',
    emoji: '⚖️',
    kindergartenAnalogy:
      'Bias is your baseline mood before anyone even talks to you! If you are already super hungry (bias = -5), it takes lots of snacks to make you smile. If you just finished a giant birthday cake (bias = +5), you say "No thanks!" to any food right away.',
    simpleExplanation:
      'A starting number that shifts the decision line, making it easier or harder for the computer neuron to say "YES".',
    technicalDefinition:
      'An additive learnable constant added to the weighted sum of inputs (z = Σ w_i x_i + b), translating the activation function along the affine hyperplane independently of feature magnitudes.',
    funExample:
      'A bank loan AI might have a strict negative bias (-3.0) so it only approves loans when the applicant has extraordinarily high savings.'
  },
  {
    id: 'activation-sigmoid',
    term: 'Activation Function & Sigmoid',
    aliases: ['Sigmoid', 'Softmax', 'ReLU', 'Non-linear Activation'],
    category: 'Neural Math & Architecture',
    emoji: '🎚️',
    kindergartenAnalogy:
      'A magical squishing machine! No matter how gigantic or microscopic a number is (even 1,000,000 or -999,999), this machine squishes it smoothly between 0% (definitely NO) and 100% (definitely YES).',
    simpleExplanation:
      'A math formula that turns wild calculations into clean probability scores from 0 to 1.',
    technicalDefinition:
      'Non-linear mathematical transformations (e.g. σ(z) = 1 / (1 + e^-z)) applied to affine sums, enabling neural architectures to model complex non-linear decision boundaries.',
    funExample:
      'Turning raw sensor scores into a crisp "94% chance this turbine bearing is healthy" notification.'
  },
  {
    id: 'loss-function',
    term: 'Loss Function & Error',
    aliases: ['Loss', 'Cost Function', 'MSE', 'Mean Squared Error', 'Cross-Entropy'],
    category: 'Neural Math & Architecture',
    emoji: '🚨',
    kindergartenAnalogy:
      'Like the loud buzzer in the game of Operation! Whenever you touch the metal edge with your tweezers, BZZZZ! The louder the buzzer sounds, the more you learn to keep your hands steady next time.',
    simpleExplanation:
      'A score that measures how big of a mistake the AI just made. The computer’s goal is to make the loss score zero!',
    technicalDefinition:
      'An objective mathematical function quantifying the divergence between predicted model outputs (ŷ) and ground-truth labels (y), providing scalar gradients for optimization.',
    funExample:
      'If the AI guessed an apple costs $10 but it actually costs $2, the loss function gives a giant penalty of (10 - 2)² = 64.'
  },
  {
    id: 'gradient-descent',
    term: 'Gradient Descent & Optimization',
    aliases: ['Gradient Descent', 'Backpropagation', 'Optimizer', 'Learning Rate'],
    category: 'Neural Math & Architecture',
    emoji: '⛷️',
    kindergartenAnalogy:
      'Walking down a foggy playground slide while blindfolded! You tap your shoe gently in every direction to feel where the slope goes downward, and take one tiny careful step downhill until you reach the soft grass at the bottom.',
    simpleExplanation:
      'A step-by-step method where the computer tests its dials, feels which way reduces mistakes, and takes small steps toward perfection.',
    technicalDefinition:
      'An iterative first-order optimization algorithm that updates parameter vectors in the opposite direction of the loss gradient: θ_{t+1} = θ_t - η ∇L(θ_t).',
    funExample:
      'A robot learning to balance a broom on its finger by adjusting its hand 100 times every second.'
  },

  // ── 3. MACHINE LEARNING & TUNING ──
  {
    id: 'overfitting-underfitting',
    term: 'Overfitting vs. Underfitting',
    aliases: ['Overfitting', 'Underfitting', 'Generalization', 'Memorization'],
    category: 'Machine Learning & Tuning',
    emoji: '📖',
    kindergartenAnalogy:
      'Overfitting is memorizing the exact answers to last year’s spelling quiz word-for-word, but never learning phonics! When the teacher gives you a brand-new word, you fail! Underfitting is guessing "CAT" for every single animal because you only practiced for 5 seconds.',
    simpleExplanation:
      'Overfitting means memorizing old practice problems without understanding the concept. Good AI generalizes so it solves new, unseen problems.',
    technicalDefinition:
      'Overfitting occurs when a model models sample noise rather than underlying generative distributions (high variance, low bias). Underfitting occurs when model capacity is insufficient (high bias, low variance).',
    funExample:
      'A weather AI that accurately predicted rain yesterday on your street, but fails to predict weather across the city tomorrow.'
  },
  {
    id: 'training-test-split',
    term: 'Training Set vs. Test Set',
    aliases: ['Train/Test Split', 'Validation Set', 'Holdout Set'],
    category: 'Machine Learning & Tuning',
    emoji: '🎒',
    kindergartenAnalogy:
      'Your homework vs. the final exam! You practice on homework with your teacher looking over your shoulder. But the exam has brand-new questions hidden in a sealed envelope so everyone knows you truly understand it!',
    simpleExplanation:
      'We teach the AI on one pile of practice data (training), and test it on a separate secret pile (test set) to prove it didn’t just cheat.',
    technicalDefinition:
      'The partitioning of labeled empirical datasets into non-overlapping training, validation, and holdout test subsets to assess genuine out-of-distribution generalization performance.',
    funExample:
      'Training a plant health AI on 10,000 leaves from California, then testing it on leaves from Kenya to verify it works everywhere.'
  },
  {
    id: 'confusion-matrix',
    term: 'Confusion Matrix & Error Types',
    aliases: ['Confusion Matrix', 'False Positive', 'False Negative', 'Precision', 'Recall'],
    category: 'Machine Learning & Tuning',
    emoji: '🎯',
    kindergartenAnalogy:
      'False Alarm (False Positive) is when your smoke alarm screams because you burned toast—annoying, but no fire! Missed Danger (False Negative) is when a sneaky raccoon creeps into the kitchen and the watchdog stays asleep—super dangerous!',
    simpleExplanation:
      'A scorecard showing the 4 ways an AI can guess: right guesses, right rejections, false alarms, and missed targets.',
    technicalDefinition:
      'A 2x2 contingency table tabulating True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN) to compute sensitivity, specificity, and F1 metrics.',
    funExample:
      'In medical screening, doctors would rather have a false alarm (do a quick harmless checkup) than miss a real sickness.'
  },

  // ── 4. NLP & GENERATIVE AI ──
  {
    id: 'tokens-embeddings',
    term: 'Tokens & Embeddings',
    aliases: ['Token', 'Tokenizer', 'Word Embeddings', 'Latent Vector'],
    category: 'NLP & Generative AI',
    emoji: '🧱',
    kindergartenAnalogy:
      'Tokens are little Lego bricks of language! Words get chopped into pieces like "jump" and "ing". Embeddings are floating addresses on a magical map: words with similar meanings (like "puppy" and "dog") float right next to each other on the map!',
    simpleExplanation:
      'Tokens are word chunks that AI reads one by one. Embeddings place those word chunks into a multi-dimensional map where similar meanings sit close together.',
    technicalDefinition:
      'Tokens are discrete atomic sub-word units generated by BPE/WordPiece tokenizers. Embeddings are dense continuous vectors mapping tokens into high-dimensional semantic latent spaces.',
    funExample:
      'The computer knows "king" - "man" + "woman" = "queen" because their word coordinates align perfectly on the map!'
  },
  {
    id: 'trace-framework',
    term: 'TRACE Prompting Framework',
    aliases: ['TRACE', 'Prompt Engineering', 'Prompt Design', 'In-Context Learning'],
    category: 'NLP & Generative AI',
    emoji: '🍦',
    kindergartenAnalogy:
      'Ordering ice cream nicely! If you just shout "Food!", you might get cold broccoli soup. But if you say: "Please scoop two scoops of strawberry (Task), as an expert ice cream parlor chef (Role), for a 5-year-old birthday girl (Audience), with rainbow sprinkles on a waffle cone (Context), just like this photo (Example)"—you get the exact dream treat!',
    simpleExplanation:
      'A 5-step checklist (Task, Role, Audience, Context, Example) that gives AI crystal-clear instructions so it never has to guess or make mistakes.',
    technicalDefinition:
      'A systematic prompt engineering architecture structuring LLM conditioning inputs into Task decomposition, Persona Role definition, Audience calibration, Constraint Context, and Few-Shot Demonstration Examples.',
    funExample:
      'Writing an email to a teacher asking for extra credit using the TRACE framework ensures a respectful, polite, and well-structured note.'
  },
  {
    id: 'hallucination',
    term: 'AI Hallucination',
    aliases: ['Hallucination', 'Confabulation', 'Groundedness', 'Factuality'],
    category: 'NLP & Generative AI',
    emoji: '🦄',
    kindergartenAnalogy:
      'When your imaginative little brother tells a bedtime story with such serious confidence that he actually starts believing his pet hamster can fly to Mars on Tuesdays!',
    simpleExplanation:
      'When an AI generates convincing, smooth-sounding answers that are completely made-up and factually untrue.',
    technicalDefinition:
      'The generation of fluent, syntactically coherent text by autoregressive language models that is ungrounded in training data, factually incorrect, or contradictory to prompt constraints.',
    funExample:
      'An AI inventing a fake court case with imaginary lawyers and dates because it predicted words that sounded legal.'
  },

  // ── 5. ROBOTICS & INDUSTRY ──
  {
    id: 'automation-vs-augmentation',
    term: 'Automation vs. Augmentation',
    aliases: ['Automation', 'Augmentation', 'RPA', 'Cobot', 'Human-in-the-Loop'],
    category: 'Robotics & Industry',
    emoji: '🦾',
    kindergartenAnalogy:
      'Automation is an electric toy train circling a track by itself while you eat lunch. Augmentation is a pair of magical night-vision goggles that lets YOU see in the dark like an eagle—you are still the brave explorer making all the decisions!',
    simpleExplanation:
      'Automation replaces repetitive manual labor. Augmentation gives humans super-powers while keeping humans in the driver’s seat.',
    technicalDefinition:
      'Automation substitutes machine execution for low-variance repetitive human tasks. Augmentation amplifies human cognitive capacity and domain synthesis through predictive co-pilots with human-in-the-loop oversight.',
    funExample:
      'An AI doctor co-pilot highlighting tiny bone cracks on an X-ray screen, while the human doctor talks with the patient and chooses the cast.'
  },
  {
    id: 'predictive-maintenance',
    term: 'Predictive Maintenance (PdM)',
    aliases: ['Predictive Maintenance', 'PdM', 'Condition Monitoring', 'Vibration Telemetry'],
    category: 'Robotics & Industry',
    emoji: '🚲',
    kindergartenAnalogy:
      'Hearing a tiny squeak in your bicycle pedal and oiling it today, instead of waiting until the chain snaps and you crash in a puddle on your way to school!',
    simpleExplanation:
      'Listening to tiny vibrations and temperature clues from machines so you fix them before anything explodes or breaks down.',
    technicalDefinition:
      'Condition-based operational monitoring utilizing IoT sensor telemetry (harmonic vibration, acoustics, thermography) to forecast Remaining Useful Life (RUL) and schedule repairs prior to catastrophic mechanical failure.',
    funExample:
      'Wind turbine sensors detecting a worn ball bearing 3 weeks before a storm hits, saving $260,000 in emergency crane repairs.'
  },
  {
    id: 'autonomous-agent',
    term: 'Autonomous Agent',
    aliases: ['Agent', 'AI Agent', 'Perception-Action Loop', 'Reinforcement Learning', 'Policy'],
    category: 'Robotics & Industry',
    emoji: '🐕',
    kindergartenAnalogy:
      'A smart robot puppy! It has eyes to look around (perception), a brain to decide which toy to fetch (planning), legs to run across the room (action), and it feels happy when you give it a treat for doing a good job (reward)!',
    simpleExplanation:
      'A software system that can observe its surroundings, make plans, take actions on its own, and learn from rewards and penalties.',
    technicalDefinition:
      'An autonomous entity operating within an environment that maps sensory percept sequences to actions via policy functions (π: S → A) to maximize cumulative discounted expected utility.',
    funExample:
      'A Mars rover navigating over boulders, taking soil samples, and choosing which rocks to photograph without waiting for commands from Earth.'
  },

  // ── 6. ETHICS, BIAS & SOCIETY ──
  {
    id: 'algorithmic-bias',
    term: 'Algorithmic Bias & Fairness',
    aliases: ['Bias', 'Algorithmic Fairness', 'Disparate Impact', 'Four-Fifths Rule', 'Fairness Metric'],
    category: 'Ethics, Bias & Society',
    emoji: '⚖️',
    kindergartenAnalogy:
      'Imagine a playground monitor who only gives gold swing passes to kids wearing green hats, even though kids in red hats stood in line just as patiently! That’s unfair bias.',
    simpleExplanation:
      'When an AI makes unfair decisions that harm one group of people more than others, usually because of biased practice data.',
    technicalDefinition:
      'Systematic and repeatable errors in computer algorithms that create unfair outcomes, such as privileging one arbitrary demographic group over another (measured by Disparate Impact ratio < 0.80).',
    funExample:
      'A hiring algorithm that penalizes women applicants because the company only hired men for engineering jobs 20 years ago.'
  },
  {
    id: 'three-doors-of-bias',
    term: 'The 3 Doors of Bias',
    aliases: ['Three Doors of Bias', 'Data Bias', 'Design Bias', 'Decision Bias'],
    category: 'Ethics, Bias & Society',
    emoji: '🚪',
    kindergartenAnalogy:
      'Door 1 (Data): Your recipe book only has chocolate cakes, so you never learn vanilla. Door 2 (Design): Your oven is built so small that only tiny cookies fit inside. Door 3 (Decision): You give your baked cookies only to your best friends instead of sharing with the whole class!',
    simpleExplanation:
      'Bias enters AI through 3 doors: 1) Biased training examples, 2) Biased rules and code written by creators, or 3) Humans misusing the AI results.',
    technicalDefinition:
      'A tripartite governance framework categorizing systemic bias origination: 1) Data Door (historical and sampling skew), 2) Design Door (loss functions, feature weights, threshold tuning), and 3) Decision Door (deployment context, automation bias).',
    funExample:
      'Checking loan approval AI across all 3 doors ensures neither the training data nor the threshold hurts families unfairly.'
  },
  {
    id: 'digital-footprint',
    term: 'Digital Footprint & Privacy',
    aliases: ['Digital Footprint', 'Privacy', 'Consent', 'Attribution'],
    category: 'Ethics, Bias & Society',
    emoji: '🐾',
    kindergartenAnalogy:
      'Walking across wet sidewalk cement! Every photo, comment, and button you click leaves a permanent footprint in the wet cement. Once the cement dries, everyone walking down the street can see where you walked!',
    simpleExplanation:
      'The permanent trail of information you leave behind whenever you use the internet, play online games, or talk to AI.',
    technicalDefinition:
      'The traceable record of unique digital activities, actions, contributions, and communications manifested on the internet or on digital devices.',
    funExample:
      'Never sharing your school address, passwords, or friend photos online without asking parents and teachers first.'
  }
]

// ── FAST LOOKUP HELPERS ──
export function findKindergartenConcept(query: string): KindergartenConcept | undefined {
  if (!query) return undefined
  const q = query.toLowerCase().trim()

  return KINDERGARTEN_CONCEPTS.find((item) => {
    if (item.id === q) return true
    if (item.term.toLowerCase() === q) return true
    if (item.aliases?.some((a) => a.toLowerCase() === q || q.includes(a.toLowerCase()))) return true
    if (q.includes(item.term.toLowerCase())) return true
    return false
  })
}

export function searchKindergartenConcepts(keyword: string): KindergartenConcept[] {
  if (!keyword.trim()) return KINDERGARTEN_CONCEPTS
  const q = keyword.toLowerCase().trim()

  return KINDERGARTEN_CONCEPTS.filter((item) => {
    return (
      item.term.toLowerCase().includes(q) ||
      item.simpleExplanation.toLowerCase().includes(q) ||
      item.kindergartenAnalogy.toLowerCase().includes(q) ||
      item.aliases?.some((a) => a.toLowerCase().includes(q))
    )
  })
}
