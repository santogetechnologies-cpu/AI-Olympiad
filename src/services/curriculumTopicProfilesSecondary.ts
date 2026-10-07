import type { TopicProfile } from './curriculumTopicRegistry'
import { CLASS9_TOPIC_PROFILES } from './curriculumTopicProfilesClass9'
import { CLASS10_TOPIC_PROFILES } from './curriculumTopicProfilesClass10'
import { CLASS11_TOPIC_PROFILES } from './curriculumTopicProfilesClass11'
import { CLASS12_TOPIC_PROFILES } from './curriculumTopicProfilesClass12'

export type { TopicProfile }

export const SECONDARY_TOPIC_PROFILES: Record<string, TopicProfile> = {
  ...CLASS9_TOPIC_PROFILES,
  ...CLASS10_TOPIC_PROFILES,
  ...CLASS11_TOPIC_PROFILES,
  ...CLASS12_TOPIC_PROFILES,
}
