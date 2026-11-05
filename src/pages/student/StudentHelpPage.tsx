import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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
  ChevronRight,
  Sparkles,
  Inbox,
  RefreshCw,
  CornerDownRight,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'
import { gameAudio } from '../../utils/gameAudio'
import {
  supportService,
  type SupportConversation,
  type SupportMessageItem,
  type ConversationPriority
} from '../../services/supportService'

const CATEGORIES = [
  'General Inquiry',
  'Academic / Lesson Question',
  'Exams & Assessment Schedule',
  'Technical & Login Help',
  'Report an Issue or Bug',
  'Other'
]

export const StudentHelpPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const studentName = user?.profile?.full_name || 'Student'
  const studentEmail = user?.email || 'student@mama-ada.org'
  const studentId = user?.id || ''

  const [conversations, setConversations] = useState<SupportConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Form state for new inquiry
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [priority, setPriority] = useState<ConversationPriority>('normal')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)

  // Follow-up reply state
  const [replyText, setReplyText] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversations
  const loadConversations = useCallback(async (isSilent = false) => {
    if (!studentId) return
    if (!isSilent) setLoading(true)
    try {
      const data = await supportService.getStudentConversations(studentId)
      setConversations(data)
      // Auto-select latest or first if none selected
      if (!selectedConversationId && data.length > 0) {
        setSelectedConversationId(data[0].id)
      }
    } catch (err) {
      console.error('Error loading conversations:', err)
    } finally {
      if (!isSilent) setLoading(false)
      setRefreshing(false)
    }
  }, [studentId, selectedConversationId])

  // Initial load & real-time subscription
  useEffect(() => {
    if (!studentId) return

    loadConversations()

    // Realtime subscription + polling fallback
    const unsubscribe = supportService.subscribeToSupport({
      studentId,
      onUpdate: () => {
        loadConversations(true)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [studentId, loadConversations])

  // When selected conversation changes, mark as read if it has unread student messages
  useEffect(() => {
    if (!selectedConversationId) return
    const activeConv = conversations.find((c) => c.id === selectedConversationId)
    if (activeConv && activeConv.unread_student_count > 0) {
      supportService.markAsRead(selectedConversationId, 'student')
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversationId
            ? {
                ...c,
                unread_student_count: 0,
                messages: (c.messages || []).map((m) =>
                  m.sender_role === 'admin' ? { ...m, is_read: true } : m
                ),
              }
            : c
        )
      )
    }
  }, [selectedConversationId, conversations])

  // Handle creating new conversation
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) {
      toast.error('Please enter both subject and your message')
      return
    }

    if (!studentId) {
      toast.error('You must be signed in to send a support message')
      return
    }

    setIsSending(true)
    gameAudio.playTap()

    try {
      const { conversation } = await supportService.createStudentConversation({
        studentId,
        organizationId: user?.organization_id,
        subject: subject.trim(),
        category,
        priority,
        message: message.trim(),
      })

      setConversations((prev) => [conversation, ...prev])
      setSelectedConversationId(conversation.id)
      setSubject('')
      setMessage('')
      gameAudio.playLevelUp()
      toast.success('Your message has been sent to Admin! 📨')
    } catch (err: any) {
      console.error('Failed to send message:', err)
      toast.error(err?.message || 'Failed to send message to Admin. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  // Handle follow-up reply in active conversation
  const handleSendReply = async (conversationId: string) => {
    if (!replyText.trim() || !studentId) return

    setIsReplying(true)
    gameAudio.playTap()

    try {
      const newMsg = await supportService.sendMessage({
        conversationId,
        senderId: studentId,
        senderRole: 'student',
        message: replyText.trim(),
      })

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              status: 'awaiting_reply',
              last_message_at: newMsg.created_at,
              last_message_preview: newMsg.message.slice(0, 140),
              messages: [...(c.messages || []), newMsg],
            }
          }
          return c
        })
      )

      setReplyText('')
      toast.success('Reply sent to Admin! 📨')
    } catch (err: any) {
      console.error('Failed to send follow-up reply:', err)
      toast.error(err?.message || 'Failed to send reply')
    } finally {
      setIsReplying(false)
    }
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
              <span className="text-xs text-slate-400 font-medium">• Live 2-Way Messaging</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Contact Administrator
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Send messages directly to portal administrators and academic mentors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setRefreshing(true)
                loadConversations(false)
              }}
              disabled={refreshing || loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin text-blue-600' : ''} />
              <span>{refreshing ? 'Syncing...' : 'Sync Messages'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/90">
              <Clock size={15} className="text-blue-600 shrink-0" />
              <span>Typical admin response: <strong>within 24 hours</strong></span>
            </div>
          </div>
        </div>

        {/* ── Interactive PDF Studio Guide / Replay Tour Banner ── */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black backdrop-blur-xs flex items-center gap-1">
                <Sparkles size={12} className="text-amber-300" />
                How to Use PDF Studio
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Interactive PDF Tools Guided Tour
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              New to the digital coursebook? Learn how to color diagrams, write answers, stamp gold stars, and use typing tools with a step-by-step interactive spotlight tutorial.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('replay_pdf_tutorial', 'true')
              toast.success('Starting interactive PDF tools tour...', { icon: '📖' })
              navigate('/student/learning')
            }}
            className="px-4 py-2.5 bg-white hover:bg-blue-50 active:scale-95 text-blue-700 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Replay PDF Viewer Tutorial</span>
            <ChevronRight size={16} />
          </button>
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
                  <h2 className="text-sm font-bold text-slate-900">New Inquiry to Admin</h2>
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
                        className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all border cursor-pointer ${
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
                  {isSending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message to Admin</span>
                    </>
                  )}
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
                Messages sent here are visible only to you and authorized AI Olympiad LMS administrators. Do not share sensitive passwords.
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
                    <h2 className="text-sm font-bold text-slate-900">Your Conversation History</h2>
                    <p className="text-[11px] text-slate-500">
                      {conversations.length} conversation{conversations.length === 1 ? '' : 's'} recorded
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                    Live Supabase Sync
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Loader2 size={28} className="mx-auto animate-spin text-blue-600" />
                  <p className="text-xs font-bold text-slate-600">Loading Support Conversations...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Inbox size={36} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold text-slate-600">No Messages Sent Yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Compose a message on the left to reach out to the admin.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conversations.map((conv) => {
                    const isExpanded = selectedConversationId === conv.id
                    const messagesList = conv.messages || []
                    const hasUnread = conv.unread_student_count > 0

                    return (
                      <div
                        key={conv.id}
                        className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
                          isExpanded
                            ? 'border-blue-400/80 bg-blue-50/15 shadow-sm'
                            : hasUnread
                            ? 'border-amber-300 bg-amber-50/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        {/* Conversation Header Bar */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedConversationId(isExpanded ? null : conv.id)
                          }}
                          className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                {conv.category}
                              </span>

                              {conv.priority === 'urgent' && (
                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                                  URGENT
                                </span>
                              )}

                              {hasUnread && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white animate-pulse">
                                  New Reply
                                </span>
                              )}

                              <span className="text-[10px] text-slate-400">
                                {new Date(conv.last_message_at || conv.created_at).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {conv.subject}
                            </p>

                            {conv.last_message_preview && (
                              <p className="text-[11px] text-slate-500 truncate max-w-md">
                                {conv.last_message_preview}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {conv.status === 'replied' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <CheckCircle2 size={11} />
                                <span>Replied</span>
                              </span>
                            ) : conv.status === 'reviewing' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                                <Clock size={11} />
                                <span>In Review</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                                <Clock size={11} />
                                <span>Awaiting Reply</span>
                              </span>
                            )}

                            {isExpanded ? (
                              <ChevronUp size={16} className="text-slate-400" />
                            ) : (
                              <ChevronDown size={16} className="text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* Expanded Conversation Details */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 space-y-3.5 border-t border-slate-100 bg-slate-50/50">
                            {/* Complete Message History */}
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                              {messagesList.map((msg, index) => {
                                const isAdmin = msg.sender_role === 'admin'

                                return (
                                  <div
                                    key={msg.id || index}
                                    className={`rounded-2xl p-3.5 border transition-all ${
                                      isAdmin
                                        ? 'bg-blue-50/90 border-blue-200 text-blue-950 ml-2 sm:ml-6 shadow-2xs'
                                        : 'bg-white border-slate-200/90 text-slate-900 mr-2 sm:mr-6 shadow-2xs'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-200/40">
                                      <div className="flex items-center gap-1.5">
                                        {isAdmin ? (
                                          <div className="flex items-center gap-1 text-[11px] font-black text-blue-700">
                                            <Shield size={13} className="text-blue-600" />
                                            <span>Admin Support Response</span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                                            <User size={12} className="text-slate-500" />
                                            <span>You ({studentName})</span>
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                        <span>
                                          {new Date(msg.created_at).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })}
                                        </span>
                                        <span>•</span>
                                        <span>
                                          {new Date(msg.created_at).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric'
                                          })}
                                        </span>
                                      </div>
                                    </div>

                                    <p className="text-xs leading-relaxed whitespace-pre-wrap font-medium">
                                      {msg.message}
                                    </p>
                                  </div>
                                )
                              })}
                              <div ref={messagesEndRef} />
                            </div>

                            {/* Awaiting Status notice if last message was from student */}
                            {conv.status === 'awaiting_reply' && (
                              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900">
                                <Clock size={14} className="text-amber-600 shrink-0" />
                                <span>Awaiting administrator response. Your inquiry is queued for review.</span>
                              </div>
                            )}

                            {/* Follow-up Reply Input */}
                            <div className="pt-2 border-t border-slate-200/70">
                              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                                Send Follow-up Message
                              </label>
                              <div className="flex gap-2">
                                <textarea
                                  rows={2}
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type follow-up response to the administrator..."
                                  className="flex-1 bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                />
                                <button
                                  type="button"
                                  disabled={isReplying || !replyText.trim()}
                                  onClick={() => handleSendReply(conv.id)}
                                  className="px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                                >
                                  {isReplying ? (
                                    <Loader2 size={13} className="animate-spin" />
                                  ) : (
                                    <Send size={13} />
                                  )}
                                  <span className="hidden sm:inline">Reply</span>
                                </button>
                              </div>
                            </div>
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
