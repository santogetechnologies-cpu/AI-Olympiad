// ─────────────────────────────────────────────────────────────────────────────
// STAGE 1: MISSION BRIEFING
// High-tech operative scenario, objectives checklist & prerequisites
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import type { MiddleLessonData } from '../types'
import { Shield, Target, CheckCircle2, AlertTriangle, ArrowRight, Zap, Sparkles } from 'lucide-react'
import { GaioAiGuideAvatar } from '../GaioAiGuideAvatar'

interface StageBriefingProps {
  lesson: MiddleLessonData
  onProceed: () => void
  onOpenJargonBuster?: () => void
}

function getBriefingKindergartenText(lesson: MiddleLessonData): string {
  const title = (lesson.lessonTitle + ' ' + lesson.chapterTitle).toLowerCase()
  if (title.includes('machine') || title.includes('smart') || title.includes('data') || title.includes('pattern')) {
    return "Think of training a friendly puppy! Computers don't have human brains, but when we show them lots of pictures of apples and cookies, they learn patterns and become super helpers! Tap Listen to Guide or start our mission below!"
  }
  if (title.includes('think') || title.includes('code') || title.includes('python')) {
    return "Writing code is just like giving friendly steps to a toy robot: 'Take two steps forward, turn around, and grab the star!' Let's build fun instructions together!"
  }
  if (title.includes('road') || title.includes('car') || title.includes('farm') || title.includes('application')) {
    return "Imagine a magic car with robot eyes! It uses radar beams and cameras to spot people, cute kittens, and red traffic lights so everyone stays safe on the road!"
  }
  if (title.includes('career') || title.includes('skill')) {
    return "In our future world, you can be an AI doctor helper, fly eco-friendly farm drones, or design magical cartoon movies with AI prompts! What will your superpower be?"
  }
  if (title.includes('tool') || title.includes('creator') || title.includes('create')) {
    return "AI tools are like magic paintbrushes and smart pencils! You speak words, and the computer draws pictures, writes stories, and helps you make anything you imagine!"
  }
  if (title.includes('protect') || title.includes('trust') || title.includes('fake') || title.includes('responsible')) {
    return "Your private secrets are like a locked treasure chest! We never share passwords or home addresses online, and we always teach our AI to be fair, honest, and kind to everyone!"
  }
  return "Welcome explorer! Today we are learning how computers think, learn, and help us every single day. Let's start from the basics with simple pictures and animations!"
}

export const StageBriefing: React.FC<StageBriefingProps> = ({ lesson, onProceed, onOpenJargonBuster }) => {
  const { briefing } = lesson

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 space-y-4 max-w-4xl mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Shield size={14} className="text-sky-400" />
            <span>Mission Dossier • {lesson.classTitle}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">{lesson.syllabusReference}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5 tracking-tight">
            {lesson.lessonTitle}
          </h1>
        </div>

        {/* Urgency & Role Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300">
            <Target size={13} className="text-amber-400" />
            <span className="text-slate-400">Role:</span>
            <span className="font-semibold text-white">{briefing.agentRole}</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-[11px] font-bold text-rose-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
            <span>{briefing.urgency} Priority</span>
          </div>
        </div>
      </div>

      {/* GAIO AI Guide Mentor Avatar with Bold Slow Male Voice */}
      <GaioAiGuideAvatar
        conceptTitle={lesson.lessonTitle}
        simpleText={getBriefingKindergartenText(lesson)}
        lessonTitle={lesson.chapterTitle}
      />

      {/* Main Terminal Dossier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Narrative Mission Brief */}
        <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-1.5 text-sky-300">
                <Zap size={14} /> Mission Objective Brief
              </span>
              <span className="text-slate-500 font-mono">NODE: {briefing.targetEntity}</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed font-normal mb-3">
              {briefing.missionBrief}
            </p>

            {/* Plain English Kid-Friendly Box */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                <span className="flex items-center gap-1">
                  👶 In Simple Words (What are we doing?):
                </span>
                {onOpenJargonBuster && (
                  <button
                    onClick={onOpenJargonBuster}
                    className="text-[10px] text-amber-400 hover:text-amber-200 underline font-semibold cursor-pointer"
                  >
                    💡 Explain Hard Words
                  </button>
                )}
              </div>
              <p className="text-amber-100/90 text-xs leading-relaxed">
                Think of yourself as a master computer detective! Your job is to test how an AI machine learns rules, plays with data, and makes smart choices without getting tricked.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Estimated Duration: <strong className="text-white">{lesson.estimatedMinutes} mins</strong></span>
            <span>Target Reward: <strong className="text-amber-400 font-bold">+{lesson.xpReward} XP</strong></span>
          </div>
        </div>

        {/* Right: Prerequisites & Clearance */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <AlertTriangle size={13} className="text-amber-400" />
              Pre-Mission Clearance
            </h3>
            <ul className="space-y-2">
              {briefing.prerequisites.map((pre, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-sky-950/40 to-indigo-950/40 border border-sky-800/30 text-center">
            <span className="text-[11px] text-sky-300 font-semibold flex items-center justify-center gap-1">
              <Sparkles size={12} className="text-sky-300" />
              Olympiad Standard 2.0 Certified
            </span>
          </div>
        </div>
      </div>

      {/* Learning Objectives Checklist */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-emerald-400" />
          Mission Deliverables & Learning Objectives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {briefing.learningObjectives.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs text-slate-200 leading-snug">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onProceed}
          className="group px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <span>Accept Mission & Proceed</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
