import json
import shutil
import os

# Copy JSON to public
os.makedirs('public/gaio/class3', exist_ok=True)
shutil.copy('scratch/gaioFullBookScreens.json', 'public/gaio/class3/gaioFullBookScreens.json')
print("Copied to public/gaio/class3/gaioFullBookScreens.json")

# Generate TypeScript file that imports the JSON
with open('scratch/gaioFullBookScreens.json', 'r', encoding='utf-8') as f:
    screens = json.load(f)

print(f"Total screens: {len(screens)}")

ts_code = f"""// ─────────────────────────────────────────────────────────────────────────────
// GAIO CLASS 3 INTERACTIVE BOOK — COMPLETE SCREEN MAPPING & CONFIGURATION
// Generated from exact source of truth: GAIO Class3 Book.pdf (All 153 Pages)
// Total Website Screens: {len(screens)}
// PDF Page Count != Website Screen Count: Every content block mapped & functional.
// ─────────────────────────────────────────────────────────────────────────────

import type {{ GaioScreenItem }} from '../types'
import allScreensData from './gaioFullBookScreens.json'

export const CLASS3_BOOK_ALL_SCREENS: GaioScreenItem[] = allScreensData as GaioScreenItem[]

export const TOTAL_WEBSITE_SCREENS = CLASS3_BOOK_ALL_SCREENS.length // {len(screens)}
export const TOTAL_PDF_PAGES = 153

export function getScreenByIndex(index: number): GaioScreenItem | undefined {{
  if (index < 0 || index >= CLASS3_BOOK_ALL_SCREENS.length) return undefined
  return CLASS3_BOOK_ALL_SCREENS[index]
}}

export function getScreensByPdfPage(pdfPageNumber: number): GaioScreenItem[] {{
  return CLASS3_BOOK_ALL_SCREENS.filter((s) => s.pdfPageNumber === pdfPageNumber)
}}

export function getScreensForTopic(topicNumber: number): GaioScreenItem[] {{
  return CLASS3_BOOK_ALL_SCREENS.filter((s) => s.topicNumber === topicNumber)
}}

export function getScreensForMonth(monthNumber: number): GaioScreenItem[] {{
  return CLASS3_BOOK_ALL_SCREENS.filter((s) => s.monthNumber === monthNumber)
}}

export function findScreenIndexById(screenId: string): number {{
  return CLASS3_BOOK_ALL_SCREENS.findIndex((s) => s.id === screenId)
}}

export function findScreenIndexByPdfPage(pdfPageNumber: number): number {{
  const idx = CLASS3_BOOK_ALL_SCREENS.findIndex((s) => s.pdfPageNumber === pdfPageNumber)
  return idx >= 0 ? idx : 0
}}
"""

with open('src/components/gaio/config/gaioFullBookScreens.json', 'w', encoding='utf-8') as f:
    json.dump(screens, f, indent=2, ensure_ascii=False)

with open('src/components/gaio/config/class3BookScreens.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Created src/components/gaio/config/class3BookScreens.ts and JSON!")
