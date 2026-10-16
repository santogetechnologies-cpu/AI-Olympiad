// ─────────────────────────────────────────────────────────────────────────────
// BOLT AI COMPANION PANEL (SPLIT VIEW & OVERLAY DRAWER)
// Interactive audio read-aloud, page explanation, smart quiz, and chat companion
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Bot,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Award,
  ChevronRight,
  Send,
  X,
  CheckCircle2,
  Star,
  Brain,
  Lightbulb,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { gameAudio } from '../../../utils/gameAudio'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export interface GaioAiCompanionPanelProps {
  pageNumber: number
  pageText: string
  bookTitle: string
  stars: number
  onAddStar?: (count?: number) => void
  layoutMode: 'split' | 'overlay'
  isOpen: boolean
  onClose?: () => void
  onToggleLayout?: () => void
}

interface ChatMessage {
  id: string
  sender: 'bolt' | 'user'
  text: string
  time: string
}

export const GaioAiCompanionPanel: React.FC<GaioAiCompanionPanelProps> = ({
  pageNumber,
  pageText,
  bookTitle,
  stars,
  onAddStar,
  layoutMode,
  isOpen,
  onClose,
  onToggleLayout
}) => {
  // Tabs: 'read' | 'explain' | 'quiz' | 'chat'
  const [activeTab, setActiveTab] = useState<'read' | 'explain' | 'quiz' | 'chat'>('read')

  // Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [speechRate, setSpeechRate] = useState<number>(0.95) // Kid friendly speed
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [quizScore, setQuizScore] = useState<number>(0)

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bolt',
      text: `Beep boop! 🤖 I am Bolt, your AI buddy for Page ${pageNumber}! How can I help you today?`,
      time: 'Just now'
    }
  ])
  const [inputQuestion, setInputQuestion] = useState<string>('')
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // Stop speech when page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlayingAudio(false)
    setSelectedAnswer(null)
    setQuizFeedback(null)

    // Update greeting for new page
    setChatMessages((prev) => [
      ...prev,
      {
        id: `page-${pageNumber}-${Date.now()}`,
        sender: 'bolt',
        text: `We are on Page ${pageNumber}! Want me to read it aloud or explain the activities? ✨`,
        time: 'Just now'
      }
    ])
  }, [pageNumber])

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // 1. Text to Speech Controller
  const cleanSpeechText = useMemo(() => {
    if (!pageText || pageText.trim().length === 0) {
      return `Page ${pageNumber}. Explore the illustrations and activities on this page!`
    }
    // Clean up excessive punctuation or artifact headers
    return pageText
      .replace(/GAIO\s+•\s+GLOBAL\s+AI\s+OLYMPIAD\s+•\s+CLASS\s+\d+/gi, '')
      .replace(/MONTH\s+\d+:\s+[^|]+/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
  }, [pageText, pageNumber])

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      toast.error('Speech synthesis is not supported on this browser.')
      return
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      gameAudio.playTap()
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText)
    utterance.rate = speechRate
    utterance.pitch = 1.1 // Slightly friendly energetic pitch for Bolt

    // Pick an expressive English voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (v) => (v.lang.startsWith('en') && v.name.includes('Natural')) || v.name.includes('Google') || v.name.includes('Samantha')
    )
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => {
      setIsPlayingAudio(true)
      gameAudio.playCoin()
    }

    utterance.onend = () => {
      setIsPlayingAudio(false)
      gameAudio.playSuccess()
      onAddStar?.(1)
      confetti({ particleCount: 25, spread: 50, origin: { x: 0.8, y: 0.8 } })
      toast.success('Finished listening! +1 Star ⭐')
    }

    utterance.onerror = () => {
      setIsPlayingAudio(false)
    }

    synthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  // 2. Dynamic Page Explanation
  const pageSummaryBullets = useMemo(() => {
    if (!cleanSpeechText || cleanSpeechText.length < 20) {
      return [
        'Explore the colorful visuals and diagrams on this page.',
        'Use your pen and highlighter to mark important ideas or solve the activity.',
        'Ask Bolt any question if you want a clue!'
      ]
    }

    const sentences = cleanSpeechText
      .split(/(?<=[.?!])\s+/)
      .filter((s) => s.length > 15)
      .slice(0, 4)

    if (sentences.length > 0) return sentences
    return [
      'Welcome to this lesson topic in your AI Olympiad journey!',
      'Follow along step by step and practice with the on-page exercises.'
    ]
  }, [cleanSpeechText])

  // 3. Dynamic Quick Quiz
  const currentQuiz = useMemo(() => {
    // Generate an interactive question based on content
    const lower = cleanSpeechText.toLowerCase()

    if (lower.includes('sensor') || lower.includes('camera') || lower.includes('microphone')) {
      return {
        question: 'What helps an AI system understand its surroundings (like seeing and hearing)?',
        options: ['Sensors (cameras, mics)', 'Wooden wheels', 'Battery acid only', 'Cardboard boxes'],
        correctIndex: 0,
        explanation: 'AI uses sensors like cameras and microphones to see and listen to the world, just like human eyes and ears!'
      }
    }

    if (lower.includes('robot') || lower.includes('bolt')) {
      return {
        question: 'Which of the following is true about robots with AI?',
        options: ['They can learn and help people', 'They sleep in a bed at night', 'They eat real pizza', 'They have feelings like anger'],
        correctIndex: 0,
        explanation: 'AI robots are programmed to learn and assist humans with helpful tasks!'
      }
    }

    if (lower.includes('safe') || lower.includes('rule') || lower.includes('privacy')) {
      return {
        question: 'What is the most important rule when exploring AI online?',
        options: ['Protect your personal information & ask parents', 'Share passwords with strangers', 'Turn off all screens forever', 'Never learn new things'],
        correctIndex: 0,
        explanation: 'Always protect your personal privacy and consult teachers or parents!'
      }
    }

    // Default question for any page
    return {
      question: `On Page ${pageNumber}, what is our key learning goal?`,
      options: [
        'Understand the AI concepts and practice the activity',
        'Ignore the page and skip ahead',
        'Close the book immediately',
        'Erase all words'
      ],
      correctIndex: 0,
      explanation: 'Great job! Engaging with each concept helps you achieve Olympiad Mastery!'
    }
  }, [cleanSpeechText, pageNumber])

  const handleAnswerSubmit = (index: number) => {
    setSelectedAnswer(index)
    if (index === currentQuiz.correctIndex) {
      setQuizFeedback('correct')
      gameAudio.playSuccess()
      setQuizScore((s) => s + 1)
      onAddStar?.(2)
      confetti({ particleCount: 35, spread: 60, origin: { x: 0.85, y: 0.7 } })
      toast.success('Awesome job! +2 Stars ⭐⭐')
    } else {
      setQuizFeedback('wrong')
      gameAudio.playWrong()
    }
  }

  // 4. Chat / Ask Bolt Handler
  const handleSendChat = (questionText?: string) => {
    const q = questionText || inputQuestion
    if (!q.trim()) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      time: 'Just now'
    }

    setChatMessages((prev) => [...prev, userMsg])
    setInputQuestion('')
    gameAudio.playTap()

    // Generate Bolt's intelligent response
    setTimeout(() => {
      let reply = `Great question! Looking at Page ${pageNumber}, remember that AI is a tool designed to solve problems and assist us. Try drawing or highlighting key words on the worksheet!`
      const lowerQ = q.toLowerCase()

      if (lowerQ.includes('answer') || lowerQ.includes('solve') || lowerQ.includes('help')) {
        reply = `Here is a hint for this activity: Read the instructions carefully at the top, look for the clues in the illustrations, and use the Pen tool ✏️ to connect matching items!`
      } else if (lowerQ.includes('sensor')) {
        reply = `Sensors are like the 5 senses for machines! Cameras are eyes 👀, microphones are ears 👂, and touch pads are skin! 🤖`
      } else if (lowerQ.includes('star') || lowerQ.includes('points')) {
        reply = `You have collected ${stars} stars so far! Keep completing activities and quizzes to earn the Gold Olympiad Trophy! 🏆`
      } else if (lowerQ.includes('who are you') || lowerQ.includes('bolt')) {
        reply = `I am Bolt, your loyal robot learning guide! I help you master Artificial Intelligence one fun page at a time!`
      }

      const boltMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bolt',
        text: reply,
        time: 'Just now'
      }

      setChatMessages((prev) => [...prev, boltMsg])
      gameAudio.playCoin()
    }, 600)
  }

  if (!isOpen) return null

  return (
    <div
      className={`flex flex-col bg-slate-900 border-l border-slate-700/80 text-white shadow-2xl transition-all duration-300 z-40 ${
        layoutMode === 'split'
          ? 'w-[380px] lg:w-[420px] h-full flex-shrink-0'
          : 'fixed bottom-4 right-4 w-[380px] max-w-[92vw] h-[580px] max-h-[85vh] rounded-3xl border border-white/20 shadow-2xl'
      }`}
    >
      {/* Companion Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-800 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-t-3xl sm:rounded-t-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Bot className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base tracking-wide">Bolt AI Tutor</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-400 text-slate-950">
                  Online
                </span>
              </div>
              <p className="text-xs text-blue-200">Page {pageNumber} Companion</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Stars Count */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-400/20 border border-amber-400/30 rounded-xl text-amber-300 font-black text-xs">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{stars}</span>
            </div>

            {/* Layout Toggle */}
            {onToggleLayout && (
              <button
                onClick={onToggleLayout}
                title={layoutMode === 'split' ? 'Switch to Overlay Drawer' : 'Switch to Split View'}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {layoutMode === 'split' ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            )}

            {/* Close (Overlay mode) */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 mt-3 bg-slate-950/40 p-1 rounded-xl">
          <button
            onClick={() => {
              setActiveTab('read')
              gameAudio.playTap()
            }}
            className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'read' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 size={13} />
            <span>Read</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('explain')
              gameAudio.playTap()
            }}
            className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'explain' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb size={13} />
            <span>Explain</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz')
              gameAudio.playTap()
            }}
            className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'quiz' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain size={13} />
            <span>Quiz</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('chat')
              gameAudio.playTap()
            }}
            className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'chat' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare size={13} />
            <span>Chat</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: READ ALOUD (TTS) */}
        {activeTab === 'read' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-800/80 border border-blue-500/30 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center">
                <Volume2 className={`w-7 h-7 text-blue-400 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">Audio Narration</h4>
                <p className="text-xs text-blue-300 mt-0.5">Bolt reads the contents of Page {pageNumber} aloud!</p>
              </div>

              {/* Play / Pause Button */}
              <button
                onClick={handleToggleSpeech}
                className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isPlayingAudio
                    ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause size={18} />
                    <span>Pause Reading</span>
                  </>
                ) : (
                  <>
                    <Play size={18} className="fill-white" />
                    <span>Read Page Aloud</span>
                  </>
                )}
              </button>

              {/* Speed Controller */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/50">
                <span>Reading Speed:</span>
                <div className="flex gap-1.5">
                  {[0.8, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        speechRate === rate ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rate === 0.8 ? 'Slow' : rate === 1.0 ? 'Normal' : 'Fast'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Extracted Page Text Preview */}
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700 text-xs text-slate-300 leading-relaxed max-h-56 overflow-y-auto">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" />
                <span>Text Extracted from Book Page</span>
              </div>
              {cleanSpeechText}
            </div>
          </div>
        )}

        {/* TAB 2: EXPLAIN THIS PAGE */}
        {activeTab === 'explain' && (
          <div className="space-y-3">
            <div className="p-3 bg-indigo-900/30 border border-indigo-500/30 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase mb-1">
                <Lightbulb size={14} className="text-yellow-400" />
                <span>Page {pageNumber} Key Takeaways</span>
              </div>
              <p className="text-xs text-slate-300">Here is what Bolt wants you to notice on this page:</p>
            </div>

            <div className="space-y-2">
              {pageSummaryBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed hover:border-indigo-400/50 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400 flex-shrink-0" />
              <span>Tip: Use the Highlighter 🖍️ on the page to highlight key definitions!</span>
            </div>
          </div>
        )}

        {/* TAB 3: QUICK QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-3">
            <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-purple-300 uppercase">Page Challenge</div>
                <div className="text-xs text-slate-300">Earn +2 Stars for correct answers!</div>
              </div>
              <div className="px-2.5 py-1 bg-purple-600 rounded-lg text-xs font-black">
                Score: {quizScore}
              </div>
            </div>

            {/* Quiz Card */}
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
              <div className="text-sm font-bold text-white leading-snug">{currentQuiz.question}</div>

              <div className="space-y-2">
                {currentQuiz.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx
                  const isCorrectOption = idx === currentQuiz.correctIndex
                  let btnStyle = 'bg-slate-700/60 hover:bg-slate-700 text-slate-200 border-transparent'

                  if (selectedAnswer !== null) {
                    if (isCorrectOption) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold'
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-600 text-white border-rose-400'
                    } else {
                      btnStyle = 'opacity-40 bg-slate-800 text-slate-400'
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedAnswer !== null && isCorrectOption && <CheckCircle2 size={16} className="text-white" />}
                    </button>
                  )
                })}
              </div>

              {quizFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    quizFeedback === 'correct'
                      ? 'bg-emerald-900/40 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-900/40 border border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {quizFeedback === 'correct' ? '🎉 Brilliant!' : '💡 Keep Trying!'}
                  </div>
                  <div>{currentQuiz.explanation}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CHAT WITH BOLT */}
        {activeTab === 'chat' && (
          <div className="space-y-3 flex flex-col h-full min-h-[320px]">
            {/* Quick Suggestion Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => handleSendChat('Give me a clue for this worksheet')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-300 whitespace-nowrap"
              >
                🔍 Give me a clue
              </button>
              <button
                onClick={() => handleSendChat('Tell me a fun AI fact!')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-300 whitespace-nowrap"
              >
                🚀 Fun AI Fact
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 space-y-2.5 overflow-y-auto max-h-60 pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 text-xs ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bolt' && (
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none leading-relaxed'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input Box */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChat()
                }}
                placeholder="Ask Bolt anything..."
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSendChat()}
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
