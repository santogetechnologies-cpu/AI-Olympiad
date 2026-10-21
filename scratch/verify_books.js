import fs from 'fs'
import path from 'path'

const bookKeys = [
  'class3', 'class4', 'class5', 'class6', 'class7', 'class8', 'class9', 'class10', 'class11', 'class12',
  'ug1', 'ug2', 'ug3', 'ug4', 'pg1', 'pg2'
]

console.log('=== VERIFYING ALL 16 BOOKS AND MANIFESTS ===\n')

let allValid = true

// 1. Check book files
bookKeys.forEach(k => {
  const pdfPath = path.join(process.cwd(), 'public', 'books', `${k}.pdf`)
  if (!fs.existsSync(pdfPath)) {
    console.error(`[MISSING PDF] ${pdfPath}`)
    allValid = false
  } else {
    const stat = fs.statSync(pdfPath)
    console.log(`[OK PDF] ${k}.pdf (${(stat.size / (1024 * 1024)).toFixed(1)} MB)`)
  }
})

console.log('\n--- Checking Manifests ---')
// 2. Check manifests
bookKeys.forEach(k => {
  const manifestPath = path.join(process.cwd(), 'public', 'manifests', `${k}_manifest.json`)
  if (!fs.existsSync(manifestPath)) {
    console.error(`[MISSING MANIFEST] ${manifestPath}`)
    allValid = false
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
      console.log(`[OK MANIFEST] ${k}_manifest.json - ${data.totalPages} pages, title: "${data.profile?.title}"`)
    } catch (e) {
      console.error(`[INVALID MANIFEST JSON] ${manifestPath}:`, e.message)
      allValid = false
    }
  }
})

console.log('\n--- Checking bookCatalog.json ---')
// 3. Check bookCatalog.json
const catalogPath = path.join(process.cwd(), 'src', 'components', 'gaio', 'config', 'bookCatalog.json')
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))

bookKeys.forEach(k => {
  if (!catalog[k]) {
    console.error(`[MISSING IN CATALOG] ${k}`)
    allValid = false
  } else {
    const entry = catalog[k]
    console.log(`[OK CATALOG] ${k}: "${entry.title}" -> ${entry.pdfPath} (${entry.chapters?.length} chapters, ${entry.totalPages} pages)`)
  }
})

if (allValid) {
  console.log('\n✅ ALL 16 BOOKS, MANIFESTS, AND CATALOG DEFINITIONS ARE 100% IN PLACE!')
} else {
  console.error('\n❌ Verification encountered errors.')
  process.exit(1)
}
