import React, { useState, useEffect, useCallback, useRef } from 'react'
import { AppLayout } from '../../components/layout/AppLayout'
import { useAuth } from '../../contexts/AuthContext'
import {
  MessageSquare,
  Search,
  Filter,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Shield,
  RefreshCw,
  Inbox,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Check,
  ChevronRight,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  supportService,
  type SupportConversation,
  type SupportMessageItem,
  type ConversationStatus
} from '../../services/supportService'

export default function AdminSupportPage() {
  const { user } = useAuth()
  const adminId = user?.id || ''
  const adminName = user?.profile?.full_name || 'Admin Support'

  const [conversations, setConversations] = useState<SupportConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'awaiting_reply' | 'replied' | 'resolved'>('all')

  // Selected Conversation for Right Pane / Mobile View
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null)
  const [messages, setMessages] = useState<SupportMessageItem[]>([])
  const [loadingMessages, setLoadingMessages] = useState(false)

  // Reply Composer State
  const [replyText, setReplyText] = useState('')
  const [isSendingReply, setIsSendingReply] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mobile navigation state
  const [showMobileChat, setShowMobileChat] = useState(false)

  // Load all conversations
  const loadConversations = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const data = await supportService.getAdminConversations()
      setConversations(data)
    } catch (err) {
      console.error('Failed to load admin conversations:', err)
      if (!silent) toast.error('Failed to load conversations')
    } finally {
      if (!silent) setLoading(false)
      setRefreshing(false)
    }
  }, [])

  // Initial load and real-time subscription
  useEffect(() => {
    loadConversations()

    const unsubscribe = supportService.subscribeToSupport({
      onUpdate: () => {
        loadConversations(true)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [loadConversations])

  // When a conversation is selected, load its messages and mark as read
  useEffect(() => {
    if (!selectedConvId) {
      setMessages([])
      return
    }

    const selected = conversations.find((c) => c.id === selectedConvId)
    if (selected) {
      setMessages(selected.messages || [])
    }

    setLoadingMessages(true)
    supportService
      .getConversationMessages(selectedConvId)
      .then((msgs) => {
        setMessages(msgs)
        // Mark as read by admin
        supportService.markAsRead(selectedConvId, 'admin').then(() => {
          setConversations((prev) =>
            prev.map((c) => (c.id === selectedConvId ? { ...c, unread_admin_count: 0 } : c))
          )
        })
      })
      .catch((err) => {
        console.error('Failed to fetch messages for conversation:', err)
      })
      .finally(() => {
        setLoadingMessages(false)
      })
  }, [selectedConvId])

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const studentName = c.student?.full_name?.toLowerCase() || ''
    const studentEmail = c.student?.email?.toLowerCase() || ''
    const studentIdNum = c.student?.student_id_number?.toLowerCase() || ''
    const subject = c.subject.toLowerCase()
    const query = searchQuery.toLowerCase().trim()

    const matchesSearch =
      !query ||
      studentName.includes(query) ||
      studentEmail.includes(query) ||
      studentIdNum.includes(query) ||
      subject.includes(query)

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'awaiting_reply' && c.status === 'awaiting_reply') ||
      (statusFilter === 'replied' && c.status === 'replied') ||
      (statusFilter === 'resolved' && c.status === 'resolved')

    return matchesSearch && matchesStatus
  })

  // Selected conversation object
  const activeConv = conversations.find((c) => c.id === selectedConvId)

  // Handle Admin sending reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || !selectedConvId || !adminId) return

    setIsSendingReply(true)
    try {
      const newMsg = await supportService.sendMessage({
        conversationId: selectedConvId,
        senderId: adminId,
        senderRole: 'admin',
        message: replyText.trim(),
      })

      setMessages((prev) => [...prev, newMsg])
      setReplyText('')

      // Update local conversation state to 'replied'
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConvId
            ? {
                ...c,
                status: 'replied',
                last_message_at: newMsg.created_at,
                last_message_preview: newMsg.message.slice(0, 140),
                messages: [...(c.messages || []), newMsg],
              }
            : c
        )
      )

      toast.success('Reply sent to student! 📨')
    } catch (err: any) {
      console.error('Error sending reply:', err)
      toast.error(err?.message || 'Failed to send reply')
    } finally {
      setIsSendingReply(false)
    }
  }

  // Handle status update
  const handleUpdateStatus = async (status: ConversationStatus) => {
    if (!selectedConvId) return
    try {
      await supportService.updateStatus(selectedConvId, status)
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedConvId ? { ...c, status } : c))
      )
      toast.success(`Conversation marked as ${status.replace('_', ' ')}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  // Count summaries
  const countAwaiting = conversations.filter((c) => c.status === 'awaiting_reply').length
  const countReplied = conversations.filter((c) => c.status === 'replied').length
  const totalUnread = conversations.reduce((acc, c) => acc + (c.unread_admin_count || 0), 0)

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        {/* Page Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                <Shield size={13} className="text-purple-600" />
                Admin Support Desk
              </span>
              {totalUnread > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">
                  {totalUnread} Unread Message{totalUnread === 1 ? '' : 's'}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Help & Support
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage incoming student inquiries, academic questions, and dispatch replies in real time.
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin text-purple-600' : ''} />
              <span>{refreshing ? 'Syncing...' : 'Sync Messages'}</span>
            </button>
          </div>
        </div>

        {/* 2-Pane Support Workstation */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          {/* Left Pane: Conversation List (5 cols on lg) */}
          <div
            className={`lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 flex flex-col shadow-xs overflow-hidden ${
              showMobileChat ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Search & Status Filters */}
            <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by student name, email, ID..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                {[
                  { key: 'all', label: 'All', count: conversations.length },
                  { key: 'awaiting_reply', label: 'Awaiting Reply', count: countAwaiting, highlight: countAwaiting > 0 },
                  { key: 'replied', label: 'Replied', count: countReplied },
                  { key: 'resolved', label: 'Resolved' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStatusFilter(tab.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === tab.key
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          statusFilter === tab.key
                            ? 'bg-white/25 text-white'
                            : tab.highlight
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation List Scroll Area */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {loading ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <Loader2 size={24} className="mx-auto animate-spin text-purple-600" />
                  <p className="text-xs font-bold text-slate-600">Loading conversations...</p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-16 text-slate-400 px-4">
                  <Inbox size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold text-slate-600">No Conversations Found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {searchQuery ? 'Try clearing your search query.' : 'No student inquiries in this category.'}
                  </p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isSelected = selectedConvId === conv.id
                  const hasUnread = (conv.unread_admin_count || 0) > 0
                  const studentName = conv.student?.full_name || 'Student'
                  const studentClass = conv.student_class_name || 'Enrolled Student'
                  const studentInitial = studentName.charAt(0).toUpperCase()

                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => {
                        setSelectedConvId(conv.id)
                        setShowMobileChat(true)
                      }}
                      className={`w-full text-left p-4 transition-all cursor-pointer flex items-start gap-3 relative ${
                        isSelected
                          ? 'bg-purple-50/60 border-l-4 border-l-purple-600'
                          : hasUnread
                          ? 'bg-amber-50/30 hover:bg-amber-50/60'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-2xs text-sm">
                        {studentInitial}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {studentName}
                          </p>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(conv.last_message_at || conv.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200/60 truncate">
                            {studentClass}
                          </span>
                          <span>•</span>
                          <span className="truncate">{conv.category}</span>
                        </div>

                        <p className="text-xs font-bold text-slate-800 truncate">
                          {conv.subject}
                        </p>

                        {conv.last_message_preview && (
                          <p className="text-[11px] text-slate-500 truncate leading-snug">
                            {conv.last_message_preview}
                          </p>
                        )}

                        <div className="flex items-center gap-2 pt-0.5">
                          {conv.status === 'awaiting_reply' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                              <Clock size={10} />
                              <span>Awaiting Reply</span>
                            </span>
                          ) : conv.status === 'replied' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              <CheckCircle2 size={10} />
                              <span>Replied</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                              <span>Resolved</span>
                            </span>
                          )}

                          {hasUnread && (
                            <span className="inline-flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                              {conv.unread_admin_count} new
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          {/* Right Pane: Selected Conversation Details & Chat Composer (7 cols on lg) */}
          <div
            className={`lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 flex flex-col shadow-xs overflow-hidden ${
              showMobileChat ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {activeConv ? (
              <>
                {/* Active Conversation Top Banner */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/70 shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => setShowMobileChat(false)}
                      className="lg:hidden p-1.5 rounded-xl hover:bg-slate-200 text-slate-600 cursor-pointer"
                    >
                      <ArrowLeft size={18} />
                    </button>

                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-2xs text-sm">
                      {(activeConv.student?.full_name || 'S').charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-slate-900 truncate">
                          {activeConv.student?.full_name || 'Student'}
                        </h2>
                        <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                          {activeConv.student_class_name || 'Enrolled Student'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        ID: {activeConv.student?.student_id_number || activeConv.student_id.slice(0, 8)} • {activeConv.student?.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions / Status dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={activeConv.status}
                      onChange={(e) => handleUpdateStatus(e.target.value as ConversationStatus)}
                      className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
                    >
                      <option value="awaiting_reply">Awaiting Reply</option>
                      <option value="reviewing">In Review</option>
                      <option value="replied">Replied</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                {/* Conversation Subject & Priority Strip */}
                <div className="px-5 py-2.5 bg-purple-50/30 border-b border-purple-100/50 flex flex-wrap items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {activeConv.category}
                    </span>
                    <p className="text-xs font-bold text-slate-800 truncate">
                      Subject: {activeConv.subject}
                    </p>
                  </div>
                  {activeConv.priority === 'urgent' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                      URGENT INQUIRY
                    </span>
                  )}
                </div>

                {/* Messages Chat History */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                  {loadingMessages ? (
                    <div className="text-center py-12 text-slate-400 space-y-2">
                      <Loader2 size={24} className="mx-auto animate-spin text-purple-600" />
                      <p className="text-xs font-bold text-slate-600">Loading conversation history...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-bold text-slate-600">No messages in this conversation.</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isAdmin = msg.sender_role === 'admin'
                      return (
                        <div
                          key={msg.id || index}
                          className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs border ${
                              isAdmin
                                ? 'bg-purple-600 text-white border-purple-600 rounded-tr-xs'
                                : 'bg-slate-50 text-slate-900 border-slate-200/90 rounded-tl-xs'
                            }`}
                          >
                            <div
                              className={`flex items-center gap-2 mb-1 text-[10px] font-bold ${
                                isAdmin ? 'text-purple-200' : 'text-slate-500'
                              }`}
                            >
                              {isAdmin ? (
                                <div className="flex items-center gap-1">
                                  <Shield size={11} />
                                  <span>Administrator Response ({adminName})</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <User size={11} />
                                  <span>Student ({activeConv.student?.full_name || 'Student'})</span>
                                </div>
                              )}
                              <span>•</span>
                              <span>
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>

                            <p className="text-xs leading-relaxed whitespace-pre-wrap font-medium">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Composer Box */}
                <form
                  onSubmit={handleSendReply}
                  className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50/60 shrink-0"
                >
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply directly to ${activeConv.student?.full_name || 'student'}...`}
                      className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none shadow-2xs"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-500 hidden sm:block">
                        Student will receive this message immediately via live synchronization.
                      </p>

                      <button
                        type="submit"
                        disabled={isSendingReply || !replyText.trim()}
                        className="ml-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        {isSendingReply ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>Send Reply to Student</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-sm font-bold text-slate-700">No Conversation Selected</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Select a student inquiry from the list on the left to read the full message thread and dispatch replies.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

