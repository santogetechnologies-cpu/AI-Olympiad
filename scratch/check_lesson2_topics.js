import { ALL_LEVELS_CURRICULUM } from '../src/services/curriculumData';

console.log('=== LESSON 2 TOPICS ACROSS CURRICULUM ===');
ALL_LEVELS_CURRICULUM.forEach(lvl => {
  console.log('Grade: ' + lvl.gradeTitle + ' (' + lvl.gradeKey + ')');
  lvl.chapters.forEach(ch => {
    const l1 = ch.canonicalSections[1]?.title || 'Lesson 1';
    const l2 = ch.canonicalSections[2]?.title || 'Lesson 2';
    console.log('  Ch ' + ch.chapterNumber + ' (' + ch.title + '): [L1] ' + l1 + '  -->  [L2] ' + l2);
  });
});
