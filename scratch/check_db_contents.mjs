import { supabase } from '../src/lib/supabase.ts'

async function checkDb() {
  console.log('--- Checking Classes in DB ---')
  const { data: classes, error: errC } = await supabase.from('classes').select('id, name, code')
  console.log('Classes:', classes || errC)

  console.log('--- Checking Chapters in DB ---')
  const { data: chapters, error: errCh } = await supabase
    .from('chapters')
    .select('id, title, chapter_number, subject_id, subject:subjects(id, name, class_id, class:classes(id, name, code))')
    .limit(10)
  console.log('Chapters count:', chapters?.length)
  if (chapters && chapters.length > 0) {
    for (const ch of chapters) {
      console.log(`Chapter: ${ch.id} | #${ch.chapter_number} | ${ch.title} | Subject: ${(ch as any).subject?.name} | Class: ${(ch as any).subject?.class?.name}`)
      const { data: contents } = await supabase
        .from('chapter_content')
        .select('id, title, content_type, display_order, status')
        .eq('chapter_id', ch.id)
        .order('display_order', { ascending: true })
      console.log(`  Contents (${contents?.length || 0}):`)
      contents?.forEach(c => console.log(`    [${c.display_order}] (${c.content_type}) ${c.title} - status: ${c.status}`))
    }
  }
}

checkDb()
