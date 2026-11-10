import assert from 'assert'
import fs from 'fs'

console.log('--- Verifying null id guards across codebase ---')

// 1. Verify UnifiedPdfInteractionLayer.tsx guards
const unifiedCode = fs.readFileSync('src/components/gaio/primitives/UnifiedPdfInteractionLayer.tsx', 'utf8')

// Check that dragStartRef.current is captured before setState updater functions
assert(unifiedCode.includes('const currentDrag = dragStartRef.current'), 'currentDrag must be captured')
assert(unifiedCode.includes('const targetId = currentDrag.id'), 'targetId must be extracted from currentDrag')
assert(unifiedCode.includes('(prev || []).map((s) => (s && s.id === targetId ? { ...s, x: newX, y: newY } : s))'), 'Stickers map must guard s && s.id')
assert(unifiedCode.includes('(prev || []).map((n) => (n && n.id === targetId ? { ...n, x: newX, y: newY } : n))'), 'Notes map must guard n && n.id')
assert(unifiedCode.includes('[targetId]: { x: nextX, y: nextY }'), 'Image offsets must use targetId')

// Check that stickers and typedNotes JSX mappings filter out null items
assert(unifiedCode.includes('(stickers || [])\n          .filter((st): st is PlacedSticker => Boolean(st && typeof st.id === \'string\'))'), 'Stickers JSX must filter Boolean(st && typeof st.id === "string")')
assert(unifiedCode.includes('(typedNotes || [])\n          .filter((note): note is TypedNote => Boolean(note && typeof note.id === \'string\'))'), 'Notes JSX must filter Boolean(note && typeof note.id === "string")')

// Check applyData sanitizes incoming arrays
assert(unifiedCode.includes('setStickers(data.stickers.filter((s: any) => Boolean(s && typeof s.id === \'string\')))'), 'applyData must sanitize stickers')
assert(unifiedCode.includes('setTypedNotes(data.typedNotes.filter((n: any) => Boolean(n && typeof n.id === \'string\')))'), 'applyData must sanitize typedNotes')

// Check handleDeleteSticker & handleDeleteNote guard
assert(unifiedCode.includes('if (!id) return'), 'Delete functions must guard empty id')
assert(unifiedCode.includes('(stickers || []).filter((s) => Boolean(s && s.id !== id))'), 'handleDeleteSticker must filter Boolean(s && s.id !== id)')
assert(unifiedCode.includes('(typedNotes || []).filter((n) => Boolean(n && n.id !== id))'), 'handleDeleteNote must filter Boolean(n && n.id !== id)')

console.log('✓ UnifiedPdfInteractionLayer guards verified')

// 2. Verify usePdfInteractiveLayer.ts guards
const hookCode = fs.readFileSync('src/components/gaio/hooks/usePdfInteractiveLayer.ts', 'utf8')
assert(hookCode.includes('if (!item?.id || typeof window === \'undefined\' || !(\'speechSynthesis\' in window)) return'), 'speakWord must guard item?.id')
assert(hookCode.includes('if (lastTapRef.current?.id && item?.id && lastTapRef.current.id === item.id'), 'handleWordPointerUp must guard lastTapRef.current?.id && item?.id')

console.log('✓ usePdfInteractiveLayer guards verified')

// 3. Verify ChapterLearningPage.tsx guards
const pageCode = fs.readFileSync('src/pages/student/ChapterLearningPage.tsx', 'utf8')
assert(pageCode.includes('fallbackItem: ChapterGridItem = {'), 'ChapterLearningPage must define fallbackItem')
assert(pageCode.includes('studentId={user?.id || \'demo-student-id\'}'), 'ChapterLearningPage must fallback studentId')

console.log('✓ ChapterLearningPage guards verified')

// 4. Verify GaioInteractiveBookApp.tsx guards
const appCode = fs.readFileSync('src/components/gaio/GaioInteractiveBookApp.tsx', 'utf8')
assert(appCode.includes('r && r.id && r.type !== \'choose\''), 'currentPageRegions must guard r && r.id')

console.log('✓ GaioInteractiveBookApp guards verified')

// 5. Verify PdfWordOverlay.tsx guards
const wordOverlayCode = fs.readFileSync('src/components/gaio/primitives/PdfWordOverlay.tsx', 'utf8')
assert(wordOverlayCode.includes('(words || []).filter((item): item is PageWordItem => Boolean(item && item.id))'), 'PdfWordOverlay must filter out null items')
console.log('✓ PdfWordOverlay guards verified')

// 6. Verify PdfRegionOverlay.tsx guards
const regionOverlayCode = fs.readFileSync('src/components/gaio/primitives/PdfRegionOverlay.tsx', 'utf8')
assert(regionOverlayCode.includes('(regions || []).filter((region): region is PageRegion => Boolean(region && region.id))'), 'PdfRegionOverlay must filter out null regions')
console.log('✓ PdfRegionOverlay guards verified')

// 7. Verify PdfGamesLayer.tsx guards
const gamesCode = fs.readFileSync('src/components/gaio/primitives/PdfGamesLayer.tsx', 'utf8')
assert(gamesCode.includes('(words || []).filter((w) => Boolean(w && w.id))'), 'PdfGamesLayer words must filter out null items')
assert(gamesCode.includes('(balloons || []).filter((b) => Boolean(b && b.id))'), 'PdfGamesLayer balloons must filter out null items')
console.log('✓ PdfGamesLayer guards verified')

// 8. Verify PdfInteractiveCanvas.tsx guards
const canvasCode = fs.readFileSync('src/components/gaio/primitives/PdfInteractiveCanvas.tsx', 'utf8')
assert(canvasCode.includes('(stamps || []).filter((stamp) => Boolean(stamp && stamp.id))'), 'PdfInteractiveCanvas stamps must filter out null items')
assert(canvasCode.includes('(textNotes || []).filter((note) => Boolean(note && note.id))'), 'PdfInteractiveCanvas textNotes must filter out null items')
console.log('✓ PdfInteractiveCanvas guards verified')

console.log('ALL NULL ID GUARDS PASSED!')

