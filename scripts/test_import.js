// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT: VERIFY CURRICULUM DATA SERVICE AVAILABILITY
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'

const curriculumDataPath = path.resolve('src/services/curriculumData.ts')
if (fs.existsSync(curriculumDataPath)) {
  const content = fs.readFileSync(curriculumDataPath, 'utf8')
  console.log(`[test_import] Successfully verified curriculumData.ts (${content.length} bytes)`)
} else {
  console.error('[test_import] Error: curriculumData.ts not found at expected path')
  process.exit(1)
}
