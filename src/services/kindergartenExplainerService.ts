// ─────────────────────────────────────────────────────────────────────────────
// KINDERGARTEN CONCEPT EXPLAINER SERVICE (ELI5 / ELIK)
// Translates complex Undergraduate & Postgraduate AI mathematics,
// architecture nodes, and technical terms into simple, vivid stories
// using toys, puppies, cookies, Lego blocks, and playground games.
// ─────────────────────────────────────────────────────────────────────────────

export interface KindergartenConcept {
  id: string
  technicalTerm: string
  kindergartenTitle: string
  emoji: string
  category: 'foundations' | 'deep_learning' | 'llms' | 'mlops' | 'research' | 'safety'
  levels: ('ug1' | 'ug2' | 'ug3' | 'ug4' | 'pg1' | 'pg2')[]
  simpleStory: string
  toyAnalogy: string
  howItWorksInPlayground: string
  whyScientistsCare: string
  keywords: string[]
}

export const KINDERGARTEN_CONCEPTS_DATABASE: KindergartenConcept[] = [
  {
    id: 'tensor',
    technicalTerm: 'Tensor / Multi-dimensional Array',
    kindergartenTitle: 'The Magic Lego Ice Cube Tray',
    emoji: '🧊',
    category: 'foundations',
    levels: ['ug1', 'ug2'],
    simpleStory: 'A computer cannot see a puppy or hear music. So we stack numbers into an ice cube tray! One row of numbers is like a line of toy cars. A grid of numbers is a chessboard. A stack of grids is a multi-story parking garage for numbers!',
    toyAnalogy: 'A big box of colorful Lego bricks sorted into little compartments by color and size.',
    howItWorksInPlayground: 'If you want to tell your friend how many swings, slides, and balls are on the playground, you write the numbers in a neat little grid. That grid is a Tensor!',
    whyScientistsCare: 'All images, sounds, sentences, and 3D videos are turned into Tensors so computers can do math on them.',
    keywords: ['tensor', 'matrix', 'vector', 'array', 'numpy', 'dimension', 'shape']
  },
  {
    id: 'gradient_descent',
    technicalTerm: 'Gradient Descent & Optimization',
    kindergartenTitle: 'Walking Blindfolded Down a Fluffy Hill',
    emoji: '⛰️',
    category: 'foundations',
    levels: ['ug1', 'ug2'],
    simpleStory: 'Imagine you are playing blindfolded on a grassy hill, and you want to reach the soft valley at the bottom. You tap your foot gently in every direction to see which way slopes downward. Then you take a tiny step down! If you repeat this, you reach the bottom safe and sound.',
    toyAnalogy: 'A marble rolling down a curved wooden toy ramp into the lowest hole.',
    howItWorksInPlayground: 'If you kick a ball too hard, it goes over the fence (too high). If you kick it too soft, it stops early. Each time you try, you adjust your kick until it lands right in the goal.',
    whyScientistsCare: 'This is the universal way AI learns! It takes small steps to minimize mistakes (loss) until it predicts with high accuracy.',
    keywords: ['gradient descent', 'optimizer', 'sgd', 'adam', 'learning rate', 'step', 'hill']
  },
  {
    id: 'loss_function',
    technicalTerm: 'Loss Function / Cross-Entropy Loss',
    kindergartenTitle: 'The Homework Mistake Scorecard',
    emoji: '📝',
    category: 'foundations',
    levels: ['ug1', 'ug2', 'ug3'],
    simpleStory: 'When a puppy is learning to sit, you count how many times it gets confused. A Loss Function is just a scorecard of mistakes! If the score is 100, the computer made silly guesses. If the score is 0, the computer made zero mistakes and got a gold star!',
    toyAnalogy: 'A buzz sound in the game Operation when you touch the sides.',
    howItWorksInPlayground: 'You guess how many jellybeans are in a jar. If there are 50 and you guessed 80, your mistake score is 30. Your goal is to get your mistake score down to zero!',
    whyScientistsCare: 'Computers cannot improve unless they can measure exactly how far off their guess was.',
    keywords: ['loss function', 'loss', 'cross-entropy', 'mse', 'error', 'cost function']
  },
  {
    id: 'backpropagation',
    technicalTerm: 'Backpropagation & Chain Rule',
    kindergartenTitle: 'The Whispering Game in Reverse',
    emoji: '🔄',
    category: 'deep_learning',
    levels: ['ug2'],
    simpleStory: 'Imagine 5 kids whispering a secret in a line, but the last kid says the wrong word! The teacher walks backwards from the last kid to the first kid, tapping each on the shoulder saying: "Here is where you made a tiny mistake, whisper better next time!"',
    toyAnalogy: 'A row of dominos where you trace backward from the fallen block to see which one wobbled.',
    howItWorksInPlayground: 'When building a giant block tower that falls over, you rewind and look at which block at the bottom was placed crookedly so you can fix it.',
    whyScientistsCare: 'It allows neural networks with billions of knobs to adjust every single knob in seconds using calculus.',
    keywords: ['backpropagation', 'backprop', 'chain rule', 'gradients', 'autograd', 'backward']
  },
  {
    id: 'convolution',
    technicalTerm: 'Convolutional Neural Network (CNN) & Kernels',
    kindergartenTitle: 'The Detective\'s Tiny Magnifying Glass',
    emoji: '🔍',
    category: 'deep_learning',
    levels: ['ug2'],
    simpleStory: 'You have a big picture book. Instead of looking at the whole page at once, you slide a tiny 3x3 cardboard window across the picture. The window checks: "Is there a cat ear here? Is there a whisker here? Is there a round eye here?" When it finds all three, it shouts: "It\'s a cat!"',
    toyAnalogy: 'A stencil or cookie cutter that stamps shapes out of dough.',
    howItWorksInPlayground: 'You slide a cutout square over a map of a sandbox to find where the buried toy treasure is hiding.',
    whyScientistsCare: 'It allows computers to recognize objects in photos even if the dog is moved to the left, upside down, or in dark light.',
    keywords: ['convolution', 'cnn', 'kernel', 'stride', 'pooling', 'feature map', 'filter']
  },
  {
    id: 'residual_connection',
    technicalTerm: 'Residual Skip Connection (ResNet)',
    kindergartenTitle: 'The Secret Express Slide that Skips the Stairs',
    emoji: '🛝',
    category: 'deep_learning',
    levels: ['ug2'],
    simpleStory: 'Imagine climbing 50 flights of stairs. By floor 40, your legs are so tired that you forget your message! A skip connection is a secret express slide right beside the stairs. The original message slides directly to the higher floors untouched without getting lost!',
    toyAnalogy: 'A bridge over a traffic jam on a toy train set.',
    howItWorksInPlayground: 'Instead of waiting in a long line of 50 kids to pass a ball, one kid kicks the ball straight across the playground directly to the goal.',
    whyScientistsCare: 'Before skip connections, deep networks of 20+ layers suffered from "vanishing gradients" and could not learn. ResNet allowed networks to grow to 1,000 layers!',
    keywords: ['residual', 'resnet', 'skip connection', 'shortcut', 'vanishing gradient']
  },
  {
    id: 'self_attention',
    technicalTerm: 'Transformer Self-Attention Mechanism (Q, K, V)',
    kindergartenTitle: 'The Magic Flashlight in a Circle of Friends',
    emoji: '🔦',
    category: 'llms',
    levels: ['ug3'],
    simpleStory: 'A group of friends are sitting in a circle telling a story. When someone says the word "bank", who should they listen to? If the word "river" is sitting in the circle, the magic flashlight shines brightly between "bank" and "river"! Now everyone knows it is a grassy river bank, not a money bank!',
    toyAnalogy: 'Laser pointers shining between matching superhero action figures.',
    howItWorksInPlayground: 'When hearing the sentence "The puppy chased the ball because IT was fast", attention is the finger pointing from "IT" directly to "PUPPY".',
    whyScientistsCare: 'This is the secret engine powering ChatGPT, Claude, and Gemini! It lets words understand context across entire books.',
    keywords: ['attention', 'self-attention', 'transformer', 'query', 'key', 'value', 'qkv']
  },
  {
    id: 'tokenization',
    technicalTerm: 'Tokenization & Byte-Pair Encoding (BPE)',
    kindergartenTitle: 'Chopping Words into Scrabble Tiles',
    emoji: '🔤',
    category: 'llms',
    levels: ['ug3'],
    simpleStory: 'Computers cannot swallow giant words in one bite. So a token knife chops words into little syllables, like Scrabble tiles! "Butterfly" gets chopped into "Butter" and "fly". Each tile gets a secret VIP ticket number like #4521.',
    toyAnalogy: 'Wooden alphabet building blocks with numbers printed on the bottom.',
    howItWorksInPlayground: 'If you want to send a secret code to your clubhouse, you turn every letter into a secret badge number.',
    whyScientistsCare: 'Allows AI to handle any language, emoji, or computer code without running out of memory.',
    keywords: ['token', 'tokens', 'tokenization', 'bpe', 'vocabulary', 'subword']
  },
  {
    id: 'rag',
    technicalTerm: 'Retrieval-Augmented Generation (RAG)',
    kindergartenTitle: 'Open-Book Exam with a Helpful Robot Librarian',
    emoji: '📚',
    category: 'llms',
    levels: ['ug3', 'ug4'],
    simpleStory: 'An AI that relies only on its memory might make up tall tales (hallucinations). RAG gives the AI a magic backpack filled with your school textbooks! When you ask a question, a little librarian robot flips directly to the exact page, reads it, and tells you the real answer.',
    toyAnalogy: 'A pop-up encyclopedia where you pull the tab and the exact answer pops out.',
    howItWorksInPlayground: 'Instead of guessing what time the ice cream truck arrives, you run over and look at the printed schedule posted on the park gate.',
    whyScientistsCare: 'Stops AI from making up lies and lets companies use AI on their private internal confidential documents.',
    keywords: ['rag', 'retrieval', 'vector database', 'chromadb', 'embeddings', 'hallucination']
  },
  {
    id: 'lora',
    technicalTerm: 'Low-Rank Adaptation (LoRA) Fine-Tuning',
    kindergartenTitle: 'Sticky Post-It Notes on a Giant Library Book',
    emoji: '🏷️',
    category: 'llms',
    levels: ['ug3'],
    simpleStory: 'To teach a giant AI new medical knowledge, you don\'t want to reprint the whole 1,000-page encyclopedia — that costs millions of dollars! Instead, you paste tiny yellow sticky notes inside the margins. The big book stays frozen, and you only write on the tiny sticky notes!',
    toyAnalogy: 'Putting new snap-on armor onto an existing action figure instead of building a whole new toy.',
    howItWorksInPlayground: 'Instead of repainting the entire playground, you put a colorful sticker on the swing that says "Super Rocket Swing".',
    whyScientistsCare: 'Allows students and researchers to fine-tune giant AI models using a single cheap laptop GPU instead of a million-dollar server room.',
    keywords: ['lora', 'qlora', 'fine-tuning', 'peft', 'low-rank', 'adapters']
  },
  {
    id: 'kv_cache',
    technicalTerm: 'KV-Cache & PagedAttention',
    kindergartenTitle: 'The Recipe Card Memory Box',
    emoji: '🗃️',
    category: 'mlops',
    levels: ['ug3', 'ug4'],
    simpleStory: 'When an AI writes a story word-by-word, it shouldn\'t have to re-read the entire story from page 1 every single time it adds a new word! A KV-cache is a memory box where it saves the summary cards for every word it already finished, so it only thinks about the brand new word.',
    toyAnalogy: 'A bookmark with your notes so you don\'t have to re-read chapter 1 every night.',
    howItWorksInPlayground: 'When counting by twos (2, 4, 6, 8), you remember you just said 8, so you only have to think: "what comes after 8?" rather than counting from 1 all over again.',
    whyScientistsCare: 'Makes chat responses appear instantly instead of slowing down to a crawl as the conversation gets longer.',
    keywords: ['kv-cache', 'vllm', 'pagedattention', 'cache', 'memory', 'latency']
  },
  {
    id: 'ai_agent',
    technicalTerm: 'Autonomous AI Agents (LangGraph / ReAct)',
    kindergartenTitle: 'A Little Robot with a Tool Belt',
    emoji: '🤖',
    category: 'mlops',
    levels: ['ug4'],
    simpleStory: 'Normal AI just talks. An AI Agent has hands! It has a tiny tool belt with a calculator, a web browser, and a pencil. If you ask it: "What is the weather in Paris, and buy me a train ticket?", the agent looks up the weather, checks ticket prices, and completes the mission by itself!',
    toyAnalogy: 'A Bob the Builder toy with working tools in its backpack.',
    howItWorksInPlayground: 'A treasure hunt captain who gets a clue, grabs a shovel, digs up the key, unlocks the chest, and brings back the prize.',
    whyScientistsCare: 'Transforms AI from a passive chatbot into an active worker that can automate complex engineering tasks.',
    keywords: ['agent', 'langgraph', 'react', 'tools', 'autonomous', 'workflow']
  },
  {
    id: 'latent_diffusion',
    technicalTerm: 'Latent Diffusion Models & Score Matching',
    kindergartenTitle: 'Making Beautiful Sculptures Out of Fluffy Sand',
    emoji: '🎨',
    category: 'research',
    levels: ['pg1'],
    simpleStory: 'Start with a clear picture of a puppy. Drop sprinkles of colorful sand on it 1,000 times until it looks like pure blurry static noise. Then teach a smart robot to blow away the sand grain-by-grain! Now, give the robot pure random static noise, and it can blow away the sand to reveal a brand new masterpiece puppy that never existed before!',
    toyAnalogy: 'An Etch-a-Sketch where shaking it creates sand, and a magic stylus brushes it clean into art.',
    howItWorksInPlayground: 'Looking at fluffy clouds in the sky and sculpting them in your mind until you see a dragon.',
    whyScientistsCare: 'Powers Midjourney, Stable Diffusion, DALL-E 3, and OpenAI Sora video generation.',
    keywords: ['diffusion', 'latent diffusion', 'score matching', 'unet', 'sora', 'noise', 'denoise']
  },
  {
    id: 'mixture_of_experts',
    technicalTerm: 'Sparse Mixture of Experts (MoE)',
    kindergartenTitle: 'A Clubhouse of 8 Smart Specialists',
    emoji: '🎪',
    category: 'research',
    levels: ['pg1'],
    simpleStory: 'Instead of one giant tired robot trying to know everything, you build a clubhouse with 8 specialist friends: a math friend, a drawing friend, a doctor friend, etc. A clever doorman listens to your question and taps ONLY the 2 friends who know the answer on the shoulder! The other 6 take a nap and save energy.',
    toyAnalogy: 'A Swiss Army knife where you only open the scissors and the spoon, keeping the other 6 blades folded in.',
    howItWorksInPlayground: 'If the team needs to build a sandcastle, you send the two kids who are master sand sculptors instead of the whole school.',
    whyScientistsCare: 'Powers Mixtral and DeepSeek: gives you a model with 100 billion parameters that runs as fast and cheap as a tiny model.',
    keywords: ['moe', 'mixture of experts', 'gating', 'router', 'sparse', 'experts']
  },
  {
    id: 'rlhf_dpo',
    technicalTerm: 'RLHF & Direct Preference Optimization (DPO)',
    kindergartenTitle: 'Training a Puppy with Treats and Gentle Cheers',
    emoji: '🐶',
    category: 'safety',
    levels: ['pg2'],
    simpleStory: 'When a raw AI first learns from the entire internet, it talks like an unruly wild puppy — it might be rude or messy. So you show it two answers: Answer A (friendly, helpful) and Answer B (rude, grumpy). When it chooses Answer A, you give it a tasty virtual treat! Soon, it only speaks kindly and politely.',
    toyAnalogy: 'A gold star sticker chart for good manners in kindergarten.',
    howItWorksInPlayground: 'When kids play nicely and share the swing, the teacher claps and gives them high-fives.',
    whyScientistsCare: 'Turns chaotic raw neural networks into safe, helpful, polite AI assistants like ChatGPT and Claude.',
    keywords: ['rlhf', 'dpo', 'alignment', 'preference', 'reward model', 'safety']
  },
  {
    id: 'interpretability',
    technicalTerm: 'Mechanistic Interpretability & Sparse Autoencoders',
    kindergartenTitle: 'An X-Ray Machine Inside the AI\'s Brain',
    emoji: '🔬',
    category: 'safety',
    levels: ['pg2'],
    simpleStory: 'People say neural networks are a mysterious "black box". Mechanistic Interpretability is like wearing magical X-Ray glasses! You can look inside the wires and find the exact glowing lightbulb that turns on when the AI thinks about "the Golden Gate Bridge" or when it is planning to tell a fib.',
    toyAnalogy: 'A see-through plastic clock where you can see every single gear and cog turning.',
    howItWorksInPlayground: 'Opening up a toy walkie-talkie to see the wires inside so you can fix the broken button.',
    whyScientistsCare: 'Crucial for AI Safety: proves whether an AI is truly being honest or secretly hiding dangerous thoughts.',
    keywords: ['interpretability', 'sae', 'sparse autoencoder', 'neurons', 'superposition', 'x-ray']
  }
]

