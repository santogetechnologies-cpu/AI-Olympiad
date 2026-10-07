import { useState } from 'react'
import {
  Eye, Video, RotateCcw,
  CheckCircle2, Car, Users, Zap, Compass
} from 'lucide-react'
import { gamification } from '../../utils/gamification'
import toast from 'react-hot-toast'

interface Class10Props {
  chapterId?: string
  chapterNum?: string | number
  cNum?: string | number
  chapterTitle?: string
  lessonNumber: number
  topicTitle: string
  hookQuestion?: string
  onComplete?: () => void
}

export function Class10SmartCityArchitectExperience({
  cNum = '1',
  lessonNumber,
  topicTitle,
  onComplete
}: Class10Props) {

  // -------------------------------------------------------------
  // LESSON 1 STATE: Computer Vision Camera Stream & Bounding Boxes
  // -------------------------------------------------------------
  const [filterVehicles, setFilterVehicles] = useState<boolean>(true)
  const [filterPedestrians, setFilterPedestrians] = useState<boolean>(true)
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null)

  const detectedObjects = [
    { id: 'obj-1', type: 'vehicle', label: 'Delivery Van', confidence: 97, x: '15%', y: '40%', w: '26%', h: '38%', color: 'border-emerald-400 bg-emerald-500/10' },
    { id: 'obj-2', type: 'pedestrian', label: 'Pedestrian Crossing', confidence: 94, x: '55%', y: '30%', w: '14%', h: '45%', color: 'border-amber-400 bg-amber-500/10' },
    { id: 'obj-3', type: 'vehicle', label: 'Autonomous Shuttle', confidence: 99, x: '72%', y: '48%', w: '24%', h: '34%', color: 'border-cyan-400 bg-cyan-500/10' },
  ]

  // -------------------------------------------------------------
  // LESSON 2 STATE: Autonomous Traffic Dispatch Simulator
  // -------------------------------------------------------------
  const [congestionLevel, setCongestionLevel] = useState<number>(84)
  const [emergencyCorridorActive, setEmergencyCorridorActive] = useState<boolean>(false)
  const [dispatchStatus, setDispatchStatus] = useState<string>('Normal Flow')

  const handleActivateCorridor = async () => {
    setDispatchStatus('Pre-empting signals for incoming Ambulance...')
    setEmergencyCorridorActive(true)
    await new Promise(r => setTimeout(r, 600))
    setCongestionLevel(18)
    setDispatchStatus('Corridor Cleared! Emergency Vehicle Passed!')
    gamification.addXP(35, undefined, `cls10-dispatch-${cNum}`)
    toast.success('🚑 Emergency Green Wave Activated! Congestion dropped to 18%! +35 XP', { icon: '🚦' })
    if (onComplete) onComplete()
  }

  const handleResetCorridor = () => {
    setEmergencyCorridorActive(false)
    setCongestionLevel(84)
    setDispatchStatus('Normal Flow')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 1 ARCHITECTURE: SMART CITY VISION CAMERA STREAM              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 1 && (
        <div className="space-y-6">
          {/* Vision Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border-2 border-teal-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="bg-teal-500/20 text-teal-300 border border-teal-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Video size={14} className="text-teal-400" /> CLASS 10 • SMART VISION LAB
              </span>
              <span className="text-xs font-mono font-bold text-teal-300 bg-black/50 px-3 py-1 rounded-xl border border-teal-500/30">
                Chapter {cNum} • Vision Systems
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {topicTitle}
            </h2>
            <p className="text-sm text-teal-100/90 mt-2 font-medium max-w-2xl leading-relaxed">
              Autonomous smart cities rely on object detection algorithms (like YOLO). Tap bounding boxes below to inspect how AI segments and classifies objects in real-time camera streams!
            </p>
          </div>

          {/* Interactive Simulated Camera Viewport */}
          <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Eye size={20} className="text-teal-600" />
                  Live Optical Stream with Object Detection
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Resolution: 1080p • 60 FPS • Real-time Tensor Inferences
                </p>
              </div>

              {/* Class Filter Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterVehicles(!filterVehicles)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    filterVehicles ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Car size={13} /> Vehicles
                </button>
                <button
                  onClick={() => setFilterPedestrians(!filterPedestrians)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    filterPedestrians ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Users size={13} /> Pedestrians
                </button>
              </div>
            </div>

            {/* Camera Frame Viewport */}
            <div className="relative w-full h-72 sm:h-80 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-inner flex items-center justify-center">
              {/* Synthetic Road Visual */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-90" />
              <div className="absolute bottom-0 w-full h-1/2 bg-slate-950 border-t-2 border-dashed border-amber-400/40" />

              {/* Live Overlay HUD Grid */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-teal-400 bg-black/60 px-2.5 py-1 rounded-md border border-teal-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CAM_04_INTERSECTION_NORTH
              </div>

              {/* Bounding Boxes */}
              {detectedObjects.map(obj => {
                const isVisible = (obj.type === 'vehicle' && filterVehicles) || (obj.type === 'pedestrian' && filterPedestrians)
                if (!isVisible) return null
                const isSelected = selectedBoxId === obj.id

                return (
                  <div
                    key={obj.id}
                    onClick={() => setSelectedBoxId(obj.id)}
                    style={{ left: obj.x, top: obj.y, width: obj.w, height: obj.h }}
                    className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-300 ${obj.color} ${
                      isSelected ? 'ring-4 ring-cyan-400 scale-[1.03] z-10' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className="absolute -top-5 left-0 text-[10px] font-mono font-bold text-white bg-black/80 px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                      {obj.label} ({obj.confidence}%)
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Inspection Detail Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Telemetry Inspector
              </span>
              <p className="text-slate-600 mt-1 font-medium">
                {selectedBoxId
                  ? `Selected Object: ${detectedObjects.find(o => o.id === selectedBoxId)?.label} with ${detectedObjects.find(o => o.id === selectedBoxId)?.confidence}% confidence rating.`
                  : 'Tap any bounding box inside the camera frame above to inspect its bounding parameters.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* LESSON 2 ARCHITECTURE: AUTONOMOUS TRAFFIC DISPATCH SIMULATOR        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {lessonNumber === 2 && (
        <div className="space-y-6">
          {/* Dispatch Hero Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/40 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2">
                <Compass size={14} className="text-blue-400" /> CLASS 10 • TRAFFIC DISPATCH SIMULATOR
              </span>
              <span className="text-xs font-mono font-bold text-blue-300 bg-black/50 px-3 py-1 rounded-xl border border-blue-500/30">
                Intersection Control
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {topicTitle}
            </h2>
            <p className="text-sm text-blue-100/90 mt-2 font-medium max-w-2xl leading-relaxed">
              When emergency responders approach an intersection, smart traffic algorithms dynamically pre-empt signal cycles to open a green corridor. Test the dispatcher below!
            </p>
          </div>

          {/* Interactive Intersection Simulator */}
          <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Zap size={20} className="text-blue-600" />
                  Intersection Congestion Controller
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Current Status: <span className="font-bold text-slate-800 font-mono">{dispatchStatus}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleActivateCorridor}
                  disabled={emergencyCorridorActive}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-red-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  🚑 Dispatch Priority Corridor
                </button>
                <button
                  onClick={handleResetCorridor}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Reset Simulation"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Congestion Gauge Meter */}
            <div className="p-5 rounded-2xl border-2 bg-slate-50 border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700">Grid Congestion Index</span>
                <span className={`font-mono text-base font-black ${congestionLevel > 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {congestionLevel}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${congestionLevel}%` }}
                  className={`h-full transition-all duration-500 ${
                    congestionLevel > 50
                      ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                      : 'bg-gradient-to-r from-teal-400 to-emerald-500'
                  }`}
                />
              </div>

              <p className="text-xs text-slate-500">
                {congestionLevel > 50
                  ? 'Heavy traffic bottleneck at intersection 4th & Elm Ave.'
                  : 'Green corridor active. Traffic clearing smoothly.'}
              </p>
            </div>

            {emergencyCorridorActive && (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                  <div>
                    <p className="text-xs font-black text-emerald-900 uppercase">
                      Emergency Pre-Emption Successful!
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      Intersection lights synchronized to green; ambulance delayed by 0 seconds.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                  +35 XP Earned
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
