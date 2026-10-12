# Class 6 • Chapter 3: AI Applications
## Lesson 2: AI on the Farm

**Syllabus Reference:** Class 6, Chapter 3 (AI Applications) — Lesson 2: *AI on the Farm*  
**Target Age Group:** 11–12 Years (Middle Level Foundation)  
**Estimated Duration:** 45–60 Minutes  

---

### 1. Learning Objectives & Prerequisites

#### Learning Objectives
By the end of this lesson, students will be able to:
1. **Define Precision Agriculture** and contrast it with traditional broadcast farming methods.
2. **Explain how Multispectral Imaging and Drones** detect crop health, hydration stress, and early pest infestations before they become visible to human eyes.
3. **Analyze Soil Telemetry Data** (moisture percentages, soil pH, Nitrogen-Phosphorus-Potassium NPK levels) to automate resource allocation.
4. **Evaluate the environmental and economic impact of AI weed-targeting robots** in reducing chemical pesticide runoff.
5. **Develop a Python data analysis script** that calculates field irrigation quotas based on simulated soil sensor readings.

#### Prerequisite Knowledge
- Basic understanding of plant biology (photosynthesis, roots, water and nutrient requirements).
- Familiarity with percentages and averages (mean calculations).

---

### 2. Narrative Mission Scenario

> **Mission Codename:** *Operation Terra-Bloom*  
> **Mission Briefing:** Welcome to the Green Valley Agricultural Cooperative!  
> Green Valley spans 500 hectares of vital wheat, corn, and fruit orchards. Recently, a severe heatwave coupled with an invasive aphid beetle threat has put the regional harvest in jeopardy.  
> In the old days, farmers would spray thousands of liters of chemical pesticides and pump millions of liters of groundwater across every single field indiscriminately. This wasted precious water, poisoned beneficial ladybugs, and cost enormous sums of money.  
> As the Cooperative’s Chief Agricultural AI Engineer, you must deploy an **Agro-Drone Surveillance Fleet** and **Underground IoT Soil Probes**! Your mission is to identify precisely which crops are thirsty or sick, target treatments with millimeter laser precision, and save the harvest while preserving the natural ecosystem.

---

### 3. Core Concept Explanations & Real-World Innovations

#### The Precision Agriculture Revolution
Traditional farming treats an entire 100-acre field as a single uniform plot. **Precision Agriculture** treats every square meter, and even individual plant stalks, as unique data points:

```
Traditional Farming (Broadcast Method):
[Entire 100-Acre Field] ───> Spray Everything Evenly ───> 90% Waste, Chemical Runoff

Precision AI Farming (Targeted Method):
[Sensor Probes + Drones] ───> Identify Specific Sick Plants ───> Micro-Dose (<10% Chemicals)
```

#### Key Technological Pillars of Smart Agriculture

| Technology Pillar | How It Operates | Real-World Agricultural Benefit |
| :--- | :--- | :--- |
| **Multispectral Agro-Drones** | Captures near-infrared (NIR) and visible green light reflected by plant chlorophyll. | Computes Vegetation Health (NDVI). Healthy plants absorb red light and reflect near-infrared; dying plants reflect less near-infrared. Detects drought stress days before leaves turn yellow. |
| **In-Ground IoT Sensor Probes** | Embedded 30 cm beneath the soil; measures dielectric permittivity (moisture), electrical conductivity (salinity), and NPK nutrient balance. | Triggers drip-irrigation valves only when soil moisture dips below optimal plant thresholds, saving up to 50% of agricultural freshwater. |
| **AI Computer Vision Weeders** | High-speed cameras mounted on tractor booms process 30 frames per second using deep learning models trained to distinguish weed leaves from crop leaves. | Micro-nozzles spray tiny droplets of organic herbicide exclusively onto weed leaves, cutting chemical pesticide use by over 85–90%. |
| **Harvest Yield Prediction Models** | Machine learning models correlate weather forecasts, historical yield data, satellite imagery, and drone scans. | Accurately predicts crop harvest tonnage months in advance, helping farmers secure fair market prices and reducing food spoilage. |

---

### 4. Guided Reasoning & Experiment

#### Interactive Investigation: Reading an NDVI Crop Health Map
Satellites and drones calculate a mathematical index called **NDVI** (Normalized Difference Vegetation Index):

$$\text{NDVI} = \frac{\text{Near-Infrared (NIR)} - \text{Red Light (RED)}}{\text{Near-Infrared (NIR)} + \text{Red Light (RED)}}$$

