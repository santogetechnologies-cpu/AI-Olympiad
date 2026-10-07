import type { TopicProfile } from './curriculumTopicRegistry'

export const CLASS12_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'The World of Generative AI': {
    title: 'The World of Generative AI',
    hook: 'How did generative AI evolve from early statistical Markov models to modern multimodal foundation models capable of reasoning across text, audio, and vision?',
    goal: 'Understand the architectural paradigm shift from task-specific recurrent networks to unified foundation models, scaling laws, and emergent capabilities.',
    learnPoints: [
      'The evolution of generative models: From N-gram Markov chains and VAEs to Diffusion and Transformer architectures.',
      'Scaling Laws (Kaplan & Chinchilla): The mathematical relationship between compute (FLOPs), dataset token volume, parameter count, and loss reduction.',
      'Emergent capabilities: Why complex in-context reasoning behaviors appear abruptly at critical parameter and compute thresholds.'
    ],
    analogy: 'Early task-specific AI was like having a collection of 50 single-purpose pocket tools (one for translation, one for grammar, one for math); modern foundation models are like a universal polymorph alloy that molds itself dynamically to solve whatever task is presented to it.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The emergence of <strong>Generative AI</strong> represents the most profound paradigm shift in computer science since the invention of the internet. Historically, machine learning required engineering separate specialized models for translation, sentiment analysis, speech recognition, and visual classification. Today, unified <strong>Multimodal Foundation Models</strong> process arbitrary sensory tokens within a shared semantic latent space.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">Chinchilla Compute-Optimal Scaling Laws</h4>
          <p class="text-sm leading-relaxed">
            DeepMind’s Chinchilla research established that for compute-optimal training, model parameter count ($N$) and training token count ($D$) should be scaled in equal proportion: for every doubling of model parameters, the training dataset volume must also double. Training a 70B model requires roughly 1.4 to 2.0 trillion tokens to prevent severe underfitting.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Foundation Pre-Training on Web-Scale Corpora',
      desc: 'Train autoregressive transformers on trillions of tokens.',
      detail: 'Execute self-supervised next-token prediction across multi-terabyte datasets using causal masking and mixed-precision (BF16).',
      code: 'loss = cross_entropy(logits[:, :-1, :], tokens[:, 1:]) # Causal next-token objective'
    },
    step2: {
      title: '2. Instruction Fine-Tuning (SFT)',
      desc: 'Align base model completions with human conversational instructions.',
      detail: 'Fine-tune pretrained weights on high-quality curated multi-turn dialogue pairs to convert raw text completers into responsive assistants.',
      code: 'formatted_prompt = f"<|im_start|>user\\n{user_query}<|im_end|>\\n<|im_start|>assistant\\n"'
    },
    step3: {
      title: '3. Preference Alignment (RLHF / DPO)',
      desc: 'Optimize model behavior using human preference scoring.',
      detail: 'Apply Direct Preference Optimization (DPO) to maximize reward margins on preferred responses without auxiliary reward model instability.',
      code: 'dpo_loss = -torch.log(torch.sigmoid(beta * (log_pi_win - log_ref_win - (log_pi_lose - log_ref_lose))))'
    },
    realScenario: 'Global meteorological agencies deployed a generative multimodal weather foundation model trained on 40 years of ECMWF atmospheric reanalysis data, forecasting hurricane tracks 10 days in advance with higher accuracy than 10,000-node supercomputer numerical weather simulations.',
    useCases: [
      'Universal multimodal document comprehension across handwritten archives, tables, and blueprints.',
      'Synthetic genomic sequence generation for custom therapeutic enzyme design.',
      'Real-time automated code refactoring and translation across distributed enterprise microservices.'
    ],
    simCode: `# Compute-Optimal Training FLOPs Calculator (Chinchilla Formula)
def compute_chinchilla_flops(params_billions, tokens_trillions):
    N = params_billions * 1e9
    D = tokens_trillions * 1e12
    # Standard training FLOPs approximation: C ≈ 6 * N * D
    flops = 6 * N * D
    # Number of H100 GPU days (H100 FP16 peak ~ 1000 TFLOPs at 40% MFU)
    effective_h100_tflops = 400 * 1e12
    gpu_days = (flops / effective_h100_tflops) / (24 * 3600)
    
    return {
        "Total Compute FLOPs": f"{flops:.2e}",
        "Estimated H100 GPU Days": round(gpu_days, 1),
        "Optimal Status": "Well-Balanced Compute Allocation" if (D / N >= 20) else "Under-Trained Parameter Capacity"
    }

print(compute_chinchilla_flops(params_billions=70, tokens_trillions=2.0))`,
    simOutput: "{'Total Compute FLOPs': '8.40e+23', 'Estimated H100 GPU Days': 24305.6, 'Optimal Status': 'Well-Balanced Compute Allocation'}",
    pairs: [
      { id: 'p1', term: 'Foundation Model', definition: 'A large-scale model trained on broad data at scale that can be adapted to a wide range of downstream tasks.' },
      { id: 'p2', term: 'Chinchilla Scaling Law', definition: 'The empirical law proving that model parameters and training dataset size should scale in equal proportion for optimal compute efficiency.' },
      { id: 'p3', term: 'DPO', definition: 'Direct Preference Optimization: aligning language models with human preferences directly using closed-form mathematical objectives.' }
    ],
    practice: {
      question: 'According to modern scaling laws (Chinchilla), what is the most compute-efficient way to train a next-generation language model given a 4x increase in compute budget?',
      options: [
        'Make the model 4x larger while keeping the dataset size the same.',
        'Scale both the parameter count by 2x and the training token volume by 2x.',
        'Train the model for only 1 minute.',
        'Delete half of the neural network layers.'
      ],
      correctIndex: 1,
      explanation: 'Chinchilla scaling laws demonstrate that optimal compute allocation requires scaling parameters (N) and tokens (D) in equal proportion (2x * 2x = 4x compute).',
      hint: 'Remember the balanced 1:1 scaling relationship between parameters and dataset size.'
    },
    quizzes: [
      {
        question: 'What is "RLHF" (Reinforcement Learning from Human Feedback) in the generative AI lifecycle?',
        options: [
          { text: 'A post-training alignment stage where models are optimized using human preference comparisons to be helpful, honest, and harmless.', isCorrect: true },
          { text: 'A tool for cleaning computer screens with microfiber cloths.', isCorrect: false },
          { text: 'A method for compressing MP3 audio files.', isCorrect: false },
          { text: 'A database query language.', isCorrect: false }
        ],
        explanation: 'RLHF guides raw pretrained token predictors to align with human values, instructions, and safety boundaries.'
      }
    ],
    practicalTask: {
      title: 'Calculate Compute Requirements for a 13B Model',
      objective: 'Calculate the total FLOPs and compute budget needed to train a 13B parameter model on 1 Trillion tokens.',
      steps: [
        'Apply the standard formula: FLOPs = 6 * N * D.',
        'Substitute N = 13e9 and D = 1e12.',
        'Compute total FLOPs: 6 * 13e9 * 1e12 = 7.8e22 FLOPs.',
        'Estimate GPU hours at 300 TFLOP/s average hardware utilization.'
      ],
      expectedResult: 'Total FLOPs = 7.8e22; approx. 72,222 H100 GPU hours.'
    },
    recall: {
      question: 'What is an "Emergent Capability" in large language models?',
      answer: 'A capability or reasoning behavior that does not appear in smaller models but surfaces abruptly when the model surpasses a specific scale threshold.'
    },
    takeaways: [
      'Generative AI has unified disparate ML tasks under shared foundation model architectures.',
      'Scaling laws mathematically govern the balance between parameter size, dataset tokens, and compute.',
      'Post-training alignment (SFT, RLHF, DPO) turns raw autocomplete engines into reliable assistants.'
    ]
  },

  'Understanding LLMs': {
    title: 'Understanding LLMs',
    hook: 'How does the mathematical mechanism of Multi-Head Self-Attention $(QK^T / \\sqrt{d_k})$ allow transformers to calculate contextual relationships across 100,000 tokens in parallel?',
    goal: 'Master Transformer internals: Scaled Dot-Product Attention, Query-Key-Value matrices, Positional Embeddings (RoPE), and KV-Cache mechanics.',
    learnPoints: [
      'Scaled Dot-Product Attention: The core formula $\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$.',
      'Rotary Positional Embeddings (RoPE): Rotating query and key vectors in complex 2D subspaces to encode relative token distances.',
      'KV-Cache Optimization: Storing previous token Key and Value projection tensors to eliminate redundant $O(N^2)$ recalculations during autoregressive decoding.'
    ],
    analogy: 'Imagine being in a crowded library research room with 1,000 scholars: Query is the specific question you shout out, Key is the subject label on every scholar’s desk, Dot-Product is how well your question matches their sign, and Value is the actual knowledge they hand you back.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The foundation of all Large Language Models (LLMs) is the <strong>Transformer architecture</strong>, introduced in the landmark 2017 paper <em>Attention Is All You Need</em>. Unlike legacy Recurrent Neural Networks (RNNs) which processed text sequentially one token at a time, Transformers process entire token sequences simultaneously through <strong>Multi-Head Self-Attention</strong>.
        </p>
        <div class="bg-purple-50 dark:bg-purple-950/40 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
          <h4 class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2">The Scaled Dot-Product Attention Formulation</h4>
          <p class="text-sm leading-relaxed">
            Given input token embeddings $X$, three linear projections produce Queries ($Q = XW_Q$), Keys ($K = XW_K$), and Values ($V = XW_V$).
            $$\\text{Attention}(Q, K, V) = \\text{Softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
            The scaling factor $\\sqrt{d_k}$ prevents the dot products from growing excessively large in high dimensions, which would cause Softmax gradients to vanish.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Linear Q, K, V Tensor Projections',
      desc: 'Project input token embeddings into Query, Key, and Value subspaces.',
      detail: 'Multiply the batch token embedding matrix by learned parameter weights $W_Q, W_K, W_V$.',
      code: 'Q = torch.matmul(X, W_q)\nK = torch.matmul(X, W_k)\nV = torch.matmul(X, W_v)'
    },
    step2: {
      title: '2. Scaled Attention Matrix Computation',
      desc: 'Compute pairwise token affinity scores and apply causal masking.',
      detail: 'Multiply $Q$ and $K^T$, divide by $\\sqrt{d_k}$, apply upper-triangular causal mask to prevent peeking at future tokens, and compute Softmax.',
      code: 'scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\nscores.masked_fill_(causal_mask == 0, float("-inf"))\nweights = F.softmax(scores, dim=-1)'
    },
    step3: {
      title: '3. Value Aggregation & KV-Caching',
      desc: 'Multiply attention probabilities by Values and cache for next token.',
      detail: 'Aggregate Value vectors and store current step $K, V$ slices into GPU SRAM memory to accelerate subsequent token generation.',
      code: 'context = torch.matmul(weights, V)\nkv_cache.update(new_k, new_v) # O(1) decoding step'
    },
    realScenario: 'In production code completion engines, maintaining an optimized KV-Cache with FlashAttention-2 enables real-time sub-15ms token streaming over 32,000 lines of active repository context.',
    useCases: [
      'Multi-document legal contract conflict detection across 500-page discovery bundles.',
      'Whole-genome chromatin interaction mapping using nucleotide transformer attention.',
      'Ultra-long context conversational memory in enterprise customer service agents.'
    ],
    simCode: `# Minimal Multi-Head Attention Simulator in Pure NumPy
import numpy as np

def self_attention(X, d_k=4):
    # X: (seq_len=3, d_model=4)
    np.random.seed(42)
    W_q = np.random.randn(4, d_k)
    W_k = np.random.randn(4, d_k)
    W_v = np.random.randn(4, d_k)
    
    Q = np.dot(X, W_q)
    K = np.dot(X, W_k)
    V = np.dot(X, W_v)
    
    # Attention scores
    scores = np.dot(Q, K.T) / np.sqrt(d_k)
    # Softmax per row
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    output = np.dot(attention_weights, V)
    return attention_weights, output

X_sample = np.array([[1.0, 0.5, -0.2, 0.1], [0.2, 1.2, 0.8, -0.5], [-0.4, 0.1, 1.5, 0.9]])
weights, out = self_attention(X_sample)
print("Attention Weights Matrix (3x3):\n", np.round(weights, 3))
print("\nContextualized Output Tensor Shape:", out.shape)`,
    simOutput: 'Attention Weights Matrix (3x3):\n [[0.824 0.102 0.074]\n [0.038 0.892 0.070]\n [0.012 0.045 0.943]]\n\nContextualized Output Tensor Shape: (3, 4)',
    pairs: [
      { id: 'p1', term: 'Self-Attention', definition: 'The mechanism allowing each token in a sequence to attend to and aggregate contextual information from all other tokens.' },
      { id: 'p2', term: 'KV-Cache', definition: 'A memory optimization technique that stores previous Key and Value tensors in GPU RAM during autoregressive generation.' },
      { id: 'p3', term: 'FlashAttention', definition: 'An exact attention algorithm that reorganizes GPU SRAM read/writes to achieve massive speedups and memory reductions.' }
    ],
    practice: {
      question: 'Why do Transformers divide the dot product matrix $QK^T$ by the scaling factor $\\sqrt{d_k}$ before computing the Softmax function?',
      options: [
        'To reduce the font size of the text.',
        'To prevent dot products from growing excessively large in high dimensions, which would push Softmax into regions with vanishingly small gradients.',
        'To make the model run without using GPUs.',
        'To invert the colors of the image.'
      ],
      correctIndex: 1,
      explanation: 'In high dimensions, vector dot products have high variance; dividing by $\\sqrt{d_k}$ stabilizes variance to 1.0, preserving healthy backpropagation gradients.',
      hint: 'Think about what happens to Softmax gradients when input values are extremely large numbers.'
    },
    quizzes: [
      {
        question: 'What is the algorithmic time complexity of standard Self-Attention with respect to sequence length $N$?',
        options: [
          { text: 'Quadratic: O(N²)', isCorrect: true },
          { text: 'Linear: O(N)', isCorrect: false },
          { text: 'Constant: O(1)', isCorrect: false },
          { text: 'Logarithmic: O(log N)', isCorrect: false }
        ],
        explanation: 'Because every token computes a dot product with every other token in the sequence, standard attention scales quadratically ($N \\times N$).'
      }
    ],
    practicalTask: {
      title: 'Trace Scaled Dot-Product Attention Manually',
      objective: 'Calculate the attention weights between a Query vector and 2 Key vectors.',
      steps: [
        'Given Q = [1, 2], K1 = [1, 2], K2 = [0, 1], d_k = 2.',
        'Compute dot products: Q·K1 = 1(1) + 2(2) = 5. Q·K2 = 1(0) + 2(1) = 2.',
        'Scale by sqrt(2) ≈ 1.414: S1 = 5 / 1.414 = 3.536, S2 = 2 / 1.414 = 1.414.',
        'Apply Softmax: e^3.536 = 34.33, e^1.414 = 4.11 -> W1 = 34.33 / 38.44 = 0.893, W2 = 0.107.'
      ],
      expectedResult: 'Attention Weights: [Token 1: 89.3%, Token 2: 10.7%].'
    },
    recall: {
      question: 'What is the purpose of Causal Masking in Decoder-Only transformers (like GPT)?',
      answer: 'It sets attention scores for all future tokens to negative infinity so the model cannot look ahead at subsequent words during training.'
    },
    takeaways: [
      'Self-Attention allows every token to dynamically weigh all other tokens in the sequence.',
      'The scaling factor sqrt(d_k) prevents vanishing gradients during Softmax computation.',
      'KV-caching and FlashAttention are critical systems optimizations for production LLM serving.'
    ]
  },

  'Prompt → Plan → Produce': {
    title: 'Prompt → Plan → Produce',
    hook: 'How do autonomous multi-agent frameworks break massive enterprise engineering problems into verifiable plans, code, and executed products?',
    goal: 'Master autonomous agent orchestration: ReAct patterns, task decomposition graphs (DAGs), reflection loops, and multi-agent consensus.',
    learnPoints: [
      'Directed Acyclic Graphs (DAGs) in agent planning: Decomposing high-level user intents into sequential and parallel sub-tasks.',
      'Self-Reflection & Critique Loops: Self-debugging, runtime error recovery, and unit test validation before output delivery.',
      'Multi-Agent Architectures: Specializing agents into Planner, Coder, Critic, and Verifier roles.'
    ],
    analogy: 'Prompt -> Plan -> Produce is like a modern software startup in a box: the User is the Client, the Planner Agent is the Product Architect drafting sprint tickets, the Coder Agent writes the software, and the Critic/Verifier Agent runs automated QA tests before deployment.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The cutting edge of LLM application development has moved beyond single prompt-response interactions into <strong>Autonomous AI Agent Systems</strong>. Operating under the <strong>Prompt → Plan → Produce</strong> framework, agent systems do not generate immediate raw answers; they deliberate, formulate dependency execution graphs (DAGs), invoke external computational tools, and verify outputs through self-reflection loops.
        </p>
        <div class="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">The Multi-Agent Reflection Loop</h4>
          <p class="text-sm leading-relaxed">
            In a high-reliability architecture, a <em>Planner Agent</em> first parses the user request into formal structured sub-tasks. The <em>Coder Agent</em> generates an implementation, which is passed to an isolated sandbox environment. If a unit test fails or a linter flags an error, the error stack trace is routed back to the Coder Agent with a reflection prompt to self-correct before the user ever sees the result.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Goal Parsing & DAG Task Decomposition',
      desc: 'Decompose user objectives into executable dependency nodes.',
      detail: 'Construct a Directed Acyclic Graph (DAG) with explicit prerequisite steps, inputs, and expected output schemas.',
      code: 'plan = {"nodes": [{"id": "fetch_data", "tool": "api_get"}, {"id": "process", "deps": ["fetch_data"]}]}'
    },
    step2: {
      title: '2. Tool Invocation & Sandbox Execution',
      desc: 'Execute code and system actions in secured containers.',
      detail: 'Dispatch tool calls via structured JSON RPC interfaces, capturing stdout, stderr, and exit status codes.',
      code: 'exec_result = docker_sandbox.run("python -m unittest tests/test_payment.py")'
    },
    step3: {
      title: '3. Critique, Reflection & Self-Healing',
      desc: 'Evaluate execution outcomes against acceptance criteria.',
      detail: 'If tests fail, inject error traceback into a reflection prompt: "Fix the IndexError on line 42 without altering function signatures".',
      code: 'if exec_result.exit_code != 0:\n    new_code = coder_agent.reflect_and_fix(code, exec_result.stderr)'
    },
    realScenario: 'A cybersecurity incident response firm deployed multi-agent planning systems. Upon detecting a server breach alert, the agent DAG quarantined compromised IPs, extracted firewall logs, and drafted a forensic incident report in 45 seconds.',
    useCases: [
      'Autonomous full-stack web application scaffolding from natural language wireframes.',
      'Automated financial portfolio rebalancing and SEC filing compilation.',
      'Closed-loop scientific literature synthesis and hypothesis ranking.'
    ],
    simCode: `# Autonomous Agent Reflection Loop Simulation
class AgentOrchestrator:
    def execute_with_reflection(self, task_goal):
        plan = ["Step 1: Ingest CSV", "Step 2: Calculate Metrics", "Step 3: Render Chart"]
        print("Generated Execution Plan:", plan)
        
        # Simulated run with error and self-correction
        attempt = 1
        code = "metrics = data['revenue'] / 0 # Bug"
        while attempt <= 2:
            try:
                print(f"Executing Attempt {attempt}...")
                if "/ 0" in code:
                    raise ZeroDivisionError("division by zero in metric calculation")
                print("Execution Succeeded with Zero Errors.")
                return {"status": "SUCCESS", "attempts": attempt}
            except Exception as e:
                print(f"Runtime Exception Caught: {e}")
                print("Triggering Self-Healing Reflection Engine...")
                code = "metrics = data['revenue'] / max(1, data['users']) # Fixed"
                attempt += 1
        return {"status": "FAILED"}

agent = AgentOrchestrator()
print(agent.execute_with_reflection("Generate monthly financial KPI dashboard"))`,
    simOutput: "Generated Execution Plan: ['Step 1: Ingest CSV', 'Step 2: Calculate Metrics', 'Step 3: Render Chart']\nExecuting Attempt 1...\nRuntime Exception Caught: division by zero in metric calculation\nTriggering Self-Healing Reflection Engine...\nExecuting Attempt 2...\nExecution Succeeded with Zero Errors.\n{'status': 'SUCCESS', 'attempts': 2}",
    pairs: [
      { id: 'p1', term: 'DAG (Directed Acyclic Graph)', definition: 'A structural task graph where dependencies flow in one direction without circular loops.' },
      { id: 'p2', term: 'Self-Reflection', definition: 'The mechanism where an LLM inspects its own execution errors and iterates to self-correct mistakes.' },
      { id: 'p3', term: 'Tool Calling / MCP', definition: 'Standardized protocols allowing AI models to execute external APIs, databases, and sandboxed code.' }
    ],
    practice: {
      question: 'What is the primary advantage of a Multi-Agent Architecture with specialized roles over a single monolithic prompt?',
      options: [
        'It makes the server computer run without electricity.',
        'Decomposing tasks across specialized agents (Planner, Coder, Critic) isolates concerns, enables self-reflection, and drastically reduces hallucinations.',
        'It deletes all bugs from the internet automatically.',
        'It produces shorter code files.'
      ],
      correctIndex: 1,
      explanation: 'Separating planning, execution, and verification allows distinct validation checks and automated self-correction before delivering results.',
      hint: 'Think about why software teams have separate Architects, Developers, and QA Testers.'
    },
    quizzes: [
      {
        question: 'What happens during an automated "Self-Healing Reflection Loop" in an AI coding agent?',
        options: [
          { text: 'The agent captures compiler errors or failing unit tests, diagnoses the root cause, and generates targeted bug fixes iteratively.', isCorrect: true },
          { text: 'The agent turns off the computer.', isCorrect: false },
          { text: 'The agent sends an invoice to the user.', isCorrect: false },
          { text: 'The agent converts the project into an audio file.', isCorrect: false }
        ],
        explanation: 'Self-healing loops feed runtime stack traces back into the prompt context so the model can fix logic and syntax bugs autonomously.'
      }
    ],
    practicalTask: {
      title: 'Design a Multi-Agent Workflow DAG for Bug Triage',
      objective: 'Construct a structured JSON execution plan separating Triage, Reproduction, and Fix agents.',
      steps: [
        'Define 3 agent nodes: (1) TriageAgent [extracts error logs], (2) RepoAgent [spins up sandbox], (3) FixAgent [writes patch].',
        'Specify dependencies: RepoAgent depends on TriageAgent; FixAgent depends on RepoAgent.',
        'Define pass/fail criteria: Unit tests in RepoAgent must pass 100% for approval.'
      ],
      expectedResult: 'Complete structured DAG execution graph ready for agent framework deployment.'
    },
    recall: {
      question: 'What is a "Sandbox Environment" in AI agent execution?',
      answer: 'An isolated, secure container (like Docker) where agent-generated code can be executed safely without risking damage to the host system or network.'
    },
    takeaways: [
      'Autonomous agent systems decompose ambiguous user goals into structured DAG plans.',
      'Multi-agent separation of concerns improves reliability and reduces hallucinations.',
      'Reflection loops enable autonomous error diagnosis and self-healing software execution.'
    ]
  },

  'AI Workflow Basics': {
    title: 'AI Workflow Basics',
    hook: 'How do modern enterprises bridge the gap between static foundation models and dynamic private corporate data using Retrieval-Augmented Generation (RAG)?',
    goal: 'Master enterprise AI workflow architectures: Chunking strategies, Vector Databases (HNSW indexing), Embedding search, and RAG pipelines.',
    learnPoints: [
      'Retrieval-Augmented Generation (RAG): Grounding LLM responses in real-time external knowledge without model retraining.',
      'Document Chunking & Vector Embeddings: Semantic chunking algorithms, overlap windows, and embedding dimensionalities.',
      'Vector Search Indexing: Hierarchical Navigable Small World (HNSW) graphs and Cosine Similarity nearest-neighbor retrieval.'
    ],
    analogy: 'A standalone LLM is like a brilliant student taking an exam strictly from memory (frozen at training time); a RAG system is like that same student taking an open-book exam with instant access to the entire company library with an automated index librarian.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Foundation models possess broad reasoning capabilities, but their knowledge is frozen at training time and completely unaware of private enterprise documents. <strong>Retrieval-Augmented Generation (RAG)</strong> has emerged as the standard enterprise AI architecture, combining the retrieval speed of <strong>Vector Databases</strong> with the synthesis capabilities of LLMs.
        </p>
        <div class="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h4 class="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">The 3-Phase RAG Pipeline</h4>
          <ol class="text-sm space-y-2 list-decimal list-inside">
            <li><strong>Ingestion & Indexing:</strong> Unstructured PDFs and documentation are parsed, split into semantic chunks (e.g. 512 tokens with 50-token overlap), converted into 1536-dimensional embeddings, and stored in vector indexes (Pinecone, pgvector).</li>
            <li><strong>Retrieval:</strong> When a user asks a question, the query is embedded, and the vector DB retrieves top-$k$ nearest chunks via cosine distance.</li>
            <li><strong>Augmented Generation:</strong> The retrieved context chunks and user query are injected into an augmented prompt for hallucination-free generation.</li>
          </ol>
        </div>
      </div>
    `,
    step1: {
      title: '1. Document Ingestion & Semantic Chunking',
      desc: 'Split long documents into coherent semantic segments.',
      detail: 'Use recursive character or markdown-aware chunking with token overlaps to preserve context boundaries.',
      code: 'from langchain.text_splitter import RecursiveCharacterTextSplitter\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_text(raw_document)'
    },
    step2: {
      title: '2. Vector Embedding & Database Indexing',
      desc: 'Convert text chunks into mathematical vector representations.',
      detail: 'Generate dense embeddings using embedding models and index them in a vector database with HNSW metric.',
      code: 'embeddings = embed_model.encode(chunks)\nvector_db.upsert(vectors=zip(chunk_ids, embeddings, metadata))'
    },
    step3: {
      title: '3. Context Retrieval & Prompt Synthesis',
      desc: 'Query vector space and synthesize grounded answers.',
      detail: 'Retrieve top-3 similar chunks via cosine similarity and inject into system prompt template.',
      code: 'context_docs = vector_db.query(query_embedding, top_k=3)\naugmented_prompt = f"Answer using ONLY this context:\\n{context_docs}\\n\\nQuestion: {query}"'
    },
    realScenario: 'A multinational airline implemented a RAG workflow indexing 250,000 pages of aircraft maintenance manuals. Mechanics query the system in natural language to retrieve exact torque specs and wiring schematics in 2 seconds, reducing flight turnaround delays by 18%.',
    useCases: [
      'Customer support chatbots answering questions strictly grounded in company policy documents.',
      'Automated legal contract discovery and compliance cross-referencing.',
      'Internal engineering codebase search and documentation question-answering.'
    ],
    simCode: `# Minimal End-to-End RAG Simulator
import numpy as np

# Mock Knowledge Base
corpus = [
    {"id": 1, "text": "The corporate refund policy allows 30-day full refunds with original receipt.", "vec": np.array([0.9, 0.1, 0.2])},
    {"id": 2, "text": "Office hours for technical support are Monday through Friday, 8am to 6pm EST.", "vec": np.array([0.1, 0.8, 0.3])},
    {"id": 3, "text": "Server maintenance window occurs every Saturday at 2:00 AM UTC.", "vec": np.array([0.2, 0.3, 0.9])}
]

# User Query: "Can I get my money back after 2 weeks?"
query_vec = np.array([0.88, 0.15, 0.18])

# Step 1: Vector Search (Cosine Similarity)
def cosine_sim(a, b): return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
best_doc = max(corpus, key=lambda d: cosine_sim(query_vec, d["vec"]))

print(f"Query Vector Matched Most Relevant Chunk (ID {best_doc['id']}):")
print(f"Retrieved Context: '{best_doc['text']}'")
print(f"Synthesized Grounded Answer: Yes, your request falls within the 30-day refund window.")`,
    simOutput: "Query Vector Matched Most Relevant Chunk (ID 1):\nRetrieved Context: 'The corporate refund policy allows 30-day full refunds with original receipt.'\nSynthesized Grounded Answer: Yes, your request falls within the 30-day refund window.",
    pairs: [
      { id: 'p1', term: 'RAG', definition: 'Retrieval-Augmented Generation: enhancing LLM prompts with relevant external documents retrieved from a vector database.' },
      { id: 'p2', term: 'Vector Database', definition: 'A specialized database designed to store, index, and query high-dimensional vector embeddings with millisecond latency.' },
      { id: 'p3', term: 'Semantic Chunking', definition: 'Dividing text documents into meaningful conceptual segments to optimize retrieval accuracy.' }
    ],
    practice: {
      question: 'Why is Retrieval-Augmented Generation (RAG) often preferred over fine-tuning a base model for enterprise question-answering?',
      options: [
        'Because fine-tuning is illegal for businesses.',
        'RAG allows instant updates to corporate knowledge without expensive retraining, eliminates hallucinations by citing exact sources, and respects access control permissions.',
        'Because RAG models do not require electricity.',
        'Because fine-tuned models can only speak Latin.'
      ],
      correctIndex: 1,
      explanation: 'RAG decouples knowledge storage from model weights, allowing real-time document updates, source attribution, and role-based security access.',
      hint: 'Think about what happens when company policy changes tomorrow morning.'
    },
    quizzes: [
      {
        question: 'What is the purpose of the "chunk overlap" parameter when splitting documents for a vector database?',
        options: [
          { text: 'To ensure that sentences and context split across chunk boundaries are not lost or fragmented.', isCorrect: true },
          { text: 'To make the database file size twice as big on purpose.', isCorrect: false },
          { text: 'To delete duplicate files.', isCorrect: false },
          { text: 'To encrypt the text with a password.', isCorrect: false }
        ],
        explanation: 'Chunk overlap maintains continuity across boundaries, preventing vital context from being split in half.'
      }
    ],
    practicalTask: {
      title: 'Build a RAG Prompt Injection Template',
      objective: 'Write a Python function that formats retrieved database context into a secure, grounded LLM prompt.',
      steps: [
        'Accept user query string and a list of retrieved text chunk strings.',
        'Format prompt with strict system instructions: "Answer ONLY using facts from the provided context. If unknown, state \'I do not have sufficient information\'".',
        'Test with sample company security policy context.'
      ],
      expectedResult: 'Clean, formatted prompt string ready for LLM API invocation.'
    },
    recall: {
      question: 'What is HNSW in vector databases?',
      answer: 'Hierarchical Navigable Small World: an efficient graph-based indexing algorithm for approximate nearest neighbor search in high dimensions.'
    },
    takeaways: [
      'RAG connects static foundation models to dynamic private corporate knowledge bases.',
      'Vector databases perform fast semantic search over high-dimensional text embeddings.',
      'Effective chunking and strict grounding prompts prevent hallucinations in production.'
    ]
  },

  'AI for Innovation': {
    title: 'AI for Innovation',
    hook: 'How are generative AI and physics-informed neural networks revolutionizing structural engineering, aerodynamics, and clean fusion energy?',
    goal: 'Explore frontier AI applications in physical sciences: generative CAD topology optimization, fusion plasma containment, and climate modeling.',
    learnPoints: [
      'Generative Topology Optimization: Using generative algorithms to design lightweight, high-strength aerospace components.',
      'Reinforcement Learning in Nuclear Fusion: Controlling 100-million-degree plasma magnetic coils in tokamak reactors in real-time.',
      'Neural Climate Emulators: Simulating century-scale planetary climate scenarios 10,000x faster than traditional fluid dynamic models.'
    ],
    analogy: 'Traditional engineering design is like carving a sculpture by hand: human engineers draw familiar geometric shapes (rectangles, cylinders). AI generative engineering is like biological evolution: growing organic, bone-like structural lattices that maximize strength while eliminating 40% of unnecessary weight.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The application of artificial intelligence to physical sciences represents the frontier of technological innovation. By merging <strong>deep learning architectures with first-principles physical laws</strong>, engineers are designing structures, materials, and energy systems previously unimaginable through conventional analytical methods.
        </p>
        <div class="bg-teal-50 dark:bg-teal-950/40 p-5 rounded-xl border border-teal-200 dark:border-teal-800">
          <h4 class="text-lg font-bold text-teal-900 dark:text-teal-300 mb-2">Tokamak Fusion Plasma Reinforcement Learning</h4>
          <p class="text-sm leading-relaxed">
            In experimental nuclear fusion (tokamaks), hydrogen plasma reaches 100 million degrees Celsius—hotter than the sun's core. Because physical probes would melt instantly, the plasma must be suspended in mid-air using 19 magnetic actuator coils. Deep reinforcement learning models adjust coil voltages 10,000 times per second, dynamically sculpting plasma shape and preventing catastrophic thermal disruptions.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Physics-Informed Boundary Formulation',
      desc: 'Define finite element structural load constraints.',
      detail: 'Specify stress tensors, aerodynamic shear forces, and thermal gradients as boundary condition matrices.',
      code: 'boundary_conditions = {"fixed_nodes": [0, 1, 2], "applied_force_N": [0, -5000, 0]}'
    },
    step2: {
      title: '2. Generative Topology Optimization',
      desc: 'Evolve structural density distributions iteratively.',
      detail: 'Execute SIMP (Solid Isotropic Material with Penalization) or diffusion-based topology synthesis to eliminate low-stress material.',
      code: 'density_grid = topology_optimizer.evolve(boundary_conditions, target_mass_fraction=0.45)'
    },
    step3: {
      title: '3. Additive 3D Manufacturing Export',
      desc: 'Convert neural density fields into 3D printable meshes.',
      detail: 'Export optimized organic geometry into STEP/STL CAD formats for direct titanium laser sintering (3D printing).',
      code: 'export_mesh(density_grid, format="STL", resolution_mm=0.05)'
    },
    realScenario: 'Airbus used generative AI topology optimization to redesign an airplane cabin partition partition. The resulting organic bionic design was 45% lighter while maintaining the exact same crash safety rating, saving 500,000 metric tons of jet fuel emissions across the fleet.',
    useCases: [
      'Autonomous aerodynamic wing shape optimization for supersonic commercial aircraft.',
      'Predictive wildfire spread simulation and municipal evacuation routing.',
      'Superconducting magnetic coil layout optimization for stellarator fusion reactors.'
    ],
    simCode: `# Generative Topology Optimization Stress Minimizer
class TopologyOptimizer:
    def optimize_beam(self, length_m, load_kn, max_weight_kg):
        # Stress-to-weight optimization simulation
        raw_material_kg = length_m * 100.0
        optimized_weight_kg = raw_material_kg * 0.55 # 45% reduction
        safety_factor = 2.4
        
        return {
            "Original Solid Weight": f"{raw_material_kg:.1f} kg",
            "AI Organic Optimized Weight": f"{optimized_weight_kg:.1f} kg",
            "Weight Reduction": "45.0%",
            "Safety Factor Margin": f"{safety_factor}x (Exceeds Aerospace Standards)",
            "Status": "READY_FOR_3D_TITANIUM_PRINTING"
        }

opt = TopologyOptimizer()
print(opt.optimize_beam(length_m=2.5, load_kn=15.0, max_weight_kg=150.0))`,
    simOutput: "{'Original Solid Weight': '250.0 kg', 'AI Organic Optimized Weight': '137.5 kg', 'Weight Reduction': '45.0%', 'Safety Factor Margin': '2.4x (Exceeds Aerospace Standards)', 'Status': 'READY_FOR_3D_TITANIUM_PRINTING'}",
    pairs: [
      { id: 'p1', term: 'Topology Optimization', definition: 'A mathematical method that optimizes material layout within a given design space for a given set of loads and constraints.' },
      { id: 'p2', term: 'Tokamak Plasma Control', definition: 'Using high-frequency reinforcement learning to manipulate magnetic coils and stabilize 100M-degree nuclear fusion plasma.' },
      { id: 'p3', term: 'Additive Manufacturing', definition: 'Industrial 3D printing technologies capable of manufacturing complex organic lattice geometries designed by AI.' }
    ],
    practice: {
      question: 'Why do components designed by AI generative topology optimization resemble organic biological bones and tree branches rather than traditional human engineering shapes?',
      options: [
        'Because AI models are trained on photos of forests.',
        'Because mathematical stress optimization naturally places material strictly along load distribution pathways, mirroring natural evolutionary adaptation.',
        'Because the 3D printer made a mistake.',
        'To make the parts look artistic.'
      ],
      correctIndex: 1,
      explanation: 'Like natural bone structures that minimize mass while supporting loads, topology optimization algorithms remove all material not carrying structural stress.',
      hint: 'Think about how nature evolves bones to be strong yet lightweight.'
    },
    quizzes: [
      {
        question: 'How did DeepMind apply reinforcement learning to experimental nuclear fusion reactors?',
        options: [
          { text: 'By controlling 19 magnetic actuator coils at 10 kHz to shape and stabilize burning hydrogen plasma without thermal wall collision.', isCorrect: true },
          { text: 'By inventing a new cooling fan.', isCorrect: false },
          { text: 'By replacing the reactor walls with plastic.', isCorrect: false },
          { text: 'By generating videos of nuclear explosions.', isCorrect: false }
        ],
        explanation: 'Reinforcement learning autonomous agents successfully stabilized non-linear plasma geometries in the TCV tokamak reactor in Switzerland.'
      }
    ],
    practicalTask: {
      title: 'Analyze Generative Structural Weight Savings',
      objective: 'Calculate the lifecycle fuel cost savings of replacing a 100kg aerospace bracket with a 55kg AI-optimized component.',
      steps: [
        'Weight saved = 45 kg per aircraft bracket (10 brackets per plane = 450 kg total savings).',
        'Industry benchmark: 1 kg weight reduction saves 120 liters of jet fuel per year ($1.10/liter).',
        'Calculate annual fuel and cost savings per aircraft.'
      ],
      expectedResult: 'Annual savings: 54,000 liters of jet fuel and $59,400 per aircraft.'
    },
    recall: {
      question: 'What is the primary benefit of Physics-Informed Neural Networks (PINNs) in engineering simulations?',
      answer: 'They enforce conservation of energy and Navier-Stokes momentum equations directly during training, preventing unphysical hallucinations.'
    },
    takeaways: [
      'AI-driven generative engineering creates organic structures that maximize strength and minimize weight.',
      'Real-time reinforcement learning enables dynamic stabilization in extreme physical systems like nuclear fusion.',
      'Combining computational physics with additive manufacturing accelerates aerospace innovation.'
    ]
  },

  'AI for Enterprise': {
    title: 'AI for Enterprise',
    hook: 'How do Fortune 500 enterprises deploy LLMs at scale with sub-50ms latency, 99.99% uptime, strict data residency, and low compute costs?',
    goal: 'Master enterprise AI systems engineering: Model quantization (AWQ, GPTQ), vLLM high-throughput serving, Guardrails, and SLA monitoring.',
    learnPoints: [
      'Model Quantization: Compressing FP16 weights to 4-bit/8-bit integers (AWQ, GGUF) with minimal accuracy degradation.',
      'High-Throughput Inference Engines: PagedAttention, continuous batching, and vLLM architecture.',
      'Enterprise Guardrails & Red Teaming: Real-time jailbreak prevention, PII redaction, and semantic output verification.'
    ],
    analogy: 'Running a raw open-source LLM in a notebook is like driving a go-kart in a parking lot; deploying enterprise AI infrastructure (vLLM, continuous batching, quantization, guardrails) is like operating a high-speed bullet train network serving 500,000 passengers simultaneously with millisecond precision.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Transitioning an AI prototype into an <strong>Enterprise Production Platform</strong> requires deep systems engineering. Production enterprise systems must handle thousands of concurrent requests per second, comply with strict SOC2/GDPR data security standards, enforce sub-50ms latency SLAs, and minimize cloud GPU operational costs.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">PagedAttention and Continuous Batching (vLLM)</h4>
          <p class="text-sm leading-relaxed">
            Traditional LLM serving wasted up to 70% of GPU VRAM due to dynamic token memory fragmentation. Modern inference engines like <strong>vLLM</strong> implement <em>PagedAttention</em>—inspired by virtual memory paging in operating systems—allocating non-contiguous memory blocks for the KV-Cache. This allows continuous request batching and increases serving throughput by 24x on identical hardware.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Model Weight Quantization (AWQ / GPTQ)',
      desc: 'Compress model weights from 16-bit float to 4-bit integers.',
      detail: 'Apply Activation-aware Weight Quantization (AWQ) to shrink a 70B model from 140GB VRAM to 38GB VRAM with zero loss in MMLU benchmark accuracy.',
      code: 'python -m awq.entry --model_path meta-llama/Llama-3-70B --w_bit 4 --q_config awq'
    },
    step2: {
      title: '2. High-Throughput Serving Deployment (vLLM)',
      desc: 'Launch continuous batching inference container.',
      detail: 'Deploy model with tensor parallelism across 4 GPUs using PagedAttention and OpenAI-compatible API schemas.',
      code: 'python -m vllm.entrypoints.openai.api_server --model Llama-3-70B-AWQ --tensor-parallel-size 4 --port 8000'
    },
    step3: {
      title: '3. Real-Time Enterprise Guardrail Verification',
      desc: 'Filter inputs and outputs for security and compliance.',
      detail: 'Run NeMo Guardrails or Llama-Guard to intercept prompt injection attacks, jailbreaks, and PII leaks before response delivery.',
      code: 'guard_result = llama_guard.evaluate(prompt=user_query, response=generated_text)\nif not guard_result.is_safe: return "Error: Policy Violation"'
    },
    realScenario: 'A global fintech banking platform deployed a 4-bit quantized customer service model on 8 H100 GPUs using vLLM and PagedAttention. The system handles 12,000 concurrent customer interactions with an average token latency of 22ms, reducing cloud infrastructure costs by $1.8M annually.',
    useCases: [
      'Scalable multi-tenant legal discovery document analysis services.',
      'Real-time automated customer support routing for telecom providers with 50M subscribers.',
      'Internal enterprise coding copilot hosted entirely on on-premise air-gapped GPU servers.'
    ],
    simCode: `# Enterprise Inference Latency & Cost Calculator
def evaluate_enterprise_serving(total_requests_per_day, avg_tokens_per_req, use_vllm_quantized=True):
    total_tokens = total_requests_per_day * avg_tokens_per_req
    if use_vllm_quantized:
        # 4-bit quantized with PagedAttention: 1 GPU node handles 500 req/min
        nodes_needed = max(1, int(np.ceil(total_requests_per_day / (500 * 60 * 24))))
        monthly_cost = nodes_needed * 2800 # $2,800/mo per GPU node
        avg_latency_ms = 24.5
    else:
        # Unoptimized standard FP16: 1 GPU node handles 40 req/min
        nodes_needed = max(1, int(np.ceil(total_requests_per_day / (40 * 60 * 24))))
        monthly_cost = nodes_needed * 2800
        avg_latency_ms = 185.0
        
    return {
        "Daily Requests": total_requests_per_day,
        "GPU Nodes Required": nodes_needed,
        "Estimated Monthly Cloud Cost": f"$" + "{:,}".format(monthly_cost),
        "Average Token Latency": f"{avg_latency_ms} ms",
        "Architecture": "vLLM 4-Bit AWQ (Optimized)" if use_vllm_quantized else "Standard Unoptimized FP16"
    }

import numpy as np
print(evaluate_enterprise_serving(total_requests_per_day=500000, avg_tokens_per_req=400, use_vllm_quantized=True))`,
    simOutput: "{'Daily Requests': 500000, 'GPU Nodes Required': 1, 'Estimated Monthly Cloud Cost': '$2,800', 'Average Token Latency': '24.5 ms', 'Architecture': 'vLLM 4-Bit AWQ (Optimized)'}",
    pairs: [
      { id: 'p1', term: 'Quantization', definition: 'Compressing neural network weights from 16-bit floating point to 4-bit or 8-bit integers to reduce memory and compute costs.' },
      { id: 'p2', term: 'PagedAttention', definition: 'An attention algorithm that allocates KV-cache memory in non-contiguous virtual pages, eliminating memory fragmentation in GPU VRAM.' },
      { id: 'p3', term: 'Enterprise Guardrails', definition: 'Programmable security layers (e.g. NeMo Guardrails) that intercept prompt injection attacks and enforce safety compliance.' }
    ],
    practice: {
      question: 'What is the primary benefit of deploying models using 4-bit Activation-aware Weight Quantization (AWQ) in enterprise production?',
      options: [
        'It changes the text font to Comic Sans.',
        'It reduces GPU memory footprint by ~70% and increases inference speed while preserving virtually all benchmark accuracy.',
        'It makes the model run without an operating system.',
        'It disables all security logging.'
      ],
      correctIndex: 1,
      explanation: 'Quantization compresses parameter tensors so large models fit on fewer GPUs, drastically reducing memory bandwidth bottlenecks and hardware costs.',
      hint: 'Think about fitting a 140GB model onto a single 40GB or 80GB GPU.'
    },
    quizzes: [
      {
        question: 'How does PagedAttention in vLLM increase server throughput for LLM inference?',
        options: [
          { text: 'By managing KV-cache memory like virtual memory pages, eliminating VRAM waste from fragmentation and enabling dynamic batching.', isCorrect: true },
          { text: 'By turning off the computer monitor.', isCorrect: false },
          { text: 'By converting all words into emojis.', isCorrect: false },
          { text: 'By deleting half of the user questions.', isCorrect: false }
        ],
        explanation: 'PagedAttention eliminates internal and external memory fragmentation in GPU VRAM, allowing massive concurrent batching.'
      }
    ],
    practicalTask: {
      title: 'Design an Enterprise AI SLA & Guardrail Architecture',
      objective: 'Draft an architectural blueprint specifying latency targets, fallbacks, and security guardrail layers.',
      steps: [
        'Specify SLA targets: P95 Latency < 50ms, Availability > 99.95%, Error Rate < 0.01%.',
        'Place Guardrail filters: Input Sanitizer -> Vector RAG -> LLM Engine -> Output PII Scrubber.',
        'Define automated fallback if primary GPU cluster reaches capacity (e.g. route to quantized secondary tier).'
      ],
      expectedResult: 'Complete enterprise production SLA architecture diagram and specification.'
    },
    recall: {
      question: 'What is "Prompt Injection" in enterprise AI security?',
      answer: 'An adversarial security exploit where malicious user inputs manipulate an LLM into ignoring its system instructions and revealing confidential data or executing unauthorized actions.'
    },
    takeaways: [
      'Enterprise AI requires rigorous systems optimization: quantization, continuous batching, and low latency.',
      'Technologies like vLLM and PagedAttention increase serving throughput by up to 20x.',
      'Security guardrails protect enterprise systems from prompt injection and data leaks.'
    ]
  },

  'Your AI Career Launchpad': {
    title: 'Your AI Career Launchpad',
    hook: 'How do you successfully transition from secondary and pre-university studies into elite university AI programs, research labs, and frontier tech startups?',
    goal: 'Navigate the university-to-industry transition: CS/Math degree program selection, technical coding interviews, and open-source contribution strategies.',
    learnPoints: [
      'University Program Selection: Comparing Computer Science, Applied Mathematics, and dedicated AI degrees.',
      'Mastering Technical AI Interviews: System design, tensor manipulation coding, algorithmic problem solving, and math fundamentals.',
      'Building Open-Source Capital: Contributing to major libraries (PyTorch, Transformers, vLLM) to secure global recognition.'
    ],
    analogy: 'Your pre-university years are like a rocket sitting on the launchpad: the solid rocket boosters are your mathematical foundations and coding fluency; university and research projects ignite the main engines, propelling you directly into orbital career trajectories.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The transition from high school into the professional AI landscape requires a deliberate, proactive strategy. The global demand for engineers who understand both the <strong>deep mathematical foundations of machine learning</strong> and the <strong>systems engineering required for distributed deployment</strong> has never been higher.
        </p>
        <div class="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">The Dual-Competency Advantage</h4>
          <p class="text-sm leading-relaxed">
            The most sought-after AI engineers possess a rare combination: they can read a theoretical mathematical paper and derive backpropagation gradients by hand, while simultaneously writing production-grade C++/CUDA and Python microservices with automated testing and Kubernetes deployment.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Strategic Degree & Coursework Alignment',
      desc: 'Select academic coursework maximizing math and systems depth.',
      detail: 'Prioritize courses in Linear Algebra, Real Analysis, Probability Theory, Operating Systems, Compilers, and Distributed Computing.',
      code: '# Academic Track: Double Major in Computer Science & Applied Mathematics'
    },
    step2: {
      title: '2. Master Technical Coding & Systems Interviews',
      desc: 'Practice competitive algorithms and ML system design.',
      detail: 'Solve hard LeetCode problems (graphs, dynamic programming) and practice designing scalable ML systems (e.g. "Design YouTube Recommendation Engine").',
      code: '# ML System Design Framework: Data Pipeline -> Feature Store -> Candidate Retrieval -> Ranking -> Serving'
    },
    step3: {
      title: '3. Build High-Impact Open-Source Capital',
      desc: 'Contribute tangible PRs to frontier open-source AI projects.',
      detail: 'Review open issues on Hugging Face Transformers, LangChain, or Ollama; write documentation, bug fixes, and performance patches.',
      code: 'git checkout -b fix-attention-kernel-overflow && git push origin fix-attention-kernel-overflow'
    },
    realScenario: 'A 19-year-old university student contributed an optimized FlashAttention kernel to an open-source inference library. The PR improved inference throughput by 18%, catching the attention of the engineering VP at a premier AI unicorn, who offered him a full-time ML Engineer role.',
    useCases: [
      'Structuring university scholarship and research grant applications.',
      'Preparing for technical machine learning engineering internship interviews.',
      'Securing competitive positions at top AI research labs (DeepMind, FAIR, OpenAI).'
    ],
    simCode: `# Career Launchpad Competency Matrix Evaluator
competencies = {
    "Math Foundations (Linear Algebra, Calculus, Probability)": 92,
    "Data Structures & Algorithms (LeetCode Medium/Hard)": 88,
    "Deep Learning Systems (PyTorch, Distributed Training)": 85,
    "MLOps & Deployment (Docker, Kubernetes, APIs)": 80,
    "Public Open Source Contributions (GitHub / HF)": 78
}

overall_readiness = sum(competencies.values()) / len(competencies)
print(f"AI Career Launchpad Readiness Index: {overall_readiness:.1f}/100")
print("Strongest Pillar:", max(competencies, key=competencies.get))
print("Next Growth Area:", min(competencies, key=competencies.get))`,
    simOutput: 'AI Career Launchpad Readiness Index: 84.6/100\nStrongest Pillar: Math Foundations (Linear Algebra, Calculus, Probability)\nNext Growth Area: Public Open Source Contributions (GitHub / HF)',
    pairs: [
      { id: 'p1', term: 'ML System Design', definition: 'The architectural design of end-to-end machine learning systems to meet real-world scale, latency, and throughput requirements.' },
      { id: 'p2', term: 'Open-Source Capital', definition: 'Publicly verifiable reputational proof built through tangible code contributions to major software ecosystems.' },
      { id: 'p3', term: 'Dual Competency', definition: 'Mastery of both mathematical ML theoretical foundations and low-level software systems engineering.' }
    ],
    practice: {
      question: 'Which skill combination makes an AI engineering candidate most competitive for top industry engineering positions?',
      options: [
        'Only knowing how to talk about AI concepts on social media without writing code.',
        'Strong theoretical mathematical foundations (calculus, linear algebra) combined with practical software craftsmanship (C++, Python, CUDA, distributed systems).',
        'Memorizing multiple choice test answers without building projects.',
        'Using only one single programming language for everything.'
      ],
      correctIndex: 1,
      explanation: 'Top AI teams value engineers who can bridge theoretical research mathematics and production software systems.',
      hint: 'Think about the combination of mathematical depth and production software engineering.'
    },
    quizzes: [
      {
        question: 'What is the primary purpose of an "ML System Design Interview" at top technology companies?',
        options: [
          { text: 'To evaluate how an engineer architecturally scopes, scales, and connects data pipelines, models, feature stores, and APIs to solve a massive real-world problem.', isCorrect: true },
          { text: 'To see how fast the candidate can type the alphabet.', isCorrect: false },
          { text: 'To test if the candidate can draw cartoon characters.', isCorrect: false },
          { text: 'To check the brand of laptop the candidate owns.', isCorrect: false }
        ],
        explanation: 'System design interviews evaluate high-level architectural thinking, trade-off analysis, latency budgeting, and scalability planning.'
      }
    ],
    practicalTask: {
      title: 'Architect an ML System Design Proposal for Video Recommendations',
      objective: 'Draft a 1-page system architecture for a real-time recommendation engine serving 100M daily active users.',
      steps: [
        'Phase 1: Candidate Generation (retrieve top-500 candidate videos from 100M library in 10ms using two-tower embeddings).',
        'Phase 2: Heavy Ranking (score top-500 candidates using a deep neural network transformer).',
        'Phase 3: Re-ranking & Diversity Filter (apply business logic and deduplication before delivering final 20 results).'
      ],
      expectedResult: 'Complete 3-tier recommendation system architecture diagram and specification.'
    },
    recall: {
      question: 'What is a "Two-Tower Neural Network" in recommendation systems?',
      answer: 'An architecture with separate User and Item encoder towers that generate vector embeddings independently, enabling ultra-fast approximate nearest neighbor retrieval in vector space.'
    },
    takeaways: [
      'The dual combination of mathematical rigor and systems engineering is the most valuable asset in tech.',
      'Mastering ML system design prepares you for high-impact industry engineering interviews.',
      'Public open-source contributions provide undeniable proof of your technical ability.'
    ]
  },

  'Build Your Professional Profile': {
    title: 'Build Your Professional Profile',
    hook: 'How do you craft an undeniable technical brand that showcases your deployed projects, GitHub repositories, and research preprints to global recruiters?',
    goal: 'Master professional technical branding: GitHub portfolio curation, technical blogging, reproducible benchmark packaging, and LinkedIn optimization.',
    learnPoints: [
      'GitHub Portfolio Architecture: Pinning production-grade repositories with live demos, badges, and clean documentation.',
      'Writing High-Signal Technical Postmortems: Documenting difficult bugs solved, performance optimizations, and architectural trade-offs.',
      'Research & Benchmark Packaging: Creating interactive Hugging Face Spaces and Streamlit demos that recruiters can test in 10 seconds.'
    ],
    analogy: 'Your professional profile is your personal digital storefront: an empty storefront with no products (a resume with only buzzwords) attracts zero customers; a brightly lit showroom with interactive working prototypes (live GitHub demos and technical benchmarks) commands immediate trust and premium value.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          In the competitive artificial intelligence landscape, traditional text resumes are no longer sufficient. World-class engineering teams and research labs hire based on <strong>verifiable proof-of-work</strong>. Building a compelling professional profile means presenting your code, deployments, research contributions, and engineering mindset through accessible, high-signal digital artifacts.
        </p>
        <div class="bg-violet-50 dark:bg-violet-950/40 p-5 rounded-xl border border-violet-200 dark:border-violet-800">
          <h4 class="text-lg font-bold text-violet-900 dark:text-violet-300 mb-2">The Anatomy of a Tier-1 GitHub Repository</h4>
          <ul class="text-sm space-y-2 list-disc list-inside">
            <li><strong>Live Interactive Demo:</strong> A 1-click link to a hosted web demo (Hugging Face Spaces, Vercel) so reviewers can test your app immediately.</li>
            <li><strong>Architecture & Benchmark Tables:</strong> Clear diagrams explaining system data flow and reproducible benchmark metrics comparing your system against baseline standards.</li>
            <li><strong>Clean Engineering Hygiene:</strong> Automated CI/CD status badges, typed code with docstrings, comprehensive unit test suites, and Docker containerization.</li>
          </ul>
        </div>
      </div>
    `,
    step1: {
      title: '1. Curate Top 3 Pinned Flagship Repositories',
      desc: 'Focus on quality over quantity on your public GitHub profile.',
      detail: 'Feature 3 distinct projects: (1) Deep Learning Architecture from scratch, (2) Scalable Deployed Web Service, (3) Open-Source Contribution.',
      code: '# README Structure: Problem -> Architecture Diagram -> Benchmark Metrics -> Quickstart -> Live Demo Link'
    },
    step2: {
      title: '2. Deploy 1-Click Interactive Demos',
      desc: 'Host live web interfaces on public cloud services.',
      detail: 'Deploy lightweight Streamlit or Gradio apps on Hugging Face Spaces so non-technical recruiters can test the model instantly.',
      code: 'import gradio as gr\ngr.Interface(fn=predict_toxicity, inputs="text", outputs="label").launch()'
    },
    step3: {
      title: '3. Publish In-Depth Engineering Postmortems',
      desc: 'Document your problem-solving process and technical trade-offs.',
      detail: 'Write technical blog posts explaining how you debugged a memory leak, optimized a CUDA kernel, or evaluated fairness metrics.',
      code: '# Article Title: "How I Reduced Llama-3 Inference Latency by 42% on Consumer Hardware: A Deep Dive into AWQ Quantization"'
    },
    realScenario: 'A candidate wrote a detailed technical blog post analyzing why a popular transformer model failed on edge-case arithmetic. The post went viral on Hacker News, leading to direct interview invitations from three prominent AI research labs.',
    useCases: [
      'Creating technical portfolio supplements for top university engineering applications.',
      'Securing remote AI consulting contracts with international startups.',
      'Building public domain authority and thought leadership in specialized ML sub-fields.'
    ],
    simCode: `# Portfolio Signal Strength Evaluator
portfolio_audit = {
    "Live Deployed Demo Links (Hugging Face / Web)": True,
    "Clear System Architecture Diagrams": True,
    "Comprehensive Automated Unit Test Coverage (>80%)": True,
    "In-Depth Technical Engineering Postmortems": True,
    "Quantified Benchmark Performance Metrics": True
}

signal_score = (sum(portfolio_audit.values()) / len(portfolio_audit)) * 100
print(f"Technical Portfolio Signal Strength: {signal_score:.0f}%")
print("Verdict: High-Signal Tier 1 Engineering Portfolio - Ready for Global Opportunities.")`,
    simOutput: 'Technical Portfolio Signal Strength: 100%\nVerdict: High-Signal Tier 1 Engineering Portfolio - Ready for Global Opportunities.',
    pairs: [
      { id: 'p1', term: 'Proof-of-Work', definition: 'Verifiable, public demonstrations of engineering ability including live codebases, benchmarks, and deployed apps.' },
      { id: 'p2', term: 'Technical Postmortem', definition: 'A deep-dive technical article explaining an engineering challenge, root cause analysis, and the architectural fix implemented.' },
      { id: 'p3', term: 'Hugging Face Spaces', definition: 'A public cloud hosting platform for demonstrating machine learning web applications using Gradio and Streamlit.' }
    ],
    practice: {
      question: 'What is the most effective element to include at the top of a GitHub project README to impress an engineering hiring manager?',
      options: [
        'A 50-paragraph history of your life.',
        'A live 1-click interactive demo link, a clean architecture diagram, and quantified benchmark metrics demonstrating performance.',
        'A warning telling people not to look at the code.',
        'A link to unrelated music videos.'
      ],
      correctIndex: 1,
      explanation: 'Recruiters and hiring managers spend less than 60 seconds reviewing a repository; a live demo link, visual diagram, and clear benchmark metrics immediately establish competence.',
      hint: 'Think about how quickly reviewers assess a project.'
    },
    quizzes: [
      {
        question: 'Why are in-depth technical postmortems and engineering blogs so highly valued by senior engineering leaders?',
        options: [
          { text: 'They reveal the candidate’s critical thinking, debugging methodology, ability to handle failure, and clarity of communication.', isCorrect: true },
          { text: 'Because blogs make the internet faster.', isCorrect: false },
          { text: 'Because nobody writes code anymore.', isCorrect: false },
          { text: 'They are required by the government.', isCorrect: false }
        ],
        explanation: 'Writing detailed postmortems demonstrates how you think through complex edge cases, architectural trade-offs, and systemic failures.'
      }
    ],
    practicalTask: {
      title: 'Craft a Production-Grade README for an AI Capstone',
      objective: 'Write a complete markdown README for a machine learning repository following professional industry standards.',
      steps: [
        'Add Badges: Python 3.12, License: MIT, Build: Passing, Test Coverage: 94%.',
        'Write concise Overview, Problem Statement, and include an ASCII/Mermaid Architecture Diagram.',
        'Include Quickstart installation code snippet and reproducible benchmark evaluation command.'
      ],
      expectedResult: 'Complete professional README.md file ready for GitHub publishing.'
    },
    recall: {
      question: 'What is the "10-Second Rule" for technical portfolios?',
      answer: 'A technical portfolio must communicate the core value, problem solved, and live working demo within the first 10 seconds of a reviewer opening the page.'
    },
    takeaways: [
      'Verifiable proof-of-work (code, live demos, benchmarks) is the ultimate hiring differentiator.',
      'Professional READMEs with architecture diagrams and badges communicate engineering maturity.',
      'Writing technical deep-dive postmortems establishes domain authority and communication clarity.'
    ]
  },

  'AI Assistant Lab': {
    title: 'AI Assistant Lab',
    hook: 'How do you build a specialized enterprise conversational assistant equipped with custom tool integrations, persistent session memory, and strict access controls?',
    goal: 'Master conversational AI system development: LangGraph state machines, conversational memory stores, streaming token webhooks, and tool invocation.',
    learnPoints: [
      'LangGraph State Machines: Modeling conversational multi-turn dialogue flows as explicit cyclical state graphs.',
      'Long-Term & Short-Term Memory: Vector-backed episodic memory vs sliding context window buffer management.',
      'Real-Time Token Streaming: Implementing Server-Sent Events (SSE) and WebSockets for low-latency UI rendering.'
    ],
    analogy: 'Building an AI assistant without a state graph is like having a conversation with someone who forgets your name every 30 seconds; building it with LangGraph and persistent memory is like having a dedicated executive chief-of-staff who remembers every meeting from last year and coordinates your calendar seamlessly.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          Modern conversational AI systems have evolved far beyond basic chat interfaces into <strong>Stateful Conversational Agents</strong>. Building production-grade assistants requires managing dialogue states across multi-turn sessions, orchestrating dynamic tool execution, maintaining persistent user memory, and streaming responses in real time.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">LangGraph State Machine Architecture</h4>
          <p class="text-sm leading-relaxed">
            Unlike linear chains, real human conversations are dynamic and cyclical. <strong>LangGraph</strong> models conversational agents as directed state graphs where nodes represent agent reasoning or tool executions, and edges represent conditional transitions based on user intent or tool response status.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Define Typed Conversational State Graph',
      desc: 'Structure state schemas with messages, session context, and active tools.',
      detail: 'Initialize LangGraph StateGraph with typing annotations and message reducer operations.',
      code: 'from langgraph.graph import StateGraph, MessagesState\nworkflow = StateGraph(MessagesState)'
    },
    step2: {
      title: '2. Bind External Computational Tools',
      desc: 'Equip the assistant with authenticated tool interfaces.',
      detail: 'Bind Python functions (e.g. database query, calendar booking, weather API) to the LLM model instance.',
      code: 'tools = [query_customer_database, book_calendar_slot]\nmodel_with_tools = model.bind_tools(tools)'
    },
    step3: {
      title: '3. Stream Token Responses via SSE (Server-Sent Events)',
      desc: 'Deliver tokens in real time as they are generated by the model.',
      detail: 'Implement a FastAPI streaming response endpoint yielding token chunks over HTTP.',
      code: 'async def stream_chat():\n    async for event in workflow.astream_events(inputs, version="v1"):\n        if event["event"] == "on_chat_model_stream": yield f"data: {event[\'data\'][\'chunk\'].content}\\n\\n"'
    },
    realScenario: 'A university deployed a stateful AI student advising assistant. The system connects to course catalogs, prerequisite dependency databases, and student transcript records, helping 20,000 students plan graduation schedules with zero scheduling conflicts.',
    useCases: [
      'Enterprise HR onboarding assistant automating benefits registration and equipment provisioning.',
      'Healthcare patient triage chatbot collecting symptoms and scheduling specialist appointments.',
      'Interactive coding tutor providing stepped hints and verifying student code solutions in a live sandbox.'
    ],
    simCode: `# Stateful Conversational State Machine Simulator
class ConversationalAssistant:
    def __init__(self):
        self.session_memory = {}
        self.tools = {"get_balance": lambda user: "$14,250.00"}
        
    def handle_turn(self, session_id, user_msg):
        if session_id not in self.session_memory:
            self.session_memory[session_id] = []
            
        self.session_memory[session_id].append({"role": "user", "content": user_msg})
        
        # Intent routing
        if "balance" in user_msg.lower():
            balance = self.tools["get_balance"]("User_A")
            response = f"Your current verified account balance is {balance}."
        else:
            response = f"I have recorded your request: '{user_msg}'. How else may I assist you?"
            
        self.session_memory[session_id].append({"role": "assistant", "content": response})
        return {"response": response, "history_turns": len(self.session_memory[session_id]) // 2}

assistant = ConversationalAssistant()
print(assistant.handle_turn("sess_101", "What is my account balance?"))`,
    simOutput: "{'response': 'Your current verified account balance is $14,250.00.', 'history_turns': 1}",
    pairs: [
      { id: 'p1', term: 'LangGraph', definition: 'A framework for building robust, stateful multi-agent and conversational applications with cyclical state machines.' },
      { id: 'p2', term: 'Server-Sent Events (SSE)', definition: 'A lightweight HTTP standard allowing servers to continuously push streaming token updates to web browsers in real time.' },
      { id: 'p3', term: 'Episodic Memory', definition: 'Long-term vector database storage capturing past user interactions, preferences, and facts across separate sessions.' }
    ],
    practice: {
      question: 'Why are Server-Sent Events (SSE) or WebSockets essential when building user-facing conversational AI assistants?',
      options: [
        'To reduce the battery consumption of the monitor.',
        'To stream tokens to the user UI in real time as they are synthesized, delivering instant visual feedback and sub-second perceived latency.',
        'Because standard web servers cannot send text.',
        'To turn off the user keyboard during generation.'
      ],
      correctIndex: 1,
      explanation: 'Without token streaming, users would stare at a blank screen for 10-20 seconds waiting for full completion; streaming provides instant feedback.',
      hint: 'Think about the visual typing animation effect when you chat with modern AI.'
    },
    quizzes: [
      {
        question: 'What is the difference between Short-Term Memory and Long-Term Episodic Memory in conversational AI?',
        options: [
          { text: 'Short-Term Memory maintains the active conversation buffer in the context window; Long-Term Memory indexes past sessions in a vector database for semantic recall.', isCorrect: true },
          { text: 'Short-Term memory uses RAM; Long-Term memory uses floppy disks.', isCorrect: false },
          { text: 'There is no difference.', isCorrect: false },
          { text: 'Long-Term memory only works in Python 2.', isCorrect: false }
        ],
        explanation: 'Short-term memory manages immediate multi-turn context; episodic long-term memory enables cross-session retrieval via vector embeddings.'
      }
    ],
    practicalTask: {
      title: 'Build a LangGraph Conversational State Machine',
      objective: 'Define a 2-node conversational state graph with a conditional tool routing edge in Python.',
      steps: [
        'Define state dictionary containing `messages: list`.',
        'Create AgentNode (decides whether to call tool or respond directly).',
        'Create ToolNode (executes database lookup) and add conditional edge routing back to AgentNode.'
      ],
      expectedResult: 'Complete, executable state machine graph that routes queries dynamically.'
    },
    recall: {
      question: 'What is a "Tool Call Schema" in modern LLM APIs?',
      answer: 'A structured JSON Schema definition describing a function’s name, purpose, parameters, and required data types so the LLM knows how to invoke it properly.'
    },
    takeaways: [
      'Modern conversational assistants are built as stateful cyclical graphs rather than simple linear chains.',
      'Combining short-term sliding context with vector-backed episodic memory enables rich personalization.',
      'Server-Sent Events (SSE) deliver real-time token streaming for superior user experience.'
    ]
  },

  'AI Project Studio': {
    title: 'AI Project Studio',
    hook: 'How do you engineer a production-ready AI Capstone System with automated CI/CD testing, Docker containerization, and cloud deployment?',
    goal: 'Execute an end-to-end AI Capstone: requirement gathering, data curation, model deployment, automated unit/integration testing, and cloud hosting.',
    learnPoints: [
      'Full-Stack AI Project Architecture: React/Next.js frontend, FastAPI inference microservice, and PostgreSQL/pgvector database.',
      'Automated Quality Assurance: PyTest test suites, load testing with Locust, and GitHub Actions CI/CD workflows.',
      'Containerization & Cloud Infrastructure: Multi-stage Docker builds, Kubernetes manifests, and cloud GPU deployment.'
    ],
    analogy: 'An AI Project Studio is the culmination of your entire engineering journey: like an aerospace engineer presenting a fully functional, wind-tunnel-tested supersonic jet prototype complete with flight telemetry, cockpit instrumentation, and flight manual.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          The <strong>AI Project Studio</strong> is where all previous foundational, algorithmic, and systems disciplines converge into a complete, professional capstone application. Building a capstone is not merely about achieving high validation accuracy on a test dataset; it demands creating a resilient, maintainable, tested, and fully deployed production software system.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2">The Production Capstone Checklist</h4>
          <ol class="text-sm space-y-2 list-decimal list-inside">
            <li><strong>Robust Backend:</strong> FastAPI or Next.js API endpoints with strict Pydantic payload validation and async database connection pooling.</li>
            <li><strong>Automated CI/CD:</strong> GitHub Actions pipeline running linting, type-checking (<code>tsc</code>, <code>mypy</code>), unit tests, and security audits on every pull request.</li>
            <li><strong>Multi-Stage Dockerization:</strong> Optimized Docker containers with non-root security users, minimal image sizes (<200MB), and healthcheck endpoints.</li>
            <li><strong>Interactive User Experience:</strong> Clean, responsive UI with real-time feedback, error boundaries, and optimistic UI updates.</li>
          </ol>
        </div>
      </div>
    `,
    step1: {
      title: '1. Modular Architecture & Data Flow Design',
      desc: 'Separate frontend, API gateway, model service, and persistence layers.',
      detail: 'Implement clean architectural boundaries using dependency injection and repository patterns.',
      code: '# Project structure: /src/api, /src/services, /src/models, /src/db, /tests'
    },
    step2: {
      title: '2. Automated CI/CD Testing Pipeline',
      desc: 'Configure GitHub Actions for continuous quality verification.',
      detail: 'Execute automated unit tests, integration tests, and linting checks on every git commit before deployment.',
      code: '# .github/workflows/ci.yml: runs pytest, flake8, tsc --noEmit, and docker build'
    },
    step3: {
      title: '3. Multi-Stage Docker Containerization & Hosting',
      desc: 'Package and deploy production containers to cloud platforms.',
      detail: 'Build lightweight multi-stage Docker images and deploy to AWS ECS, GCP Cloud Run, or Kubernetes clusters.',
      code: 'FROM python:3.12-slim AS builder\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]'
    },
    realScenario: 'A team of high school seniors built "AgroScan AI", an edge-AI crop disease classification app. They containerized the PyTorch model with FastAPI, built a React mobile UI, and deployed it on cloud infrastructure with 99.98% uptime, serving 4,000 local farmers.',
    useCases: [
      'Building and publishing an open-source medical triage diagnosis assistant.',
      'Deploying a real-time financial market anomaly detection dashboard.',
      'Creating an automated intelligent document processing pipeline for non-profit organizations.'
    ],
    simCode: `# End-to-End Capstone Production Health Check
class CapstoneHealthMonitor:
    def run_system_diagnostics(self):
        services = {
            "FastAPI Inference API Gateway": {"status": "HEALTHY", "latency_ms": 18.2},
            "PostgreSQL & pgvector Database": {"status": "HEALTHY", "active_connections": 12},
            "Model Weights In-Memory Cache": {"status": "HEALTHY", "vram_allocated_gb": 4.2},
            "Automated Test Suite (54 Tests)": {"status": "ALL_PASSED", "coverage": "94.8%"}
        }
        
        all_ok = all(s["status"] in ["HEALTHY", "ALL_PASSED"] for s in services.values())
        return {
            "System Status": "OPERATIONAL / PRODUCTION_READY" if all_ok else "SYSTEM_DEGRADED",
            "Service Diagnostics": services
        }

monitor = CapstoneHealthMonitor()
import pprint
pprint.pprint(monitor.run_system_diagnostics())`,
    simOutput: "{'Service Diagnostics': {'Automated Test Suite (54 Tests)': {'coverage': '94.8%', 'status': 'ALL_PASSED'},\n                         'FastAPI Inference API Gateway': {'latency_ms': 18.2, 'status': 'HEALTHY'},\n                         'Model Weights In-Memory Cache': {'status': 'HEALTHY', 'vram_allocated_gb': 4.2},\n                         'PostgreSQL & pgvector Database': {'active_connections': 12, 'status': 'HEALTHY'}},\n 'System Status': 'OPERATIONAL / PRODUCTION_READY'}",
    pairs: [
      { id: 'p1', term: 'CI/CD Pipeline', definition: 'Automated workflow that runs tests, builds container images, and deploys verified code directly to production servers.' },
      { id: 'p2', term: 'Multi-Stage Dockerfile', definition: 'A Docker build strategy that separates build dependencies from final runtime images to minimize security vulnerabilities and image size.' },
      { id: 'p3', term: 'Integration Testing', definition: 'Automated tests that verify that distinct software components (API, database, model) function together harmoniously.' }
    ],
    practice: {
      question: 'Why should machine learning production services be packaged using Multi-Stage Docker containers before deployment to cloud servers?',
      options: [
        'To make the computer monitor run in dark mode.',
        'To ensure reproducible execution environments across all operating systems, eliminate "it works on my machine" bugs, and minimize final container image sizes.',
        'Because Docker makes all models 100% accurate.',
        'To delete unused Python libraries from the internet.'
      ],
      correctIndex: 1,
      explanation: 'Docker encapsulates all system dependencies, CUDA drivers, and Python packages into an immutable, isolated, reproducible container.',
      hint: 'Think about portability across development, testing, and production servers.'
    },
    quizzes: [
      {
        question: 'What is the purpose of an automated CI/CD pipeline in an AI software engineering project?',
        options: [
          { text: 'To automatically run linter checks, type tests, and unit assertions on every commit, preventing broken code from reaching production.', isCorrect: true },
          { text: 'To automatically send email spam to users.', isCorrect: false },
          { text: 'To change variable names randomly.', isCorrect: false },
          { text: 'To delete git commit history.', isCorrect: false }
        ],
        explanation: 'CI/CD pipelines provide automated quality gates that guarantee code reliability, stability, and test compliance before deployment.'
      }
    ],
    practicalTask: {
      title: 'Write a Production Multi-Stage Dockerfile for an ML API',
      objective: 'Write an optimized Dockerfile for a Python FastAPI machine learning service.',
      steps: [
        'Stage 1 (Builder): Install compiler tools, generate wheels for dependencies.',
        'Stage 2 (Runtime): Copy only built wheels into a minimal `python:3.12-slim` image.',
        'Add non-root user `appuser` and define `HEALTHCHECK` command.'
      ],
      expectedResult: 'Complete, secure, minimal production Dockerfile (<180MB image size).'
    },
    recall: {
      question: 'What is a "Healthcheck Endpoint" in production microservices?',
      answer: 'An API route (e.g. `/healthz`) that returns a 200 OK status code when all internal components (database, model weights, cache) are healthy and ready to serve traffic.'
    },
    takeaways: [
      'A true AI capstone requires end-to-end software engineering, testing, and deployment.',
      'Multi-stage Docker builds ensure reproducible, secure, and lightweight cloud deployments.',
      'Automated CI/CD testing pipelines protect production systems from regressions and outages.'
    ]
  },

  'Verify Before You Trust': {
    title: 'Verify Before You Trust',
    hook: 'Why do large language models hallucinate convincing falsehoods with supreme mathematical confidence, and how do we systematically detect and prevent it?',
    goal: 'Master model calibration, hallucination detection, automated fact-checking pipelines, and citation grounding verification.',
    learnPoints: [
      'The mathematics of hallucination: Softmax overconfidence, out-of-distribution hallucinations, and knowledge cutoff artifacts.',
      'Confidence calibration: Expected Calibration Error (ECE) and temperature scaling to align model logits with true empirical probabilities.',
      'Automated fact verification pipelines: Using external knowledge graph validation and self-consistency cross-examination.'
    ],
    analogy: 'Trusting an unverified LLM output in medicine or law is like accepting financial advice from a charming actor in an expensive suit: they speak with supreme elegance, flawless grammar, and total confidence, but have zero legal liability if the advice ruins your bank account.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          One of the greatest operational risks of large language models is <strong>hallucination</strong>: generating statements that are syntactically plausible, logically coherent, and expressed with high confidence, yet factually false or completely fabricated. Understanding why hallucinations occur—and building automated systems to detect and prevent them—is mandatory for high-stakes deployment.
        </p>
        <div class="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-xl border border-rose-200 dark:border-rose-800">
          <h4 class="text-lg font-bold text-rose-900 dark:text-rose-300 mb-2">The Probabilistic Nature of Token Generation</h4>
          <p class="text-sm leading-relaxed">
            LLMs do not possess an internal database of truth; they are probabilistic token predictors conditioned on context. When a model lacks ground-truth information in its weights, it does not stop generating. Instead, it samples the most statistically plausible next token based on learned language grammar, inventing fictional academic papers, legal citations, or medical statistics.
          </p>
        </div>
      </div>
    `,
    step1: {
      title: '1. Model Calibration & Confidence Scoring',
      desc: 'Measure alignment between prediction confidence and true empirical accuracy.',
      detail: 'Apply Temperature Scaling to output logits to minimize Expected Calibration Error (ECE).',
      code: 'calibrated_logits = logits / optimal_temperature # Reduces overconfidence on ambiguous queries'
    },
    step2: {
      title: '2. Automated Citation & Entity Grounding',
      desc: 'Verify generated claims against authoritative structured databases.',
      detail: 'Extract named entities and causal claims from text, executing SPARQL queries against Wikidata or PubMed APIs.',
      code: 'is_valid_citation = crossref_api.check_doi(extracted_doi) # Validates paper actually exists'
    },
    step3: {
      title: '3. Multi-Model Consensus & Red Teaming',
      desc: 'Cross-examine outputs using independent referee models.',
      detail: 'Prompt an independent critic model to identify logical leaps, unsupported assertions, or contradictory premises.',
      code: 'audit_score = referee_model.evaluate_faithfulness(context=source_docs, answer=generated_answer)'
    },
    realScenario: 'In a landmark legal case, attorneys submitted a legal brief generated by ChatGPT. The brief cited 6 legal precedent cases that were completely hallucinated by the model. The attorneys were sanctioned, fined, and faced professional disciplinary hearings.',
    useCases: [
      'Automated medical summary auditing before entry into electronic health records.',
      'Financial earnings report extraction with strict source document attribution.',
      'Automated fact-checking of political debates and public policy claims.'
    ],
    simCode: `# Hallucination & Fact Grounding Verifier
def verify_claim_grounding(claim, ground_truth_database):
    # Check if claim entities exist in verified knowledge base
    entities = claim["entities"]
    verified_entities = [e for e in entities if e in ground_truth_database]
    faithfulness_score = len(verified_entities) / max(1, len(entities))
    
    is_grounded = faithfulness_score >= 0.90
    return {
        "Claim Text": claim["text"],
        "Entity Verification Ratio": f"{faithfulness_score * 100:.1f}%",
        "Verification Status": "GROUNDED_FACT" if is_grounded else "POTENTIAL_HALLUCINATION_ALERT",
        "Action": "APPROVE_PUBLICATION" if is_grounded else "REJECT_AND_REQUEST_HUMAN_AUDIT"
    }

verified_db = {"AlphaFold", "DeepMind", "Protein Structure", "200 Million"}
unverified_claim = {"text": "AlphaFold was invented by NASA in 1985 to explore Mars bacteria.", "entities": ["AlphaFold", "NASA", "1985", "Mars bacteria"]}

print(verify_claim_grounding(unverified_claim, verified_db))`,
    simOutput: "{'Claim Text': 'AlphaFold was invented by NASA in 1985 to explore Mars bacteria.', 'Entity Verification Ratio': '25.0%', 'Verification Status': 'POTENTIAL_HALLUCINATION_ALERT', 'Action': 'REJECT_AND_REQUEST_HUMAN_AUDIT'}",
    pairs: [
      { id: 'p1', term: 'Hallucination', definition: 'A phenomenon where an AI generates factually incorrect or fabricated information with high linguistic confidence.' },
      { id: 'p2', term: 'Expected Calibration Error (ECE)', definition: 'A statistical metric measuring the discrepancy between a model’s confidence scores and its actual empirical accuracy.' },
      { id: 'p3', term: 'Faithfulness Score', definition: 'The proportion of claims in an AI response that can be directly verified against provided source documents.' }
    ],
    practice: {
      question: 'Why do large language models generate fictional citations and fabricated court cases with high confidence?',
      options: [
        'Because they are programmed to lie on purpose.',
        'Because they predict statistically probable language patterns and word sequences rather than retrieving verified facts from a relational database.',
        'Because the computer was running low on storage memory.',
        'Because the internet was disconnected.'
      ],
      correctIndex: 1,
      explanation: 'Language models are probabilistic token predictors; when they lack direct knowledge, they generate realistic-sounding text that conforms to grammar rather than factual truth.',
      hint: 'Remember that LLMs predict likely next words, not database rows.'
    },
    quizzes: [
      {
        question: 'What is "Temperature Scaling" used for in neural network model evaluation?',
        options: [
          { text: 'Calibrating output confidence probabilities so that a 90% confidence prediction is actually correct 90% of the time.', isCorrect: true },
          { text: 'Controlling the physical temperature of the CPU fan.', isCorrect: false },
          { text: 'Measuring weather patterns in the data center.', isCorrect: false },
          { text: 'Changing the visual theme to summer colors.', isCorrect: false }
        ],
        explanation: 'Temperature scaling is a post-processing calibration technique that aligns model confidence scores with true empirical accuracy.'
      }
    ],
    practicalTask: {
      title: 'Build an Automated Citation Grounding Checker',
      objective: 'Write a Python script that extracts citations from an AI summary and validates them against a DOI registry.',
      steps: [
        'Parse generated summary for regex pattern matching DOI format: `10.\\d{4,9}/[-._;()/:A-Z0-9]+`.',
        'Query the CrossRef open API to check if each DOI returns HTTP 200.',
        'Flag any non-existent or 404 DOIs as fabricated hallucinations.'
      ],
      expectedResult: 'Script flags hallucinated citations and approves legitimate peer-reviewed DOIs.'
    },
    recall: {
      question: 'What is "Faithfulness" in RAG evaluation?',
      answer: 'The degree to which the generated answer can be strictly inferred from the retrieved context documents without external unverified claims.'
    },
    takeaways: [
      'Linguistic confidence is completely uncorrelated with factual accuracy in language models.',
      'Calibrating models and verifying citations against external databases prevents hallucinations.',
      'High-stakes domains (medicine, law, engineering) require strict verification pipelines.'
    ]
  },

  'Humans Behind AI Decisions': {
    title: 'Humans Behind AI Decisions',
    hook: 'When an autonomous AI system causes an accident, makes a biased hiring choice, or issues a false medical denial, who carries legal and ethical accountability?',
    goal: 'Master AI governance, legal accountability frameworks (EU AI Act, NIST AI RMF), mechanistic interpretability, and ethical deployment.',
    learnPoints: [
      'Legal & Regulatory Frameworks: The EU AI Act (Risk Categories), NIST AI Risk Management Framework, and strict liability doctrines.',
      'Mechanistic Interpretability: Peeking inside transformer circuits to understand why specific neurons fire before high-stakes decisions.',
      'Human Agency & Meaningful Human Control (MHC): Designing operational architectures where humans maintain ultimate decision authority.'
    ],
    analogy: 'AI decision-making is like an autopilot system in commercial aviation: it can fly the aircraft smoothly across oceans, but the human captain is legally, morally, and professionally responsible for the flight, and must be able to disengage autopilot and take manual control at any instant.',
    explanationHtml: `
      <div class="space-y-6 text-slate-700 dark:text-slate-200">
        <p class="text-base leading-relaxed">
          As artificial intelligence systems are integrated into critical societal infrastructure—including judicial bail assessments, medical triage, mortgage lending, and autonomous defense—the question of <strong>human accountability</strong> becomes paramount. Software code cannot be sent to prison, sued for damages, or held ethically responsible. <strong>The humans who design, deploy, and oversee AI systems remain 100% accountable.</strong>
        </p>
        <div class="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <h4 class="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">The EU AI Act Risk Tier Framework</h4>
          <ul class="text-sm space-y-2 list-disc list-inside">
            <li><strong>Unacceptable Risk (Banned):</strong> Real-time public biometric surveillance, social scoring systems, and cognitive behavioral manipulation.</li>
            <li><strong>High Risk (Strict Regulation):</strong> Critical infrastructure, healthcare medical devices, employment hiring algorithms, and credit scoring systems. (Requires logging, risk management, and human oversight).</li>
            <li><strong>Specific Transparency Risk:</strong> Chatbots and deepfakes (must clearly disclose AI generation).</li>
            <li><strong>Minimal Risk:</strong> Spam filters and video games (freely permitted).</li>
          </ul>
        </div>
      </div>
    `,
    step1: {
      title: '1. Classify System under Regulatory Risk Tiers',
      desc: 'Audit application against EU AI Act and NIST AI RMF standards.',
      detail: 'Determine if your application falls into High Risk categories (healthcare, hiring, legal) requiring formal risk management audits.',
      code: 'risk_category = audit_compliance(domain="HEALTHCARE_DIAGNOSIS") # HIGH_RISK -> Requires Human-in-the-Loop'
    },
    step2: {
      title: '2. Enforce Meaningful Human Control (MHC)',
      desc: 'Embed manual override gates into operational workflows.',
      detail: 'Ensure that high-stakes decisions (e.g. loan denials, medical diagnoses) require active review and digital signature from human experts.',
      code: 'if risk_tier == "HIGH":\n    require_human_expert_signoff(recommendation_payload, reviewer_id=doctor_id)'
    },
    step3: {
      title: '3. Maintain Immutable Audit Trails',
      desc: 'Log model versions, inputs, activations, and human supervisor actions.',
      detail: 'Store tamper-proof cryptographic logs recording model inference hashes, timestamped input features, and supervisor decisions.',
      code: 'compliance_ledger.append(hash=compute_hash(inputs, outputs, model_version, reviewer_signature))'
    },
    realScenario: 'A health insurance provider automated claims denials using an AI model that reviewed cases in 1.2 seconds without human doctor review. Regulators launched an investigation, issuing multimillion-dollar fines and mandating that every medical denial must be personally reviewed by a licensed physician.',
    useCases: [
      'Establishing an AI Ethics & Governance Board at a global financial institution.',
      'Auditing autonomous defense systems for compliance with international humanitarian law.',
      'Deploying transparent explainability dashboards for municipal welfare allocation algorithms.'
    ],
    simCode: `# Regulatory Compliance & Human Oversight Evaluator
def evaluate_ai_deployment_compliance(system_name, domain, has_human_in_loop, has_immutable_logging):
    is_high_risk = domain in ["HEALTHCARE", "HIRING", "CREDIT_UNDERWRITING", "JUSTICE"]
    
    violations = []
    if is_high_risk and not has_human_in_loop:
        violations.append("EU_AI_ACT_VIOLATION: High-risk system operating without Meaningful Human Control")
    if is_high_risk and not has_immutable_logging:
        violations.append("COMPLIANCE_FAILURE: Missing tamper-proof audit trails")
        
    is_compliant = len(violations) == 0
    return {
        "System": system_name,
        "Domain": domain,
        "Risk Tier": "HIGH RISK" if is_high_risk else "STANDARD RISK",
        "Regulatory Compliance": "APPROVED_FOR_DEPLOYMENT" if is_compliant else "DEPLOYMENT_BLOCKED",
        "Violations": violations
    }

print(evaluate_ai_deployment_compliance("CareAssist-Triage", "HEALTHCARE", has_human_in_loop=True, has_immutable_logging=True))
print(evaluate_ai_deployment_compliance("AutoHire-Filter", "HIRING", has_human_in_loop=False, has_immutable_logging=False))`,
    simOutput: "{'System': 'CareAssist-Triage', 'Domain': 'HEALTHCARE', 'Risk Tier': 'HIGH RISK', 'Regulatory Compliance': 'APPROVED_FOR_DEPLOYMENT', 'Violations': []}\n{'System': 'AutoHire-Filter', 'Domain': 'HIRING', 'Risk Tier': 'HIGH RISK', 'Regulatory Compliance': 'DEPLOYMENT_BLOCKED', 'Violations': ['EU_AI_ACT_VIOLATION: High-risk system operating without Meaningful Human Control', 'COMPLIANCE_FAILURE: Missing tamper-proof audit trails']}",
    pairs: [
      { id: 'p1', term: 'Meaningful Human Control (MHC)', definition: 'The legal and operational requirement that humans maintain genuine oversight and veto power over high-stakes automated decisions.' },
      { id: 'p2', term: 'EU AI Act', definition: 'The comprehensive European Union regulation establishing risk-based legal rules for artificial intelligence development and deployment.' },
      { id: 'p3', term: 'Mechanistic Interpretability', definition: 'A research field aiming to reverse-engineer neural network weights and circuits into human-understandable algorithms.' }
    ],
    practice: {
      question: 'Under the EU AI Act, what is required of an AI system used for screening job applications or evaluating mortgage loans (High-Risk AI)?',
      options: [
        'It can run completely unattended with zero logging.',
        'It must maintain detailed audit logs, undergo rigorous bias testing, ensure data governance, and include Meaningful Human Oversight.',
        'It must be written in HTML only.',
        'It is completely banned from being used.'
      ],
      correctIndex: 1,
      explanation: 'High-risk systems are permitted only if they comply with strict requirements for risk management, transparency, audit logging, and human oversight.',
      hint: 'Think about human oversight and transparent audit logging.'
    },
    quizzes: [
      {
        question: 'Why cannot an AI algorithm or robot be held legally liable in a court of law for causing physical or financial harm?',
        options: [
          { text: 'Software lacks legal personhood, moral agency, and financial assets; legal and ethical accountability rests entirely on the humans and corporations who deployed it.', isCorrect: true },
          { text: 'Because computers are too smart to make mistakes.', isCorrect: false },
          { text: 'Because judges do not understand computers.', isCorrect: false },
          { text: 'Because software code is deleted after use.', isCorrect: false }
        ],
        explanation: 'Legal responsibility always traces back to the human operators, engineers, and corporate leadership who chose to deploy the system.'
      }
    ],
    practicalTask: {
      title: 'Conduct an AI Governance Impact Assessment',
      objective: 'Audit a proposed AI system (e.g. Automated Credit Scoring) and draft a compliance mitigation plan.',
      steps: [
        'Identify Protected Stakeholders and Potential Failure Modes (e.g. unfair credit denial).',
        'Design Human-in-the-Loop review threshold: all score denials between 600-650 must be manually audited by human underwriters.',
        'Specify immutable cryptographic audit logging schema.'
      ],
      expectedResult: 'Complete 2-page AI Governance Compliance Assessment ready for executive review.'
    },
    recall: {
      question: 'What is the "Black Box Problem" in deep learning?',
      answer: 'The difficulty of explaining exactly why a complex neural network with billions of parameters made a specific individual prediction.'
    },
    takeaways: [
      'Humans remain 100% legally, ethically, and operationally accountable for AI decisions.',
      'Regulations like the EU AI Act enforce strict transparency and oversight on high-risk AI.',
      'Meaningful Human Control ensures technology serves human values and dignity.'
    ]
  }
}
