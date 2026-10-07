// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC CURRICULUM TOPIC PROFILES: CLASS 9 (12 DISTINCT LESSONS)
// Applied Artificial Intelligence & Statistical Learning • Ages 14-15
// ─────────────────────────────────────────────────────────────────────────────

import { type TopicProfile } from './curriculumTopicProfilesClass3'

export const CLASS9_TOPIC_PROFILES: Record<string, TopicProfile> = {
  'from data to intelligence': {
    title: 'From Data to Intelligence',
    hook: 'How did Netflix use a matrix factorization algorithm on 100 million movie ratings to improve recommendation accuracy and save $1 billion a year in customer retention?',
    goal: 'Understand the data science hierarchy: raw data ingestion, feature engineering, exploratory data analysis (EDA), and machine learning inference.',
    learnPoints: [
      'Master the Data-Information-Knowledge-Wisdom (DIKW) pyramid in computing',
      'Learn exploratory data analysis (EDA): correlation heatmaps, distributions, and outlier handling',
      'Understand how collaborative filtering and matrix factorization power recommendation engines'
    ],
    analogy: 'Turning raw data into intelligence is like refining crude oil: raw logs from servers are toxic and messy, but when refined through statistics and algorithms, they become high-octane rocket fuel that powers smart systems!',
    explanationHtml: `<h3>The Data-to-Intelligence Hierarchy</h3>
<p>Modern technology companies do not just collect data; they transform raw sensor and user telemetry into predictive intelligence through structured scientific pipelines.</p>
<h4>Matrix Factorization in Recommendations</h4>
<p>Recommendation algorithms decompose massive user-item rating matrices into lower-dimensional user feature vectors and movie concept vectors (e.g. Action-Score, Humor-Score, SciFi-Score). The dot product between vectors computes personalized predicted enjoyment ratings!</p>`,
    step1: {
      title: '1. Ingestion & Exploratory Data Analysis (EDA)',
      desc: 'Load multi-million row datasets with pandas and compute statistical summaries (mean, std, skewness).',
      detail: 'Visualizes missing value distributions.',
      code: 'import pandas as pd, seaborn as sns\ndf = pd.read_parquet("user_engagement_logs.parquet")\nsns.heatmap(df.corr(), annot=True, cmap="coolwarm")'
    },
    step2: {
      title: '2. Singular Value Decomposition (SVD)',
      desc: 'Decompose the sparse user-item matrix into latent factor matrices $U, \\Sigma, V^T$.',
      detail: 'Extracts core hidden taste dimensions.',
      code: 'from scipy.sparse.linalg import svds\nu, s, vt = svds(user_movie_matrix, k=20)'
    },
    step3: {
      title: '3. Vector Dot Product Inference',
      desc: 'Calculate user-movie compatibility scores using matrix multiplication in NumPy.',
      detail: 'Ranks top 10 personalized recommendations in under 5ms.',
      code: 'predicted_ratings = np.dot(np.dot(u, np.diag(s)), vt)\ntop_recommendations = np.argsort(predicted_ratings[user_id])[::-1][:10]'
    },
    realScenario: 'A streaming platform analyzed 500,000 student coding sessions. By clustering learning bottlenecks through matrix factorization, the system automatically recommended targeted 3-minute video hints whenever students got stuck on loops, boosting course completion by 32%.',
    useCases: [
      'Streaming platforms predicting movie enjoyment using collaborative filtering',
      'E-commerce recommendation engines generating "Customers also bought" bundles',
      'Music apps generating weekly discover playlists matching personal acoustic tempo preferences'
    ],
    simCode: 'user_taste = np.array([0.9, 0.1, 0.8]) # [SciFi, Romance, Action]\nmovie_profile = np.array([0.95, 0.05, 0.85]) # Interstellar\nmatch_score = np.dot(user_taste, movie_profile)\nprint(f"Personalized Match Score: {match_score:.2f} / 1.50 → 98% Match! 🚀")',
    simOutput: 'Personalized Match Score: 1.54 / 1.50 → 98% Match! 🚀',
    pairs: [
      { id: 'p1', term: 'Collaborative Filtering', definition: 'A recommendation technique that makes predictions based on the preferences of similar users' },
      { id: 'p2', term: 'Matrix Factorization', definition: 'Decomposing a large matrix into lower-dimensional factor matrices representing hidden attributes' },
      { id: 'p3', term: 'Latent Factors', definition: 'Hidden mathematical concepts (like mood or genre affinity) discovered automatically by algorithms' }
    ],
    practice: {
      q: 'In collaborative filtering recommendation systems, what does matrix factorization achieve?',
      opts: [
        'It compresses massive sparse rating tables into dense latent taste vectors to predict what movies a user will love',
        'It deletes all movie files from the server to save space',
        'It converts video sound into text files',
        'It prints out physical DVD labels'
      ],
      correct: 0,
      exp: 'Matrix factorization discovers latent preference factors that bridge user tastes and item attributes.',
      hint: 'Think about compressing ratings into latent preference vectors.'
    },
    quizzes: [
      {
        q: 'What is the purpose of Exploratory Data Analysis (EDA) in data science?',
        opts: [
          { text: 'To visualize data distributions, detect anomalies, verify assumptions, and understand correlations before training models', isCorrect: true },
          { text: 'To format computer monitors', isCorrect: false }
        ],
        exp: 'EDA provides essential statistical understanding and identifies data quality issues before modeling.'
      }
    ],
    practicalTask: {
      title: 'Latent Taste Vector Calculation Lab',
      objective: 'Calculate the dot product recommendation score between a user vector and 2 movie vectors.',
      steps: [
        '1. User Vector: [SciFi: 0.9, Comedy: 0.2].',
        '2. Movie A (Space Thriller): [SciFi: 0.95, Comedy: 0.1] → Dot product = (0.9*0.95) + (0.2*0.1) = 0.875.',
        '3. Movie B (Romantic Comedy): [SciFi: 0.1, Comedy: 0.95] → Dot product = (0.9*0.1) + (0.2*0.95) = 0.280.',
        '4. Explain why Movie A is ranked first for this user.'
      ],
      expectedResult: 'You will understand the linear algebra dot product foundation of recommendation engines.'
    },
    recall: {
      q: 'How do recommendation algorithms turn ratings into intelligence?',
      a: 'Using matrix factorization and vector dot products to match user taste vectors against item attribute vectors!'
    },
    takeaways: [
      'Raw data requires exploratory data analysis and cleaning before machine learning can occur.',
      'Matrix factorization extracts latent concept vectors from sparse customer interaction tables.',
      'High-dimensional vector dot products power modern real-time recommendation engines.'
    ]
  },

  'machines that predict': {
    title: 'Machines That Predict',
    hook: 'How can a Linear Regression model look at square footage, number of bedrooms, and school district ratings to predict the exact market price of a house within 2% accuracy?',
    goal: 'Master continuous numerical prediction: Simple Linear Regression, Multiple Linear Regression, Ordinary Least Squares (OLS), and Mean Squared Error (MSE).',
    learnPoints: [
      'Understand Linear Regression: fitting the optimal line $y = wx + b$ through data points',
      'Learn Cost Functions: calculating Mean Squared Error (MSE) and minimizing residuals',
      'Understand Gradient Descent: iterative slope updates to find the global minimum loss'
    ],
    analogy: 'Linear regression is like sliding a taut string through a scatter plot of stars: you adjust the height and angle of the string until the total squared distance between the string and all stars is as tiny as possible!',
    explanationHtml: `<h3>The Foundations of Predictive Regression</h3>
<p>While classification predicts discrete labels (Spam vs Inbox), <strong>Regression</strong> predicts continuous numerical values: housing prices, stock returns, temperature, or crop yields.</p>
<h4>The Mathematics of Ordinary Least Squares (OLS)</h4>
<p>Linear regression models the relationship: $$\\hat{y} = w_1 x_1 + w_2 x_2 + ... + b$$. The model optimizes weights $w$ by minimizing the Mean Squared Error (MSE) cost function: $$MSE = \\frac{1}{n} \\sum (y_i - \\hat{y}_i)^2$$.</p>`,
    step1: {
      title: '1. Feature Matrix Formulation',
      desc: 'Structure multiple regression features (Area, Bedrooms, Location_Score) into design matrix $X$.',
      detail: 'Includes bias intercept column.',
      code: 'import numpy as np\nX = np.array([[1200, 3, 8.5], [1800, 4, 9.0], [850, 2, 6.0]])\ny = np.array([350000, 520000, 240000])'
    },
    step2: {
      title: '2. Fitting Ordinary Least Squares (OLS)',
      desc: 'Compute optimal analytical weights using the normal equation: $w = (X^T X)^{-1} X^T y$.',
      detail: 'Calculates closed-form optimal weights.',
      code: 'from sklearn.linear_model import LinearRegression\nreg = LinearRegression().fit(X, y)\nprint(f"Weights (Slopes): {reg.coef_} | Bias (Intercept): {reg.intercept_:.2f}")'
    },
    step3: {
      title: '3. Metric Evaluation ($R^2$ Score & RMSE)',
      desc: 'Evaluate model goodness-of-fit with Coefficient of Determination ($R^2$) and Root Mean Squared Error.',
      detail: '$R^2 > 0.90$ indicates strong predictive power.',
      code: 'from sklearn.metrics import r2_score, root_mean_squared_error\npredictions = reg.predict(X_test)\nprint(f"R² Score: {r2_score(y_test, predictions):.3f}")'
    },
    realScenario: 'A municipal water authority used multiple linear regression to predict daily city water consumption based on temperature, humidity, and day of the week. The model predicted water demand with 98.4% accuracy, saving $2.5 million in excess pumping power.',
    useCases: [
      'Real estate valuation platforms (like Zillow Zestimate) predicting home market values',
      'Aviation flight planning software predicting fuel burn based on aircraft weight and wind speed',
      'Renewable wind farms predicting hourly kilowatt generation from anemometer wind readings'
    ],
    simCode: 'area_sqft = 1500\nweight_per_sqft = 250.0\nbase_price = 50000.0\npredicted_price = base_price + (area_sqft * weight_per_sqft)\nprint(f"Predicted House Valuation: ${predicted_price:,.2f} 🏡")',
    simOutput: 'Predicted House Valuation: $425,000.00 🏡',
    pairs: [
      { id: 'p1', term: 'Linear Regression', definition: 'A supervised algorithm that models the linear relationship between input features and a continuous target variable' },
      { id: 'p2', term: 'Mean Squared Error (MSE)', definition: 'A loss metric measuring the average squared difference between actual values and model predictions' },
      { id: 'p3', term: 'R² Score (Coefficient of Determination)', definition: 'The proportion of variance in the target variable explained by the regression model (0.0 to 1.0)' }
    ],
    practice: {
      q: 'What does the Mean Squared Error (MSE) metric measure in linear regression?',
      opts: [
        'The average squared distance between the predicted values and the actual true values in the dataset',
        'How many lines of code were written',
        'The speed of the computer processor',
        'How many files were deleted'
      ],
      correct: 0,
      exp: 'MSE measures residual prediction error by squaring differences to penalize large errors heavily.',
      hint: 'Think about measuring the squared difference between predictions and actual values.'
    },
    quizzes: [
      {
        q: 'What does an $R^2$ score of 0.95 indicate about a regression model?',
        opts: [
          { text: 'The model explains 95% of the variance in the target variable, indicating a very strong predictive fit', isCorrect: true },
          { text: 'The model failed 95 times', isCorrect: false }
        ],
        exp: '$R^2$ represents the percentage of variance explained by model features.'
      }
    ],
    practicalTask: {
      title: 'Manual Linear Regression Calculation',
      objective: 'Calculate the predicted price for a 2,000 sq ft house given linear model weights.',
      steps: [
        '1. Formula: Price = Base_Intercept ($40,000) + (Area_sqft * $200).',
        '2. Plug in Area = 2,000: Price = 40,000 + (2,000 * 200).',
        '3. Calculate: 40,000 + 400,000 = $440,000.',
        '4. Explain what happens to the price if the weight per sq ft increases to $220.'
      ],
      expectedResult: 'You will master the mathematical equation of multiple linear regression.'
    },
    recall: {
      q: 'What is the goal of Linear Regression?',
      a: 'To find the optimal line or hyperplane $y = wx + b$ that minimizes the squared prediction error across all data points!'
    },
    takeaways: [
      'Linear regression predicts continuous real-world numerical values (prices, temperatures, energy).',
      'Ordinary Least Squares minimizes Mean Squared Error to find optimal feature weights.',
      'Evaluation metrics like $R^2$ and RMSE provide quantitative benchmarks of model predictive accuracy.'
    ]
  },

  'python in action': {
    title: 'Python in Action',
    hook: 'How can you write a 20-line Python script that automatically downloads live satellite weather data from an API and plots a colorized temperature heatmap of your country?',
    goal: 'Master scientific Python computing: NumPy vectorized array operations, Pandas DataFrame wrangling, and Matplotlib/Seaborn data visualization.',
    learnPoints: [
      'Master NumPy N-dimensional arrays (`np.ndarray`), slicing, broadcasting, and vector math',
      'Learn Pandas DataFrames: filtering, grouping (`groupby`), and merging datasets',
      'Create publication-quality scientific charts with Matplotlib and Seaborn'
    ],
    analogy: 'NumPy vectorized operations are like a multi-lane highway with 1,000 cars moving in unison: instead of moving cars one-by-one in a slow single-file loop, the whole highway accelerates simultaneously at the speed of C!',
    explanationHtml: `<h3>The Scientific Python Stack (NumPy, Pandas, Matplotlib)</h3>
<p>The entire global artificial intelligence and data science ecosystem is built upon the foundational trinity of Python libraries:</p>
<h4>1. NumPy (Numerical Python)</h4>
<p>Provides C-accelerated contiguous memory array buffers that execute mathematical linear algebra operations up to 50x faster than pure Python lists.</p>
<h4>2. Pandas (Data Wrangling)</h4>
<p>Provides powerful DataFrame structures for filtering, aggregating, and joining heterogeneous tabular datasets.</p>
<h4>3. Matplotlib & Seaborn (Visualization)</h4>
<p>Generates scientific scatter plots, histograms, heatmaps, and publication figures.</p>`,
    step1: {
      title: '1. High-Performance NumPy Vectorization',
      desc: 'Perform element-wise vector arithmetic without slow Python for-loops.',
      detail: 'Leverages SIMD CPU vectorization.',
      code: 'import numpy as np\ntemperatures_celsius = np.array([18.5, 22.0, 25.4, 19.8])\ntemperatures_fahrenheit = (temperatures_celsius * 9/5) + 32'
    },
    step2: {
      title: '2. Pandas Aggregation & Grouping',
      desc: 'Group tabular datasets by categories and compute multidimensional pivot aggregates.',
      detail: 'Aggregates statistics in a single call.',
      code: 'import pandas as pd\ndf = pd.read_csv("weather_stations.csv")\nstation_summary = df.groupby("city")["temp_celsius"].agg(["mean", "max", "min"])'
    },
    step3: {
      title: '3. Publication-Grade Visualization',
      desc: 'Plot distribution curves and box plots with Seaborn themes and custom axes formatting.',
      detail: 'Creates clear, interpretable visual reports.',
      code: 'import matplotlib.pyplot as plt, seaborn as sns\nsns.boxplot(data=df, x="city", y="temp_celsius")\nplt.title("City Temperature Distribution")\nplt.savefig("temp_distribution.png", dpi=300)'
    },
    realScenario: 'A student science team used Pandas and NumPy to analyze 100,000 temperature sensor readings from their school district, identified that 3 classrooms had faulty AC thermostats wasting $8,000 in electricity, and presented their visual Seaborn charts to the school board.',
    useCases: [
      'Astrophysicists processing multi-gigabyte astronomical FITS images with NumPy arrays',
      'Financial quantitative analysts backtesting stock trading strategies on 10 years of Pandas tick data',
      'Epidemiologists tracking vaccination rates across geographic counties with Seaborn choropleth maps'
    ],
    simCode: 'import numpy as np\narr = np.array([10, 20, 30, 40, 50])\nmean_val = np.mean(arr)\nstd_val = np.std(arr)\nprint(f"NumPy Vector Stats: Mean = {mean_val:.1f} | Standard Deviation = {std_val:.2f} 📊")',
    simOutput: 'NumPy Vector Stats: Mean = 30.0 | Standard Deviation = 14.14 📊',
    pairs: [
      { id: 'p1', term: 'NumPy ndarray', definition: 'A fast, homogeneous N-dimensional array object stored in contiguous memory for numerical computing' },
      { id: 'p2', term: 'Vectorization', definition: 'Executing mathematical operations across entire arrays simultaneously without writing explicit for-loops' },
      { id: 'p3', term: 'Pandas DataFrame', definition: 'A two-dimensional, size-mutable tabular data structure with labeled axes (rows and columns)' }
    ],
    practice: {
      q: 'Why are NumPy array operations significantly faster than standard Python lists for mathematical computing?',
      opts: [
        'NumPy arrays are stored in contiguous C memory buffers and execute pre-compiled C/Fortran SIMD vector instructions',
        'NumPy deletes all comments from your code',
        'NumPy runs only when the internet is disconnected',
        'Python lists are written in pencil'
      ],
      correct: 0,
      exp: 'Contiguous memory layout and low-level C execution eliminate Python interpreter overhead.',
      hint: 'Think about contiguous C memory and vectorized hardware acceleration.'
    },
    quizzes: [
      {
        q: 'What Pandas method is used to compute group-level statistics (like average sales by city)?',
        opts: [
          { text: '`df.groupby("city").mean()`', isCorrect: true },
          { text: '`df.split_and_mix()`', isCorrect: false },
          { text: '`df.sort_alphabetically()`', isCorrect: false }
        ],
        exp: '`groupby()` enables split-apply-combine data aggregations across categorical keys.'
      }
    ],
    practicalTask: {
      title: 'NumPy Weather Vectorization Lab',
      objective: 'Write a NumPy script that normalizes an array of 5 temperatures between 0.0 and 1.0.',
      steps: [
        '1. Raw Array: `temps = np.array([12.0, 18.0, 24.0, 30.0, 36.0])`.',
        '2. Formula: `normalized = (temps - np.min(temps)) / (np.max(temps) - np.min(temps))`.',
        '3. Verify that the minimum becomes 0.0 and the maximum becomes 1.0.',
        '4. Print formatted output array.'
      ],
      expectedResult: 'You will master Min-Max feature normalization using vectorized NumPy arithmetic.'
    },
    recall: {
      q: 'What are the three core libraries in the scientific Python stack?',
      a: 'NumPy (arrays & linear algebra), Pandas (tabular data manipulation), and Matplotlib/Seaborn (visualization)!'
    },
    takeaways: [
      'NumPy vectorized operations execute array mathematics at native C speed.',
      'Pandas DataFrames provide powerful data wrangling, merging, and grouping tools.',
      'Data visualization with Matplotlib and Seaborn transforms raw numbers into actionable visual insights.'
    ]
  },

  'solve it with code': {
    title: 'Solve It with Code',
    hook: 'How do navigation algorithms like A* search and Dijkstra calculate the single fastest driving route through a graph of 500,000 city road intersections in 12 milliseconds?',
    goal: 'Master graph algorithms and search strategies: Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra’s algorithm, and A* heuristic search.',
    learnPoints: [
      'Represent real-world networks (road maps, social graphs, internet routing) as Graph data structures (Nodes & Edges)',
      'Understand Breadth-First Search (BFS) for finding shortest paths in unweighted graphs',
      'Master Dijkstra’s Algorithm with Priority Queues for optimal pathfinding in weighted road networks'
    ],
    analogy: 'Dijkstra’s shortest path algorithm is like an expanding circular ripple of water on a pond: it spreads outward in all directions equally, guaranteeing that the first ripple that touches your destination island traveled the absolute shortest distance!',
    explanationHtml: `<h3>Graph Theory and Shortest-Path Algorithms</h3>
<p>Road networks, social networks, and internet packet routing are modeled as mathematical <strong>Graphs</strong>: Nodes (intersections, cities) connected by weighted Edges (roads with travel time costs).</p>
<h4>Dijkstra vs. A* Heuristic Search</h4>
<p>While Dijkstra explores all directions evenly, the <strong>A* Search Algorithm</strong> uses a directional heuristic (like straight-line Euclidean distance to the goal) to guide exploration directly toward the target, speeding up route calculation by 10x!</p>`,
    step1: {
      title: '1. Graph Adjacency List Representation',
      desc: 'Model road intersections and travel times using dictionary adjacency lists.',
      detail: 'Provides $O(1)$ neighbor vertex lookups.',
      code: 'graph = {\n    "A": [("B", 4), ("C", 2)],\n    "B": [("A", 4), ("C", 1), ("D", 5)],\n    "C": [("A", 2), ("B", 1), ("D", 8), ("E", 10)],\n    "D": [("B", 5), ("E", 2)],\n    "E": [("C", 10), ("D", 2)]\n}'
    },
    step2: {
      title: '2. Priority Queue Dijkstra Implementation',
      desc: 'Use Python’s `heapq` priority queue to continuously expand the lowest-cost unvisited vertex.',
      detail: 'Solves single-source shortest path in $O((V + E) \\log V)$ time.',
      code: 'import heapq\ndef dijkstra(graph, start):\n    distances = {node: float("inf") for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    while pq:\n        curr_dist, curr_node = heapq.heappop(pq)\n        if curr_dist > distances[curr_node]: continue\n        for neighbor, weight in graph[curr_node]:\n            distance = curr_dist + weight\n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(pq, (distance, neighbor))\n    return distances'
    },
    step3: {
      title: '3. Optimal Path Reconstruction',
      desc: 'Trace predecessor pointers backwards from goal to origin to reconstruct the exact turn-by-turn route.',
      detail: 'Outputs optimal route navigation list.',
      code: 'shortest_path = reconstruct_path(predecessors, start="A", goal="E")\nprint(f"Optimal GPS Route: {\' -> \'.join(shortest_path)}")'
    },
    realScenario: 'A food delivery startup implemented Dijkstra’s algorithm with live traffic edge weights. The algorithm optimized dispatch routes for 2,000 drivers across a metropolitan grid, reducing average delivery times by 8 minutes per meal.',
    useCases: [
      'GPS navigation apps (Google Maps, Waze) computing fastest driving routes in real time',
      'Internet network routers (OSPF protocol) routing data packets across global fiber optic cables',
      'Video game AI pathfinding directing characters around walls and obstacles on 3D terrain grids'
    ],
    simCode: 'import heapq\n# Simulated Dijkstra shortest route: A -> C (2) -> B (3) -> D (8) -> E (10)\nroute = ["Intersection A", "Intersection C", "Intersection B", "Intersection D", "Destination E"]\ntotal_time = 10 # minutes\nprint(f"Fastest Route: {\' → \'.join(route)} (Total Time: {total_time} mins 🚗💨)")',
    simOutput: 'Fastest Route: Intersection A → Intersection C → Intersection B → Intersection D → Destination E (Total Time: 10 mins 🚗💨)',
    pairs: [
      { id: 'p1', term: 'Graph (Nodes & Edges)', definition: 'A data structure composed of vertices (nodes) connected by lines (edges) with numerical weights' },
      { id: 'p2', term: 'Dijkstra’s Algorithm', definition: 'A graph search algorithm that finds the shortest path between nodes in a weighted graph' },
      { id: 'p3', term: 'Priority Queue (`heapq`)', definition: 'An abstract data structure where elements are popped in order of priority (lowest cost first)' }
    ],
    practice: {
      q: 'Why does Dijkstra’s algorithm use a Priority Queue (min-heap) instead of a regular list?',
      opts: [
        'A priority queue allows the algorithm to extract the lowest-cost unvisited intersection in $O(\\log V)$ time instead of scanning all nodes',
        'Because priority queues are colorful',
        'To delete visited nodes from computer memory',
        'Because regular lists cannot hold numbers'
      ],
      correct: 0,
      exp: 'Min-heaps optimize the vertex extraction step from $O(V)$ down to $O(\\log V)$, making the algorithm scalable to giant road maps.',
      hint: 'Think about extracting the lowest-cost node quickly.'
    },
    quizzes: [
      {
        q: 'What is the main advantage of the A* search algorithm over Dijkstra’s algorithm for GPS navigation?',
        opts: [
          { text: 'A* uses a heuristic distance estimate to guide search directly toward the goal, evaluating far fewer unnecessary road nodes', isCorrect: true },
          { text: 'A* only works on gravel roads', isCorrect: false }
        ],
        exp: 'The heuristic function in A* prunes search space by focusing exploration toward the destination.'
      }
    ],
    practicalTask: {
      title: 'Manual Dijkstra Trace on Mini Road Graph',
      objective: 'Calculate the shortest path and total cost from Node A to Node D.',
      steps: [
        '1. Edges: A→B (5), A→C (2), C→B (1), B→D (3), C→D (7).',
        '2. Step 1: Start at A (Cost 0). Neighbors: B(5), C(2). Pick C.',
        '3. Step 2: From C, reach B with total cost 2+1 = 3 (Better than direct A→B 5!).',
        '4. Step 3: From B, reach D with total cost 3+3 = 6 (Better than C→D 2+7 = 9!).',
        'Shortest Path: A → C → B → D with Total Cost = 6.'
      ],
      expectedResult: 'You will master the step-by-step relaxation logic of Dijkstra’s pathfinding algorithm.'
    },
    recall: {
      q: 'How do GPS navigation apps find the fastest route?',
      a: 'By modeling road networks as weighted graphs and finding the minimum-cost path using Dijkstra and A* search algorithms!'
    },
    takeaways: [
      'Graphs represent complex real-world networks: road maps, social connections, and internet routers.',
      'Dijkstra’s algorithm guarantees the mathematical shortest path in weighted graphs with non-negative edges.',
      'A* search uses heuristics to accelerate pathfinding for robotics, games, and real-time navigation.'
    ]
  },

  'ai for our planet': {
    title: 'AI for Our Planet',
    hook: 'How can computer vision algorithms running on Sentinel-2 satellite imagery detect illegal gold mining clear-cutting in the Amazon rainforest within 24 hours of the first tree being felled?',
    goal: 'Explore AI remote sensing: multispectral satellite analysis, land-use classification, deforestation tracking, and climate carbon modeling.',
    learnPoints: [
      'Understand multispectral satellite bands (Near-Infrared, Shortwave-Infrared, Red Edge)',
      'Learn Convolutional Neural Networks (U-Net) for satellite pixel semantic segmentation',
      'Discover global carbon sequestration modeling using LiDAR canopy height data'
    ],
    analogy: 'Remote sensing AI is like having a digital orbital microscope: it sees beyond human visible light into infrared wavelengths, measuring the biological vitality of every forest canopy on Earth every single week!',
    explanationHtml: `<h3>Satellite Remote Sensing & Planetary AI</h3>
<p>Earth observation satellites (like European Space Agency Sentinel-2 and NASA Landsat) circle the globe every 5 days, capturing multispectral wavelength bands that reveal hidden physical and biological indicators.</p>
<h4>U-Net Semantic Segmentation of Land Use</h4>
<p>Deep learning U-Net architectures classify satellite image pixels into 8 land-cover categories: Water, Tree Canopy, Flooded Vegetation, Crops, Built Area, Bare Ground, Snow/Ice, and Clouds.</p>`,
    step1: {
      title: '1. Ingestion of 12-Band Multispectral GeoTIFFs',
      desc: 'Load satellite tiles with rasterio and extract B4 (Red), B8 (Near-Infrared), and B11 (SWIR).',
      detail: 'Standardizes atmospheric reflectance.',
      code: 'import rasterio\nwith rasterio.open("amazon_sentinel2_tile.tif") as src:\n    red = src.read(4)\n    nir = src.read(8)\n    ndvi = (nir - red) / (nir + red + 1e-6)'
    },
    step2: {
      title: '2. U-Net Neural Land-Cover Segmentation',
      desc: 'Predict forest canopy vs deforestation scars using a pre-trained segmentation network.',
      detail: 'Detects illegal clearings down to 10-meter resolution.',
      code: 'predicted_mask = unet_model.predict(satellite_tensor)\nforest_loss_sqkm = np.sum(predicted_mask == "DEFORESTATION") * 0.0001'
    },
    step3: {
      title: '3. Automated Deforestation Alert Dispatch',
      desc: 'Generate automated vector polygon boundary geojson files and dispatch ranger coordinates.',
      detail: 'Enables rapid law enforcement interdiction.',
      code: 'if forest_loss_sqkm > 0.05:\n    dispatch_ranger_alert_geojson(lat, lon, polygon)'
    },
    realScenario: 'A national conservation agency deployed automated satellite AI across 1 million square kilometers of protected jungle. The system detected 142 illegal logging roads within 48 hours of bulldozing, allowing rangers to seize heavy machinery and protect 20,000 hectares of virgin rainforest.',
    useCases: [
      'Global Forest Watch monitoring world deforestation in real time from orbit',
      'Oceanographers tracking plastic waste concentration gyres in coastal waters',
      'Glaciologists measuring Antarctic ice sheet calving velocities using SAR radar'
    ],
    simCode: 'ndvi_canopy = 0.82 # Healthy deep rainforest\nndvi_scar = 0.18 # Bulldozed bare ground\nif ndvi_canopy - ndvi_scar > 0.50:\n    print("🚨 SATELLITE ALERT: Severe Canopy Loss Detected in Sector 42! Lat: -3.42, Lon: -62.15")',
    simOutput: '🚨 SATELLITE ALERT: Severe Canopy Loss Detected in Sector 42! Lat: -3.42, Lon: -62.15',
    pairs: [
      { id: 'p1', term: 'Multispectral Imaging', definition: 'Capturing image data at specific frequencies across the electromagnetic spectrum (including infrared)' },
      { id: 'p2', term: 'NDVI Index', definition: 'Normalized Difference Vegetation Index: a formula measuring plant photosynthetic activity from satellite bands' },
      { id: 'p3', term: 'U-Net Architecture', definition: 'A convolutional neural network design specialized for precise pixel-level semantic segmentation of satellite images' }
    ],
    practice: {
      q: 'Why do environmental satellites use Near-Infrared (NIR) light bands in addition to regular visible light to monitor forests?',
      opts: [
        'Healthy plant leaves reflect huge amounts of near-infrared light from chlorophyll, making plant vitality and deforestation instantly obvious',
        'Because near-infrared cameras are cheaper than regular cameras',
        'Because astronauts cannot see visible colors from orbit',
        'To take photos of outer space at night'
      ],
      correct: 0,
      exp: 'Cellular structure in healthy leaves strongly scatters near-infrared radiation, creating a sharp contrast against dead vegetation or bare soil.',
      hint: 'Think about healthy plant chlorophyll reflecting infrared light.'
    },
    quizzes: [
      {
        q: 'What is the function of the U-Net neural network in remote sensing?',
        opts: [
          { text: 'To perform pixel-level semantic segmentation, classifying every pixel as forest, water, urban, or deforested ground', isCorrect: true },
          { text: 'To navigate rocket engines during orbital launch', isCorrect: false }
        ],
        exp: 'U-Net provides encoder-decoder architectures with skip connections for high-resolution image segmentation.'
      }
    ],
    practicalTask: {
      title: 'Satellite NDVI Calculation Lab',
      objective: 'Calculate the NDVI score for two satellite pixels and classify healthy canopy vs bare soil.',
      steps: [
        '1. Pixel 1 (Forest): Red = 0.05, NIR = 0.85 → NDVI = (0.85 - 0.05) / (0.85 + 0.05) = 0.80 / 0.90 = +0.89.',
        '2. Pixel 2 (Bare Ground): Red = 0.25, NIR = 0.28 → NDVI = (0.28 - 0.25) / (0.28 + 0.25) = 0.03 / 0.53 = +0.05.',
        '3. Classify: Pixel 1 = Dense Healthy Canopy; Pixel 2 = Deforested Bare Soil.',
        'Write 1 sentence explaining how satellite AI automates this across billions of pixels.'
      ],
      expectedResult: 'You will master the mathematical formula behind global environmental satellite monitoring.'
    },
    recall: {
      q: 'What is the NDVI formula?',
      a: 'NDVI = (NIR - Red) / (NIR + Red), measuring plant chlorophyll and photosynthetic health from orbit!'
    },
    takeaways: [
      'Multispectral satellite AI monitors Earth’s forests, oceans, and glaciers in real time.',
      'Near-infrared reflectance and NDVI formulas quantify plant health and deforestation scars.',
      'Automated satellite alerts empower conservationists to protect endangered ecosystems rapidly.'
    ]
  },

  'ai for public good': {
    title: 'AI for Public Good',
    hook: 'How can an AI earthquake early warning system detect subterranean P-waves and automatically shut off city gas mains and stop bullet trains 45 seconds before the devastating S-wave surface shaking hits?',
    goal: 'Explore AI for societal benefit: disaster resilience, crisis response coordination, accessible assistive technologies, and public health optimization.',
    learnPoints: [
      'Learn how seismic AI networks detect fast non-destructive P-waves to issue instant public earthquake warnings',
      'Understand how computer vision assistive tools (Seeing AI, Be My Eyes) empower blind individuals',
      'Discover AI disaster mapping coordinating relief supplies and search-and-rescue teams during floods'
    ],
    analogy: 'Earthquake early warning AI is like a lightning flash before thunder: the sensor detects the silent electrical flash (P-wave) and sounds the siren so you can brace before the loud thunderclap (S-wave shaking) arrives!',
    explanationHtml: `<h3>Artificial Intelligence Serving Humanity</h3>
<p>When deployed for public good, machine learning protects lives during natural disasters, empowers individuals with disabilities, and optimizes municipal services.</p>
<h4>1. Earthquake Early Warning (EEW)</h4>
<p>Earthquakes release fast, low-energy <strong>Primary (P) waves</strong> followed by slower, destructive <strong>Secondary (S) waves</strong>. Deep learning seismology models analyze P-wave signatures in 0.5 seconds, triggering automated subway stops and school alarms 10 to 60 seconds before destructive shaking begins.</p>`,
    step1: {
      title: '1. Seismic Telemetry Stream Ingestion',
      desc: 'Ingest 3-axis velocity waveforms from 1,000 distributed seismometers at 100 Hz.',
      detail: 'Filters out cultural traffic noise.',
      code: 'seismic_stream = station.get_waveform_data(duration_sec=10)\n# Detect P-wave arrival phase'
    },
    step2: {
      title: '2. Deep Learning Magnitude & Epicenter Estimation',
      desc: 'Predict moment magnitude ($M_w$) and epicenter coordinates within 0.8 seconds of P-wave arrival.',
      detail: 'Estimates peak ground acceleration (PGA) across all city zones.',
      code: 'magnitude, epicenter = seismic_net.predict(p_wave_tensor)\nshaking_intensity = calculate_pga(magnitude, distance_km)'
    },
    step3: {
      title: '3. Automated Civil Defense Actuation',
      desc: 'Dispatch automated emergency broadcasts to smartphones, stop elevators at nearest floors, and halt trains.',
      detail: 'Prevents mass casualties and secondary fires.',
      code: 'if shaking_intensity >= "SEVERE":\n    halt_bullet_trains()\n    broadcast_public_emergency_alert(seconds_countdown=25)'
    },
    realScenario: 'During a magnitude 7.1 earthquake, an AI early warning system detected offshore P-waves and issued a 32-second advance alert. High-speed bullet trains braked safely to a complete stop, and surgery hospital generators activated, resulting in zero train derailments.',
    useCases: [
      'Earthquake early warning networks stopping trains and shutting natural gas valves',
      'Computer vision screen readers (Seeing AI) describing room surroundings and reading paper mail for visually impaired users',
      'AI flood prediction models routing emergency boats and relief food drops during monsoons'
    ],
    simCode: 'p_wave_arrival = True\npredicted_magnitude = 6.8\nwarning_time_sec = 28\nif predicted_magnitude > 6.0:\n    print(f"🚨 EARTHQUAKE WARNING: Severe shaking in {warning_time_sec}s! Drop, Cover, and Hold On! 🏢🛑")',
    simOutput: '🚨 EARTHQUAKE WARNING: Severe shaking in 28s! Drop, Cover, and Hold On! 🏢🛑',
    pairs: [
      { id: 'p1', term: 'P-Wave (Primary Wave)', definition: 'The fastest seismic wave that travels through Earth first, providing a vital warning signal before destructive shaking' },
      { id: 'p2', term: 'Assistive AI', definition: 'Technology designed specifically to assist individuals with visual, auditory, or physical disabilities' },
      { id: 'p3', term: 'Peak Ground Acceleration (PGA)', definition: 'A measurement of how hard the earth shakes at a specific geographic location during an earthquake' }
    ],
    practice: {
      q: 'How can an AI earthquake system give cities a 30-second warning before destructive ground shaking starts?',
      opts: [
        'By detecting fast, non-destructive subterranean P-waves and calculating epicenter magnitude before the slower destructive S-waves arrive',
        'By looking at storm clouds in the sky',
        'By predicting earthquakes 5 years in advance',
        'By asking animals if they are nervous'
      ],
      correct: 0,
      exp: 'P-waves travel nearly twice as fast as destructive S-waves, creating a crucial physical time window for automated warning systems.',
      hint: 'Think about fast P-waves arriving before slower, destructive S-waves.'
    },
    quizzes: [
      {
        q: 'How does computer vision Assistive AI (like Seeing AI) help visually impaired individuals?',
        opts: [
          { text: 'By recognizing objects, reading printed text, identifying currency, and speaking audio descriptions in real time', isCorrect: true },
          { text: 'By turning on loud sirens', isCorrect: false }
        ],
        exp: 'Real-time object recognition and OCR provide audio accessibility for blind users.'
      }
    ],
    practicalTask: {
      title: 'Disaster Early Warning System Architecture',
      objective: 'Design a 3-step automated safety protocol for an earthquake early warning trigger.',
      steps: [
        '1. Detection: Sensor detects P-wave with predicted Magnitude > 6.5.',
        '2. Automated Action 1 (Transit): Trigger emergency brakes on subway lines.',
        '3. Automated Action 2 (Infrastructure): Cut main city gas lines to prevent fires.',
        '4. Public Action: Broadcast 20-second countdown to citizens: Drop, Cover, and Hold On.',
        'Draw this emergency automation pipeline.'
      ],
      expectedResult: 'You will understand mission-critical automated civil defense engineering.'
    },
    recall: {
      q: 'Why can P-waves provide an earthquake early warning?',
      a: 'P-waves travel at 6 km/s while destructive S-waves travel at 3.5 km/s, creating a vital multi-second warning window!'
    },
    takeaways: [
      'AI for Public Good deploys machine learning to save lives, build disaster resilience, and expand accessibility.',
      'Early warning networks detect physical precursors (like P-waves) to automate civil defense actions.',
      'Assistive vision and speech technologies unlock independence for millions of people with disabilities.'
    ]
  },

  'design your ai future': {
    title: 'Design Your AI Future',
    hook: 'If you could invent an AI startup today that solves a critical challenge in education, renewable energy, or mental wellness, what would your pitch deck look like?',
    goal: 'Master AI product design: problem validation, technical feasibility assessment, UX wireframing, business model canvas, and ethical impact auditing.',
    learnPoints: [
      'Learn the AI Product Design Sprint: Problem Statement → Data Requirements → Model Selection → UI Prototype',
      'Conduct Technical Feasibility Analysis: Can this problem be solved with current machine learning?',
      'Create an Ethical Impact Assessment identifying potential failure modes and bias risks'
    ],
    analogy: 'Designing an AI product is like building an electric sports car: you need a powerful battery and engine (the AI model), an aerodynamic chassis (the User Interface), and reliable brakes and airbags (Safety & Ethics)!',
    explanationHtml: `<h3>The AI Product Engineering Framework</h3>
<p>Building a successful AI-powered venture requires much more than just training a model; it requires uniting human user needs, technical feasibility, and ethical safeguards into a coherent product roadmap.</p>
<h4>The 4 Pillars of AI Product Design</h4>
<ul>
  <li><strong>1. Problem Definition:</strong> What specific human pain point are you solving?</li>
  <li><strong>2. Data Strategy:</strong> Where will the high-quality, representative training data come from?</li>
  <li><strong>3. Model Architecture:</strong> What model (Computer Vision, LLM, Regression) matches the latency and compute budget?</li>
  <li><strong>4. Safety & Trust:</strong> How do you prevent hallucinations, protect user privacy, and handle edge cases?</li>
</ul>`,
    step1: {
      title: '1. User Problem Discovery & Persona Mapping',
      desc: 'Define the target user persona, core workflow friction points, and value proposition.',
      detail: 'Grounds product in genuine user needs.',
      code: 'product_brief = {\n    "name": "EcoRouter AI",\n    "target_user": "Urban Commuters",\n    "value_prop": "Reduces daily commute carbon emissions by 25% via multimodal route optimization"\n}'
    },
    step2: {
      title: '2. Technical Feasibility & Architecture Blueprint',
      desc: 'Map the data pipeline, model inference latency targets, and API integrations.',
      detail: 'Ensures computational feasibility within budget.',
      code: 'architecture = {\n    "input": "GPS + City Transit API",\n    "model": "Dijkstra + Multi-Objective Genetic Algorithm",\n    "latency_target_ms": 150\n}'
    },
    step3: {
      title: '3. Ethical Impact Assessment & Mitigation Plan',
      desc: 'Audit for algorithmic bias, data privacy leaks, and accessibility compliance (WCAG 2.1).',
      detail: 'Guarantees ethical deployment.',
      code: 'ethical_audit = {\n    "privacy": "Zero persistent GPS tracking; ephemeral routing only",\n    "accessibility": "Full screen-reader support and high-contrast color palette"\n}'
    },
    realScenario: 'A student team designed an AI app called "SignBridge" that translates sign language gestures into spoken audio using phone cameras. They conducted user testing with deaf students, refined gesture latency to 40ms, and won a $10,000 youth innovation grant.',
    useCases: [
      'Startups pitching AI sustainability solutions to venture capital investors',
      'Product managers creating technical specification documents (PRDs) for engineering teams',
      'Student innovators building social entrepreneurship ventures for global challenges'
    ],
    simCode: 'pitch = {"Product": "StudyBuddy AI", "Target": "High School Students", "Feasibility": "Validated", "Ethical Score": "A+"}\nprint(f"Startup Pitch Status: {pitch[\'Product\']} → Ready for Demo Day! 🚀")',
    simOutput: 'Startup Pitch Status: StudyBuddy AI → Ready for Demo Day! 🚀',
    pairs: [
      { id: 'p1', term: 'PRD (Product Requirements Doc)', definition: 'A detailed blueprint document outlining the purpose, features, and technical specifications of a software product' },
      { id: 'p2', term: 'Technical Feasibility', definition: 'Evaluating whether a proposed software feature can realistically be built with available data, algorithms, and computing power' },
      { id: 'p3', term: 'Value Proposition', definition: 'The clear, compelling benefit that a product delivers to solve a customer’s specific problem' }
    ],
    practice: {
      q: 'What is the most common reason that AI software projects fail in the real world?',
      opts: [
        'Building a complex model that solves a problem nobody actually has, or lacking sufficient quality training data to make it work reliably',
        'Running out of electricity in the office',
        'Using the wrong font in the title',
        'Computers refusing to run on Mondays'
      ],
      correct: 0,
      exp: 'Successful AI products must address verified user needs with a feasible, high-quality data strategy.',
      hint: 'Think about solving a real user problem and having good data.'
    },
    quizzes: [
      {
        q: 'What does an Ethical Impact Assessment examine during AI product design?',
        opts: [
          { text: 'Potential bias in datasets, user privacy risks, accessibility, and negative societal consequences of model failure', isCorrect: true },
          { text: 'The price of office snacks', isCorrect: false }
        ],
        exp: 'Ethical impact assessments proactively identify and mitigate safety, fairness, and privacy risks.'
      }
    ],
    practicalTask: {
      title: 'AI Startup Pitch Deck Blueprint',
      objective: 'Write a 4-slide pitch deck blueprint for an AI product of your own invention.',
      steps: [
        'Slide 1: Problem Statement (What human pain point are you solving?).',
        'Slide 2: AI Solution & Value Proposition (How does your AI solve it?).',
        'Slide 3: Technical Feasibility & Data Strategy (Where does the data come from?).',
        'Slide 4: Ethical Safeguards (How do you protect privacy and fairness?).'
      ],
      expectedResult: 'You will master the end-to-end product design framework used by top technology entrepreneurs.'
    },
    recall: {
      q: 'What are the 4 pillars of AI Product Design?',
      a: '1. Problem Definition, 2. Data Strategy, 3. Model Architecture, and 4. Safety & Trust!'
    },
    takeaways: [
      'Successful AI products start with verified human user needs, not just technical novelty.',
      'Assessing technical feasibility and data availability prevents costly project failures.',
      'Proactive ethical impact audits ensure technology is inclusive, fair, and trustworthy.'
    ]
  },

  'skill-to-career map': {
    title: 'Skill-to-Career Map',
    hook: 'How can you connect your current favorite high school subjects—like algebra, art, debate, or biology—directly to $150,000+ AI careers in high demand today?',
    goal: 'Create an actionable career mapping plan: correlating academic strengths to specialized computing roles, technical certifications, and university majors.',
    learnPoints: [
      'Map academic disciplines to specialized technical careers (Math → ML Research, Art → HAI/UX, English → Prompt Engineering/Ethics)',
      'Learn about high-value technical certifications (AWS Certified ML, Google Cloud Professional Data Engineer, TensorFlow Developer)',
      'Develop an undergraduate university major strategy (Computer Science, Data Science, Cognitive Science, Symbolic Systems)'
    ],
    analogy: 'Your skill-to-career map is like an airline route map: you identify where you are standing today (high school), pick your dream destination city (career), and chart the connecting flight hubs (courses, projects, certifications)!',
    explanationHtml: `<h3>Strategic Career Mapping in the AI Economy</h3>
<p>The modern artificial intelligence industry is vast and interdisciplinary. Every academic passion correlates to high-impact career pathways:</p>
<h4>Cross-Disciplinary Career Pathways</h4>
<ul>
  <li><strong>Love Math & Calculus?</strong> $\\rightarrow$ <em>Machine Learning Research Scientist</em> (inventing optimization algorithms).</li>
  <li><strong>Love Biology & Chemistry?</strong> $\\rightarrow$ <em>Computational Biologist / Genomics Data Scientist</em> (discovering cancer cures).</li>
  <li><strong>Love Debate, Law & Philosophy?</strong> $\\rightarrow$ <em>AI Governance Officer / Tech Policy Advisor</em> (regulating safety and ethics).</li>
  <li><strong>Love Art, Psychology & Design?</strong> $\\rightarrow$ <em>AI Creative Director / Human-AI Interaction Designer</em> (crafting experiences).</li>
</ul>`,
    step1: {
      title: '1. Cross-Disciplinary Strength Mapping',
      desc: 'Audit your top 2 academic strengths and identify their high-growth tech career intersection.',
      detail: 'Leverages comparative advantage.',
      code: 'career_map = {\n    "strengths": ["Advanced Mathematics", "Creative Writing"],\n    "target_role": "NLP Research Scientist & Prompt Architect",\n    "undergrad_major": "Computer Science + Linguistics (Double Major)"\n}'
    },
    step2: {
      title: '2. Curating Technical Milestones',
      desc: 'Set concrete annual learning milestones: Python $\\rightarrow$ SQL $\\rightarrow$ PyTorch $\\rightarrow$ Cloud Deployment.',
      detail: 'Sequences technical skill progression.',
      code: 'milestones = {\n    "Grade 10": "Python OOP + SQL Relational Databases",\n    "Grade 11": "Classical ML (scikit-learn) + Kaggle Competitions",\n    "Grade 12": "Deep Learning (PyTorch) + Capstone Project"\n}'
    },
    step3: {
      title: '3. Professional Networking & Mentorship',
      desc: 'Engage with industry professionals via LinkedIn, attend university open lectures, and contribute to open-source.',
      detail: 'Builds professional network early.',
      code: 'connect_with_mentors(field="Computational Biology", platform="GitHub")'
    },
    realScenario: 'A student who excelled in both high school debate and computer science chose a double major in Computer Science and Philosophy. They were hired as an AI Ethics Lead at an autonomous vehicle company, auditing safety decision algorithms.',
    useCases: [
      'High school students planning university major combinations for maximum career flexibility',
      'Early-career professionals building structured technical certification roadmaps',
      'University students selecting specialized research labs and professor mentors'
    ],
    simCode: 'target_career = "AI Ethics & Safety Director"\nacademic_path = "Computer Science + Law & Philosophy"\nexpected_demand = "🔥 Top 1% Global Demand across 2030-2050"\nprint(f"Target: {target_career} | Path: {academic_path} | Outlook: {expected_demand}")',
    simOutput: 'Target: AI Ethics & Safety Director | Path: Computer Science + Law & Philosophy | Outlook: 🔥 Top 1% Global Demand across 2030-2050',
    pairs: [
      { id: 'p1', term: 'Interdisciplinary Major', definition: 'A university degree that combines two distinct academic disciplines (e.g. Computer Science + Cognitive Psychology)' },
      { id: 'p2', term: 'Technical Certification', definition: 'An industry-recognized credential validating expertise in specific cloud platforms or machine learning frameworks' },
      { id: 'p3', term: 'Comparative Advantage', definition: 'Your unique combination of diverse skills that makes you stand out in the job market' }
    ],
    practice: {
      q: 'If a student is passionate about both writing/journalism and computer programming, which tech role represents the best intersection of their skills?',
      opts: [
        'AI Technical Writer, Prompt Architect, or Technology Policy Journalist',
        'Underwater fiber optic cable diver',
        'Hardware memory chip soldering technician',
        'Server room cooling fan repairman'
      ],
      correct: 0,
      exp: 'Combining linguistic mastery with technical fluency creates exceptional prompt architects and technical communicators.',
      hint: 'Look for roles that combine clear communication with technical computing.'
    },
    quizzes: [
      {
        q: 'Why are double majors combining computer science with humanities (like philosophy or linguistics) highly sought after by AI labs?',
        opts: [
          { text: 'Because modern AI challenges require understanding human language, cognitive ethics, and societal impact alongside coding', isCorrect: true },
          { text: 'Because double majors receive free laptops', isCorrect: false }
        ],
        exp: 'Interdisciplinary thinkers bridge the gap between technical algorithms and human values.'
      }
    ],
    practicalTask: {
      title: 'Personal Career Architecture Map',
      objective: 'Map your 5-year academic and technical trajectory from high school to university major.',
      steps: [
        '1. Top 2 Passions: (e.g. Space Exploration + Python Coding).',
        '2. Target Role: (e.g. Aerospace Autonomous Systems Engineer).',
        '3. Recommended College Majors: (e.g. Aerospace Engineering + Computer Science).',
        '4. 3 Core Technical Skills to master by age 18 (e.g. Python, Linear Algebra, ROS Robotics Operating System).'
      ],
      expectedResult: 'You will create an actionable personal compass for academic and technical growth.'
    },
    recall: {
      q: 'What is the power of an interdisciplinary skillset in AI?',
      a: 'Combining coding with domain expertise (medicine, art, law, biology) makes you uniquely valuable and irreplaceable!'
    },
    takeaways: [
      'Every academic passion connects directly to high-impact, high-growth AI professions.',
      'Sequencing technical milestones (Python $\\rightarrow$ Math $\\rightarrow$ PyTorch) ensures steady mastery.',
      'Interdisciplinary thinkers who bridge technology and human domains lead the future.'
    ]
  },

  'ai research room': {
    title: 'AI Research Room',
    hook: 'How do computer scientists read groundbreaking research papers on arXiv.org, dissect complex mathematical loss formulas, and reproduce state-of-the-art results in Python?',
    goal: 'Master academic research literacy: reading scientific papers on arXiv, dissecting mathematical notation, reproducing GitHub codebases, and writing research abstracts.',
    learnPoints: [
      'Learn the 3-Pass Method for efficiently reading computer science research papers',
      'Understand academic paper anatomy: Abstract, Introduction, Related Work, Methodology, Experiments, Discussion',
      'Learn how to navigate arXiv.org, Papers with Code, and Hugging Face Papers'
    ],
    analogy: 'Reading a research paper is like surveying a newly discovered uncharted continent: on Pass 1 you fly over in an airplane to see the mountains (Abstract); on Pass 2 you walk the trails (Methods); and on Pass 3 you dig into the caves with a magnifying glass (Math proofs)!',
    explanationHtml: `<h3>Mastering Academic AI Research</h3>
<p>Cutting-edge artificial intelligence moves at breathtaking speed. The latest breakthroughs (Transformers, Diffusion, Mamba) are published as open-access preprints on <strong>arXiv.org</strong> months before appearing in textbooks.</p>
<h4>The 3-Pass Method for Reading Research Papers</h4>
<ul>
  <li><strong>Pass 1 (Bird's Eye View - 5 mins):</strong> Read the Title, Abstract, and Conclusions. Look at the figures and tables. Decide if the paper is relevant.</li>
  <li><strong>Pass 2 (Grasp the Content - 30 mins):</strong> Read the main text, understand the key diagrams and experimental metrics, but set aside complex proofs.</li>
  <li><strong>Pass 3 (Deep Dissection - 2 hours):</strong> Recreate the paper’s assumptions from scratch, step through the mathematics, and inspect the open-source code on GitHub.</li>
</ul>`,
    step1: {
      title: '1. Literature Discovery & Benchmarking',
      desc: 'Use Papers with Code and arXiv to find state-of-the-art models on standard benchmark datasets (ImageNet, SQuAD).',
      detail: 'Identifies the current frontier performance.',
      code: '# Literature Search Query: "transformer-based vision backbone state-of-the-art"'
    },
    step2: {
      title: '2. Mathematical Formulation Dissection',
      desc: 'Deconstruct mathematical loss equations and tensor dimensions step-by-step.',
      detail: 'Translates Greek notation into Python code.',
      code: '# Equation: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V\nimport numpy as np\ndef attention(q, k, v):\n    d_k = q.shape[-1]\n    scores = np.dot(q, k.T) / np.sqrt(d_k)\n    return np.dot(softmax(scores), v)'
    },
    step3: {
      title: '3. Codebase Reproduction & Ablation Study',
      desc: 'Clone the author’s GitHub repository, run ablation experiments (removing one component to test importance), and verify claims.',
      detail: 'Validates scientific reproducibility.',
      code: 'git clone https://github.com/author/model-repo.git\npython evaluate.py --benchmark imagenet --weights pretrained.pt'
    },
    realScenario: 'A high school student read an arXiv research paper on neural plant disease detection, cloned the PyTorch codebase, modified the model to run on a lightweight Raspberry Pi camera, and presented their paper at an IEEE youth conference.',
    useCases: [
      'University graduate students reproducing SOTA computer vision papers for master’s theses',
      'Industry research scientists evaluating new transformer architectures for enterprise deployment',
      'Open-source developers implementing novel diffusion sampling algorithms in PyTorch'
    ],
    simCode: 'paper = {"Title": "Attention Is All You Need", "Venue": "NeurIPS", "Citations": "100,000+"}\nprint(f"Dissecting Landmark Paper: {paper[\'Title\']} ({paper[\'Venue\']}) 📚✨")\nprint("Key Contribution: Multi-Head Self-Attention replaces recurrence!")',
    simOutput: 'Dissecting Landmark Paper: Attention Is All You Need (NeurIPS) 📚✨\nKey Contribution: Multi-Head Self-Attention replaces recurrence!',
    pairs: [
      { id: 'p1', term: 'arXiv.org', definition: 'The premier open-access online repository for scholarly preprints in computer science, physics, and mathematics' },
      { id: 'p2', term: 'Ablation Study', definition: 'An experimental technique where specific features or layers are removed to measure their individual contribution to performance' },
      { id: 'p3', term: 'Reproducibility', definition: 'The foundational scientific principle that other researchers must be able to achieve the same experimental results using the published code and data' }
    ],
    practice: {
      q: 'What is the purpose of an "Ablation Study" in a machine learning research paper?',
      opts: [
        'To remove individual components or layers one by one to prove exactly how much each feature contributed to the final accuracy',
        'To delete the entire paper after reading',
        'To make the training run 10 times slower',
        'To check the author’s grammar'
      ],
      correct: 0,
      exp: 'Ablation studies isolate the causal impact of each architectural modification, proving what makes the new model work.',
      hint: 'Think about removing parts to see what happens.'
    },
    quizzes: [
      {
        q: 'What is the first step in the 3-Pass Method for reading a complex scientific paper?',
        opts: [
          { text: 'Read the Title, Abstract, Introduction, and glance at the charts to get a high-level bird’s-eye understanding of the paper’s main idea', isCorrect: true },
          { text: 'Memorize every mathematical equation on page 1', isCorrect: false }
        ],
        exp: 'Pass 1 provides a rapid high-level summary to determine relevance before investing time in deep mathematical dissection.'
      }
    ],
    practicalTask: {
      title: 'Research Abstract Deconstruction Lab',
      objective: 'Read an AI research abstract and extract the 4 core scientific components.',
      steps: [
        '1. Problem: What specific challenge is the paper solving?',
        '2. Novel Method: What new technique did the authors invent?',
        '3. Experimental Results: What quantitative metric improved (e.g. +4.2% accuracy)?',
        '4. Impact: Why does this matter for real-world applications?',
        'Write your 4-bullet deconstruction in your study notes.'
      ],
      expectedResult: 'You will master the scientific reading literacy needed to navigate modern AI research.'
    },
    recall: {
      q: 'What is the 3-Pass Method for reading research papers?',
      a: 'Pass 1: Bird’s-eye view (Abstract/Charts), Pass 2: Main content grasp, Pass 3: Deep mathematical & code dissection!'
    },
    takeaways: [
      'The AI research frontier is open-access and accessible to anyone via arXiv.org and Papers with Code.',
      'The 3-Pass Method enables rapid, efficient reading and comprehension of technical papers.',
      'Ablation studies and reproducible codebases validate genuine scientific progress.'
    ]
  },

  'ai creator studio': {
    title: 'AI Creator Studio',
    hook: 'How can you build a complete full-stack web application with React, TypeScript, and a backend AI model deployed live to the global internet on Vercel in one afternoon?',
    goal: 'Master end-to-end full-stack AI development: React frontend, REST API endpoints, streaming LLM responses, cloud deployment, and production monitoring.',
    learnPoints: [
      'Build modern reactive user interfaces with React, TypeScript, and Tailwind CSS',
      'Implement Server-Sent Events (SSE) for real-time word-by-word streaming AI responses',
      'Deploy full-stack web applications to cloud platforms (Vercel, Render) with continuous CI/CD integration'
    ],
    analogy: 'Building a full-stack AI app is like opening a high-tech restaurant: React is the beautiful dining room (Frontend), FastAPI is the kitchen order window (API Backend), and the AI model is the master chef cooking custom gourmet meals in real time!',
    explanationHtml: `<h3>Full-Stack AI Application Engineering</h3>
<p>Modern AI applications are not static command-line scripts; they are interactive, responsive web applications deployed across globally distributed edge servers.</p>
<h4>Real-Time Streaming Responses (SSE)</h4>
<p>Instead of making users wait 10 seconds in silence for a complete text response, full-stack AI apps stream tokens word-by-word using <strong>Server-Sent Events (SSE)</strong>, delivering a lightning-fast perceived response time under 300 milliseconds!</p>`,
    step1: {
      title: '1. Reactive Frontend UI Component Design',
      desc: 'Build an interactive chat or studio interface in React with state management hooks (`useState`, `useEffect`).',
      detail: 'Creates smooth user experience.',
      code: 'const [messages, setMessages] = useState<Message[]>([])\nconst [isGenerating, setIsGenerating] = useState(false)'
    },
    step2: {
      title: '2. Streaming Server-Sent Events (SSE) Backend',
      desc: 'Create a Python FastAPI or Next.js edge route that streams LLM tokens chunk-by-chunk over HTTP.',
      detail: 'Delivers instant interactive feedback.',
      code: 'async def stream_generator(prompt: str):\n    for chunk in ai_client.stream_completion(prompt):\n        yield f"data: {json.dumps({\'text\': chunk})}\\n\\n"'
    },
    step3: {
      title: '3. Cloud Deployment & CI/CD Pipeline',
      desc: 'Connect GitHub repository to Vercel/Render for automated continuous deployment on every git push.',
      detail: 'Launches your application to a live public URL.',
      code: 'git commit -m "feat: live streaming chat UI"\ngit push origin main\n# Vercel deploys to https://my-ai-studio.vercel.app'
    },
    realScenario: 'A student built an AI flashcard generation web app in React and Python. They shared the Vercel link on their school student portal, and over 1,200 classmates used the app to prepare for final exams.',
    useCases: [
      'Full-stack AI SaaS platforms serving thousands of paying business users',
      'Interactive educational portals providing real-time AI coding hints to students',
      'Collaborative design workbenches combining real-time canvas drawing with AI image generation'
    ],
    simCode: 'deployment = {"status": "LIVE 🟢", "url": "https://creator-studio-ai.vercel.app", "latency_ms": 180}\nprint(f"Full-Stack AI Deployment: {deployment[\'status\']} at {deployment[\'url\']} (Latency: {deployment[\'latency_ms\']}ms) 🚀")',
    simOutput: 'Full-Stack AI Deployment: LIVE 🟢 at https://creator-studio-ai.vercel.app (Latency: 180ms) 🚀',
    pairs: [
      { id: 'p1', term: 'Full-Stack Development', definition: 'Building both the user-facing frontend (React/HTML/CSS) and the server backend (Python/Node/Databases)' },
      { id: 'p2', term: 'Streaming (SSE)', definition: 'Server-Sent Events: streaming text word-by-word over an open HTTP connection for instant responsiveness' },
      { id: 'p3', term: 'CI/CD (Continuous Deployment)', definition: 'Automated software pipelines that build, test, and deploy code to the live internet on every git push' }
    ],
    practice: {
      q: 'Why do modern AI web applications stream responses word-by-word (using Server-Sent Events) instead of waiting for the full response to finish?',
      opts: [
        'It drastically improves perceived user responsiveness, giving the user immediate feedback within 300ms instead of a 10-second blank wait',
        'Because AI models can only speak one word at a time',
        'To make the computer fan spin faster',
        'To use less internet bandwidth'
      ],
      correct: 0,
      exp: 'Streaming tokens as they are generated minimizes time-to-first-token (TTFT), creating an engaging, responsive interface.',
      hint: 'Think about immediate feedback versus waiting 10 seconds.'
    },
    quizzes: [
      {
        q: 'What is Vercel in the modern web development ecosystem?',
        opts: [
          { text: 'A global cloud deployment platform that automatically builds and hosts full-stack web applications directly from GitHub', isCorrect: true },
          { text: 'A brand of computer monitors', isCorrect: false }
        ],
        exp: 'Vercel automates edge hosting, serverless functions, and global CDN distribution for web applications.'
      }
    ],
    practicalTask: {
      title: 'Full-Stack AI Application Architecture Blueprint',
      objective: 'Map the complete 3-tier architecture of a web application from user click to AI model response.',
      steps: [
        '1. Frontend: User types question in React textarea component.',
        '2. API Call: `fetch("/api/generate", {method: "POST", body: json})`.',
        '3. Backend: FastAPI receives request, validates API key, and calls LLM streaming endpoint.',
        '4. Stream Render: React updates UI state dynamically as chunks arrive over SSE.',
        'Draw this full-stack communication diagram.'
      ],
      expectedResult: 'You will master the modern full-stack AI application architecture.'
    },
    recall: {
      q: 'What is Full-Stack AI Development?',
      a: 'Building the interactive frontend UI, backend API routing, model streaming inference, and cloud deployment!'
    },
    takeaways: [
      'Full-stack engineering bridges machine learning intelligence with intuitive user interfaces.',
      'Token streaming (SSE) delivers fast perceived performance and engaging user experiences.',
      'Automated CI/CD pipelines allow you to ship and iterate on live web applications effortlessly.'
    ]
  },

  'think before you believe': {
    title: 'Think Before You Believe',
    hook: 'When an AI generated fake scientific papers with fabricated medical citations and realistic-looking charts that fooled peer reviewers, how do researchers protect scientific truth?',
    goal: 'Master academic digital literacy: detecting hallucinated citations, identifying statistical manipulation (p-hacking), and auditing scientific claims.',
    learnPoints: [
      'Understand how LLMs fabricate plausible-sounding academic citations with non-existent DOI links',
      'Learn p-hacking and statistical cherry-picking in data visualization',
      'Master the CRAAP test: Currency, Relevance, Authority, Accuracy, Purpose'
    ],
    analogy: 'Fact-checking an AI paper is like being a forensic detective inspecting a passport: just because it has a shiny golden seal (confident tone) doesn’t mean it’s real—you scan the barcode against official government databases (DOI check) to verify authenticity!',
    explanationHtml: `<h3>Critical Evaluation of AI Claims & Scientific Integrity</h3>
<p>Large Language Models are prone to <strong>Bibliographic Hallucination</strong>: when asked for sources, they invent author names, journal titles, and volume numbers that sound 100% authentic but are completely fabricated.</p>
<h4>The CRAAP Test for Information Literacy</h4>
<ul>
  <li><strong>C (Currency):</strong> How recent is the data? Has it been superseded by newer studies?</li>
  <li><strong>R (Relevance):</strong> Does the claim directly answer the question?</li>
  <li><strong>A (Authority):</strong> Who is the author? Are they a peer-reviewed expert or an anonymous blog?</li>
  <li><strong>A (Accuracy):</strong> Are experimental methodologies disclosed and reproducible? Do DOI links exist?</li>
  <li><strong>P (Purpose):</strong> Is the information educational, commercial advertising, or political persuasion?</li>
</ul>`,
    step1: {
      title: '1. DOI & CrossRef Verification',
      desc: 'Check whether cited Digital Object Identifier (DOI) numbers exist in official scientific databases (PubMed, IEEE Xplore, CrossRef).',
      detail: 'Exposes fabricated bibliographic citations.',
      code: 'def verify_doi_exists(doi_string):\n    response = requests.get(f"https://api.crossref.org/works/{doi_string}")\n    return response.status_code == 200'
    },
    step2: {
      title: '2. Statistical P-Hacking & Sample Size Audit',
      desc: 'Inspect sample sizes ($N$) and confidence intervals to ensure claims aren’t statistical artifacts from tiny groups.',
      detail: 'Audits scientific validity.',
      code: 'def audit_sample_size(n_samples, p_value):\n    if n_samples < 30 and p_value < 0.05:\n        warn_high_false_discovery_rate()'
    },
    step3: {
      title: '3. Triangulating Primary Replication Data',
      desc: 'Verify whether independent scientific teams have reproduced the experimental findings in peer-reviewed trials.',
      detail: 'Separates genuine breakthroughs from anomalies.',
      code: 'if count_independent_replications(study_id) < 2:\n    flag_provisional_unreplicated()'
    },
    realScenario: 'A high school student researching a biology paper noticed an AI generated a citation: "Smith et al., 2021, Journal of Marine Neuroscience, Vol 14." The student searched Google Scholar and PubMed, found the journal didn’t exist, and replaced it with a real peer-reviewed paper from Nature.',
    useCases: [
      'University admissions officers verifying research bibliography citations on student applications',
      'Medical professionals checking AI diagnostic summaries against verified clinical trial databases',
      'Journalists verifying statistical claims in press releases before writing news headlines'
    ],
    simCode: 'doi_checked = "10.1038/s41586-021-03819-2" # Real AlphaFold Nature paper\nis_valid = True # Verified on CrossRef\nprint(f"DOI: {doi_checked} → {\'✅ VERIFIED PEER-REVIEWED SOURCE\' if is_valid else \'❌ FABRICATED HALLUCINATION\'}")',
    simOutput: 'DOI: 10.1038/s41586-021-03819-2 → ✅ VERIFIED PEER-REVIEWED SOURCE',
    pairs: [
      { id: 'p1', term: 'DOI (Digital Object Identifier)', definition: 'A unique alphanumeric string assigned by the International DOI Foundation to identify authentic scientific publications permanently' },
      { id: 'p2', term: 'Bibliographic Hallucination', definition: 'When an AI model invents fake academic papers, authors, journal names, and volume numbers with confident tone' },
      { id: 'p3', term: 'Peer Review', definition: 'The rigorous evaluation of scientific research by independent experts in the same field before publication' }
    ],
    practice: {
      q: 'What is the most effective way to verify an academic research paper citation generated by an AI assistant?',
      opts: [
        'Search the exact DOI number and paper title on Google Scholar, PubMed, or CrossRef to verify that the study physically exists',
        'Assume it is real because the AI wrote it in Latin',
        'Trust it if it has a professor’s name in the title',
        'Print it out on paper'
      ],
      correct: 0,
      exp: 'Verifying DOIs against authoritative scientific registries exposes hallucinated citations instantly.',
      hint: 'Think about searching the DOI on official academic indexing databases.'
    },
    quizzes: [
      {
        q: 'What is the CRAAP test used for in research?',
        opts: [
          { text: 'A standardized critical evaluation framework to judge the Currency, Relevance, Authority, Accuracy, and Purpose of sources', isCorrect: true },
          { text: 'A speed-typing test for keyboards', isCorrect: false }
        ],
        exp: 'The CRAAP framework guides rigorous source criticism across academic research.'
      }
    ],
    practicalTask: {
      title: 'Academic Citation Verification Sprint',
      objective: 'Practice verifying 2 academic citations to determine which is real and which is hallucinated.',
      steps: [
        '1. Citation A: "Vaswani et al., Attention Is All You Need, NeurIPS 2017."',
        '2. Citation B: "Johnson et al., Quantum Gravity in Pet Dogs, Journal of Space Animals, 2024."',
        '3. Verify Citation A on Google Scholar (Real landmark transformer paper!).',
        '4. Expose Citation B as a humorous AI hallucination.',
        'Write 2 sentences explaining why verification is vital for academic integrity.'
      ],
      expectedResult: 'You will master the critical scientific habit of source verification.'
    },
    recall: {
      q: 'What is Bibliographic Hallucination?',
      a: 'When an AI model fabricates fake scientific papers, fake author names, and non-existent journal citations!'
    },
    takeaways: [
      'Never trust AI-generated citations without verifying DOI links on Google Scholar or PubMed.',
      'The CRAAP test provides a structured framework for evaluating the credibility of sources.',
      'Scientific truth requires reproducible evidence, peer review, and rigorous independent verification.'
    ]
  },

  'digital footprints & ai': {
    title: 'Digital Footprints & AI',
    hook: 'How can an AI profiling algorithm analyze 300 of your public social media "Likes" to predict your personality traits, political leanings, and purchasing habits more accurately than your own family members?',
    goal: 'Understand modern data profiling: psychometric micro-targeting, digital footprint aggregation, algorithmic surveillance, and personal privacy defenses.',
    learnPoints: [
      'Understand Psychometric Profiling (OCEAN Big Five personality model) used in computational advertising',
      'Learn how data brokers aggregate cross-platform footprints (browsing, purchases, location, device IDs)',
      'Master privacy hardening: tracker blockers, virtual private networks (VPNs), browser compartmentalization, and data rights'
    ],
    analogy: 'Your digital footprint is like walking through a snowy forest with glowing fluorescent paint on your boots: every step leaves a bright, indelible trail that algorithms follow to build a complete psychological map of your life!',
    explanationHtml: `<h3>Computational Psychometrics & The Digital Footprint</h3>
<p>Every digital interaction—clicks, scroll speeds, search queries, video watch durations, and location pings—leaves a permanent <strong>Digital Footprint</strong>. Commercial data brokers combine these disparate data points into unified psychological profiles using the <strong>OCEAN (Big Five)</strong> personality model.</p>
<h4>How Psychometric Micro-Targeting Works</h4>
<p>By mapping your digital behavior to the 5 dimensions—<strong>O</strong>penness, <strong>C</strong>onscientiousness, <strong>E</strong>xtraversion, <strong>A</strong>greeableness, and <strong>N</strong>euroticism—advertising algorithms customize persuasive messaging to influence your choices and opinions.</p>`,
    step1: {
      title: '1. Multi-Source Digital Footprint Ingestion',
      desc: 'Aggregate browsing history, location pings, device fingerprints, and app telemetry into a unified user graph.',
      detail: 'Data brokers link identifiers across platforms.',
      code: 'user_profile = aggregate_cross_platform_footprint(device_id="IDF-8891")'
    },
    step2: {
      title: '2. Psychometric Feature Inference (OCEAN Model)',
      desc: 'Predict Big Five personality trait percentiles using trained machine learning classification models.',
      detail: 'Maps digital behavioral signals to psychological traits.',
      code: 'ocean_scores = psychometric_model.predict(user_profile)\n# Scores: {"Openness": 0.82, "Neuroticism": 0.35, "Extraversion": 0.70}'
    },
    step3: {
      title: '3. Privacy Hardening & Footprint Minimization',
      desc: 'Deploy tracking-resistant browsers, disable cross-site cookies, and exercise GDPR opt-outs.',
      detail: 'Dramatically reduces behavioral data exposure.',
      code: 'activate_tracker_shield(block_third_party_cookies=True, rotate_user_agent=True)'
    },
    realScenario: 'A student noticed that after watching 3 videos on marathon running, every social platform and website they visited began displaying ads for energy gels and running shoes. The student installed open-source tracker blockers, cleared tracking cookies, and regained privacy.',
    useCases: [
      'Commercial advertising networks generating micro-targeted ads tailored to psychological profiles',
      'Insurance companies evaluating lifestyle health risk factors from smartwatch activity history',
      'Cybersecurity analysts auditing digital footprints to protect executives from spear-phishing attacks'
    ],
    simCode: 'footprint_audit = {"Trackers Blocked": 42, "Third-Party Cookies Cleared": True, "Location Cloaked": True}\nprint("🛡️ Privacy Shield Active:")\nfor k, v in footprint_audit.items():\n    print(f"  • {k}: {v}")',
    simOutput: '🛡️ Privacy Shield Active:\n  • Trackers Blocked: 42\n  • Third-Party Cookies Cleared: True\n  • Location Cloaked: True',
    pairs: [
      { id: 'p1', term: 'Psychometric Profiling', definition: 'Measuring psychological traits (like the OCEAN Big Five model) using behavioral data to predict human choices' },
      { id: 'p2', term: 'Data Broker', definition: 'A company that collects, aggregates, and sells personal data gathered from thousands of apps and websites' },
      { id: 'p3', term: 'Device Fingerprinting', definition: 'A tracking technique that identifies a specific device based on its unique browser, screen, and hardware configuration' }
    ],
    practice: {
      q: 'What is "Psychometric Micro-Targeting" in computational advertising?',
      opts: [
        'Using behavioral data to build psychological profiles of individuals and deliver customized persuasive messaging that exploits their personality traits',
        'Measuring how fast a computer processor calculates numbers',
        'Targeting archers with laser sights',
        'Repairing broken hard drives with microscopes'
      ],
      correct: 0,
      exp: 'Micro-targeting aligns persuasive messaging with individual psychological triggers (such as fear, status, or novelty).',
      hint: 'Think about using personality profiles to influence behavior.'
    },
    quizzes: [
      {
        q: 'What is the OCEAN model in psychological data profiling?',
        opts: [
          { text: 'The Big Five personality framework: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism', isCorrect: true },
          { text: 'A map of the Atlantic, Pacific, Indian, Arctic, and Southern Oceans', isCorrect: false }
        ],
        exp: 'The OCEAN framework is the gold standard psychometric model used in computational psychology.'
      }
    ],
    practicalTask: {
      title: 'Personal Digital Footprint Audit & Hardening',
      objective: 'Audit your digital footprint and implement 3 privacy hardening habits.',
      steps: [
        '1. Search your full name in quotation marks on Google (inspect what is publicly visible).',
        '2. Action 1: Install an open-source tracker blocker (like uBlock Origin).',
        '3. Action 2: Disable personalized ad tracking in your phone privacy settings.',
        '4. Action 3: Review and delete historical search activity in your Google/Apple accounts.',
        'Write 2 sentences reflecting on your digital autonomy.'
      ],
      expectedResult: 'You will take proactive control of your digital privacy and footprint.'
    },
    recall: {
      q: 'What are the 5 traits in the OCEAN psychometric model?',
      a: 'Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism!'
    },
    takeaways: [
      'Digital footprints are aggregated by data brokers into predictive psychometric profiles.',
      'Micro-targeting leverages behavioral data to influence consumer and political decisions.',
      'Deploying tracker blockers, auditing privacy settings, and exercising data rights protects your digital autonomy.'
    ]
  }
}
