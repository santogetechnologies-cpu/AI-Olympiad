import React, { useState } from 'react'
import {
  Compass, ShieldCheck, Building2, CheckCircle2, ChevronRight, Play,
  Sparkles, Award, Scale, AlertCircle, Users, Activity,
  Sliders, ArrowRight, Radio, Shield, Check, Zap, RotateCcw, AlertTriangle,
  Sun, Moon, Thermometer, User, Terminal, Lock, RefreshCw, FileText, Droplet,
  Trophy, ShieldAlert
} from 'lucide-react'
import type { WorldExperienceProps } from './types'
import { ThreeStageMasteryQuiz } from '../ThreeStageMasteryQuiz'
import {
  UniversalLessonGameEngine,
  MatchPairStation,
  ClassificationSorter,
  SequenceBuilder,
  InteractiveSliderTuner,
  VisualInspectionScanner,
  CircuitWireStation,
  BugRepairStation,
  DataCollectorGrid,
  CodeBlockAssembler
} from '../primitives/LevelEnginePrimitives'

// =============================================================================
// CLASS 9 CHALLENGE WORLD DISPATCHER (SMART CITY & CIVIC CHALLENGE)
// Unique Theme: Teal & Emerald Civic Grid · Public Policy Trade-off Dials
// =============================================================================

export const Class9ChallengeWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class9Chapter2InfrastructureWorld {...props} />
    case 3:
      return <Class9Chapter3CivicEthicsWorld {...props} />
    case 4:
      return <Class9Chapter4EcoAIWorld {...props} />
    case 5:
      return <Class9Chapter5GovernanceWorld {...props} />
    case 6:
      return <Class9Chapter6FutureCityWorld {...props} />
    default:
      return <Class9Chapter1ImpactWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: CIVIC AI & SOCIETAL IMPACT MATRICES
// =============================================================================

function Class9Chapter1ImpactWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C9Ch1S2ImpactMatrix {...props} />
  if (sectionIdx === 2) return <C9Ch1S3PolicyDilemma {...props} />
  if (sectionIdx === 3) return <C9Ch1S4Assessment {...props} />
  if (sectionIdx === 4) return <C9Ch1S5GridMaster {...props} />
  if (sectionIdx === 5) return <C9Ch1S6IndustrySandbox {...props} />
  if (sectionIdx === 6) return <C9Ch1S7CityPitch {...props} />
  return <C9Ch1S2ImpactMatrix {...props} />
}

