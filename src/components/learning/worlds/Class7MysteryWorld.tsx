import React, { useState } from 'react'
import {
  Search, ShieldCheck, FileText, CheckCircle2, ChevronRight, Play,
  Sparkles, Award, Lock, Eye, AlertTriangle, Key, Cpu, Radio,
  Layers, Terminal, Sliders, RotateCcw, Zap, Compass, User,
  Check, ArrowRight, UserCheck, Activity, ShieldAlert,
  Shield, Trophy
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
// CLASS 7 MYSTERY WORLD DISPATCHER (CYBER DETECTIVE BUREAU)
// Unique Theme: Forensic Evidence Corkboard · Amber & Deep Violet Dossiers
// =============================================================================

export const Class7MysteryWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class7Chapter2EvidenceWorld {...props} />
    case 3:
      return <Class7Chapter3CyberCrimeWorld {...props} />
    case 4:
      return <Class7Chapter4AIInvestigatorWorld {...props} />
    case 5:
      return <Class7Chapter5ForensicsLabWorld {...props} />
    case 6:
      return <Class7Chapter6TrialVerdictWorld {...props} />
    default:
      return <Class7Chapter1CasefileWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: THE CYBER DETECTIVE & DIGITAL EVIDENCE FORENSICS
// =============================================================================

function Class7Chapter1CasefileWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C7Ch1S2ClueBoard {...props} />
  if (sectionIdx === 2) return <C7Ch1S3Interrogation {...props} />
  if (sectionIdx === 3) return <C7Ch1S4ForensicReport {...props} />
  if (sectionIdx === 4) return <C7Ch1S5EscapeLab {...props} />
  if (sectionIdx === 5) return <C7Ch1S6Biometrics {...props} />
  if (sectionIdx === 6) return <C7Ch1S7TrialVerdict {...props} />
  return <C7Ch1S2ClueBoard {...props} />
}

