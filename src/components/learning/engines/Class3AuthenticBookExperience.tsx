// ─────────────────────────────────────────────────────────────────────────────
// CLASS 3 AUTHENTIC BOOK EXPERIENCE (GAIO Class 3 Book.pdf - Exact Source of Truth)
// Topic 1: Meet My AI Friend (Pages 6 to 15)
// Mobile Page-Turning App:
// - Page 1 (PDF p.6): LET'S LEARN: Meet My AI Friend + Magic Words
// - Page 2 (PDF p.7): PICTURE STORY: Meet My AI Friend (Panels 1-4 + Talk about it)
// - Page 3 (PDF p.8): LOOK AROUND YOU: AI Friends All Around Us + Bolt Says + Fun Fact
// - Page 4 (PDF p.9): LET'S DO IT! Robot Says! (Fully Playable Robot Activity)
// - Page 5 (PDF p.10): WORKSHEET (Part A): Does it use AI? Yes/No + Draw Robot Friend
// - Page 6 (PDF p.11): WORKSHEET (Part B): Match Helper to Job + Word Box Fill in Blanks
// - Page 7 (PDF p.12): PUZZLE FUN: Odd One Out + Count & Write
// - Page 8 (PDF p.13): TRACE & COLOUR: Trace Magic Words + Interactive Color Bolt
// - Page 9 (PDF p.14): QUIZ TIME: 5 MCQs + Star Collector
// - Page 10 (PDF p.15): TRUE OR FALSE: 6 Statements + Home Connect + Rating Faces
//
// ZERO scrolling anywhere: Strictly single mobile screen per page.
// Navigation: Page 1 -> Next -> Page 2 -> Next -> ...
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, Volume2,
  Sparkles, RefreshCw, Star, Check, Award, Heart, HelpCircle
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import { auraSpeechService } from '../../../services/auraSpeechService'

export interface Class3AuthenticBookExperienceProps {
  onComplete?: () => void
  onBackToSections?: () => void
  studentName?: string
}

