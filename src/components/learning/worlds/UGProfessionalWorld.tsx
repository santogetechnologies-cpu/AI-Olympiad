import React, { useState } from 'react'
import {
  CheckCircle2, ChevronRight, Network, AlertTriangle, Activity,
  Server, Cpu, Database, Terminal, Shield, Lock, Layers,
  Workflow, Zap, Sliders, ArrowRight, Play, Sparkles, Award,
  Clock, FileText, Check, RotateCcw, AlertCircle, Users,
  ShieldCheck, Trophy
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
// UG PROFESSIONAL WORLD DISPATCHER (ENTERPRISE ENGINEERING WORKBENCH)
// Unique Theme: Production Microservices · Chaos Engineering · Slate & Indigo
// =============================================================================

export const UGProfessionalWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <UGChapter2DistributedWorld {...props} />
    case 3:
      return <UGChapter3ChaosEngineeringWorld {...props} />
    case 4:
      return <UGChapter4DatabaseShardingWorld {...props} />
    case 5:
      return <UGChapter5HighThroughputRPCWorld {...props} />
    case 6:
      return <UGChapter6CloudGovernanceWorld {...props} />
    default:
      return <UGChapter1ArchitectureWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: DISTRIBUTED SYSTEMS & ENTERPRISE ARCHITECTURE
// =============================================================================

function UGChapter1ArchitectureWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <UGCh1S2Blueprint {...props} />
  if (sectionIdx === 2) return <UGCh1S3Incident {...props} />
  if (sectionIdx === 3) return <UGCh1S4RFC {...props} />
  if (sectionIdx === 4) return <UGCh1S5StressTest {...props} />
  if (sectionIdx === 5) return <UGCh1S6ApiTest {...props} />
  if (sectionIdx === 6) return <UGCh1S7Capstone {...props} />
  return <UGCh1S2Blueprint {...props} />
}

