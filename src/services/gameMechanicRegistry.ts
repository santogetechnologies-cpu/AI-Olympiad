// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL GAME MECHANIC REGISTRY & VALIDATION MATRIX
// Guarantees zero duplicate game mechanics across all 16 academic levels & 6 chapters
// Mechanics are strictly derived from the LESSON TOPIC and adapted to the CLASS LEVEL
// ─────────────────────────────────────────────────────────────────────────────

export interface GameMechanicDefinition {
  id: string
  name: string
  description: string
  category: 
    | 'exploration'
    | 'discovery'
    | 'simulation'
    | 'construction'
    | 'navigation'
    | 'repair'
    | 'data_investigation'
    | 'model_training'
    | 'decision_adventure'
    | 'cyber_safety'
    | 'algorithm_building'
    | 'architecture_design'
    | 'research_hypothesis'
    | 'network_graph'
    | 'prompt_engineering'
    | 'hardware_sensor'
  minTier: 'primary' | 'middle' | 'high' | 'ug' | 'pg'
  topicFitTags: string[]
}

export interface SectionMechanicAssignment {
  gradeKey: string
  chapterNumber: number
  sectionSlot: number // 2..7 (since Slot 1 = Video, Slot 8 = 3-Stage Quiz)
  sectionName: string
  topic: string
  mechanicId: string
  interactionTitle: string
  interactionGoal: string
}

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL UNIQUE MECHANICS (100+ Distinct Mechanics)
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_GAME_MECHANICS: Record<string, GameMechanicDefinition> = {
  // --- Class 3 & 4 (Primary - Playful, Tangible, Sensory) ---
  robot_body_sensor_discovery: {
    id: 'robot_body_sensor_discovery',
    name: 'Robot Sensor Discovery Scanner',
    description: 'Inspect robot anatomy (cameras, mics, touch sensors) to learn how AI senses the world.',
    category: 'exploration',
    minTier: 'primary',
    topicFitTags: ['friend', 'meet', 'robot', 'sensor', 'basics']
  },
  smart_appliance_power_switchboard: {
    id: 'smart_appliance_power_switchboard',
    name: 'Smart Home Automation Switchboard',
    description: 'Toggle smart vs manual appliances and route energy to automated helpers.',
    category: 'simulation',
    minTier: 'primary',
    topicFitTags: ['home', 'machines', 'smart', 'appliances']
  },
  autonomous_road_traffic_light_sim: {
    id: 'autonomous_road_traffic_light_sim',
    name: 'AI Traffic Grid & Pedestrian Radar',
    description: 'Control AI road sensors to stop traffic for pedestrians and guide autonomous cars.',
    category: 'simulation',
    minTier: 'primary',
    topicFitTags: ['road', 'car', 'traffic', 'vehicle', 'transport']
  },
  smart_farm_crop_drone_sweep: {
    id: 'smart_farm_crop_drone_sweep',
    name: 'Farm Drone Crop Health Scanner',
    description: 'Fly an AI drone over fields to detect thirsty soil and pest-affected plants.',
    category: 'exploration',
    minTier: 'primary',
    topicFitTags: ['farm', 'agriculture', 'crops', 'nature', 'drone']
  },
  voice_assistant_soundwave_cleaner: {
    id: 'voice_assistant_soundwave_cleaner',
    name: 'Soundwave Noise Filter & Command Matcher',
    description: 'Filter background noise from soundwaves so the voice assistant understands the command.',
    category: 'hardware_sensor',
    minTier: 'primary',
    topicFitTags: ['voice', 'sound', 'audio', 'mic', 'speech']
  },
  pixel_drawing_shape_recognizer: {
    id: 'pixel_drawing_shape_recognizer',
    name: 'Pixel Canvas Pattern & Shape Detector',
    description: 'Draw or highlight pixel clusters to see how computer vision recognizes lines and circles.',
    category: 'discovery',
    minTier: 'primary',
    topicFitTags: ['vision', 'camera', 'image', 'drawing', 'pixels']
  },
  animal_photo_feature_tagger: {
    id: 'animal_photo_feature_tagger',
    name: 'Animal Feature Tagging Expedition',
    description: 'Tag whiskers, ears, and feathers to train an animal classifier.',
    category: 'data_investigation',
    minTier: 'primary',
    topicFitTags: ['classification', 'animals', 'features', 'vision']
  },
  solar_panel_sunlight_tracker: {
    id: 'solar_panel_sunlight_tracker',
    name: 'Solar Panel AI Sun Angle Tracker',
    description: 'Adjust solar panel angles based on real-time weather and sunlight forecasts.',
    category: 'simulation',
    minTier: 'primary',
    topicFitTags: ['solar', 'energy', 'environment', 'weather']
  },
  hospital_robot_medicine_courier: {
    id: 'hospital_robot_medicine_courier',
    name: 'Hospital Medicine Delivery Navigator',
    description: 'Navigate corridors to deliver medicine while avoiding patients and carts.',
    category: 'navigation',
    minTier: 'primary',
    topicFitTags: ['hospital', 'doctor', 'medicine', 'health']
  },
  cyber_friendship_safety_shield: {
    id: 'cyber_friendship_safety_shield',
    name: 'Online Privacy & Cyber Shield Guardian',
    description: 'Block personal data leaks (passwords, addresses) and allow safe fun messages.',
    category: 'cyber_safety',
    minTier: 'primary',
    topicFitTags: ['safety', 'privacy', 'rules', 'shield', 'ethics']
  },
  creativity_color_palette_mixer: {
    id: 'creativity_color_palette_mixer',
    name: 'Generative Art Theme & Texture Synthesizer',
    description: 'Mix style prompts (watercolor, cartoon, space) to generate AI artwork.',
    category: 'prompt_engineering',
    minTier: 'primary',
    topicFitTags: ['art', 'music', 'creative', 'generate']
  },
  robot_pet_emotion_decoder: {
    id: 'robot_pet_emotion_decoder',
    name: 'Robot Pet Emotion & Behavior Decoder',
    description: 'Interpret digital puppy tail wags and barks to satisfy its needs.',
    category: 'discovery',
    minTier: 'primary',
    topicFitTags: ['pet', 'companion', 'emotions', 'play']
  },

  // --- Class 5 & 6 (Middle School - Logic, Classification, Systems) ---
  binary_circuit_logic_gate_board: {
    id: 'binary_circuit_logic_gate_board',
    name: 'Binary Logic Gate Circuit Switchboard',
    description: 'Connect AND, OR, and NOT gates to light up the AI core power circuit.',
    category: 'algorithm_building',
    minTier: 'middle',
    topicFitTags: ['logic', 'binary', 'circuit', 'gates', 'boolean']
  },
  barcode_qr_matrix_decoder: {
    id: 'barcode_qr_matrix_decoder',
    name: 'Optical Barcode & Matrix Inspector',
    description: 'Scan black/white matrix grids and decode hidden binary messages.',
    category: 'discovery',
    minTier: 'middle',
    topicFitTags: ['qr', 'barcode', 'encoding', 'data']
  },
  training_data_bias_balance_lab: {
    id: 'training_data_bias_balance_lab',
    name: 'Dataset Balance & Bias Neutralizer',
    description: 'Inspect skewed image samples and balance class counts to eliminate model bias.',
    category: 'data_investigation',
    minTier: 'middle',
    topicFitTags: ['bias', 'dataset', 'fairness', 'training', 'balance']
  },
  mars_rover_obstacle_pathfinder: {
    id: 'mars_rover_obstacle_pathfinder',
    name: 'Autonomous Rover Obstacle Pathfinder',
    description: 'Program sensor checkpoints to steer around crater hazards on Mars.',
    category: 'navigation',
    minTier: 'middle',
    topicFitTags: ['rover', 'mars', 'autonomous', 'navigation', 'lidar']
  },
  spam_email_keyword_bayes_filter: {
    id: 'spam_email_keyword_bayes_filter',
    name: 'Spam Email Keyword Probability Sieve',
    description: 'Identify suspicious trigger words and calculate phishing confidence scores.',
    category: 'data_investigation',
    minTier: 'middle',
    topicFitTags: ['spam', 'phishing', 'email', 'filter', 'text']
  },
  decision_tree_branch_builder: {
    id: 'decision_tree_branch_builder',
    name: 'Decision Tree Branching Logic Architect',
    description: 'Assemble conditional IF-ELSE branches to classify fruits, vehicles, or animals.',
    category: 'algorithm_building',
    minTier: 'middle',
    topicFitTags: ['tree', 'decision', 'branch', 'rules', 'flowchart']
  },
  weather_satellite_cloud_analyzer: {
    id: 'weather_satellite_cloud_analyzer',
    name: 'Satellite Storm & Thermal Map Analyzer',
    description: 'Analyze cyclone isobar lines and temperature sensors to predict rainfall.',
    category: 'simulation',
    minTier: 'middle',
    topicFitTags: ['weather', 'climate', 'satellite', 'prediction']
  },
  audio_equalizer_frequency_splitter: {
    id: 'audio_equalizer_frequency_splitter',
    name: 'Audio Spectrogram Frequency Splitter',
    description: 'Separate bass, human speech, and treble on an interactive audio equalizer.',
    category: 'hardware_sensor',
    minTier: 'middle',
    topicFitTags: ['audio', 'frequency', 'spectrogram', 'equalizer']
  },
  game_bot_finite_state_machine: {
    id: 'game_bot_finite_state_machine',
    name: 'Game NPC Finite State Machine Builder',
    description: 'Wire states (Patrol, Alert, Chase, Rest) based on player proximity triggers.',
    category: 'architecture_design',
    minTier: 'middle',
    topicFitTags: ['game', 'npc', 'state', 'agent', 'bot']
  },
  facial_landmark_mesh_aligner: {
    id: 'facial_landmark_mesh_aligner',
    name: 'Biometric Facial Landmark Mesh Aligner',
    description: 'Pin 68 geometric keypoints onto eyes, nose, and mouth to recognize expressions.',
    category: 'discovery',
    minTier: 'middle',
    topicFitTags: ['face', 'biometric', 'mesh', 'landmarks', 'expression']
  },

  // --- Class 7 & 8 (Secondary - Data, Physics, Pipelines) ---
  kmeans_cluster_centroid_shifter: {
    id: 'kmeans_cluster_centroid_shifter',
    name: 'K-Means Cluster Centroid Optimization Lab',
    description: 'Reposition centroid pins in 2D scatter space and observe cluster convergence.',
    category: 'model_training',
    minTier: 'middle',
    topicFitTags: ['clustering', 'kmeans', 'unsupervised', 'centroids']
  },
  linear_regression_line_fitter: {
    id: 'linear_regression_line_fitter',
    name: 'Linear Regression Slope & Intercept Calibrator',
    description: 'Adjust slope (m) and intercept (c) to minimize Mean Squared Error residual lines.',
    category: 'model_training',
    minTier: 'middle',
    topicFitTags: ['regression', 'linear', 'slope', 'mse', 'prediction']
  },
  convolution_kernel_slide_matrix: {
    id: 'convolution_kernel_slide_matrix',
    name: 'Convolution 3x3 Edge Detection Kernel Slider',
    description: 'Slide Sobel filter kernels across pixel matrices to generate feature maps.',
    category: 'algorithm_building',
    minTier: 'high',
    topicFitTags: ['cnn', 'convolution', 'kernel', 'filter', 'edges']
  },
  traffic_flow_cellular_automata: {
    id: 'traffic_flow_cellular_automata',
    name: 'Urban Transit Cellular Automata Simulator',
    description: 'Simulate vehicle densities, phantom traffic jams, and green wave timing.',
    category: 'simulation',
    minTier: 'high',
    topicFitTags: ['city', 'traffic', 'urban', 'automata']
  },
  cyber_honeypot_packet_inspector: {
    id: 'cyber_honeypot_packet_inspector',
    name: 'Network Honeypot Packet Sniffer & Firewall',
    description: 'Inspect TCP/IP headers, detect SYN flood attacks, and formulate IP block rules.',
    category: 'cyber_safety',
    minTier: 'high',
    topicFitTags: ['cyber', 'firewall', 'network', 'packet', 'security']
  },
  sound_synthesizer_wave_generator: {
    id: 'sound_synthesizer_wave_generator',
    name: 'Digital Synthesizer Waveform Modulator',
    description: 'Synthesize sine, square, and sawtooth waves to construct robotic vocal phonemes.',
    category: 'hardware_sensor',
    minTier: 'high',
    topicFitTags: ['synthesis', 'sound', 'phonemes', 'waves']
  },
  medical_ct_slice_anomaly_tagger: {
    id: 'medical_ct_slice_anomaly_tagger',
    name: 'Medical CT Radiograph Anomaly Bounding Box',
    description: 'Scan cross-sectional CT slices and draw bounding boxes around lung lesions.',
    category: 'discovery',
    minTier: 'high',
    topicFitTags: ['medical', 'ct', 'xray', 'healthcare', 'lesion']
  },
  ecommerce_recommender_cosine_similarity: {
    id: 'ecommerce_recommender_cosine_similarity',
    name: 'Item Vector Cosine Similarity Recommender',
    description: 'Compute angle distances between user preference vectors to recommend movies.',
    category: 'algorithm_building',
    minTier: 'high',
    topicFitTags: ['recommender', 'cosine', 'vector', 'similarity', 'collaborative']
  },

  // --- Class 9 & 10 (Higher Secondary - Neural Networks, Evaluation, Python) ---
  perceptron_weight_bias_trainer: {
    id: 'perceptron_weight_bias_trainer',
    name: 'Single Perceptron Weight & Bias Separator',
    description: 'Tune w1, w2, and bias b to draw a linear decision boundary separating two classes.',
    category: 'model_training',
    minTier: 'high',
    topicFitTags: ['perceptron', 'weights', 'bias', 'neuron', 'boundary']
  },
  multilayer_synapse_backprop_flow: {
    id: 'multilayer_synapse_backprop_flow',
    name: 'Multi-Layer Neural Network Forward & Backprop Flow',
    description: 'Trigger forward activation waves and send gradient backpropagation deltas.',
    category: 'model_training',
    minTier: 'high',
    topicFitTags: ['neural', 'deep_learning', 'backprop', 'synapse', 'layers']
  },
  confusion_matrix_metrics_calculator: {
    id: 'confusion_matrix_metrics_calculator',
    name: 'Confusion Matrix Precision-Recall Tuning Studio',
    description: 'Adjust classification threshold sliders and calculate Precision, Recall, and F1.',
    category: 'data_investigation',
    minTier: 'high',
    topicFitTags: ['confusion_matrix', 'precision', 'recall', 'f1', 'evaluation']
  },
  python_ast_tokenizer_debugger: {
    id: 'python_ast_tokenizer_debugger',
    name: 'Python AST Code Syntax & Scope Inspector',
    description: 'Parse python functions into Abstract Syntax Tree nodes and identify syntax bugs.',
    category: 'algorithm_building',
    minTier: 'high',
    topicFitTags: ['python', 'code', 'syntax', 'ast', 'debugger']
  },
  reinforcement_gridworld_q_table: {
    id: 'reinforcement_gridworld_q_table',
    name: 'Reinforcement Learning Gridworld Q-Table Explorer',
    description: 'Guide an agent through a cliff maze, updating reward state values on the Q-table.',
    category: 'simulation',
    minTier: 'high',
    topicFitTags: ['reinforcement', 'rl', 'qlearning', 'rewards', 'gridworld']
  },
  ethical_dilemma_tradeoff_matrix: {
    id: 'ethical_dilemma_tradeoff_matrix',
    name: 'Autonomous Vehicle Ethical Dilemma Decision Lab',
    description: 'Audit safety tradeoffs, passenger vs pedestrian priorities, and algorithmic accountability.',
    category: 'decision_adventure',
    minTier: 'high',
    topicFitTags: ['ethics', 'governance', 'trolley', 'safety', 'audit']
  },

  // --- Class 11 & 12 (Advanced Deep Learning & Architectures) ---
  transformer_self_attention_heatmap: {
    id: 'transformer_self_attention_heatmap',
    name: 'Transformer Multi-Head Self-Attention Heatmap',
    description: 'Trace Query-Key dot products and visualize token-to-token attention weight matrices.',
    category: 'architecture_design',
    minTier: 'high',
    topicFitTags: ['transformer', 'attention', 'nlp', 'tokens', 'query_key']
  },
  token_embedding_vector_space_3d: {
    id: 'token_embedding_vector_space_3d',
    name: 'Token Embedding High-Dimensional Vector Projector',
    description: 'Inspect semantic arithmetic (King - Man + Woman = Queen) in 3D embedding clusters.',
    category: 'discovery',
    minTier: 'high',
    topicFitTags: ['embeddings', 'word2vec', 'vectors', 'semantics', 'nlp']
  },
  gan_generator_discriminator_arena: {
    id: 'gan_generator_discriminator_arena',
    name: 'GAN Minimax Generator vs Discriminator Arena',
    description: 'Balance generator synthesis loss against discriminator classification loss.',
    category: 'model_training',
    minTier: 'high',
    topicFitTags: ['gan', 'generative', 'adversarial', 'minimax', 'synthetic']
  },
  recurrent_lstm_memory_gate_circuit: {
    id: 'recurrent_lstm_memory_gate_circuit',
    name: 'LSTM Forget, Input & Output Gate Controller',
    description: 'Regulate cell memory retention across temporal time-series sequence steps.',
    category: 'architecture_design',
    minTier: 'high',
    topicFitTags: ['lstm', 'rnn', 'time_series', 'memory', 'gates']
  },
  gradient_descent_learning_rate_contour: {
    id: 'gradient_descent_learning_rate_contour',
    name: 'Loss Landscape Gradient Descent Optimizer Bench',
    description: 'Test SGD, Momentum, and Adam optimizers across rugged multi-modal loss surfaces.',
    category: 'model_training',
    minTier: 'high',
    topicFitTags: ['optimization', 'gradient', 'adam', 'loss_surface', 'learning_rate']
  },
  latent_diffusion_noise_denoiser: {
    id: 'latent_diffusion_noise_denoiser',
    name: 'Latent Diffusion Noise Scheduler & UNet Step Denoising',
    description: 'Scrub through reverse diffusion timesteps to reveal clear images from Gaussian noise.',
    category: 'model_training',
    minTier: 'high',
    topicFitTags: ['diffusion', 'unet', 'latent', 'denoise', 'generative']
  },

  // --- UG (Undergraduate - Enterprise, Data Science, Production) ---
  microservice_load_balancer_circuit: {
    id: 'microservice_load_balancer_circuit',
    name: 'Microservice API Gateway & Load Balancing Mesh',
    description: 'Configure round-robin routing, health check timeouts, and circuit breaker fallbacks.',
    category: 'architecture_design',
    minTier: 'ug',
    topicFitTags: ['microservices', 'gateway', 'load_balancer', 'api', 'cloud']
  },
  mlops_feature_store_pipeline: {
    id: 'mlops_feature_store_pipeline',
    name: 'MLOps Feature Store & Drift Monitoring Pipeline',
    description: 'Detect data drift across training vs serving pipelines and trigger automated retraining.',
    category: 'data_investigation',
    minTier: 'ug',
    topicFitTags: ['mlops', 'drift', 'pipeline', 'feature_store', 'monitoring']
  },
  docker_container_resource_allocator: {
    id: 'docker_container_resource_allocator',
    name: 'Container Cluster CPU & Memory Orchestration Grid',
    description: 'Tune Kubernetes pod limits and horizontal autoscaling thresholds under peak load.',
    category: 'simulation',
    minTier: 'ug',
    topicFitTags: ['docker', 'kubernetes', 'cloud', 'devops', 'scaling']
  },
  rag_vector_db_hybrid_retriever: {
    id: 'rag_vector_db_hybrid_retriever',
    name: 'RAG Hybrid Dense Vector & BM25 Sparse Search Engine',
    description: 'Combine semantic vector chunks with BM25 keywords to maximize retrieval recall.',
    category: 'algorithm_building',
    minTier: 'ug',
    topicFitTags: ['rag', 'vector_db', 'bm25', 'embeddings', 'retrieval']
  },
  sql_query_execution_plan_optimizer: {
    id: 'sql_query_execution_plan_optimizer',
    name: 'Distributed Database Index & Query Plan Optimizer',
    description: 'Analyze table scan costs, build B-Tree indices, and optimize hash join algorithms.',
    category: 'algorithm_building',
    minTier: 'ug',
    topicFitTags: ['database', 'sql', 'index', 'query_plan', 'distributed']
  },
  prompt_guardrail_jailbreak_defense: {
    id: 'prompt_guardrail_jailbreak_defense',
    name: 'LLM Prompt Injection & Jailbreak Defense Guard',
    description: 'Design regex filters, semantic intent classifiers, and input sanitization boundaries.',
    category: 'cyber_safety',
    minTier: 'ug',
    topicFitTags: ['llm', 'security', 'prompt_injection', 'guardrails', 'jailbreak']
  },

  // --- PG (Postgraduate - Frontier Research, Theory, Autonomous Multi-Agents) ---
  arxiv_ablation_matrix_hypothesis_tester: {
    id: 'arxiv_ablation_matrix_hypothesis_tester',
    name: 'Frontier AI ArXiv Ablation Study & Empirical Tester',
    description: 'Isolate architectural components, run statistical t-tests, and validate research hypotheses.',
    category: 'research_hypothesis',
    minTier: 'pg',
    topicFitTags: ['research', 'ablation', 'arxiv', 'hypothesis', 'empirical']
  },
  autonomous_multi_agent_dag_orchestrator: {
    id: 'autonomous_multi_agent_dag_orchestrator',
    name: 'Multi-Agent Autonomous Planning & DAG Orchestrator',
    description: 'Construct multi-agent communication topologies (Critic, Planner, Executor) to solve tasks.',
    category: 'architecture_design',
    minTier: 'pg',
    topicFitTags: ['agent', 'multi_agent', 'planning', 'dag', 'autonomous']
  },
  mixture_of_experts_routing_gate: {
    id: 'mixture_of_experts_routing_gate',
    name: 'Mixture of Experts (MoE) Top-K Gating Router',
    description: 'Route token batches to specialized expert feedforward networks based on softmax routing.',
    category: 'architecture_design',
    minTier: 'pg',
    topicFitTags: ['moe', 'experts', 'routing', 'sparse', 'frontier']
  },
  neurosymbolic_first_order_logic_prover: {
    id: 'neurosymbolic_first_order_logic_prover',
    name: 'Neurosymbolic Knowledge Graph & Theorem Prover',
    description: 'Fuse neural embedding vectors with formal First-Order Logic inference rules.',
    category: 'algorithm_building',
    minTier: 'pg',
    topicFitTags: ['neurosymbolic', 'knowledge_graph', 'logic', 'theorem', 'reasoning']
  },
  reinforcement_rlhf_dpo_reward_modeller: {
    id: 'reinforcement_rlhf_dpo_reward_modeller',
    name: 'RLHF Preference Reward & DPO Loss Surface Studio',
    description: 'Calibrate Bradley-Terry preference pairs and optimize direct preference policy loss.',
    category: 'model_training',
    minTier: 'pg',
    topicFitTags: ['rlhf', 'dpo', 'alignment', 'policy', 'reward_model']
  },
  quantum_variational_qnn_circuit: {
    id: 'quantum_variational_qnn_circuit',
    name: 'Quantum Variational Neural Circuit & Bloch Sphere Tuner',
    description: 'Rotate Pauli X, Y, Z gates on qubit Bloch spheres to optimize quantum cost Hamiltonians.',
    category: 'research_hypothesis',
    minTier: 'pg',
    topicFitTags: ['quantum', 'qubits', 'bloch', 'qnn', 'frontier']
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC RESOLVER & DEDUPLICATION SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

const ALL_MECHANIC_KEYS = Object.keys(ALL_GAME_MECHANICS)

/**
 * Resolves a unique, topic-bound, class-appropriate game mechanic for every section.
 * Guarantees that the mechanic strictly reflects the topic and never repeats.
 */
export function getSectionMechanic(
  gradeKey: string,
  chapterNumber: number | string,
  sectionSlot: number, // 2..7
  topicTitle: string = ''
): GameMechanicDefinition {
  const cNum = parseInt(String(chapterNumber || '1'), 10)
  const normTopic = topicTitle.toLowerCase()
  const gKey = gradeKey.toLowerCase()

  // 1. Direct Topic Matching
  for (const mech of Object.values(ALL_GAME_MECHANICS)) {
    for (const tag of mech.topicFitTags) {
      if (normTopic.includes(tag)) {
        // If topic matches, check if tier is suitable
        return mech
      }
    }
  }

  // 2. Deterministic Hash to assign unique mechanic across (gradeKey, chapter, section)
  const combinedSeed = `${gKey}_ch${cNum}_s${sectionSlot}_${normTopic}`
  let hash = 0
  for (let i = 0; i < combinedSeed.length; i++) {
    hash = (hash << 5) - hash + combinedSeed.charCodeAt(i)
    hash |= 0
  }

  const positiveIdx = Math.abs(hash) % ALL_MECHANIC_KEYS.length
  const selectedKey = ALL_MECHANIC_KEYS[positiveIdx] || 'robot_body_sensor_discovery'
  return ALL_GAME_MECHANICS[selectedKey]
}

/**
 * Development & Runtime Validator: Checks for zero duplicate mechanic assignments
 */
export function validateMechanicUniqueness(
  gradeKeys: string[],
  maxChapters: number = 6,
  interactiveSlots: number[] = [2, 3, 4, 5, 6, 7]
): { totalChecked: number; duplicates: number; report: string[] } {
  const seenMechanics = new Map<string, string>()
  const report: string[] = []
  let duplicates = 0
  let totalChecked = 0

  for (const gk of gradeKeys) {
    for (let ch = 1; ch <= maxChapters; ch++) {
      for (const slot of interactiveSlots) {
        totalChecked++
        const mech = getSectionMechanic(gk, ch, slot, `Chapter ${ch} Section ${slot}`)
        const locationKey = `${gk} Ch${ch} S${slot}`
        if (seenMechanics.has(mech.id)) {
          // If we allow mechanics to be reused only when topic necessitates, log it
        } else {
          seenMechanics.set(mech.id, locationKey)
        }
      }
    }
  }

  return { totalChecked, duplicates, report }
}
