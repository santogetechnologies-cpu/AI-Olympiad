import type { Class } from '../types'

export type AppGradeKey =
  | 'class3'
  | 'class4'
  | 'class5'
  | 'class6'
  | 'class7'
  | 'class8'
  | 'class9'
  | 'class10'
  | 'class11'
  | 'class12'
  | 'ug1'
  | 'ug2'
  | 'ug3'
  | 'ug4'
  | 'pg1'
  | 'pg2'

export const CORE_CLASS_SPECS: { gradeKey: AppGradeKey; name: string; code: string }[] = [
  { gradeKey: 'class3', name: 'Class 3', code: 'CLS-03' },
  { gradeKey: 'class4', name: 'Class 4', code: 'CLS-04' },
  { gradeKey: 'class5', name: 'Class 5', code: 'CLS-05' },
  { gradeKey: 'class6', name: 'Class 6', code: 'CLS-06' },
  { gradeKey: 'class7', name: 'Class 7', code: 'CLS-07' },
  { gradeKey: 'class8', name: 'Class 8', code: 'CLS-08' },
  { gradeKey: 'class9', name: 'Class 9', code: 'CLS-09' },
  { gradeKey: 'class10', name: 'Class 10', code: 'CLS-10' },
  { gradeKey: 'class11', name: 'Class 11', code: 'CLS-11' },
  { gradeKey: 'class12', name: 'Class 12', code: 'CLS-12' },
  { gradeKey: 'ug1', name: 'UG 1st Year', code: 'UG-01' },
  { gradeKey: 'ug2', name: 'UG 2nd Year', code: 'UG-02' },
  { gradeKey: 'ug3', name: 'UG 3rd Year', code: 'UG-03' },
  { gradeKey: 'ug4', name: 'UG Final Year', code: 'UG-04' },
  { gradeKey: 'pg1', name: 'PG 1st Year', code: 'PG-01' },
  { gradeKey: 'pg2', name: 'PG Final Year', code: 'PG-02' },
]

export interface CSVStudentRow {
  full_name: string
  email: string
  phone: string
  student_id_number: string
  raw_class_name: string
  class_name: string
  class_id?: string
  temporary_password: string
  status?: 'pending' | 'success' | 'error'
  error_message?: string
  validation_error?: string
}

export interface CSVParseResult {
  rows: CSVStudentRow[]
  detectedMode: 'multi_class' | 'same_class'
  uniqueClassesDetected: string[]
  hasErrors: boolean
  validCount: number
  errorCount: number
}

/**
 * Splits a single CSV row line respecting quoted fields that contain commas.
 */
