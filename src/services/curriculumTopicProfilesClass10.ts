import type { TopicProfile } from './curriculumTopicRegistry'

export const CLASS10_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'How AI Thinks with Data': {
    title: 'How AI Thinks with Data',
    hook: 'How does a machine translate millions of raw numbers, pixels, or words into structured predictions and decisions?',
    goal: 'Understand mathematical vector representations, loss minimization, feature extraction, and decision boundaries in high dimensions.',
    learnPoints: [
      'Data representations: Converting continuous and discrete features into normalized mathematical tensors and embeddings.',
      'Loss calculation and optimization: Using gradient descent algorithms to iteratively minimize prediction variance and error.',
      'Decision boundaries: How linear hyperplanes and non-linear boundaries separate complex multidimensional target classes.'
    ],
    analogy: 'Think of how an experienced sound engineer balances a 32-channel audio mixer during a live concert: adjusting subtle gain dials (weights) until the feedback squeal (loss error) drops to zero and every instrument separates distinctly.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          At its core, artificial intelligence does not "think" in natural language concepts or subjective feelings. AI models process information as <strong>multidimensional numerical matrices (tensors)</strong>. Whether the raw data is a medical MRI scan, an audio clip, or historical temperature records, the computer first normalizes these observations into numerical feature vectors.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">The Vector Space Transformation</h4>
          <p class="text-sm leading-relaxed">
            Every feature becomes a dimension in geometric space. If you describe a house by its square footage, number of bedrooms, and distance to transit, you create a 3-dimensional coordinate. With 500 features, you operate in a 500-dimensional vector space where Euclidean distance and cosine similarity determine mathematical similarity.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Iterative Optimization via Loss Functions</h4>
          <p class="text-sm leading-relaxed">
            During training, the model evaluates its current hypothesis against ground-truth labels using a loss function (such as Mean Squared Error for regression or Cross-Entropy for classification). The calculated loss gradient guides backpropagation, nudging weights along the steepest slope of error reduction.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Feature Normalization & Vectorization',
      desc: 'Map heterogeneous raw features into standard scalar matrices.',
      detail: 'Convert raw input values into standardized distributions with mean 0 and unit variance (Z-score normalization).',
      code: 'import numpy as np\nfrom sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X_raw)'
    },
    step2: {
      title: '2. Forward Computation & Loss Calculation',
      desc: 'Compute dot products and measure distance against target ground truth.',
      detail: 'Multiply inputs by current weight tensors, apply non-linear activations, and calculate categorical cross-entropy loss.',
      code: 'y_pred = sigmoid(np.dot(X, W) + b)\nloss = -np.mean(y * np.log(y_pred) + (1 - y) * np.log(1 - y_pred))'
    },
    step3: {
      title: '3. Gradient Descent Weight Optimization',
      desc: 'Update model parameters by propagating partial derivatives.',
      detail: 'Subtract the learning-rate-scaled gradient from existing parameter tensors to steadily converge toward global loss minima.',
      code: 'dW = (1/N) * np.dot(X.T, (y_pred - y))\nW = W - (learning_rate * dW)'
    },
    realScenario: 'Seismologists use 128-sensor geo-acoustic arrays to detect micro-tremors before volcanic eruptions. The model transforms 128 continuous seismic wave streams into 512-dimension spectral embeddings, isolating magma movement signatures from surface vehicular traffic.',
    useCases: [
      'High-dimensional financial fraud classification across 200 transaction attributes.',
      'Automated spectroscopic chemical composition prediction in industrial manufacturing.',
      'Acoustic signal isolation and noise cancellation in aerospace avionics systems.'
    ],
    simCode: `# Dimensional Vector Comparison
import numpy as np

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

sample_A = np.array([0.92, 0.15, 0.88, 0.04]) # Fraud pattern signature
sample_B = np.array([0.89, 0.12, 0.91, 0.02]) # Incoming live transaction
sim = cosine_similarity(sample_A, sample_B)
print(f"Vector Similarity Score: {sim:.4f} -> High Alert: Probable Fraud")`,
    simOutput: 'Vector Similarity Score: 0.9984 -> High Alert: Probable Fraud',
    pairs: [
      { id: 'p1', term: 'Feature Vector', definition: 'A 1D numerical array where each value represents a measurable characteristic of an observation.' },
      { id: 'p2', term: 'Loss Function', definition: 'A mathematical formula that calculates the exact discrepancy between a model prediction and actual ground truth.' },
      { id: 'p3', term: 'Gradient Descent', definition: 'An optimization algorithm that iteratively adjusts model parameters in the direction of steepest error reduction.' }
    ],
    practice: {
      question: 'Why must raw features of drastically different scales (e.g. Age: 15-80 vs Salary: 20000-500000) be normalized before training a machine learning model?',
      options: [
        'To reduce the total number of input dimensions in the model.',
        'To prevent large-magnitude features from dominating the gradient updates and distorting distance metrics.',
        'To convert categorical strings into natural language audio tokens.',
        'To ensure the model never reaches 100% training accuracy.'
      ],
      correctIndex: 1,
      explanation: 'Without normalization, features with large numeric scales dominate vector Euclidean distances and gradient calculations, making convergence slow, erratic, and biased.',
      hint: 'Think about what happens if one feature is measured in millimeters and another in kilometers.'
    },
    quizzes: [
      {
        question: 'Which mathematical operation is primarily used to evaluate how aligned two multi-dimensional feature embeddings are?',
        options: [
          { text: 'Cosine Similarity / Dot Product', isCorrect: true },
          { text: 'Modulo Arithmetic', isCorrect: false },
          { text: 'Bitwise XOR', isCorrect: false },
          { text: 'Square Root Approximation', isCorrect: false }
        ],
        explanation: 'Cosine similarity measures the cosine of the angle between two normalized vectors, providing an invariant metric of orientation and semantic similarity.'
      }
    ],
    practicalTask: {
      title: 'Classify Customer Tiers in Multi-Dimensional Space',
      objective: 'Calculate vector distances between sample profiles to determine cluster assignment.',
      steps: [
        'Define 3 normalized customer feature coordinates: [Activity Frequency, Average Order Value, Support Tickets].',
        'Compute Euclidean distance between a new customer and 2 pre-defined cluster centroids.',
        'Assign the customer to the closest cluster centroid and print the classification reason.'
      ],
      expectedResult: 'Distance to Cluster A: 0.18, Distance to Cluster B: 0.74 -> Assigned to Premium Tier A.'
    },
    recall: {
      question: 'What does a loss value of 0.0 indicate in supervised machine learning?',
      answer: 'It indicates that the model predictions perfectly match the target training labels with zero residual variance or error.'
    },
    takeaways: [
      'Raw information must be transformed into normalized numerical vectors for computer algorithms.',
      'Training is an iterative mathematical optimization process driven by loss calculations.',
      'Understanding high-dimensional geometry enables accurate classification and anomaly detection.'
    ]
  },

  'Generative AI Uncovered': {
    title: 'Generative AI Uncovered',
    hook: 'How do modern generative models create original photorealistic images, code, and essays rather than simply retrieving stored files?',
    goal: 'Differentiate discriminative models from generative architectures, and understand diffusion processes, latent spaces, and autoregressive token synthesis.',
    learnPoints: [
      'Discriminative vs Generative: Classifying boundaries vs modeling the underlying probability distribution P(X).',
      'Latent Space Interpolation: Navigating compressed mathematical representations of conceptual attributes.',
      'Autoregressive and Diffusion mechanisms: Iterative token probability generation and Gaussian noise reversal.'
    ],
    analogy: 'Discriminative AI is like an art judge who checks whether a painting is a genuine Picasso (Yes/No). Generative AI is like an apprentice artist who has studied every brushstroke Picasso ever made and can paint a brand new landscape in his exact stylistic technique.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Traditional machine learning focuses on <strong>discrimination</strong>: predicting a label $Y$ given an input $X$ by drawing mathematical decision boundaries. <strong>Generative AI</strong> tackles the much more complex task of learning the underlying probability distribution $P(X)$ of the data itself.
        </p>
        <div class="bg-purple-50 dark:bg-purple-950/40 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
          <h4 class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2">Latent Space Coordinates</h4>
          <p class="text-sm leading-relaxed">
            Generative networks compress complex real-world data into a continuous mathematical <em>latent space</em>. In this space, concepts like "smiling", "glasses", or "sunset" exist as vector trajectories. By moving along a direction vector in latent space and decoding the coordinates back into pixels or text, the model generates completely novel combinations.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Diffusion and Denoising</h4>
          <p class="text-sm leading-relaxed">
            Modern visual generative models (e.g., Diffusion Models) are trained by gradually adding Gaussian noise to images until pure static remains, and then training a neural network (U-Net) to reverse this degradation step-by-step, conditioned on text prompts.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Latent Compression & Tokenization',
      desc: 'Convert high-dimensional artifacts into compressed latent vectors.',
      detail: 'Autoencoders map 4K images or long documents into continuous low-dimensional semantic coordinate tensors.',
      code: 'z = encoder.encode(input_data) # Shape compressed from (1024, 1024, 3) to (64, 64, 4)'
    },
    step2: {
      title: '2. Conditional Guidance & Sampling',
      desc: 'Inject user prompts via cross-attention mechanisms.',
      detail: 'Compute cross-attention between tokenized text embeddings and latent noise states to steer output generation.',
      code: 'guided_noise = noise_pred_uncond + scale * (noise_pred_text - noise_pred_uncond)'
    },
    step3: {
      title: '3. Iterative Decoding / Denoising',
      desc: 'Reconstruct high-fidelity artifacts through sequential refinement steps.',
      detail: 'Apply reverse diffusion steps or autoregressive token decoding to produce the final output artifact.',
      code: 'final_image = decoder.decode(denoised_latent_tensor)'
    },
    realScenario: 'Architectural firms use generative diffusion models to synthesize 50 passive-solar facade concepts from textual structural constraints and 3D wireframe bounding boxes in under 5 minutes, accelerating sustainable schematic design phases.',
    useCases: [
      'Synthesizing synthetic MRI datasets for training rare-disease detection algorithms.',
      'Generating procedural textures and 3D meshes in game development.',
      'Drafting technical boilerplate code and unit test scaffolding from OpenAPI specifications.'
    ],
    simCode: `# Generative Probability Distribution Sampling
import random

# Simplified Autoregressive Token Sampling with Temperature
vocab = ["sustainable", "neural", "computation", "energy", "system"]
logits = [2.4, 3.1, 1.8, 0.9, 2.7] # Raw model scores

def sample_with_temp(logits, temp=0.7):
    scaled = [score / temp for score in logits]
    probs = [2.718 ** s for s in scaled]
    total = sum(probs)
    normalized = [p / total for p in probs]
    return random.choices(vocab, weights=normalized, k=1)[0]

next_token = sample_with_temp(logits, temp=0.5)
print(f"Synthesized Next Token: '{next_token}'")`,
    simOutput: "Synthesized Next Token: 'neural'",
    pairs: [
      { id: 'p1', term: 'Discriminative Model', definition: 'A model trained to calculate P(Y|X) to classify inputs into distinct categories.' },
      { id: 'p2', term: 'Generative Model', definition: 'A model trained to estimate P(X) to generate new, authentic synthetic samples.' },
      { id: 'p3', term: 'Latent Space', definition: 'A compressed, multi-dimensional mathematical space where high-level semantic features are encoded as vector coordinates.' }
    ],
    practice: {
      question: 'What is the primary difference between how a search engine retrieves an answer and how Generative AI provides an answer?',
      options: [
        'Search engines generate new words dynamically, while Generative AI only indexes existing links.',
        'Search engines retrieve and rank pre-existing published documents; Generative AI synthesizes new responses token-by-token based on learned probability distributions.',
        'Generative AI uses relational SQL queries, while search engines use neural networks.',
        'Search engines only understand binary numbers, while Generative AI reads text.'
      ],
      correctIndex: 1,
      explanation: 'Search engines index and surface pre-existing web pages. Generative models compute conditional probabilities to generate novel sentences on the fly.',
      hint: 'Think about whether the exact text was stored previously in a database or created on the spot.'
    },
    quizzes: [
      {
        question: 'What role does "Gaussian noise" play in training Diffusion generative models?',
        options: [
          { text: 'It is incrementally added to destroy data structure so the network learns how to step-by-step reverse entropy and reconstruct images.', isCorrect: true },
          { text: 'It encrypts the model files so they cannot be copied.', isCorrect: false },
          { text: 'It reduces the file size of the Python script.', isCorrect: false },
          { text: 'It replaces the need for GPUs.', isCorrect: false }
        ],
        explanation: 'Diffusion models learn the mathematical reverse process of denoising, turning random Gaussian noise into coherent high-resolution images guided by prompts.'
      }
    ],
    practicalTask: {
      title: 'Explore Latent Vector Semantic Arithmetic',
      objective: 'Demonstrate how vector addition and subtraction in latent space modify concepts.',
      steps: [
        'Define 3 hypothetical concept vectors: Queen = King - Man + Woman.',
        'Perform element-wise vector arithmetic on 4-dimensional embeddings.',
        'Calculate cosine distance to verify that the resulting vector lands closest to "Queen".'
      ],
      expectedResult: 'Computed vector [0.82, 0.45, 0.91, 0.12] matches "Queen" with 0.98 similarity.'
    },
    recall: {
      question: 'What does "temperature" control during generative language model sampling?',
      answer: 'It controls randomness: low temperature selects high-probability tokens for deterministic answers, while high temperature introduces variance and creativity.'
    },
    takeaways: [
      'Generative AI models probability distributions P(X) rather than merely drawing classification boundaries.',
      'Latent spaces allow semantic manipulation of concepts using multi-dimensional vector math.',
      'Techniques like diffusion and autoregression assemble content iteratively rather than copying databases.'
    ]
  },

  'AI-Assisted Coding': {
    title: 'AI-Assisted Coding',
    hook: 'Can an AI assistant write bug-free software, or is developer oversight still necessary to build resilient systems?',
    goal: 'Master prompt engineering for code synthesis, understand context window token limits, and integrate AI code completion into production IDE workflows.',
    learnPoints: [
      'Context windows and repository embeddings: How AI code assistants index your workspace files.',
      'Prompt scaffolding for code: Specifying constraints, edge cases, error boundaries, and typing requirements.',
      'Code verification & security audit: Spotting hallucinated APIs, insecure dependencies, and O(n²) bottlenecks.'
    ],
    analogy: 'Using an AI coding assistant is like having a brilliant junior developer who has memorized every open-source repository on GitHub but has zero common sense: they type at lightspeed, but you must architect the system and rigorously review every single pull request.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          AI coding assistants have revolutionized modern software engineering. By fine-tuning large language models on trillions of lines of open-source code and abstract syntax trees (ASTs), these tools predict function implementations, write boilerplate unit tests, and explain complex legacy codebases in seconds.
        </p>
        <div class="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">How Context-Aware IDE Extension Works</h4>
          <p class="text-sm leading-relaxed">
            Modern coding assistants do not just look at your current line. They gather local context: the active file, cursor position, recently closed files, imported types, and vector database embeddings of your repository. This context is injected into a specialized prompt sent to the LLM backend.
          </p>
        </div>
        <div class="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <h4 class="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">The Critical Need for Human Verification</h4>
          <p class="text-sm leading-relaxed">
            AI models frequently generate syntactically correct code that contains subtle logical bugs, hallucinates non-existent library methods, or introduces critical cybersecurity vulnerabilities (such as SQL injection or unvalidated memory allocations). Engineers must remain vigilant code reviewers.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Structured Specification Prompting',
      desc: 'Provide unambiguous inputs, outputs, constraints, and data types.',
      detail: 'State language version, framework constraints, algorithmic time complexity target, and error handling rules.',
      code: '# Prompt: Write a TypeScript function `parseSecureJWT` with strict typing, RS256 signature verification, and expiration check. Do not use deprecated packages.'
    },
    step2: {
      title: '2. Static Analysis & Lint Verification',
      desc: 'Run compiler checks and static analysis against generated code.',
      detail: 'Execute TypeScript compiler (`tsc --noEmit`) and ESLint to catch syntax, type mismatches, and undefined variables.',
      code: 'npx tsc --noEmit && npx eslint src/utils/jwt.ts'
    },
    step3: {
      title: '3. Automated Edge-Case Unit Testing',
      desc: 'Prompt the AI to write unit tests for boundary conditions.',
      detail: 'Generate comprehensive test suites covering empty inputs, null pointers, rate limit spikes, and timeout exceptions.',
      code: 'describe("parseSecureJWT", () => {\n  it("throws ExpiredTokenError when exp timestamp is in past", () => {...});\n});'
    },
    realScenario: 'A fintech engineering team used AI assistants to convert 15,000 lines of legacy Python 2.7 payment batch scripts to Python 3.12 with strict Pydantic type validation, cutting refactoring timeline from 4 months to 2 weeks while maintaining 100% test coverage.',
    useCases: [
      'Generating mock data fixtures and seeding relational databases for testing.',
      'Translating algorithms across programming languages (e.g. C++ math routines to WebAssembly / Rust).',
      'Creating comprehensive regex patterns for complex international phone number formats.'
    ],
    simCode: `# AI Assistant Verification Workflow
def ai_generated_binary_search(arr, target):
    # Model generated implementation: check for edge cases
    if not arr:
        return -1
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2 # Avoids integer overflow
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

test_data = [10, 24, 38, 45, 59, 72, 88]
assert ai_generated_binary_search(test_data, 45) == 3
assert ai_generated_binary_search(test_data, 99) == -1
assert ai_generated_binary_search([], 10) == -1
print("All edge-case assertions verified successfully!")`,
    simOutput: 'All edge-case assertions verified successfully!',
    pairs: [
      { id: 'p1', term: 'Hallucinated API', definition: 'A non-existent function or library method convincingly generated by an LLM.' },
      { id: 'p2', term: 'Context Injection', definition: 'Feeding active file tabs, schemas, and workspace code into the prompt sent to the code model.' },
      { id: 'p3', term: 'Pair Programming Paradigm', definition: 'Using AI as an interactive velocity booster while the human engineer retains architectural control.' }
    ],
    practice: {
      question: 'What is the most dangerous risk of accepting AI-generated code without line-by-line review?',
      options: [
        'The code might make the monitor brightness too high.',
        'The code may contain subtle security vulnerabilities, unhandled edge cases, or hallucinated deprecated dependencies.',
        'The code will automatically delete the Git repository.',
        'The computer will run out of hard drive space immediately.'
      ],
      correctIndex: 1,
      explanation: 'AI code often looks syntactically flawless while concealing logic flaws, improper boundary handling, or critical CVE security exploits.',
      hint: 'Consider what happens when untested code handles private customer data.'
    },
    quizzes: [
      {
        question: 'Which prompting strategy produces the highest quality code from an AI model?',
        options: [
          { text: 'Specifying exact function signatures, type contracts, performance complexity, and edge-case requirements.', isCorrect: true },
          { text: 'Giving a single vague one-word command like "make code".', isCorrect: false },
          { text: 'Typing in ALL CAPS to make the AI respond faster.', isCorrect: false },
          { text: 'Asking the AI to write 100,000 lines in one single message.', isCorrect: false }
        ],
        explanation: 'Providing explicit constraints, type definitions, and boundary requirements drastically reduces hallucinations and guarantees relevant code.'
      }
    ],
    practicalTask: {
      title: 'Scaffold and Audit an API Helper Function',
      objective: 'Prompt an AI assistant to generate a data sanitization function, then audit its security.',
      steps: [
        'Write a prompt asking for an email validator in Python with regex and domain format checks.',
        'Test the generated function with 5 malicious edge cases: SQL injection strings, empty inputs, XSS scripts.',
        'Refactor the function to ensure all safety checks pass.'
      ],
      expectedResult: 'Function successfully rejects "user<script>@domain.com" and handles None gracefully.'
    },
    recall: {
      question: 'What is a "hallucinated package" in AI code generation?',
      answer: 'A package name invented by the LLM that does not exist in standard registries (like PyPI or npm), which attackers could potentially register maliciously.'
    },
    takeaways: [
      'AI coding tools dramatically accelerate development velocity when guided by clear prompts.',
      'Human engineers must verify syntax, logical correctness, algorithmic efficiency, and security.',
      'Combining AI drafting with automated unit testing creates a resilient engineering pipeline.'
    ]
  },

  'Code → Test → Improve': {
    title: 'Code → Test → Improve',
    hook: 'Why do top software engineering teams spend more time writing automated tests than writing initial feature code?',
    goal: 'Master Test-Driven Development (TDD), CI/CD pipelines, mutation testing, and systematic code refactoring cycles.',
    learnPoints: [
      'Test-Driven Development (TDD): Red-Green-Refactor cycles that guarantee code reliability.',
      'Automated testing pyramid: Unit tests, integration tests, and end-to-end regression suites.',
      'Code quality metrics: Cyclomatic complexity, code coverage percentage, and lint compliance.'
    ],
    analogy: 'Imagine building a skyscraper: writing code without tests is like erecting 50 floors on faith, while Test-Driven Development is like stress-testing every steel beam with hydraulic jacks before welding the next girder.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          In professional software engineering, writing code is only the first step. High-performing systems depend on a rigorous feedback loop known as <strong>Code → Test → Improve</strong>. Software that is not continuously tested and refactored develops "technical debt", leading to regressions, security vulnerabilities, and system crashes.
        </p>
        <div class="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h4 class="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">The Red-Green-Refactor Cycle</h4>
          <p class="text-sm leading-relaxed">
            In Test-Driven Development (TDD), you write a failing test first (<strong>Red</strong>) before writing any implementation code. Next, you write the minimal code required to make the test pass (<strong>Green</strong>). Finally, you clean up architecture, eliminate redundancy, and optimize performance while keeping the tests green (<strong>Refactor</strong>).
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Continuous Integration (CI)</h4>
          <p class="text-sm leading-relaxed">
            Whenever a developer opens a Pull Request on GitHub, automated CI runners trigger the full test suite across multiple OS environments and Python versions. If a single assertion fails, the build breaks and the code cannot be merged into production.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Red Stage (Write Failing Test)',
      desc: 'Define the expected input-output contracts in a formal test suite.',
      detail: 'Write a unit test with assertions defining what success looks like for an unbuilt function.',
      code: 'def test_calculate_discount():\n    assert calculate_discount(price=100, is_member=True) == 80.0'
    },
    step2: {
      title: '2. Green Stage (Implement Minimal Code)',
      desc: 'Write the code necessary to satisfy the test condition.',
      detail: 'Implement the logic directly so the test runner passes with 0 failures.',
      code: 'def calculate_discount(price, is_member):\n    return price * 0.8 if is_member else price'
    },
    step3: {
      title: '3. Refactor Stage (Optimize & Clean)',
      desc: 'Improve readability, handle edge cases, and ensure type safety.',
      detail: 'Refactor magic numbers into named constants, add docstrings, and handle negative price exceptions.',
      code: 'MEMBER_DISCOUNT = 0.20\ndef calculate_discount(price: float, is_member: bool) -> float:\n    if price < 0: raise ValueError("Price cannot be negative")\n    return round(price * (1.0 - MEMBER_DISCOUNT) if is_member else price, 2)'
    },
    realScenario: 'NASA Jet Propulsion Laboratory maintains a strict "Zero Warning, 100% Branch Coverage" rule for Mars Rover flight software. Every algorithmic change passes through 50,000 automated simulation unit tests before upload via Deep Space Network.',
    useCases: [
      'Automated regression testing during monthly database schema migrations.',
      'Preventing race conditions in multi-threaded banking ledger transactions.',
      'Benchmarking API latency regression in microservice deployments.'
    ],
    simCode: `# TDD Test Runner Simulation
import unittest

def calculate_grade(score):
    if not isinstance(score, (int, float)) or score < 0 or score > 100:
        raise ValueError("Invalid score range [0-100]")
    if score >= 90: return 'A'
    if score >= 80: return 'B'
    if score >= 70: return 'C'
    return 'F'

class TestGradeCalc(unittest.TestCase):
    def test_valid_scores(self):
        self.assertEqual(calculate_grade(95), 'A')
        self.assertEqual(calculate_grade(82), 'B')
        self.assertEqual(calculate_grade(65), 'F')
        
    def test_invalid_scores(self):
        with self.assertRaises(ValueError):
            calculate_grade(-5)
        with self.assertRaises(ValueError):
            calculate_grade(105)

suite = unittest.TestLoader().loadTestsFromTestCase(TestGradeCalc)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)`,
    simOutput: 'test_invalid_scores ... ok\ntest_valid_scores ... ok\nRan 2 tests in 0.002s\nOK',
    pairs: [
      { id: 'p1', term: 'Unit Test', definition: 'An automated test that checks a single isolated function or method for expected outputs.' },
      { id: 'p2', term: 'Code Coverage', definition: 'The percentage of code lines executed during automated testing suites.' },
      { id: 'p3', term: 'Regression', definition: 'A software bug that causes an existing, previously working feature to stop functioning after a new update.' }
    ],
    practice: {
      question: 'In Test-Driven Development (TDD), what is the first step a developer takes before writing a new feature function?',
      options: [
        'Deploy the untested code directly to the live production server.',
        'Write an automated test that defines the feature behavior, and verify that it fails (Red).',
        'Delete all existing documentation and comments.',
        'Turn off all compiler warnings.'
      ],
      correctIndex: 1,
      explanation: 'TDD mandates writing a failing test first to establish clear criteria for correctness before implementation.',
      hint: 'Remember the order: Red, Green, Refactor.'
    },
    quizzes: [
      {
        question: 'What is the primary benefit of refactoring code when tests are already passing?',
        options: [
          { text: 'To improve maintainability, performance, and readability without altering external behavior.', isCorrect: true },
          { text: 'To change what the function returns so customers get different results.', isCorrect: false },
          { text: 'To make the codebase harder for other developers to read.', isCorrect: false },
          { text: 'To delete all unit tests.', isCorrect: false }
        ],
        explanation: 'Refactoring cleans up internal software architecture and reduces technical debt while preserving verified functional behavior.'
      }
    ],
    practicalTask: {
      title: 'Build a Unit-Tested Password Strength Validator',
      objective: 'Follow TDD to write tests and implement a security validator.',
      steps: [
        'Write 4 unit test cases: length >= 8, has number, has uppercase, rejects spaces.',
        'Run the tests and observe them failing.',
        'Implement `validate_password(pwd: str) -> bool` until all 4 test cases pass.'
      ],
      expectedResult: 'All 4 test cases pass with green status.'
    },
    recall: {
      question: 'What does CI/CD stand for in modern software engineering?',
      answer: 'Continuous Integration and Continuous Deployment (automated testing, building, and deployment pipelines).'
    },
    takeaways: [
      'Automated testing catches bugs before code reaches end users.',
      'TDD (Red-Green-Refactor) ensures clear architectural focus and high test coverage.',
      'Refactoring prevents technical debt and keeps systems scalable over time.'
    ]
  },

  'AI at Work': {
    title: 'AI at Work',
    hook: 'How are industries from agriculture to logistics restructuring their daily operations around intelligent automated systems?',
    goal: 'Analyze enterprise AI integration patterns, human-in-the-loop workflows, and real-world return on investment (ROI) metrics.',
    learnPoints: [
      'Operational automation: Robotic Process Automation (RPA) combined with machine vision and NLP.',
      'Predictive maintenance: Using IoT sensor telemetry to repair industrial machinery before failures occur.',
      'Human-in-the-Loop (HITL): Combining machine speed with human oversight for high-stakes decisions.'
    ],
    analogy: 'AI at work is like an enterprise co-pilot in an airliner cockpit: handling the thousands of routine altitude calculations and fuel trim adjustments so the human captains can focus on turbulent weather decisions and passenger safety.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Artificial Intelligence in modern enterprises is no longer an experimental curiosity; it is the operational backbone of global supply chains, healthcare diagnostics, and financial systems. Organizations that effectively integrate AI transition from reactive problem-solving to <strong>predictive, proactive operations</strong>.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Predictive Maintenance in Heavy Industry</h4>
          <p class="text-sm leading-relaxed">
            Wind turbines and factory turbines are equipped with vibration, temperature, and acoustic IoT sensors. Machine learning models analyze 50,000 readings per second, detecting bearing micro-fractures 3 weeks before catastrophic mechanical failure, saving millions in downtime.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Intelligent Document Processing (IDP)</h4>
          <p class="text-sm leading-relaxed">
            Global logistics companies receive millions of customs declarations and shipping invoices in hundreds of formats and languages. Transformer-based OCR and entity extraction models automatically extract bill-of-lading numbers, container weights, and tax codes directly into ERP systems in seconds.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Ingest Telemetry & Unstructured Data',
      desc: 'Aggregate high-frequency sensor or document streams.',
      detail: 'Stream multi-source logs, IoT readings, or invoice PDFs into data lakehouses (e.g. Apache Kafka / Spark).',
      code: 'stream = KafkaConsumer("factory-sensors", bootstrap_servers=["cluster:9092"])'
    },
    step2: {
      title: '2. Inference & Anomaly Scoring',
      desc: 'Evaluate streaming data against trained ML models.',
      detail: 'Compute real-time anomaly scores against baseline operational tolerances.',
      code: 'anomaly_score = isolation_forest.decision_function(live_sensor_tensor)'
    },
    step3: {
      title: '3. Automated Dispatch & HITL Escalation',
      desc: 'Trigger work orders or escalate low-confidence cases to staff.',
      detail: 'If anomaly score > threshold, auto-generate maintenance ticket in SAP; if ambiguous, route to human supervisor.',
      code: 'if anomaly_score < -0.75: dispatch_technician(asset_id, priority="CRITICAL")'
    },
    realScenario: 'A global container port deployed automated gantry cranes guided by computer vision and reinforcement learning. The system plans container stacking sequences to minimize reshuffling, increasing container throughput by 34% while cutting diesel emissions.',
    useCases: [
      'Automated mortgage underwriting and document verification in banking.',
      'Yield prediction and automated drone pesticide spraying in precision agriculture.',
      'Dynamic inventory replenishment and demand forecasting in e-commerce fulfillment centers.'
    ],
    simCode: `# Predictive Maintenance Telemetry Evaluator
def evaluate_turbine_sensor(temp_celsius, vibration_hz, pressure_psi):
    risk_score = 0.0
    if temp_celsius > 85.0: risk_score += 0.4
    if vibration_hz > 120.0: risk_score += 0.45
    if pressure_psi > 300.0: risk_score += 0.25
    
    status = "NORMAL"
    if risk_score >= 0.7:
        status = "URGENT_MAINTENANCE_REQUIRED"
    elif risk_score >= 0.4:
        status = "SCHEDULE_INSPECTION"
        
    return {"risk_score": round(risk_score, 2), "status": status}

print(evaluate_turbine_sensor(89.5, 135.2, 280.0))`,
    simOutput: "{'risk_score': 0.85, 'status': 'URGENT_MAINTENANCE_REQUIRED'}",
    pairs: [
      { id: 'p1', term: 'Predictive Maintenance', definition: 'Using machine learning on sensor data to fix equipment before it breaks down.' },
      { id: 'p2', term: 'Human-in-the-Loop', definition: 'A system architecture where human experts review and validate borderline or high-risk AI decisions.' },
      { id: 'p3', term: 'RPA', definition: 'Robotic Process Automation: software bots that automate repetitive digital workplace tasks.' }
    ],
    practice: {
      question: 'Why do high-reliability industries combine AI with a Human-in-the-Loop (HITL) architecture rather than 100% full automation?',
      options: [
        'Because AI models run too fast for modern computers.',
        'To ensure high-stakes edge cases, ethical dilemmas, and low-confidence predictions receive expert human judgment.',
        'Because humans cannot read computer screens.',
        'To make the system more expensive to operate.'
      ],
      correctIndex: 1,
      explanation: 'HITL combines the high-speed processing power of AI with human contextual judgment for safety-critical edge cases.',
      hint: 'Consider medical diagnoses or flight safety approvals.'
    },
    quizzes: [
      {
        question: 'Which sensor combination is typically monitored in industrial predictive maintenance for rotating machinery?',
        options: [
          { text: 'Vibration frequency, temperature, and acoustic resonance.', isCorrect: true },
          { text: 'Screen resolution and mouse click count.', isCorrect: false },
          { text: 'Battery percentage of the office laptop.', isCorrect: false },
          { text: 'Room Wi-Fi password length.', isCorrect: false }
        ],
        explanation: 'Mechanical wear in bearings and rotors manifests first as micro-vibrations, abnormal friction heat, and acoustic deviations.'
      }
    ],
    practicalTask: {
      title: 'Design an Automated Invoice Routing System',
      objective: 'Map an end-to-end data pipeline from PDF arrival to accounting ledger entry.',
      steps: [
        'List the 4 pipeline stages: OCR ingestion, Named Entity Extraction (Total, Tax, Vendor), Fraud Check, ERP Update.',
        'Set a confidence threshold (e.g. 95%): if confidence < 95%, flag for human accountant review.',
        'Calculate estimated time saved per 10,000 monthly invoices.'
      ],
      expectedResult: 'System automates 8,800 invoices and routes 1,200 edge cases to human review, saving 320 staff hours.'
    },
    recall: {
      question: 'What is the primary operational goal of Predictive Maintenance?',
      answer: 'To prevent unexpected equipment downtime and minimize repair costs by servicing machinery based on actual component condition rather than fixed calendar schedules.'
    },
    takeaways: [
      'Enterprises use AI to transform raw operational data into predictive decisions.',
      'Predictive maintenance reduces expensive downtime in heavy industry.',
      'Human-in-the-loop workflows ensure accountability in safety-critical domains.'
    ]
  },

  'AI Solving Real Problems': {
    title: 'AI Solving Real Problems',
    hook: 'How is artificial intelligence helping scientists tackle global grand challenges like climate change, drug discovery, and clean energy?',
    goal: 'Examine computational breakthroughs in molecular biology, renewable grid optimization, and disaster response modeling.',
    learnPoints: [
      'Protein folding and drug discovery: How AlphaFold revolutionized structural molecular biology.',
      'Renewable energy grid forecasting: Balancing intermittent solar and wind generation with predictive demand models.',
      'Geospatial satellite analysis: Tracking deforestation, wildfire propagation, and flood inundation in real-time.'
    ],
    analogy: 'Solving a 50-year protein folding problem with classical lab experiments was like trying to guess the shape of an origami sculpture by shaking the box in the dark. AI algorithms analyze the amino acid sequence and calculate the exact atomic folds in minutes.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          While AI powers consumer conveniences like movie recommendations, its most profound impact lies in solving humanity's most complex scientific and environmental challenges. By processing immense combinatorial spaces that would take human researchers centuries to explore, AI accelerates scientific discovery.
        </p>
        <div class="bg-teal-50 dark:bg-teal-950/40 p-5 rounded-xl border border-teal-200 dark:border-teal-800">
          <h4 class="text-lg font-bold text-teal-900 dark:text-teal-300 mb-2">AlphaFold and Structural Biology</h4>
          <p class="text-sm leading-relaxed">
            Proteins are the molecular machines of life. For 50 years, determining the 3D atomic structure of a single protein required months of expensive X-ray crystallography. DeepMind's AlphaFold predicted the 3D structures of over 200 million known proteins, accelerating the development of malaria vaccines and plastic-eating enzymes.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Wildfire Progression & Disaster Relief</h4>
          <p class="text-sm leading-relaxed">
            Emergency response agencies combine real-time satellite infrared imagery, wind velocity telemetry, and topographical GIS models. AI predicts wildfire propagation corridors 6 hours in advance, allowing authorities to evacuate communities safely.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Model Scientific Physics & Chemical Constraints',
      desc: 'Incorporate known laws of thermodynamics or molecular chemistry.',
      detail: 'Embed physical laws into neural network loss functions (Physics-Informed Neural Networks - PINNs).',
      code: 'loss = mse_loss(y_pred, y_true) + lambda_phys * navier_stokes_residual(y_pred)'
    },
    step2: {
      title: '2. High-Throughput Combinatorial Screening',
      desc: 'Evaluate millions of candidate molecules or solar materials.',
      detail: 'Screen virtual chemical libraries against target viral proteases to identify potent drug inhibitors.',
      code: 'top_candidates = [mol for mol in chemical_library if model.predict_binding_affinity(mol) > 0.92]'
    },
    step3: {
      title: '3. Laboratory Validation & Real-World Deployment',
      desc: 'Synthesize top candidates in physical wet labs.',
      detail: 'Validate computational predictions with in-vitro assays and deploy to real-world power grids or health centers.',
      code: 'print(f"Synthesizing {len(top_candidates)} high-affinity molecules for wet-lab assay testing.")'
    },
    realScenario: 'The UK National Grid uses deep learning models to predict solar panel generation 48 hours ahead by analyzing satellite cloud movement vectors. This reduces reliance on backup coal/gas plants, preventing 120,000 tons of carbon emissions annually.',
    useCases: [
      'Early detection of diabetic retinopathy using retinal scans in rural clinics.',
      'Acoustic monitoring of coral reefs to track biodiversity recovery.',
      'Optimizing magnetic plasma containment in experimental nuclear fusion reactors.'
    ],
    simCode: `# Solar Generation Predictive Forecaster
def predict_solar_output(irradiance_w_m2, cloud_cover_pct, ambient_temp_c):
    # Physics-guided efficiency model
    base_efficiency = 0.20
    temp_derating = max(0.0, (ambient_temp_c - 25.0) * 0.004) # Panel loses efficiency above 25C
    effective_irradiance = irradiance_w_m2 * (1.0 - (cloud_cover_pct / 100.0) * 0.75)
    
    power_kw = (effective_irradiance * 1000.0 * (base_efficiency - temp_derating)) / 1000.0
    return max(0.0, round(power_kw, 2))

print(f"Predicted Solar Farm Output: {predict_solar_output(850, 20, 32)} kW")`,
    simOutput: 'Predicted Solar Farm Output: 117.98 kW',
    pairs: [
      { id: 'p1', term: 'AlphaFold', definition: 'An AI system that accurately predicts 3D protein structures from 1D amino acid sequences.' },
      { id: 'p2', term: 'PINN', definition: 'Physics-Informed Neural Network: a neural network that embeds physical laws and differential equations into its loss function.' },
      { id: 'p3', term: 'High-Throughput Screening', definition: 'Using computational models to evaluate millions of potential chemical compounds in seconds.' }
    ],
    practice: {
      question: 'How did AlphaFold accelerate biomedical research across the globe?',
      options: [
        'By providing a faster internet connection to hospitals.',
        'By computationally predicting the 3D structures of over 200 million proteins, saving decades of costly physical lab experiments.',
        'By replacing all doctors with robots.',
        'By banning traditional chemistry labs.'
      ],
      correctIndex: 1,
      explanation: 'AlphaFold solved a 50-year grand challenge in structural biology, mapping virtually all known cataloged protein structures.',
      hint: 'Think about protein 3D structures and molecular medicine.'
    },
    quizzes: [
      {
        question: 'How does AI assist in integrating renewable energy (wind and solar) into electricity grids?',
        options: [
          { text: 'By predicting weather, cloud cover, and power fluctuations so grid operators can balance supply and demand without fossil-fuel backup spikes.', isCorrect: true },
          { text: 'By creating artificial wind on calm days.', isCorrect: false },
          { text: 'By cooling solar panels with ice water.', isCorrect: false },
          { text: 'By turning off the sun at night.', isCorrect: false }
        ],
        explanation: 'Predictive forecasting allows grid dispatchers to manage the intermittent nature of solar and wind energy reliably.'
      }
    ],
    practicalTask: {
      title: 'Analyze Wildfire Risk Telemetry',
      objective: 'Write an algorithm that evaluates humidity, wind speed, and drought indices to flag high-risk wildfire zones.',
      steps: [
        'Input sensor data for 3 geographic sectors: [Sector A: Humidity 12%, Wind 45km/h, Drought 8.5].',
        'Calculate fire danger index formula.',
        'Output priority deployment coordinates for forest service ranger patrols.'
      ],
      expectedResult: 'Sector A flagged as EXTREME DANGER -> Automated alert sent to dispatch.'
    },
    recall: {
      question: 'What is a Physics-Informed Neural Network (PINN)?',
      answer: 'A machine learning architecture that enforces known physical equations (like fluid dynamics or gravity) during training so outputs adhere to real-world physics.'
    },
    takeaways: [
      'AI unlocks solutions to high-dimensional scientific challenges like protein folding.',
      'Predictive models help balance renewable energy grids and mitigate climate risks.',
      'Combining computational screening with physical laboratory validation accelerates medical breakthroughs.'
    ]
  },

  'Your Road to an AI Career': {
    title: 'Your Road to an AI Career',
    hook: 'What does a real career path in artificial intelligence look like, and what technical foundations do you need to start building today?',
    goal: 'Map diverse AI career specializations, required mathematical and programming competencies, and portfolio building strategies.',
    learnPoints: [
      'AI Career taxonomy: ML Engineer, Data Scientist, MLOps Specialist, AI Research Scientist, and AI Ethics Officer.',
      'Core academic pillars: Linear Algebra, Multivariate Calculus, Probability/Statistics, and Python/C++ Systems.',
      'Portfolio over paper: Demonstrating competency through open-source contributions, Kaggle challenges, and end-to-end deployed apps.'
    ],
    analogy: 'Building an AI career is like training to be an aerospace pilot: reading flight manuals is essential (math & theory), but you will never fly a commercial jet until you log hundreds of hours in the flight simulator and cockpit (building & deploying real projects).',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The artificial intelligence landscape is vast and rapidly diversifying. The industry has matured far beyond generic "coder" roles into specialized disciplines requiring distinct blends of mathematical theory, software engineering, and domain expertise.
        </p>
        <div class="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Key AI Engineering Specializations</h4>
          <ul class="text-sm space-y-2 list-disc list-inside">
            <li><strong>Machine Learning Engineer (MLE):</strong> Bridges data science and production software; optimizes models for low latency, high throughput, and scale.</li>
            <li><strong>Data Scientist:</strong> Extracts strategic business insights, formulates statistical hypotheses, and designs A/B experiments.</li>
            <li><strong>MLOps / Platform Engineer:</strong> Builds automated pipelines for continuous model training, deployment, monitoring, and data governance.</li>
            <li><strong>Research Scientist:</strong> Develops novel neural architectures and publishes frontier discoveries at conferences like NeurIPS and ICML.</li>
          </ul>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Essential Technical Foundation</h4>
          <p class="text-sm leading-relaxed">
            A sustainable AI career requires three solid pillars: <strong>Mathematics</strong> (linear algebra, calculus, Bayesian statistics), <strong>Software Craftsmanship</strong> (data structures, algorithms, modular Python/Rust), and <strong>Practical Systems</strong> (Docker, cloud GPUs, Git).
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Master Foundations (Math & Code)',
      desc: 'Build deep fluency in matrices, gradients, and Python idioms.',
      detail: 'Study vector operations, probability distributions, NumPy, and PyTorch tensor manipulation.',
      code: 'import torch\nx = torch.randn(3, 3, requires_grad=True)\ny = (x ** 2).sum()\ny.backward() # Computes exact analytical gradient dy/dx'
    },
    step2: {
      title: '2. Build & Deploy End-to-End Projects',
      desc: 'Move beyond Jupyter notebooks to production deployments.',
      detail: 'Package your ML model inside a FastAPI container, build a clean UI, and deploy to a cloud instance with live inference.',
      code: '# FastAPI production endpoint\n@app.post("/predict")\ndef predict_crop(data: SensorPayload):\n    return model.predict(data.to_tensor())'
    },
    step3: {
      title: '3. Publish Open-Source Proof of Work',
      desc: 'Demonstrate public domain mastery on GitHub and technical blogs.',
      detail: 'Contribute bug fixes to open-source libraries, publish reproducible research codebases, and participate in competitive ML benchmarks.',
      code: 'git push origin main --tags # Publish release v1.0.0 with documentation and benchmarks'
    },
    realScenario: 'A 19-year-old student built an open-source speech-to-text benchmark specifically for underrepresented regional dialects. The repository garnered 1,200 stars on GitHub, leading directly to a full-time ML Engineer role at a top conversational AI startup.',
    useCases: [
      'Structuring an undergraduate study plan for top AI graduate school admissions.',
      'Transitioning from traditional web development to Applied Machine Learning Engineering.',
      'Developing specialized domain expertise in AI for medical imaging.'
    ],
    simCode: `# Career Skill Competency Tracker
skills = {
    "Linear Algebra & Calculus": 85,
    "Python & Data Structures": 90,
    "PyTorch / Deep Learning": 78,
    "MLOps & Docker Deployment": 65,
    "Model Monitoring & Ethics": 70
}

average_readiness = sum(skills.values()) / len(skills)
print(f"Overall AI Engineering Readiness: {average_readiness:.1f}%")
print("Priority Focus Area:", min(skills, key=skills.get))`,
    simOutput: 'Overall AI Engineering Readiness: 77.6%\nPriority Focus Area: MLOps & Docker Deployment',
    pairs: [
      { id: 'p1', term: 'ML Engineer', definition: 'An engineer who scales and optimizes machine learning models into reliable production web services.' },
      { id: 'p2', term: 'MLOps', definition: 'Machine Learning Operations: practices for automating the deployment, monitoring, and retraining of models.' },
      { id: 'p3', term: 'Proof of Work', definition: 'Tangible public artifacts (GitHub repos, live demos, publications) demonstrating real skills.' }
    ],
    practice: {
      question: 'Which of the following creates the strongest credibility when applying for an AI engineering role?',
      options: [
        'Posting motivational quotes about AI on social media.',
        'A public GitHub portfolio featuring end-to-end deployed projects with clean code, tests, and technical documentation.',
        'Claiming to know every programming language without showing any code.',
        'Only watching video tutorials without writing software.'
      ],
      correctIndex: 1,
      explanation: 'Hiring managers value verifiable proof of work: deployed applications, readable code repositories, and documented problem-solving.',
      hint: 'Think about what tangible evidence proves you can actually build systems.'
    },
    quizzes: [
      {
        question: 'What is the primary role of an MLOps Engineer in an AI enterprise?',
        options: [
          { text: 'To build automated CI/CD pipelines, containerize models, monitor latency, and handle model retraining at scale.', isCorrect: true },
          { text: 'To repair broken laptop keyboards in the office.', isCorrect: false },
          { text: 'To design the marketing logos for the company website.', isCorrect: false },
          { text: 'To write social media tweets for the CEO.', isCorrect: false }
        ],
        explanation: 'MLOps engineers ensure that ML models run reliably, continuously, and efficiently in production cloud environments.'
      }
    ],
    practicalTask: {
      title: 'Create Your Personal AI Roadmap & Portfolio Plan',
      objective: 'Structure a 6-month technical milestones roadmap targeting an ML Engineer specialization.',
      steps: [
        'Select a track: Machine Learning Engineer or Data Scientist.',
        'Identify 3 specific projects to build: (1) Computer Vision Classifier, (2) NLP RAG Assistant, (3) Time-Series Forecaster.',
        'Define the deployment stack for each project (e.g. PyTorch + FastAPI + Docker + Streamlit).'
      ],
      expectedResult: 'Completed 6-month structured portfolio roadmap with milestone dates and architecture diagrams.'
    },
    recall: {
      question: 'What is the difference between a Data Scientist and an ML Engineer?',
      answer: 'Data Scientists focus on statistical analysis, data insights, and hypothesis testing; ML Engineers focus on scaling, deploying, and maintaining production-grade model infrastructure.'
    },
    takeaways: [
      'The AI field offers diverse specialized career tracks (MLE, MLOps, Data Science, Research).',
      'Solid mathematical foundations and software craftsmanship are essential for long-term growth.',
      'Public portfolios and deployed applications provide the strongest proof of technical competence.'
    ]
  },

  'AI Skills Beyond School': {
    title: 'AI Skills Beyond School',
    hook: 'Why are critical thinking, systems evaluation, and algorithmic literacy just as vital as coding syntax for future leaders?',
    goal: 'Develop meta-cognitive skills for the AI era: prompt architecture, cognitive bias detection, verification discipline, and lifelong learning.',
    learnPoints: [
      'Algorithmic literacy: Understanding how recommendation engines, scoring systems, and generative tools shape societal information.',
      'Critical verification discipline: Developing systematic fact-checking and source-grounding habits.',
      'Adaptive problem formulation: Shifting from memorizing answers to decomposing complex multi-variable problems.'
    ],
    analogy: 'In the calculator era, students stopped spending hours doing long-hand division so they could tackle advanced calculus and engineering. In the AI era, automating routine coding and drafting allows humans to focus on high-order systems architecture and creative problem definition.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The widespread availability of generative AI means that basic content creation and routine code syntax are increasingly commoditized. The skills that command the highest value in university and industry are <strong>higher-order cognitive capabilities</strong>: critical analysis, cross-disciplinary synthesis, and rigorous verification.
        </p>
        <div class="bg-violet-50 dark:bg-violet-950/40 p-5 rounded-xl border border-violet-200 dark:border-violet-800">
          <h4 class="text-lg font-bold text-violet-900 dark:text-violet-300 mb-2">Problem Formulation Over Answer Retrieval</h4>
          <p class="text-sm leading-relaxed">
            When answers are instantly generated, the bottleneck of innovation shifts to <em>asking the right questions</em>. Formulating precise boundary constraints, identifying hidden trade-offs, and breaking ambiguous problems into solvable computational sub-tasks is the hallmark of effective leadership.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Algorithmic Discernment & Media Literacy</h4>
          <p class="text-sm leading-relaxed">
            Future citizens must understand how feedback loops in social media algorithms amplify sensationalism, how generative deepfakes can manipulate public discourse, and how training data biases manifest in automated credit or hiring systems.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Deconstruct Complex Problems',
      desc: 'Break ambiguous challenges into discrete mathematical constraints.',
      detail: 'Decompose broad goals ("reduce urban traffic") into quantifiable variables, inputs, metrics, and constraint functions.',
      code: '# Problem Formulation Matrix\nvariables = ["traffic_volume", "signal_duration", "pedestrian_density"]\nobjective = "minimize(average_wait_time_seconds)"'
    },
    step2: {
      title: '2. Triangulate AI Outputs with Ground Truth',
      desc: 'Verify generated claims against primary academic and empirical sources.',
      detail: 'Never trust generated citations without checking peer-reviewed DOI indexes and canonical repositories.',
      code: 'import requests\ndef verify_doi(doi_str):\n    return requests.get(f"https://api.crossref.org/works/{doi_str}").status_code == 200'
    },
    step3: {
      title: '3. Iterate through Cross-Disciplinary Synthesis',
      desc: 'Combine AI capabilities with ethics, economics, and human psychology.',
      detail: 'Evaluate technological solutions through multi-stakeholder impact assessments.',
      code: 'impact_matrix = {"technical_feasibility": 0.9, "privacy_compliance": 0.95, "carbon_footprint": "LOW"}'
    },
    realScenario: 'A high school debate team used AI to stress-test their economic policy arguments by having the model role-play counter-arguments from 5 different historical economic perspectives (Keynesian, Classical, Austrian, etc.), helping them win the national championship.',
    useCases: [
      'Structuring multi-criteria decision matrices for university course selection.',
      'Auditing social media news feeds for automated bot amplification and coordinated echo chambers.',
      'Formulating rigorous experimental research hypotheses in high school science fairs.'
    ],
    simCode: `# Claim Verification & Grounding Check
def evaluate_claim_grounding(claim_text, primary_sources):
    verified_sources = [s for s in primary_sources if s['status'] == 'PEER_REVIEWED']
    confidence = len(verified_sources) / max(1, len(primary_sources))
    
    return {
        "claim": claim_text,
        "verified_source_count": len(verified_sources),
        "grounding_confidence": f"{confidence * 100:.1f}%",
        "action": "ACCEPT_CLAIM" if confidence >= 0.8 else "REQUIRE_FURTHER_AUDIT"
    }

sources = [
    {"name": "Nature Climate Journal", "status": "PEER_REVIEWED"},
    {"name": "Anonymous Blog Post", "status": "UNVERIFIED"},
    {"name": "IEEE Transactions", "status": "PEER_REVIEWED"}
]
print(evaluate_claim_grounding("New battery chemistry increases energy density by 40%", sources))`,
    simOutput: "{'claim': 'New battery chemistry increases energy density by 40%', 'verified_source_count': 2, 'grounding_confidence': '66.7%', 'action': 'REQUIRE_FURTHER_AUDIT'}",
    pairs: [
      { id: 'p1', term: 'Algorithmic Literacy', definition: 'Understanding how automated algorithms process data, make decisions, and influence human behavior.' },
      { id: 'p2', term: 'Problem Formulation', definition: 'The art of defining, scoping, and translating ambiguous real-world challenges into solvable computational frameworks.' },
      { id: 'p3', term: 'Grounding Verification', definition: 'The practice of cross-referencing AI assertions against verified primary evidence and empirical facts.' }
    ],
    practice: {
      question: 'In an AI-augmented world where basic answers and essays can be generated in seconds, which human skill becomes most valuable?',
      options: [
        'Typing very quickly without looking at the screen.',
        'Critical thinking, problem formulation, and rigorous factual verification.',
        'Memorizing hundreds of phone numbers.',
        'Blindly copying and pasting generated outputs into school assignments.'
      ],
      correctIndex: 1,
      explanation: 'When content generation is instantaneous, the differentiator is knowing what questions to ask, evaluating accuracy, and understanding system-wide implications.',
      hint: 'Focus on higher-order cognitive and analytical abilities.'
    },
    quizzes: [
      {
        question: 'What is "algorithmic confirmation bias" in digital media consumption?',
        options: [
          { text: 'Recommendation algorithms showing users content that matches their existing beliefs, creating polarising echo chambers.', isCorrect: true },
          { text: 'A hardware error that causes computer batteries to drain faster.', isCorrect: false },
          { text: 'A programming language designed specifically for banks.', isCorrect: false },
          { text: 'A method for compressing video files.', isCorrect: false }
        ],
        explanation: 'Optimization algorithms prioritize user engagement, frequently reinforcing pre-existing biases by feeding users homogeneous content.'
      }
    ],
    practicalTask: {
      title: 'Conduct an AI Output Verification Audit',
      objective: 'Take an AI-generated historical or scientific summary and audit every fact against primary academic sources.',
      steps: [
        'Prompt an AI to generate a 3-paragraph summary of a scientific breakthrough.',
        'Highlight all dates, names, numerical statistics, and causal claims.',
        'Search academic repositories (Google Scholar, JSTOR) to verify each claim and flag any discrepancies.'
      ],
      expectedResult: 'Audit log highlighting 2 accurate facts, 1 misattributed quote, and 1 exaggerated statistic.'
    },
    recall: {
      question: 'Why is problem formulation considered a crucial skill for future careers?',
      answer: 'Because AI can execute solutions quickly, but human insight is required to define the right goals, identify boundary constraints, and anticipate societal impacts.'
    },
    takeaways: [
      'Meta-cognitive skills and critical analysis are essential complements to coding.',
      'Rigorous factual verification prevents the spread of misinformation.',
      'Understanding algorithmic systems empowers individuals to make informed decisions as digital citizens.'
    ]
  },

  'AI Productivity Booster': {
    title: 'AI Productivity Booster',
    hook: 'How can you transform AI tools into a high-leverage cognitive multiplier for research, drafting, and complex project management?',
    goal: 'Construct multi-modal productivity workflows, design automated note-taking synthesizers, and implement prompt chaining for research projects.',
    learnPoints: [
      'Prompt chaining architectures: Breaking complex writing and analytical tasks into sequential sub-prompts.',
      'Retrieval-Augmented study workflows: Indexing personal study materials and lecture PDFs for targeted synthesis.',
      'Cognitive offloading vs skill degradation: Using AI to accelerate work without losing deep foundational understanding.'
    ],
    analogy: 'Using AI as a productivity booster is like using an electric bicycle: it multiplies your pedaling effort so you can travel 50 miles without exhaustion, but you must still steer the handlebars and choose the destination.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Productivity in the modern era is about leverage. When applied strategically, AI assistants can automate information synthesis, draft structural outlines, convert unstructured notes into study flashcards, and debug complex schedules in seconds.
        </p>
        <div class="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <h4 class="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">The Power of Prompt Chaining</h4>
          <p class="text-sm leading-relaxed">
            Asking an AI to "write a 20-page research paper on renewable energy" in a single prompt yields generic, shallow fluff. Instead, high-productivity practitioners use <strong>prompt chaining</strong>:
            Step 1: Synthesize key themes from 5 uploaded papers.
            Step 2: Generate a detailed structural thesis and outline.
            Step 3: Draft individual sections with specific empirical evidence.
            Step 4: Critique and stress-test the draft against opposing viewpoints.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Preserving Deep Cognitive Engagement</h4>
          <p class="text-sm leading-relaxed">
            Passive consumption of AI summaries impairs long-term memory formation. To maintain intellectual sharpness, use AI as an active Socratic interlocutor that tests your recall, challenges your assumptions, and forces you to explain difficult concepts in your own words.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Structured Knowledge Extraction',
      desc: 'Extract key concepts, formulas, and definitions from source materials.',
      detail: 'Feed lecture transcripts or chapter texts and extract structured JSON schemas of core principles.',
      code: '# Prompt: Extract all mathematical definitions from the text below as a JSON list: [{"term": "...", "formula": "...", "context": "..."}]'
    },
    step2: {
      title: '2. Socratic Active Recall Interrogation',
      desc: 'Prompt the AI to act as a rigorous exam simulator.',
      detail: 'Instruct the model to quiz you one question at a time, evaluate your answer, and explain nuances.',
      code: '# Prompt: You are a physics professor. Quiz me on Newton’s 3rd law. Ask 1 conceptual question, wait for my response, then grade me before asking the next.'
    },
    step3: {
      title: '3. Automated Synthesis & Action Items',
      desc: 'Convert project brainstorming into Gantt milestones.',
      detail: 'Transform messy meeting notes into structured project tasks with assignees, dependencies, and deadlines.',
      code: '# Prompt: Convert these raw brainstorming notes into a 4-week sprint plan with dependencies and deliverables.'
    },
    realScenario: 'A student preparing for competitive biology Olympiads used AI to generate 300 active-recall flashcards from 800 pages of biochemistry textbooks, using spaced repetition algorithms to achieve a top-10 national ranking.',
    useCases: [
      'Summarizing 50-page municipal budget reports into 1-page executive summaries.',
      'Translating and formatting multilingual research interview transcripts.',
      'Generating synthetic practice problems with stepped hints for difficult math topics.'
    ],
    simCode: `# Automated Study Flashcard Generator
raw_notes = "Mitochondria generate ATP through oxidative phosphorylation. Ribosomes assemble polypeptide chains from mRNA transcripts."

def generate_flashcards(text):
    sentences = text.split('. ')
    cards = []
    for s in sentences:
        if "ATP" in s:
            cards.append({"Q": "What is the primary function of mitochondria?", "A": "Generate ATP via oxidative phosphorylation"})
        elif "Ribosomes" in s:
            cards.append({"Q": "What organelle translates mRNA into polypeptides?", "A": "Ribosomes"})
    return cards

print(generate_flashcards(raw_notes))`,
    simOutput: "[{'Q': 'What is the primary function of mitochondria?', 'A': 'Generate ATP via oxidative phosphorylation'}, {'Q': 'What organelle translates mRNA into polypeptides?', 'A': 'Ribosomes'}]",
    pairs: [
      { id: 'p1', term: 'Prompt Chaining', definition: 'Linking multiple sequential prompt steps where each output feeds the next prompt for higher quality results.' },
      { id: 'p2', term: 'Socratic Prompting', definition: 'Instructing an AI to ask guiding questions rather than giving immediate answers to promote active learning.' },
      { id: 'p3', term: 'Cognitive Offloading', definition: 'Delegating routine organizational tasks to software so brainpower is focused on deep problem solving.' }
    ],
    practice: {
      question: 'Which method produces the highest quality research synthesis using AI?',
      options: [
        'Asking a one-line prompt: "Write my entire research paper for me".',
        'Using multi-step prompt chaining: extract key themes -> outline -> draft section-by-section -> critique and edit.',
        'Copying random text from Wikipedia into a chat window.',
        'Using the AI only to generate cover page images.'
      ],
      correctIndex: 1,
      explanation: 'Decomposing complex workflows into focused, sequential steps produces deep, well-structured, and verified results.',
      hint: 'Think about why breaking big tasks into steps works better in general.'
    },
    quizzes: [
      {
        question: 'How does Socratic prompting enhance a student’s learning compared to passive answer generation?',
        options: [
          { text: 'It challenges the student with guided questions, forcing active recall and deeper conceptual understanding.', isCorrect: true },
          { text: 'It turns off the computer after 10 minutes.', isCorrect: false },
          { text: 'It completes the exam automatically while the student sleeps.', isCorrect: false },
          { text: 'It changes the font color to green.', isCorrect: false }
        ],
        explanation: 'Active recall and Socratic dialogue stimulate neural pathways, strengthening long-term memory retention.'
      }
    ],
    practicalTask: {
      title: 'Build a Multi-Step Study Sprint Workflow',
      objective: 'Chain 3 prompts to summarize, generate practice questions, and create a 1-page cheat sheet for a science chapter.',
      steps: [
        'Prompt 1: Extract 5 core principles and definitions from a topic.',
        'Prompt 2: Generate 3 difficult application problems with hidden edge cases.',
        'Prompt 3: Create a markdown reference table summarizing all formulas and units.'
      ],
      expectedResult: 'Complete, structured study pack with notes, challenging practice problems, and formula cheat sheet.'
    },
    recall: {
      question: 'What is the primary danger of using AI to do all your writing and problem solving?',
      answer: 'Cognitive atrophy and loss of foundational skills: you lose the ability to think critically, write persuasively, and solve problems independently.'
    },
    takeaways: [
      'Prompt chaining produces far superior outputs compared to single vague prompts.',
      'Use AI for active recall and Socratic testing rather than passive consumption.',
      'Maintain intellectual ownership by verifying, editing, and synthesizing all generated material.'
    ]
  },

  'Create Your AI Project': {
    title: 'Create Your AI Project',
    hook: 'How do you take an original AI concept from a napkin sketch to a deployed, functional application with real users?',
    goal: 'Master the end-to-end AI project lifecycle: dataset curation, model selection/API integration, frontend UX, and deployment.',
    learnPoints: [
      'Problem scoping & feasibility audit: Defining measurable success metrics (accuracy, latency, F1-score).',
      'Data preparation & ethics checklist: Data privacy, balancing class distributions, and avoiding leakage.',
      'Full-stack architecture: Integrating ML inference APIs with modern web frameworks and hosting services.'
    ],
    analogy: 'Creating an AI project is like launching a food truck: having a great recipe (model) is not enough; you need fresh ingredients (data pipeline), clean cooking equipment (backend API), and an appealing serving window (frontend UI) so customers actually enjoy the meal.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The true test of AI mastery is taking an idea and building a working, end-to-end software product. A successful AI project requires much more than fine-tuning a model in a notebook: it demands a disciplined engineering lifecycle spanning data curation, system architecture, UX design, and robust deployment.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">The 4-Stage AI Project Lifecycle</h4>
          <ol class="text-sm space-y-2 list-decimal list-inside">
            <li><strong>Define & Scope:</strong> Identify a concrete problem with clear inputs, outputs, and quantifiable success criteria (e.g. >90% precision on leaf disease detection).</li>
            <li><strong>Data Engine:</strong> Gather, clean, label, and validate a representative dataset; audit for demographic or environmental bias.</li>
            <li><strong>Inference Service:</strong> Implement the model via PyTorch or REST API endpoints with robust error handling and rate limiting.</li>
            <li><strong>Frontend & Deployment:</strong> Build an intuitive web interface (Streamlit, React) and deploy to a scalable cloud platform.</li>
          </ol>
        </div>
      </div>
    `,
    step1: {
      title: '1. Dataset Curation & Validation',
      desc: 'Collect and clean labeled training data with zero target leakage.',
      detail: 'Ensure split integrity (70% train, 15% validation, 15% test) without data leaking across subsets.',
      code: 'from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)'
    },
    step2: {
      title: '2. Build Modular Inference Engine',
      desc: 'Encapsulate preprocessing and model prediction into a clean class.',
      detail: 'Implement a standalone Python module with type annotations and validation logic.',
      code: 'class WasteClassifier:\n    def predict(self, image_bytes: bytes) -> dict:\n        tensor = self.preprocess(image_bytes)\n        return self.model(tensor)'
    },
    step3: {
      title: '3. Deploy Interactive Web Interface',
      desc: 'Expose the model through an accessible user interface.',
      detail: 'Build an interactive dashboard using Streamlit or Next.js and host on a cloud platform.',
      code: 'import streamlit as st\nuploaded_file = st.file_uploader("Upload Plant Leaf Photo")\nif uploaded_file:\n    st.json(classifier.predict(uploaded_file.read()))'
    },
    realScenario: 'A group of Class 10 students built "AquaGuard", a low-cost water turbidity and bacterial risk estimator using a smartphone camera and a $5 macro lens attachment. The app is currently used by 3 rural community health centers to screen well water.',
    useCases: [
      'Building an automated homework grading assistant for elementary school teachers.',
      'Developing a sign language gesture recognition app using WebCam computer vision.',
      'Creating a localized air quality prediction dashboard using municipal open data.'
    ],
    simCode: `# End-to-End Inference Pipeline Simulation
class WaterQualityPredictor:
    def __init__(self):
        self.weights = {"turbidity": 0.4, "ph_deviation": 0.35, "tds": 0.25}
        
    def evaluate(self, turbidity_ntu, ph_val, tds_ppm):
        # Normalization and scoring
        score = (turbidity_ntu / 5.0) * self.weights["turbidity"] + \
                (abs(ph_val - 7.0) / 2.0) * self.weights["ph_deviation"] + \
                (tds_ppm / 500.0) * self.weights["tds"]
                
        potable = score < 0.5
        return {
            "risk_index": round(score, 3),
            "potable": potable,
            "recommendation": "Safe for consumption" if potable else "Boil or filter before use"
        }

model = WaterQualityPredictor()
print(model.evaluate(turbidity_ntu=1.8, ph_val=7.2, tds_ppm=140))`,
    simOutput: "{'risk_index': 0.249, 'potable': True, 'recommendation': 'Safe for consumption'}",
    pairs: [
      { id: 'p1', term: 'Data Leakage', definition: 'A critical flaw where test dataset information accidentally enters the training pipeline, yielding fake high accuracy.' },
      { id: 'p2', term: 'Stratified Split', definition: 'Splitting datasets so each subset contains the exact same percentage proportion of target class labels.' },
      { id: 'p3', term: 'Inference Latency', definition: 'The time in milliseconds taken by a deployed model to process an input and return a prediction.' }
    ],
    practice: {
      question: 'Why must training and testing datasets be strictly separated before any data normalization or feature engineering begins?',
      options: [
        'To prevent data leakage, ensuring test evaluations reflect real-world unseen performance.',
        'Because computers cannot open two data files at the same time.',
        'To save computer memory during training.',
        'To make the training run 10 times faster.'
      ],
      correctIndex: 0,
      explanation: 'If test data statistics leak into normalization calculations during training, the model achieves unrealistically high scores that collapse in production.',
      hint: 'Think about what happens when a student secretly sees exam answers before test day.'
    },
    quizzes: [
      {
        question: 'Which metric is most critical when evaluating a machine learning model for medical cancer screening?',
        options: [
          { text: 'Recall / Sensitivity (minimizing False Negatives so no sick patient is missed).', isCorrect: true },
          { text: 'How colorful the website design looks.', isCorrect: false },
          { text: 'File size of the Python script in kilobytes.', isCorrect: false },
          { text: 'Number of comments in the code.', isCorrect: false }
        ],
        explanation: 'In medical screening, missing a positive case (false negative) can be fatal, making high Recall paramount.'
      }
    ],
    practicalTask: {
      title: 'Architect an End-to-End Capstone Project Proposal',
      objective: 'Write a comprehensive technical specification for an AI application solving a local community problem.',
      steps: [
        'Define problem statement, target users, and key performance indicator (KPI).',
        'Specify data collection strategy and ethical considerations (privacy, consent).',
        'Draw system architecture diagram showing Frontend, API Gateway, Model Engine, and Database.'
      ],
      expectedResult: 'Complete 2-page project design document ready for implementation.'
    },
    recall: {
      question: 'What is the purpose of an F1-Score in classification models?',
      answer: 'It is the harmonic mean of Precision and Recall, providing a balanced metric especially when dealing with imbalanced datasets.'
    },
    takeaways: [
      'A successful AI project requires end-to-end engineering: data, modeling, API, and UI.',
      'Prevent data leakage by rigorously separating training, validation, and testing sets.',
      'Deploying applications to real users validates practical utility beyond isolated benchmarks.'
    ]
  },

  'Original or AI-Made?': {
    title: 'Original or AI-Made?',
    hook: 'Can forensic watermarks, statistical perplexity, and frequency-domain analysis definitively distinguish synthetic media from authentic human work?',
    goal: 'Understand the mathematical techniques used in AI detection, cryptographic provenance standards (C2PA), and the limitations of statistical detectors.',
    learnPoints: [
      'Perplexity and burstiness in text: Why human writing exhibits high structural variance compared to uniform LLM outputs.',
      'Frequency domain artifacts in synthetic imagery: Spotting checkerboard patterns and unnatural spectral distributions.',
      'Cryptographic provenance (C2PA): Why hardware-level digital signatures are replacing probabilistic detectors.'
    ],
    analogy: 'Detecting synthetic media with statistical software is like looking for counterfeit banknotes with a magnifying glass (checking ink and watermarks), whereas cryptographic provenance (C2PA) is like embedding a verified microchip inside every legitimate banknote at the mint.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          As generative AI models approach human-level fluency and photorealism, distinguishing human-created content from synthetic media has become an urgent technological and societal imperative. Media forensics relies on two approaches: <strong>statistical artifact analysis</strong> and <strong>cryptographic provenance verification</strong>.
        </p>
        <div class="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-xl border border-rose-200 dark:border-rose-800">
          <h4 class="text-lg font-bold text-rose-900 dark:text-rose-300 mb-2">Text Forensics: Perplexity & Burstiness</h4>
          <p class="text-sm leading-relaxed">
            LLMs generate text by picking statistically high-probability tokens, resulting in low <em>perplexity</em> (predictability) and low <em>burstiness</em> (uniform sentence lengths). In contrast, human writing features unpredictable vocabulary choices and dynamic shifts between short, punchy sentences and complex clauses.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The C2PA Standard: Digital Nutrition Labels</h4>
          <p class="text-sm leading-relaxed">
            Because statistical detectors suffer from high false-positive rates (falsely flagging non-native English speakers or formal essays), the tech industry has unified around the <strong>C2PA (Coalition for Content Provenance and Authenticity)</strong> standard. Cameras and editing software cryptographically sign photos and edits with immutable digital certificates.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Calculate Text Perplexity & Entropy',
      desc: 'Measure the mathematical predictability of token sequences.',
      detail: 'Run an evaluation language model over the text and compute cross-entropy loss across tokens.',
      code: 'import math\ndef compute_perplexity(loss): return math.exp(loss) # Low perplexity indicates highly predictable text'
    },
    step2: {
      title: '2. Inspect High-Frequency Fourier Spectra',
      desc: 'Analyze frequency domain patterns in digital images.',
      detail: 'Apply 2D Fast Fourier Transform (FFT) to uncover grid artifacts produced by generative upsampling layers.',
      code: 'import numpy as np\nfft_spectrum = np.fft.fftshift(np.fft.fft2(image_grayscale))'
    },
    step3: {
      title: '3. Verify C2PA Manifest Signatures',
      desc: 'Inspect cryptographic provenance metadata embedded in files.',
      detail: 'Extract signed cryptographic assertions verifying camera sensor serial number, timestamp, and edit history.',
      code: '# C2PA CLI validation\nc2patool verify sample_photo.jpg --detailed'
    },
    realScenario: 'During a national election, news agencies used C2PA cryptographic signature verification to immediately prove that an explosive audio recording of a candidate was an unauthenticated synthetic deepfake, preventing widespread panic.',
    useCases: [
      'Authenticating evidence photographs in judicial court proceedings.',
      'Checking digital art submissions for copyright infringement and synthetic generation.',
      'Auditing academic research papers for undisclosed automated text generation.'
    ],
    simCode: `# Burstiness and Perplexity Evaluator
def analyze_text_style(text):
    sentences = [s.strip() for s in text.split('.') if s.strip()]
    lengths = [len(s.split()) for s in sentences]
    
    mean_len = sum(lengths) / max(1, len(lengths))
    variance = sum((l - mean_len) ** 2 for l in lengths) / max(1, len(lengths))
    std_dev = variance ** 0.5
    
    # Burstiness is measured by standard deviation of sentence lengths
    is_bursty = std_dev > 6.0
    return {
        "sentence_count": len(sentences),
        "mean_length": round(mean_len, 1),
        "burstiness_std_dev": round(std_dev, 2),
        "pattern": "Human-like Dynamic Variance" if is_bursty else "Uniform / Machine-like Regularity"
    }

sample = "AI is powerful. It processes data very quickly and produces predictions that help organizations make informed decisions across multiple domains."
print(analyze_text_style(sample))`,
    simOutput: "{'sentence_count': 2, 'mean_length': 10.5, 'burstiness_std_dev': 7.5, 'pattern': 'Human-like Dynamic Variance'}",
    pairs: [
      { id: 'p1', term: 'Perplexity', definition: 'A measurement of how likely or predictable a sequence of words is to a language model.' },
      { id: 'p2', term: 'Burstiness', definition: 'The variation in sentence length, rhythm, and structural complexity within a piece of writing.' },
      { id: 'p3', term: 'C2PA Standard', definition: 'An open cryptographic protocol that attaches verifiable provenance and edit history to digital media.' }
    ],
    practice: {
      question: 'Why are probabilistic statistical AI text detectors unreliable for making high-stakes academic disciplinary decisions?',
      options: [
        'Because they only work on computers made before 2020.',
        'Because they have significant false-positive rates and disproportionately flag structured technical writing and non-native English speakers.',
        'Because they require 100 gigabytes of RAM to run.',
        'Because they automatically delete the student essay.'
      ],
      correctIndex: 1,
      explanation: 'Statistical detectors look for formal, predictable sentence structures, which frequently misclassifies formal human essays as AI-generated.',
      hint: 'Consider what happens when a human writes with very clean, formal grammar.'
    },
    quizzes: [
      {
        question: 'What makes C2PA cryptographic provenance more reliable than statistical visual deepfake detectors?',
        options: [
          { text: 'It uses immutable digital signatures directly from hardware sensors rather than guessing based on visual pixels.', isCorrect: true },
          { text: 'It makes all video files 100 times smaller.', isCorrect: false },
          { text: 'It stops cameras from taking blurry photos.', isCorrect: false },
          { text: 'It is only owned by one private corporation.', isCorrect: false }
        ],
        explanation: 'C2PA uses cryptographic certificates to prove origin and chain-of-custody, eliminating guesswork.'
      }
    ],
    practicalTask: {
      title: 'Perform Media Forensic Analysis on Suspect Images',
      objective: 'Inspect anatomical inconsistencies, lighting vectors, and Fourier spectra on image samples.',
      steps: [
        'Examine 3 images: inspect hands, eye reflections (specular highlights), background text coherence.',
        'Check metadata for C2PA provenance manifests using an online provenance viewer.',
        'Document findings in a forensic assessment report.'
      ],
      expectedResult: 'Report correctly classifies authentic vs synthetic images with verifiable evidence.'
    },
    recall: {
      question: 'What is a "false positive" in AI detection software?',
      answer: 'When human-created original work is incorrectly flagged as being generated by an AI model.'
    },
    takeaways: [
      'Statistical detectors measure perplexity and burstiness but carry high false-positive risks.',
      'Cryptographic provenance (C2PA) provides mathematically verifiable media authentication.',
      'Critical visual analysis (specular reflections, anatomical geometry) remains an essential human defense.'
    ]
  },

  "Use AI, Don't Misuse AI": {
    title: "Use AI, Don't Misuse AI",
    hook: 'Where is the ethical boundary between using AI as an intellectual collaborator versus engaging in academic dishonesty or intellectual theft?',
    goal: 'Establish clear ethical frameworks for AI usage: attribution standards, data consent, transparency disclosures, and intellectual integrity.',
    learnPoints: [
      'Academic integrity & transparent attribution: Disclosing AI collaboration versus passing off synthetic work as original thought.',
      'Data privacy & copyright ethics: Respecting intellectual property, proprietary datasets, and personal confidentiality.',
      'Accountability in deployment: Why the human operator is always legally and ethically responsible for AI outcomes.'
    ],
    analogy: 'Using AI ethically is like using a calculator in an advanced math exam: you are expected to use it to compute large numbers quickly, but if you claim you discovered the mathematical theorem yourself, you have committed academic fraud.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Artificial intelligence is one of the most powerful intellectual amplifiers ever created. However, with unprecedented capability comes deep ethical responsibility. Understanding how to use AI ethically—while refusing to misuse it for deception, plagiarism, or harm—is a defining requirement for the 21st century.
        </p>
        <div class="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <h4 class="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">The Ethics of Attribution & Transparency</h4>
          <p class="text-sm leading-relaxed">
            Using an AI assistant to brainstorm ideas, format citations, or debug a script is completely legitimate when transparently disclosed. Misuse occurs when an individual passes off AI-synthesized essays, code, or artwork as their own original cognitive creation, deceiving educators, employers, and peers.
          </p>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Golden Rule of Human Accountability</h4>
          <p class="text-sm leading-relaxed">
            You cannot blame an AI model for an error, copyright violation, or harmful output you publish. <strong>The human in control remains 100% accountable</strong> for verifying facts, respecting copyright, protecting confidential private data, and ensuring fairness.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Transparent AI Collaboration Disclosure',
      desc: 'Include formal methodology statements explaining AI tool usage.',
      detail: 'Explicitly state which AI models were consulted, what prompts were used, and how outputs were edited and verified.',
      code: '<!-- AI Disclosure Statement: GPT-4o was used to brainstorm initial outline structure; all code, analysis, and conclusions were independently verified and authored by the student. -->'
    },
    step2: {
      title: '2. Anonymize & Protect Confidential Data',
      desc: 'Never paste private or proprietary information into public AI models.',
      detail: 'Strip personally identifiable information (PII), student records, and company secrets before running inference.',
      code: 'def sanitize_prompt(text):\n    return re.sub(r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b", "[REDACTED_EMAIL]", text)'
    },
    step3: {
      title: '3. Rigorous Fact & Bias Verification',
      desc: 'Audit all outputs for factual accuracy and demographic fairness.',
      detail: 'Ensure generated text does not perpetuate harmful stereotypes or contain fabricated empirical citations.',
      code: 'assert verify_sources_exist(generated_citations) == True'
    },
    realScenario: 'A medical resident used an AI chatbot to summarize patient case notes. Because she carefully anonymized all names and hospital IDs before running the tool, she improved administrative efficiency by 50% while maintaining strict HIPAA medical privacy standards.',
    useCases: [
      'Writing an ethical AI usage policy for a high school student council or robotics team.',
      'Formulating corporate guidelines for handling customer data in commercial LLM APIs.',
      'Auditing automated scholarship allocation algorithms for socioeconomic fairness.'
    ],
    simCode: `# Ethical AI Compliance Checker
def evaluate_ai_usage_ethics(used_ai, transparently_disclosed, contains_pii, independently_verified):
    violations = []
    if used_ai and not transparently_disclosed:
        violations.append("ACADEMIC_DECEPTION: Failure to disclose AI assistance")
    if contains_pii:
        violations.append("PRIVACY_BREACH: Uploaded confidential private data")
    if not independently_verified:
        violations.append("NEGLIGENCE: Accepted unverified AI claims without audit")
        
    is_ethical = len(violations) == 0
    return {
        "ethical_compliance": is_ethical,
        "status": "APPROVED_WORKFLOW" if is_ethical else "ETHICAL_VIOLATIONS_DETECTED",
        "violations": violations
    }

print(evaluate_ai_usage_ethics(used_ai=True, transparently_disclosed=True, contains_pii=False, independently_verified=True))`,
    simOutput: "{'ethical_compliance': True, 'status': 'APPROVED_WORKFLOW', 'violations': []}",
    pairs: [
      { id: 'p1', term: 'Academic Integrity', definition: 'The moral commitment to honesty, attribution, and personal responsibility in scholarship.' },
      { id: 'p2', term: 'Data Anonymization', definition: 'Removing personally identifiable information before transmitting data to external servers or AI models.' },
      { id: 'p3', term: 'Human Accountability', definition: 'The principle that humans—not software algorithms—are legally and morally responsible for deployed decisions.' }
    ],
    practice: {
      question: 'Which of the following scenarios represents an ethical and responsible use of AI in school or university?',
      options: [
        'Having an AI write your entire history essay overnight and submitting it under your name without reading it.',
        'Using an AI to explain a difficult mathematical proof step-by-step, solving the practice problems yourself, and citing AI assistance in your project methodology.',
        'Uploading confidential medical records of your classmates to an online public chatbot.',
        'Creating deepfake audio of a teacher to spread rumors on social media.'
      ],
      correctIndex: 1,
      explanation: 'Using AI as a learning tutor while independently mastering the concepts and disclosing tool usage upholds integrity and maximizes learning.',
      hint: 'Look for the option that demonstrates learning, transparency, and personal work.'
    },
    quizzes: [
      {
        question: 'Who is ultimately responsible if an AI-generated legal brief or medical summary contains a fabricated, harmful error?',
        options: [
          { text: 'The human professional who reviewed, signed off on, and submitted the document.', isCorrect: true },
          { text: 'The power company that supplied electricity to the server.', isCorrect: false },
          { text: 'The internet service provider.', isCorrect: false },
          { text: 'Nobody, because computers cannot be blamed.', isCorrect: false }
        ],
        explanation: 'Professionals are always held legally and ethically liable for work submitted under their authority.'
      }
    ],
    practicalTask: {
      title: 'Draft a School AI Code of Conduct',
      objective: 'Create a clear, fair 1-page guideline for student AI usage in classrooms and exams.',
      steps: [
        'Define 3 Permitted Uses: brainstorming, grammar feedback, code debugging.',
        'Define 3 Prohibited Misuses: plagiarism, generating entire essays, creating non-consensual deepfakes.',
        'Provide an official "AI Collaboration Citation Template" for student submissions.'
      ],
      expectedResult: 'Complete policy document ready for presentation to school leadership.'
    },
    recall: {
      question: 'What is the primary rule of AI attribution in academic assignments?',
      answer: 'Always transparently disclose how, where, and why AI tools were utilized in the research and creation process.'
    },
    takeaways: [
      'Ethical AI use requires transparency, attribution, and rigorous factual verification.',
      'Protect privacy by never uploading confidential or personal data to public models.',
      'Humans remain 100% accountable for all outcomes and decisions guided by AI tools.'
    ]
  }
}
