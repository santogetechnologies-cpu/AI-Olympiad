import { useState } from 'react'
import {
  Search, CheckCircle2,
  AlertTriangle, Wrench, ShieldAlert
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'
import type { CanonicalSection } from './AssignedImageSlot'

export function Section6MysteryBugHunt({
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
  const bugs = [
    {
      id: 1,
      title: 'Sensor Glitch: Lens Reflection',
      desc: 'Sun glare caused the camera to see a ghost obstacle on an empty road.',
      isGlitch: true,
      hint: 'Notice the false positive reading caused by unshielded glare.',
    },
    {
      id: 2,
      title: 'Normal Component: Battery Telemetry',
      desc: 'Battery is at 94% health and operating at nominal temperature.',
      isGlitch: false,
      hint: 'This subsystem is completely healthy.',
    },
    {
      id: 3,
      title: 'Normal Component: Speed Governor',
      desc: 'Vehicle speed is locked strictly to 40 km/h in school zones.',
      isGlitch: false,
      hint: 'Speed control logic is functioning properly.',
    },
  ]

  const [inspectedBugs, setInspectedBugs] = useState<number[]>([])
  const [fixedGlitch, setFixedGlitch] = useState(false)

  const handleInspect = (id: number) => {
    if (!inspectedBugs.includes(id)) {
      setInspectedBugs(prev => [...prev, id])
    }
  }

  const handleFixGlitch = () => {
    setFixedGlitch(true)
    gamification.addXP(25, undefined, `mystery-bug-${section.id}`)
    gamification.launchConfetti()
    toast.success('🔧 Glitch Patched! Polarizing filter added to block glare!')
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
            <Search size={16} />
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">
              Interactive Mystery & Bug Hunt
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              {section.title}
            </h3>
          </div>
        </div>

        <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
          <ShieldAlert size={12} /> 1 Anomaly Hidden
        </span>
      </div>

      {/* Briefing */}
      <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-4 text-xs text-rose-950 font-medium space-y-1">
        <div className="font-black flex items-center gap-1 text-rose-800">
          <AlertTriangle size={15} /> System Diagnostic Alert:
        </div>
        <p className="text-slate-600">
          The {section.topicTitle || 'AI system'} flagged an unexpected error during field deployment. Inspect the 3 subsystems below to spot the exact mistake, then apply the patch!
        </p>
      </div>

      {/* Subsystem Cards */}
      <div className="space-y-2.5">
        {bugs.map(b => {
          const inspected = inspectedBugs.includes(b.id)
          return (
            <div
              key={b.id}
              onClick={() => handleInspect(b.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                inspected
                  ? b.isGlitch
                    ? 'bg-rose-950/20 border-rose-400 text-slate-900'
                    : 'bg-emerald-50/50 border-emerald-300 text-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{b.isGlitch ? '⚠️' : '✅'}</span>
                  <div>
                    <h4 className="text-xs font-black">{b.title}</h4>
                    {inspected && <p className="text-[11px] text-slate-500 mt-0.5">{b.desc}</p>}
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-400">
                  {inspected ? (b.isGlitch ? '🚨 Glitch Spotted' : '✓ Normal') : 'Tap to scan'}
                </span>
              </div>

              {inspected && b.isGlitch && !fixedGlitch && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleFixGlitch()
                  }}
                  className="mt-3 w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Wrench size={13} /> Patch & Recalibrate Subsystem
                </button>
              )}
            </div>
          )
        })}
      </div>

      {fixedGlitch && (
        <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-3xl text-center space-y-1 animate-in fade-in duration-300">
          <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
          <h4 className="text-xs font-black text-emerald-950">System Recalibrated & Healthy!</h4>
          <p className="text-[11px] text-emerald-800 font-medium">
            Excellent forensic discovery! You protected the system from sensor hallucination.
          </p>
        </div>
      )}

      {/* Advance Button */}
      <button
        onClick={onComplete}
        className="w-full py-3.5 rounded-2xl font-black text-sm bg-rose-600 hover:bg-rose-500 text-white cursor-pointer transition shadow-md flex items-center justify-center gap-2 active:scale-98"
      >
        <CheckCircle2 size={18} />
        Complete Bug Hunt & Continue
      </button>
    </div>
  )
}