- **Healthy Green Plants:** Absorb Red light for photosynthesis and strongly reflect Near-Infrared. (NDVI Score: **+0.6 to +0.9**)
- **Stressed / Dry Plants:** Reflect less Near-Infrared because internal cell structures are collapsing. (NDVI Score: **+0.2 to +0.5**)
- **Bare Soil / Rocks / Water:** Reflects very little Near-Infrared. (NDVI Score: **-0.1 to +0.1**)

**Guided Investigation:**
1. A drone flies over Field Sector 4B and returns an NDVI score of `0.28`.
2. The farmer looks out the window: the leaves still look green to the human eye!
3. *Why should the farmer trust the AI drone?*
   - Human eyes cannot see near-infrared wavelengths. The plant’s cellular spongy mesophyll layers begin shrinking due to hidden underground root drought days before chlorophyll completely breaks down. The AI drone detects drought **invisibly and early**, allowing corrective watering before permanent crop damage occurs!

---

### 5. Interactive Game Specification

#### Game Title: *The Smart Agro-Manager*
- **Game Engine Type:** Resource-Optimization & Ecological Balance Simulation.
- **Educational Objective:** Hands-on experience in managing competing agricultural variables (water budget, fertilizer runoff, crop yield, and biodiversity score).

#### Game Rules & Mechanics:
1. **The Farm Grid (16 Crop Sectors):**
   - Each sector has live status meters: Moisture (%), Nitrogen Level (ppm), Pest Severity (1 to 5), and Yield Health.
2. **Resource Budget Per Turn:**
   - 1,000 Liters of Recycled Water.
   - 50 kg of Organic Nutrient Fertilizer.
   - 5 Targeted Micro-Spraying Drone Sorties.
3. **Player Decisions (Turn-Based):**
   - Sector A is at 68% moisture: Watering it wastes water and triggers fungal root rot (-50 pts).
   - Sector B is at 22% moisture: Urgent drip irrigation required (+100 pts).
   - Sector C has an aphid swarm (Level 4): Deploying the vision drone eliminates pests while saving beneficial bees (+150 pts).
   - *Broadcast Trap:* If the player hits the "Spray All Fields" panic button, pesticide runoff pollutes the local river, dropping the Biodiversity Score to zero!
4. **Completion State:**
   - Maintain 85%+ Crop Yield across 4 seasonal turns while keeping Eco-Health in the Green Zone.

#### Scoring & Achievement:
- **Maximum XP:** 400 XP
- **Badges:**
  - 🥉 *Eco-Farmer* (Zero chemical runoff incidents)
  - 🥈 *NDVI Detective* (Identified hidden root drought 2 turns early)
  - 🥇 *Sustainable Ag-Tech Pioneer* (Maximized harvest yield using <70% of available water budget)

---

### 6. Practical Challenge & Mini-Project

#### Mini-Project: *The Green Valley Drone Flight Plan*
**Objective:** Create an autonomous aerial inspection protocol for a 50-hectare strawberry orchard.

**Specifications:**
1. **Drone Altitude & Flight Path:** Choose between flying high (100 meters: fast scan, low detail) or low (20 meters: slow scan, high millimeter detail). Suggest an optimal two-tier flight strategy.
2. **Camera Sensor Payload:** Specify the sensors onboard (RGB optical camera + Near-Infrared thermal sensor).
3. **Trigger Thresholds:**
   - At what moisture level should the system trigger an automated alert to the farmer's mobile app?
   - What visual pattern should the computer vision model look for to detect strawberry fruit ripeness?

---

### 7. Python Coding Exercise (Runnable & Verified)

Let us implement a precision irrigation calculation engine in Python that analyzes an array of soil sensor probes.