export const Class3AuthenticBookExperience: React.FC<Class3AuthenticBookExperienceProps> = ({
  onComplete,
  onBackToSections,
  studentName = 'Super Kid'
}) => {
  // Active Page: 1 to 10 (Corresponding to PDF Pages 6 to 15)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // ─────────────────────────────────────────────────────────────────────────
  // INTERACTIVE STATES FOR EVERY ACTIVITY ACROSS PAGES 6-15
  // ─────────────────────────────────────────────────────────────────────────

  // Page 6: Live inside card tapped
  const [p6ActiveCard, setP6ActiveCard] = useState<number | null>(null)

  // Page 7: Story Audio Panel
  const [p7ActivePanel, setP7ActivePanel] = useState<number | null>(null)
  const [p7ShowNextPic, setP7ShowNextPic] = useState<boolean>(false)

  // Page 8: AI Helpers tapped
  const [p8ActiveHelper, setP8ActiveHelper] = useState<number | null>(null)

  // Page 9: Robot Says interactive commands
  const [robotAction, setRobotAction] = useState<'idle' | 'jump' | 'wave' | 'dance' | 'spin'>('idle')

  // Page 10: Worksheet Part A (Yes/No selections)
  const [p10Answers, setP10Answers] = useState<Record<string, 'yes' | 'no'>>({})
  const [p10RobotName, setP10RobotName] = useState<string>('Sparky')

  // Page 11: Worksheet Part B
  // 1. Matching pairs: helper -> job
  const [p11SelectedLeft, setP11SelectedLeft] = useState<string | null>(null)
  const [p11Matches, setP11Matches] = useState<Record<string, string>>({})
  // 2. Fill in the blanks
  const [p11Blanks, setP11Blanks] = useState<Record<number, string>>({})

  // Page 12: Puzzle Fun
  // 1. Odd one out
  const [p12OddSelected, setP12OddSelected] = useState<Record<string, number>>({})
  // 2. Count and write
  const [p12Counts, setP12Counts] = useState<Record<string, number>>({ robot: 0, phone: 0, star: 0 })

  // Page 13: Trace & Colour
  const [p13Traced, setP13Traced] = useState<Record<string, boolean>>({})
  const [p13BoltColor, setP13BoltColor] = useState<string>('#94A3B8')

  // Page 14: Quiz Time (5 MCQs)
  const [p14Answers, setP14Answers] = useState<Record<number, number>>({})

  // Page 15: True or False (6 statements)
  const [p15Answers, setP15Answers] = useState<Record<number, boolean>>({})
  const [p15FaceRating, setP15FaceRating] = useState<number | null>(null)

  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION HANDLERS (STRICT PAGE-TURNING)
  // ─────────────────────────────────────────────────────────────────────────
  const handlePrevPage = () => {
    gameAudio.playTap()
    auraSpeechService.stop()
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    } else if (onBackToSections) {
      onBackToSections()
    }
  }

  const handleNextPage = () => {
    gameAudio.playTap()
    auraSpeechService.stop()
    if (currentPage < 10) {
      setCurrentPage((prev) => prev + 1)
    } else if (onComplete) {
      gameAudio.playSuccess()
      onComplete()
    }
  }

  const handleReadText = (text: string) => {
    gameAudio.playTap()
    auraSpeechService.speak(text)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PAGE RENDERERS (EXACT CONTENT, ASSETS, ACTIVITIES FROM PDF)
  // ─────────────────────────────────────────────────────────────────────────

  // PAGE 1 (PDF PAGE 6) — LET'S LEARN: Meet My AI Friend
  const renderPage1 = () => (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-[#1E88E5] text-white rounded-2xl p-2 sm:p-2.5 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <img src="/class3_assets/p6_img_0.png" alt="Bolt" className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/20 p-0.5 object-contain" />
          <div>
            <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-sky-100">
              TOPIC 1 • MONTH 1 • AI BASICS
            </div>
            <h1 className="text-sm sm:text-base font-black tracking-tight leading-tight">
              Meet My AI Friend
            </h1>
          </div>
        </div>
        <button
          onClick={() => handleReadText("Meet My AI Friend. AI means Artificial Intelligence. AI helps machines think and learn a little, like us.")}
          className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          title="Read Aloud"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Hero Illustration */}
      <div className="shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs h-28 sm:h-36 bg-emerald-50">
        <img
          src="/class3_assets/p6_img_1.png"
          alt="Bolt with Meera and friend under sun"
          className="w-full h-full object-cover"
        />
      </div>

      {/* LET'S LEARN Section */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl p-2 sm:p-2.5 shrink-0 space-y-1">
        <div className="flex items-center gap-1.5 text-[#0D47A1] font-black text-xs uppercase tracking-wider">
          <img src="/class3_assets/p6_img_2.png" alt="Book" className="w-4 h-4 object-contain" />
          <span>LET'S LEARN</span>
        </div>
        <div className="space-y-0.5 text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
          <p className="flex items-center gap-1.5">
            <span className="text-amber-500 text-xs">★</span> AI means Artificial Intelligence.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-amber-500 text-xs">★</span> AI helps machines think and learn a little, like us.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-amber-500 text-xs">★</span> AI is a helper. It cannot feel happy or sad like you.
          </p>
        </div>
      </div>

      {/* AI can live inside... */}
      <div className="shrink-0 space-y-1">
        <span className="text-[10px] sm:text-[11px] font-black text-slate-700 flex items-center gap-1">
          👀 AI can live inside...
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { img: '/class3_assets/p6_img_7.png', label: 'Smart phone' },
            { img: '/class3_assets/p6_img_8.png', label: 'Smart speaker' },
            { img: '/class3_assets/p6_img_9.png', label: 'Robot' },
            { img: '/class3_assets/p6_img_10.png', label: 'Computer' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                gameAudio.playSuccess()
                setP6ActiveCard(idx)
              }}
              className={`p-1.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                p6ActiveCard === idx
                  ? 'bg-sky-100 border-sky-400 scale-105 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-sky-300'
              }`}
            >
              <img src={item.img} alt={item.label} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-700 mt-0.5 leading-none">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MAGIC WORDS */}
      <div className="bg-[#E0F7FA] border border-[#80DEEA] rounded-2xl p-1.5 sm:p-2 shrink-0">
        <div className="text-[9px] font-black uppercase text-[#006064] tracking-wider mb-1 flex items-center gap-1">
          <img src="/class3_assets/p6_img_11.png" alt="ABC" className="w-3.5 h-3.5 object-contain" />
          <span>MAGIC WORDS</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[9px] sm:text-[10px]">
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-lg">
            <img src="/class3_assets/p6_img_12.png" alt="AI" className="w-4 h-4 object-contain shrink-0" />
            <div><strong>AI:</strong> A smart helper</div>
          </div>
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-lg">
            <img src="/class3_assets/p6_img_13.png" alt="Machine" className="w-4 h-4 object-contain shrink-0" />
            <div><strong>Machine:</strong> Does work</div>
          </div>
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-lg">
            <img src="/class3_assets/p6_img_14.png" alt="Smart" className="w-4 h-4 object-contain shrink-0" />
            <div><strong>Smart:</strong> Can learn</div>
          </div>
        </div>
      </div>
    </div>
  )

  // PAGE 2 (PDF PAGE 7) — PICTURE STORY: Meet My AI Friend
  const renderPage2 = () => (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
      {/* Title */}
      <div className="bg-[#8E24AA] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
        <div>
          <span className="text-[8px] font-black uppercase tracking-wider text-purple-200">PICTURE STORY</span>
          <h2 className="text-sm font-black">Meet My AI Friend</h2>
        </div>
        <span className="text-[9px] font-bold text-purple-100 italic">Read the story!</span>
      </div>

      {/* 4 Story Panels Grid */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 my-1">
        {[
          {
            num: 1,
            img: '/class3_assets/p7_img_1.png',
            text: 'Meera meets Bolt. "Hello! I am a robot with AI."'
          },
          {
            num: 2,
            img: '/class3_assets/p7_img_2.png',
            text: '"I learn from many, many examples."'
          },
          {
            num: 3,
            img: '/class3_assets/p7_img_3.png',
            text: 'Bolt sees 100 cat photos. Now Bolt knows: "That is a cat!"'
          },
          {
            num: 4,
            img: '/class3_assets/p7_img_4.png',
            text: 'Meera smiles. "You learn like me, Bolt!"'
          }
        ].map((panel) => (
          <div
            key={panel.num}
            onClick={() => {
              gameAudio.playTap()
              setP7ActivePanel(panel.num)
              handleReadText(panel.text)
            }}
            className={`p-1.5 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
              p7ActivePanel === panel.num
                ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-300'
                : 'bg-white border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="relative rounded-xl overflow-hidden border border-slate-100 flex-1 min-h-0 bg-slate-50">
              <span className="absolute top-1 left-1.5 w-4 h-4 rounded-full bg-purple-700 text-white font-black text-[9px] flex items-center justify-center">
                {panel.num}
              </span>
              <img src={panel.img} alt={`Story panel ${panel.num}`} className="w-full h-full object-contain" />
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-snug mt-1 text-center">
              {panel.text}
            </p>
          </div>
        ))}
      </div>

      {/* Talk about it & Draw picture 5 */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-2 shrink-0 space-y-1">
        <div className="text-[9px] sm:text-[10px] font-bold text-purple-900 flex items-center justify-between">
          <span>💬 <strong>Talk about it:</strong> What would YOU do with Bolt?</span>
          <button
            onClick={() => {
              gameAudio.playSuccess()
              setP7ShowNextPic(!p7ShowNextPic)
            }}
            className="px-2 py-0.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[9px] font-black cursor-pointer"
          >
            {p7ShowNextPic ? 'Hide Picture 5' : '✏️ Reveal Picture 5!'}
          </button>
        </div>
        {p7ShowNextPic && (
          <div className="p-1.5 rounded-xl bg-white border border-purple-300 text-[10px] font-bold text-purple-950 text-center animate-in zoom-in-95 duration-200">
            🎉 <strong>Picture 5:</strong> Meera and Bolt play a smart quiz together and become best friends forever!
          </div>
        )}
      </div>
    </div>
  )

  // PAGE 3 (PDF PAGE 8) — LOOK AROUND YOU: AI Friends All Around Us
  const renderPage3 = () => (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
      <div className="bg-[#2E7D32] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
        <div>
          <span className="text-[8px] font-black uppercase tracking-wider text-emerald-200">LOOK AROUND YOU</span>
          <h2 className="text-sm font-black">AI Friends All Around Us</h2>
        </div>
        <span className="text-[9px] font-bold text-emerald-100">Tap to test!</span>
      </div>

      {/* 6 AI Helpers Grid */}
      <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0 my-1">
        {[
          { id: 1, img: '/class3_assets/p8_img_1.png', label: 'Map shows the way', tip: 'GPS finds the quickest route!' },
          { id: 2, img: '/class3_assets/p8_img_2.png', label: 'Plays your song', tip: 'Smart music recommendation!' },
          { id: 3, img: '/class3_assets/p8_img_3.png', label: 'Camera finds faces', tip: 'Autofocus detects smiles!' },
          { id: 4, img: '/class3_assets/p8_img_4.png', label: 'Tells the weather', tip: 'Predicts sunny days and rain!' },
          { id: 5, img: '/class3_assets/p8_img_5.png', label: 'Changes language', tip: 'Translates words instantly!' },
          { id: 6, img: '/class3_assets/p8_img_6.png', label: 'Plays games', tip: 'Challenges you in smart games!' },
        ].map((helper) => (
          <div
            key={helper.id}
            onClick={() => {
              gameAudio.playSuccess()
              setP8ActiveHelper(helper.id)
            }}
            className={`p-1.5 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              p8ActiveHelper === helper.id
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300 scale-102 shadow-sm'
                : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <img src={helper.img} alt={helper.label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 leading-tight mt-1">
              {helper.label}
            </span>
          </div>
        ))}
      </div>

      {/* BOLT SAYS & FUN FACT */}
      <div className="space-y-1 shrink-0">
        <div className="bg-[#F3E5F5] border border-[#CE93D8] rounded-2xl p-1.5 sm:p-2 flex items-center gap-2">
          <img src="/class3_assets/p8_img_7.png" alt="Bolt" className="w-8 h-8 rounded-xl object-contain shrink-0" />
          <div className="text-[9px] sm:text-[10px] font-bold text-purple-950 leading-tight">
            <strong>BOLT SAYS:</strong> Hi! I am Bolt. I am a robot with AI. I learn from lots of examples!
          </div>
        </div>

        <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-2xl p-1.5 sm:p-2 flex items-center gap-2">
          <img src="/class3_assets/p8_img_8.png" alt="Fun Fact" className="w-8 h-8 rounded-xl object-contain shrink-0" />
          <div className="text-[9px] sm:text-[10px] font-bold text-amber-950 leading-tight">
            <strong>FUN FACT!</strong> Some AI helpers understand English, Tamil, Hindi and many more languages!
          </div>
        </div>
      </div>
    </div>
  )

  // PAGE 4 (PDF PAGE 9) — LET'S DO IT! Robot Says! (Interactive Playable Game)
  const renderPage4 = () => (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
      <div className="bg-[#E65100] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
        <div>
          <span className="text-[8px] font-black uppercase tracking-wider text-orange-200">LET'S DO IT!</span>
          <h2 className="text-sm font-black">Robot Says!</h2>
        </div>
        <span className="text-[9px] font-bold text-orange-100">Play the game!</span>
      </div>

      {/* Interactive Robot Play Stage */}
      <div className="flex-1 min-h-0 bg-orange-50/70 border border-orange-200 rounded-3xl p-2.5 flex flex-col items-center justify-between my-1">
        {/* Animated Bolt Avatar Reaction */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border-2 border-orange-300 shadow-md p-2 flex items-center justify-center transition-transform duration-300 ${
              robotAction === 'jump'
                ? '-translate-y-4 scale-110'
                : robotAction === 'spin'
                ? 'rotate-180 scale-105'
                : robotAction === 'wave'
                ? 'skew-x-6'
                : robotAction === 'dance'
                ? 'animate-bounce'
                : ''
            }`}
          >
            <img src="/class3_assets/p6_img_0.png" alt="Robot Bolt" className="w-full h-full object-contain" />
          </div>

          <div className="mt-2 text-xs font-black text-orange-950 px-3 py-1 rounded-full bg-white/90 border border-orange-200 shadow-2xs">
            {robotAction === 'jump' && '⚡ Bolt JUMPED high in the air!'}
            {robotAction === 'wave' && '👋 Bolt is WAVING hello happily!'}
            {robotAction === 'dance' && '🎵 Bolt is DANCING to the beat!'}
            {robotAction === 'spin' && '🔄 Bolt SPUN around like a top!'}
            {robotAction === 'idle' && '🤖 Give Bolt a command below!'}
          </div>
        </div>

        {/* Command Action Buttons */}
        <div className="w-full grid grid-cols-4 gap-1.5 pt-2">
          {[
            { cmd: 'jump', label: '🦘 Jump!' },
            { cmd: 'wave', label: '👋 Wave!' },
            { cmd: 'dance', label: '💃 Dance!' },
            { cmd: 'spin', label: '🔄 Spin!' },
          ].map((item) => (
            <button
              key={item.cmd}
              onClick={() => {
                gameAudio.playSuccess()
                setRobotAction(item.cmd as any)
                setTimeout(() => setRobotAction('idle'), 1600)
              }}
              className="py-2 px-1 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-[10px] sm:text-xs shadow-sm transition-all cursor-pointer text-center"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Steps & Think & Talk */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-1.5 sm:p-2 shrink-0 text-[9px] sm:text-[10px] font-bold text-slate-700">
        <div className="flex items-center gap-1.5 text-orange-900 mb-0.5">
          <img src="/class3_assets/p9_img_10.png" alt="Think" className="w-4 h-4 object-contain" />
          <span><strong>THINK & TALK:</strong> Did the Robot think by itself, or did it follow you?</span>
        </div>
        <p className="text-slate-600">The Robot followed your command! Robots follow clear instructions.</p>
      </div>
    </div>
  )

  // PAGE 5 (PDF PAGE 10) — WORKSHEET: Part A (Tick Yes/No & Draw Robot)
  const renderPage5 = () => (
    <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
      <div className="bg-[#C2185B] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
        <div>
          <span className="text-[8px] font-black uppercase tracking-wider text-pink-200">WORKSHEET</span>
          <h2 className="text-sm font-black">Meet My AI Friend (Part A)</h2>
        </div>
        <span className="text-[9px] font-bold text-pink-100">Name: {studentName}</span>
      </div>

      {/* 1. Does it use AI? Yes / No Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shrink-0 shadow-2xs space-y-1">
        <div className="text-[10px] sm:text-[11px] font-black text-slate-800">
          1. Does it use AI? Tick ✓ the right box.
        </div>

        <div className="space-y-1">
          {[
            { id: 'speaker', img: '/class3_assets/p10_img_1.png', label: 'Smart speaker', correct: 'yes' },
            { id: 'spoon', img: '/class3_assets/p10_img_2.png', label: 'Spoon', correct: 'no' },
            { id: 'map', img: '/class3_assets/p10_img_3.png', label: 'Map app', correct: 'yes' },
            { id: 'chair', img: '/class3_assets/p10_img_4.png', label: 'Chair', correct: 'no' },
            { id: 'phone', img: '/class3_assets/p10_img_5.png', label: 'Smart phone', correct: 'yes' },
          ].map((item) => {
            const userChoice = p10Answers[item.id]
            const isCorrect = userChoice === item.correct

            return (
              <div key={item.id} className="flex items-center justify-between p-1 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <img src={item.img} alt={item.label} className="w-6 h-6 object-contain" />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      gameAudio.playTap()
                      setP10Answers({ ...p10Answers, [item.id]: 'yes' })
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                      userChoice === 'yes'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      gameAudio.playTap()
                      setP10Answers({ ...p10Answers, [item.id]: 'no' })
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                      userChoice === 'no'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    No
                  </button>
                  {userChoice && isCorrect && <CheckCircle2 size={14} className="text-emerald-500" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Draw your own robot friend */}
      <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-2 shrink-0 space-y-1">
        <div className="text-[10px] sm:text-[11px] font-black text-pink-950">
          2. Draw your own robot friend. Give it a name!
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-white border border-pink-300 p-1 flex items-center justify-center shrink-0">
            <img src="/class3_assets/p6_img_0.png" alt="My Robot" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <label className="text-[9px] font-bold text-pink-900 block mb-0.5">My robot's name is:</label>
            <input
              type="text"
              value={p10RobotName}
              onChange={(e) => setP10RobotName(e.target.value)}
              placeholder="e.g. Bolt, Sparky, Nova"
              className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-pink-300 bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  // PAGE 6 (PDF PAGE 11) — WORKSHEET: Part B (Match & Fill in Blanks)
  const renderPage6 = () => {
    const leftItems = [
      { id: 'map', img: '/class3_assets/p11_img_1.png', label: 'Map app', matchId: 'job_way' },
      { id: 'speaker', img: '/class3_assets/p11_img_3.png', label: 'Smart speaker', matchId: 'job_song' },
      { id: 'camera', img: '/class3_assets/p11_img_5.png', label: 'Smart camera', matchId: 'job_faces' },
      { id: 'translate', img: '/class3_assets/p11_img_7.png', label: 'Translate app', matchId: 'job_lang' },
    ]

    const rightItems = [
      { id: 'job_song', img: '/class3_assets/p11_img_2.png', label: 'Plays songs' },
      { id: 'job_faces', img: '/class3_assets/p11_img_4.png', label: 'Finds faces' },
      { id: 'job_way', img: '/class3_assets/p11_img_6.png', label: 'Shows the way' },
      { id: 'job_lang', img: '/class3_assets/p11_img_8.png', label: 'Changes language' },
    ]

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
        <div className="bg-[#C2185B] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[8px] font-black uppercase tracking-wider text-pink-200">WORKSHEET</span>
            <h2 className="text-sm font-black">Meet My AI Friend (Part B)</h2>
          </div>
          <span className="text-[9px] font-bold text-pink-100">Tap to match!</span>
        </div>

        {/* 1. Match each AI helper to its job */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2 shrink-0 space-y-1">
          <div className="text-[10px] sm:text-[11px] font-black text-slate-800">
            1. Match each AI helper to its job.
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Left Column */}
            <div className="space-y-1">
              {leftItems.map((item) => {
                const isMatched = p11Matches[item.id] === item.matchId
                const isSelected = p11SelectedLeft === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      gameAudio.playTap()
                      setP11SelectedLeft(item.id)
                    }}
                    className={`w-full p-1 rounded-xl border flex items-center gap-1.5 transition-all text-left cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300'
                        : isSelected
                        ? 'bg-sky-100 border-sky-400 ring-1 ring-sky-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <img src={item.img} alt={item.label} className="w-5 h-5 object-contain" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 truncate flex-1">{item.label}</span>
                    <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                  </button>
                )
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              {rightItems.map((item) => {
                const matchedLeftKey = Object.keys(p11Matches).find((k) => p11Matches[k] === item.id)

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (p11SelectedLeft) {
                        const targetLeft = leftItems.find((l) => l.id === p11SelectedLeft)
                        if (targetLeft && targetLeft.matchId === item.id) {
                          gameAudio.playSuccess()
                          setP11Matches({ ...p11Matches, [p11SelectedLeft]: item.id })
                          setP11SelectedLeft(null)
                        } else {
                          gameAudio.playError()
                        }
                      }
                    }}
                    className={`w-full p-1 rounded-xl border flex items-center justify-between gap-1.5 transition-all text-left cursor-pointer ${
                      matchedLeftKey
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 truncate flex-1">{item.label}</span>
                    <img src={item.img} alt={item.label} className="w-5 h-5 object-contain" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 2. Fill in the blanks with Word Box */}
        <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-2 shrink-0 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-black text-pink-950">2. Fill in the blanks:</span>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-pink-300 text-[9px] font-black text-pink-900">
              <span>WORD BOX:</span>
              <span className="px-1.5 py-0.2 bg-pink-100 rounded text-pink-800">robot</span>
              <span className="px-1.5 py-0.2 bg-pink-100 rounded text-pink-800">learn</span>
              <span className="px-1.5 py-0.2 bg-pink-100 rounded text-pink-800">helper</span>
            </div>
          </div>

          <div className="space-y-1 text-[10px] sm:text-[11px] font-bold text-slate-800">
            <div className="flex items-center gap-1.5">
              <span>Bolt is a</span>
              <button
                onClick={() => {
                  gameAudio.playSuccess()
                  setP11Blanks({ ...p11Blanks, 1: 'robot' })
                }}
                className={`px-2 py-0.5 rounded border text-[10px] font-black cursor-pointer ${
                  p11Blanks[1] ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {p11Blanks[1] || '________'}
              </button>
              <span>.</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>AI can</span>
              <button
                onClick={() => {
                  gameAudio.playSuccess()
                  setP11Blanks({ ...p11Blanks, 2: 'learn' })
                }}
                className={`px-2 py-0.5 rounded border text-[10px] font-black cursor-pointer ${
                  p11Blanks[2] ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {p11Blanks[2] || '________'}
              </button>
              <span>from examples.</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>AI is a</span>
              <button
                onClick={() => {
                  gameAudio.playSuccess()
                  setP11Blanks({ ...p11Blanks, 3: 'helper' })
                }}
                className={`px-2 py-0.5 rounded border text-[10px] font-black cursor-pointer ${
                  p11Blanks[3] ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {p11Blanks[3] || '________'}
              </button>
              <span>.</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // PAGE 7 (PDF PAGE 12) — PUZZLE FUN: Odd One Out + Count & Write
  const renderPage7 = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
        <div className="bg-[#00897B] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[8px] font-black uppercase tracking-wider text-teal-200">PUZZLE FUN</span>
            <h2 className="text-sm font-black">Meet My AI Friend</h2>
          </div>
          <span className="text-[9px] font-bold text-teal-100">Solve puzzles!</span>
        </div>

        {/* 1. Odd One Out */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2 shrink-0 space-y-1">
          <div className="text-[10px] sm:text-[11px] font-black text-slate-800">
            1. Odd one out! Circle the picture that does not belong.
          </div>

          {/* Row A */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50">
            <span className="font-black text-xs text-teal-700 w-3">A</span>
            <div className="flex-1 grid grid-cols-4 gap-1">
              {[
                { id: 0, img: '/class3_assets/p12_img_1.png', isOdd: false },
                { id: 1, img: '/class3_assets/p12_img_2.png', isOdd: false },
                { id: 2, img: '/class3_assets/p12_img_3.png', isOdd: false },
                { id: 3, img: '/class3_assets/p12_img_4.png', isOdd: true }, // Banana is food
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.isOdd) gameAudio.playSuccess()
                    else gameAudio.playTap()
                    setP12OddSelected({ ...p12OddSelected, A: item.id })
                  }}
                  className={`p-1 rounded-lg border flex items-center justify-center cursor-pointer ${
                    p12OddSelected['A'] === item.id
                      ? item.isOdd
                        ? 'border-emerald-500 bg-emerald-100 ring-2 ring-emerald-400'
                        : 'border-rose-400 bg-rose-50'
                      : 'border-slate-200 bg-white hover:bg-slate-100'
                  }`}
                >
                  <img src={item.img} alt="item" className="w-6 h-6 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Row B */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-50">
            <span className="font-black text-xs text-teal-700 w-3">B</span>
            <div className="flex-1 grid grid-cols-4 gap-1">
              {[
                { id: 0, img: '/class3_assets/p12_img_5.png', isOdd: false },
                { id: 1, img: '/class3_assets/p12_img_6.png', isOdd: false },
                { id: 2, img: '/class3_assets/p12_img_7.png', isOdd: true }, // Giraffe is animal
                { id: 3, img: '/class3_assets/p12_img_8.png', isOdd: false },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.isOdd) gameAudio.playSuccess()
                    else gameAudio.playTap()
                    setP12OddSelected({ ...p12OddSelected, B: item.id })
                  }}
                  className={`p-1 rounded-lg border flex items-center justify-center cursor-pointer ${
                    p12OddSelected['B'] === item.id
                      ? item.isOdd
                        ? 'border-emerald-500 bg-emerald-100 ring-2 ring-emerald-400'
                        : 'border-rose-400 bg-rose-50'
                      : 'border-slate-200 bg-white hover:bg-slate-100'
                  }`}
                >
                  <img src={item.img} alt="item" className="w-6 h-6 object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Count and Write */}
        <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-2 shrink-0 space-y-1">
          <div className="text-[10px] sm:text-[11px] font-black text-teal-950">
            2. Count and write! How many can you see?
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'robot', img: '/class3_assets/p12_img_13.png', target: 4, label: 'Robots' },
              { id: 'phone', img: '/class3_assets/p12_img_14.png', target: 3, label: 'Phones' },
              { id: 'star', img: '/class3_assets/p12_img_15.png', target: 6, label: 'Stars' },
            ].map((cnt) => (
              <div key={cnt.id} className="p-1.5 rounded-xl bg-white border border-teal-200 flex flex-col items-center">
                <img src={cnt.img} alt={cnt.label} className="w-7 h-7 object-contain mb-1" />
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      gameAudio.playTap()
                      setP12Counts({ ...p12Counts, [cnt.id]: Math.max(0, p12Counts[cnt.id] - 1) })
                    }}
                    className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-black text-xs w-4 text-center">{p12Counts[cnt.id]}</span>
                  <button
                    onClick={() => {
                      gameAudio.playTap()
                      const nextVal = p12Counts[cnt.id] + 1
                      setP12Counts({ ...p12Counts, [cnt.id]: nextVal })
                      if (nextVal === cnt.target) gameAudio.playSuccess()
                    }}
                    className="w-5 h-5 rounded bg-teal-600 text-white font-black text-xs flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                {p12Counts[cnt.id] === cnt.target && (
                  <span className="text-[8px] font-black text-emerald-600 mt-0.5">✓ Correct!</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // PAGE 8 (PDF PAGE 13) — TRACE & COLOUR
  const renderPage8 = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
        <div className="bg-[#EF6C00] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[8px] font-black uppercase tracking-wider text-orange-200">TRACE & COLOUR</span>
            <h2 className="text-sm font-black">Meet My AI Friend</h2>
          </div>
          <span className="text-[9px] font-bold text-orange-100">Tap to trace & color!</span>
        </div>

        {/* 1. Trace the magic words */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2 shrink-0 space-y-1">
          <div className="text-[10px] sm:text-[11px] font-black text-slate-800">
            ✍️ Trace the magic words. Then write them again!
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'ai', word: 'AI', tip: 'A smart helper' },
              { id: 'machine', word: 'Machine', tip: 'Does work' },
              { id: 'smart', word: 'Smart', tip: 'Can learn' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  gameAudio.playSuccess()
                  setP13Traced({ ...p13Traced, [item.id]: true })
                }}
                className={`p-1.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  p13Traced[item.id]
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 hover:bg-orange-50 text-slate-700'
                }`}
              >
                <span className="font-black text-sm tracking-widest">{item.word}</span>
                <span className="text-[8px] font-semibold text-slate-500 mt-0.5">{item.tip}</span>
                {p13Traced[item.id] && <span className="text-[9px] text-emerald-600 font-black">✓ Traced!</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Colour Bolt Robot */}
        <div className="flex-1 min-h-0 bg-orange-50/70 border border-orange-200 rounded-2xl p-2 flex flex-col items-center justify-between my-1">
          <div className="text-[10px] sm:text-[11px] font-black text-orange-950">
            🖍️ Colour me brightly!
          </div>

          {/* Bolt Outline with Dynamic Fill Color */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 border-slate-300 p-2 flex items-center justify-center shadow-xs">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <rect x="15" y="25" width="70" height="55" rx="14" fill={p13BoltColor} stroke="#0F172A" strokeWidth="4" />
              <line x1="50" y1="25" x2="50" y2="8" stroke="#0F172A" strokeWidth="4" />
              <circle cx="50" cy="8" r="6" fill="#FBBF24" stroke="#0F172A" strokeWidth="3" />
              <circle cx="35" cy="48" r="8" fill="white" stroke="#0F172A" strokeWidth="3" />
              <circle cx="65" cy="48" r="8" fill="white" stroke="#0F172A" strokeWidth="3" />
              <circle cx="35" cy="48" r="4" fill="#0F172A" />
              <circle cx="65" cy="48" r="4" fill="#0F172A" />
              <polygon points="50,56 46,64 54,64" fill="#EF4444" />
              <rect x="32" y="68" width="36" height="6" rx="3" fill="#334155" />
            </svg>
          </div>

          {/* Color Palette Buttons */}
          <div className="flex items-center gap-2 pt-1">
            {['#38BDF8', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#F43F5E'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  gameAudio.playSuccess()
                  setP13BoltColor(c)
                }}
                className="w-6 h-6 rounded-full border-2 border-white shadow-xs cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // PAGE 9 (PDF PAGE 14) — QUIZ TIME: 5 MCQs
  const renderPage9 = () => {
    const questions = [
      { id: 1, q: 'Q1. AI is short for...', opts: ['Artificial Intelligence', 'Apple Ice-cream', 'Air India'], ans: 0 },
      { id: 2, q: 'Q2. Which one can have AI?', opts: ['Stone', 'Smart phone', 'Banana'], ans: 1 },
      { id: 3, q: 'Q3. Can AI feel sad like you?', opts: ['Yes', 'Sometimes', 'No'], ans: 2 },
      { id: 4, q: 'Q4. AI learns from...', opts: ['Examples', 'Pizza', 'Sleeping'], ans: 0 },
      { id: 5, q: 'Q5. Bolt is a...', opts: ['Dog', 'Tree', 'Robot'], ans: 2 },
    ]

    const totalCorrect = questions.filter((q) => p14Answers[q.id] === q.ans).length

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
        <div className="bg-[#283593] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[8px] font-black uppercase tracking-wider text-indigo-200">QUIZ TIME</span>
            <h2 className="text-sm font-black">Meet My AI Friend</h2>
          </div>
          <div className="flex items-center gap-1 text-amber-300 font-black text-xs">
            <span>⭐ {totalCorrect}/5</span>
          </div>
        </div>

        {/* 5 Questions Compact Scroll-free List */}
        <div className="space-y-1.5 flex-1 min-h-0 my-1 overflow-y-auto">
          {questions.map((q) => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-2xs">
              <div className="text-[10px] sm:text-[11px] font-black text-slate-800 mb-1">{q.q}</div>
              <div className="grid grid-cols-3 gap-1">
                {q.opts.map((opt, oIdx) => {
                  const isSelected = p14Answers[q.id] === oIdx
                  const isCorrect = oIdx === q.ans

                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (isCorrect) gameAudio.playSuccess()
                        else gameAudio.playError()
                        setP14Answers({ ...p14Answers, [q.id]: oIdx })
                      }}
                      className={`py-1 px-1.5 rounded-lg text-[9px] font-bold text-center border transition-all cursor-pointer truncate ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-rose-600 text-white border-rose-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* MY STARS */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-1.5 shrink-0 flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-black text-indigo-950">MY STARS:</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={16}
                className={s <= totalCorrect ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}
              />
            ))}
          </div>
          <span className="text-[9px] font-bold text-indigo-900">{totalCorrect} / 5 Stars</span>
        </div>
      </div>
    )
  }

  // PAGE 10 (PDF PAGE 15) — TRUE OR FALSE & HOME CONNECT
  const renderPage10 = () => {
    const statements = [
      { id: 1, text: 'Bolt is a robot.', correct: true },
      { id: 2, text: 'AI can feel sad like me.', correct: false },
      { id: 3, text: 'AI learns from examples.', correct: true },
      { id: 4, text: 'A stone has AI.', correct: false },
      { id: 5, text: 'A map app can use AI.', correct: true },
      { id: 6, text: 'Some AI understands Tamil.', correct: true },
    ]

    return (
      <div className="w-full h-full flex flex-col justify-between p-2 sm:p-3 text-slate-800 select-none animate-in fade-in duration-200">
        <div className="bg-[#6A1B9A] text-white rounded-2xl p-2 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[8px] font-black uppercase tracking-wider text-purple-200">TRUE OR FALSE</span>
            <h2 className="text-sm font-black">Meet My AI Friend</h2>
          </div>
          <span className="text-[9px] font-bold text-purple-100">Tick TRUE or FALSE</span>
        </div>

        {/* 6 Statements */}
        <div className="space-y-1 flex-1 min-h-0 my-1 overflow-y-auto">
          {statements.map((st) => {
            const userChoice = p15Answers[st.id]

            return (
              <div key={st.id} className="flex items-center justify-between p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 flex-1 pr-2 leading-tight">
                  {st.id}. {st.text}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      if (st.correct === true) gameAudio.playSuccess()
                      else gameAudio.playError()
                      setP15Answers({ ...p15Answers, [st.id]: true })
                    }}
                    className={`px-2 py-0.5 rounded text-[9px] font-black cursor-pointer ${
                      userChoice === true
                        ? st.correct === true
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    TRUE
                  </button>
                  <button
                    onClick={() => {
                      if (st.correct === false) gameAudio.playSuccess()
                      else gameAudio.playError()
                      setP15Answers({ ...p15Answers, [st.id]: false })
                    }}
                    className={`px-2 py-0.5 rounded text-[9px] font-black cursor-pointer ${
                      userChoice === false
                        ? st.correct === false
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    FALSE
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* HOME CONNECT */}
        <div className="bg-[#FFF3E0] border border-[#FFE0B2] rounded-xl p-1.5 shrink-0 text-[9px] sm:text-[10px] text-amber-950 font-bold">
          🏠 <strong>HOME CONNECT:</strong> Find one AI helper at home with your family. Tell them what it does!
        </div>

        {/* How did I do? Colour a face! */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-1.5 shrink-0 flex items-center justify-between">
          <span className="text-[9px] font-black text-purple-950">How did I do?</span>
          <div className="flex items-center gap-2">
            {[
              { id: 1, emoji: '😄', label: 'I know it well!' },
              { id: 2, emoji: '🙂', label: 'I know some.' },
              { id: 3, emoji: '🤔', label: 'Need practice.' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  gameAudio.playSuccess()
                  setP15FaceRating(f.id)
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                  p15FaceRating === f.id
                    ? 'bg-purple-600 text-white scale-105'
                    : 'bg-white border border-purple-200 text-purple-950'
                }`}
              >
                <span>{f.emoji}</span>
                <span className="text-[8px] font-bold">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN WRAPPER: EXACT DOUBLE BLUE BORDER AS IN GAIO CLASS 3 BOOK PDF
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden bg-white rounded-3xl border-4 border-[#0288D1] shadow-xl p-1 sm:p-2">
      {/* 1. Header Bar matching PDF top line */}
      <div className="shrink-0 flex items-center justify-between px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-slate-500 border-b border-slate-100">
        <span className="tracking-wide">AI OLYMPIAD • CLASS 3</span>
        <span className="text-[#0288D1] uppercase tracking-wider font-black">MONTH 1: AI DISCOVER</span>
      </div>

      {/* 2. Main Page Content Viewport (Strictly 1 screen at a time, NO scrolling) */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderPage2()}
        {currentPage === 3 && renderPage3()}
        {currentPage === 4 && renderPage4()}
        {currentPage === 5 && renderPage5()}
        {currentPage === 6 && renderPage6()}
        {currentPage === 7 && renderPage7()}
        {currentPage === 8 && renderPage8()}
        {currentPage === 9 && renderPage9()}
        {currentPage === 10 && renderPage10()}
      </div>

      {/* 3. Bottom Mobile Page-Turning Navigation Bar */}
      <div className="shrink-0 pt-1.5 pb-0.5 border-t border-slate-200 flex items-center justify-between gap-2 px-1">
        <button
          type="button"
          onClick={handlePrevPage}
          className="py-1.5 px-3 sm:px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft size={14} />
          <span>{currentPage === 1 ? 'Exit' : 'Back'}</span>
        </button>

        {/* Center Page indicator matching PDF page numbering: Pages 6 to 15 */}
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-black text-[#0288D1]">
            Page {currentPage + 5}
          </span>
          <span className="text-[8px] font-bold text-slate-400">
            {currentPage} of 10
          </span>
        </div>

        <button
          type="button"
          onClick={handleNextPage}
          className="py-1.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#0288D1] to-[#01579B] hover:from-[#0277BD] hover:to-[#01579B] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
        >
          <span>{currentPage === 10 ? 'Finish Lesson' : 'Next'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default Class3AuthenticBookExperience