function UGCh1S2Blueprint(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title="CAP Theorem & Distributed Consensus (Raft)"
      lessonSubtitle="Consistency, Availability, and Partition Tolerance"
      simpleDefinition="Eric Brewer's CAP Theorem proves that a distributed data store can simultaneously guarantee at most two out of three properties: Consistency (all nodes see same data), Availability (every request receives non-error response), and Partition Tolerance (system functions despite network drops)."
      smallExample="Distributed databases choose CP (like CockroachDB prioritizing consistency) or AP (like DynamoDB prioritizing 100% write availability)."
      oneWordPoint={{ question: "What consensus protocol uses Leader Elections?", answer: "Raft Consensus" }}
      keyPoints={[
        { icon: Network, title: 'CAP Theorem Trilemma', text: 'In real-world networks with partitions (P), you must choose either CP or AP.' },
        { icon: Server, title: 'Raft Leader Election', text: 'Heartbeat timeouts elect a single leader among a majority quorum of nodes.' },
        { icon: Database, title: 'Log Replication Quorum', text: 'Appends log entries to at least (N/2 + 1) nodes before committing.' }
      ]}
      aiDialogue="Welcome Principal Engineer! I am Technical Director Aura. Let's analyze CAP theorem trade-offs, configure Raft quorums, and solve 3 enterprise challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · CAP Trade-off Matcher",
          title: "Match Distributed Databases to CAP Profiles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cap1', left: 'CP System (Consistency + Partition)', right: 'CockroachDB / Etcd (Rejects writes if quorum lost)' },
                { id: 'cap2', left: 'AP System (Availability + Partition)', right: 'Amazon DynamoDB / Cassandra (Eventual consistency)' },
                { id: 'cap3', left: 'CA System (No Partition Tolerance)', right: 'Single-node PostgreSQL (Fails if network split)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Raft Heartbeat Tuner",
          title: "Tune Raft Leader Election Timeout Window",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Raft Election Timeout (Randomized Window)"
              description="Configure randomized election timeout between 150ms and 300ms to prevent split-vote deadlocks across nodes."
              min={50}
              max={600}
              step={25}
              unit=" ms"
              targetRange={[150, 300]}
              optimalLabel="Optimal Raft Election Timeout Configured (Zero Split-Vote Deadlocks)"
              suboptimalLabel="Split-Vote Risk (<150ms) or Sluggish Recovery (>300ms)! Target: 150 - 300 ms"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Raft Protocol Sequence",
          title: "Sequence the Raft Distributed Consensus Log Replication",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'r1', label: '1. Client sends write request to Raft Leader Node', detail: 'Ingestion' },
                { id: 'r2', label: '2. Leader broadcasts AppendEntries RPC to all Follower nodes', detail: 'Replication' },
                { id: 'r3', label: '3. Majority quorum (3 of 5) confirms write; Leader commits to state machine', detail: 'Commit' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'r1' && ids[1] === 'r2' && ids[2] === 'r3') {
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

function UGCh1S3Incident(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title="Production Incident Response & Post-Mortems"
      lessonSubtitle="SEV-1 Triage, War Rooms & Root Cause Analysis (RCA)"
      simpleDefinition="When production systems experience a major outage (SEV-1), Site Reliability Engineers (SREs) establish an Incident Command war room, mitigate immediate customer impact via rollbacks, and conduct a blameless post-mortem."
      smallExample="A bad database migration causes 500 errors; the incident commander rolls back the deployment within 4 minutes and schedules a blameless RCA meeting."
      oneWordPoint={{ question: "What is the highest severity production outage?", answer: "SEV-1 (Critical Outage)" }}
      keyPoints={[
        { icon: AlertTriangle, title: 'Blameless Post-Mortem', text: 'Focuses on systemic engineering vulnerabilities rather than individual human error.' },
        { icon: Terminal, title: 'Mean Time to Detect (MTTD)', text: 'Target < 1 minute using Prometheus automated alerting.' },
        { icon: Activity, title: 'Mean Time to Resolve (MTTR)', text: 'Target < 15 minutes using automated rollback pipelines.' }
      ]}
      aiDialogue="SEV-1 Outage Alert triggered! Take command of the incident war room, isolate failing database nodes, and conduct a blameless post-mortem!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Severity Sorter",
          title: "Classify Production Incidents by Severity Tier",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sev1_a', label: 'Payment Gateway Down: 100% of checkout transactions failing globally', bin: 'A' },
                { id: 'sev3_a', label: 'Minor CSS button misalignment on user settings page in Safari', bin: 'B' },
                { id: 'sev1_b', label: 'Primary PostgreSQL database corrupted; all read/write endpoints timing out', bin: 'A' },
                { id: 'sev3_b', label: 'Daily batch analytics CSV export delayed by 15 minutes', bin: 'B' }
              ]}
              binALabel="SEV-1 Critical Outage (All Hands)"
              binBLabel="SEV-3 / SEV-4 Minor Bug"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Incident Response Sequence",
          title: "Sequence the SRE Production Incident Response Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ir1', label: '1. Triage: Declare SEV-1, spin up War Room, and assign Incident Commander', detail: 'Triage' },
                { id: 'ir2', label: '2. Mitigate: Roll back latest canary deployment to restore customer service', detail: 'Mitigation' },
                { id: 'ir3', label: '3. Resolve & Post-Mortem: Publish status update and author blameless RCA', detail: 'Post-Mortem' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ir1' && ids[1] === 'ir2' && ids[2] === 'ir3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · RCA Root Cause Fix",
          title: "Diagnose & Patch Cascading Database Connection Pool Exhaustion",
          render: (onPass) => (
            <BugRepairStation
              title="Database Pool Deadlock"
              scenario="All 20 backend pods crashed because an unindexed query locked the database pool for 30 seconds."
              faultyComponent="Connection Pool: max_connections = 20 (Starved by slow unindexed SELECT)"
              repairOptions={[
                { id: 'r1', label: 'Reboot the entire Kubernetes cluster', isCorrect: false, explanation: 'Fails to solve the root query issue.' },
                { id: 'r2', label: 'Add B-Tree composite index ON orders(user_id, status) and scale pool to 100', isCorrect: true, explanation: 'Query time dropped from 30,000ms to 2ms! Connection pool starvation resolved.' },
                { id: 'r3', label: 'Delete user orders table', isCorrect: false, explanation: 'Catastrophic data loss!' }
              ]}
              onRepaired={onPass}
            />
          )
        }
      ]}
    />
  )
}

