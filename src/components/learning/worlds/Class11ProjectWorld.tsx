import React, { useState } from 'react'
import {
  Layers, Code2, Play, CheckCircle2, ChevronRight, FileCode,
  Sparkles, Award, GitBranch, Terminal, Shield, Workflow,
  Activity, ArrowRight, ShieldCheck, Check, Zap, RotateCcw, AlertTriangle,
  Sun, Moon, Thermometer, User, Compass, Lock, RefreshCw, FileText, Sliders,
  Cpu, CheckSquare, Users, Gauge, Trophy
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
// CLASS 11 PROJECT WORLD DISPATCHER (PRODUCT ARCHITECTURE STUDIO)
// Unique Theme: System Design Blueprints · Cloud Microservices · Purple & Slate
// =============================================================================

export const Class11ProjectWorld: React.FC<WorldExperienceProps & { sectionIdx: number }> = (props) => {
  const cNum = parseInt(String(props.chapterNum || '1'), 10)

  // Section 8 is ALWAYS the 3-Stage Mastery Quiz
  if (props.sectionIdx === 7 || props.canonicalSection.contentType === 'quiz') {
    return <ThreeStageMasteryQuiz {...props} />
  }

  switch (cNum) {
    case 2:
      return <Class11Chapter2MicroservicesWorld {...props} />
    case 3:
      return <Class11Chapter3CloudDeployWorld {...props} />
    case 4:
      return <Class11Chapter4DataPipelinesWorld {...props} />
    case 5:
      return <Class11Chapter5DevOpsWorld {...props} />
    case 6:
      return <Class11Chapter6ProductEthicsWorld {...props} />
    default:
      return <Class11Chapter1ArchitectureWorld {...props} />
  }
}

// =============================================================================
// CHAPTER 1: SOFTWARE ARCHITECTURE & FULL-STACK AI ENGINEERING
// =============================================================================

function Class11Chapter1ArchitectureWorld(props: any) {
  const { sectionIdx } = props
  if (sectionIdx === 1) return <C11Ch1S2Blueprint {...props} />
  if (sectionIdx === 2) return <C11Ch1S3Sprint {...props} />
  if (sectionIdx === 3) return <C11Ch1S4PRD {...props} />
  if (sectionIdx === 4) return <C11Ch1S5Pipeline {...props} />
  if (sectionIdx === 5) return <C11Ch1S6Api {...props} />
  if (sectionIdx === 6) return <C11Ch1S7Capstone {...props} />
  return <C11Ch1S2Blueprint {...props} />
}

function C11Ch1S2Blueprint(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title="System Design & AI Microservice Topologies"
      lessonSubtitle="Decoupled Backend Services & High-Throughput APIs"
      simpleDefinition="Modern enterprise AI applications decouple heavy model inference servers from frontend web clients using asynchronous message queues, gRPC protocols, and RESTful API gateways."
      smallExample="A user uploads an audio recording; the API gateway immediately returns a job ID while background GPU workers transcribe the audio asynchronously."
      oneWordPoint={{ question: "What decouples slow AI tasks from web servers?", answer: "Async Message Queue" }}
      keyPoints={[
        { icon: Workflow, title: 'API Gateway Layer', text: 'Handles authentication, rate limiting, and request routing.' },
        { icon: Layers, title: 'Message Queues (Kafka/RabbitMQ)', text: 'Buffers high-traffic inference spikes without crashing backend workers.' },
        { icon: Cpu, title: 'Model Worker Cluster', text: 'Scalable GPU instances that process neural inference jobs in parallel.' }
      ]}
      aiDialogue="Welcome Lead Architect! I am Aura, your Technical Director. Let's design scalable AI systems, configure API gateways, and solve 3 architectural challenges!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={2}
      games={[
        {
          badge: "Game 1 · Architecture Matcher",
          title: "Match System Components to Engineering Responsibilities",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ar1', left: 'API Gateway (Reverse Proxy)', right: 'SSL termination, JWT auth, and rate limiting' },
                { id: 'ar2', left: 'Message Queue Broker', right: 'Asynchronous task buffering and load smoothing' },
                { id: 'ar3', left: 'In-Memory Cache (Redis)', right: 'Sub-millisecond frequent inference result lookup' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Rate Limiting Calibrator",
          title: "Tune API Gateway Rate Limit (Requests per Minute)",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="API Gateway Client Token Bucket"
              description="Configure client rate limit between 60 and 120 requests/minute to prevent DDoS spam while supporting power users."
              min={10}
              max={300}
              step={10}
              unit=" req/min"
              targetRange={[60, 120]}
              optimalLabel="Optimal Gateway Rate Limiting Active (Zero API Overload)"
              suboptimalLabel="Too Restrictive (<60) or Server Crash Risk (>120)! Target: 60 - 120"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · System Topology Scanner",
          title: "Inspect 3 Microservice Architecture Tiers",
          render: (onPass) => (
            <VisualInspectionScanner
              title="Enterprise AI System Architecture"
              prompt="Inspect all 3 primary tiers in the microservice topology."
              hotspots={[
                { id: 'st1', label: 'Cloud Load Balancer Tier', icon: <Workflow size={14} className="text-purple-600" />, explanation: 'Distributes incoming traffic evenly across redundant server regions.' },
                { id: 'st2', label: 'Redis Feature Cache Tier', icon: <Zap size={14} className="text-purple-600" />, explanation: 'Serves pre-computed embedding vectors in 2 milliseconds.' },
                { id: 'st3', label: 'Triton GPU Inference Server Tier', icon: <Cpu size={14} className="text-purple-600" />, explanation: 'Batches concurrent neural tensor calculations on NVIDIA TensorRT.' }
              ]}
              onAllDiscovered={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C11Ch1S3Sprint(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title="Agile Sprints & Git Branching Workflows"
      lessonSubtitle="Trunk-Based Development & CI Pull Requests"
      simpleDefinition="Professional software engineering teams organize work in 2-week Agile sprints using Git feature branching, automated linting checks, and mandatory peer code reviews before merging into production."
      smallExample="An engineer creates branch 'feat/audio-streaming', writes unit tests, and gets code approved by 2 senior reviewers before merging."
      oneWordPoint={{ question: "What Git command merges approved code?", answer: "git merge" }}
      keyPoints={[
        { icon: GitBranch, title: 'Feature Branch Isolation', text: 'Develops new features in isolated branches without breaking main.' },
        { icon: CheckSquare, title: 'Automated CI Linting', text: 'Pre-commit hooks verify TypeScript formatting and type safety.' },
        { icon: Users, title: 'Peer Code Reviews', text: 'Senior engineers review architecture, edge cases, and security before deployment.' }
      ]}
      aiDialogue="Sprint planning active! Configure Git branching strategies, review pull requests, and manage engineering sprint workflows!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={3}
      games={[
        {
          badge: "Game 1 · Git Workflow Sorter",
          title: "Classify Clean Git Best Practices vs Risky Habits",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'gt1', label: 'Writing small, focused commits with descriptive imperative messages', bin: 'A' },
                { id: 'gt2', label: 'Force-pushing (git push --force) directly onto production main branch', bin: 'B', hint: 'Catastrophic team sabotage!' },
                { id: 'gt3', label: 'Running automated unit tests before opening a Pull Request', bin: 'A' },
                { id: 'gt4', label: 'Committing hardcoded API secret keys and passwords into public Git', bin: 'B', hint: 'Severe security leak!' }
              ]}
              binALabel="Clean Engineering Practice"
              binBLabel="Dangerous / Unacceptable Git Habit"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Git Command Pipeline",
          title: "Sequence the Git Feature Branch Lifecycle",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'g1', label: '1. git checkout -b feat/speech-recognition', detail: 'Branch Creation' },
                { id: 'g2', label: '2. git commit -m "Add WebSocket audio stream parser"', detail: 'Commit Code' },
                { id: 'g3', label: '3. git push origin feat/speech-recognition && open PR', detail: 'Pull Request' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'g1' && ids[1] === 'g2' && ids[2] === 'g3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Git Term Matcher",
          title: "Match Git Terminology to Operational Effects",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'gm1', left: 'git rebase main', right: 'Replays local commits on top of latest upstream code' },
                { id: 'gm2', left: 'git stash', right: 'Temporarily shelves uncommitted working directory edits' },
                { id: 'gm3', left: 'git cherry-pick', right: 'Applies a single specific commit from another branch' }
              ]}
              onAllMatched={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C11Ch1S4PRD(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title="Product Requirement Documents (PRD) & SLAs"
      lessonSubtitle="Service Level Objectives (SLOs) & User Personas"
      simpleDefinition="A Product Requirement Document (PRD) defines the problem statement, user personas, functional requirements, and strict Service Level Agreements (SLAs) like '99.9% uptime and <200ms p95 latency'."
      smallExample="Specifying that the medical voice assistant must respond in under 250 milliseconds with 99.95% cloud availability."
      oneWordPoint={{ question: "What document defines software feature specs?", answer: "PRD (Product Spec)" }}
      keyPoints={[
        { icon: FileText, title: 'Functional Requirements', text: 'Explicit technical specifications of what the software must do.' },
        { icon: Activity, title: 'Service Level Agreements (SLA)', text: 'Legal commitments on availability (99.9% = max 43m downtime/month).' },
        { icon: Gauge, title: 'P95 / P99 Latency Metrics', text: 'Guarantees 95% of users receive responses in under 200ms.' }
      ]}
      aiDialogue="Draft technical specifications! Formulate user requirements, calculate 99.9% uptime budgets, and define engineering SLAs!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={4}
      games={[
        {
          badge: "Game 1 · Uptime SLA Matcher",
          title: "Match Availability Percentages to Permitted Annual Downtime",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'u1', left: '99.0% Uptime ("Two Nines")', right: 'Allows ~3.65 days downtime per year' },
                { id: 'u2', left: '99.9% Uptime ("Three Nines")', right: 'Allows ~8.76 hours downtime per year' },
                { id: 'u3', left: '99.99% Uptime ("Four Nines")', right: 'Allows ~52.6 minutes downtime per year' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Latency SLO Tuner",
          title: "Calibrate P95 Latency Target Budget",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Target P95 Real-Time Voice Latency"
              description="Configure target P95 latency threshold between 150ms and 250ms for natural human-like conversational turn-taking."
              min={50}
              max={600}
              step={25}
              unit=" ms"
              targetRange={[150, 250]}
              optimalLabel="Optimal Conversational P95 Latency SLO Locked (200ms Target)"
              suboptimalLabel="Unrealistic (<150ms) or Noticeable Lag (>250ms)! Target: 150 - 250 ms"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · PRD Specification Sorter",
          title: "Classify Functional vs Non-Functional Requirements",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'req_f1', label: '"User can export summary report as PDF or CSV file"', bin: 'A' },
                { id: 'req_nf1', label: '"System must handle 10,000 concurrent requests with < 200ms latency"', bin: 'B' },
                { id: 'req_f2', label: '"System must send email verification link upon registration"', bin: 'A' },
                { id: 'req_nf2', label: '"All database tables must be encrypted at rest with AES-256"', bin: 'B' }
              ]}
              binALabel="Functional Feature Requirement"
              binBLabel="Non-Functional / Quality Constraint"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C11Ch1S5Pipeline(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title="CI/CD Pipelines & Automated Testing"
      lessonSubtitle="Continuous Integration & Blue-Green Deployments"
      simpleDefinition="Continuous Integration/Continuous Deployment (CI/CD) pipelines automatically run unit tests, build Docker container images, and deploy software across staging and production without downtime using Blue-Green routing."
      smallExample="Pushing a Git commit triggers automated GitHub Actions that runs 500 unit tests and builds a Docker image in 3 minutes."
      oneWordPoint={{ question: "What automates build and test deployment?", answer: "CI/CD Pipeline" }}
      keyPoints={[
        { icon: Terminal, title: 'Automated Unit Tests', text: 'Verifies individual functions and regression edge cases.' },
        { icon: Layers, title: 'Docker Containerization', text: 'Packages code and dependencies into reproducible containers.' },
        { icon: Workflow, title: 'Blue-Green Zero Downtime', text: 'Switches router traffic instantly from old Blue to new Green cluster.' }
      ]}
      aiDialogue="Configure deployment pipelines! Build Docker containers, automate unit test runners, and execute Blue-Green deployments!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={5}
      games={[
        {
          badge: "Game 1 · CI/CD Sequence",
          title: "Sequence the Complete CI/CD Automated Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'ci1', label: '1. Lint & Test: Run ESLint, TypeScript compiler, and Jest unit tests', detail: 'Validation' },
                { id: 'ci2', label: '2. Build & Package: Compile multi-stage Docker container image', detail: 'Containerize' },
                { id: 'ci3', label: '3. Deploy & Verify: Deploy to Green cluster and run smoke healthcheck', detail: 'Zero Downtime' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'ci1' && ids[1] === 'ci2' && ids[2] === 'ci3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 2 · Docker Pipeline Wire",
          title: "Wire Containerized Services to Network Bridge",
          render: (onPass) => (
            <CircuitWireStation
              title="Docker Compose Service Network"
              instruction="Connect containerized backend microservices to their database and cache dependencies."
              terminals={[
                { id: 't_api', label: 'Node.js Express API Container', icon: <Terminal size={12} /> },
                { id: 't_ai', label: 'Python PyTorch Inference Container', icon: <Cpu size={12} /> },
                { id: 't_web', label: 'React Nginx Frontend Container', icon: <Layers size={12} /> }
              ]}
              ports={[
                { id: 'p_db', label: 'PostgreSQL Relational DB (Port 5432)', matchesTerminalId: 't_api' },
                { id: 'p_gpu', label: 'NVIDIA CUDA GPU Driver Bridge', matchesTerminalId: 't_ai' },
                { id: 'p_cdn', label: 'Edge HTTPS CDN Gateway (Port 443)', matchesTerminalId: 't_web' }
              ]}
              onAllConnected={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Deployment Strategy Sorter",
          title: "Sort Blue-Green vs Canary vs Big-Bang Deployments",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'dep1', label: 'Route 5% of live traffic to new version to test for errors (Canary)', bin: 'A' },
                { id: 'dep2', label: 'Shut down entire server for 4 hours at midnight with maintenance page', bin: 'B', hint: 'Outdated high-downtime method!' },
                { id: 'dep3', label: 'Run identical Green cluster alongside Blue with instant router switch', bin: 'A' },
                { id: 'dep4', label: 'Directly editing live PHP files on production server via FTP', bin: 'B', hint: 'Catastrophic engineering risk!' }
              ]}
              binALabel="Modern Zero-Downtime Deployment"
              binBLabel="Risky / High-Downtime Practice"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C11Ch1S6Api(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title="REST, GraphQL & gRPC API Engineering"
      lessonSubtitle="Interface Design & Protocol Buffers"
      simpleDefinition="Selecting the right API architecture depends on data needs: REST for public CRUD resources, GraphQL for flexible mobile queries, and gRPC Protocol Buffers for ultra-fast microservice communication."
      smallExample="Using gRPC over HTTP/2 for inter-service communication between the gateway and neural inference workers to cut latency by 60%."
      oneWordPoint={{ question: "What high-speed protocol uses HTTP/2 and Protobuf?", answer: "gRPC" }}
      keyPoints={[
        { icon: Code2, title: 'RESTful Endpoints', text: 'Standard HTTP verbs (GET, POST, PUT, DELETE) with JSON payloads.' },
        { icon: Workflow, title: 'GraphQL Schemas', text: 'Allows frontend clients to request exact fields without over-fetching.' },
        { icon: Zap, title: 'gRPC Microservices', text: 'Binary serialization over HTTP/2 with bidirectional streaming support.' }
      ]}
      aiDialogue="Master API Engineering! Compare REST, GraphQL, and gRPC protocols, design endpoints, and test payload serialization!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={6}
      games={[
        {
          badge: "Game 1 · API Protocol Matcher",
          title: "Match API Protocols to Optimal Engineering Domains",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ap1', left: 'REST API', right: 'Public third-party developer integrations with JSON' },
                { id: 'ap2', left: 'GraphQL API', right: 'Mobile app frontends needing dynamic selective queries' },
                { id: 'ap3', left: 'gRPC API', right: 'Internal microservice-to-microservice high-speed binary RPC' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · HTTP Status Code Sorter",
          title: "Classify HTTP Response Status Codes",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'st_ok1', label: '200 OK (Successful request with response body)', bin: 'A' },
                { id: 'st_err1', label: '404 Not Found (Requested resource endpoint does not exist)', bin: 'B' },
                { id: 'st_ok2', label: '201 Created (New user resource successfully persisted)', bin: 'A' },
                { id: 'st_err2', label: '500 Internal Server Error (Uncaught backend exception)', bin: 'B' }
              ]}
              binALabel="2xx Success Status"
              binBLabel="4xx / 5xx Error Status"
              onComplete={onPass}
            />
          )
        },
        {
          badge: "Game 3 · API Request Builder",
          title: "Assemble RESTful API Request Pipeline",
          render: (onPass) => (
            <CodeBlockAssembler
              title="REST API Request Pipeline"
              instruction="Assemble the HTTP client request lifecycle in order."
              availableBlocks={[
                { id: 'req1', text: 'AttachBearerTokenInAuthorizationHeader()' },
                { id: 'req2', text: 'POST("/api/v1/inference", jsonPayload)' },
                { id: 'req3', text: 'ParseResponseJSONAndValidateStatus(200)' }
              ]}
              targetSequence={['req1', 'req2', 'req3']}
              onCorrectSequence={onPass}
            />
          )
        }
      ]}
    />
  )
}

function C11Ch1S7Capstone(props: any) {
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title="Chapter 1 Capstone: Enterprise System Architecture Defense"
      lessonSubtitle="Defending the Full-Stack Engineering Blueprint"
      simpleDefinition="You have mastered microservice topologies, Agile Git workflows, PRD technical specifications, CI/CD automated deployments, and high-performance API protocols. Now defend your Enterprise AI Architecture before the Board of Directors!"
      smallExample="Architecting an enterprise AI document intelligence platform handling 100,000 daily uploads with 99.99% availability."
      oneWordPoint={{ question: "What is the highest engineering design rank?", answer: "Principal System Architect" }}
      keyPoints={[
        { icon: Award, title: 'Scalable Architecture', text: 'Elastic auto-scaling handling 100x traffic spikes with zero dropped requests.' },
        { icon: ShieldCheck, title: 'Zero Downtime Guaranteed', text: 'Blue-green deployments and automated healthchecks across 3 cloud zones.' },
        { icon: Trophy, title: 'Architect Certification', text: 'Certifies Class 11 Principal Enterprise Architect rank.' }
      ]}
      aiDialogue="The Architecture Review Board is in session! Defend your full-stack system design across 3 capstone challenges to achieve Principal Architect certification!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={30}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={7}
      games={[
        {
          badge: "Game 1 · Master Architect Matcher",
          title: "Match System Pillars to Enterprise Guarantees",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'em1', left: 'Elastic Kubernetes Auto-Scaler', right: 'Scales pods dynamically from 2 to 50 based on CPU load' },
                { id: 'em2', left: 'Multi-Region DB Replication', right: 'Guarantees zero data loss if an entire datacenter fails' },
                { id: 'em3', left: 'Automated CI/CD Test Gate', right: 'Blocks broken builds before they ever reach production' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Architecture Defense Script",
          title: "Assemble Architecture Review Board Presentation",
          render: (onPass) => (
            <CodeBlockAssembler
              title="System Design Review Presentation"
              instruction="Assemble the 4-step engineering presentation sequence in order."
              availableBlocks={[
                { id: 'ap1', text: 'PresentMicroserviceTopologyAndDataFlow()' },
                { id: 'ap2', text: 'Demonstrate99.99%SLOAvailabilityModel()' },
                { id: 'ap3', text: 'ShowLoadTestingUnder50kRPSBenchmark()' },
                { id: 'ap4', text: 'ObtainArchitectureReviewBoardSignOff()' }
              ]}
              targetSequence={['ap1', 'ap2', 'ap3', 'ap4']}
              onCorrectSequence={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Architectural Health Sorter",
          title: "Verify Production System Architecture Health",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'sys1', label: 'All microservices running stateless behind autoscaling load balancer', bin: 'A' },
                { id: 'sys2', label: 'Storing user session state in local server memory (Blocks scaling)', bin: 'B', hint: 'Stateful server bottleneck!' },
                { id: 'sys3', label: 'Database queries optimized with proper B-Tree indexes (<5ms)', bin: 'A' },
                { id: 'sys4', label: 'Single shared MySQL database with no replicas or backups', bin: 'B', hint: 'Single point of failure!' }
              ]}
              binALabel="Production Ready Architecture (Approved)"
              binBLabel="Architectural Flaw / Bottleneck"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

// =============================================================================
// CHAPTERS 2 - 6: MICROSERVICES, CLOUD, DATA, DEVOPS, ETHICS
// =============================================================================

function Class11Chapter2MicroservicesWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title={props.canonicalSection?.title || `Chapter 2: Microservice Topologies · Section ${sectionIdx + 1}`}
      lessonSubtitle="Service Mesh, Envoy & Event-Driven Architecture"
      simpleDefinition="Service mesh technologies (like Istio and Envoy proxy) manage service-to-service communication with automatic mutual TLS (mTLS) encryption, circuit breaking, and distributed tracing."
      smallExample="If the payment microservice is slow, a circuit breaker trips to prevent the entire checkout page from freezing."
      oneWordPoint={{ question: "What protects services from cascade failures?", answer: "Circuit Breaker" }}
      keyPoints={[
        { icon: Shield, title: 'Mutual TLS (mTLS)', text: 'Cryptographically authenticates both client and server microservices.' },
        { icon: Zap, title: 'Circuit Breaking', text: 'Automatically trips and returns fallback responses when downstream services fail.' },
        { icon: Activity, title: 'Distributed Tracing (Jaeger)', text: 'Traces request journeys across 20 microservices with unique correlation IDs.' }
      ]}
      aiDialogue="Configure enterprise service meshes! Implement circuit breakers, trace distributed requests with Jaeger, and secure mTLS channels!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Service Mesh Matcher",
          title: "Match Service Mesh Patterns to Operational Benefits",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'sm1', left: 'Circuit Breaker Pattern', right: 'Isolates failing microservice to prevent cascading outage' },
                { id: 'sm2', left: 'Distributed Tracing (TraceID)', right: 'Tracks request latency across all microservice hops' },
                { id: 'sm3', left: 'mTLS Sidecar Proxy', right: 'Encrypts all inter-service network packets automatically' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Circuit Breaker Tuner",
          title: "Tune Circuit Breaker Failure Rate Threshold",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Circuit Breaker Error Trip Threshold"
              description="Configure failure percentage threshold between 40% and 60% to trip and protect backend databases during downstream outages."
              min={10}
              max={90}
              step={5}
              unit="%"
              targetRange={[40, 60]}
              optimalLabel="Optimal Circuit Breaker Protection Armed (50% Error Trip Threshold)"
              suboptimalLabel="Hair-Trigger Trip (<40%) or Downstream Overload (>60%)! Target: 40% - 60%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · Microservice Architecture Sorter",
          title: "Sort Decoupled Microservices vs Monolithic Pitfalls",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'ms1', label: 'Services deployed independently with isolated database schemas', bin: 'A' },
                { id: 'ms2', label: '10 services sharing one giant database with hard foreign keys', bin: 'B', hint: 'Distributed monolith anti-pattern!' },
                { id: 'ms3', label: 'Asynchronous event publishing via Kafka event bus', bin: 'A' },
                { id: 'ms4', label: 'Synchronous blocking chain of 8 HTTP calls in a single user request', bin: 'B', hint: 'High latency risk!' }
              ]}
              binALabel="Clean Microservice Design"
              binBLabel="Architectural Anti-Pattern"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class11Chapter3CloudDeployWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title={props.canonicalSection?.title || `Chapter 3: Cloud Infrastructure & Kubernetes · Section ${sectionIdx + 1}`}
      lessonSubtitle="K8s Pods, Deployments & Horizontal Auto-Scaling"
      simpleDefinition="Kubernetes (K8s) orchestrates containerized applications across cloud server clusters, managing container scheduling, self-healing pod restarts, and Horizontal Pod Autoscaling (HPA)."
      smallExample="Kubernetes automatically spawning 30 new web server pods when user traffic surges on Cyber Monday."
      oneWordPoint={{ question: "What orchestrates container clusters?", answer: "Kubernetes (K8s)" }}
      keyPoints={[
        { icon: Layers, title: 'K8s Pods & Deployments', text: 'The atomic deployable unit containing one or more cooperating containers.' },
        { icon: Activity, title: 'Horizontal Pod Autoscaler (HPA)', text: 'Scales pod replica count automatically based on CPU and memory utilization.' },
        { icon: ShieldCheck, title: 'Liveness & Readiness Probes', text: 'Restarts unhealthy containers and routes traffic only to ready pods.' }
      ]}
      aiDialogue="Deploy to the Kubernetes cluster! Configure HPA auto-scaling, write YAML manifests, and manage container orchestrations!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · K8s Resource Matcher",
          title: "Match Kubernetes Resource Kinds to Functions",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'k81', left: 'Deployment Manifest', right: 'Declares desired replica count and rolling update strategy' },
                { id: 'k82', left: 'Service (ClusterIP / LoadBalancer)', right: 'Exposes stable internal or external IP endpoint to pods' },
                { id: 'k83', left: 'ConfigMap & Secret', right: 'Injects environment variables and encrypted API keys into containers' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · HPA Auto-Scaling Tuner",
          title: "Tune Horizontal Pod Autoscaler CPU Target",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="K8s HPA Target CPU Utilization"
              description="Configure target CPU threshold between 65% and 80% to trigger pod scaling before server latency degrades."
              min={40}
              max={95}
              step={5}
              unit="%"
              targetRange={[65, 80]}
              optimalLabel="Optimal Cloud Elasticity Configured (70% Target CPU)"
              suboptimalLabel="Wasted Cost (<65%) or Lag Under Load (>80%)! Target: 65% - 80%"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · K8s Deployment Manifest Sequence",
          title: "Sequence the K8s Deployment Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'k1', label: '1. kubectl apply -f deployment.yaml (Declare desired state)', detail: 'Apply' },
                { id: 'k2', label: '2. K8s Master Controller schedules pods onto healthy worker nodes', detail: 'Scheduling' },
                { id: 'k3', label: '3. Readiness probe passes and traffic is routed via Service', detail: 'Serving' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'k1' && ids[1] === 'k2' && ids[2] === 'k3') {
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

function Class11Chapter4DataPipelinesWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title={props.canonicalSection?.title || `Chapter 4: Big Data Pipelines & Streaming · Section ${sectionIdx + 1}`}
      lessonSubtitle="ETL Workflows, Apache Spark & Kafka"
      simpleDefinition="Big data engineering pipelines use Extract-Transform-Load (ETL) workflows and streaming engines (like Apache Kafka and Spark) to process terabytes of event logs in real time."
      smallExample="Streaming 1,000,000 user click events per minute through Kafka topics into Spark to update product recommendation models."
      oneWordPoint={{ question: "What is Extract, Transform, Load called?", answer: "ETL Pipeline" }}
      keyPoints={[
        { icon: Workflow, title: 'Apache Kafka Event Streams', text: 'Distributed append-only commit log with partition partitioning.' },
        { icon: Layers, title: 'Data Lakes vs Warehouses', text: 'Raw unstructured data lakes (S3) vs structured analytics warehouses (Snowflake).' },
        { icon: Activity, title: 'Spark Distributed Computations', text: 'Processes distributed DataFrames across 50 worker nodes in parallel.' }
      ]}
      aiDialogue="Build enterprise data pipelines! Stream event topics, configure Spark transformations, and optimize ETL workflows!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Data Architecture Matcher",
          title: "Match Data Storage Systems to Query Profiles",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'da1', left: 'Relational DB (PostgreSQL)', right: 'ACID transactional consistency for user financial accounts' },
                { id: 'da2', left: 'Columnar Warehouse (Snowflake)', right: 'Fast analytical OLAP aggregations across billions of rows' },
                { id: 'da3', left: 'Object Store (Amazon S3)', right: 'Scalable data lake for raw video, audio, and training datasets' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Kafka Partition Tuner",
          title: "Tune Kafka Topic Partition Count for High Throughput",
          render: (onPass) => (
            <InteractiveSliderTuner
              title="Kafka Topic Partition Count"
              description="Configure partition count between 12 and 24 partitions to balance consumer parallelism without overloading broker metadata."
              min={2}
              max={48}
              step={2}
              unit=" partitions"
              targetRange={[12, 24]}
              optimalLabel="Optimal 16-Partition High-Throughput Streaming Bus Configured"
              suboptimalLabel="Consumer Bottleneck (<12) or Broker Overhead (>24)! Target: 12 - 24"
              onCorrect={onPass}
            />
          )
        },
        {
          badge: "Game 3 · ETL Pipeline Sequence",
          title: "Sequence the Distributed Data Pipeline Workflow",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'et1', label: '1. Extract: Ingest raw JSON events from Kafka topic stream', detail: 'Ingestion' },
                { id: 'et2', label: '2. Transform: Clean missing fields, normalize data types, and deduplicate', detail: 'Transformation' },
                { id: 'et3', label: '3. Load: Write parquet files to Data Lake and sync analytics tables', detail: 'Load' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'et1' && ids[1] === 'et2' && ids[2] === 'et3') {
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

function Class11Chapter5DevOpsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title={props.canonicalSection?.title || `Chapter 5: Infrastructure as Code (IaC) & Terraform · Section ${sectionIdx + 1}`}
      lessonSubtitle="Declarative Cloud Provisioning & GitOps"
      simpleDefinition="Infrastructure as Code (IaC) tools like Terraform define cloud servers, VPC networks, and databases as declarative code files, allowing entire global cloud architectures to be spun up in minutes."
      smallExample="Using a single 'terraform apply' command to spin up 3 Kubernetes clusters, 2 Redis caches, and 5 load balancers across 3 continents."
      oneWordPoint={{ question: "What tool provisions cloud infrastructure as code?", answer: "Terraform" }}
      keyPoints={[
        { icon: FileCode, title: 'Declarative HCL Syntax', text: 'Specifies the desired end state rather than manual step-by-step commands.' },
        { icon: Lock, title: 'State File Management (tfstate)', text: 'Tracks the exact mapping between code declarations and live cloud assets.' },
        { icon: RefreshCw, title: 'GitOps Workflow (ArgoCD)', text: 'Synchronizes live Kubernetes clusters automatically from Git repositories.' }
      ]}
      aiDialogue="Master Infrastructure as Code! Write declarative Terraform manifests, manage state locks, and deploy via GitOps!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · IaC Tool Matcher",
          title: "Match DevOps Automation Tools to Core Strengths",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'ia1', left: 'Terraform (HCL)', right: 'Declarative cloud infrastructure provisioning (AWS, GCP, Azure)' },
                { id: 'ia2', left: 'ArgoCD', right: 'Kubernetes GitOps continuous reconciliation controller' },
                { id: 'ia3', left: 'Ansible', right: 'Configuration management and remote server software installation' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · Terraform Pipeline Sequence",
          title: "Sequence the Terraform Deployment Lifecycle",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'tf1', label: '1. terraform init: Download cloud provider plugins and modules', detail: 'Initialize' },
                { id: 'tf2', label: '2. terraform plan: Preview proposed infrastructure diff changes', detail: 'Dry Run' },
                { id: 'tf3', label: '3. terraform apply: Provision cloud assets and update remote state', detail: 'Deploy' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'tf1' && ids[1] === 'tf2' && ids[2] === 'tf3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · DevOps Discipline Sorter",
          title: "Classify Modern GitOps vs Manual Cloud Antipatterns",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'dop1', label: 'All cloud changes reviewed in Git pull requests before terraform apply', bin: 'A' },
                { id: 'dop2', label: 'Manually clicking around AWS web console at 2 AM with no audit log', bin: 'B', hint: 'Dangerous unversioned ClickOps!' },
                { id: 'dop3', label: 'Automated policy-as-code security scans blocking open S3 buckets', bin: 'A' },
                { id: 'dop4', label: 'Storing unencrypted production database passwords in public GitHub repo', bin: 'B', hint: 'Severe security breach!' }
              ]}
              binALabel="Modern GitOps / IaC Best Practice"
              binBLabel="Dangerous Manual Antipattern"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}

function Class11Chapter6ProductEthicsWorld(props: any) {
  const { sectionIdx } = props
  return (
    <UniversalLessonGameEngine
      badge="Class 11 · Architecture Studio"
      title={props.canonicalSection?.title || `Chapter 6: Software Engineering Ethics & Data Governance · Section ${sectionIdx + 1}`}
      lessonSubtitle="GDPR Compliance, SOC2 & Software Liability"
      simpleDefinition="Enterprise software architects must design for regulatory compliance including GDPR (Right to be Forgotten), SOC2 Type II security audits, and strict data residency controls."
      smallExample="Architecting a database deletion cascade that completely purges all user data within 30 days of an account deletion request."
      oneWordPoint={{ question: "What regulation guarantees user data deletion rights?", answer: "GDPR (Right to Erasure)" }}
      keyPoints={[
        { icon: ShieldCheck, title: 'GDPR Right to be Forgotten', text: 'Guarantees complete deletion of personal data across all database backups.' },
        { icon: Lock, title: 'SOC2 Type II Compliance', text: 'Audits access controls, encryption standards, and disaster recovery plans.' },
        { icon: FileText, title: 'Data Residency Laws', text: 'Stores citizen data on servers geographically located within their home country.' }
      ]}
      aiDialogue="Uphold software engineering ethics! Architect GDPR-compliant data pipelines, secure SOC2 audit certifications, and protect user privacy!"
      htmlContent={props.canonicalSection?.htmlContent}
      imageSrc={props.canonicalSection?.imageSrc}
      xpReward={25}
      isCompleted={props.isCompleted}
      onComplete={props.onComplete}
      onJumpToSection={props.onJumpToSection}
      nextSectionIdx={sectionIdx + 1}
      games={[
        {
          badge: "Game 1 · Compliance Standard Matcher",
          title: "Match Regulatory Standards to Architecture Requirements",
          render: (onPass) => (
            <MatchPairStation
              pairs={[
                { id: 'cs1', left: 'GDPR Article 17', right: 'Automated Right to Erasure / Account Deletion' },
                { id: 'cs2', left: 'SOC2 Type II Trust Criteria', right: 'Audited role-based access control (RBAC) and encryption' },
                { id: 'cs3', left: 'Data Residency Mandate', right: 'Geographic restriction keeping EU data on EU servers' }
              ]}
              onAllMatched={onPass}
            />
          )
        },
        {
          badge: "Game 2 · GDPR Deletion Pipeline",
          title: "Sequence the GDPR User Deletion Cascade Pipeline",
          render: (onPass) => (
            <SequenceBuilder
              items={[
                { id: 'del1', label: '1. Ingest authenticated user GDPR account erasure request', detail: 'Request' },
                { id: 'del2', label: '2. Execute cascading deletion across relational DB, caches, and S3', detail: 'Purge' },
                { id: 'del3', label: '3. Issue cryptographic receipt confirming complete data deletion', detail: 'Confirmation' }
              ]}
              onOrderChange={(ids) => {
                if (ids[0] === 'del1' && ids[1] === 'del2' && ids[2] === 'del3') {
                  onPass()
                }
              }}
            />
          )
        },
        {
          badge: "Game 3 · Data Governance Sorter",
          title: "Sort Compliant Architecture vs Regulatory Violations",
          render: (onPass) => (
            <ClassificationSorter
              items={[
                { id: 'gov1', label: 'End-to-end encryption with zero plaintext passwords stored', bin: 'A' },
                { id: 'gov2', label: 'Secretly tracking user GPS location after they opted out', bin: 'B', hint: 'Severe privacy violation!' },
                { id: 'gov3', label: 'Enforcing multi-factor authentication (MFA) for all engineer access', bin: 'A' },
                { id: 'gov4', label: 'Retaining deleted user credit card records indefinitely in log files', bin: 'B', hint: 'PCI-DSS and GDPR violation!' }
              ]}
              binALabel="Compliant / Ethical Data Architecture"
              binBLabel="Regulatory Violation / Fine Risk"
              onComplete={onPass}
            />
          )
        }
      ]}
    />
  )
}