function C9Ch1S2ImpactMatrix(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title="Civic Impact Matrices & Multi-Stakeholder Trade-offs"
      lessonSubtitle="Balancing Efficiency, Privacy & Equity"
      simpleDefinition="Deploying AI in public infrastructure requires evaluating multi-stakeholder trade-offs across three critical pillars: Operational Efficiency, Citizen Privacy, and Social Equity."
      smallExample="A municipal traffic AI balances fast ambulance transit corridors without causing gridlock in residential school zones."
      oneWordPoint={{ question: "What balances competing societal goals?", answer: "Multi-Stakeholder Matrix" }}
      keyPoints={[
        { icon: Building2, title: 'Municipal Efficiency', text: 'Optimizes resource allocation, transit scheduling, and energy usage.' },
        { icon: Lock, title: 'Citizen Privacy Rights', text: 'Prevents mass surveillance by anonymizing public sensor feeds.' },
        { icon: Scale, title: 'Equitable Access', text: 'Ensures smart city services benefit all socio-economic neighborhoods equally.' }
      ]}
      aiDialogue="Welcome Commissioner! I am City Advisor Aura. Let's analyze civic impact matrices and solve 3 municipal infrastructure challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Civic Trade-off Matcher",
          title: "Match Municipal AI Initiatives to Civic Pillars",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'c1', left: 'Edge Facial Blurring on CCTV', right: 'Citizen Privacy Protection' },
                { id: 'c2', left: 'Predictive Transit Bus Routing', right: 'Municipal Operational Efficiency' },
                { id: 'c3', left: 'Subsidized Smart Water Meters', right: 'Social Equity & Environmental Justice' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Policy Balance Tuner",
          title: "Calibrate Public Surveillance Privacy Anonymization",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Public Camera Anonymization Strength"
              description="Tune edge pixelation strength between 80% and 95% to protect pedestrian faces while retaining crowd density counts."
              min={50}
              max={100}
              unit="%"
              targetRange={[80, 95]}
              optimalLabel="Optimal Civic Balance: 100% Privacy Preserved & Accurate Density Metrics"
              suboptimalLabel="Privacy Leak (<80%) or Over-blur (>95%)! Target: 80% - 95%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Civic Impact Sorter",
          title: "Sort Equitable Public Policies vs Biased Deployments",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cp1', label: 'Deploying air quality sensors evenly across all city districts', bin: 'A' },
                { id: 'cp2', label: 'Allocating smart buses exclusively to wealthy commercial hubs', bin: 'B', hint: 'Severe equity violation!' },
                { id: 'cp3', label: 'Holding public town hall consultations before deploying civic AI', bin: 'A' },
                { id: 'cp4', label: 'Surreptitiously collecting citizen biometric data without consent', bin: 'B', hint: 'Civil rights violation!' }
              ]}
              binALabel="Equitable Civic AI Policy"
              binBLabel="Biased / Discriminatory Practice"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C9Ch1S3PolicyDilemma(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title="Autonomous Transport & The Trolley Dilemma"
      lessonSubtitle="Ethical Decision-Making Under Uncertainty"
      simpleDefinition="When autonomous vehicles encounter unavoidable emergency hazards, decision algorithms must follow ethically codified rules that prioritize minimizing human harm and protecting vulnerable road users."
      smallExample="An autonomous vehicle swerves into an empty soft snowbank rather than colliding with a group of cyclists."
      oneWordPoint={{ question: "What ethical framework minimizes total harm?", answer: "Utilitarian Harm Reduction" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'Vulnerable Road Users', text: 'Pedestrians and cyclists receive highest safety priority.' },
        { icon: Scale, title: 'Predictable Failsafes', text: 'Vehicles must behave deterministically without sudden erratic maneuvers.' },
        { icon: AlertCircle, title: 'Liability Frameworks', text: 'Clear legal accountability shared between manufacturers and software operators.' }
      ]}
      aiDialogue="Examine autonomous transport ethics! Balance collision mitigation priorities and audit vehicle safety codes!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Safety Priority Matcher",
          title: "Match Road User Categories to Safety Priority Hierarchy",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: 'Unprotected Pedestrian on Crosswalk', right: 'Tier 1 Priority: Maximum Harm Avoidance' },
                { id: 'p2', left: 'Cyclist in Dedicated Bike Lane', right: 'Tier 1 Priority: High Clearance Buffer' },
                { id: 'p3', left: 'Steel Highway Crash Attenuator', right: 'Tier 3 Priority: Kinetic Energy Dissipation' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Emergency Evasive Sequence",
          title: "Sequence the Autonomous Vehicle Emergency Evasion Logic",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ev1', label: '1. Detect sudden obstacle and evaluate lateral escape corridors', detail: 'Perception' },
                { id: 'ev2', label: '2. Select empty escape path with lowest kinetic harm probability', detail: 'Ethics Logic' },
                { id: 'ev3', label: '3. Pulse anti-lock brakes and broadcast emergency hazard hazard blinkers', detail: 'Execution' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ev1' && ids[1] === 'ev2' && ids[2] === 'ev3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Transport Scenario Sorter",
          title: "Classify Safe Evasive Maneuvers vs Dangerous Actions",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ts1', label: 'Steering into empty gravel shoulder to avoid sudden stopped vehicle', bin: 'A' },
                { id: 'ts2', label: 'Swerving onto crowded pedestrian sidewalk to protect car bumper', bin: 'B', hint: 'Catastrophic ethical violation!' },
                { id: 'ts3', label: 'Gradual controlled stop maintaining lane center during tire puncture', bin: 'A' },
                { id: 'ts4', label: 'Accelerating aggressively through yellow light at blind intersection', bin: 'B', hint: 'Dangerous aggressive driving!' }
              ]}
              binALabel="Ethical Safety Maneuver"
              binBLabel="Dangerous / Unethical Reaction"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C9Ch1S4Assessment(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title="Environmental AI & Smart Power Grids"
      lessonSubtitle="Predictive Dispatch & Carbon Reduction"
      simpleDefinition="Smart power grids use recurrent neural networks to forecast solar and wind power generation 24 hours in advance, charging municipal battery banks when renewable power is plentiful."
      smallExample="Predicting cloud cover at a 200MW solar farm to spin up hydro storage before peak evening air conditioning demand."
      oneWordPoint={{ question: "What forecasts time-series energy demand?", answer: "Predictive Grid AI" }}
      keyPoints={[
        { icon: Sun, title: 'Renewable Forecasting', text: 'Models solar irradiance and wind velocity microclimates.' },
        { icon: Zap, title: 'Peak Load Shifting', text: 'Charges EV fleets and industrial cold storage during low-cost surplus hours.' },
        { icon: Activity, title: 'Carbon Footprint Tracking', text: 'Calculates real-time grams of CO2 per kilowatt-hour of grid electricity.' }
      ]}
      aiDialogue="Power up the green grid! Balance renewable generation, forecast solar output, and slash municipal carbon emissions!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Grid Energy Bus",
          title: "Wire Clean Energy Generation to Municipal Load Centers",
          render: (onPass) => (
            <CircuitWireStation
              title="Renewable Grid Distribution Bus"
              instruction="Connect clean generation sources to municipal consumption hubs."
              terminals={[
                { id: 't_solar', label: 'Desert Solar Photovoltaic Array', icon: <Sun size={12} /> },
                { id: 't_wind', label: 'Coastal Offshore Wind Turbine Farm', icon: <Activity size={12} /> },
                { id: 't_battery', label: 'Grid Megapack Battery Storage Hub', icon: <Zap size={12} /> }
              ]}
              ports={[
                { id: 'p_metro', label: 'Hub 1: Downtown Metro Transit Grid', matchesTerminalId: 't_solar' },
                { id: 'p_hosp', label: 'Hub 2: Hospital Emergency Microgrid', matchesTerminalId: 't_battery' },
                { id: 'p_ind', label: 'Hub 3: Industrial Port Cargo Cranes', matchesTerminalId: 't_wind' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Battery Dispatch Tuner",
          title: "Tune Battery Reserve Charge for Peak Grid Resilience",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Municipal Battery Emergency Reserve"
              description="Tune reserve threshold between 35% and 50% to handle heatwave demand spikes while preserving battery lifespan."
              min={10}
              max={90}
              unit="%"
              targetRange={[35, 50]}
              optimalLabel="Optimal Battery Resilience & Grid Peak Shaving Balanced"
              suboptimalLabel="Blackout Risk (<35%) or Under-utilized Storage (>50%)! Target: 35% - 50%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Renewable vs Peaker Sorter",
          title: "Sort Zero-Emission Clean Energy vs High-Carbon Peakers",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'e1', label: 'Rooftop Solar + Lithium Iron Phosphate Battery Storage', bin: 'A' },
                { id: 'e2', label: 'Diesel Generator Backup Station', bin: 'B', hint: 'High carbon emissions!' },
                { id: 'e3', label: 'Geothermal Base-Load Heat Plant', bin: 'A' },
                { id: 'e4', label: 'Coal-Fired Peak Peaker Turbine', bin: 'B', hint: 'Heavy greenhouse polluter!' }
              ]}
              binALabel="Zero-Carbon Clean Energy"
              binBLabel="Fossil Fuel / Polluting Source"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C9Ch1S5GridMaster(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title="Smart Water Management & Acoustic Leak Detection"
      lessonSubtitle="Preserving Municipal Water Supplies with IoT"
      simpleDefinition="Smart city water networks combine ultrasonic flow meters and acoustic sensors to detect underground pipe bursts within minutes, saving millions of gallons of treated drinking water."
      smallExample="Acoustic hydrophones in water mains detect a hairline fracture 2 meters underground before a sinkhole forms."
      oneWordPoint={{ question: "What detects underground pipe leaks?", answer: "Acoustic Hydrophone" }}
      keyPoints={[
        { icon: Droplet, title: 'Ultrasonic Flow Sensors', text: 'Measures water velocity in main aqueducts with 0.1% accuracy.' },
        { icon: Activity, title: 'Pressure Transient Analysis', text: 'Identifies water hammer shockwaves to prevent pipe bursts.' },
        { icon: Building2, title: 'Automated Isolation Valves', text: 'Closes smart valves remotely in 15 seconds to isolate leaks.' }
      ]}
      aiDialogue="Conserve vital resources! Calibrate ultrasonic water telemetry, detect pipe ruptures, and optimize municipal water delivery!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Water Pressure Tuner",
          title: "Tune Municipal Water Main Pressure",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Aqueduct Water Main Pressure"
              description="Adjust aqueduct pressure between 4.0 and 5.5 Bar to supply high-rise buildings without stressing aging pipes."
              min={2.0}
              max={9.0}
              step={0.5}
              unit=" Bar"
              targetRange={[4.0, 5.5]}
              optimalLabel="Optimal Municipal Water Pressure Delivered (Zero Burst Risk)"
              suboptimalLabel="Low Water Pressure (<4.0) or Pipe Rupture Risk (>5.5)! Optimal: 4.0 - 5.5 Bar"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Leak Detection Sequence",
          title: "Sequence the Municipal Water Leak Repair Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'w1', label: '1. Acoustic sensor detects pressure drop and ultrasonic hiss', detail: 'Detection' },
                { id: 'w2', label: '2. AI triangulation pins exact pipe coordinates within 0.5m', detail: 'Localization' },
                { id: 'w3', label: '3. Smart isolation valves seal section and dispatch repair crew', detail: 'Isolation' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'w1' && ids[1] === 'w2' && ids[2] === 'w3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Water Infrastructure Scanner",
          title: "Inspect 3 Municipal Water Monitoring Pods",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Smart Municipal Water Infrastructure"
              prompt="Inspect all 3 primary water monitoring stations."
              hotspots={[
                { id: 'wm1', label: 'Ultrasonic In-Line Flowmeter', icon: <Droplet size={14} className="text-teal-600" />, explanation: 'Measures bidirectional flow volume without moving parts.' },
                { id: 'wm2', label: 'Water Quality Spectrometer', icon: <Sun size={14} className="text-teal-600" />, explanation: 'Continuously tests pH, turbidity, and chlorine residual levels.' },
                { id: 'wm3', label: 'Motorized Gate Isolation Valve', icon: <Sliders size={14} className="text-teal-600" />, explanation: 'Seals pipeline remotely in 15 seconds during emergency repairs.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C9Ch1S6IndustrySandbox(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title="Civic Digital Twins & Simulation Modeling"
      lessonSubtitle="Simulating Urban Evacuations & Weather Disasters"
      simpleDefinition="Digital Twins are real-time 3D virtual replicas of entire cities that simulate flood inundation, storm surges, and evacuation traffic before disasters strike."
      smallExample="Simulating a Category 4 hurricane storm surge to verify whether seawalls and floodgates protect coastal hospitals."
      oneWordPoint={{ question: "What is a 3D virtual copy of a city called?", answer: "Digital Twin" }}
      keyPoints={[
        { icon: Building2, title: '3D BIM Geospatial Mesh', text: 'Combines building architecture, roads, and topography elevation.' },
        { icon: Activity, title: 'Hydrodynamic Fluid Sim', text: 'Calculates water depth and flow velocity on every street.' },
        { icon: Compass, title: 'Evacuation Route Optimization', text: 'Directs 100,000 citizens to safe shelters in record time.' }
      ]}
      aiDialogue="Step into the Urban Digital Twin! Run disaster simulations, model flood mitigation, and optimize emergency evacuations!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Digital Twin Matcher",
          title: "Match Simulation Layers to Disaster Scenarios",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'dt1', left: 'Hydrodynamic Elevation Model', right: 'Simulating sea-level rise and coastal storm surges' },
                { id: 'dt2', left: 'Agent-Based Crowd Simulator', right: 'Modeling emergency stadium evacuation bottlenecks' },
                { id: 'dt3', left: 'Microclimate Wind Tunnel Sim', right: 'Predicting heat island effect around skyscrapers' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Disaster Response Code",
          title: "Assemble Digital Twin Emergency Simulation Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Disaster Evacuation Simulation Pipeline"
              instruction="Assemble the simulation execution workflow in order."
              availableBlocks={[
                { id: 'sim1', text: 'LoadTopographicElevationMesh()' },
                { id: 'sim2', text: 'SimulateStormSurgeInundation()' },
                { id: 'sim3', text: 'RouteEvacuationToHighGroundShelters()' }
              ]}
              targetSequence={['sim1', 'sim2', 'sim3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Evacuation Protocol Sorter",
          title: "Classify Safe Evacuation Corridors vs High-Risk Flood Zones",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ev_safe1', label: 'Elevated interstate highway 15m above sea level', bin: 'A' },
                { id: 'ev_risk1', label: 'Low-lying coastal underpass susceptible to rapid flooding', bin: 'B', hint: 'Severe drowning trap!' },
                { id: 'ev_safe2', label: 'Designated high-ground municipal stadium shelter', bin: 'A' },
                { id: 'ev_risk2', label: 'Basement subway station near overflowing canal', bin: 'B', hint: 'Hazard zone!' }
              ]}
              binALabel="Safe Evacuation Corridor"
              binBLabel="High-Risk Flood Zone (Evacuate)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C9Ch1S7CityPitch(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title="Chapter 1 Capstone: The City Council Pitch"
      lessonSubtitle="Presenting the Comprehensive Smart City Masterplan"
      simpleDefinition="You have mastered civic impact trade-offs, autonomous transit ethics, smart power grids, water management, and digital twin simulations. Now defend your Smart City Masterplan before the Mayor and City Council!"
      smallExample="Pitching a 10-year municipal AI masterplan backed by privacy guarantees, green energy storage, and 100% equitable service coverage."
      oneWordPoint={{ question: "What defines a comprehensive urban proposal?", answer: "Civic Masterplan" }}
      keyPoints={[
        { icon: Award, title: 'Integrated Urban AI', text: 'Unifies transit, energy, water, and emergency management into one coherent platform.' },
        { icon: ShieldCheck, title: 'Citizen Trust Charter', text: 'Guarantees zero commercial data selling and 100% transparent algorithmic oversight.' },
        { icon: Trophy, title: 'Council Approval', text: 'Certifies Class 9 Senior Civic AI Architect status.' }
      ]}
      aiDialogue="The City Council is in session! Defend your Smart City Masterplan across 3 final capstone challenges to secure full municipal funding!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Civic Matcher",
          title: "Match Municipal AI Proposals to Citizen Outcomes",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'p1', left: 'Synchronized Transit AI', right: '35% reduction in commuter travel time' },
                { id: 'p2', left: 'Smart Grid Battery Dispatch', right: '100% renewable power during peak heatwaves' },
                { id: 'p3', left: 'Acoustic Water Leak Network', right: '500 million gallons of fresh drinking water conserved' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Council Pitch Script",
          title: "Assemble City Council Presentation Sequence",
          render: (onPass) => (
            <CodeBlockAssembler
              title="City Council Masterplan Presentation"
              instruction="Assemble the 4-step municipal pitch sequence in order."
              availableBlocks={[
                { id: 'cp1', text: 'PresentCivicROIAndPublicBenefits()' },
                { id: 'cp2', text: 'DemonstrateCitizenPrivacyCharter()' },
                { id: 'cp3', text: 'ShowDigitalTwinDisasterResilience()' },
                { id: 'cp4', text: 'RequestCityCouncilBudgetApproval()' }
              ]}
              targetSequence={['cp1', 'cp2', 'cp3', 'cp4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Civic Governance Sorter",
          title: "Verify Municipal Governance Standards",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'gov1', label: '100% open-source algorithmic code published for public audit', bin: 'A' },
                { id: 'gov2', label: 'Selling citizen location data to commercial marketing advertisers', bin: 'B', hint: 'Severe breach of public trust!' },
                { id: 'gov3', label: 'Independent citizen privacy advisory commission with veto power', bin: 'A' },
                { id: 'gov4', label: 'Signing proprietary closed contracts with no public oversight', bin: 'B', hint: 'Unacceptable municipal secrecy!' }
              ]}
              binALabel="Trustworthy Civic Governance (Approved)"
              binBLabel="Exploitative / Unacceptable Practice"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: INFRASTRUCTURE, ETHICS, ECO-AI, GOVERNANCE, FUTURE CITY
// =============================================================================

function Class9Chapter2InfrastructureWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title={props.canonicalSection?.title || `Chapter 2: Critical Infrastructure AI · Section ${sectionIdx + 1}`}
      lessonSubtitle="Industrial SCADA Systems & Predictive Maintenance"
      simpleDefinition="Critical infrastructure AI monitors bridges, railway tracks, airport runways, and power grids to predict metal fatigue and equipment failures weeks before accidents occur."
      smallExample="Vibration sensors on suspension bridge cables detecting microscopic tension shifts before structural fractures develop."
      oneWordPoint={{ question: "What fixes equipment before it breaks?", answer: "Predictive Maintenance" }}
      keyPoints={[
        { icon: Building2, title: 'Structural Health Monitoring', text: 'Strain gauges and accelerometers tracking bridge integrity.' },
        { icon: Activity, title: 'SCADA Industrial Networks', text: 'Supervisory Control and Data Acquisition systems automating grid switches.' },
        { icon: ShieldCheck, title: 'Air-Gapped Security', text: 'Isolating power plants from public internet to prevent cyber sabotage.' }
      ]}
      aiDialogue="Welcome to Critical Infrastructure Engineering! Monitor bridge vibration spectra, secure SCADA grids, and deploy predictive maintenance!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Infrastructure Matcher",
          title: "Match Infrastructure Assets to Sensor Payloads",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'in1', left: 'Suspension Bridge Cables', right: 'Piezoelectric Vibration Accelerometers' },
                { id: 'in2', left: 'High-Speed Rail Tracks', right: 'Optical Geometry Laser Scanners' },
                { id: 'in3', left: 'Airport Runway Asphalt', right: 'Ground-Penetrating Radar Moisture Probes' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Maintenance Alert Tuner",
          title: "Tune Vibration Alert Threshold for Early Fatigue Detection",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Bridge Cable Harmonic Resonance Threshold"
              description="Set vibration frequency warning threshold between 12.0 Hz and 15.0 Hz to schedule maintenance before fatigue cracks occur."
              min={5.0}
              max={25.0}
              step={0.5}
              unit=" Hz"
              targetRange={[12.0, 15.0]}
              optimalLabel="Predictive Structural Maintenance Alert Armed (Early Warning Active)"
              suboptimalLabel="False Alarms (<12.0) or Dangerous Delay (>15.0)! Target: 12.0 - 15.0 Hz"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Maintenance Workflow Sequence",
          title: "Sequence the Predictive Maintenance Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'pm1', label: '1. Ingest continuous telemetry stream from industrial sensors', detail: 'Monitoring' },
                { id: 'pm2', label: '2. Neural anomaly detector flags anomalous bearing friction trend', detail: 'Diagnostics' },
                { id: 'pm3', label: '3. Automated work order dispatched to maintenance engineers', detail: 'Resolution' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'pm1' && ids[1] === 'pm2' && ids[2] === 'pm3') {
                  onPass()
                }
              }}
            />
          )
        }
      ]}
    />
  )
}