```python
# =====================================================================
# AI OLYMPIAD CLASS 6: CHAPTER 3 LESSON 2
# PRECISION AGRICULTURE: SOIL SENSOR TELEMETRY & IRRIGATION ENGINE
# =====================================================================

def calculate_field_irrigation(soil_probes):
    """
    Analyzes telemetry from multiple IoT soil probes across field sectors.
    Determines precise water requirements to maintain optimal 60% saturation.
    """
    print(f"{'SECTOR':<10} | {'MOISTURE (%)':<14} | {'SOIL TEMP (°C)':<15} | {'RECOMMENDED ACTION'}")
    print("-" * 65)
    
    total_water_liters = 0
    sectors_requiring_water = 0
    
    for probe in soil_probes:
        sector = probe["sector"]
        moisture = probe["moisture"]
        temp = probe["temp"]
        
        # Optimal moisture target is 60%
        if moisture < 40:
            # High water deficit
            water_needed = (60 - moisture) * 50  # 50 liters per deficit percentage point
            action = f"💧 PUMP ON: Dispense {water_needed} L (Drought Alert)"
            total_water_liters += water_needed
            sectors_requiring_water += 1
        elif 40 <= moisture < 55:
            # Mild deficit
            water_needed = (60 - moisture) * 30
            action = f"🌱 ECO-PULSE: Dispense {water_needed} L (Maintenance)"
            total_water_liters += water_needed
            sectors_requiring_water += 1
        elif 55 <= moisture <= 70:
            action = "✅ OPTIMAL: Moisture balanced. Valves closed."
        else:
            action = "⚠️ WATERLOGGED: High moisture! Open drainage channels."
            
        print(f"{sector:<10} | {moisture:<14.1f} | {temp:<15.1f} | {action}")
        
    print("-" * 65)
    print(f"Summary: {sectors_requiring_water}/{len(soil_probes)} sectors irrigated.")
    print(f"Total Precision Water Allocated: {total_water_liters:,} Liters.")
    print(f"Water Saved vs Conventional Flooding (50,000 L): {50000 - total_water_liters:,} Liters!")

# ----------------- SIMULATED TELEMETRY DATA -----------------
field_telemetry = [
    {"sector": "Alpha-1", "moisture": 32.5, "temp": 28.4},
    {"sector": "Alpha-2", "moisture": 62.0, "temp": 25.1},
    {"sector": "Beta-1",  "moisture": 48.0, "temp": 27.0},
    {"sector": "Beta-2",  "moisture": 76.5, "temp": 23.8},
    {"sector": "Gamma-1", "moisture": 25.0, "temp": 31.2}
]

print("=== GREEN VALLEY PRECISION AG-BOT INFERENCE RUN ===\n")
calculate_field_irrigation(field_telemetry)
```

#### Expected Program Output:
```text
=== GREEN VALLEY PRECISION AG-BOT INFERENCE RUN ===

SECTOR     | MOISTURE (%)   | SOIL TEMP (°C)  | RECOMMENDED ACTION
-----------------------------------------------------------------
Alpha-1    | 32.5           | 28.4            | 💧 PUMP ON: Dispense 1375.0 L (Drought Alert)
Alpha-2    | 62.0           | 25.1            | ✅ OPTIMAL: Moisture balanced. Valves closed.
Beta-1     | 48.0           | 27.0            | 🌱 ECO-PULSE: Dispense 360.0 L (Maintenance)
Beta-2     | 76.5           | 23.8            | ⚠️ WATERLOGGED: High moisture! Open drainage channels.
Gamma-1    | 25.0           | 31.2            | 💧 PUMP ON: Dispense 1750.0 L (Drought Alert)
-----------------------------------------------------------------
Summary: 3/5 sectors irrigated.
Total Precision Water Allocated: 3,485.0 Liters.
Water Saved vs Conventional Flooding (50,000 L): 46,515.0 Liters!
```

---

### 8. Olympiad-Style Questions & Detailed Explanations

#### Question 1 (Agricultural Remote Sensing)
What light spectrum band does a multispectral drone camera measure in conjunction with visible red light to calculate the Normalized Difference Vegetation Index (NDVI)?
- **A)** Ultraviolet (UV) radiation
- **B)** Near-Infrared (NIR) light
- **C)** Microwave radar emissions
- **D)** Gamma ray bursts
- **Correct Answer:** **B**
- **Explanation:** Healthy plant foliage strongly absorbs visible red light for chlorophyll photosynthesis while its internal spongy mesophyll cell structure strongly reflects **Near-Infrared (NIR)** light. Measuring the mathematical ratio between NIR reflection and Red absorption (NDVI) provides a precise, non-destructive metric of plant vigor.

#### Question 2 (Resource Conservation & Ecological Impact)
How does computer-vision-guided precision weeding tractors benefit local soil ecology compared to conventional blanket herbicide spraying?
- **A)** They eliminate the need for agricultural tractors altogether.
- **B)** They only apply tiny droplets directly onto targeted weed leaves, reducing overall chemical use by up to 90% and protecting soil microbes and beneficial insects.
- **C)** They turn weeds into gold coins.
- **D)** They replace chemical spraying with high-power radioactive lasers that heat the soil to 500°C.
- **Correct Answer:** **B**
- **Explanation:** Conventional broadcast spraying saturates entire fields, resulting in massive pesticide drift, groundwater contamination, and the destruction of beneficial insects like pollinators. Vision-guided AI sprayers identify weed leaves within milliseconds, targeting only the weeds and reducing environmental chemical loads by 85–90%.

