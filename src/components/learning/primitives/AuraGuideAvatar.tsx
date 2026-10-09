import React from 'react'
import { AuraCharacter, type AuraMood } from './AuraCharacter'

export type GuideMood = 'explaining' | 'thinking' | 'correct' | 'retry' | 'celebrating' | 'idle' | 'wrong'

export interface AuraGuideAvatarProps {
  mood?: GuideMood
  message?: string
  speakerName?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showSpeaker?: boolean
  variant?: 'full' | 'bust' | 'compact'
  lookDirection?: 'center' | 'left' | 'right' | 'up'
  hintText?: string
  onActionComplete?: () => void
}

export const AuraGuideAvatar: React.FC<AuraGuideAvatarProps> = ({
  mood = 'explaining',
  message,
  speakerName = 'Aura (AI Guide)',
  size = 'md',
  className = '',
  showSpeaker = true,
  variant = 'bust',
  lookDirection = 'center',
  hintText,
  onActionComplete,
}) => {
  // Map legacy 'retry' to 'wrong'
  const mappedMood: AuraMood = mood === 'retry' ? 'wrong' : (mood as AuraMood)

  return (
    <AuraCharacter
      mood={mappedMood}
      message={message}
      speakerName={speakerName}
      size={size}
      className={className}
      showSpeechBubble={Boolean(message)}
      showSpeaker={showSpeaker}
      variant={variant}
      lookDirection={lookDirection}
      hintText={hintText}
      onActionComplete={onActionComplete}
    />
  )
}

export { AuraCharacter }
export default AuraGuideAvatar