function Class9Chapter3CivicEthicsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title={props.canonicalSection?.title || `Chapter 3: Civic AI Ethics & Bias Audits · Section ${sectionIdx + 1}`}
      lessonSubtitle="Algorithmic Justice & Protected Attributes"
      simpleDefinition="Civic algorithms used in public housing, loan eligibility, and social services must be mathematically audited to prevent disparate impact and protect demographic civil rights."
      smallExample="Auditing a municipal affordable housing allocation algorithm to prove equal wait times across all zip codes."
      oneWordPoint={{ question: "What prevents unfair algorithmic outcomes?", answer: "Disparate Impact Audit" }}
      keyPoints={[
        { icon: Scale, title: 'Disparate Impact Ratio', text: 'Calculates selection rates across demographic groups (4/5ths 80% rule).' },
        { icon: ShieldCheck, title: 'Protected Attributes', text: 'Legally prohibits models from using race, gender, or age as deciding factors.' },
        { icon: Users, title: 'Public Redress Rights', text: 'Guarantees citizens can appeal any automated algorithmic decision to a human.' }
      ]}
      aiDialogue="Civic justice requires transparency! Audit municipal allocation algorithms, calculate disparate impact ratios, and defend citizen rights!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Ethical Audit Sorter",
          title: "Classify Fair Algorithmic Practices vs Unfair Bias",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ea1', label: 'Testing loan approval model for equal opportunity across demographic groups', bin: 'A' },
                { id: 'ea2', label: 'Using historical zip code data as a proxy to deny public services', bin: 'B', hint: 'Illegal algorithmic redlining!' },
                { id: 'ea3', label: 'Providing plain-language explanations for all automated denials', bin: 'A' },
                { id: 'ea4', label: 'Deploying unverified predictive policing models that target specific neighborhoods', bin: 'B', hint: 'Severe civil rights violation!' }
              ]}
              binALabel="Fair & Compliant Civic Practice"
              binBLabel="Biased / Unlawful Algorithmic Practice"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Disparate Impact Tuner",
          title: "Calibrate Disparate Impact Ratio to Meet Legal Compliance",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Disparate Impact Ratio (DIR)"
              description="Adjust algorithmic fairness weighting so selection ratio is between 0.85 and 1.00 (exceeding 80% legal threshold)."
              min={0.50}
              max={1.10}
              step={0.05}
              unit=" ratio"
              targetRange={[0.85, 1.00]}
              optimalLabel="Legal Compliance Achieved: Disparate Impact Ratio = 0.95 (Equitable)"
              suboptimalLabel="Unlawful Discrimination (<0.85)! Target: 0.85 - 1.00"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Civic Redress Pipeline",
          title: "Sequence the Citizen Appeal & Human Review Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'cr1', label: '1. Citizen receives automated decision notice with detailed rationale', detail: 'Notice' },
                { id: 'cr2', label: '2. Citizen files one-click appeal for human caseworker review', detail: 'Appeal' },
                { id: 'cr3', label: '3. Licensed human officer evaluates case and issues binding decision', detail: 'Resolution' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'cr1' && ids[1] === 'cr2' && ids[2] === 'cr3') {
                  onPass()
                }
              }}
            />
          )
        }
      ]}
    />
  )
}