#### Question 3 (IoT Sensor Telemetry)
If an IoT soil sensor probe in an agricultural field reports a moisture reading of 85% and electrical conductivity spikes, while ambient weather forecasts predict 3 days of torrential rain, what is the most appropriate automated action for the smart farm system?
- **A)** Activate high-power irrigation pumps at maximum volume.
- **B)** Turn off all irrigation valves and automatically open field drainage sluice gates to prevent root rot.
- **C)** Spray chemical fertilizer across all fields immediately.
- **D)** Delete the sensor database.
- **Correct Answer:** **B**
- **Explanation:** An 85% moisture reading indicates soil near water saturation. With torrential rain imminent, adding more water would drown crop roots, deplete soil oxygen, and breed fungal diseases. The AI decision engine must halt all irrigation and prepare drainage channels.

#### Question 4 (Higher-Order Scenario: Pest Detection AI)
A drone equipped with an object detection model flies over an apple orchard to detect codling moths. During testing, the model achieves 99% accuracy on sunny days. However, at dusk and on overcast days, accuracy plummets to 45%. What engineering intervention would most effectively resolve this deficiency?
- **A)** Prohibit moths from flying after 5:00 PM.
- **B)** Retrain the vision model with additional training photographs taken under low-light, cloudy, and dusk lighting conditions, or equip the drone with active auxiliary LED illumination.
- **C)** Paint all apple trees bright white.
- **D)** Replace the drone with an ultrasonic submarine.
- **Correct Answer:** **B**
- **Explanation:** The model suffered from **training distribution bias**—it was trained exclusively on bright daylight imagery. Adding low-light training samples (data augmentation) and equipping the inspection drone with consistent onboard LED illumination ensures high feature visibility across diverse lighting conditions.

#### Question 5 (Economic and Humanitarian Implications)
Why is AI-powered early harvest yield prediction vital for global food security?
- **A)** It guarantees that food will never cost any money.
- **B)** It allows governments, logistics networks, and humanitarian agencies to anticipate regional crop shortfalls months in advance, stabilizing food supply chains and preventing famine.
- **C)** It forces farmers to sell all their crops to tech companies.
- **D)** It speeds up the biological growth of wheat from 4 months to 2 days.
- **Correct Answer:** **B**
- **Explanation:** Reliable yield forecasts provide critical advance intelligence. If an AI predicts a 30% wheat deficit in a specific province due to drought patterns, international aid organizations and food distribution networks can reroute supplies, secure grain reserves, and stabilize prices before food shortages turn into humanitarian crises.

---

### 9. Responsible AI & Ethical Reflection

#### Smallholder Farmers & The Digital Divide
While massive agricultural conglomerates can afford $500,000 smart tractors and drone fleets:
- **Equitable Access:** Smallholder family farmers produce over 30% of the world's food. If advanced AI farming tools are only available to wealthy industrial farms, small farmers risk economic displacement.
- **Frugal Innovation:** Responsible AI engineering focuses on developing lightweight, open-source models that can run on low-cost smartphones, enabling smallholder farmers in developing nations to photograph a sick leaf and receive instant, free disease diagnosis.

---

### 10. Completion Criteria & Gamified Rubric

| Milestones | Performance Criteria | XP Awarded | Mastery Level |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Ag-Tech Foundations** | Accurately explains precision farming vs broadcast methods with NDVI formula. | 100 XP | Agro-Cadet |
| **Pillar 2: Farm Manager Game** | Successfully manages all 16 farm sectors while maintaining eco-balance. | 100 XP | Sustainable Steward |
| **Pillar 3: Python Coding** | Runs the precision irrigation telemetry engine and interprets water savings. | 100 XP | Precision Coder |
| **Pillar 4: Olympiad Assessment** | Scores 4/5 or 5/5 on the Olympiad precision agriculture questions. | 100 XP | Olympiad Scholar |
| **Bonus: Drone Flight Plan** | Designs a comprehensive two-tier orchard inspection protocol. | 50 XP | Chief Ag-Technologist |
| **Total Possible** | **Complete Lesson Mastery** | **450 XP** | 🏆 **Gold Tier** |
