const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dehoomosxtjvtfblhlto.supabase.co',
  'sb_publishable_6huLeNCsyo71FFLy6CB5DQ_5mG92APB'
);

async function main() {
  const { data: classes } = await supabase.from('classes').select('id, name, code');
  console.log('=== CLASSES ===');
  console.log(classes?.map(c => `${c.id} | ${c.name} (${c.code})`));

  const { data: chapters } = await supabase.from('chapters')
    .select('id, title, chapter_number, subject_id, subject:subjects(id, name, class:classes(id, name))')
    .order('chapter_number', { ascending: true })
    .limit(20);
  
  console.log('\n=== CHAPTERS SAMPLE ===');
  console.log(chapters?.map(c => ({
    id: c.id,
    num: c.chapter_number,
    title: c.title,
    subject: c.subject?.name,
    class: c.subject?.class?.name
  })));

  if (chapters && chapters.length > 0) {
    for (const chap of chapters.slice(0, 3)) {
      const { data: contents } = await supabase.from('chapter_content')
        .select('id, title, content_type, display_order')
        .eq('chapter_id', chap.id)
        .order('display_order', { ascending: true });
      console.log(`\n=== SECTIONS FOR ${chap.title} (Chapter ${chap.chapter_number}) ===`);
      console.log(contents);
    }
  }
}

main().catch(console.error);
