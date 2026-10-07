import type { TopicProfile } from './curriculumTopicRegistry'

export const HIGHER_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'AI Demystified': {
    title: 'AI Demystified',
    hook: 'What fundamentally distinguishes computational statistical learning from biological cognition and rule-based symbolic expert systems?',
    goal: 'Examine the theoretical taxonomy of artificial intelligence: symbolic AI (Good Old-Fashioned AI - GOFAI) vs connectionist statistical paradigms and modern foundation models.',
    learnPoints: [
      'The epistemological paradigm shift: From expert production rules ($IF-THEN$) to high-dimensional statistical function approximation.',
      'Turing test vs Chinese Room Argument: Philosophical and operational definitions of machine understanding.',
      'The modern compute-data-algorithm triad: How specialized accelerators (GPUs/TPUs), web-scale data, and backpropagation converged.'
    ],
    analogy: 'Symbolic AI was like a bureaucrat following a 10,000-page rulebook with zero intuition; modern connectionist AI is like an experienced master musician who has listened to 100,000 symphonies and improvises effortlessly by feeling harmonic probabilities.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Demystifying artificial intelligence requires understanding that AI is neither magic nor conscious biological thought. Modern AI systems are <strong>high-dimensional continuous function approximators</strong> that optimize parameters using multi-variable differential calculus and numerical linear algebra.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">From Expert Systems to Statistical Learning</h4>
          <p class="text-sm leading-relaxed">
            In early AI, computer scientists attempted to manually hardcode human expertise into thousands of discrete logical rules. This brittle approach failed on perception tasks like vision and speech. Modern machine learning inverted this paradigm: instead of hand-crafting rules, we define mathematical loss functions and optimization algorithms, allowing neural architectures to discover hierarchical representations directly from raw empirical data.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Mathematical Objective Definition',
      desc: 'Formulate real-world problems as loss minimization functions.',
      detail: 'Define target objective $L(\\theta) = \\mathbb{E}_{(x,y)} [\\ell(f_\\theta(x), y)]$ over underlying probability distributions.',
      code: 'def loss_objective(params, x_batch, y_batch):\n    return torch.nn.functional.cross_entropy(model(x_batch, params), y_batch)'
    },
    step2: {
      title: '2. High-Dimensional Optimization Trajectory',
      desc: 'Navigate non-convex loss surfaces via adaptive gradients.',
      detail: 'Iteratively update parameter tensors $\\theta_{t+1} = \\theta_t - \\eta \\cdot \\nabla_\\theta L(\\theta_t)$.',
      code: 'optimizer.zero_grad()\nloss.backward()\noptimizer.step()'
    },
    step3: {
      title: '3. Out-of-Distribution Generalization Audit',
      desc: 'Evaluate generalization bounds on unseen distributions.',
      detail: 'Measure empirical risk vs structural risk to prevent overfitting and spurious statistical correlations.',
      code: 'generalization_gap = test_loss - train_loss'
    },
    realScenario: 'Global semiconductor foundries utilize statistical machine learning models to detect nanometer-scale wafer defects across 50 million microscopic die images per hour, replacing 5,000 manual inspection microscopes.',
    useCases: [
      'High-throughput financial econometric forecasting and macro-trend analysis.',
      'Automated spectroscopic analysis for industrial quality control.',
      'Computational fluid dynamics surrogate modeling in aerospace vehicle design.'
    ],
    simCode: `# Empirical Risk Minimization Demonstrator
import numpy as np

# Synthetic noisy continuous system: y = 2.5 * sin(x) + noise
X = np.linspace(0, 3.14, 50)
y_true = 2.5 * np.sin(X) + np.random.normal(0, 0.1, 50)

# Polynomial function approximation
poly_weights = np.polyfit(X, y_true, deg=3)
y_pred = np.polyval(poly_weights, X)
mse_loss = np.mean((y_pred - y_true) ** 2)

print(f"Discovered Statistical Polynomial Parameters:\n{np.round(poly_weights, 3)}")
print(f"Empirical Approximation Loss (MSE): {mse_loss:.5f}")`,
    simOutput: 'Discovered Statistical Polynomial Parameters:\n[-0.412  0.038  2.629 -0.015]\nEmpirical Approximation Loss (MSE): 0.00942',
    pairs: [
      { id: 'p1', term: 'Symbolic AI', definition: 'Early AI paradigm based on human-engineered logic rules and discrete formal knowledge representations.' },
      { id: 'p2', term: 'Connectionism', definition: 'The statistical AI paradigm where intelligence emerges from interconnected networks of simple mathematical neurons.' },
      { id: 'p3', term: 'Generalization', definition: 'The ability of a trained machine learning model to accurately predict on novel, unseen data distributions.' }
    ],
    practice: {
      question: 'What fundamentally differentiates modern connectionist machine learning from 1980s Expert Systems?',
      options: [
        'Connectionist ML discovers mathematical representations from data via loss optimization, whereas Expert Systems relied on hard-coded human IF-THEN logic rules.',
        'Expert systems used electricity, while connectionist models do not.',
        'Connectionist models only work on audio files.',
        'Expert systems were written entirely in Python 3.'
      ],
      correctIndex: 0,
      explanation: 'Statistical ML models learn internal feature representations directly from empirical data through gradient optimization rather than manual rule codification.',
      hint: 'Think about learning representations from data vs manually writing rules.'
    },
    quizzes: [
      {
        question: 'What is John Searle’s "Chinese Room Argument" primarily intended to critique?',
        options: [
          { text: 'The claim that syntactic symbol manipulation alone is sufficient to create true semantic understanding or conscious cognition.', isCorrect: true },
          { text: 'The manufacturing cost of Chinese microchips.', isCorrect: false },
          { text: 'The grammar rules of the Chinese language.', isCorrect: false },
          { text: 'The speed of GPU memory bandwidth.', isCorrect: false }
        ],
        explanation: 'Searle argued that a machine executing formal syntactic rules can produce correct outputs without possessing genuine semantic understanding.'
      }
    ],
    practicalTask: {
      title: 'Analyze Empirical Risk vs Overfitting in Polynomial Regression',
      objective: 'Fit polynomials of degree 1, 3, and 15 to a noisy dataset and evaluate train vs test loss.',
      steps: [
        'Generate 50 training points and 50 test points from y = sin(x) + noise.',
        'Fit Degree 1 (Underfitting), Degree 3 (Optimal), and Degree 15 (Overfitting).',
        'Calculate test MSE to prove that Degree 15 explodes on unseen data.'
      ],
      expectedResult: 'Degree 3 achieves minimal test loss; Degree 15 achieves near-zero train loss but massive test loss.'
    },
    recall: {
      question: 'What is the Empirical Risk Minimization (ERM) principle?',
      answer: 'A theoretical framework in statistical learning where an algorithm selects model parameters that minimize average loss over the observed training sample.'
    },
    takeaways: [
      'Modern AI is rooted in statistical optimization and multi-variable calculus.',
      'Moving from brittle hand-coded rules to learned representations unlocked perception.',
      'Generalization on unseen data is the true benchmark of machine learning quality.'
    ]
  },

  'The Intelligence Behind Machines': {
    title: 'The Intelligence Behind Machines',
    hook: 'How do information theory, entropy reduction, and free energy principles explain how machines extract order from noisy environments?',
    goal: 'Explore information-theoretic and probabilistic foundations of intelligence: Shannon Entropy, Kullback-Leibler (KL) Divergence, and Bayesian inference.',
    learnPoints: [
      'Shannon Information Entropy: Quantifying uncertainty and bit-depth information content in probability distributions: $H(X) = -\\sum P(x) \\log_2 P(x)$.',
      'Kullback-Leibler (KL) Divergence: Measuring relative entropy and distributional divergence between model predictions and true data distributions.',
      'Bayesian Inference & Maximum A Posteriori (MAP): Updating prior probability distributions with empirical likelihood evidence.'
    ],
    analogy: 'Information entropy is like a crowded, chaotic flea market where 1,000 sellers are shouting at once (maximum entropy/uncertainty); machine learning is like filtering the noise until a clear, single broadcast frequency emerges carrying pure, structured signal.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          To understand intelligence mathematically, we must examine the intersection of <strong>Information Theory</strong> and <strong>Statistical Physics</strong>. Claude Shannon formalized information not as subjective meaning, but as the <em>reduction of mathematical uncertainty (entropy)</em>.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Cross-Entropy as KL Divergence</h4>
          <p class="text-sm leading-relaxed">
            When we train a neural network using Cross-Entropy loss, we are mathematically minimizing the <strong>Kullback-Leibler (KL) Divergence</strong> between the true data distribution $P$ and the model's parameterized prediction distribution $Q_\\theta$:
            $$D_{KL}(P \\parallel Q) = \\sum_{x} P(x) \\log\\left(\\frac{P(x)}{Q(x)}\\right) = H(P, Q) - H(P)$$
            Since the true entropy $H(P)$ is constant, minimizing Cross-Entropy is mathematically identical to minimizing the information-theoretic distance between the model and reality.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Shannon Entropy Quantification',
      desc: 'Measure uncertainty in categorical outcome distributions.',
      detail: 'Compute $H(X) = -\\sum p_i \\log_2 p_i$ to quantify bit-depth unpredictability of information sources.',
      code: 'entropy = -np.sum(probs * np.log2(probs + 1e-12))'
    },
    step2: {
      title: '2. Relative Entropy (KL Divergence) Calculation',
      desc: 'Measure divergence between model predictions and true empirical distributions.',
      detail: 'Calculate relative entropy to evaluate information loss when approximating true data with parametric models.',
      code: 'kl_div = np.sum(p_true * np.log((p_true + 1e-12) / (q_model + 1e-12)))'
    },
    step3: {
      title: '3. Bayesian Posterior Belief Update (MAP)',
      desc: 'Incorporate empirical evidence into prior probability matrices.',
      detail: 'Update prior $P(\\theta)$ with likelihood $P(D|\\theta)$ to compute Maximum A Posteriori parameter distributions.',
      code: 'posterior_unnorm = prior_dist * likelihood_dist\nposterior = posterior_unnorm / np.sum(posterior_unnorm)'
    },
    realScenario: 'Radio astronomers analyzing petabytes of raw cosmic telemetry use entropy minimization filters to isolate faint pulsar electromagnetic signals from solar flare background cosmic noise.',
    useCases: [
      'Active learning acquisition functions selecting the most informative unlabeled data samples.',
      'Variational Autoencoders (VAEs) minimizing latent Gaussian KL divergence penalties.',
      'Information bottleneck analysis in deep convolutional feature hierarchies.'
    ],
    simCode: `# Shannon Entropy & Information Gain Calculator
import numpy as np

def calculate_entropy(probabilities):
    p = np.array(probabilities)
    p = p[p > 0] # Filter zero probabilities
    return -np.sum(p * np.log2(p))

# Comparison: High Uncertainty (Fair Die) vs Low Uncertainty (Biased Die)
fair_die = [1/6] * 6
biased_die = [0.85, 0.03, 0.03, 0.03, 0.03, 0.03]

print(f"Fair Die Entropy (High Uncertainty): {calculate_entropy(fair_die):.3f} bits")
print(f"Biased Die Entropy (Low Uncertainty): {calculate_entropy(biased_die):.3f} bits")
print(f"Information Gain from Bias: {calculate_entropy(fair_die) - calculate_entropy(biased_die):.3f} bits")`,
    simOutput: 'Fair Die Entropy (High Uncertainty): 2.585 bits\nBiased Die Entropy (Low Uncertainty): 0.932 bits\nInformation Gain from Bias: 1.653 bits',
    pairs: [
      { id: 'p1', term: 'Shannon Entropy', definition: 'The expected amount of information, surprise, or uncertainty inherent in a random variable’s possible outcomes.' },
      { id: 'p2', term: 'KL Divergence', definition: 'A non-symmetric measure of the difference between two probability distributions P and Q.' },
      { id: 'p3', term: 'Bayesian Updating', definition: 'A method of statistical inference where probabilities are updated as new empirical evidence is acquired.' }
    ],
    practice: {
      question: 'What is the mathematical relationship between Cross-Entropy loss and Kullback-Leibler (KL) Divergence during neural network training?',
      options: [
        'Cross-Entropy is equal to KL Divergence plus the constant entropy of the ground-truth distribution H(P).',
        'They are unrelated formulas from different branches of physics.',
        'Cross-Entropy only works for binary data, while KL divergence works for images.',
        'KL divergence always evaluates to zero on computers.'
      ],
      correctIndex: 0,
      explanation: 'Cross-Entropy $H(P, Q) = H(P) + D_{KL}(P \\parallel Q)$. Since true target entropy $H(P)$ is constant, minimizing Cross-Entropy directly minimizes KL Divergence.',
      hint: 'Think about relative entropy and constant ground-truth entropy.'
    },
    quizzes: [
      {
        question: 'Under Shannon Information Theory, when is the entropy of a discrete probability distribution maximized?',
        options: [
          { text: 'When all outcomes are equally likely (uniform distribution, maximum uncertainty).', isCorrect: true },
          { text: 'When one outcome has a 100% probability.', isCorrect: false },
          { text: 'When all probabilities are zero.', isCorrect: false },
          { text: 'When the numbers are sorted alphabetically.', isCorrect: false }
        ],
        explanation: 'Uniform probability distributions possess maximum uncertainty and therefore maximum Shannon entropy.'
      }
    ],
    practicalTask: {
      title: 'Calculate Information Gain in a Decision Tree Node Split',
      objective: 'Calculate the parent entropy and child entropy to determine Information Gain for a classification split.',
      steps: [
        'Parent node: 10 Positive, 10 Negative (Entropy = 1.0 bit).',
        'Child Left: 8 Positive, 2 Negative; Child Right: 2 Positive, 8 Negative.',
        'Compute weighted entropy of child nodes and calculate Information Gain = Parent - Children.'
      ],
      expectedResult: 'Child entropy ≈ 0.722 bits; Information Gain = 1.0 - 0.722 = 0.278 bits.'
    },
    recall: {
      question: 'What is the "Information Bottleneck Principle" in deep learning?',
      answer: 'The theory that deep networks learn optimal representations by maximizing mutual information with the target output while minimizing mutual information with irrelevant input noise.'
    },
    takeaways: [
      'Information theory formalizes learning as the systematic reduction of statistical uncertainty.',
      'Minimizing Cross-Entropy loss is mathematically equivalent to minimizing KL Divergence.',
      'Bayesian inference provides the probabilistic foundation for updating beliefs based on empirical data.'
    ]
  },

  'The Age of AI Agents': {
    title: 'The Age of AI Agents',
    hook: 'What architectural components enable autonomous AI agents to perceive environments, maintain episodic memory, formulate plans, and execute multi-step tool actions at scale?',
    goal: 'Master autonomous agent system design: Cognitive architectures (Plan-Act-Reflect), Memory hierarchies, Model Context Protocol (MCP), and multi-agent coordination.',
    learnPoints: [
      'The Cognitive Agent Architecture: Perception -> Memory Retrieval -> Task Planning -> Tool Execution -> State Evaluation.',
      'Model Context Protocol (MCP): Open industry standards for connecting AI agents to local/remote data sources and execution environments.',
      'Multi-Agent Consensus & Collaboration: Architecting hierarchical supervisor-worker networks and blackboard systems.'
    ],
    analogy: 'A standard LLM is like an author sitting in a library writing text; an AI Agent is like a field scientist equipped with a laboratory toolkit, database access, GPS, and communication radio, actively conducting experiments, recording measurements, and adapting to real-world feedback.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The field of artificial intelligence has crossed an epochal boundary from passive conversational interfaces into <strong>Autonomous AI Agents</strong>. Agents are software entities that couple foundation model reasoning backends with sensory perception, episodic memory, planning graph modules, and execution tool protocols (MCP).
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">The Multi-Agent Blackboard Architecture</h4>
          <p class="text-sm leading-relaxed">
            In complex enterprise environments, single monolithic agents encounter context window degradation and cognitive overload. Modern systems implement <strong>hierarchical multi-agent networks</strong>: a Supervisor Agent breaks down high-level objectives, delegating specialized sub-tasks to Domain Worker Agents (Database Agent, Code Agent, Web Agent) who share a centralized global state blackboard.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Model Context Protocol (MCP) Integration',
      desc: 'Expose standardized tool interfaces to the reasoning core.',
      detail: 'Implement MCP servers that expose authenticated database endpoints, filesystem hooks, and CLI tools via JSON-RPC.',
      code: 'server = FastMCP("Database-Tools")\n@server.tool()\ndef execute_sql_query(query: str) -> list: ...'
    },
    step2: {
      title: '2. Hierarchical Planning & Goal Decomposition',
      desc: 'Decompose complex goals into dependency execution graphs.',
      detail: 'Generate topological execution plans with parallelizable execution paths and error-recovery fallbacks.',
      code: 'execution_dag = planner.compile_dag(objective="Migrate MongoDB cluster to PostgreSQL with zero downtime")'
    },
    step3: {
      title: '3. Multi-Agent Consensus & Memory Sync',
      desc: 'Coordinate worker agents through a shared state blackboard.',
      detail: 'Synchronize intermediate tool outputs, verify assertions, and reconcile conflicts via majority voting or supervisor veto.',
      code: 'consensus_approved = supervisor.evaluate_worker_outputs(worker_results, threshold=0.95)'
    },
    realScenario: 'Global cloud infrastructure providers deploy autonomous SRE (Site Reliability Engineering) agents. When network outages occur, agents correlate 100,000 log events across 50 microservices, isolate failing pods, execute rollbacks, and file root-cause postmortems in 90 seconds.',
    useCases: [
      'Autonomous software engineering agents solving GitHub issues end-to-end.',
      'Automated financial audit agents reconciling cross-border banking ledgers.',
      'Multi-agent drug screening pipelines coordinating molecular generation, docking, and ADMET prediction.'
    ],
    simCode: `# Autonomous Multi-Agent Blackboard Coordinator
class MultiAgentSystem:
    def __init__(self):
        self.blackboard = {}
        
    def supervisor_delegate(self, user_goal):
        print(f"[SUPERVISOR] Decomposing Goal: '{user_goal}'")
        # Step 1: Research worker
        self.blackboard["research"] = "Found 3 CVE security vulnerabilities in auth.py"
        print(f"[WORKER_SECURITY] {self.blackboard['research']}")
        # Step 2: Patch worker
        self.blackboard["patch"] = "Applied input sanitization and RS256 token verification"
        print(f"[WORKER_DEV] {self.blackboard['patch']}")
        # Step 3: QA Verifier
        self.blackboard["qa_status"] = "All 28 regression tests PASSED in isolated sandbox"
        print(f"[WORKER_QA] {self.blackboard['qa_status']}")
        
        return {"status": "GOAL_COMPLETED", "blackboard_state": self.blackboard}

system = MultiAgentSystem()
result = system.supervisor_delegate("Audit and patch authentication vulnerabilities in repository")`,
    simOutput: "[SUPERVISOR] Decomposing Goal: 'Audit and patch authentication vulnerabilities in repository'\n[WORKER_SECURITY] Found 3 CVE security vulnerabilities in auth.py\n[WORKER_DEV] Applied input sanitization and RS256 token verification\n[WORKER_QA] All 28 regression tests PASSED in isolated sandbox",
    pairs: [
      { id: 'p1', term: 'Model Context Protocol (MCP)', definition: 'An open standard for seamlessly connecting AI models to secure local and remote data sources and tools.' },
      { id: 'p2', term: 'Blackboard Architecture', definition: 'A multi-agent coordination pattern where specialized agents read from and write to a shared global working memory.' },
      { id: 'p3', term: 'Autonomous Agent', definition: 'A software system that perceives its environment, makes decisions, and takes autonomous multi-step actions to achieve a goal.' }
    ],
    practice: {
      question: 'What is the primary architectural purpose of the Model Context Protocol (MCP) in modern AI agent development?',
      options: [
        'To establish an open, standardized protocol for securely connecting LLM agents to external databases, filesystems, and developer tools.',
        'To speed up computer monitor refresh rates.',
        'To make neural networks smaller by deleting layers.',
        'To encrypt text files with secret passwords.'
      ],
      correctIndex: 0,
      explanation: 'MCP provides a universal, standardized interface enabling AI models to interact with local and remote data sources and execution tools seamlessly.',
      hint: 'Think about standardizing how models talk to external tools and databases.'
    },
    quizzes: [
      {
        question: 'Why are hierarchical supervisor-worker multi-agent networks superior to single monolithic prompts for complex software engineering tasks?',
        options: [
          { text: 'They distribute cognitive load, isolate security permissions, enable specialized domain prompting, and prevent context window degradation.', isCorrect: true },
          { text: 'They require zero electricity.', isCorrect: false },
          { text: 'They can only be programmed in C++.', isCorrect: false },
          { text: 'They eliminate the need for computer processors.', isCorrect: false }
        ],
        explanation: 'Decomposing complex tasks across specialized agents prevents context overflow and allows dedicated verification at each step.'
      }
    ],
    practicalTask: {
      title: 'Design an MCP Tool Server Specification in Python',
      objective: 'Define an MCP server with JSON Schema tool definitions for querying an enterprise ERP database.',
      steps: [
        'Initialize FastMCP server instance.',
        'Define tool `query_inventory(product_sku: str) -> dict` with parameter type descriptions.',
        'Implement error handling: return structured JSON errors on database timeouts.'
      ],
      expectedResult: 'Complete, compliant MCP tool server ready for integration into agent orchestration frameworks.'
    },
    recall: {
      question: 'What is a "Tool Reflection Loop" in agent execution?',
      answer: 'When an agent inspects the output or error code of an executed tool call and dynamically adjusts its next action based on the result.'
    },
    takeaways: [
      'AI agents combine reasoning models with perception, tools, and persistent memory.',
      'The Model Context Protocol (MCP) standardizes agent tool and data integrations.',
      'Multi-agent blackboard architectures enable scalable, fault-tolerant enterprise automation.'
    ]
  }
}
