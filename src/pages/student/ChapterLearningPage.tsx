import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { enrollmentService, parseGradeKeyFromClass, type GradeKey } from '../../services/progressService'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'
import { gameAudio } from '../../utils/gameAudio'
import {
  Sparkles,
  Bot,
  MessageSquare,
  Compass,
  Rocket,
  Palette,
  HeartHandshake,
  Trophy,
  ChevronRight,
} from 'lucide-react'
import { GaioInteractiveBookApp } from '../../components/gaio/GaioInteractiveBookApp'

export interface CanonicalSection {
  id: string
  sectionNumber: number
  contentType: string
  title: string
  subtitle?: string
  description: string
  estimatedMinutes: number
  xpReward: number
  videoUrl?: string
  videoDescription?: string
  htmlContent?: string
  imageSrc?: string
  imageCaption?: string
  topicTitle?: string
  canonicalType?: string
  lessonJourney?: any
  matchingPairs?: { id: string; term: string; definition: string }[]
  mcq?: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
    hint: string
  }
  workbookPrompts?: string
  flashcards?: any[]
  labChecklist?: string[]
  labStarter?: string
  assignmentBrief?: string
  assignmentMarks?: number
  quizQuestions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  quiz1Questions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  quiz2Questions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  quiz3Questions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
}

export interface ChapterGridItem {
  key: string
  code: string
  title: string
  subtitle: string
  monthNumber: number
  pageRange: string
  screenCount: number
  icon: React.ElementType
  gradient: string
  badgeColor: string
}

