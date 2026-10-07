import { useState } from 'react'
import {
  Sparkles, CheckCircle2,
  Compass, Eye, Play
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import { AssignedImageSlot, type CanonicalSection } from './AssignedImageSlot'
import { getCurriculumTopicProfile } from '../../services/curriculumTopicRegistry'

export function Section1SceneExploration({
  section,
  gradeKey: _gradeKey,
  chapterNum: _chapterNum,
  isCompleted: _isCompleted,
  onComplete,
}: {
  section: CanonicalSection
  gradeKey: string
  chapterNum: string | number
  isCompleted: boolean
  onComplete: () => void
}) {
  const profile = getCurriculumTopicProfile(section.topicTitle || section.title)
  const [discoveredBeacons, setDiscoveredBeacons] = useState<number[]>([0])
  const [activeBeacon, setActiveBeacon] = useState<number>(0)
  const [showVideo, setShowVideo] = useState(false)

  // Derive 3 exploration hotspots from topic profile
  const hotspots = [
    {
      id: 0,
      title: profile.step1?.title || 'Sensor & Input Zone',
      desc: profile.step1?.desc || 'Smart camera and microphone arrays capture raw signals from the environment.',
      detail: profile.step1?.detail || 'Isolates clean data patterns from background interference.',
      icon: '📡',
      x: '20%',
      y: '30%',
    },
    {
      id: 1,
      title: profile.step2?.title || 'AI Decision Core',
      desc: profile.step2?.desc || 'Evaluates patterns against mathematical rule weights to make an optimal choice.',
      detail: profile.step2?.detail || 'Computes high-confidence decisions in under 10 milliseconds.',
      icon: '🧠',
      x: '50%',
      y: '65%',
    },
    {
      id: 2,
      title: profile.step3?.title || 'Real-World Actuator',
      desc: profile.step3?.desc || 'Outputs the decision into safe physical actions or clear human feedback.',
      detail: profile.step3?.detail || 'Empowers people with fast, accurate assistance in society.',
      icon: '🚀',
      x: '80%',
      y: '35%',
    },
  ]

  const handleTapHotspot = (idx: number) => {
    setActiveBeacon(idx)
    if (!discoveredBeacons.includes(idx)) {
      const next = [...discoveredBeacons, idx]
      setDiscoveredBeacons(next)
      gamification.addXP(10, undefined, `scene-hotspot-${idx}`)
      toast.success(`🔍 Discovered: ${hotspots[idx].title}! (+10 XP)`)
      if (next.length === hotspots.length) {
        gamification.launchConfetti()
        toast.success('🌟 Scene Fully Explored! All discovery beacons activated!')
      }
    }
  }

  const allDiscovered = discoveredBeacons.length === hotspots.length

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-cyan-100 text-cyan-800 text-xs font-black">
            <Compass size={16} />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600">
              Interactive Scene Exploration
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
            {discoveredBeacons.length}/{hotspots.length} Discovered
          </span>
          {section.videoUrl && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer hover:bg-slate-800"
            >
              <Play size={12} fill="currentColor" /> {showVideo ? 'Hide Video' : 'Watch Video'}
            </button>
          )}
        </div>
      </div>

      {/* Video Player Modal/Slot */}
      {showVideo && section.videoUrl && (
        <div className="bg-black rounded-3xl overflow-hidden shadow-xl aspect-video border-2 border-slate-800">
          <iframe
            src={section.videoUrl}
            title={section.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Interactive Environment Canvas with Pulsing Beacons */}
      <div className="relative w-full h-72 sm:h-80 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-2 border-slate-800 overflow-hidden shadow-inner p-4">
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Scene SVG Graphics */}
        <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 600 300">
          <path d="M 50 150 Q 150 50 300 150 T 550 150" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M 100 220 Q 250 280 400 200 T 550 220" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="300" cy="150" r="80" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* Instructions pill */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-3 py-1 rounded-full text-[11px] text-cyan-300 font-bold flex items-center gap-1.5 z-10 shadow-sm">
          <Eye size={13} /> Tap the pulsing beacons to explore how AI works in this environment:
        </div>

        {/* Interactive Beacons */}
        {hotspots.map((spot, idx) => {
          const isFound = discoveredBeacons.includes(idx)
          const isSelected = activeBeacon === idx

          return (
            <button
              key={spot.id}
              onClick={() => handleTapHotspot(idx)}
              style={{ left: spot.x, top: spot.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl flex items-center justify-center transition-all duration-300 z-20 cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 scale-125 shadow-lg shadow-cyan-500/50 ring-4 ring-cyan-300'
                  : isFound
                  ? 'bg-slate-800 text-white border-2 border-cyan-400 hover:scale-110 shadow-md'
                  : 'bg-indigo-600 text-white animate-bounce hover:scale-110 shadow-lg shadow-indigo-500/40'
              }`}
            >
              <span className="text-xl">{spot.icon}</span>
              {!isFound && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
              )}
            </button>
          )
        })}
      </div>

      {/* Selected Hotspot Revelation Card */}
      {activeBeacon !== null && (
        <div className="bg-white rounded-3xl border-2 border-cyan-200 p-4 sm:p-5 shadow-sm space-y-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200 flex items-center gap-1">
              <span>{hotspots[activeBeacon].icon}</span>
              Beacon #{activeBeacon + 1}
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              {discoveredBeacons.includes(activeBeacon) ? '✓ Discovered' : 'Click to inspect'}
            </span>
          </div>

          <h4 className="text-base font-black text-slate-900">
            {hotspots[activeBeacon].title}
          </h4>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {hotspots[activeBeacon].desc}
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-700 font-medium flex items-start gap-2">
            <Sparkles size={16} className="text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Technical Mechanism: </strong>
              {hotspots[activeBeacon].detail}
            </div>
          </div>
        </div>
      )}

      {/* Everyday Real-World Analogy */}
      {profile.analogy && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
          <span className="text-lg">💡</span>
          <div className="text-xs text-amber-950 font-medium">
            <strong className="text-amber-800">Everyday Real-Life Analogy: </strong>
            {profile.analogy}
          </div>
        </div>
      )}

      {/* Assigned CMS image if any */}
      <AssignedImageSlot
        classKey="curriculum"
        chapterNum={1}
        sectionKey={section.id}
        position="header"
      />

      {/* Completion Button */}
      <button
        onClick={onComplete}
        className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-md ${
          allDiscovered
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98'
            : 'bg-slate-900 hover:bg-slate-800 text-white'
        }`}
      >
        {allDiscovered ? (
          <>
            <CheckCircle2 size={18} /> Exploration Complete! Advance to Next Activity
          </>
        ) : (
          <>Continue to Next Activity</>
        )}
      </button>
    </div>
  )
}