export class KindergartenExplainerService {
  /**
   * Search concepts by keyword or natural language query
   */
  static search(query: string): KindergartenConcept[] {
    const q = query.toLowerCase().trim()
    if (!q) return KINDERGARTEN_CONCEPTS_DATABASE

    return KINDERGARTEN_CONCEPTS_DATABASE.filter(c => {
      return (
        c.technicalTerm.toLowerCase().includes(q) ||
        c.kindergartenTitle.toLowerCase().includes(q) ||
        c.simpleStory.toLowerCase().includes(q) ||
        c.keywords.some(k => k.includes(q))
      )
    })
  }

  /**
   * Find the best kindergarten explanation for a given technical term
   */
  static findByTerm(term: string): KindergartenConcept | undefined {
    const normalized = term.toLowerCase().replace(/[^a-z0-9]/g, '')
    return KINDERGARTEN_CONCEPTS_DATABASE.find(c => {
      const cNorm = c.technicalTerm.toLowerCase().replace(/[^a-z0-9]/g, '')
      const idNorm = c.id.toLowerCase().replace(/[^a-z0-9]/g, '')
      return (
        cNorm.includes(normalized) ||
        normalized.includes(cNorm) ||
        idNorm.includes(normalized) ||
        c.keywords.some(k => normalized.includes(k.replace(/[^a-z0-9]/g, '')))
      )
    })
  }

  /**
   * Get all concepts appropriate for a specific academic level
   */
  static getForLevel(level: 'ug1' | 'ug2' | 'ug3' | 'ug4' | 'pg1' | 'pg2'): KindergartenConcept[] {
    return KINDERGARTEN_CONCEPTS_DATABASE.filter(c => c.levels.includes(level))
  }

  /**
   * Translate a scary technical string or formula into a child-friendly explanation
   */
  static translateText(text: string): string {
    for (const item of KINDERGARTEN_CONCEPTS_DATABASE) {
      for (const kw of item.keywords) {
        if (text.toLowerCase().includes(kw)) {
          return `${item.emoji} ${item.kindergartenTitle}: ${item.simpleStory}`
        }
      }
    }
    return '🧸 Think of this as putting together colorful building blocks! Each step checks that the pieces fit snugly together so the tower never falls over.'
  }
}
