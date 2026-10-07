import { supabase } from '../lib/supabase'

export const storageService = {
  async uploadFile(bucket: string, path: string, file: File, _onProgress?: (pct: number) => void): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true, cacheControl: '3600' })
    if (error) throw error

    // Generate signed URL (valid for 10 years) so private buckets work seamlessly across all browsers
    try {
      const { data: signedData, error: signError } = await supabase.storage
        .from(bucket)
        .createSignedUrl(data.path, 60 * 60 * 24 * 365 * 10)
      if (!signError && signedData?.signedUrl) {
        return signedData.signedUrl
      }
    } catch {
      // ignore
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return urlData.publicUrl
  },

  async uploadVideo(file: File, organizationId: string, _onProgress?: (pct: number) => void): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${organizationId}/${Date.now()}.${ext}`
    return storageService.uploadFile('videos', path, file, _onProgress)
  },

  async uploadImage(file: File, organizationId: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${organizationId}/${Date.now()}.${ext}`
    return storageService.uploadFile('images', path, file)
  },

  async uploadDocument(file: File, organizationId: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${organizationId}/${Date.now()}.${ext}`
    return storageService.uploadFile('documents', path, file)
  },

  async uploadWorksheet(file: File, organizationId: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${organizationId}/${Date.now()}.${ext}`
    return storageService.uploadFile('worksheets', path, file)
  },

  async uploadAssignmentSubmission(file: File, studentId: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${studentId}/${Date.now()}.${ext}`
    return storageService.uploadFile('assignments', path, file)
  },

  async uploadAvatar(file: File, userId: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `${userId}/avatar.${ext}`
    return storageService.uploadFile('avatars', path, file)
  },

  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) throw error
  },
}