function UGCh1S4RFC(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title="Technical RFCs (Request for Comments) & Design Docs"
      lessonSubtitle="Architecture Decision Records (ADR) & Trade-off Analysis"
      simpleDefinition="Senior and Staff Software Engineers author Request for Comments (RFC) documents proposing major architectural changes, detailing alternative approaches considered, migration plans, and trade-off matrices."
      smallExample="Authoring RFC #104 proposing migrating user session storage from PostgreSQL to Redis clusters to reduce database CPU load by 45%."
      oneWordPoint={{ question: "What document proposes major architecture changes?", answer: "RFC (Request for Comments)" }}
      keyPoints={[
        { icon: FileText, title: 'Problem Statement & Motivation', text: 'Clearly articulates why current systems fail at 10x scale.' },
        { icon: Layers, title: 'Alternatives Considered', text: 'Rigorous trade-off analysis comparing Build vs Buy solutions.' },
        { icon: ShieldCheck, title: 'Zero-Downtime Migration Plan', text: 'Dual-writing data to old and new stores before cutting over.' }
      ]}
      aiDialogue="Author production RFCs! Compare architectural trade-offs, draft zero-downtime migration plans, and achieve Staff Engineer consensus!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Migration Strategy Matcher",
          title: "Match Data Migration Strategies to Risk Profiles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'm1', left: 'Dual-Write Shadow Migration', right: 'Writes to both old and new databases simultaneously to verify parity' },
                { id: 'm2', left: 'Strangler Fig Pattern', right: 'Gradually replaces legacy monolithic routes with microservices' },
                { id: 'm3', left: 'Feature Flag Dark Launch', right: 'Deploys new backend code silently with 0% user traffic enabled' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Migration Pipeline Sequence",
          title: "Sequence the Zero-Downtime Database Migration Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'mg1', label: '1. Enable Dual-Write: Backend writes to both Old DB and New DB', detail: 'Dual Write' },
                { id: 'mg2', label: '2. Backfill: Run background job copying historic records to New DB', detail: 'Backfill' },
                { id: 'mg3', label: '3. Cutover: Switch read traffic to New DB and deprecate Old DB', detail: 'Cutover' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'mg1' && ids[1] === 'mg2' && ids[2] === 'mg3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · RFC Section Sorter",
          title: "Classify RFC Technical Design Document Sections",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sec_mot', label: '"Current MySQL database CPU is pegged at 94% during peak hours"', bin: 'A' },
                { id: 'sec_alt', label: '"We evaluated MongoDB and Cassandra, but chose ScyllaDB for C++ speed"', bin: 'B' },
                { id: 'sec_mot2', label: '"P99 search latency has degraded from 40ms to 450ms across Q3"', bin: 'A' },
                { id: 'sec_alt2', label: '"Considered building an in-house raft cluster vs using managed Kafka"', bin: 'B' }
              ]}
              binALabel="Problem Statement & Motivation"
              binBLabel="Alternatives Considered & Trade-offs"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function UGCh1S5StressTest(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title="Chaos Engineering & Distributed Load Stress-Testing"
      lessonSubtitle="Chaos Monkey, Locust & Latency Injection"
      simpleDefinition="Chaos Engineering deliberately injects random network packet loss, kills primary database servers, and simulates datacenter outages in staging environments to verify automated self-healing resilience."
      smallExample="Running Netflix Chaos Monkey to terminate 20% of cloud servers randomly while verifying that zero customer movie streams drop."
      oneWordPoint={{ question: "What testing tool terminates random servers?", answer: "Chaos Monkey" }}
      keyPoints={[
        { icon: AlertTriangle, title: 'Chaos Injection Experiments', text: 'Simulates network latency spikes, disk saturation, and killed pods.' },
        { icon: Activity, title: 'Hypothesis Verification', text: 'Proves the system maintains steady-state availability during failure.' },
        { icon: ShieldCheck, title: 'Blast Radius Containment', text: 'Confines chaos experiments to staging or small canary percentages.' }
      ]}
      aiDialogue="Unleash Chaos Engineering! Inject 200ms latency spikes, terminate primary pods, and verify automated self-healing resilience!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · Chaos Fault Matcher",
          title: "Match Chaos Experiments to Target Resilience Mechanisms",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ce1', left: 'Inject 500ms Network Delay', right: 'Tests client timeout handling and circuit breakers' },
                { id: 'ce2', left: 'Kill Master Database Pod (SIGKILL)', right: 'Tests automated replica promotion and failover' },
                { id: 'ce3', left: 'Corrupt 10% of HTTP Packets', right: 'Tests TCP checksum retries and idempotency keys' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Chaos Latency Injection Tuner",
          title: "Calibrate Chaos Latency Injection Fault (ms)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Chaos Mesh Injected Network Latency"
              description="Configure injected delay between 200ms and 350ms to test downstream microservice circuit breaker trips."
              min={50}
              max={1000}
              step={50}
              unit=" ms"
              targetRange={[200, 350]}
              optimalLabel="Chaos Latency Fault Active: Circuit Breaker Successfully Tripped (0 Drops)"
              suboptimalLabel="Sub-Threshold (<200ms) or Total Timeout (>350ms)! Target: 200 - 350 ms"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Chaos Experiment Pipeline",
          title: "Sequence the Formal Chaos Engineering Scientific Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ch1', label: '1. Define Steady-State Metric: Measure baseline 99.99% successful requests', detail: 'Baseline' },
                { id: 'ch2', label: '2. Inject Fault: Terminate 2 of 5 worker pods under 10,000 RPS load', detail: 'Fault Injection' },
                { id: 'ch3', label: '3. Verify Resilience: Confirm HPA spawns replacement pods with zero 5xx errors', detail: 'Verification' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ch1' && ids[1] === 'ch2' && ids[2] === 'ch3') {
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

function UGCh1S6ApiTest(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title="Idempotency, Distributed Locks & Redis Redlock"
      lessonSubtitle="Preventing Duplicate Charges with Idempotency Keys"
      simpleDefinition="In distributed transaction processing, Idempotency Keys guarantee that an API request executed multiple times (due to network retries) produces the exact same result without duplicate credit card charges."
      smallExample="A client submits payment with Idempotency-Key: 'pay_9981a'. If network drops and client retries, the server recognizes the key and returns cached receipt without charging twice."
      oneWordPoint={{ question: "What prevents duplicate API operations on retry?", answer: "Idempotency Key" }}
      keyPoints={[
        { icon: Lock, title: 'Idempotency Key Header', text: 'Stores cryptographic UUID in Redis for 24 hours to deduplicate requests.' },
        { icon: Zap, title: 'Redis Redlock Algorithm', text: 'Acquires distributed locks across 5 independent Redis nodes with lease TTL.' },
        { icon: Database, title: 'Two-Phase Commit (2PC) / Sagas', text: 'Coordinates distributed ACID transactions across multiple microservice databases.' }
      ]}
      aiDialogue="Master distributed transaction safety! Implement Redlock algorithms, enforce idempotency keys, and orchestrate Saga transactions!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · Transaction Pattern Matcher",
          title: "Match Distributed Transaction Patterns to Architectures",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'tp1', left: 'Idempotency Key Pattern', right: 'Deduplicates retried HTTP POST requests via Redis cache' },
                { id: 'tp2', left: 'Saga Choreography Pattern', right: 'Executes compensating transactions if a step in checkout fails' },
                { id: 'tp3', left: 'Distributed Lock (Redlock)', right: 'Prevents race conditions on shared inventory stock across servers' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Redlock TTL Lease Tuner",
          title: "Tune Distributed Lock Time-To-Live (TTL Lease in ms)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Redis Redlock Lock Lease TTL"
              description="Configure lock lease TTL between 3,000ms and 5,000ms to allow payment completion while automatically unlocking if server crashes."
              min={500}
              max={15000}
              step={500}
              unit=" ms"
              targetRange={[3000, 5000]}
              optimalLabel="Optimal Distributed Lock Lease Configured (Zero Deadlocks / Race Conditions)"
              suboptimalLabel="Lock Premature Expiration (<3s) or Frozen Deadlock (>5s)! Target: 3000 - 5000 ms"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Idempotency Request Sequence",
          title: "Sequence the Idempotent Request Execution Loop",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'id1', label: '1. Check Redis: IF GET(Idempotency-Key) exists, return cached response', detail: 'Cache Check' },
                { id: 'id2', label: '2. Acquire Lock: SETNX(Idempotency-Key, "IN_PROGRESS", EX=30)', detail: 'Lock Acquire' },
                { id: 'id3', label: '3. Execute Payment & Cache: SET(Idempotency-Key, responseJSON, EX=86400)', detail: 'Execution' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'id1' && ids[1] === 'id2' && ids[2] === 'id3') {
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

function UGCh1S7Capstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title="Chapter 1 Capstone: Enterprise System Architecture Review"
      lessonSubtitle="Staff Engineer Architecture Defense"
      simpleDefinition="You have mastered CAP theorem quorums, SEV-1 incident response, production RFC authoring, chaos engineering stress tests, and distributed idempotency locking. Now defend your Enterprise System Blueprint before the Chief Technology Officer (CTO) and Staff Architecture Committee!"
      smallExample="Presenting a globally distributed fintech architecture processing $1B daily volume with zero duplicate charges and 99.999% reliability."
      oneWordPoint={{ question: "What is the highest software architecture rank?", answer: "Staff / Principal SRE" }}
      keyPoints={[
        { icon: Award, title: 'Five Nines Reliability', text: '99.999% availability backed by multi-region active-active deployment.' },
        { icon: ShieldCheck, title: 'Zero Data Inconsistency', text: 'Enforced by Raft consensus, idempotency keys, and distributed Redlock.' },
        { icon: Trophy, title: 'Enterprise Fellow Wings', text: 'Certifies UG Master Enterprise Systems Architect status.' }
      ]}
      aiDialogue="The Architecture Review Committee is assembled! Defend your enterprise distributed system design across 3 capstone challenges to claim your Staff Engineer title!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={35}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Enterprise Matcher",
          title: "Match Enterprise Pillars to System Implementations",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ee1', left: 'Multi-Region Active-Active', right: 'Anycast DNS routing traffic to nearest healthy global cloud datacenter' },
                { id: 'ee2', left: 'Event Sourcing & CQRS', right: 'Separates read views from write append logs for infinite query scale' },
                { id: 'ee3', left: 'Zero-Trust mTLS Network', right: 'Every microservice authenticates identity using SPIFFE/SPIRE certificates' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Staff Architecture Defense Script",
          title: "Assemble Staff Architecture Review Board Presentation",
          render: (onPass) => (
            <CodeBlockAssembler
              title="Staff Engineering Review Presentation"
              instruction="Assemble the 4-step architecture defense sequence in order."
              availableBlocks={[
                { id: 'sp1', text: 'PresentDistributedConsensusTopologyAndCAPProof()' },
                { id: 'sp2', text: 'DemonstrateChaosMonkeyResilienceUnderPartition()' },
                { id: 'sp3', text: 'ShowIdempotentPaymentGuaranteesAt50kRPS()' },
                { id: 'sp4', text: 'SecureCTOApprovalAndInitiateProductionRollout()' }
              ]}
              targetSequence={['sp1', 'sp2', 'sp3', 'sp4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Enterprise Architecture Sorter",
          title: "Verify Production System Readiness",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'es_ok1', label: 'Automated canary rollback configured if error rate exceeds 0.1%', bin: 'A' },
                { id: 'es_bad1', label: 'Single redis cache node with no persistence or replica failover', bin: 'B', hint: 'Severe single point of failure!' },
                { id: 'es_ok2', label: 'All database queries strictly bounded with 500ms client timeouts', bin: 'A' },
                { id: 'es_bad2', label: 'Database passwords passed in cleartext HTTP query URL strings', bin: 'B', hint: 'Critical security violation!' }
              ]}
              binALabel="Enterprise Production Certified (Approved)"
              binBLabel="Architectural Flaw / Security Risk"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: DISTRIBUTED, CHAOS, SHARDING, RPC, GOVERNANCE
// =============================================================================

function UGChapter2DistributedWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title={props.canonicalSection?.title || `Chapter 2: Distributed Hash Tables & Consistent Hashing · Section ${sectionIdx + 1}`}
      lessonSubtitle="Virtual Nodes, Ring Rebalancing & Cassandra"
      simpleDefinition="Consistent Hashing maps data keys and server nodes onto a shared 360° virtual hash ring. When nodes are added or removed, only K/N keys are remapped, avoiding massive cache thrashing."
      smallExample="A distributed cache adding a 5th server only needs to rebalance 20% of stored keys rather than 100%."
      oneWordPoint={{ question: "What ring algorithm minimizes re-hashing?", answer: "Consistent Hashing" }}
      keyPoints={[
        { icon: Network, title: 'Virtual Hash Ring (0 to 2^32-1)', text: 'Maps both server IP hashes and data key hashes onto circular ring.' },
        { icon: Layers, title: 'Virtual Nodes (vnodes)', text: 'Assigns 256 virtual positions per physical server for uniform load balance.' },
        { icon: Activity, title: 'Replication Factor (RF=3)', text: 'Copies data to the next 3 consecutive clockwise physical nodes on ring.' }
      ]}
      aiDialogue="Configure distributed hash rings! Implement virtual nodes, calculate ring rebalancing distributions, and scale cache clusters!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Hashing Algorithm Matcher",
          title: "Match Hashing Algorithms to Cluster Behaviors",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ha1', left: 'Naive Modulo Hashing (key % N)', right: 'Adding 1 server causes 100% cache invalidation' },
                { id: 'ha2', left: 'Consistent Hashing (Ring)', right: 'Adding 1 server only moves K/N keys to new node' },
                { id: 'ha3', left: 'Virtual Nodes (Vnodes)', right: 'Distributes hot partition keys uniformly across all servers' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Vnode Density Tuner",
          title: "Calibrate Virtual Node (Vnode) Density per Server",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Cassandra Vnodes per Physical Node"
              description="Configure vnode count between 128 and 256 vnodes to achieve < 3% standard deviation in data distribution."
              min={32}
              max={512}
              step={32}
              unit=" vnodes"
              targetRange={[128, 256]}
              optimalLabel="Optimal Uniform Hash Ring Distribution Achieved (Std Dev < 2.4%)"
              suboptimalLabel="Hotspot Imbalance (<128) or Routing Metadata Overhead (>256)! Target: 128 - 256"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Consistent Hashing Ring Sequence",
          title: "Sequence the Key Lookup & Replication on Hash Ring",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'hr1', label: '1. Hash user ID using Murmur3 to get ring coordinate: Hash("usr_99") = 0x8A1F', detail: 'Hash Key' },
                { id: 'hr2', label: '2. Walk clockwise along virtual ring to find first physical node: Node B', detail: 'Primary Node' },
                { id: 'hr3', label: '3. Replicate copy to next 2 clockwise distinct physical nodes: Node C, Node D', detail: 'Replication' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'hr1' && ids[1] === 'hr2' && ids[2] === 'hr3') {
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

function UGChapter3ChaosEngineeringWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title={props.canonicalSection?.title || `Chapter 3: Chaos Engineering & Fault Injection · Section ${sectionIdx + 1}`}
      lessonSubtitle="Game Days, Dark Launching & Failure Modes"
      simpleDefinition="Enterprise SRE teams conduct live 'Game Days' where chaos engineers inject real-world failure modes (datacenter power cuts, split-brain partitions, and disk corruption) to verify automated failovers."
      smallExample="Simulating an entire AWS us-east-1 region failure and verifying that Anycast DNS reroutes 100% of traffic to us-west-2 in 12 seconds."
      oneWordPoint={{ question: "What is practicing simulated outages called?", answer: "SRE Game Day" }}
      keyPoints={[
        { icon: AlertTriangle, title: 'Simulated Datacenter Outage', text: 'Verifies cross-region active-active database replication.' },
        { icon: Activity, title: 'Automated Circuit Tripping', text: 'Ensures degraded third-party payment APIs do not exhaust thread pools.' },
        { icon: ShieldCheck, title: 'Rollback Safety Automation', text: 'Automatically aborts chaos experiment if customer error rate exceeds 0.05%.' }
      ]}
      aiDialogue="Lead the SRE Game Day! Inject cross-region network partitions, simulate cloud datacenter blackouts, and verify automated failover!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Game Day Sorter",
          title: "Classify Safe Chaos Experiments vs Dangerous Out-of-Scope Risks",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'cd_ok1', label: 'Simulating pod crash with automated Kubernetes replica restart in staging', bin: 'A' },
                { id: 'cd_bad1', label: 'Permanently deleting production customer database backups during live sale', bin: 'B', hint: 'Catastrophic unrecoverable sabotage!' },
                { id: 'cd_ok2', label: 'Throttling synthetic network bandwidth to 1 Mbps on canary cluster', bin: 'A' },
                { id: 'cd_bad2', label: 'Injecting unmonitored corruption into live financial ledger table', bin: 'B', hint: 'Financial regulatory violation!' }
              ]}
              binALabel="Safe Bounded Chaos Experiment"
              binBLabel="Dangerous / Prohibited Risk"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Chaos Abort Guardrail Tuner",
          title: "Tune Automatic Chaos Experiment Abort Error Threshold",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Chaos Safety Abort Error Rate (%)"
              description="Configure automatic abort threshold between 0.05% and 0.15% to stop experiment instantly if real users are impacted."
              min={0.01}
              max={1.00}
              step={0.01}
              unit="%"
              targetRange={[0.05, 0.15]}
              optimalLabel="Automated Safety Guardrail Active (Abort at 0.10% Error Rate)"
              suboptimalLabel="Premature Abort (<0.05%) or Customer Impact Risk (>0.15%)! Target: 0.05% - 0.15%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Game Day Protocol Sequence",
          title: "Sequence the SRE Game Day Execution Protocol",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'gd1', label: '1. Establish War Room, notify on-call teams, and verify automated abort monitors', detail: 'Prep' },
                { id: 'gd2', label: '2. Inject cross-region network latency fault on 10% of backend traffic', detail: 'Inject' },
                { id: 'gd3', label: '3. Measure automated failover metrics and compile post-game day review', detail: 'Review' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'gd1' && ids[1] === 'gd2' && ids[2] === 'gd3') {
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

function UGChapter4DatabaseShardingWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title={props.canonicalSection?.title || `Chapter 4: Database Sharding & Partitioning · Section ${sectionIdx + 1}`}
      lessonSubtitle="Horizontal Sharding, Shard Keys & Cross-Shard Joins"
      simpleDefinition="When database tables grow past billions of rows, Horizontal Sharding splits data across multiple database instances using a Shard Key (like user_id) to achieve infinite write scalability."
      smallExample="Splitting 1 billion users across 64 PostgreSQL shard databases where shard_id = hash(user_id) % 64."
      oneWordPoint={{ question: "What splits database tables across multiple servers?", answer: "Horizontal Sharding" }}
      keyPoints={[
        { icon: Database, title: 'Shard Key Selection', text: 'Choosing high-cardinality keys to prevent hot shard bottlenecks.' },
        { icon: Network, title: 'Shard Routing Proxy (Vitess / Citus)', text: 'Routes queries automatically to correct shard instances.' },
        { icon: AlertTriangle, title: 'Cross-Shard Scatter-Gather', text: 'Queries lacking a shard key must query all shards in parallel (expensive).' }
      ]}
      aiDialogue="Scale relational databases! Select optimal shard keys, configure Vitess routing proxies, and eliminate cross-shard joins!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Shard Key Evaluation Matcher",
          title: "Match Shard Key Candidates to Scalability Profiles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sk1', left: 'user_id (High Cardinality UUID)', right: 'Optimal uniform distribution across all 64 shards' },
                { id: 'sk2', left: 'country_code (Low Cardinality)', right: 'Creates massive hot shard on populous countries (Bad Key)' },
                { id: 'sk3', left: 'created_at (Timestamp)', right: 'Routes 100% of current writes to the latest shard (Hotspot)' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Shard Count Tuner",
          title: "Calibrate Initial Shard Partition Count (Power of 2)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Initial Database Shard Count (Power of 2)"
              description="Configure shard partition count to 64 shards to support 100x user growth while allowing easy binary resharding."
              min={8}
              max={256}
              step={8}
              unit=" shards"
              targetRange={[64, 64]}
              optimalLabel="Optimal 64-Shard Partition Architecture Configured (100M User Capacity)"
              suboptimalLabel="Under-provisioned (<64) or Complex Overhead (>64)! Target: Exactly 64 shards"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Query Routing Sorter",
          title: "Classify Single-Shard vs Scatter-Gather Queries",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'q_single1', label: 'SELECT * FROM orders WHERE user_id = "usr_88194" (Single Shard Lookup)', bin: 'A' },
                { id: 'q_scatter1', label: 'SELECT * FROM orders WHERE status = "PENDING" (No shard key, queries all 64 shards)', bin: 'B', hint: 'Expensive scatter-gather query!' },
                { id: 'q_single2', label: 'UPDATE users SET email = "a@b.com" WHERE user_id = "usr_88194"', bin: 'A' },
                { id: 'q_scatter2', label: 'SELECT COUNT(*) FROM orders (Full cluster aggregation across all shards)', bin: 'B', hint: 'Scatter-gather map-reduce required!' }
              ]}
              binALabel="Single-Shard Direct Route (Fast O(1))"
              binBLabel="Cross-Shard Scatter-Gather (Heavy O(N))"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function UGChapter5HighThroughputRPCWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title={props.canonicalSection?.title || `Chapter 5: High-Throughput RPC & Zero-Copy Networking · Section ${sectionIdx + 1}`}
      lessonSubtitle="Linux epoll, Netty & Zero-Copy Buffers"
      simpleDefinition="High-throughput network engines (like Netty and gRPC) achieve millions of requests per second using non-blocking I/O (Linux epoll) and zero-copy byte buffers (sendfile syscalls) that bypass CPU memory copies."
      smallExample="Serving 500,000 concurrent WebSocket connections on a single Linux server using epoll event loops."
      oneWordPoint={{ question: "What Linux syscall streams files without CPU copy?", answer: "sendfile (Zero-Copy)" }}
      keyPoints={[
        { icon: Terminal, title: 'Non-Blocking I/O (epoll)', text: 'Single thread event loop monitors thousands of socket file descriptors.' },
        { icon: Zap, title: 'Zero-Copy (sendfile)', text: 'Transfers bytes directly from disk cache to network card DMA buffer.' },
        { icon: Layers, title: 'Netty ByteBuf Pooling', text: 'Pools direct off-heap memory buffers to eliminate JVM Garbage Collection pauses.' }
      ]}
      aiDialogue="Master Zero-Copy Systems! Configure Linux epoll event loops, pool off-heap ByteBufs, and achieve 1M+ RPS network throughput!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Network Architecture Matcher",
          title: "Match Network Models to Concurrency Capabilities",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'nm1', left: 'Blocking I/O (Thread-per-Connection)', right: 'Crashes at ~5,000 threads due to stack memory and context switches' },
                { id: 'nm2', left: 'Non-Blocking epoll Event Loop', right: 'Handles 500,000 concurrent sockets on 1 CPU core with O(1) polling' },
                { id: 'nm3', left: 'Zero-Copy DMA Transfer', right: 'Streams data from disk to NIC bypassing CPU memory entirely' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Linux epoll Event Loop Sequence",
          title: "Sequence the Non-Blocking Event Loop Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ep1', label: '1. epoll_create: Register server listening socket with Linux kernel', detail: 'Register' },
                { id: 'ep2', label: '2. epoll_wait: Block thread until socket events become ready (O(1))', detail: 'Event Poll' },
                { id: 'ep3', label: '3. Dispatch ready socket event to pooled worker thread for zero-copy read', detail: 'Dispatch' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ep1' && ids[1] === 'ep2' && ids[2] === 'ep3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Zero-Copy Memory Sorter",
          title: "Classify Zero-Copy Pathways vs Inefficient Memory Copies",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'zc1', label: 'Linux sendfile() streaming file directly from OS page cache to NIC DMA', bin: 'A' },
                { id: 'copy1', label: 'Reading file into user-space byte array and copying back to socket buffer', bin: 'B', hint: '4 redundant CPU copies!' },
                { id: 'zc2', label: 'Netty Direct ByteBuf allocated off-heap with pooled buffer reuse', bin: 'A' },
                { id: 'copy2', label: 'Allocating 100,000 temporary byte[] objects on JVM heap causing GC freeze', bin: 'B', hint: 'Garbage collection latency spike!' }
              ]}
              binALabel="Zero-Copy / Off-Heap High-Performance"
              binBLabel="Inefficient Memory Copy / GC Bottleneck"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function UGChapter6CloudGovernanceWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="UG · Enterprise Workbench"
      title={props.canonicalSection?.title || `Chapter 6: Cloud Economics (FinOps) & Global Infrastructure · Section ${sectionIdx + 1}`}
      lessonSubtitle="Cost Optimization, Spot Instances & Multi-Cloud Strategy"
      simpleDefinition="Cloud FinOps combines financial accountability with engineering optimization: leveraging Spot GPU instances, Reserved Instances (RIs), and automated server auto-parking to cut enterprise cloud bills by 60%."
      smallExample="Migrating batch model training jobs to AWS Spot GPU instances to save $500,000 per month while handling spot interruptions gracefully."
      oneWordPoint={{ question: "What discipline optimizes cloud costs?", answer: "FinOps (Cloud Economics)" }}
      keyPoints={[
        { icon: Zap, title: 'Spot Instance Optimization', text: 'Uses surplus cloud compute at 70-90% discount with automated checkpointing.' },
        { icon: Layers, title: 'Commitment Discounts (RIs / Savings Plans)', text: 'Locks in 1-year or 3-year baseline compute commitments for 50% savings.' },
        { icon: ShieldCheck, title: 'Multi-Cloud Portability', text: 'Runs vendor-neutral Kubernetes architectures to prevent cloud vendor lock-in.' }
      ]}
      aiDialogue="Master Cloud Economics! Architect FinOps cost models, leverage Spot GPU clusters with automated checkpointing, and optimize cloud spend!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Compute Pricing Matcher",
          title: "Match Cloud Compute Pricing Models to Workload Profiles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'pr1', left: 'On-Demand Pricing (Full Cost)', right: 'Unpredictable, short-lived spikes with immediate availability' },
                { id: 'pr2', left: 'Savings Plans / 3-Year RI (50% Off)', right: 'Predictable baseline production microservices running 24/7' },
                { id: 'pr3', left: 'Spot Instances (70-90% Off)', right: 'Fault-tolerant batch training jobs with checkpoint resumption' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Spot Checkpointing Sequence",
          title: "Sequence the Spot Instance Interruption Resilience Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'sp1', label: '1. Ingest AWS 2-Minute Spot Instance Interruption Notice event', detail: 'Warning' },
                { id: 'sp2', label: '2. Checkpoint model weights and training step state to persistent S3 bucket', detail: 'Save State' },
                { id: 'sp3', label: '3. Re-spawn training job on available alternative spot pool and resume', detail: 'Resume' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'sp1' && ids[1] === 'sp2' && ids[2] === 'sp3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · FinOps Cost Sorter",
          title: "Sort Cost-Optimized Cloud Practices vs Wasteful Sprawl",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'fo_good1', label: 'Auto-stopping development clusters at 7 PM on weekdays (Saves 65%)', bin: 'A' },
                { id: 'fo_waste1', label: 'Leaving 50 unattached 1TB gp3 EBS storage volumes orphaned indefinitely', bin: 'B', hint: 'Wasted cloud bill sprawl!' },
                { id: 'fo_good2', label: 'Purchasing 3-year Compute Savings Plan for stable production baseline', bin: 'A' },
                { id: 'fo_waste2', label: 'Running all heavy ML training on peak-cost On-Demand GPU instances', bin: 'B', hint: 'Paying 5x more than necessary!' }
              ]}
              binALabel="FinOps Cost-Optimized Practice"
              binBLabel="Wasteful Cloud Sprawl"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}
