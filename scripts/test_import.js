// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT: BUILD FULL CURRICULUM TOPIC REGISTRY (ALL 192 TOPICS)
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'

// Topic definitions generator with domain-specific knowledge
import { SYLLABUS_SPECS } from '../src/services/curriculumData.ts'
