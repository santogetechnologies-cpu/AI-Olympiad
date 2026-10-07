/**
 * Media & Video URL Formatter and Helper Utilities
 */

export interface FormattedVideoInfo {
  isEmbed: boolean
  embedUrl: string
  directUrl: string
  type: 'youtube' | 'vimeo' | 'drive' | 'direct' | 'none'
}

export function formatVideoUrl(rawUrl?: string | null): FormattedVideoInfo {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { isEmbed: false, embedUrl: '', directUrl: '', type: 'none' }
  }

  const url = rawUrl.trim()
  if (!url) {
    return { isEmbed: false, embedUrl: '', directUrl: '', type: 'none' }
  }

  // 1. YouTube Shorts: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i)
  if (shortsMatch && shortsMatch[1]) {
    const embed = `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=0&rel=0&modestbranding=1`
    return { isEmbed: true, embedUrl: embed, directUrl: url, type: 'youtube' }
  }

  // 2. YouTube Standard: youtube.com/watch?v=VIDEO_ID, youtu.be/VIDEO_ID, or youtube.com/embed/VIDEO_ID
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)
  if (ytMatch && ytMatch[1]) {
    const embed = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`
    return { isEmbed: true, embedUrl: embed, directUrl: url, type: 'youtube' }
  }

  // 3. Vimeo: vimeo.com/VIDEO_ID or player.vimeo.com/video/VIDEO_ID
  const vimeoMatch = url.match(/(?:vimeo\.com\/(?:video\/)?)([0-9]+)/i)
  if (vimeoMatch && vimeoMatch[1]) {
    const embed = `https://player.vimeo.com/video/${vimeoMatch[1]}`
    return { isEmbed: true, embedUrl: embed, directUrl: url, type: 'vimeo' }
  }

  // 4. Google Drive: drive.google.com/file/d/FILE_ID/...
  if (url.includes('drive.google.com/file/d/')) {
    const driveEmbed = url.replace(/\/view(\?.*)?$/, '/preview')
    return { isEmbed: true, embedUrl: driveEmbed, directUrl: url, type: 'drive' }
  }

  // 5. Direct video file (MP4, WebM, Supabase storage signed/public URL)
  return { isEmbed: false, embedUrl: '', directUrl: url, type: 'direct' }
}
