import React from 'react'
import {
  X, Lightbulb, Compass, CheckCircle2, Terminal, HelpCircle,
  Sparkles, ArrowRight, Zap, BookOpen, Layers
} from 'lucide-react'
import type { HigherEdScreenItem, HigherEdLevelKey } from './types'
import { KindergartenExplainerService } from '../../services/kindergartenExplainerService'

export interface HigherEdMentorDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentScreen: HigherEdScreenItem
  levelKey: HigherEdLevelKey
  levelName: string
  chapterNum: number
  chapterTitle: string
  lessonNum: number
  lessonTitle: string
}

export const HigherEdMentorDrawer: React.FC<HigherEdMentorDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  levelKey,
  levelName,
  chapterNum,
  chapterTitle,
  lessonNum,
  lessonTitle
}) => {
  if (!isOpen) return null

  // Screen-specific guided explanations
  const getScreenGuidance = () => {
    switch (currentScreen.screenType) {
      case 'briefing':
        return {
          badge: 'Stage 1: Concept & Foundations',
          whatIsThis: 'This is your Executive Briefing. Think of this as the "Mission Blueprint" that gives you the core idea, the mathematical formula, and real-world benchmarks before you touch any code.',
          visualSteps: [
            'Read the Core Concept: notice the plain-English definition at the top.',
            'Review the Mathematical Foundation: don\'t let the Greek letters scare you — each symbol simply represents inputs, weights, or probability.',
            'Check the Real-World Benchmark: see how companies like OpenAI, Meta, or DeepMind use this exact concept in production.'
          ],
          activityTodo: 'Click "Next: System Architecture" to see the visual diagram of how data flows through this system.',
          proTip: 'In AI Olympiad exams, questions test WHY an equation is designed this way rather than asking you to calculate numbers by hand!'
        }
      case 'architecture':
        return {
          badge: 'Stage 2: System Architecture',
          whatIsThis: 'This is the visual blueprint of the AI engine. Rather than looking at code, you see how components (like tokenizers, attention layers, caches) connect together.',
          visualSteps: [
            'Click each component node in the diagram (e.g. Tokenizer, Attention, Cache).',
            'Inspect the Inspector card to the right: check its latency, parameter count, and role.',
            'Observe the flow arrows to understand what is input and what is output.'
          ],
          activityTodo: 'Click on all interactive nodes to unlock their technical parameters, then proceed to the Code Lab.',
          proTip: 'In real production AI systems, latency bottlenecks almost always happen in memory bandwidth (KV-cache or GPU interconnects) rather than raw FLOPS!'
        }
      case 'code_lab':
        return {
          badge: 'Stage 3: Live Code Lab',
          whatIsThis: 'Here you see the actual engineering code that implements the concept. It is written in standard Python / PyTorch / Hugging Face.',
          visualSteps: [
            'Read through the code snippet on the left editor panel.',
            'Notice the parameters: learning rate, tensor dimensions, batch sizes.',
            'Click "Run Script" to trigger the simulated execution engine and view the console output.'
          ],
          activityTodo: 'Hit the green "Run Script" button and watch the tensor shapes and loss convergence numbers in the execution console!',
          proTip: 'Pay attention to tensor dimensions (e.g. [Batch, Sequence_Length, Hidden_Dim]). In Deep Learning, 90% of bugs are shape mismatches!'
        }
      case 'mission':
        return {
          badge: 'Stage 4: Technical Mission',
          whatIsThis: 'This is your hands-on engineering sandbox. You are given a realistic challenge (e.g. optimize latency, prevent gradient vanishing, or scale context).',
          visualSteps: [
            'Read the Mission Goal and target metrics.',
            'Tweak the interactive knobs (sliders, dropdowns, batch size, learning rates).',
            'Watch the live telemetry gauges change in real time.',
            'When the telemetry enters the target green zone, your mission is marked CLEARED!'
          ],
          activityTodo: 'Adjust the sliders until the status badge displays "STATUS: PASS / OPTIMAL", then claim your mission XP!',
          proTip: 'Start by adjusting one variable at a time so you can see which hyperparameter has the biggest impact on the metric.'
        }
      case 'olympiad_quiz':
      default:
        return {
          badge: 'Stage 5: Olympiad Defense',
          whatIsThis: 'The final stage of the lesson: an Olympiad-level scenario question designed to test true conceptual mastery.',
          visualSteps: [
            'Read the technical scenario carefully.',
            'Analyze all 4 options: look for the fundamental principle being tested.',
            'Click on your chosen answer to reveal instant feedback and the solution walkthrough.'
          ],
          activityTodo: 'Select the best answer. Even if you miss on the first attempt, read the explanation to learn the exact intuition!',
          proTip: 'Olympiad questions often contain "distractor" options that sound technically impressive but violate a fundamental constraint (like memory complexity or causality).'
        }
    }
  }

  const guidance = getScreenGuidance()

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col font-sans text-slate-100 animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
            <Lightbulb size={18} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              AI MENTOR & COMPANION
            </span>
            <h3 className="text-sm font-bold text-slate-100">Step-by-Step Guidance</h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
        {/* Current Location Badge */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Current Mission:</div>
          <div className="text-xs font-bold text-slate-200">
            {levelName} • Ch {chapterNum}: {chapterTitle}
          </div>
          <div className="text-xs text-cyan-400 font-mono">
            {lessonTitle} • {guidance.badge}
          </div>
        </div>

        {/* 1. What is this? (Plain English) */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>1. What is this & Why does it matter?</span>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
            {guidance.whatIsThis}
          </div>
        </div>

        {/* 1.5 Kindergarten Story (ELI5) */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
            <span>🧸 Kindergarten Story (ELI5)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-100/95 leading-relaxed font-medium">
            {KindergartenExplainerService.translateText(`${lessonTitle} ${currentScreen.title}`)}
          </div>
        </div>

        {/* 2. Visual Steps */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Layers size={14} />
            <span>2. Visual Steps to Follow</span>
          </div>
          <div className="space-y-2">
            {guidance.visualSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Action / Activity To Do Right Now */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <Zap size={14} />
            <span>3. Hands-On Activity To Do Now</span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>{guidance.activityTodo}</span>
          </div>
        </div>

        {/* 4. Pro Tip & Olympiad Hint */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
            <Sparkles size={14} />
            <span>4. Pro Tip / Olympiad Hint</span>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200/90 leading-relaxed">
            {guidance.proTip}
          </div>
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">
          Antigravity AI Mentor • Online
        </span>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
        >
          Got It, Let's Continue
        </button>
      </div>
    </div>
  )
}
