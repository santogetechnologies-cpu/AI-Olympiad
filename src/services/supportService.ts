// ============================================================
// SUPPORT MESSAGING SERVICE
// Two-way Student-Admin Support & Help Communication
// ============================================================

import { supabase, isUuid } from '../lib/supabase'

export type ConversationPriority = 'normal' | 'high' | 'urgent'
export type ConversationStatus = 'awaiting_reply' | 'reviewing' | 'replied' | 'resolved'

export interface SupportMessageItem {
  id: string
  conversation_id: string
  sender_id: string
  sender_role: 'student' | 'admin'
  message: string
  is_read: boolean
  created_at: string
  sender?: {
    id: string
    full_name: string
    avatar_url?: string
  }
}

export interface SupportConversation {
  id: string
  organization_id?: string
  student_id: string
  subject: string
  category: string
  priority: ConversationPriority
  status: ConversationStatus
  unread_student_count: number
  unread_admin_count: number
  last_message_at: string
  last_message_preview?: string | null
  created_at: string
  updated_at: string
  student?: {
    id: string
    full_name: string
    email: string
    phone?: string
    avatar_url?: string
    student_id_number?: string
  }
  student_class_name?: string
  messages?: SupportMessageItem[]
}

const LOCAL_STORAGE_KEY_PREFIX = 'gaio_support_convs_'