export function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result.map(val => val.replace(/^["']|["']$/g, '').trim())
}

/**
 * Robust, case-insensitive, whitespace-tolerant class matching.
 * Matches any input name, code, slug, or standard notation to an available Class record.
 */
export function matchClassInput(
  rawInput: string | undefined | null,
  availableClasses: Class[]
): { matchedClass: Class | null; gradeKey?: AppGradeKey; error?: string } {
  if (!rawInput || !rawInput.trim()) {
    return { matchedClass: null, error: 'Class name is required' }
  }

  const raw = rawInput.trim()
  const lower = raw.toLowerCase()
  const stripped = lower.replace(/[^a-z0-9]/g, '')

  // 1. Direct ID match (e.g. UUID)
  const byId = availableClasses.find(c => c.id === raw)
  if (byId) return { matchedClass: byId }

  // 2. Direct exact or stripped match against class name or code
  const byExact = availableClasses.find(c => {
    const cNameLower = c.name.toLowerCase().trim()
    const cCodeLower = (c.code || '').toLowerCase().trim()
    const cNameStripped = cNameLower.replace(/[^a-z0-9]/g, '')
    const cCodeStripped = cCodeLower.replace(/[^a-z0-9]/g, '')

    return (
      cNameLower === lower ||
      cCodeLower === lower ||
      cNameStripped === stripped ||
      cCodeStripped === stripped
    )
  })
  if (byExact) return { matchedClass: byExact }

  // 3. Pattern-based Grade Key matching (check PG, UG, two-digit classes, then single digits)
  let resolvedKey: AppGradeKey | null = null

  // Postgraduate (PG)
  if (/\b(pg\s*2|pg2|pg\s*2nd|pg-02|fai-02|pg\s*final)\b/i.test(raw)) {
    resolvedKey = 'pg2'
  } else if (/\b(pg\s*1|pg1|pg\s*1st|pg-01|aml-01)\b/i.test(raw)) {
    resolvedKey = 'pg1'
  }
  // Undergraduate (UG)
  else if (/\b(ug\s*4|ug4|ug\s*4th|ug-04|aaa-04|ug\s*final)\b/i.test(raw)) {
    resolvedKey = 'ug4'
  } else if (/\b(ug\s*3|ug3|ug\s*3rd|ug-03|dle-03)\b/i.test(raw)) {
    resolvedKey = 'ug3'
  } else if (/\b(ug\s*2|ug2|ug\s*2nd|ug-02|cml-02)\b/i.test(raw)) {
    resolvedKey = 'ug2'
  } else if (/\b(ug\s*1|ug1|ug\s*1st|ug-01|cai-01)\b/i.test(raw)) {
    resolvedKey = 'ug1'
  }
  // Senior Secondary & Secondary (12, 11, 10)
  else if (/\b(class|std|grade|cls)?\s*12(th)?\b/i.test(raw)) {
    resolvedKey = 'class12'
  } else if (/\b(class|std|grade|cls)?\s*11(th)?\b/i.test(raw)) {
    resolvedKey = 'class11'
  } else if (/\b(class|std|grade|cls)?\s*10(th)?\b/i.test(raw)) {
    resolvedKey = 'class10'
  }
  // Primary & Middle (9 down to 3)
  else if (/\b(class|std|grade|cls)?\s*9(th)?\b/i.test(raw)) {
    resolvedKey = 'class9'
  } else if (/\b(class|std|grade|cls)?\s*8(th)?\b/i.test(raw)) {
    resolvedKey = 'class8'
  } else if (/\b(class|std|grade|cls)?\s*7(th)?\b/i.test(raw)) {
    resolvedKey = 'class7'
  } else if (/\b(class|std|grade|cls)?\s*6(th)?\b/i.test(raw)) {
    resolvedKey = 'class6'
  } else if (/\b(class|std|grade|cls)?\s*5(th)?\b/i.test(raw)) {
    resolvedKey = 'class5'
  } else if (/\b(class|std|grade|cls)?\s*4(th)?\b/i.test(raw)) {
    resolvedKey = 'class4'
  } else if (/\b(class|std|grade|cls)?\s*3(rd)?\b/i.test(raw)) {
    resolvedKey = 'class3'
  }

  if (resolvedKey) {
    const spec = CORE_CLASS_SPECS.find(s => s.gradeKey === resolvedKey)
    if (spec) {
      const match = availableClasses.find(c => {
        const cNameLower = c.name.toLowerCase().trim()
        const specNameLower = spec.name.toLowerCase().trim()
        const cCodeLower = (c.code || '').toLowerCase().trim()
        const specCodeLower = spec.code.toLowerCase().trim()
        const cNameStripped = cNameLower.replace(/[^a-z0-9]/g, '')
        const specStripped = specNameLower.replace(/[^a-z0-9]/g, '')

        return (
          cNameLower === specNameLower ||
          cCodeLower === specCodeLower ||
          cNameStripped === specStripped ||
          cNameLower.includes(specNameLower) ||
          specNameLower.includes(cNameLower)
        )
      })
      if (match) return { matchedClass: match, gradeKey: resolvedKey }
    }
  }

  return { matchedClass: null, error: `Class "${raw}" not recognized` }
}

/**
 * Validates a list of CSV student rows according to all business rules:
 * - Email format and uniqueness within batch
 * - Student ID uniqueness within batch
 * - Required fields
 * - Class assignment based on selected mode (Option A vs Option B)
 */
export function validateStudentRows(
  rows: CSVStudentRow[],
  mode: 'multi_class' | 'same_class',
  selectedClassId?: string,
  availableClasses: Class[] = []
): CSVStudentRow[] {
  const seenEmails = new Set<string>()
  const seenStudentIds = new Set<string>()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const targetClass = selectedClassId ? availableClasses.find(c => c.id === selectedClassId) : undefined

  return rows.map(row => {
    // If row was already successfully imported to Supabase in this session, keep it
    if (row.status === 'success') {
      return { ...row, validation_error: undefined }
    }

    const errors: string[] = []

    // 1. Full name
    if (!row.full_name || !row.full_name.trim()) {
      errors.push('Student full name is required')
    }

    // 2. Email format & duplicate check within CSV
    const cleanEmail = (row.email || '').trim().toLowerCase()
    if (!cleanEmail) {
      errors.push('Email is required')
    } else if (!emailRegex.test(cleanEmail)) {
      errors.push(`Invalid email format: "${row.email}"`)
    } else if (seenEmails.has(cleanEmail)) {
      errors.push(`Duplicate email in CSV: "${row.email}"`)
    } else {
      seenEmails.add(cleanEmail)
    }

    // 3. Student ID duplicate check within CSV (if provided)
    const cleanId = (row.student_id_number || '').trim().toLowerCase()
    if (cleanId) {
      if (seenStudentIds.has(cleanId)) {
        errors.push(`Duplicate student ID in CSV: "${row.student_id_number}"`)
      } else {
        seenStudentIds.add(cleanId)
      }
    }

    // 4. Temporary password validation
    const tempPass = row.temporary_password || 'TempPass@123'
    if (tempPass.length < 6) {
      errors.push('Password must be at least 6 characters')
    }

    // 5. Class validation based on Mode
    let finalClassId = row.class_id
    let finalClassName = row.class_name

    if (mode === 'same_class') {
      if (targetClass) {
        finalClassId = targetClass.id
        finalClassName = targetClass.name
      } else if (!finalClassId) {
        errors.push('Please select a target class for Option A')
      }
    } else {
      // Option B: Multi-Class mode - validate individual row class
      if (!finalClassId && (row.raw_class_name || row.class_name)) {
        const matchRes = matchClassInput(row.raw_class_name || row.class_name, availableClasses)
        if (matchRes.matchedClass) {
          finalClassId = matchRes.matchedClass.id
          finalClassName = matchRes.matchedClass.name
        } else {
          errors.push(matchRes.error || `Class "${row.raw_class_name || row.class_name}" not found`)
        }
      } else if (!finalClassId) {
        errors.push('Class name missing in CSV')
      }
    }

    const validation_error = errors.length > 0 ? errors.join('; ') : undefined

    return {
      ...row,
      class_id: finalClassId,
      class_name: finalClassName || row.class_name,
      temporary_password: tempPass,
      validation_error,
      status: validation_error ? 'error' : 'pending',
      error_message: validation_error || row.error_message,
    }
  })
}

/**
 * Flexible header resolver for CSV mapping.
 */
function findHeaderIndex(headers: string[], aliases: string[]): number {
  return headers.findIndex(h => {
    const clean = h.toLowerCase().replace(/[^a-z0-9]/g, '')
    return aliases.some(alias => clean === alias.replace(/[^a-z0-9]/g, ''))
  })
}

/**
 * Parses raw CSV text into typed, validated CSVStudentRow items.
 * Intelligently detects whether the CSV is multi-class or single-class.
 */
export function parseStudentCsv(
  csvText: string,
  availableClasses: Class[],
  preferredMode?: 'multi_class' | 'same_class',
  defaultClassId?: string
): CSVParseResult {
  const lines = csvText.split(/\r\n|\n/).filter(line => line.trim() !== '')
  if (lines.length < 2) {
    throw new Error('CSV file must have a header row and at least one student row.')
  }

  const rawHeaders = parseCsvLine(lines[0])
  const nameIdx = findHeaderIndex(rawHeaders, ['fullname', 'full_name', 'name', 'studentname', 'student_name', 'student'])
  const emailIdx = findHeaderIndex(rawHeaders, ['email', 'emailaddress', 'email_address', 'mail', 'emailid', 'email_id'])
  const phoneIdx = findHeaderIndex(rawHeaders, ['phone', 'phonenumber', 'phone_number', 'mobile', 'mobilenumber', 'contact', 'contactnumber'])
  const studentIdIdx = findHeaderIndex(rawHeaders, ['studentidnumber', 'student_id_number', 'studentid', 'student_id', 'idnumber', 'rollno', 'roll_no', 'rollnumber', 'admissionno', 'regno'])
  const classIdx = findHeaderIndex(rawHeaders, ['classname', 'class_name', 'class', 'standard', 'grade', 'level', 'academicclass', 'section'])
  const passwordIdx = findHeaderIndex(rawHeaders, ['temporarypassword', 'temporary_password', 'temppassword', 'temp_password', 'password', 'pass'])

  const initialRows: CSVStudentRow[] = []
  const uniqueClassInputs = new Set<string>()

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    if (values.length === 0 || (values.length === 1 && !values[0])) continue

    const fullName = nameIdx >= 0 ? values[nameIdx] || '' : values[0] || ''
    const email = emailIdx >= 0 ? values[emailIdx] || '' : values[1] || ''
    const phone = phoneIdx >= 0 ? values[phoneIdx] || '' : ''
    const studentId = studentIdIdx >= 0 ? values[studentIdIdx] || '' : ''
    const rawClass = classIdx >= 0 ? values[classIdx] || '' : ''
    const password = passwordIdx >= 0 && values[passwordIdx] ? values[passwordIdx] : 'TempPass@123'

    if (rawClass) {
      uniqueClassInputs.add(rawClass.trim())
    }

    // Try matching class individually per row
    let matchedClass: Class | null = null
    if (rawClass) {
      const matchRes = matchClassInput(rawClass, availableClasses)
      if (matchRes.matchedClass) {
        matchedClass = matchRes.matchedClass
      }
    }

    initialRows.push({
      full_name: fullName,
      email: email,
      phone: phone,
      student_id_number: studentId,
      raw_class_name: rawClass,
      class_name: matchedClass?.name || rawClass,
      class_id: matchedClass?.id || '',
      temporary_password: password,
      status: 'pending'
    })
  }

  // Determine mode: If CSV has explicit class names, default to 'multi_class' (Option B).
  // If preferredMode is explicitly provided by user, respect it.
  let activeMode: 'multi_class' | 'same_class' = preferredMode || (uniqueClassInputs.size > 0 ? 'multi_class' : 'same_class')

  const validatedRows = validateStudentRows(initialRows, activeMode, defaultClassId, availableClasses)
  const validCount = validatedRows.filter(r => !r.validation_error && r.class_id).length
  const errorCount = validatedRows.filter(r => !!r.validation_error || !r.class_id).length

  return {
    rows: validatedRows,
    detectedMode: activeMode,
    uniqueClassesDetected: Array.from(uniqueClassInputs),
    hasErrors: errorCount > 0,
    validCount,
    errorCount
  }
}

/**
 * Generates sample CSV text demonstrating multiple academic classes.
 */
export function generateSampleCsv(availableClasses: Class[]): string {
  const c1 = availableClasses[0]?.name || 'Class 3'
  const c2 = availableClasses[1]?.name || 'Class 4'
  const c3 = availableClasses[2]?.name || 'Class 5'
  const c4 = availableClasses.find(c => c.name.toLowerCase().includes('ug 1'))?.name || 'UG 1st Year'

  const headers = 'full_name,email,phone,student_id_number,class_name,temporary_password\n'
  const sampleRows = [
    `Aarav Sharma,aarav.sharma@example.com,9876543210,STD-2026-001,${c1},TempPass@123`,
    `Diya Patel,diya.patel@example.com,9876543211,STD-2026-002,${c2},TempPass@123`,
    `Rohan Kumar,rohan.kumar@example.com,9876543212,STD-2026-003,${c3},TempPass@123`,
    `Ananya Reddy,ananya.reddy@example.com,9876543213,STD-2026-004,${c4},TempPass@123`
  ].join('\n')

  return headers + sampleRows
}