export const CLASS3_GRID_ITEMS: ChapterGridItem[] = [
  {
    key: 'intro',
    code: 'INTRO',
    title: 'Welcome & AI Intro',
    subtitle: 'Orientation & Tools',
    monthNumber: 0,
    pageRange: 'p. 1–4',
    screenCount: 8,
    icon: Sparkles,
    gradient: 'from-sky-500 to-blue-600',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    key: 'ch1',
    code: 'CH1',
    title: 'AI Discover',
    subtitle: 'My AI Friend & Sensors',
    monthNumber: 1,
    pageRange: 'p. 5–27',
    screenCount: 44,
    icon: Bot,
    gradient: 'from-blue-600 to-indigo-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    key: 'ch2',
    code: 'CH2',
    title: 'AI Connect',
    subtitle: 'Commands & Prompts',
    monthNumber: 2,
    pageRange: 'p. 28–50',
    screenCount: 44,
    icon: MessageSquare,
    gradient: 'from-indigo-600 to-violet-600',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    key: 'ch3',
    code: 'CH3',
    title: 'AI Solve',
    subtitle: 'School & Home Helpers',
    monthNumber: 3,
    pageRange: 'p. 51–73',
    screenCount: 44,
    icon: Compass,
    gradient: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    key: 'ch4',
    code: 'CH4',
    title: 'AI Rise',
    subtitle: 'Robots, Drones & Careers',
    monthNumber: 4,
    pageRange: 'p. 74–96',
    screenCount: 44,
    icon: Rocket,
    gradient: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    key: 'ch5',
    code: 'CH5',
    title: 'AI Create',
    subtitle: 'Art, Music & Stories',
    monthNumber: 5,
    pageRange: 'p. 97–119',
    screenCount: 44,
    icon: Palette,
    gradient: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    key: 'ch6',
    code: 'CH6',
    title: 'AI Care',
    subtitle: 'Safety & Digital Kindness',
    monthNumber: 6,
    pageRange: 'p. 120–142',
    screenCount: 44,
    icon: HeartHandshake,
    gradient: 'from-teal-500 to-cyan-600',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    key: 'finale',
    code: 'FINALE',
    title: 'Olympiad Mastery',
    subtitle: 'Challenge & Certificate',
    monthNumber: 7,
    pageRange: 'p. 143–153',
    screenCount: 14,
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
]

export const CLASS4_GRID_ITEMS: ChapterGridItem[] = [
  {
    key: 'intro',
    code: 'INTRO',
    title: 'Welcome & Robo-Pi',
    subtitle: 'Detective Orientation & Tools',
    monthNumber: 0,
    pageRange: 'p. 1–4',
    screenCount: 5,
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    key: 'ch1',
    code: 'CH1',
    title: 'AI Basics',
    subtitle: 'Where Is AI Hiding? & Smart Machines',
    monthNumber: 1,
    pageRange: 'p. 20–39',
    screenCount: 16,
    icon: Bot,
    gradient: 'from-emerald-600 to-teal-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    key: 'ch2',
    code: 'CH2',
    title: 'Communicate with AI',
    subtitle: 'Say It Clearly! & Mission Instructions',
    monthNumber: 2,
    pageRange: 'p. 40–59',
    screenCount: 16,
    icon: MessageSquare,
    gradient: 'from-blue-600 to-indigo-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    key: 'ch3',
    code: 'CH3',
    title: 'AI Applications',
    subtitle: 'AI in My Mobile & AI on the Move',
    monthNumber: 3,
    pageRange: 'p. 60–79',
    screenCount: 16,
    icon: Compass,
    gradient: 'from-sky-500 to-cyan-600',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    key: 'ch4',
    code: 'CH4',
    title: 'AI and Career',
    subtitle: 'Future Job Hunt & Technology Talent',
    monthNumber: 4,
    pageRange: 'p. 80–99',
    screenCount: 16,
    icon: Rocket,
    gradient: 'from-purple-500 to-violet-600',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    key: 'ch5',
    code: 'CH5',
    title: 'AI Tools',
    subtitle: 'Create a Story & Design with AI',
    monthNumber: 5,
    pageRange: 'p. 100–119',
    screenCount: 16,
    icon: Palette,
    gradient: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    key: 'ch6',
    code: 'CH6',
    title: 'Responsible AI',
    subtitle: 'Secret or Share? & Right or Wrong?',
    monthNumber: 6,
    pageRange: 'p. 120–139',
    screenCount: 16,
    icon: HeartHandshake,
    gradient: 'from-amber-500 to-amber-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    key: 'finale',
    code: 'FINALE',
    title: 'Olympiad Mastery',
    subtitle: 'Robo-Pi Challenge & Certificate',
    monthNumber: 7,
    pageRange: 'p. 140–152',
    screenCount: 3,
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
]

export const CLASS5_GRID_ITEMS: ChapterGridItem[] = [
  {
    key: 'intro',
    code: 'INTRO',
    title: 'Welcome & Data-Volt',
    subtitle: 'Neural Lab Orientation',
    monthNumber: 0,
    pageRange: 'p. 1–4',
    screenCount: 5,
    icon: Sparkles,
    gradient: 'from-violet-600 to-indigo-600',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  {
    key: 'ch1',
    code: 'CH1',
    title: 'AI Basics',
    subtitle: 'Secret Behind AI & Learning Machines',
    monthNumber: 1,
    pageRange: 'p. 20–39',
    screenCount: 16,
    icon: Bot,
    gradient: 'from-indigo-600 to-cyan-600',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    key: 'ch2',
    code: 'CH2',
    title: 'Communicate with AI',
    subtitle: 'Crack the Logic! & Command to Creation',
    monthNumber: 2,
    pageRange: 'p. 40–59',
    screenCount: 16,
    icon: MessageSquare,
    gradient: 'from-blue-600 to-teal-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    key: 'ch3',
    code: 'CH3',
    title: 'AI Applications',
    subtitle: 'Hospital AI & Classroom AI',
    monthNumber: 3,
    pageRange: 'p. 60–79',
    screenCount: 16,
    icon: Compass,
    gradient: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    key: 'ch4',
    code: 'CH4',
    title: 'AI and Career',
    subtitle: 'Future with AI & Skills of Tomorrow',
    monthNumber: 4,
    pageRange: 'p. 80–99',
    screenCount: 16,
    icon: Rocket,
    gradient: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    key: 'ch5',
    code: 'CH5',
    title: 'AI Tools',
    subtitle: 'AI Study Buddy & Creative Corner',
    monthNumber: 5,
    pageRange: 'p. 100–119',
    screenCount: 16,
    icon: Palette,
    gradient: 'from-pink-500 to-rose-600',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
  },
  {
    key: 'ch6',
    code: 'CH6',
    title: 'Responsible AI',
    subtitle: 'Can AI Be Wrong? & Smart AI User',
    monthNumber: 6,
    pageRange: 'p. 120–139',
    screenCount: 16,
    icon: HeartHandshake,
    gradient: 'from-cyan-600 to-blue-600',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  {
    key: 'finale',
    code: 'FINALE',
    title: 'Olympiad Mastery',
    subtitle: 'Data-Volt Championship & Certificate',
    monthNumber: 7,
    pageRange: 'p. 140–152',
    screenCount: 3,
    icon: Trophy,
    gradient: 'from-amber-500 to-yellow-500',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
]

export const CHAPTER_GRID_ITEMS = CLASS3_GRID_ITEMS

// ─── Middle Level Grid Items (Class 6–8) ───
export const CLASS6_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & Algo', subtitle: 'Computational Thinking Orientation', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-teal-600 to-emerald-600', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
  { key: 'ch1', code: 'CH1', title: 'How Machines Get Smart', subtitle: 'Learning from Examples & Features', monthNumber: 1, pageRange: 'p. 20–39', screenCount: 16, icon: Bot, gradient: 'from-emerald-600 to-teal-600', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'ch2', code: 'CH2', title: 'Think → Plan → Code', subtitle: 'Coding Made Friendly in Python', monthNumber: 2, pageRange: 'p. 40–59', screenCount: 16, icon: MessageSquare, gradient: 'from-blue-600 to-indigo-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch3', code: 'CH3', title: 'AI on the Road & Farm', subtitle: 'Smart Cities & Automated Agriculture', monthNumber: 3, pageRange: 'p. 60–79', screenCount: 16, icon: Compass, gradient: 'from-sky-500 to-cyan-600', badgeColor: 'bg-sky-50 text-sky-700 border-sky-200' },
  { key: 'ch4', code: 'CH4', title: 'Explore Tech Careers', subtitle: 'Discover Your Skills & Data Science', monthNumber: 4, pageRange: 'p. 80–99', screenCount: 16, icon: Rocket, gradient: 'from-purple-500 to-violet-600', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'ch5', code: 'CH5', title: 'AI Learning Lab', subtitle: 'Prompt Engineering & Creation', monthNumber: 5, pageRange: 'p. 100–119', screenCount: 16, icon: Palette, gradient: 'from-rose-500 to-pink-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch6', code: 'CH6', title: 'Protect Your Data', subtitle: 'Cybersecurity & Ethical AI', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-amber-500 to-amber-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'finale', code: 'FINALE', title: 'Olympiad Mastery', subtitle: 'Algo Championship & Certificate', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

export const CLASS7_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & Pythia', subtitle: 'Data Logic Orientation', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-blue-600 to-indigo-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch1', code: 'CH1', title: 'AI Learns from Data', subtitle: 'Patterns Make It Smart', monthNumber: 1, pageRange: 'p. 20–39', screenCount: 16, icon: Bot, gradient: 'from-blue-600 to-cyan-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch2', code: 'CH2', title: 'Hello, Python!', subtitle: 'Code Your First Idea & Structures', monthNumber: 2, pageRange: 'p. 40–59', screenCount: 16, icon: MessageSquare, gradient: 'from-indigo-600 to-blue-600', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'ch3', code: 'CH3', title: 'AI in Money Matters', subtitle: 'AI for a Greener World', monthNumber: 3, pageRange: 'p. 60–79', screenCount: 16, icon: Compass, gradient: 'from-emerald-500 to-teal-600', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'ch4', code: 'CH4', title: 'Career Compass: AI', subtitle: 'Skills That Matter in Engineering', monthNumber: 4, pageRange: 'p. 80–99', screenCount: 16, icon: Rocket, gradient: 'from-purple-500 to-pink-600', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'ch5', code: 'CH5', title: 'AI Content Creator', subtitle: 'Chatbots & Conversational Agents', monthNumber: 5, pageRange: 'p. 100–119', screenCount: 16, icon: Palette, gradient: 'from-rose-500 to-orange-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch6', code: 'CH6', title: 'Fact, Fake or AI?', subtitle: 'Algorithmic Fairness & Deepfakes', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-amber-500 to-yellow-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'finale', code: 'FINALE', title: 'Olympiad Mastery', subtitle: 'Pythia Championship & Certificate', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

export const CLASS8_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & Neural', subtitle: 'Applied AI Orientation', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-violet-600 to-purple-600', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200' },
  { key: 'ch1', code: 'CH1', title: 'How AI Makes Choices', subtitle: 'Supervised vs Unsupervised Learning', monthNumber: 1, pageRange: 'p. 20–39', screenCount: 16, icon: Bot, gradient: 'from-purple-600 to-indigo-600', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'ch2', code: 'CH2', title: 'Python Playground', subtitle: 'Code Solutions & Modular Logic', monthNumber: 2, pageRange: 'p. 40–59', screenCount: 16, icon: MessageSquare, gradient: 'from-blue-600 to-teal-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch3', code: 'CH3', title: 'AI for Better Health', subtitle: 'Diagnostic Imaging & Smart Cities', monthNumber: 3, pageRange: 'p. 60–79', screenCount: 16, icon: Compass, gradient: 'from-emerald-500 to-cyan-600', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'ch4', code: 'CH4', title: 'Find Your Future Path', subtitle: 'Cloud AI & Data Infrastructure', monthNumber: 4, pageRange: 'p. 80–99', screenCount: 16, icon: Rocket, gradient: 'from-amber-500 to-orange-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'ch5', code: 'CH5', title: 'Build with GenAI', subtitle: 'Diffusion Models & Media Studio', monthNumber: 5, pageRange: 'p. 100–119', screenCount: 16, icon: Palette, gradient: 'from-rose-500 to-pink-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch6', code: 'CH6', title: 'Deepfake Alert!', subtitle: 'Provenance, Rights & Watermarking', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-cyan-600 to-blue-600', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { key: 'finale', code: 'FINALE', title: 'Olympiad Mastery', subtitle: 'Neural Championship & Certificate', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

// ─── Secondary Level Grid Items (Class 9–12) ───
export const CLASS9_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & Data Scientist', subtitle: 'Orientation & Tools', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-cyan-600 to-teal-600', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { key: 'ch1', code: 'CH1', title: 'Data Intelligence', subtitle: 'Prediction & Decision Trees', monthNumber: 1, pageRange: 'p. 5–27', screenCount: 16, icon: Bot, gradient: 'from-teal-600 to-emerald-600', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
  { key: 'ch2', code: 'CH2', title: 'Python Practicals', subtitle: 'NumPy & DataFrames', monthNumber: 2, pageRange: 'p. 28–50', screenCount: 16, icon: MessageSquare, gradient: 'from-blue-600 to-indigo-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch3', code: 'CH3', title: 'AI for Society', subtitle: 'Planet & Public Good', monthNumber: 3, pageRange: 'p. 51–73', screenCount: 16, icon: Compass, gradient: 'from-green-500 to-emerald-600', badgeColor: 'bg-green-50 text-green-700 border-green-200' },
  { key: 'ch4', code: 'CH4', title: 'AI Careers', subtitle: 'Research & Product Paths', monthNumber: 4, pageRange: 'p. 74–96', screenCount: 16, icon: Rocket, gradient: 'from-violet-500 to-purple-600', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200' },
  { key: 'ch5', code: 'CH5', title: 'AI Creator Studio', subtitle: 'Bias, Variance & Models', monthNumber: 5, pageRange: 'p. 97–119', screenCount: 16, icon: Palette, gradient: 'from-rose-500 to-pink-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch6', code: 'CH6', title: 'Responsible AI', subtitle: 'Privacy & GDPR', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-amber-500 to-orange-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'finale', code: 'FINALE', title: 'Olympiad Mastery', subtitle: 'Challenge & Certificate', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

export const CLASS10_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & ML Engineer', subtitle: 'Orientation & Setup', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-indigo-600 to-blue-600', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'ch1', code: 'CH1', title: 'Neural Networks', subtitle: 'AI Thinks & Generative AI', monthNumber: 1, pageRange: 'p. 5–27', screenCount: 16, icon: Bot, gradient: 'from-blue-700 to-violet-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch2', code: 'CH2', title: 'AI Coding Lab', subtitle: 'Test, Refactor & Automate', monthNumber: 2, pageRange: 'p. 28–50', screenCount: 16, icon: MessageSquare, gradient: 'from-emerald-600 to-teal-600', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'ch3', code: 'CH3', title: 'AI at Work', subtitle: 'Autonomous & Edge Systems', monthNumber: 3, pageRange: 'p. 51–73', screenCount: 16, icon: Compass, gradient: 'from-sky-500 to-cyan-600', badgeColor: 'bg-sky-50 text-sky-700 border-sky-200' },
  { key: 'ch4', code: 'CH4', title: 'Career Launchpad', subtitle: 'GitHub & Open Source', monthNumber: 4, pageRange: 'p. 74–96', screenCount: 16, icon: Rocket, gradient: 'from-rose-600 to-pink-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch5', code: 'CH5', title: 'AI Projects', subtitle: 'Streamlit Web Prototypes', monthNumber: 5, pageRange: 'p. 97–119', screenCount: 16, icon: Palette, gradient: 'from-purple-500 to-indigo-600', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'ch6', code: 'CH6', title: 'Ethics & IP', subtitle: 'Copyright & Attribution', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-amber-500 to-yellow-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'finale', code: 'FINALE', title: 'Board Exam Ready', subtitle: 'Challenge & Certificate', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

export const CLASS11_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & Neural Forge', subtitle: 'Orientation & Setup', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-violet-700 to-purple-600', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200' },
  { key: 'ch1', code: 'CH1', title: 'Intelligent Machines', subtitle: 'Perceptrons & Backprop', monthNumber: 1, pageRange: 'p. 5–27', screenCount: 16, icon: Bot, gradient: 'from-purple-700 to-indigo-600', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'ch2', code: 'CH2', title: 'PyTorch Lab', subtitle: 'Tensors & Loss Functions', monthNumber: 2, pageRange: 'p. 28–50', screenCount: 16, icon: MessageSquare, gradient: 'from-blue-600 to-sky-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch3', code: 'CH3', title: 'AI Across Industries', subtitle: 'Maintenance & Supply Chain', monthNumber: 3, pageRange: 'p. 51–73', screenCount: 16, icon: Compass, gradient: 'from-emerald-600 to-green-600', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'ch4', code: 'CH4', title: 'AI Career Universe', subtitle: 'MLOps & Full-Stack AI', monthNumber: 4, pageRange: 'p. 74–96', screenCount: 16, icon: Rocket, gradient: 'from-rose-500 to-red-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch5', code: 'CH5', title: 'Research Desk', subtitle: 'Fine-Tuning Open LLMs', monthNumber: 5, pageRange: 'p. 97–119', screenCount: 16, icon: Palette, gradient: 'from-teal-600 to-cyan-600', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
  { key: 'ch6', code: 'CH6', title: 'Fair & Private AI', subtitle: 'Differential Privacy', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-amber-500 to-orange-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'finale', code: 'FINALE', title: 'Olympiad Mastery', subtitle: 'Challenge & Certificate', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

export const CLASS12_GRID_ITEMS: ChapterGridItem[] = [
  { key: 'intro', code: 'INTRO', title: 'Welcome & Transformer', subtitle: 'Orientation & Setup', monthNumber: 0, pageRange: 'p. 1–4', screenCount: 5, icon: Sparkles, gradient: 'from-slate-700 to-blue-700', badgeColor: 'bg-slate-50 text-slate-700 border-slate-200' },
  { key: 'ch1', code: 'CH1', title: 'Generative AI & LLMs', subtitle: 'Self-Attention Mechanisms', monthNumber: 1, pageRange: 'p. 5–27', screenCount: 16, icon: Bot, gradient: 'from-blue-700 to-indigo-700', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'ch2', code: 'CH2', title: 'AI Workflows', subtitle: 'Chain-of-Thought Agents', monthNumber: 2, pageRange: 'p. 28–50', screenCount: 16, icon: MessageSquare, gradient: 'from-indigo-700 to-violet-600', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'ch3', code: 'CH3', title: 'Enterprise AI', subtitle: 'Vector Databases & RAG', monthNumber: 3, pageRange: 'p. 51–73', screenCount: 16, icon: Compass, gradient: 'from-emerald-600 to-teal-600', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'ch4', code: 'CH4', title: 'AI Launchpad', subtitle: 'GitHub & Research', monthNumber: 4, pageRange: 'p. 74–96', screenCount: 16, icon: Rocket, gradient: 'from-rose-600 to-pink-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'ch5', code: 'CH5', title: 'AI Project Studio', subtitle: 'Deploy ONNX Models', monthNumber: 5, pageRange: 'p. 97–119', screenCount: 16, icon: Palette, gradient: 'from-amber-600 to-orange-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'ch6', code: 'CH6', title: 'XAI & Trust', subtitle: 'Explainable & Interpretable AI', monthNumber: 6, pageRange: 'p. 120–139', screenCount: 16, icon: HeartHandshake, gradient: 'from-teal-500 to-cyan-600', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
  { key: 'finale', code: 'FINALE', title: 'Board Mastery', subtitle: 'Final Challenge & Cert', monthNumber: 7, pageRange: 'p. 140–152', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

// ─── Higher Level Grid Items (UG & PG) ───
const HIGHER_GRID_BASE: Omit<ChapterGridItem, 'key' | 'code' | 'title' | 'subtitle'>[] = [
  { monthNumber: 0, pageRange: 'Module 0', screenCount: 5, icon: Sparkles, gradient: 'from-slate-700 to-indigo-800', badgeColor: 'bg-slate-50 text-slate-700 border-slate-200' },
  { monthNumber: 1, pageRange: 'Module 1', screenCount: 16, icon: Bot, gradient: 'from-indigo-700 to-blue-700', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { monthNumber: 2, pageRange: 'Module 2', screenCount: 16, icon: MessageSquare, gradient: 'from-blue-700 to-cyan-600', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { monthNumber: 3, pageRange: 'Module 3', screenCount: 16, icon: Compass, gradient: 'from-teal-600 to-emerald-600', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
  { monthNumber: 4, pageRange: 'Module 4', screenCount: 16, icon: Rocket, gradient: 'from-violet-600 to-purple-700', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200' },
  { monthNumber: 5, pageRange: 'Module 5', screenCount: 16, icon: Palette, gradient: 'from-rose-600 to-pink-600', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
  { monthNumber: 6, pageRange: 'Module 6', screenCount: 16, icon: HeartHandshake, gradient: 'from-amber-600 to-orange-600', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  { monthNumber: 7, pageRange: 'Module 7', screenCount: 3, icon: Trophy, gradient: 'from-amber-500 to-yellow-500', badgeColor: 'bg-amber-50 text-amber-800 border-amber-200' },
]

const UG_TITLES = [
  ['INTRO', 'Orientation', 'Getting Started'],
  ['MOD1', 'AI Foundations', 'Computational Graphs'],
  ['MOD2', 'Python + Prompting', 'Function Calling & JSON'],
  ['MOD3', 'Real-World AI', 'Distributed Serving'],
  ['MOD4', 'AI Careers', 'Production Readiness'],
  ['MOD5', 'AI Workbench', 'Synthetic Data & Augmentation'],
  ['MOD6', 'Responsible AI', 'Governance Frameworks'],
  ['FINALE', 'Certification', 'Portfolio & Award'],
]

export const UG1_GRID_ITEMS: ChapterGridItem[] = HIGHER_GRID_BASE.map((b, i) => ({
  ...b, key: UG_TITLES[i][0].toLowerCase() === 'intro' ? 'intro' : UG_TITLES[i][0].toLowerCase() === 'finale' ? 'finale' : `ch${i}`, code: UG_TITLES[i][0], title: UG_TITLES[i][1], subtitle: UG_TITLES[i][2],
}))

const PG_TITLES = [
  ['INTRO', 'Orientation', 'Getting Started'],
  ['MOD1', 'Modern Intelligence', 'Non-Convex Optimization'],
  ['MOD2', 'Smart Workflows', 'RLHF & DPO'],
  ['MOD3', 'Advanced Research', 'Diffusion Models'],
  ['MOD4', 'AI Specialist', 'Conference Manuscripts'],
  ['MOD5', 'Research Workbench', 'Ablation & Significance'],
  ['MOD6', 'Transparent AI', 'Mechanistic Interpretability'],
  ['FINALE', 'Dissertation', 'Research Defense & Award'],
]

export const PG1_GRID_ITEMS: ChapterGridItem[] = HIGHER_GRID_BASE.map((b, i) => ({
  ...b, key: PG_TITLES[i][0].toLowerCase() === 'intro' ? 'intro' : PG_TITLES[i][0].toLowerCase() === 'finale' ? 'finale' : `ch${i}`, code: PG_TITLES[i][0], title: PG_TITLES[i][1], subtitle: PG_TITLES[i][2],
}))

const GRADE_TRACK_INFO: Record<GradeKey, { name: string; subjectName: string; mascot: string; theme: { dot: string; badge: string } }> = {
  class3: { name: 'Class 3', subjectName: 'Junior AI & Playful Logic', mascot: 'Bolt ⚡', theme: { dot: 'bg-sky-500', badge: 'bg-sky-50 text-sky-700 border-sky-200' } },
  class4: { name: 'Class 4', subjectName: 'Elementary AI & Algorithmic Patterns', mascot: 'Robo-Pi 🤖', theme: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' } },
  class5: { name: 'Class 5', subjectName: 'Foundations of Smart Computing', mascot: 'Data-Volt ⚡', theme: { dot: 'bg-purple-500', badge: 'bg-purple-50 text-purple-700 border-purple-200' } },
  class6: { name: 'Class 6', subjectName: 'Middle School AI & Computational Thinking', mascot: 'Algo 🧠', theme: { dot: 'bg-teal-500', badge: 'bg-teal-50 text-teal-700 border-teal-200' } },
  class7: { name: 'Class 7', subjectName: 'Data Logic & Python Foundations', mascot: 'Pythia 🐍', theme: { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' } },
  class8: { name: 'Class 8', subjectName: 'Applied AI Thinking & Python Coding', mascot: 'Neural 🕸️', theme: { dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200' } },
  class9: { name: 'Class 9', subjectName: 'Applied AI & Statistical Learning', mascot: 'DataBot 📊', theme: { dot: 'bg-cyan-600', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200' } },
  class10: { name: 'Class 10', subjectName: 'ML Foundations & Python Engineering', mascot: 'Perceptron 🔮', theme: { dot: 'bg-indigo-600', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' } },
  class11: { name: 'Class 11', subjectName: 'Mathematical Foundations of ML', mascot: 'Tensor 🔥', theme: { dot: 'bg-violet-600', badge: 'bg-violet-50 text-violet-700 border-violet-200' } },
  class12: { name: 'Class 12', subjectName: 'Deep Learning, Transformers & GenAI', mascot: 'Transformer ✨', theme: { dot: 'bg-slate-600', badge: 'bg-slate-50 text-slate-700 border-slate-200' } },
  ug1: { name: 'UG 1st Year', subjectName: 'Computational AI & Data Science Engineering', mascot: 'Grad 🎓', theme: { dot: 'bg-blue-700', badge: 'bg-blue-50 text-blue-800 border-blue-200' } },
  ug2: { name: 'UG 2nd Year', subjectName: 'Classical ML & Applied Statistical Models', mascot: 'Scholar 📚', theme: { dot: 'bg-indigo-700', badge: 'bg-indigo-50 text-indigo-800 border-indigo-200' } },
  ug3: { name: 'UG 3rd Year', subjectName: 'Deep Learning, NLP & LLM Engineering', mascot: 'Architect 🏗️', theme: { dot: 'bg-violet-700', badge: 'bg-violet-50 text-violet-800 border-violet-200' } },
  ug4: { name: 'UG Final Year', subjectName: 'Autonomous AI Agents & Scalable Systems', mascot: 'Captain 🚀', theme: { dot: 'bg-purple-700', badge: 'bg-purple-50 text-purple-800 border-purple-200' } },
  pg1: { name: 'PG 1st Year', subjectName: 'Advanced ML Theory & Statistical Optimization', mascot: 'Researcher 🔬', theme: { dot: 'bg-rose-700', badge: 'bg-rose-50 text-rose-800 border-rose-200' } },
  pg2: { name: 'PG Final Year', subjectName: 'Frontiers of AI & Research Dissertation', mascot: 'Professor 🧑‍🔬', theme: { dot: 'bg-amber-700', badge: 'bg-amber-50 text-amber-800 border-amber-200' } },
}

export default function ChapterLearningPage() {
  const { chapterId, itemId } = useParams<{ chapterId?: string; itemId?: string }>()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  // 1. Database-bound assigned grade state (initialized from fast local cache, verified from DB)
  const [assignedGrade, setAssignedGrade] = useState<GradeKey>(() => {
    if (user?.id) {
      try {
        const stored = localStorage.getItem(`nanjil_active_class_${user.id}`)
        if (stored) return parseGradeKeyFromClass(JSON.parse(stored))
        const enrStored = localStorage.getItem(`nanjil_enrollment_${user.id}`)
        if (enrStored) {
          const parsed = JSON.parse(enrStored)
          const enr = Array.isArray(parsed) ? parsed[0] : parsed
          if (enr) return parseGradeKeyFromClass(enr.class || enr.class_id)
        }
      } catch {}
    }
    return 'class3'
  })

  const [assignedClassInfo, setAssignedClassInfo] = useState<{
    className: string
    subjectName: string
    mascot: string
  }>(() => {
    const meta = GRADE_TRACK_INFO[assignedGrade] || GRADE_TRACK_INFO['class3']
    return {
      className: meta.name,
      subjectName: meta.subjectName,
      mascot: meta.mascot,
    }
  })

  // 2. Dynamically fetch and lock to the logged-in student's database class assignment
  useEffect(() => {
    let isMounted = true

    const syncStudentClass = async () => {
      if (!user?.id) return
      try {
        const res = await enrollmentService.getStudentAssignedGrade(user.id, user.organization_id)
        if (isMounted) {
          setAssignedGrade(res.gradeKey)
          const meta = GRADE_TRACK_INFO[res.gradeKey] || GRADE_TRACK_INFO['class3']
          setAssignedClassInfo({
            className: res.className || meta.name,
            subjectName: res.subjectName || meta.subjectName,
            mascot: meta.mascot,
          })
        }
      } catch (err) {
        console.warn('Failed to resolve student assigned class:', err)
      }
    }

    syncStudentClass()

    const handleEnrollmentUpdate = () => {
      syncStudentClass()
    }

    window.addEventListener('student_enrollment_updated', handleEnrollmentUpdate)
    window.addEventListener('storage', handleEnrollmentUpdate)
    window.addEventListener('focus', handleEnrollmentUpdate)

    return () => {
      isMounted = false
      window.removeEventListener('student_enrollment_updated', handleEnrollmentUpdate)
      window.removeEventListener('storage', handleEnrollmentUpdate)
      window.removeEventListener('focus', handleEnrollmentUpdate)
    }
  }, [user?.id, user?.organization_id])

  // 3. Filter grid items strictly according to the student's assigned database class
  const currentGridItems = useMemo(() => {
    if (assignedGrade === 'class4') return CLASS4_GRID_ITEMS
    if (assignedGrade === 'class5') return CLASS5_GRID_ITEMS
    if (assignedGrade === 'class6') return CLASS6_GRID_ITEMS
    if (assignedGrade === 'class7') return CLASS7_GRID_ITEMS
    if (assignedGrade === 'class8') return CLASS8_GRID_ITEMS
    // Secondary level
    if (assignedGrade === 'class9') return CLASS9_GRID_ITEMS
    if (assignedGrade === 'class10') return CLASS10_GRID_ITEMS
    if (assignedGrade === 'class11') return CLASS11_GRID_ITEMS
    if (assignedGrade === 'class12') return CLASS12_GRID_ITEMS
    // Higher education (UG/PG): all use the same higher grid structure
    if (assignedGrade === 'ug1' || assignedGrade === 'ug2' || assignedGrade === 'ug3' || assignedGrade === 'ug4') return UG1_GRID_ITEMS
    if (assignedGrade === 'pg1' || assignedGrade === 'pg2') return PG1_GRID_ITEMS
    return CLASS3_GRID_ITEMS
  // 4. Resolve which of the 8 items is requested
  const resolvedItemKey = useMemo(() => {
    const raw = itemId || searchParams.get('item')
    if (raw) {
      const match = currentGridItems.find(
        (i) => i.key === raw.toLowerCase() || i.code.toLowerCase() === raw.toLowerCase()
      )
      if (match) return match.key
    }
    if (chapterId) {
      const lower = chapterId.toLowerCase()
      if (lower === 'chapters' || lower === 'select') return null
      const match = currentGridItems.find(
        (i) => i.key === lower || i.code.toLowerCase() === lower
      )
      if (match) return match.key

      // Legacy, category, and numeric chapter URL mappings
      if (lower.startsWith('cat-class4-') || lower.startsWith('cat-class5-') || lower.startsWith('cat-class3-')) {
        const numPart = lower.split('-')[2]
        if (numPart === '0') return 'intro'
        if (numPart === '7') return 'finale'
        return `ch${numPart}`
      }
      if (lower === '1' || lower === 'chapter-1') return 'ch1'
      if (lower === '2' || lower === 'chapter-2') return 'ch2'
      if (lower === '3' || lower === 'chapter-3') return 'ch3'
      if (lower === '4' || lower === 'chapter-4') return 'ch4'
      if (lower === '5' || lower === 'chapter-5') return 'ch5'
      if (lower === '6' || lower === 'chapter-6') return 'ch6'
      if (lower === '0' || lower === 'chapter-0') return 'intro'
      if (lower === '7' || lower === 'chapter-7') return 'finale'
    }
    return null
  }, [chapterId, itemId, searchParams, currentGridItems])

  // ─── CASE A: CHAPTER SELECTION SCREEN ───
  // Displays Locked Enrolled Track Banner + the 8 items for the assigned class only.
  // No switcher buttons are displayed: each student sees only their own assigned class.
  if (!resolvedItemKey) {
    const handleNavigateChapter = (itemKey: string, e?: React.SyntheticEvent) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      gameAudio.playTap()
      navigate(`/student/learning/chapters/${itemKey}`)
    }

    const currentTrackTheme = (GRADE_TRACK_INFO[assignedGrade] || GRADE_TRACK_INFO['class3']).theme

    return (
      <AppLayout>
        <div className="w-full h-full max-h-full flex-1 flex flex-col items-center justify-start sm:justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto overflow-x-hidden pb-24 lg:pb-6">
          {/* Locked Assigned Class Indicator (Strictly reflects the student's database class assignment) */}
          <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 px-3.5 sm:px-4 bg-white/95 rounded-2xl border border-slate-200/90 shadow-2xs mb-2.5 sm:mb-4 max-w-lg w-full shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${currentTrackTheme.dot} animate-pulse`} />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                  Enrolled Class Track
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-800 truncate">
                  {assignedClassInfo.className} · {assignedClassInfo.subjectName}
                </span>
              </div>
            </div>
            <span className={`text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-xl border ${currentTrackTheme.badge} shrink-0`}>
              {assignedClassInfo.mascot}
            </span>
          </div>

          {/* Neat, Modern 8-Item Chapter Grid — 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 w-full max-w-5xl mx-auto my-auto min-h-0">
            {currentGridItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.key}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => handleNavigateChapter(item.key, e)}
                  onTouchEnd={(e) => handleNavigateChapter(item.key, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleNavigateChapter(item.key)
                    }
                  }}
                  className="group p-2.5 sm:p-3.5 lg:p-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-blue-500 hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30 transition-all duration-150 flex flex-col justify-between cursor-pointer pointer-events-auto touch-manipulation min-h-[96px] sm:min-h-[115px] relative shadow-2xs select-none"
                  aria-label={`Open Chapter ${item.code}: ${item.title}`}
                >
                  <div className="flex items-center justify-between gap-1 w-full pointer-events-none">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${item.gradient} shadow-2xs group-hover:scale-105 transition-transform shrink-0`}
                    >
                      <Icon size={14} className="stroke-[2.5]" />
                    </div>
                    <span
                      className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${item.badgeColor}`}
                    >
                      {item.code}
                    </span>
                  </div>

                  <div className="min-w-0 w-full my-auto py-1 pointer-events-none">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate leading-tight mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-400 font-semibold pointer-events-none">
                    <span className="font-mono">{item.pageRange}</span>
                    <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Open</span>
                      <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </AppLayout>
    )
  }

  // ─── CASE B: SEPARATE SCREEN FOR EACH CHAPTER (INTRO, CH1, CH2, CH3, CH4, CH5, CH6, FINALE) ───
  // Once a chapter is selected, hide the chapter grid completely and show only the selected chapter's page.
  // Working Back to Chapters button returns to the chapter selection screen.
  const activeItem = currentGridItems.find((i) => i.key === resolvedItemKey) || currentGridItems[0]
  return (
    <AppLayout>
      <div className="w-full h-full max-h-full flex-1 flex flex-col items-center justify-center min-h-0 bg-slate-900/5 overflow-hidden p-1 sm:p-2">
        <GaioInteractiveBookApp
          gradeKey={assignedGrade}
          scopedMonth={activeItem.monthNumber}
          chapterNumber={activeItem.code}
          chapterTitle={activeItem.title}
          studentName={user?.profile?.full_name || 'Super Student'}
          onExit={() => navigate('/student/learning/chapters')}
          onComplete={() => {
            toast.success(`🎉 You completed ${activeItem.code}: ${activeItem.title}!`)
          }}
        />
      </div>
    </AppLayout>
  )
}