function C7Ch1S2ClueBoard(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title="Digital Footprints & Forensic Metadata"
      lessonSubtitle="Tracing Evidence Across Digital Networks"
      simpleDefinition="Every digital action leaves an immutable electronic trail called metadata—including file creation timestamps, IP addresses, EXIF camera tags, and cryptographic checksums."
      smallExample="A digital photo contains hidden EXIF data revealing the exact GPS latitude/longitude and smartphone camera model used."
      oneWordPoint={{ question: "What is data about data called?", answer: "Metadata" }}
      keyPoints={[
        { icon: Search, title: 'EXIF Image Metadata', text: 'Stores camera focal length, shutter speed, and GPS location.' },
        { icon: Activity, title: 'Server Access Logs', text: 'Records timestamped IP connections and HTTP request verbs.' },
        { icon: Lock, title: 'Cryptographic Hash Verification', text: 'Generates MD5/SHA-256 fingerprints to prove evidence was never altered.' }
      ]}
      aiDialogue="Welcome Detective! I am Inspector Aura. Let's inspect digital metadata, trace cyber footprints, and solve 3 forensic challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Evidence Matcher",
          title: "Match Digital Evidence Types to Forensic Extraction Tools",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'e1', left: 'JPEG Image File', right: 'EXIF GPS & Timestamp Extractor' },
                { id: 'e2', left: 'Web Server Access Log', right: 'IP Geolocation & Request Analyzer' },
                { id: 'e3', left: 'Deleted Disk Sector', right: 'Hexadecimal File Carver' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Forensic Sorter",
          title: "Classify Visible Content vs Hidden Metadata",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'm1', label: 'Color pixels of a suspect vehicle photo', bin: 'A' },
                { id: 'm2', label: 'GPS Latitude 37.7749° N embedded in image header', bin: 'B' },
                { id: 'm3', label: 'Spoken audio in a recorded phone conversation', bin: 'A' },
                { id: 'm4', label: 'File creation timestamp: 2026-10-04 14:22:01 UTC', bin: 'B' }
              ]}
              binALabel="Visible / Audible File Content"
              binBLabel="Hidden Forensic Metadata"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Clue Corkboard Scanner",
          title: "Discover 3 Primary Clues on the Case Corkboard",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Bureau Crime Scene Corkboard"
              prompt="Inspect all 3 primary evidence pins on the corkboard."
              hotspots={[
                { id: 'cb1', label: 'Substation Access Log', icon: <FileText size={14} className="text-amber-600" />, explanation: 'Unauthorized badge swipe logged at 02:47 AM.' },
                { id: 'cb2', label: 'Security Camera Frame', icon: <Eye size={14} className="text-amber-600" />, explanation: 'Shows hooded figure holding encrypted USB drive.' },
                { id: 'cb3', label: 'Corrupted Network Packet', icon: <Radio size={14} className="text-amber-600" />, explanation: 'Contains fragmented IP trace leading to abandoned warehouse.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C7Ch1S3Interrogation(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title="Suspect Alibis & Neural Anomaly Detection"
      lessonSubtitle="Detecting Inconsistencies with Machine Learning"
      simpleDefinition="Anomaly detection algorithms evaluate thousands of routine transaction patterns. When an event deviates statistically from the baseline norm, the system flags it for immediate forensic investigation."
      smallExample="A bank fraud AI flags an account if a debit card is used in London just 10 minutes after a transaction in New York."
      oneWordPoint={{ question: "What is detecting unusual data patterns called?", answer: "Anomaly Detection" }}
      keyPoints={[
        { icon: Activity, title: 'Baseline Behavioral Profile', text: 'Establishes normal user habits and transaction volumes.' },
        { icon: AlertTriangle, title: 'Statistical Outliers (Z-Score)', text: 'Measures how many standard deviations an event drifts from normal.' },
        { icon: ShieldCheck, title: 'Temporal Impossibility', text: 'Flags impossible geographic speed or concurrent logins.' }
      ]}
      aiDialogue="Time to cross-examine digital logs! Detect timeline anomalies and catch cyber adversaries in contradictory statements!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Anomaly Sorter",
          title: "Classify Normal User Activity vs Critical Cyber Anomalies",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'a1', label: 'Employee logging into email at 9:15 AM from office IP', bin: 'A' },
                { id: 'a2', label: '500 failed password attempts in 3 seconds from foreign IP', bin: 'B', hint: 'Brute-force attack detected!' },
                { id: 'a3', label: 'Downloading routine weekly sales PDF spreadsheet', bin: 'A' },
                { id: 'a4', label: 'Exfiltrating entire 50GB customer database at 3:00 AM', bin: 'B', hint: 'Massive data breach anomaly!' }
              ]}
              binALabel="Normal Baseline Activity"
              binBLabel="Severe Security Anomaly"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Z-Score Anomaly Tuner",
          title: "Tune Statistical Z-Score Threshold",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Anomaly Detection Z-Score Sensitivity"
              description="Set Z-score threshold between 2.5 and 3.5 standard deviations to catch 99.7% of genuine cyber threats."
              min={1.0}
              max={5.0}
              step={0.1}
              unit=" σ"
              targetRange={[2.5, 3.5]}
              optimalLabel="Optimal 3-Sigma Anomaly Detection Calibrated"
              suboptimalLabel="Too Many False Alarms (<2.5) or Missed Threats (>3.5)! Target: 2.5 - 3.5 σ"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Timeline Assembler",
          title: "Reconstruct Incident Crime Timeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 't1', label: '1. Phishing email delivered with malicious PDF payload', detail: '01:15 AM' },
                { id: 't2', label: '2. Malware executes and escalates system admin privileges', detail: '01:22 AM' },
                { id: 't3', label: '3. Encrypted database exfiltration initiated across port 443', detail: '02:05 AM' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 't1' && ids[1] === 't2' && ids[2] === 't3') {
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

function C7Ch1S4ForensicReport(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title="Forensic Casefile & Evidence Verification"
      lessonSubtitle="Chain of Custody & Cryptographic Hashing"
      simpleDefinition="In legal cyber forensics, evidence is only admissible in court if detectives maintain an unbroken 'Chain of Custody' verified by cryptographic SHA-256 digital hashes."
      smallExample="Generating a SHA-256 hash of a seized hard drive before analysis ensures not a single byte was altered during the investigation."
      oneWordPoint={{ question: "What proves digital evidence was not altered?", answer: "Cryptographic Hash" }}
      keyPoints={[
        { icon: Lock, title: 'SHA-256 Hash Digest', text: 'A 64-character hexadecimal fingerprint unique to each file.' },
        { icon: FileText, title: 'Chain of Custody Log', text: 'Documenting every detective who handled the digital drive.' },
        { icon: ShieldCheck, title: 'Write-Blocker Hardware', text: 'Prevents the forensic workstation from writing data onto seized evidence.' }
      ]}
      aiDialogue="Evidence integrity must be 100% airtight! Let's verify digital hashes, write-blockers, and chain of custody logs!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Custody Sequence",
          title: "Sequence the Forensic Evidence Collection Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'c1', label: '1. Photograph crime scene and attach hardware write-blocker', detail: 'Seizure' },
                { id: 'c2', label: '2. Create bit-stream forensic disk clone and compute SHA-256', detail: 'Imaging' },
                { id: 'c3', label: '3. Perform all analysis exclusively on the cloned copy', detail: 'Examination' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'c1' && ids[1] === 'c2' && ids[2] === 'c3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 2 · Hash Integrity Sorter",
          title: "Compare Original vs Tampered Evidence Hashes",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'h1', label: 'Original: e3b0c442... | Clone: e3b0c442...', bin: 'A' },
                { id: 'h2', label: 'Original: 7f83b165... | Clone: 9a21c402...', bin: 'B', hint: 'Hash mismatch! Evidence was altered!' },
                { id: 'h3', label: 'Original: a591a6d4... | Clone: a591a6d4...', bin: 'A' },
                { id: 'h4', label: 'Original: b10a8db1... | Clone: 00000000...', bin: 'B', hint: 'Corrupted disk image!' }
              ]}
              binALabel="Identical Match (Evidence Valid)"
              binBLabel="Hash Mismatch (Evidence Tampered)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Forensic Tool Matcher",
          title: "Match Forensic Equipment to Investigative Functions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ft1', left: 'Hardware Write-Blocker', right: 'Prevents OS from modifying disk evidence' },
                { id: 'ft2', left: 'Faraday Isolation Bag', right: 'Blocks wireless radio signals from remote wiping device' },
                { id: 'ft3', left: 'RAM Memory Dumper', right: 'Captures volatile encryption keys before power loss' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C7Ch1S5EscapeLab(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title="Evidence Escape Room & Logic Decryption"
      lessonSubtitle="Cracking Multi-Stage Cyber Security Locks"
      simpleDefinition="Cyber detectives solve multi-layer security puzzles by combining network port analysis, steganography extraction, and binary cipher decryption."
      smallExample="Extracting a hidden text message concealed inside the unused color bits of a BMP image file."
      oneWordPoint={{ question: "What is hiding secret data inside images called?", answer: "Steganography" }}
      keyPoints={[
        { icon: Eye, title: 'Steganography (LSB)', text: 'Hides secret bits inside the Least Significant Bits of pixel colors.' },
        { icon: Key, title: 'RSA Public-Key Encryption', text: 'Uses prime number factorization for mathematical security.' },
        { icon: Lock, title: 'Multi-Factor Challenge', text: 'Combines what you know (password) and what you have (biometric key).' }
      ]}
      aiDialogue="Welcome to the Escape Lab! Crack open encrypted dossiers, solve steganographic ciphers, and unlock the vault!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Cipher Port Wire",
          title: "Wire Cyber Attack Vectors to Target Defense Ports",
          render: (onPass) => (
            <CircuitWireStation
              title="Firewall Port Mapping"
              instruction="Route incoming network protocol requests to secure destination ports."
              terminals={[
                { id: 't_ssh', label: 'SSH Secure Shell Terminal', icon: <Terminal size={12} /> },
                { id: 't_ssl', label: 'HTTPS Encrypted Web Traffic', icon: <Lock size={12} /> },
                { id: 't_dns', label: 'DNS Name Resolution Query', icon: <Search size={12} /> }
              ]}
              ports={[
                { id: 'p_22', label: 'Port 22 (SSH)', matchesTerminalId: 't_ssh' },
                { id: 'p_443', label: 'Port 443 (HTTPS)', matchesTerminalId: 't_ssl' },
                { id: 'p_53', label: 'Port 53 (DNS)', matchesTerminalId: 't_dns' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Steganography Sorter",
          title: "Classify Clean Images vs Steganographic Carrier Images",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'st1', label: 'Clean uncompressed JPEG with standard pixel entropy', bin: 'A' },
                { id: 'st2', label: 'PNG with abnormal noise in LSB color channel (Hidden Payload)', bin: 'B', hint: 'Steganography detected!' },
                { id: 'st3', label: 'Standard SVG vector icon with clean path coordinates', bin: 'A' },
                { id: 'st4', label: 'WAV audio with hidden high-frequency Morse code', bin: 'B', hint: 'Acoustic steganography!' }
              ]}
              binALabel="Clean Media File"
              binBLabel="Steganographic Carrier File"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Decryption Script",
          title: "Assemble Multi-Stage Decryption Script",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Steganographic Payload Extraction"
              instruction="Assemble the 3-step extraction script in order."
              availableBlocks={[
                { id: 'x1', text: 'LoadCarrierImage("evidence.png")' },
                { id: 'x2', text: 'ExtractLeastSignificantBits()' },
                { id: 'x3', text: 'DecryptWithRSAPrivateKey()' }
              ]}
              targetSequence={['x1', 'x2', 'x3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C7Ch1S6Biometrics(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title="Biometrics & Facial Landmark Forensics"
      lessonSubtitle="Neural Facial Embeddings & Spoof Detection"
      simpleDefinition="Modern biometric systems map 68 facial landmark coordinates (such as distances between eye pupils, nose bridge, and jawline) into a 128-dimensional embedding vector to verify identity with 99.9% accuracy."
      smallExample="Airport biometric e-gates match a traveler's live face against the embedded cryptographic passport chip."
      oneWordPoint={{ question: "How many facial landmarks are commonly tracked?", answer: "68 Landmarks" }}
      keyPoints={[
        { icon: Eye, title: 'Facial Landmark Mesh', text: 'Tracks 68 precise geometric coordinates on the human face.' },
        { icon: ShieldCheck, title: 'Liveness / Anti-Spoofing', text: 'Detects micro-blinks and 3D depth to block photo spoof attacks.' },
        { icon: Lock, title: 'Irreversible Biometric Hashes', text: 'Stores mathematical templates instead of raw photos.' }
      ]}
      aiDialogue="Welcome to the Biometrics Lab! Analyze 68-point facial landmark meshes, calibrate liveness sensors, and detect photo spoofing!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Anti-Spoof Sorter",
          title: "Classify Live Human Faces vs Spoof Attacks",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'b1', label: 'Live subject with natural pupil micro-saccades and 3D depth', bin: 'A' },
                { id: 'b2', label: 'Flat 2D printed photograph held in front of camera', bin: 'B', hint: 'Spoof attack detected!' },
                { id: 'b3', label: 'Live subject blinking and turning head 15° on prompt', bin: 'A' },
                { id: 'b4', label: 'Silicon prosthetic mask with rigid unnatural surface texture', bin: 'B', hint: 'Mask spoof detected!' }
              ]}
              binALabel="Verified Live Human"
              binBLabel="Fraudulent Spoof Attempt"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Biometric Match Distance Tuner",
          title: "Calibrate Euclidean Distance Match Threshold",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Facial Embedding Match Threshold"
              description="Tune Euclidean distance threshold between 0.40 and 0.60 to minimize false matches while allowing legitimate users."
              min={0.10}
              max={1.00}
              step={0.05}
              unit=" dist"
              targetRange={[0.40, 0.60]}
              optimalLabel="Biometric Match Margin Calibrated (0.001% FAR)"
              suboptimalLabel="Too Strict (<0.40) or False Matches (>0.60)! Optimal: 0.40 - 0.60"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Landmark Scanner",
          title: "Inspect 3 Primary Facial Landmark Regions",
          render: (onPass) => (
            <VisualInspectionScanner
              title="68-Point Facial Landmark Scanner"
              prompt="Inspect all 3 primary landmark clusters on the biometric wireframe."
              hotspots={[
                { id: 'lm1', label: 'Inter-Pupillary Distance', icon: <Eye size={14} className="text-amber-600" />, explanation: 'Measures fixed bone distance between left and right pupils.' },
                { id: 'lm2', label: 'Nasal Bridge Vector', icon: <Activity size={14} className="text-amber-600" />, explanation: 'Calculates slope angle from brow line to tip of nose.' },
                { id: 'lm3', label: 'Mandible Jawline Arc', icon: <Shield size={14} className="text-amber-600" />, explanation: 'Traces 17 landmark points contouring the chin and jaw.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C7Ch1S7TrialVerdict(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title="Chapter 1 Capstone: The Courtroom Verdict"
      lessonSubtitle="Presenting Digital Forensics Before the Tribunal"
      simpleDefinition="You have mastered metadata analysis, anomaly detection, chain of custody, logic decryption, and biometric verification. Now present your evidence and secure the final verdict!"
      smallExample="Presenting authenticated SHA-256 logs, timestamped GPS coordinates, and biometric matches to convict the cyber criminal."
      oneWordPoint={{ question: "What is the final decision in court called?", answer: "Verdict" }}
      keyPoints={[
        { icon: Award, title: 'Incontrovertible Evidence', text: 'Backed by cryptographic hashes and verified server logs.' },
        { icon: ShieldCheck, title: 'Zero Reasonable Doubt', text: 'Proves motive, access, and digital execution beyond question.' },
        { icon: Trophy, title: 'Bureau Certification', text: 'Unlocks Class 7 Senior Cyber Forensics Investigator status.' }
      ]}
      aiDialogue="Court is in session! Present your final 3 pieces of evidence to secure the conviction and earn your Senior Investigator badge!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Evidence Matcher",
          title: "Match Legal Claims to Verified Forensic Proof",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'v1', left: 'Proof of Physical Presence', right: 'EXIF GPS Metadata & Biometric Gate Log' },
                { id: 'v2', left: 'Proof of System Compromise', right: 'SHA-256 Server Audit Log & Malicious Script' },
                { id: 'v3', left: 'Proof of Data Exfiltration', right: 'Port 443 Packet Capture & Foreign IP Trace' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Final Case Presentation",
          title: "Assemble the Prosecutorial Argument Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Forensic Presentation Pipeline"
              instruction="Assemble the 4-step legal presentation sequence."
              availableBlocks={[
                { id: 'cp1', text: 'PresentSeizedDiskHashDigest()' },
                { id: 'cp2', text: 'ShowBiometricLandmarkMatch()' },
                { id: 'cp3', text: 'CorrelateServerAccessTimeline()' },
                { id: 'cp4', text: 'RequestFinalGuiltyVerdict()' }
              ]}
              targetSequence={['cp1', 'cp2', 'cp3', 'cp4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Final Case Status Sorter",
          title: "Verify Final Case File Completeness",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cs1', label: 'All 5 Evidence Exhibits Cryptographically Certified', bin: 'A' },
                { id: 'cs2', label: 'Unverified Anonymous Online Rumor', bin: 'B', hint: 'Inadmissible hearsay!' },
                { id: 'cs3', label: 'Witness Biometric Signature Authenticated', bin: 'A' },
                { id: 'cs4', label: 'Tampered Server Log with Broken Hash', bin: 'B', hint: 'Inadmissible corrupted file!' }
              ]}
              binALabel="Admissible Forensic Exhibit (Present)"
              binBLabel="Inadmissible / Unverified (Reject)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: EVIDENCE, CYBERCRIME, AI INVESTIGATOR, LAB, VERDICT
// =============================================================================

function Class7Chapter2EvidenceWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title={props.canonicalSection?.title || `Chapter 2: Evidence Mining · Section ${sectionIdx + 1}`}
      lessonSubtitle="Data Scraping & Open Source Intelligence (OSINT)"
      simpleDefinition="Open Source Intelligence (OSINT) gathers publicly available data—such as satellite images, domain registrations, and public code repositories—to map cyber infrastructure."
      smallExample="Cross-referencing domain WHOIS records and SSL certificates to discover who owns a suspicious phishing website."
      oneWordPoint={{ question: "What is intelligence from public data called?", answer: "OSINT" }}
      keyPoints={[
        { icon: Search, title: 'Domain WHOIS Records', text: 'Shows registrar details, creation dates, and DNS nameservers.' },
        { icon: Activity, title: 'BGP Routing Telemetry', text: 'Maps internet data paths across global telecommunication backbones.' },
        { icon: ShieldCheck, title: 'Threat Intelligence Feeds', text: 'Shares real-time lists of malicious IP addresses worldwide.' }
      ]}
      aiDialogue="Welcome to OSINT & Evidence Mining! Let's trace server infrastructure, cross-reference domain records, and unmask adversaries!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · OSINT Tool Matcher",
          title: "Match Intelligence Requirements to OSINT Tools",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'o1', left: 'Domain WHOIS Database', right: 'Discovering registrar and nameserver IP' },
                { id: 'o2', left: 'SSL Certificate Transparency Log', right: 'Finding subdomains tied to an organization' },
                { id: 'o3', left: 'BGP Route Looking Glass', right: 'Tracing autonomous system network hops' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Threat Feed Sorter",
          title: "Classify Verified Malicious Indicators vs Safe Domains",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'tf1', label: 'Domain registered 2 hours ago mimicking a major bank', bin: 'B', hint: 'Phishing domain!' },
                { id: 'tf2', label: 'Official government education portal (.gov / .edu)', bin: 'A' },
                { id: 'tf3', label: 'IP address blasting 50,000 spam emails per minute', bin: 'B', hint: 'Botnet node!' },
                { id: 'tf4', label: 'Major public CDN content distribution node', bin: 'A' }
              ]}
              binALabel="Legitimate Safe Infrastructure"
              binBLabel="Malicious Threat Indicator"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · OSINT Investigation Pipeline",
          title: "Sequence the OSINT Threat Investigation",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'os1', label: '1. Ingest suspicious phishing URL report', detail: 'Intake' },
                { id: 'os2', label: '2. Query WHOIS and DNS records for hosting IP', detail: 'Reconnaissance' },
                { id: 'os3', label: '3. Submit malicious IP to global threat blacklist', detail: 'Takedown' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'os1' && ids[1] === 'os2' && ids[2] === 'os3') {
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

function Class7Chapter3CyberCrimeWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title={props.canonicalSection?.title || `Chapter 3: Cybercrime Anatomy · Section ${sectionIdx + 1}`}
      lessonSubtitle="Ransomware, Botnets & Social Engineering"
      simpleDefinition="Cybercrime investigations dissect attack vectors including phishing, Trojan horses, ransomware crypto-lockers, and distributed denial of service (DDoS) botnets."
      smallExample="Ransomware encrypts corporate files and demands cryptocurrency keys to decrypt them."
      oneWordPoint={{ question: "What malware locks user files for money?", answer: "Ransomware" }}
      keyPoints={[
        { icon: Lock, title: 'Ransomware Payloads', text: 'Encrypts hard drives using asymmetric AES-256 algorithms.' },
        { icon: Radio, title: 'Botnet Command & Control (C2)', text: 'Zombies computers into an automated attack swarm.' },
        { icon: UserCheck, title: 'Social Engineering', text: 'Tricks humans into revealing credentials through deceptive urgency.' }
      ]}
      aiDialogue="Analyze cyber threats! Dissect malware signatures, map botnet command servers, and defuse ransomware attacks!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Malware Family Sorter",
          title: "Classify Malware Types by Behavior",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'mw1', label: 'Encrypts all .docx files and displays bitcoin demand note', bin: 'A' },
                { id: 'mw2', label: 'Silently floods web servers with 100 Gbps traffic', bin: 'B' },
                { id: 'mw3', label: 'Locks master boot record until ransom paid', bin: 'A' },
                { id: 'mw4', label: 'Swarm of IoT cameras directed by remote C2 server', bin: 'B' }
              ]}
              binALabel="Ransomware Vector"
              binBLabel="DDoS Botnet Vector"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Ransomware Decryption Key",
          title: "Calibrate Decryption Key Entropy",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="AES Master Key Bit Length"
              description="Configure cryptographic defense key length to 256 bits for unbreakable security."
              min={64}
              max={512}
              step={64}
              unit=" bits"
              targetRange={[256, 256]}
              optimalLabel="AES-256 Quantum-Resistant Encryption Locked"
              suboptimalLabel="Vulnerable (<256) or Non-standard! Target: Exactly 256 bits"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Incident Response Script",
          title: "Assemble Ransomware Containment Protocol",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Ransomware Incident Response"
              instruction="Assemble the 3-step emergency isolation procedure."
              availableBlocks={[
                { id: 'ir1', text: 'DisconnectInfectedHostFromLAN()' },
                { id: 'ir2', text: 'PreserveRAMMemoryDump()' },
                { id: 'ir3', text: 'RestoreSystemsFromOfflineBackup()' }
              ]}
              targetSequence={['ir1', 'ir2', 'ir3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class7Chapter4AIInvestigatorWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title={props.canonicalSection?.title || `Chapter 4: AI Forensic Assistants · Section ${sectionIdx + 1}`}
      lessonSubtitle="Automating Evidence Analysis with Graph Networks"
      simpleDefinition="AI forensic assistants use Knowledge Graphs to connect suspects, phone records, bank transfers, and location pings into an interactive visual web of relationships."
      smallExample="A graph neural network discovers a hidden connection between three shell companies through a shared registered agent."
      oneWordPoint={{ question: "What AI structure maps relationships?", answer: "Knowledge Graph" }}
      keyPoints={[
        { icon: Layers, title: 'Knowledge Graph Nodes', text: 'Represents entities like people, accounts, and IP addresses.' },
        { icon: Activity, title: 'Graph Edges & Links', text: 'Represents relationships like "Sent Money To" or "Called".' },
        { icon: Search, title: 'Community Detection', text: 'Automatically groups clusters of conspirators.' }
      ]}
      aiDialogue="Welcome to AI Forensic Graph Intelligence! Let's connect entities, map financial transactions, and uncover criminal syndicates!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Graph Entity Sorter",
          title: "Sort Knowledge Graph Components",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'g_node1', label: 'Suspect Entity: "Johnathan Doe"', bin: 'A' },
                { id: 'g_edge1', label: 'Relationship: "Transferred $50,000 on 10/02"', bin: 'B' },
                { id: 'g_node2', label: 'Bank Account Entity: "#99482104"', bin: 'A' },
                { id: 'g_edge2', label: 'Relationship: "Shared Same Device Fingerprint"', bin: 'B' }
              ]}
              binALabel="Knowledge Graph Entity (Node)"
              binBLabel="Entity Relationship (Edge)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Graph Connection Wire",
          title: "Wire Financial Transaction Trails",
          render: (onPass) => (
            <CircuitWireStation
              title="Money Laundering Audit Trail"
              instruction="Connect source origin accounts to recipient destination accounts."
              terminals={[
                { id: 't_origin', label: 'Stolen Funds Origin Account', icon: <FileText size={12} /> },
                { id: 't_shell', label: 'Intermediary Shell Company Account', icon: <Layers size={12} /> },
                { id: 't_crypto', label: 'Offshore Crypto Exchange Wallet', icon: <Lock size={12} /> }
              ]}
              ports={[
                { id: 'p_shell', label: 'Layer 1: Shell Entity #404', matchesTerminalId: 't_origin' },
                { id: 'p_crypto', label: 'Layer 2: Unhosted Bitcoin Wallet', matchesTerminalId: 't_shell' },
                { id: 'p_cash', label: 'Layer 3: Foreign ATM Withdrawal', matchesTerminalId: 't_crypto' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Graph Anomaly Scanner",
          title: "Discover 3 High-Centrality Hub Nodes in Network",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Forensic Knowledge Graph Investigation"
              prompt="Inspect all 3 high-centrality suspect hub nodes."
              hotspots={[
                { id: 'gn1', label: 'Central Money Mule Account', icon: <Activity size={14} className="text-amber-600" />, explanation: 'Connected to 42 different fraudulent source accounts.' },
                { id: 'gn2', label: 'Proxy Relay Server IP', icon: <Radio size={14} className="text-amber-600" />, explanation: 'Funneled 100% of encrypted C2 communication traffic.' },
                { id: 'gn3', label: 'Master Cryptographic Keyring', icon: <Key size={14} className="text-amber-600" />, explanation: 'Signed all malicious software updates.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class7Chapter5ForensicsLabWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title={props.canonicalSection?.title || `Chapter 5: Digital Forensics Lab · Section ${sectionIdx + 1}`}
      lessonSubtitle="Memory Forensics & Reverse Engineering"
      simpleDefinition="Memory forensics captures volatile RAM data from running computers to recover live encryption keys, active network sockets, and stealthy in-memory malware."
      smallExample="Analyzing RAM memory dumps using tools like Volatility to extract encryption passwords before the computer shuts down."
      oneWordPoint={{ question: "What holds temporary data lost on reboot?", answer: "RAM (Volatile Memory)" }}
      keyPoints={[
        { icon: Cpu, title: 'Volatile RAM Dumps', text: 'Captures live running processes and kernel memory structures.' },
        { icon: Terminal, title: 'Disassemblers & Decompilers', text: 'Converts compiled machine code back into readable assembly language.' },
        { icon: ShieldCheck, title: 'Dynamic Sandboxing', text: 'Executes suspicious files in isolated virtual machines to observe behavior safely.' }
      ]}
      aiDialogue="Step into the Forensics Lab! Dump volatile memory, decompile binaries in a sandbox, and dissect malware routines!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Memory Artifact Matcher",
          title: "Match Memory Artifacts to Investigative Discoveries",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ma1', left: 'Active Network Socket Table', right: 'Reveals live connection to attacker IP' },
                { id: 'ma2', left: 'Process List (pslist)', right: 'Unmasks hidden unlinked executable processes' },
                { id: 'ma3', left: 'Clipboard RAM Buffer', right: 'Recovers copied cleartext admin passwords' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Sandboxing Pipeline",
          title: "Sequence Dynamic Malware Analysis Steps",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'sb1', label: '1. Spin up air-gapped isolated virtual machine snapshot', detail: 'Environment Prep' },
                { id: 'sb2', label: '2. Execute suspicious binary and log API calls & network packets', detail: 'Dynamic Run' },
                { id: 'sb3', label: '3. Revert virtual machine to clean state to eliminate infection', detail: 'Teardown' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'sb1' && ids[1] === 'sb2' && ids[2] === 'sb3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Volatile vs Persistent Sorter",
          title: "Classify Volatile Memory vs Persistent Storage",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'v_ram', label: 'Live RAM encryption key buffer (Lost on power cut)', bin: 'A' },
                { id: 'v_ssd', label: 'Solid-State Drive NTFS file system sectors', bin: 'B' },
                { id: 'v_sock', label: 'Active TCP handshake socket state in kernel', bin: 'A' },
                { id: 'v_log', label: 'Permanent audit log file saved to hard disk', bin: 'B' }
              ]}
              binALabel="Volatile Memory (RAM)"
              binBLabel="Persistent Storage (Disk)"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class7Chapter6TrialVerdictWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 7 · Detective Bureau"
      title={props.canonicalSection?.title || `Chapter 6: Cyber Law & Courtroom Ethics · Section ${sectionIdx + 1}`}
      lessonSubtitle="Cyber Jurisprudence & Ethical Expert Testimony"
      simpleDefinition="Cyber forensic experts must follow legal standards like the Fourth Amendment, data privacy laws (GDPR), and strict rules of evidence to ensure forensic findings are lawful and just."
      smallExample="An expert witness explaining complex binary hashes to a jury using clear, accessible analogies without exaggeration."
      oneWordPoint={{ question: "What is legal fairness in evidence collection?", answer: "Due Process" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'Search Warrant Scoping', text: 'Only searches devices explicitly permitted by judicial warrant.' },
        { icon: FileText, title: 'Expert Witness Testimony', text: 'Presents scientific facts objectively without bias.' },
        { icon: Lock, title: 'Privacy Safeguards', text: 'Redacts innocent bystander communications from public court exhibits.' }
      ]}
      aiDialogue="The final trial begins! Master cyber jurisprudence, present expert testimony, and uphold justice in digital law!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Legal Standard Sorter",
          title: "Sort Lawful Evidence Collection vs Unlawful Search",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'leg1', label: 'Searching server hard drive under signed judicial search warrant', bin: 'A' },
                { id: 'leg2', label: 'Hacking suspect laptop without warrant or probable cause', bin: 'B', hint: 'Unlawful search! Inadmissible in court!' },
                { id: 'leg3', label: 'Documenting complete Chain of Custody for every seized drive', bin: 'A' },
                { id: 'leg4', label: 'Altering timestamp in evidence log to match desired alibi', bin: 'B', hint: 'Evidence tampering! Criminal felony!' }
              ]}
              binALabel="Lawful Forensic Practice (Admissible)"
              binBLabel="Unlawful / Tampered (Inadmissible)"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Expert Testimony Sequence",
          title: "Sequence Expert Witness Court Testimony",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'et1', label: '1. State professional forensic qualifications and credentials', detail: 'Introduction' },
                { id: 'et2', label: '2. Explain scientific hash verification and imaging methodology', detail: 'Methodology' },
                { id: 'et3', label: '3. Present factual conclusions clearly to the jury', detail: 'Conclusion' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'et1' && ids[1] === 'et2' && ids[2] === 'et3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Jurisprudence Matcher",
          title: "Match Legal Concepts to Cyber Law Definitions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'jl1', left: 'Search Warrant', right: 'Judicial order authorizing specific device inspection' },
                { id: 'jl2', left: 'Exclusionary Rule', right: 'Illegally obtained evidence cannot be used at trial' },
                { id: 'jl3', left: 'Expert Witness', right: 'Specialist authorized to provide scientific opinion' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}
