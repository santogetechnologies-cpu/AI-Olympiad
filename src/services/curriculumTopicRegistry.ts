// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE CURRICULUM TOPIC REGISTRY & DOMAIN SYNTHESIZER
// 192 Distinct Topics across 16 Academic Levels (Class 3 to PG Final Year)
// Real, researched educational information, specific analogies, code, and quizzes
// ZERO generic boilerplate or template filler
// ─────────────────────────────────────────────────────────────────────────────

import { CLASS3_TOPIC_PROFILES } from './curriculumTopicProfilesClass3'
import { CLASS4_TOPIC_PROFILES } from './curriculumTopicProfilesClass4'
import { CLASS5_TOPIC_PROFILES } from './curriculumTopicProfilesClass5'
import { CLASS6_TOPIC_PROFILES } from './curriculumTopicProfilesClass6'
import { CLASS7_TOPIC_PROFILES } from './curriculumTopicProfilesClass7'
import { CLASS8_TOPIC_PROFILES } from './curriculumTopicProfilesClass8'
import { CLASS9_TOPIC_PROFILES } from './curriculumTopicProfilesClass9'
import { CLASS10_TOPIC_PROFILES } from './curriculumTopicProfilesClass10'
import { CLASS11_TOPIC_PROFILES } from './curriculumTopicProfilesClass11'
import { CLASS12_TOPIC_PROFILES } from './curriculumTopicProfilesClass12'
import { HIGHER_TOPIC_PROFILES } from './curriculumTopicProfilesHigher'

export interface TopicProfile {
  title: string
  hook: string
  goal: string
  learnPoints: string[]
  analogy: string
  explanationHtml: string
  step1: { title: string; desc: string; detail: string; code?: string }
  step2: { title: string; desc: string; detail: string; code?: string }
  step3: { title: string; desc: string; detail: string; code?: string }
  realScenario: string
  useCases: string[]
  simCode?: string
  simOutput?: string
  pairs: { id: string; term: string; definition: string }[]
  practice: {
    question?: string
    q?: string
    options?: string[]
    opts?: string[]
    correctIndex?: number
    correct?: number
    explanation?: string
    exp?: string
    hint: string
  }
  quizzes: {
    question?: string
    q?: string
    options?: { text: string; isCorrect: boolean }[]
    opts?: { text: string; isCorrect: boolean }[]
    explanation?: string
    exp?: string
  }[]
  practicalTask: {
    title: string
    objective: string
    steps: string[]
    expectedResult: string
  }
  recall: {
    question?: string
    q?: string
    answer?: string
    a?: string
  }
  takeaways: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSOLIDATED TOPIC REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN_TOPIC_REGISTRY: Record<string, TopicProfile> = {
  ...CLASS3_TOPIC_PROFILES,
  ...CLASS4_TOPIC_PROFILES,
  ...CLASS5_TOPIC_PROFILES,
  ...CLASS6_TOPIC_PROFILES,
  ...CLASS7_TOPIC_PROFILES,
  ...CLASS8_TOPIC_PROFILES,
  ...CLASS9_TOPIC_PROFILES,
  ...CLASS10_TOPIC_PROFILES,
  ...CLASS11_TOPIC_PROFILES,
  ...CLASS12_TOPIC_PROFILES,
  ...HIGHER_TOPIC_PROFILES,
}

// Build a normalized lookup table for robust case/punctuation matching
const NORMALIZED_REGISTRY: Record<string, TopicProfile> = {}
for (const [key, profile] of Object.entries(DOMAIN_TOPIC_REGISTRY)) {
  const normKey = normalizeTopicKey(key)
  NORMALIZED_REGISTRY[normKey] = profile
  if (profile.title) {
    NORMALIZED_REGISTRY[normalizeTopicKey(profile.title)] = profile
  }
}

function normalizeTopicKey(k: string): string {
  return k.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ACCESSOR FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export function getCurriculumTopicProfile(topicTitle: string): TopicProfile {
  if (!topicTitle) {
    return DOMAIN_TOPIC_REGISTRY['Meet My AI Friend']
  }

  // 1. Direct key lookup
  if (DOMAIN_TOPIC_REGISTRY[topicTitle]) {
    return DOMAIN_TOPIC_REGISTRY[topicTitle]
  }

  // 2. Normalized key lookup
  const norm = normalizeTopicKey(topicTitle)
  if (NORMALIZED_REGISTRY[norm]) {
    return NORMALIZED_REGISTRY[norm]
  }

  // 3. Substring matching in normalized keys
  for (const [nKey, profile] of Object.entries(NORMALIZED_REGISTRY)) {
    if (nKey.includes(norm) || norm.includes(nKey)) {
      return profile
    }
  }

  // 4. Word boundary matching
  const queryWords = topicTitle.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  for (const [key, profile] of Object.entries(DOMAIN_TOPIC_REGISTRY)) {
    const keyLower = key.toLowerCase()
    if (queryWords.some(w => keyLower.includes(w))) {
      return profile
    }
  }

  // Fallback to first available high-quality profile
  return DOMAIN_TOPIC_REGISTRY['How AI Thinks with Data'] || DOMAIN_TOPIC_REGISTRY['Meet My AI Friend']
}
