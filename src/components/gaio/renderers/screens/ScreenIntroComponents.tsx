// ─────────────────────────────────────────────────────────────────────────────
// SCREEN INTRO COMPONENTS (Pages 1 to 4)
// Cover • Welcome Bolt • Activity Guide • Student Profile • Favourites • Roadmap
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import type { GaioScreenItem } from '../../types'
import { Sparkles, BookOpen, Volume2, CheckCircle2, Award, Star, Compass, User, Palette } from 'lucide-react'
import { gameAudio } from '../../../../utils/gameAudio'
import { auraSpeechService } from '../../../../services/auraSpeechService'

interface ScreenProps {
  screen: GaioScreenItem
  onNext: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
}

// 1. SCREEN COVER (P1)
export const ScreenCover: React.FC<ScreenProps> = ({ screen, onNext }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center text-center p-2 bg-gradient-to-b from-sky-50 via-white to-sky-100 rounded-2xl select-none animate-in fade-in duration-300">
      {/* Top Badge */}
      <div className="pt-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0288D1]/10 text-[#0288D1] text-[10px] sm:text-xs font-black tracking-wide border border-[#0288D1]/20">
          <Sparkles size={12} className="text-amber-500" />
          GLOBAL ARTIFICIAL INTELLIGENCE OLYMPIAD • CLASS 3
        </span>
      </div>

      {/* Authentic Original PDF Cover */}
      <div className="flex-1 w-full min-h-0 flex items-center justify-center py-1">
        <div className="relative max-h-full max-w-full rounded-2xl overflow-hidden shadow-xl border-2 border-sky-300 bg-white">
          <img
            src={screen.sourcePdfImage || '/gaio/class3/pages/page_1.png'}
            alt="GAIO Class 3 Book Cover"
            className="max-h-[380px] sm:max-h-[440px] w-auto object-contain"
          />
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full pb-1 pt-1">
        <button
          onClick={() => {
            gameAudio.playSuccess()
            onNext()
          }}
          className="w-full py-2.5 rounded-2xl bg-[#0288D1] hover:bg-sky-600 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen size={16} />
          <span>Open Book & Begin Journey →</span>
        </button>
      </div>
    </div>
  )
}

// 2. SCREEN WELCOME BOLT (P2 - Part 1)
export const ScreenWelcomeBolt: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleSayHello = () => {
    gameAudio.playSuccess()
    setHasInteracted(true)
    auraSpeechService.speak("Hi! I am Bolt, your robot friend. Together we will see, play, build and learn all about AI. Are you ready? Let's go!")
  }

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="bg-gradient-to-r from-sky-500 to-[#0288D1] text-white rounded-2xl p-2 shadow-xs flex items-center justify-between shrink-0">
        <div>
          <span className="text-[9px] font-black uppercase tracking-wider text-sky-200">
            AI OLYMPIAD • CLASS 3 • WELCOME!
          </span>
          <h2 className="text-xs sm:text-sm font-black leading-tight">Hello, Super Kids! MEET BOLT!</h2>
        </div>
        <button
          onClick={handleSayHello}
          className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          title="Listen to Bolt"
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* Interactive Dialogue with Authentic Bolt Artwork */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-2.5 my-1">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-sky-50 p-1.5 border-2 border-sky-300 shadow-md flex items-center justify-center">
          <img
            src="/gaio/class3/page_assets/page_2/img_17_288x288.jpeg"
            alt="Bolt Mascot"
            className="w-full h-full object-contain drop-shadow-sm"
            onError={(e) => {
              // Fallback if needed
              (e.target as HTMLImageElement).src = '/gaio/class3/pages/page_2.png'
            }}
          />
        </div>

        {/* Speech Bubble */}
        <div className="relative bg-white border-2 border-[#0288D1] rounded-2xl p-2.5 shadow-md max-w-sm text-center">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-t-2 border-l-2 border-[#0288D1] rotate-45" />
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
            "Hi! I am Bolt, your robot friend. Together we will see, play, build and learn all about AI. Are you ready? Let's go!"
          </p>
        </div>

        <button
          onClick={handleSayHello}
          className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles size={13} />
          <span>Say Hello to Bolt!</span>
        </button>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
        >
          Continue to Book Guide →
        </button>
      </div>
    </div>
  )
}

