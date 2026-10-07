import { useState } from 'react'
import {
  CheckCircle, Sparkles, Volume2,
  Compass, Eye, ArrowRight
} from 'lucide-react'
import { Button } from '../ui'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

export interface Class4To5StoryDetectiveProps {
  chapterNum: string | number
  chapterTitle: string
  topicTitle: string
  lessonNumber: number
  hookQuestion?: string
  onComplete?: () => void
}

export function Class4To5StoryDetectiveExperience({
  chapterNum,
  chapterTitle: _chapterTitle,
  topicTitle,
  hookQuestion,
  onComplete,
}: Class4To5StoryDetectiveProps) {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0)
  const [cluesInspected, setCluesInspected] = useState<Record<string, boolean>>({})
  const [solvedCases, setSolvedCases] = useState<Record<number, boolean>>({})
  const [verdictActive, setVerdictActive] = useState(false)
  const [detectiveXP, setDetectiveXP] = useState(0)

  const cNum = parseInt(String(chapterNum || '1'), 10)

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.pitch = 1.15
      window.speechSynthesis.speak(utterance)
    }
  }

  // Chapter-tailored mystery case files
  const cases = (() => {
    if (cNum === 1) {
      return [
        {
          id: 0,
          badge: '🕵️ Case #101',
          title: 'The Mystery of the Smart School Door',
          story: 'Agent Mia arrives at school. The door automatically opens for registered students wearing school badges, but stays locked for strangers. How does the camera brain make this split-second choice?',
          clues: [
            { id: 'c1', label: '🔍 Clue 1: Camera Vision', text: 'Camera scans face shape and looks for the green school emblem on the badge.', icon: '📷' },
            { id: 'c2', label: '🧠 Clue 2: Logic Rule', text: 'IF badge_verified == TRUE and student_id in database THEN status = "WELCOME"', icon: '💡' },
            { id: 'c3', label: '🚀 Clue 3: Door Actuator', text: 'Door motor unlocks for 5 seconds with a cheerful chime!', icon: '🔓' }
          ],
          question: 'What happens if a student forgets their badge?',
          options: [
            { text: 'The door asks a friendly security teacher to verify! 🛡️', correct: true, feedback: 'Correct deduction! Smart AI always has a safety backup!' },
            { text: 'The door flies away into space 🚀', correct: false, feedback: 'Haha, no! Real AI doors stay grounded.' }
          ]
        },
        {
          id: 1,
          badge: '🛰️ Case #102',
          title: 'Mars Rover Fossil Hunter',
          story: 'Rover Percy is exploring red crater dust on Mars. It discovers a strange glowing rock. Percy must classify whether it is a regular mineral or a Martian fossil without waiting 20 minutes for signals from Earth!',
          clues: [
            { id: 'c1', label: '🔍 Clue 1: Spectrometer Laser', text: 'Laser measures rock density and organic carbon chemical traces.', icon: '🔬' },
            { id: 'c2', label: '🧠 Clue 2: Pattern Matcher', text: 'IF carbon_trace > 0.85 AND shell_texture == TRUE THEN tag as "POTENTIAL_FOSSIL"', icon: '📊' },
            { id: 'c3', label: '🚀 Clue 3: Sample Drill', text: 'Percy drills 2cm core sample and stores it in a sterile titanium tube!', icon: '🧪' }
          ],
          question: 'Why does the rover need onboard AI instead of asking Earth scientists every second?',
          options: [
            { text: 'Radio signals take up to 20 minutes to travel across space! ⏱️', correct: true, feedback: 'Brilliant! AI enables autonomy in deep space exploration!' },
            { text: 'Percy gets lonely without computers 🤖', correct: false, feedback: 'Space is big! The speed of light creates communication delay.' }
          ]
        }
      ]
    }
    return [
      {
        id: 0,
        badge: '🔍 Mystery Case #201',
        title: 'The Secret Pattern in the Wildlife Forest',
        story: 'Forest Rangers installed AI night cameras to protect endangered tigers. When an animal walks past, the camera must snap HD photos only if it detects tiger stripes!',
        clues: [
          { id: 'c1', label: '🔍 Clue 1: Infrared Heat Sensor', text: 'Detects warm body motion moving at 15 km/h.', icon: '🌡️' },
          { id: 'c2', label: '🧠 Clue 2: Stripe Classifier', text: 'IF stripe_count > 12 AND tail_length > 60cm THEN animal = "TIGER"', icon: '🐅' },
          { id: 'c3', label: '🚀 Clue 3: Ranger Alert', text: 'Sends instant GPS location to sanctuary rangers!', icon: '📡' }
        ],
        question: 'How does the tiger recognition program avoid getting tricked by moving tree branches?',
        options: [
          { text: 'It checks both thermal body heat AND stripe patterns together! 🎯', correct: true, feedback: 'Spot on! Multi-sensor fusion ensures high accuracy!' },
          { text: 'It asks the tiger to sign a guestbook 📝', correct: false, feedback: 'Tigers cannot write! Sensor fusion is the real trick.' }
        ]
      },
      {
        id: 1,
        badge: '🤖 Mystery Case #202',
        title: 'The AI Recycling Sorter Challenge',
        story: 'The city recycling conveyor belt moves 50 plastic bottles, soda cans, and cardboard boxes every minute. An AI robotic arm sorts them into clean recycling bins!',
        clues: [
          { id: 'c1', label: '🔍 Clue 1: Material Sensor', text: 'Inductive sensor detects metal aluminum vs transparent PET plastic.', icon: '♻️' },
          { id: 'c2', label: '🧠 Clue 2: Sorting Logic', text: 'IF material == "ALUMINUM" THEN route to Bin A; ELSE IF "PLASTIC" THEN Bin B', icon: '⚡' },
          { id: 'c3', label: '🚀 Clue 3: Air Jet Pusher', text: 'A quick puff of air blows the soda can into the right bin!', icon: '💨' }
        ],
        question: 'What is the main superpower of the AI sorting arm?',
        options: [
          { text: 'It sorts 10x faster than humans and never gets tired! ⚡', correct: true, feedback: 'Awesome! AI helps keep our planet green and clean!' },
          { text: 'It turns plastic into chocolate ice cream 🍦', correct: false, feedback: 'If only! It safely recycles the plastic instead.' }
        ]
      }
    ]
  })()

  const activeCase = cases[selectedCaseIdx] || cases[0]

  const handleInspectClue = (clueId: string, text: string) => {
    setCluesInspected(prev => ({ ...prev, [clueId]: true }))
    speakText(text)
    toast.success('Clue inspected! 🔍')
  }

  const handleSolveCase = (isCorrect: boolean, feedback: string) => {
    if (isCorrect) {
      setSolvedCases(prev => ({ ...prev, [selectedCaseIdx]: true }))
      setVerdictActive(true)
      setDetectiveXP(x => x + 15)
      gamification.addXP(15, undefined, `c45-case-${selectedCaseIdx}`)
      gamification.launchConfetti()
      speakText(feedback)
      toast.success('🎉 Mystery Case Solved! +15 XP')
    } else {
      speakText(feedback)
      toast.error('Not quite! Re-read the clues above!')
    }
  }

  const allSolved = cases.every((_, i) => solvedCases[i])

  return (
    <div className="space-y-6 max-w-3xl mx-auto touch-manipulation pb-6">
      
      {/* ── 1. DETECTIVE AGENCY COMIC HEADER ── */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 sm:p-7 rounded-3xl border-4 border-amber-300 text-white shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="bg-white/95 text-amber-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5">
            <Compass size={14} className="text-amber-700" /> Class 4–5 AI Detective Agency
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-amber-900/60 border border-amber-300/40 text-xs font-black px-3 py-0.5 rounded-full">
              ⭐ {detectiveXP} Detective XP
            </span>
            <button
              onClick={() => speakText(`Welcome to ${topicTitle}! Solve the mystery cases by inspecting clues and deducing how smart AI programs make decisions!`)}
              className="bg-white text-amber-950 text-xs font-black px-3 py-1 rounded-full hover:bg-amber-100 flex items-center gap-1 cursor-pointer"
            >
              <Volume2 size={13} /> Listen 🔊
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black leading-tight">
            {topicTitle}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-bold mt-1">
            {hookQuestion || 'Investigate clue cards, decode logic flowcharts, and solve the mission below!'}
          </p>
        </div>
      </div>

      {/* ── 2. CASE SELECTOR TABS ── */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
          Active Case Files:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseIdx(i)
                setVerdictActive(false)
              }}
              className={`p-3.5 rounded-2xl border-3 text-left transition-all cursor-pointer flex items-center justify-between ${
                selectedCaseIdx === i
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
              }`}
            >
              <div>
                <span className={`text-[10px] font-black uppercase block ${selectedCaseIdx === i ? 'text-amber-200' : 'text-amber-700'}`}>
                  {c.badge}
                </span>
                <span className="text-xs sm:text-sm font-black leading-snug">{c.title}</span>
              </div>
              {solvedCases[i] && (
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0">
                  ✓ Solved
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. STORY COMIC BRIEFING ── */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-3 border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase">
          <Sparkles size={16} className="text-amber-600" />
          <span>Case Briefing & Scene Investigation:</span>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
          {activeCase.story}
        </div>

        {/* 3 Interactive Clue Cards */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
            Tap Each Clue Card to Inspect Evidence:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeCase.clues.map(clue => {
              const inspected = cluesInspected[clue.id]
              return (
                <button
                  key={clue.id}
                  onClick={() => handleInspectClue(clue.id, clue.text)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${
                    inspected
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200/50'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-white active:scale-98'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{clue.icon}</span>
                      {inspected && (
                        <span className="text-[9px] font-black text-emerald-800 bg-emerald-200 px-1.5 py-0.5 rounded-full">
                          ✓ Checked
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-black text-amber-900 block">{clue.label}</span>
                    <p className="text-[11px] text-slate-700 font-medium leading-snug">{clue.text}</p>
                  </div>
                  <span className="text-[9px] text-blue-600 font-bold mt-2 flex items-center gap-1">
                    <Eye size={11} /> {inspected ? 'Listen Again 🔊' : 'Tap to Inspect 🔍'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Deduction Decision Challenge */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <h4 className="text-xs sm:text-sm font-black text-slate-900">
            🎯 Detective Deduction: {activeCase.question}
          </h4>

          <div className="space-y-2">
            {activeCase.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSolveCase(opt.correct, opt.feedback)}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-gradient-to-r from-white to-amber-50/30 text-left font-black text-xs sm:text-sm text-slate-900 transition-all active:scale-98 flex items-center gap-3 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center flex-shrink-0">
                  {i === 0 ? 'A' : 'B'}
                </div>
                <span className="flex-1">{opt.text}</span>
              </button>
            ))}
          </div>

          {verdictActive && (
            <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-950 font-black text-xs sm:text-sm flex items-center gap-2.5 animate-in zoom-in-95">
              <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
              <span>Verdict Verified! You solved this case and earned +15 Detective XP!</span>
            </div>
          )}
        </div>
      </div>

      {/* ── 4. DETECTIVE BADGE PROGRESSION ── */}
      <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shadow-xs">
            🕵️
          </div>
          <div>
            <p className="text-xs font-black text-slate-800">Master Detective Badge</p>
            <p className="text-[10px] text-slate-500 font-semibold">
              {allSolved ? 'All cases cracked! Ready to advance.' : 'Solve all cases in this chapter to unlock.'}
            </p>
          </div>
        </div>

        {allSolved && onComplete && (
          <Button
            onClick={onComplete}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2 rounded-2xl shadow-md cursor-pointer"
            icon={<ArrowRight size={14} />}
          >
            Advance to Next Section →
          </Button>
        )}
      </div>
    </div>
  )
}
