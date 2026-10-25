import React, { useState, useEffect } from 'react'
import { AppLayout } from '../../components/layout/AppLayout'
import { useAuth } from '../../contexts/AuthContext'
import {
  HelpCircle,
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Shield,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Inbox,
  Filter,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'
import { gameAudio } from '../../utils/gameAudio'

export interface SupportMessage {
  id: string
  subject: string
  category: string
  message: string
  priority: 'normal' | 'high' | 'urgent'
  createdAt: string
  status: 'sent' | 'reviewing' | 'replied' | 'resolved'
  adminReply?: string
  adminReplyAt?: string
}

const CATEGORIES = [
  'General Inquiry',
  'Academic / Lesson Question',
  'Exams & Assessment Schedule',
  'Technical & Login Help',
  'Report an Issue or Bug',
  'Other'
]

const DEFAULT_MESSAGES: SupportMessage[] = [
  {
    id: 'welcome-msg',
    subject: 'Welcome to Mamma Ada LMS Help Desk!',
    category: 'General Inquiry',
    message: 'Hello! If you have any questions regarding your lessons, Olympiad syllabus, or examinations, feel free to send a message here.',
    priority: 'normal',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'replied',
    adminReply: 'Welcome aboard! Our instructional support team and system administrators monitor this channel. Feel free to reach out anytime!',
    adminReplyAt: new Date(Date.now() - 86400000).toISOString()
  }
]

export const StudentHelpPage: React.FC = () => {
  const { user } = useAuth()
  const studentName = user?.profile?.full_name || 'Student'
  const studentEmail = user?.email || 'student@mama-ada.org'

  const storageKey = `mamma_ada_support_msgs_${user?.id || 'guest'}`

  const [messages, setMessages] = useState<SupportMessage[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) return JSON.parse(stored)
    } catch {}
    return DEFAULT_MESSAGES
  })

  // Form state
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('normal')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  // Save messages
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages))
    } catch {}
  }, [messages, storageKey])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) {
      toast.error('Please enter both subject and your message')
      return
    }

    setIsSending(true)
    gameAudio.playTap()

    setTimeout(() => {
      const newMsg: SupportMessage = {
        id: `msg-${Date.now()}`,
        subject: subject.trim(),
        category,
        message: message.trim(),
        priority,
        createdAt: new Date().toISOString(),
        status: 'sent',
      }

      setMessages((prev) => [newMsg, ...prev])
      setSubject('')
      setMessage('')
      setIsSending(false)
      setSelectedMessageId(newMsg.id)
      gameAudio.playLevelUp()
      toast.success('Your message has been sent to the Admin! 📨')

      // Simulate admin automated confirmation acknowledgment after 4 seconds
      setTimeout(() => {
        setMessages((curr) =>
          curr.map((m) =>
            m.id === newMsg.id
              ? {
                  ...m,
                  status: 'reviewing',
                  adminReply: `Hello ${studentName}, your message has been logged by the Mamma Ada LMS Administration team. An instructor or portal administrator is reviewing your inquiry.`,
                  adminReplyAt: new Date().toISOString()
                }
              : m
          )
        )
      }, 4000)
    }, 600)
  }

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/90 shadow-2xs">
                <HelpCircle size={13} className="text-blue-600" />
                Support & Contact Desk
              </span>
              <span className="text-xs text-slate-400 font-medium">• Active Response</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Contact Administrator
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Send messages directly to portal administrators and academic mentors.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/90">
            <Clock size={15} className="text-blue-600 shrink-0" />
            <span>Typical admin response: <strong>within 24 hours</strong></span>
          </div>
        </div>

        {/* 2-Column Layout: Left = Compose & Send, Right = Message History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Compose Form (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">New Message to Admin</h2>
                  <p className="text-[11px] text-slate-500">From: {studentName} ({studentEmail})</p>
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Topic Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Urgency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['normal', 'high', 'urgent'] as const).map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          priority === p
                            ? p === 'urgent'
                              ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-300/40'
                              : p === 'high'
                              ? 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-300/40'
                              : 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-300/40'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your question..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question clearly for the administrator..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{isSending ? 'Sending Message...' : 'Send Message to Admin'}</span>
                </button>
              </form>
            </div>

            {/* Quick FAQ info card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 text-xs space-y-2">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Shield size={14} className="text-blue-600" />
                <span>Confidential Communication</span>
              </p>
              <p className="text-slate-500 leading-relaxed">
                Messages sent here are visible only to you and authorized Mamma Ada LMS administrators. Do not share sensitive passwords.
              </p>
            </div>
          </div>

          {/* Right Column: Sent Messages & Conversation History (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Your Message History</h2>
                    <p className="text-[11px] text-slate-500">
                      {messages.length} conversation{messages.length === 1 ? '' : 's'} recorded
                    </p>
                  </div>
                </div>

                {messages.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear message history on this browser?')) {
                        setMessages(DEFAULT_MESSAGES)
                        toast.success('Message history reset')
                      }
                    }}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Inbox size={36} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold text-slate-600">No Messages Sent Yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Compose a message on the left to reach out to the admin.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const isExpanded = selectedMessageId === msg.id

                    return (
                      <div
                        key={msg.id}
                        className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
                          isExpanded
                            ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        {/* Header bar */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedMessageId(isExpanded ? null : msg.id)
                          }
                          className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                {msg.category}
                              </span>
                              {msg.priority === 'urgent' && (
                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                                  URGENT
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">
                                {new Date(msg.createdAt).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>

                            <p className="text-xs font-bold text-slate-900 truncate">
                              {msg.subject}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {msg.status === 'replied' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={11} />
                                <span>Replied</span>
                              </span>
                            ) : msg.status === 'reviewing' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                                <Clock size={11} />
                                <span>In Review</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                <span>Sent</span>
                              </span>
                            )}

                            {isExpanded ? (
                              <ChevronUp size={15} className="text-slate-400" />
                            ) : (
                              <ChevronDown size={15} className="text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100">
                            {/* Student Message Bubble */}
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
                              <p className="text-[10px] font-bold text-slate-500 mb-1">
                                You wrote:
                              </p>
                              <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {msg.message}
                              </p>
                            </div>

                            {/* Admin Reply Bubble */}
                            {msg.adminReply ? (
                              <div className="bg-blue-50/80 rounded-xl p-3.5 border border-blue-200/90 shadow-2xs">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
                                    <Shield size={13} className="text-blue-600" />
                                    <span>Mamma Ada LMS Administrator Response</span>
                                  </div>
                                  {msg.adminReplyAt && (
                                    <span className="text-[10px] text-blue-600/80">
                                      {new Date(msg.adminReplyAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-blue-950 whitespace-pre-wrap leading-relaxed">
                                  {msg.adminReply}
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-800">
                                <Clock size={14} className="text-amber-600 shrink-0 animate-spin-slow" />
                                <span>Awaiting administrator response. You will see their reply right here once reviewed.</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default StudentHelpPage
