import type { TopicProfile } from './curriculumTopicRegistry'
import { CLASS3_TOPIC_PROFILES } from './curriculumTopicProfilesClass3'
import { CLASS4_TOPIC_PROFILES } from './curriculumTopicProfilesClass4'
import { CLASS5_TOPIC_PROFILES } from './curriculumTopicProfilesClass5'

export type { TopicProfile }

export const PRIMARY_TOPIC_PROFILES: Record<string, TopicProfile> = {
  ...CLASS3_TOPIC_PROFILES,
  ...CLASS4_TOPIC_PROFILES,
  ...CLASS5_TOPIC_PROFILES,
}