function Class9Chapter4EcoAIWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title={props.canonicalSection?.title || `Chapter 4: Ecological AI & Wildlife Conservation · Section ${sectionIdx + 1}`}
      lessonSubtitle="Acoustic Bio-monitoring & Deforestation Satellites"
      simpleDefinition="Ecological AI systems monitor planetary biodiversity by analyzing satellite forest loss imagery, bio-acoustic microphone arrays in rainforests, and ocean animal migratory GPS tags."
      smallExample="Bio-acoustic sensors in the Amazon detecting the sound of chainsaws and alert forest rangers within 3 minutes."
      oneWordPoint={{ question: "What is tracking ecosystem sounds called?", answer: "Bio-acoustics" }}
      keyPoints={[
        { icon: Sun, title: 'Satellite Deforestation Tracking', text: 'Analyzes optical and SAR satellite imagery to spot illegal tree clearing.' },
        { icon: Radio, title: 'Acoustic Bio-Sensors', text: 'Listens for endangered bird calls, whale songs, and chainsaw sounds.' },
        { icon: ShieldCheck, title: 'Anti-Poaching Drones', text: 'Thermal night-vision UAVs patrolling wildlife sanctuaries.' }
      ]}
      aiDialogue="Protect biodiversity! Monitor rainforest bio-acoustics, detect deforestation from space, and safeguard wildlife!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Bio-Acoustic Matcher",
          title: "Match Bio-Acoustic Frequencies to Rainforest Sounds",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ba1', left: 'Low-Frequency Rumble (20-50 Hz)', right: 'Elephant Sub-Audible Communication' },
                { id: 'ba2', left: 'High-Pitched Whistle (2-8 kHz)', right: 'Canopy Songbird Mating Call' },
                { id: 'ba3', left: 'Two-Stroke Engine Screech (400 Hz)', right: 'Illegal Chainsaw Logging Alert' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Ranger Alert Dispatch Script",
          title: "Assemble Anti-Poaching Alert Dispatch Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Forest Ranger Emergency Dispatch"
              instruction="Assemble the rapid anti-poaching response in order."
              availableBlocks={[
                { id: 'rd1', text: 'DetectChainsawAcousticSignature()' },
                { id: 'rd2', text: 'TriangulateGPSCoordinates(lat, lon)' },
                { id: 'rd3', text: 'DispatchSolarDroneToVerifyTarget()' }
              ]}
              targetSequence={['rd1', 'rd2', 'rd3']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Conservation Sorter",
          title: "Classify Natural Rainforest Sounds vs Threat Signatures",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cs1', label: 'Heavy tropical monsoon rainfall on tree canopy', bin: 'A' },
                { id: 'cs2', label: 'Gasoline chainsaw engine revving in protected reserve', bin: 'B', hint: 'Illegal logging alert!' },
                { id: 'cs3', label: 'Howler monkey territorial call chorus', bin: 'A' },
                { id: 'cs4', label: 'Gunshot acoustic blast signature in elephant corridor', bin: 'B', hint: 'Poaching threat alert!' }
              ]}
              binALabel="Natural Ecosystem Acoustic Sound"
              binBLabel="Illegal Threat Signature (Dispatch)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class9Chapter5GovernanceWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title={props.canonicalSection?.title || `Chapter 5: AI Governance & International Treaties · Section ${sectionIdx + 1}`}
      lessonSubtitle="EU AI Act, Global Frameworks & Risk Tiers"
      simpleDefinition="Global AI governance frameworks (like the European Union AI Act and UNESCO Guidelines) categorize AI systems into risk tiers: Unacceptable, High, Limited, and Minimal Risk."
      smallExample="High-risk AI systems in medical surgery and aviation must undergo mandatory third-party safety audits before launch."
      oneWordPoint={{ question: "What law created global AI risk tiers?", answer: "EU AI Act" }}
      keyPoints={[
        { icon: ShieldAlert, title: 'Unacceptable Risk (Banned)', text: 'Social scoring systems and cognitive behavioral manipulation.' },
        { icon: AlertCircle, title: 'High Risk (Strict Audits)', text: 'Biometrics, critical infrastructure, healthcare, and law enforcement.' },
        { icon: ShieldCheck, title: 'Minimal Risk (Permitted)', text: 'Spam filters, AI video games, and creative design tools.' }
      ]}
      aiDialogue="Master international AI governance! Classify AI systems by risk tier and enforce safety compliance!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Risk Tier Sorter",
          title: "Classify AI Applications by EU AI Act Risk Category",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'rk1', label: 'Government Citizen Social Credit Scoring System', bin: 'B', hint: 'Unacceptable Risk (BANNED)!' },
                { id: 'rk2', label: 'Email Spam Filter and Spell Checker', bin: 'A' },
                { id: 'rk3', label: 'Subliminal Voice Manipulation to Coerce Purchases', bin: 'B', hint: 'Unacceptable Risk (BANNED)!' },
                { id: 'rk4', label: 'Video Game Non-Player Character Pathfinding', bin: 'A' }
              ]}
              binALabel="Minimal / Permitted Risk"
              binBLabel="Unacceptable Risk (Strictly Banned)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Compliance Audit Pipeline",
          title: "Sequence High-Risk AI System Certification",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ca1', label: '1. Technical Documentation & Risk Assessment Filing', detail: 'Documentation' },
                { id: 'ca2', label: '2. Independent Third-Party Bias & Safety Conformity Audit', detail: 'Audit' },
                { id: 'ca3', label: '3. Registration in Official Government High-Risk Database', detail: 'Certification' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ca1' && ids[1] === 'ca2' && ids[2] === 'ca3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Governance Framework Matcher",
          title: "Match International Treaties to Core Mandates",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'gt1', left: 'EU AI Act', right: 'Comprehensive risk-based legal framework and fines' },
                { id: 'gt2', left: 'UNESCO AI Ethics Recommendation', right: 'Global human rights, diversity, and peace principles' },
                { id: 'gt3', left: 'NIST AI Risk Management Framework', right: 'Voluntary US engineering standards for trustworthy AI' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class9Chapter6FutureCityWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 9 · Civic Challenge"
      title={props.canonicalSection?.title || `Chapter 6: The 100-Year Smart City Vision · Section ${sectionIdx + 1}`}
      lessonSubtitle="Regenerative Urbanism & Autonomous Harmony"
      simpleDefinition="The next century of smart cities will unite circular economy principles, vertical urban agriculture, autonomous electric transit, and zero-carbon building materials into harmonious human habitats."
      smallExample="A skyscraper built from cross-laminated timber covered in photovoltaic glass that generates 120% of its own electricity."
      oneWordPoint={{ question: "What is an economy with zero waste called?", answer: "Circular Economy" }}
      keyPoints={[
        { icon: Building2, title: 'Circular Urbanism', text: '100% of municipal wastewater and organic waste recycled into energy.' },
        { icon: Sun, title: 'Net-Positive Energy', text: 'Buildings produce more clean solar and wind energy than they consume.' },
        { icon: Users, title: '15-Minute City Design', text: 'All schools, clinics, parks, and groceries accessible within a 15-minute walk.' }
      ]}
      aiDialogue="Welcome to the 100-Year Future City! Design regenerative architecture, close resource loops, and create sustainable urban habitats!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Future Urban Matcher",
          title: "Match 100-Year Urban Innovations to Environmental Goals",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'fu1', left: 'Vertical Aeroponic Towers', right: '95% water savings in urban food production' },
                { id: 'fu2', left: 'Kinetic Energy Sidewalks', right: 'Harvests electricity from pedestrian footsteps' },
                { id: 'fu3', left: 'Bio-Cement Algae Facades', right: 'Absorbs atmospheric CO2 into building walls' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Circular Resource Sequence",
          title: "Sequence Closed-Loop Urban Resource Flow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'cr1', label: '1. Food scraps collected from households and restaurants', detail: 'Collection' },
                { id: 'cr2', label: '2. Anaerobic digester converts waste to biogas and organic compost', detail: 'Bioconversion' },
                { id: 'cr3', label: '3. Compost enriches vertical urban farms producing fresh vegetables', detail: 'Regeneration' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'cr1' && ids[1] === 'cr2' && ids[2] === 'cr3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · 100-Year City Scanner",
          title: "Inspect 3 Regenerative City Modules",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Regenerative Future City Master Hub"
              prompt="Inspect all 3 primary regenerative urban systems."
              hotspots={[
                { id: 'rh1', label: 'Atmospheric Cloud Water Harvester', icon: <Droplet size={14} className="text-teal-600" />, explanation: 'Condenses 50,000 liters of pure morning fog water daily.' },
                { id: 'rh2', label: 'Algae Bioreactor Solar Shading', icon: <Sun size={14} className="text-teal-600" />, explanation: 'Generates green biomass while cooling building interiors naturally.' },
                { id: 'rh3', label: 'Pneumatic Subsurface Waste Shunts', icon: <Building2 size={14} className="text-teal-600" />, explanation: 'Moves sorted recyclables at 70 km/h in underground vacuum tubes.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}