// 3. SCREEN BOOK GUIDE (P2 - Part 2)
export const ScreenBookGuide: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const guideItems = screen.payload?.guideItems || [
    { name: "LET'S LEARN", desc: "Learn something new with Bolt" },
    { name: "PICTURE STORY", desc: "Read an illustrated comic story" },
    { name: "LOOK AROUND YOU", desc: "See AI helpers in real life" },
    { name: "LET'S DO IT!", desc: "Hands-on playful activity" },
    { name: "WORKSHEET", desc: "Write, tick and solve tasks" },
    { name: "PUZZLE FUN", desc: "Solve visual logic puzzles" },
    { name: "TRACE & COLOUR", desc: "Trace words and colour art" },
    { name: "QUIZ TIME", desc: "Earn stars with quiz questions" },
    { name: "TRUE OR FALSE", desc: "Identify facts and connect at home" },
    { name: "MAGIC WORDS", desc: "Key AI vocabulary words" }
  ]

  const guideIconImages: Record<string, string> = {
    "LET'S LEARN": '/gaio/class3/page_assets/page_2/img_35_175x175.jpeg',
    "PICTURE STORY": '/gaio/class3/page_assets/page_2/img_39_175x175.jpeg',
    "LOOK AROUND YOU": '/gaio/class3/page_assets/page_2/img_44_175x175.jpeg',
    "LET'S DO IT!": '/gaio/class3/page_assets/page_2/img_48_175x175.jpeg',
    "WORKSHEET": '/gaio/class3/page_assets/page_2/img_53_175x175.jpeg',
    "PUZZLE FUN": '/gaio/class3/page_assets/page_2/img_57_175x175.jpeg',
    "TRACE & COLOUR": '/gaio/class3/page_assets/page_2/img_62_175x175.jpeg',
    "QUIZ TIME": '/gaio/class3/page_assets/page_2/img_66_175x175.jpeg',
    "TRUE OR FALSE": '/gaio/class3/page_assets/page_2/img_71_175x175.jpeg',
    "MAGIC WORDS": '/gaio/class3/page_assets/page_2/img_75_175x175.jpeg',
  }

  const [activeItem, setActiveItem] = useState<number | null>(null)

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-slate-100">
        <h2 className="text-sm font-black text-slate-900">
          Look for these pictures in your book:
        </h2>
        <p className="text-[10px] text-slate-500">
          Tap each activity icon to see what you will do!
        </p>
      </div>

      {/* 10-Item Grid with Authentic Icons */}
      <div className="flex-1 grid grid-cols-2 gap-1.5 py-1.5 overflow-hidden">
        {guideItems.map((item: any, idx: number) => {
          const isSelected = activeItem === idx
          const iconSrc = guideIconImages[item.name]

          return (
            <button
              key={idx}
              onClick={() => {
                gameAudio.playTap()
                setActiveItem(idx)
                auraSpeechService.speak(`${item.name}. ${item.desc}`)
              }}
              className={`p-1.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-sky-100 border-[#0288D1] shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-white border border-sky-100 p-0.5 flex items-center justify-center">
                {iconSrc ? (
                  <img src={iconSrc} alt={item.name} className="w-full h-full object-contain" />
                ) : (
                  <Sparkles size={14} className="text-sky-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black text-[#0288D1] block truncate">
                  {item.name}
                </span>
                <span className="text-[8px] font-medium text-slate-600 block line-clamp-1 leading-tight">
                  {item.desc}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: All About Me →
        </button>
      </div>
    </div>
  )
}

// 4. SCREEN STUDENT PROFILE (P3 - Part 1)
export const ScreenStudentProfile: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const [profile, setProfile] = useState<any>(savedAnswer || {
    name: '',
    age: '8',
    grade: 'Class 3',
    teacher: '',
    avatar: '🤖'
  })

  const handleChange = (field: string, val: string) => {
    const updated = { ...profile, [field]: val }
    setProfile(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  const avatars = ['🤖', '🚀', '🌟', '🐱', '🐶', '🦊']

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase tracking-wider text-sky-600">
          STUDENT PASSPORT
        </span>
        <h2 className="text-sm sm:text-base font-black text-slate-900">
          All About Me!
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-around py-1 space-y-2">
        {/* Avatar Picker */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-500 mb-1">Choose your Explorer Avatar:</span>
          <div className="flex gap-2">
            {avatars.map((av) => (
              <button
                key={av}
                onClick={() => handleChange('avatar', av)}
                className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                  profile.avatar === av
                    ? 'bg-sky-200 border-2 border-[#0288D1] scale-110 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields matching exact PDF lines: My name, My age, My class, My teacher */}
        <div className="space-y-1.5 px-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 w-20 shrink-0">My name:</span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Type your name"
              className="flex-1 py-1 px-2.5 rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0288D1] outline-hidden bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 w-20 shrink-0">My age:</span>
            <input
              type="text"
              value={profile.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="e.g. 8"
              className="w-20 py-1 px-2.5 rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0288D1] outline-hidden bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 w-20 shrink-0">My class:</span>
            <input
              type="text"
              value={profile.grade}
              onChange={(e) => handleChange('grade', e.target.value)}
              placeholder="Class 3"
              className="w-24 py-1 px-2.5 rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0288D1] outline-hidden bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 w-20 shrink-0">My teacher:</span>
            <input
              type="text"
              value={profile.teacher}
              onChange={(e) => handleChange('teacher', e.target.value)}
              placeholder="Teacher's name"
              className="flex-1 py-1 px-2.5 rounded-lg border border-slate-300 text-xs font-bold focus:border-[#0288D1] outline-hidden bg-white"
            />
          </div>
        </div>
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Save & Next: My Favourites →
        </button>
      </div>
    </div>
  )
}

// 5. SCREEN STUDENT FAVES (P3 - Part 2)
export const ScreenStudentFaves: React.FC<ScreenProps> = ({ screen, onNext, savedAnswer, onSaveAnswer }) => {
  const [faves, setFaves] = useState<any>(savedAnswer || {
    colour: 'Blue',
    food: 'Idli & Sambar',
    animal: 'Elephant',
    game: 'Tag',
    book: 'Robot Tales',
    dreamJob: 'AI Scientist',
    boltGoal: 'How robots learn to see and talk'
  })

  const handleChange = (k: string, v: string) => {
    const updated = { ...faves, [k]: v }
    setFaves(updated)
    if (onSaveAnswer) onSaveAnswer(updated)
  }

  const items = [
    { key: 'colour', label: 'Colour' },
    { key: 'food', label: 'Food' },
    { key: 'animal', label: 'Animal' },
    { key: 'game', label: 'Game' },
    { key: 'book', label: 'Book' },
    { key: 'dreamJob', label: 'Dream job' },
  ]

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <h2 className="text-sm font-black text-slate-900">
          My Favourite Things
        </h2>
        <p className="text-[10px] text-slate-500">
          Share your favourites with Bolt!
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-1.5 py-1.5">
        {items.map((it) => (
          <div key={it.key} className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-500">{it.label}</span>
            <input
              type="text"
              value={faves[it.key] || ''}
              onChange={(e) => handleChange(it.key, e.target.value)}
              placeholder="Type here..."
              className="w-full py-0.5 px-1 bg-white border border-slate-200 rounded-md text-[11px] font-bold focus:border-[#0288D1] outline-hidden"
            />
          </div>
        ))}
      </div>

      {/* BOLT ASKS */}
      <div className="shrink-0 p-2 rounded-xl bg-amber-50 border border-amber-200">
        <span className="text-[10px] font-black text-amber-800 block">
          ⚡ BOLT ASKS: What do you want to learn about AI?
        </span>
        <input
          type="text"
          value={faves.boltGoal || ''}
          onChange={(e) => handleChange('boltGoal', e.target.value)}
          placeholder="I want to learn..."
          className="w-full mt-1 py-1 px-2 bg-white border border-amber-300 rounded-lg text-xs font-bold outline-hidden focus:border-amber-500"
        />
      </div>

      <div className="shrink-0 pt-1.5">
        <button
          onClick={onNext}
          className="w-full py-2 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          Next: 6-Month Roadmap →
        </button>
      </div>
    </div>
  )
}

// 6. SCREEN JOURNEY MAP (P4)
export const ScreenJourneyMap: React.FC<ScreenProps> = ({ screen, onNext }) => {
  const months = screen.payload?.months || []
  const semester = screen.payload?.semester || 1

  return (
    <div className="w-full h-full flex flex-col justify-between p-2.5 select-none text-slate-800 animate-in fade-in duration-200">
      <div className="shrink-0 text-center pb-1 border-b border-sky-100">
        <span className="text-[9px] font-black uppercase tracking-wider text-[#0288D1]">
          {semester === 1 ? 'SEMESTER 1 • MONTHS 1 TO 3' : 'SEMESTER 2 • MONTHS 4 TO 6'}
        </span>
        <h2 className="text-sm sm:text-base font-black text-slate-900">
          My 6-Month AI Journey
        </h2>
        <p className="text-[10px] text-slate-500">
          Follow the path. One month at a time!
        </p>
      </div>

      {/* Authentic Journey Map Banner */}
      <div className="shrink-0 my-1 rounded-2xl overflow-hidden border-2 border-sky-300 shadow-xs h-24 sm:h-28 bg-sky-50 relative flex items-center justify-center">
        <img
          src="/gaio/class3/page_assets/page_4/img_219_1500x560.jpeg"
          alt="6-Month Journey Map Path"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/gaio/class3/pages/page_4.png'
          }}
        />
      </div>

      {/* 3 Month Cards */}
      <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5">
        {months.map((m: any, idx: number) => (
          <div
            key={idx}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-sky-50 to-white border-2 border-sky-200 shadow-xs flex items-center justify-between"
          >
            <div className="space-y-0.5">
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#0288D1] text-white">
                {m.title}
              </span>
              <div className="text-xs font-black text-slate-800 pt-0.5">
                Area: {m.area}
              </div>
              <div className="text-[10px] font-medium text-slate-500">
                {m.topics.join(' • ')}
              </div>
            </div>
            <span className="text-xl">🌟</span>
          </div>
        ))}
      </div>

      <div className="shrink-0 pt-1">
        <button
          onClick={onNext}
          className="w-full py-2.5 rounded-xl bg-[#0288D1] hover:bg-sky-600 text-white font-bold text-xs transition-all cursor-pointer"
        >
          {semester === 1 ? 'Next: Semester 2 Roadmap →' : 'Enter Month 1: AI DISCOVER →'}
        </button>
      </div>
    </div>
  )
}