export const supportService = {
  /**
   * Fetch all conversations for a student
   */
  async getStudentConversations(studentId: string): Promise<SupportConversation[]> {
    if (!studentId) return []

    try {
      if (isUuid(studentId)) {
        const { data, error } = await supabase
          .from('support_conversations')
          .select(`
            *,
            messages:support_messages(
              id,
              conversation_id,
              sender_id,
              sender_role,
              message,
              is_read,
              created_at
            )
          `)
          .eq('student_id', studentId)
          .order('last_message_at', { ascending: false })

        if (!error && data) {
          // Sort messages ascending by created_at inside each conversation
          const formatted = data.map((conv: any) => ({
            ...conv,
            messages: (conv.messages || []).sort(
              (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            ),
          }))
          // Cache locally for offline/fast load
          try {
            localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${studentId}`, JSON.stringify(formatted))
          } catch {}
          return formatted
        }
      }
    } catch (err) {
      console.warn('supportService.getStudentConversations fetch error:', err)
    }

    // Fallback to local storage
    try {
      const stored = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${studentId}`)
      if (stored) return JSON.parse(stored)
    } catch {}

    return []
  },

  /**
   * Fetch all conversations for the Admin Help & Support dashboard
   */
  async getAdminConversations(): Promise<SupportConversation[]> {
    try {
      const { data, error } = await supabase
        .from('support_conversations')
        .select(`
          *,
          student:profiles!support_conversations_student_id_fkey(
            id,
            full_name,
            email,
            phone,
            avatar_url,
            student_id_number
          ),
          messages:support_messages(
            id,
            conversation_id,
            sender_id,
            sender_role,
            message,
            is_read,
            created_at
          )
        `)
        .order('last_message_at', { ascending: false })

      if (error) {
        console.warn('supportService.getAdminConversations error:', error)
        throw error
      }

      // Also resolve class names for all distinct student_ids via enrollments
      const studentIds = Array.from(new Set((data || []).map((c: any) => c.student_id).filter(Boolean)))
      const classMap: Record<string, string> = {}

      if (studentIds.length > 0) {
        const { data: enrs } = await supabase
          .from('enrollments')
          .select('student_id, class:classes(name, code)')
          .in('student_id', studentIds)
          .eq('status', 'active')

        if (enrs) {
          enrs.forEach((enr: any) => {
            if (enr.student_id && enr.class?.name) {
              classMap[enr.student_id] = enr.class.name
            }
          })
        }
      }

      const formatted: SupportConversation[] = (data || []).map((c: any) => ({
        ...c,
        student_class_name: c.student_class_name || classMap[c.student_id] || 'Enrolled Student',
        messages: (c.messages || []).sort(
          (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
      }))

      return formatted
    } catch (err) {
      console.error('Failed to get admin conversations:', err)
      return []
    }
  },

  /**
   * Get all messages for a specific conversation
   */
  async getConversationMessages(conversationId: string): Promise<SupportMessageItem[]> {
    if (!conversationId) return []

    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select(`
          id,
          conversation_id,
          sender_id,
          sender_role,
          message,
          is_read,
          created_at,
          sender:profiles!support_messages_sender_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      const rows = (data || []).map((row: any) => ({
        ...row,
        sender: Array.isArray(row.sender) ? row.sender[0] : row.sender,
      }))
      return rows as unknown as SupportMessageItem[]
    } catch (err) {
      console.warn('supportService.getConversationMessages error:', err)
      return []
    }
  },

  /**
   * Student creates a new conversation with an initial message
   */
  async createStudentConversation(params: {
    studentId: string
    organizationId?: string
    subject: string
    category?: string
    priority?: ConversationPriority
    message: string
  }): Promise<{ conversation: SupportConversation; message: SupportMessageItem }> {
    const { studentId, organizationId, subject, category = 'General Inquiry', priority = 'normal', message } = params

    if (!studentId || !subject.trim() || !message.trim()) {
      throw new Error('Student ID, subject, and message are required')
    }

    // 1. Insert conversation
    const convPayload: Record<string, any> = {
      student_id: studentId,
      subject: subject.trim(),
      category: category.trim(),
      priority,
      status: 'awaiting_reply',
      unread_student_count: 0,
      unread_admin_count: 1,
      last_message_at: new Date().toISOString(),
      last_message_preview: message.trim().slice(0, 140),
    }

    if (organizationId && isUuid(organizationId)) {
      convPayload.organization_id = organizationId
    }

    const { data: convData, error: convError } = await supabase
      .from('support_conversations')
      .insert(convPayload)
      .select()
      .single()

    if (convError || !convData) {
      console.error('Failed to create conversation in Supabase:', convError)
      throw new Error(convError?.message || 'Failed to create support conversation')
    }

    // 2. Insert initial message
    const msgPayload = {
      conversation_id: convData.id,
      sender_id: studentId,
      sender_role: 'student',
      message: message.trim(),
      is_read: false,
    }

    const { data: msgData, error: msgError } = await supabase
      .from('support_messages')
      .insert(msgPayload)
      .select()
      .single()

    if (msgError || !msgData) {
      console.error('Failed to create initial message in Supabase:', msgError)
      throw new Error(msgError?.message || 'Failed to send initial message')
    }

    const fullConversation: SupportConversation = {
      ...convData,
      messages: [msgData],
    }

    // Update local cache
    try {
      const cached = await this.getStudentConversations(studentId)
      const updated = [fullConversation, ...cached.filter((c) => c.id !== fullConversation.id)]
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${studentId}`, JSON.stringify(updated))
    } catch {}

    return { conversation: fullConversation, message: msgData }
  },

  /**
   * Send a follow-up message in an existing conversation (Student or Admin)
   */
  async sendMessage(params: {
    conversationId: string
    senderId: string
    senderRole: 'student' | 'admin'
    message: string
  }): Promise<SupportMessageItem> {
    const { conversationId, senderId, senderRole, message } = params

    if (!conversationId || !senderId || !message.trim()) {
      throw new Error('Conversation ID, sender ID, and message are required')
    }

    // Insert message into support_messages
    const { data: msgData, error: msgError } = await supabase
      .from('support_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        sender_role: senderRole,
        message: message.trim(),
        is_read: false,
      })
      .select()
      .single()

    if (msgError || !msgData) {
      console.error('Failed to send message in Supabase:', msgError)
      throw new Error(msgError?.message || 'Failed to send message')
    }

    // Explicitly update conversation metadata (trigger also handles this, but redundancy guarantees consistency)
    const updatePayload: Record<string, any> = {
      status: senderRole === 'student' ? 'awaiting_reply' : 'replied',
      last_message_at: new Date().toISOString(),
      last_message_preview: message.trim().slice(0, 140),
      updated_at: new Date().toISOString(),
    }

    if (senderRole === 'student') {
      // Admin unread increment
      const { data: conv } = await supabase
        .from('support_conversations')
        .select('unread_admin_count')
        .eq('id', conversationId)
        .single()
      updatePayload.unread_admin_count = (conv?.unread_admin_count || 0) + 1
    } else {
      // Student unread increment
      const { data: conv } = await supabase
        .from('support_conversations')
        .select('unread_student_count')
        .eq('id', conversationId)
        .single()
      updatePayload.unread_student_count = (conv?.unread_student_count || 0) + 1
    }

    await supabase
      .from('support_conversations')
      .update(updatePayload)
      .eq('id', conversationId)

    return msgData
  },

  /**
   * Mark a conversation as read by the current user (Student or Admin)
   */
  async markAsRead(conversationId: string, readerRole: 'student' | 'admin'): Promise<void> {
    if (!conversationId) return

    try {
      if (readerRole === 'student') {
        // Reset unread_student_count to 0
        await supabase
          .from('support_conversations')
          .update({ unread_student_count: 0 })
          .eq('id', conversationId)

        // Mark admin messages as read
        await supabase
          .from('support_messages')
          .update({ is_read: true })
          .eq('conversation_id', conversationId)
          .eq('sender_role', 'admin')
          .eq('is_read', false)
      } else {
        // Reset unread_admin_count to 0
        await supabase
          .from('support_conversations')
          .update({ unread_admin_count: 0 })
          .eq('id', conversationId)

        // Mark student messages as read
        await supabase
          .from('support_messages')
          .update({ is_read: true })
          .eq('conversation_id', conversationId)
          .eq('sender_role', 'student')
          .eq('is_read', false)
      }
    } catch (err) {
      console.warn('supportService.markAsRead error:', err)
    }
  },

  /**
   * Update conversation status (e.g. 'resolved', 'reviewing', 'awaiting_reply', 'replied')
   */
  async updateStatus(conversationId: string, status: ConversationStatus): Promise<void> {
    if (!conversationId) return
    const { error } = await supabase
      .from('support_conversations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', conversationId)

    if (error) {
      console.error('Failed to update conversation status:', error)
      throw error
    }
  },

  /**
   * Subscribe to real-time conversation and message changes with polling fallback
   */
  subscribeToSupport(options: {
    conversationId?: string
    studentId?: string
    onUpdate: () => void
  }): () => void {
    const { conversationId, studentId, onUpdate } = options

    const channelName = `support_realtime_${conversationId || studentId || 'all'}_${Date.now()}`
    const channel = supabase.channel(channelName)

    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_conversations',
          ...(conversationId ? { filter: `id=eq.${conversationId}` } : {}),
          ...(studentId && !conversationId ? { filter: `student_id=eq.${studentId}` } : {}),
        },
        () => {
          onUpdate()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_messages',
          ...(conversationId ? { filter: `conversation_id=eq.${conversationId}` } : {}),
        },
        () => {
          onUpdate()
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          // Connected successfully
        }
      })

    // Reliable fallback polling interval (every 8 seconds) in case of WS drops
    const pollInterval = setInterval(() => {
      onUpdate()
    }, 8000)

    return () => {
      clearInterval(pollInterval)
      supabase.removeChannel(channel)
    }
  },
}
