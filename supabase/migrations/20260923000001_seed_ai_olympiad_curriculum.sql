-- ============================================================
-- SEED: AI OLYMPIAD 6-MONTH CURRICULUM
-- Class 3 to PG Final Year with 6 Chapters each
-- ============================================================

DO $$
DECLARE
  v_org_id UUID;
  v_cat_id UUID;
  v_class_id UUID;
  v_subject_id UUID;
  v_chapter_id UUID;
  v_content_id UUID;
BEGIN
  -- 1. Get or create default Organization
  SELECT id INTO v_org_id FROM organizations ORDER BY created_at ASC LIMIT 1;
  IF v_org_id IS NULL THEN
    INSERT INTO organizations (id, name, slug, description, status)
    VALUES (
      'a0000000-0000-0000-0000-000000000001',
      'Nanjil Academy',
      'nanjil-academy',
      'A premier learning institution offering comprehensive education across all levels.',
      'active'
    )
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_org_id;
  END IF;

  -- 2. Create / Get Category: AI OLYMPIAD
  SELECT id INTO v_cat_id FROM categories WHERE organization_id = v_org_id AND slug = 'ai-olympiad';
  IF v_cat_id IS NULL THEN
    INSERT INTO categories (organization_id, name, slug, description, display_order, status)
    VALUES (
      v_org_id,
      'AI OLYMPIAD',
      'ai-olympiad',
      'AI Olympiad — 6-Month Curriculum from Class 3 to PG Final Year covering AI Discover, Connect, Solve, Rise, Create, and Care.',
      1,
      'published'
    )
    RETURNING id INTO v_cat_id;
  END IF;


  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 3
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 3';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 3',
      'CLASS-3',
      'AI Curriculum for CLASS 3',
      1,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 3',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 3)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Meet My AI Friend
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Meet My AI Friend') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Meet My AI Friend', 'Lesson 1: Meet My AI Friend', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Meet My AI Friend</h2><p>Welcome to Meet My AI Friend for CLASS 3. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Machines That Help Us
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Machines That Help Us') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Machines That Help Us', 'Lesson 2: Machines That Help Us', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Machines That Help Us</h2><p>Deep-dive into Machines That Help Us. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 3)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Give Me a Command!
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Give Me a Command!') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Give Me a Command!', 'Lesson 1: Give Me a Command!', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Give Me a Command!</h2><p>Welcome to Give Me a Command! for CLASS 3. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Put It in Order!
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Put It in Order!') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Put It in Order!', 'Lesson 2: Put It in Order!', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Put It in Order!</h2><p>Deep-dive into Put It in Order!. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 3)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Goes to School
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Goes to School') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Goes to School', 'Lesson 1: AI Goes to School', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Goes to School</h2><p>Welcome to AI Goes to School for CLASS 3. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Comes Home
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Comes Home') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Comes Home', 'Lesson 2: AI Comes Home', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Comes Home</h2><p>Deep-dive into AI Comes Home. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 3)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: When I Grow Up
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'When I Grow Up') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'When I Grow Up', 'Lesson 1: When I Grow Up', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>When I Grow Up</h2><p>Welcome to When I Grow Up for CLASS 3. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: People Behind Technology
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'People Behind Technology') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'People Behind Technology', 'Lesson 2: People Behind Technology', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>People Behind Technology</h2><p>Deep-dive into People Behind Technology. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 3)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Ask & Explore
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Ask & Explore') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Ask & Explore', 'Lesson 1: Ask & Explore', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Ask & Explore</h2><p>Welcome to Ask & Explore for CLASS 3. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Draw & Imagine
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Draw & Imagine') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Draw & Imagine', 'Lesson 2: Draw & Imagine', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Draw & Imagine</h2><p>Deep-dive into Draw & Imagine. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 3)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: My AI Safety Rules
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'My AI Safety Rules') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'My AI Safety Rules', 'Lesson 1: My AI Safety Rules', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>My AI Safety Rules</h2><p>Welcome to My AI Safety Rules for CLASS 3. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Share with Care
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Share with Care') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Share with Care', 'Lesson 2: Share with Care', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Share with Care</h2><p>Deep-dive into Share with Care. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 4
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 4';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 4',
      'CLASS-4',
      'AI Curriculum for CLASS 4',
      2,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 4',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 4)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Where Is AI Hiding?
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Where Is AI Hiding?') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Where Is AI Hiding?', 'Lesson 1: Where Is AI Hiding?', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Where Is AI Hiding?</h2><p>Welcome to Where Is AI Hiding? for CLASS 4. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Meet the Smart Machines
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Meet the Smart Machines') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Meet the Smart Machines', 'Lesson 2: Meet the Smart Machines', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Meet the Smart Machines</h2><p>Deep-dive into Meet the Smart Machines. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 4)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Say It Clearly!
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Say It Clearly!') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Say It Clearly!', 'Lesson 1: Say It Clearly!', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Say It Clearly!</h2><p>Welcome to Say It Clearly! for CLASS 4. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Mission: Instructions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Mission: Instructions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Mission: Instructions', 'Lesson 2: Mission: Instructions', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Mission: Instructions</h2><p>Deep-dive into Mission: Instructions. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 4)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI in My Mobile
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI in My Mobile') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI in My Mobile', 'Lesson 1: AI in My Mobile', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI in My Mobile</h2><p>Welcome to AI in My Mobile for CLASS 4. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI on the Move
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI on the Move') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI on the Move', 'Lesson 2: AI on the Move', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI on the Move</h2><p>Deep-dive into AI on the Move. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 4)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Future Job Hunt
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Future Job Hunt') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Future Job Hunt', 'Lesson 1: Future Job Hunt', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Future Job Hunt</h2><p>Welcome to Future Job Hunt for CLASS 4. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: My Technology Talent
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'My Technology Talent') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'My Technology Talent', 'Lesson 2: My Technology Talent', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>My Technology Talent</h2><p>Deep-dive into My Technology Talent. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 4)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Create a Story
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Create a Story') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Create a Story', 'Lesson 1: Create a Story', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Create a Story</h2><p>Welcome to Create a Story for CLASS 4. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Design with AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Design with AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Design with AI', 'Lesson 2: Design with AI', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Design with AI</h2><p>Deep-dive into Design with AI. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 4)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Secret or Share?
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Secret or Share?') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Secret or Share?', 'Lesson 1: Secret or Share?', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Secret or Share?</h2><p>Welcome to Secret or Share? for CLASS 4. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI: Right or Wrong?
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI: Right or Wrong?') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI: Right or Wrong?', 'Lesson 2: AI: Right or Wrong?', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI: Right or Wrong?</h2><p>Deep-dive into AI: Right or Wrong?. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 5
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 5';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 5',
      'CLASS-5',
      'AI Curriculum for CLASS 5',
      3,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 5',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 5)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: The Secret Behind AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'The Secret Behind AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'The Secret Behind AI', 'Lesson 1: The Secret Behind AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>The Secret Behind AI</h2><p>Welcome to The Secret Behind AI for CLASS 5. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Learning Machines
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Learning Machines') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Learning Machines', 'Lesson 2: Learning Machines', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Learning Machines</h2><p>Deep-dive into Learning Machines. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 5)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Crack the Logic!
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Crack the Logic!') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Crack the Logic!', 'Lesson 1: Crack the Logic!', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Crack the Logic!</h2><p>Welcome to Crack the Logic! for CLASS 5. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Command to Creation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Command to Creation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Command to Creation', 'Lesson 2: Command to Creation', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Command to Creation</h2><p>Deep-dive into Command to Creation. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 5)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI in the Hospital
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI in the Hospital') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI in the Hospital', 'Lesson 1: AI in the Hospital', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI in the Hospital</h2><p>Welcome to AI in the Hospital for CLASS 5. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI in the Classroom
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI in the Classroom') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI in the Classroom', 'Lesson 2: AI in the Classroom', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI in the Classroom</h2><p>Deep-dive into AI in the Classroom. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 5)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: My Future with AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'My Future with AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'My Future with AI', 'Lesson 1: My Future with AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>My Future with AI</h2><p>Welcome to My Future with AI for CLASS 5. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Skills of Tomorrow
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Skills of Tomorrow') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Skills of Tomorrow', 'Lesson 2: Skills of Tomorrow', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Skills of Tomorrow</h2><p>Deep-dive into Skills of Tomorrow. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 5)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Study Buddy
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Study Buddy') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Study Buddy', 'Lesson 1: AI Study Buddy', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Study Buddy</h2><p>Welcome to AI Study Buddy for CLASS 5. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Creative Corner
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Creative Corner') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Creative Corner', 'Lesson 2: AI Creative Corner', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Creative Corner</h2><p>Deep-dive into AI Creative Corner. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 5)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Can AI Be Wrong?
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Can AI Be Wrong?') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Can AI Be Wrong?', 'Lesson 1: Can AI Be Wrong?', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Can AI Be Wrong?</h2><p>Welcome to Can AI Be Wrong? for CLASS 5. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Be a Smart AI User
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Be a Smart AI User') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Be a Smart AI User', 'Lesson 2: Be a Smart AI User', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Be a Smart AI User</h2><p>Deep-dive into Be a Smart AI User. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 6
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 6';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 6',
      'CLASS-6',
      'AI Curriculum for CLASS 6',
      4,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 6',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 6)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: How Machines Get Smart
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'How Machines Get Smart') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'How Machines Get Smart', 'Lesson 1: How Machines Get Smart', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>How Machines Get Smart</h2><p>Welcome to How Machines Get Smart for CLASS 6. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Learning from Examples
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Learning from Examples') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Learning from Examples', 'Lesson 2: Learning from Examples', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Learning from Examples</h2><p>Deep-dive into Learning from Examples. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 6)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Think → Plan → Code
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Think → Plan → Code') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Think → Plan → Code', 'Lesson 1: Think → Plan → Code', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Think → Plan → Code</h2><p>Welcome to Think → Plan → Code for CLASS 6. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Coding Made Friendly
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Coding Made Friendly') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Coding Made Friendly', 'Lesson 2: Coding Made Friendly', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Coding Made Friendly</h2><p>Deep-dive into Coding Made Friendly. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 6)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI on the Road
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI on the Road') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI on the Road', 'Lesson 1: AI on the Road', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI on the Road</h2><p>Welcome to AI on the Road for CLASS 6. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI on the Farm
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI on the Farm') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI on the Farm', 'Lesson 2: AI on the Farm', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI on the Farm</h2><p>Deep-dive into AI on the Farm. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 6)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Explore Tech Careers
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Explore Tech Careers') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Explore Tech Careers', 'Lesson 1: Explore Tech Careers', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Explore Tech Careers</h2><p>Welcome to Explore Tech Careers for CLASS 6. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Discover Your Skills
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Discover Your Skills') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Discover Your Skills', 'Lesson 2: Discover Your Skills', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Discover Your Skills</h2><p>Deep-dive into Discover Your Skills. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 6)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Learning Lab
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Learning Lab') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Learning Lab', 'Lesson 1: AI Learning Lab', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Learning Lab</h2><p>Welcome to AI Learning Lab for CLASS 6. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Create with AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Create with AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Create with AI', 'Lesson 2: Create with AI', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Create with AI</h2><p>Deep-dive into Create with AI. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 6)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Protect Your Data
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Protect Your Data') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Protect Your Data', 'Lesson 1: Protect Your Data', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Protect Your Data</h2><p>Welcome to Protect Your Data for CLASS 6. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Think Before You Trust
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Think Before You Trust') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Think Before You Trust', 'Lesson 2: Think Before You Trust', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Think Before You Trust</h2><p>Deep-dive into Think Before You Trust. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 7
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 7';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 7',
      'CLASS-7',
      'AI Curriculum for CLASS 7',
      5,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 7',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 7)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Learns from Data
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Learns from Data') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Learns from Data', 'Lesson 1: AI Learns from Data', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Learns from Data</h2><p>Welcome to AI Learns from Data for CLASS 7. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Patterns Make It Smart
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Patterns Make It Smart') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Patterns Make It Smart', 'Lesson 2: Patterns Make It Smart', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Patterns Make It Smart</h2><p>Deep-dive into Patterns Make It Smart. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 7)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Hello, Python!
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Hello, Python!') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Hello, Python!', 'Lesson 1: Hello, Python!', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Hello, Python!</h2><p>Welcome to Hello, Python! for CLASS 7. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Code Your First Idea
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Code Your First Idea') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Code Your First Idea', 'Lesson 2: Code Your First Idea', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Code Your First Idea</h2><p>Deep-dive into Code Your First Idea. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 7)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI in Money Matters
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI in Money Matters') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI in Money Matters', 'Lesson 1: AI in Money Matters', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI in Money Matters</h2><p>Welcome to AI in Money Matters for CLASS 7. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for a Greener World
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for a Greener World') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for a Greener World', 'Lesson 2: AI for a Greener World', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for a Greener World</h2><p>Deep-dive into AI for a Greener World. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 7)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Career Compass: AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Career Compass: AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Career Compass: AI', 'Lesson 1: Career Compass: AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Career Compass: AI</h2><p>Welcome to Career Compass: AI for CLASS 7. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Skills That Matter
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Skills That Matter') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Skills That Matter', 'Lesson 2: Skills That Matter', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Skills That Matter</h2><p>Deep-dive into Skills That Matter. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 7)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Content Creator
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Content Creator') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Content Creator', 'Lesson 1: AI Content Creator', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Content Creator</h2><p>Welcome to AI Content Creator for CLASS 7. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Learning Assistant
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Learning Assistant') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Learning Assistant', 'Lesson 2: AI Learning Assistant', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Learning Assistant</h2><p>Deep-dive into AI Learning Assistant. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 7)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Fact, Fake or AI?
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Fact, Fake or AI?') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Fact, Fake or AI?', 'Lesson 1: Fact, Fake or AI?', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Fact, Fake or AI?</h2><p>Welcome to Fact, Fake or AI? for CLASS 7. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Fairness Matters
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Fairness Matters') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Fairness Matters', 'Lesson 2: Fairness Matters', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Fairness Matters</h2><p>Deep-dive into Fairness Matters. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 8
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 8';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 8',
      'CLASS-8',
      'AI Curriculum for CLASS 8',
      6,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 8',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 8)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: How AI Makes Choices
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'How AI Makes Choices') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'How AI Makes Choices', 'Lesson 1: How AI Makes Choices', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>How AI Makes Choices</h2><p>Welcome to How AI Makes Choices for CLASS 8. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Learning from Data
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Learning from Data') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Learning from Data', 'Lesson 2: Learning from Data', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Learning from Data</h2><p>Deep-dive into Learning from Data. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 8)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Python Playground
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Python Playground') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Python Playground', 'Lesson 1: Python Playground', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Python Playground</h2><p>Welcome to Python Playground for CLASS 8. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Code a Solution
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Code a Solution') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Code a Solution', 'Lesson 2: Code a Solution', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Code a Solution</h2><p>Deep-dive into Code a Solution. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 8)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Better Health
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Better Health') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Better Health', 'Lesson 1: AI for Better Health', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Better Health</h2><p>Welcome to AI for Better Health for CLASS 8. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Better Cities
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Better Cities') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Better Cities', 'Lesson 2: AI for Better Cities', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Better Cities</h2><p>Deep-dive into AI for Better Cities. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 8)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Find Your Future Path
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Find Your Future Path') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Find Your Future Path', 'Lesson 1: Find Your Future Path', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Find Your Future Path</h2><p>Welcome to Find Your Future Path for CLASS 8. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Career Discovery
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Career Discovery') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Career Discovery', 'Lesson 2: AI Career Discovery', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Career Discovery</h2><p>Deep-dive into AI Career Discovery. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 8)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Build with GenAI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Build with GenAI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Build with GenAI', 'Lesson 1: Build with GenAI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Build with GenAI</h2><p>Welcome to Build with GenAI for CLASS 8. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Media Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Media Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Media Studio', 'Lesson 2: AI Media Studio', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Media Studio</h2><p>Deep-dive into AI Media Studio. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 8)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Deepfake Alert!
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Deepfake Alert!') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Deepfake Alert!', 'Lesson 1: Deepfake Alert!', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Deepfake Alert!</h2><p>Welcome to Deepfake Alert! for CLASS 8. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Your Data, Your Right
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Your Data, Your Right') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Your Data, Your Right', 'Lesson 2: Your Data, Your Right', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Your Data, Your Right</h2><p>Deep-dive into Your Data, Your Right. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 9
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 9';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 9',
      'CLASS-9',
      'AI Curriculum for CLASS 9',
      7,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 9',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 9)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: From Data to Intelligence
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'From Data to Intelligence') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'From Data to Intelligence', 'Lesson 1: From Data to Intelligence', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>From Data to Intelligence</h2><p>Welcome to From Data to Intelligence for CLASS 9. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Machines That Predict
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Machines That Predict') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Machines That Predict', 'Lesson 2: Machines That Predict', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Machines That Predict</h2><p>Deep-dive into Machines That Predict. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 9)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Python in Action
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Python in Action') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Python in Action', 'Lesson 1: Python in Action', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Python in Action</h2><p>Welcome to Python in Action for CLASS 9. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Solve It with Code
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Solve It with Code') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Solve It with Code', 'Lesson 2: Solve It with Code', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Solve It with Code</h2><p>Deep-dive into Solve It with Code. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 9)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Our Planet
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Our Planet') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Our Planet', 'Lesson 1: AI for Our Planet', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Our Planet</h2><p>Welcome to AI for Our Planet for CLASS 9. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Public Good
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Public Good') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Public Good', 'Lesson 2: AI for Public Good', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Public Good</h2><p>Deep-dive into AI for Public Good. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 9)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Design Your AI Future
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Design Your AI Future') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Design Your AI Future', 'Lesson 1: Design Your AI Future', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Design Your AI Future</h2><p>Welcome to Design Your AI Future for CLASS 9. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Skill-to-Career Map
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Skill-to-Career Map') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Skill-to-Career Map', 'Lesson 2: Skill-to-Career Map', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Skill-to-Career Map</h2><p>Deep-dive into Skill-to-Career Map. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 9)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Research Room
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Research Room') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Research Room', 'Lesson 1: AI Research Room', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Research Room</h2><p>Welcome to AI Research Room for CLASS 9. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Creator Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Creator Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Creator Studio', 'Lesson 2: AI Creator Studio', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Creator Studio</h2><p>Deep-dive into AI Creator Studio. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 9)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Think Before You Believe
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Think Before You Believe') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Think Before You Believe', 'Lesson 1: Think Before You Believe', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Think Before You Believe</h2><p>Welcome to Think Before You Believe for CLASS 9. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Digital Footprints & AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Digital Footprints & AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Digital Footprints & AI', 'Lesson 2: Digital Footprints & AI', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Digital Footprints & AI</h2><p>Deep-dive into Digital Footprints & AI. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 10
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 10';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 10',
      'CLASS-10',
      'AI Curriculum for CLASS 10',
      8,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 10',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 10)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: How AI Thinks with Data
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'How AI Thinks with Data') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'How AI Thinks with Data', 'Lesson 1: How AI Thinks with Data', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>How AI Thinks with Data</h2><p>Welcome to How AI Thinks with Data for CLASS 10. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Generative AI Uncovered
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Generative AI Uncovered') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Generative AI Uncovered', 'Lesson 2: Generative AI Uncovered', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Generative AI Uncovered</h2><p>Deep-dive into Generative AI Uncovered. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 10)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI-Assisted Coding
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI-Assisted Coding') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI-Assisted Coding', 'Lesson 1: AI-Assisted Coding', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI-Assisted Coding</h2><p>Welcome to AI-Assisted Coding for CLASS 10. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Code → Test → Improve
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Code → Test → Improve') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Code → Test → Improve', 'Lesson 2: Code → Test → Improve', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Code → Test → Improve</h2><p>Deep-dive into Code → Test → Improve. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 10)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI at Work
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI at Work') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI at Work', 'Lesson 1: AI at Work', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI at Work</h2><p>Welcome to AI at Work for CLASS 10. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Solving Real Problems
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Solving Real Problems') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Solving Real Problems', 'Lesson 2: AI Solving Real Problems', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Solving Real Problems</h2><p>Deep-dive into AI Solving Real Problems. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 10)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Your Road to an AI Career
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Your Road to an AI Career') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Your Road to an AI Career', 'Lesson 1: Your Road to an AI Career', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Your Road to an AI Career</h2><p>Welcome to Your Road to an AI Career for CLASS 10. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Skills Beyond School
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Skills Beyond School') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Skills Beyond School', 'Lesson 2: AI Skills Beyond School', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Skills Beyond School</h2><p>Deep-dive into AI Skills Beyond School. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 10)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Productivity Booster
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Productivity Booster') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Productivity Booster', 'Lesson 1: AI Productivity Booster', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Productivity Booster</h2><p>Welcome to AI Productivity Booster for CLASS 10. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Create Your AI Project
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Create Your AI Project') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Create Your AI Project', 'Lesson 2: Create Your AI Project', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Create Your AI Project</h2><p>Deep-dive into Create Your AI Project. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 10)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Original or AI-Made?
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Original or AI-Made?') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Original or AI-Made?', 'Lesson 1: Original or AI-Made?', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Original or AI-Made?</h2><p>Welcome to Original or AI-Made? for CLASS 10. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Use AI, Don't Misuse AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Use AI, Don''t Misuse AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Use AI, Don''t Misuse AI', 'Lesson 2: Use AI, Don''t Misuse AI', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Use AI, Don''t Misuse AI</h2><p>Deep-dive into Use AI, Don''t Misuse AI. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 11
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 11';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 11',
      'CLASS-11',
      'AI Curriculum for CLASS 11',
      9,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 11',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 11)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Inside Intelligent Machines
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Inside Intelligent Machines') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Inside Intelligent Machines', 'Lesson 1: Inside Intelligent Machines', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Inside Intelligent Machines</h2><p>Welcome to Inside Intelligent Machines for CLASS 11. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Predict, Learn & Improve
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Predict, Learn & Improve') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Predict, Learn & Improve', 'Lesson 2: Predict, Learn & Improve', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Predict, Learn & Improve</h2><p>Deep-dive into Predict, Learn & Improve. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 11)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Python for Smart Solutions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Python for Smart Solutions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Python for Smart Solutions', 'Lesson 1: Python for Smart Solutions', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Python for Smart Solutions</h2><p>Welcome to Python for Smart Solutions for CLASS 11. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: The Art of Prompting
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'The Art of Prompting') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'The Art of Prompting', 'Lesson 2: The Art of Prompting', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>The Art of Prompting</h2><p>Deep-dive into The Art of Prompting. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 11)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Powers Innovation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Powers Innovation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Powers Innovation', 'Lesson 1: AI Powers Innovation', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Powers Innovation</h2><p>Welcome to AI Powers Innovation for CLASS 11. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Across Industries
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Across Industries') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Across Industries', 'Lesson 2: AI Across Industries', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Across Industries</h2><p>Deep-dive into AI Across Industries. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 11)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Career Universe
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Career Universe') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Career Universe', 'Lesson 1: AI Career Universe', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Career Universe</h2><p>Welcome to AI Career Universe for CLASS 11. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Create Your Career Blueprint
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Create Your Career Blueprint') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Create Your Career Blueprint', 'Lesson 2: Create Your Career Blueprint', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Create Your Career Blueprint</h2><p>Deep-dive into Create Your Career Blueprint. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 11)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Research Desk
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Research Desk') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Research Desk', 'Lesson 1: AI Research Desk', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Research Desk</h2><p>Welcome to AI Research Desk for CLASS 11. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Creation Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Creation Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Creation Studio', 'Lesson 2: AI Creation Studio', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Creation Studio</h2><p>Deep-dive into AI Creation Studio. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 11)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Fair AI Challenge
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Fair AI Challenge') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Fair AI Challenge', 'Lesson 1: Fair AI Challenge', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Fair AI Challenge</h2><p>Welcome to Fair AI Challenge for CLASS 11. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Privacy in an AI World
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Privacy in an AI World') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Privacy in an AI World', 'Lesson 2: Privacy in an AI World', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Privacy in an AI World</h2><p>Deep-dive into Privacy in an AI World. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: CLASS 12
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'CLASS 12';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'CLASS 12',
      'CLASS-12',
      'AI Curriculum for CLASS 12',
      10,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for CLASS 12',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (CLASS 12)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: The World of Generative AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'The World of Generative AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'The World of Generative AI', 'Lesson 1: The World of Generative AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>The World of Generative AI</h2><p>Welcome to The World of Generative AI for CLASS 12. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Understanding LLMs
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Understanding LLMs') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Understanding LLMs', 'Lesson 2: Understanding LLMs', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Understanding LLMs</h2><p>Deep-dive into Understanding LLMs. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (CLASS 12)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Prompt → Plan → Produce
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Prompt → Plan → Produce') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Prompt → Plan → Produce', 'Lesson 1: Prompt → Plan → Produce', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Prompt → Plan → Produce</h2><p>Welcome to Prompt → Plan → Produce for CLASS 12. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Workflow Basics
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Workflow Basics') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Workflow Basics', 'Lesson 2: AI Workflow Basics', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Workflow Basics</h2><p>Deep-dive into AI Workflow Basics. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (CLASS 12)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Innovation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Innovation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Innovation', 'Lesson 1: AI for Innovation', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Innovation</h2><p>Welcome to AI for Innovation for CLASS 12. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Enterprise
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Enterprise') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Enterprise', 'Lesson 2: AI for Enterprise', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Enterprise</h2><p>Deep-dive into AI for Enterprise. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (CLASS 12)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Your AI Career Launchpad
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Your AI Career Launchpad') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Your AI Career Launchpad', 'Lesson 1: Your AI Career Launchpad', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Your AI Career Launchpad</h2><p>Welcome to Your AI Career Launchpad for CLASS 12. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Build Your Professional Profile
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Build Your Professional Profile') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Build Your Professional Profile', 'Lesson 2: Build Your Professional Profile', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Build Your Professional Profile</h2><p>Deep-dive into Build Your Professional Profile. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (CLASS 12)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Assistant Lab
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Assistant Lab') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Assistant Lab', 'Lesson 1: AI Assistant Lab', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Assistant Lab</h2><p>Welcome to AI Assistant Lab for CLASS 12. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Project Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Project Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Project Studio', 'Lesson 2: AI Project Studio', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Project Studio</h2><p>Deep-dive into AI Project Studio. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (CLASS 12)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Verify Before You Trust
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Verify Before You Trust') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Verify Before You Trust', 'Lesson 1: Verify Before You Trust', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Verify Before You Trust</h2><p>Welcome to Verify Before You Trust for CLASS 12. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Humans Behind AI Decisions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Humans Behind AI Decisions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Humans Behind AI Decisions', 'Lesson 2: Humans Behind AI Decisions', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Humans Behind AI Decisions</h2><p>Deep-dive into Humans Behind AI Decisions. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: UG 1st YEAR
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'UG 1st YEAR';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'UG 1st YEAR',
      'UG-1',
      'AI Curriculum for UG 1st YEAR',
      11,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for UG 1st YEAR',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (UG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Demystified
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Demystified') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Demystified', 'Lesson 1: AI Demystified', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Demystified</h2><p>Welcome to AI Demystified for UG 1st YEAR. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: The Intelligence Behind Machines
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'The Intelligence Behind Machines') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'The Intelligence Behind Machines', 'Lesson 2: The Intelligence Behind Machines', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>The Intelligence Behind Machines</h2><p>Deep-dive into The Intelligence Behind Machines. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (UG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Python + AI Starter
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Python + AI Starter') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Python + AI Starter', 'Lesson 1: Python + AI Starter', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Python + AI Starter</h2><p>Welcome to Python + AI Starter for UG 1st YEAR. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Prompt with Purpose
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Prompt with Purpose') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Prompt with Purpose', 'Lesson 2: Prompt with Purpose', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Prompt with Purpose</h2><p>Deep-dive into Prompt with Purpose. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (UG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI in the Real World
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI in the Real World') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI in the Real World', 'Lesson 1: AI in the Real World', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI in the Real World</h2><p>Welcome to AI in the Real World for UG 1st YEAR. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI in Your Profession
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI in Your Profession') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI in Your Profession', 'Lesson 2: AI in Your Profession', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI in Your Profession</h2><p>Deep-dive into AI in Your Profession. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (UG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Navigate the AI Job World
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Navigate the AI Job World') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Navigate the AI Job World', 'Lesson 1: Navigate the AI Job World', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Navigate the AI Job World</h2><p>Welcome to Navigate the AI Job World for UG 1st YEAR. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Build Your AI Skillset
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Build Your AI Skillset') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Build Your AI Skillset', 'Lesson 2: Build Your AI Skillset', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Build Your AI Skillset</h2><p>Deep-dive into Build Your AI Skillset. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (UG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Workbench
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Workbench') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Workbench', 'Lesson 1: AI Workbench', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Workbench</h2><p>Welcome to AI Workbench for UG 1st YEAR. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Coding Companion
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Coding Companion') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Coding Companion', 'Lesson 2: AI Coding Companion', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Coding Companion</h2><p>Deep-dive into AI Coding Companion. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (UG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Responsible Digital Intelligence
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Responsible Digital Intelligence') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Responsible Digital Intelligence', 'Lesson 1: Responsible Digital Intelligence', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Responsible Digital Intelligence</h2><p>Welcome to Responsible Digital Intelligence for UG 1st YEAR. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Data Privacy Matters
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Data Privacy Matters') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Data Privacy Matters', 'Lesson 2: Data Privacy Matters', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Data Privacy Matters</h2><p>Deep-dive into Data Privacy Matters. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: UG 2nd YEAR
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'UG 2nd YEAR';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'UG 2nd YEAR',
      'UG-2',
      'AI Curriculum for UG 2nd YEAR',
      12,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for UG 2nd YEAR',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (UG 2nd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Learning from Data
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Learning from Data') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Learning from Data', 'Lesson 1: Learning from Data', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Learning from Data</h2><p>Welcome to Learning from Data for UG 2nd YEAR. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Making Machines Smarter
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Making Machines Smarter') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Making Machines Smarter', 'Lesson 2: Making Machines Smarter', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Making Machines Smarter</h2><p>Deep-dive into Making Machines Smarter. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (UG 2nd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Program with AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Program with AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Program with AI', 'Lesson 1: Program with AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Program with AI</h2><p>Welcome to Program with AI for UG 2nd YEAR. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Data into Decisions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Data into Decisions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Data into Decisions', 'Lesson 2: Data into Decisions', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Data into Decisions</h2><p>Deep-dive into Data into Decisions. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (UG 2nd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Smarter Business
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Smarter Business') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Smarter Business', 'Lesson 1: AI for Smarter Business', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Smarter Business</h2><p>Welcome to AI for Smarter Business for UG 2nd YEAR. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Engineering Solutions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Engineering Solutions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Engineering Solutions', 'Lesson 2: AI for Engineering Solutions', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Engineering Solutions</h2><p>Deep-dive into AI for Engineering Solutions. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (UG 2nd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Pick Your AI Path
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Pick Your AI Path') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Pick Your AI Path', 'Lesson 1: Pick Your AI Path', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Pick Your AI Path</h2><p>Welcome to Pick Your AI Path for UG 2nd YEAR. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Portfolio to Profession
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Portfolio to Profession') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Portfolio to Profession', 'Lesson 2: Portfolio to Profession', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Portfolio to Profession</h2><p>Deep-dive into Portfolio to Profession. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (UG 2nd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Data Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Data Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Data Studio', 'Lesson 1: AI Data Studio', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Data Studio</h2><p>Welcome to AI Data Studio for UG 2nd YEAR. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Smart Automation Tools
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Smart Automation Tools') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Smart Automation Tools', 'Lesson 2: Smart Automation Tools', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Smart Automation Tools</h2><p>Deep-dive into Smart Automation Tools. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (UG 2nd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Fair AI, Fair Future
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Fair AI, Fair Future') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Fair AI, Fair Future', 'Lesson 1: Fair AI, Fair Future', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Fair AI, Fair Future</h2><p>Welcome to Fair AI, Fair Future for UG 2nd YEAR. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Ownership in the AI Age
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Ownership in the AI Age') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Ownership in the AI Age', 'Lesson 2: Ownership in the AI Age', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Ownership in the AI Age</h2><p>Deep-dive into Ownership in the AI Age. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: UG 3rd YEAR
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'UG 3rd YEAR';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'UG 3rd YEAR',
      'UG-3',
      'AI Curriculum for UG 3rd YEAR',
      13,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for UG 3rd YEAR',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (UG 3rd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Generative Intelligence
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Generative Intelligence') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Generative Intelligence', 'Lesson 1: Generative Intelligence', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Generative Intelligence</h2><p>Welcome to Generative Intelligence for UG 3rd YEAR. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Inside LLMs
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Inside LLMs') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Inside LLMs', 'Lesson 2: Inside LLMs', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Inside LLMs</h2><p>Deep-dive into Inside LLMs. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (UG 3rd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI-Powered Development
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI-Powered Development') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI-Powered Development', 'Lesson 1: AI-Powered Development', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI-Powered Development</h2><p>Welcome to AI-Powered Development for UG 3rd YEAR. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Connect, Create & Automate
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Connect, Create & Automate') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Connect, Create & Automate', 'Lesson 2: Connect, Create & Automate', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Connect, Create & Automate</h2><p>Deep-dive into Connect, Create & Automate. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (UG 3rd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Automation at Work
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Automation at Work') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Automation at Work', 'Lesson 1: AI Automation at Work', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Automation at Work</h2><p>Welcome to AI Automation at Work for UG 3rd YEAR. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Innovation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Innovation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Innovation', 'Lesson 2: AI for Innovation', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Innovation</h2><p>Deep-dive into AI for Innovation. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (UG 3rd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Become Industry Ready
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Become Industry Ready') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Become Industry Ready', 'Lesson 1: Become Industry Ready', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Become Industry Ready</h2><p>Welcome to Become Industry Ready for UG 3rd YEAR. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Opportunity Map
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Opportunity Map') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Opportunity Map', 'Lesson 2: AI Opportunity Map', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Opportunity Map</h2><p>Deep-dive into AI Opportunity Map. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (UG 3rd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Chatbot Builder
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Chatbot Builder') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Chatbot Builder', 'Lesson 1: Chatbot Builder', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Chatbot Builder</h2><p>Welcome to Chatbot Builder for UG 3rd YEAR. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Automation Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Automation Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Automation Studio', 'Lesson 2: AI Automation Studio', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Automation Studio</h2><p>Deep-dive into AI Automation Studio. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (UG 3rd YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Truth in the AI Era
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Truth in the AI Era') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Truth in the AI Era', 'Lesson 1: Truth in the AI Era', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Truth in the AI Era</h2><p>Welcome to Truth in the AI Era for UG 3rd YEAR. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Safe AI Systems
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Safe AI Systems') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Safe AI Systems', 'Lesson 2: Safe AI Systems', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Safe AI Systems</h2><p>Deep-dive into Safe AI Systems. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: UG FINAL YEAR
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'UG FINAL YEAR';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'UG FINAL YEAR',
      'UG-FINAL',
      'AI Curriculum for UG FINAL YEAR',
      14,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for UG FINAL YEAR',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (UG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: The Age of AI Agents
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'The Age of AI Agents') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'The Age of AI Agents', 'Lesson 1: The Age of AI Agents', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>The Age of AI Agents</h2><p>Welcome to The Age of AI Agents for UG FINAL YEAR. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Intelligence at Scale
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Intelligence at Scale') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Intelligence at Scale', 'Lesson 2: Intelligence at Scale', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Intelligence at Scale</h2><p>Deep-dive into Intelligence at Scale. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (UG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Build Smart Applications
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Build Smart Applications') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Build Smart Applications', 'Lesson 1: Build Smart Applications', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Build Smart Applications</h2><p>Welcome to Build Smart Applications for UG FINAL YEAR. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Design AI Workflows
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Design AI Workflows') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Design AI Workflows', 'Lesson 2: Design AI Workflows', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Design AI Workflows</h2><p>Deep-dive into Design AI Workflows. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (UG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Enterprise
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Enterprise') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Enterprise', 'Lesson 1: AI for Enterprise', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Enterprise</h2><p>Welcome to AI for Enterprise for UG FINAL YEAR. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Start-ups
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Start-ups') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Start-ups', 'Lesson 2: AI for Start-ups', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Start-ups</h2><p>Deep-dive into AI for Start-ups. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (UG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: From Campus to AI Career
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'From Campus to AI Career') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'From Campus to AI Career', 'Lesson 1: From Campus to AI Career', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>From Campus to AI Career</h2><p>Welcome to From Campus to AI Career for UG FINAL YEAR. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Idea to AI Venture
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Idea to AI Venture') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Idea to AI Venture', 'Lesson 2: Idea to AI Venture', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Idea to AI Venture</h2><p>Deep-dive into Idea to AI Venture. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (UG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Prototype Lab
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Prototype Lab') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Prototype Lab', 'Lesson 1: AI Prototype Lab', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Prototype Lab</h2><p>Welcome to AI Prototype Lab for UG FINAL YEAR. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Agent Builder Studio
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Agent Builder Studio') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Agent Builder Studio', 'Lesson 2: Agent Builder Studio', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Agent Builder Studio</h2><p>Deep-dive into Agent Builder Studio. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (UG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Accountable AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Accountable AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Accountable AI', 'Lesson 1: Accountable AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Accountable AI</h2><p>Welcome to Accountable AI for UG FINAL YEAR. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Governance Essentials
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Governance Essentials') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Governance Essentials', 'Lesson 2: AI Governance Essentials', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Governance Essentials</h2><p>Deep-dive into AI Governance Essentials. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: PG 1st YEAR
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'PG 1st YEAR';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'PG 1st YEAR',
      'PG-1',
      'AI Curriculum for PG 1st YEAR',
      15,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for PG 1st YEAR',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (PG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Modern Intelligence Explained
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Modern Intelligence Explained') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Modern Intelligence Explained', 'Lesson 1: Modern Intelligence Explained', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Modern Intelligence Explained</h2><p>Welcome to Modern Intelligence Explained for PG 1st YEAR. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI Beyond Automation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Beyond Automation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Beyond Automation', 'Lesson 2: AI Beyond Automation', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Beyond Automation</h2><p>Deep-dive into AI Beyond Automation. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (PG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Develop with Intelligence
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Develop with Intelligence') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Develop with Intelligence', 'Lesson 1: Develop with Intelligence', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Develop with Intelligence</h2><p>Welcome to Develop with Intelligence for PG 1st YEAR. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Design Smart Workflows
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Design Smart Workflows') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Design Smart Workflows', 'Lesson 2: Design Smart Workflows', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Design Smart Workflows</h2><p>Deep-dive into Design Smart Workflows. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (PG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Advanced Research
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Advanced Research') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Advanced Research', 'Lesson 1: AI for Advanced Research', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Advanced Research</h2><p>Welcome to AI for Advanced Research for PG 1st YEAR. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Professional Innovation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Professional Innovation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Professional Innovation', 'Lesson 2: AI for Professional Innovation', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Professional Innovation</h2><p>Deep-dive into AI for Professional Innovation. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (PG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Specialist Roadmap
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Specialist Roadmap') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Specialist Roadmap', 'Lesson 1: AI Specialist Roadmap', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Specialist Roadmap</h2><p>Welcome to AI Specialist Roadmap for PG 1st YEAR. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Research to Profession
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Research to Profession') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Research to Profession', 'Lesson 2: Research to Profession', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Research to Profession</h2><p>Deep-dive into Research to Profession. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (PG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI Research Workbench
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI Research Workbench') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI Research Workbench', 'Lesson 1: AI Research Workbench', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI Research Workbench</h2><p>Welcome to AI Research Workbench for PG 1st YEAR. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Intelligent Prototype Lab
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Intelligent Prototype Lab') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Intelligent Prototype Lab', 'Lesson 2: Intelligent Prototype Lab', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Intelligent Prototype Lab</h2><p>Deep-dive into Intelligent Prototype Lab. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (PG 1st YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Transparent AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Transparent AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Transparent AI', 'Lesson 1: Transparent AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Transparent AI</h2><p>Welcome to Transparent AI for PG 1st YEAR. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Trustworthy AI Systems
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Trustworthy AI Systems') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Trustworthy AI Systems', 'Lesson 2: Trustworthy AI Systems', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Trustworthy AI Systems</h2><p>Deep-dive into Trustworthy AI Systems. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- ─────────────────────────────────────────────────────────────
  -- Class: PG FINAL YEAR
  -- ─────────────────────────────────────────────────────────────
  SELECT id INTO v_class_id FROM classes WHERE organization_id = v_org_id AND category_id = v_cat_id AND name = 'PG FINAL YEAR';
  IF v_class_id IS NULL THEN
    INSERT INTO classes (organization_id, category_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_cat_id,
      'PG FINAL YEAR',
      'PG-FINAL',
      'AI Curriculum for PG FINAL YEAR',
      16,
      'published'
    )
    RETURNING id INTO v_class_id;
  END IF;

  -- Subject: AI SUBJECT
  SELECT id INTO v_subject_id FROM subjects WHERE organization_id = v_org_id AND class_id = v_class_id AND name = 'AI SUBJECT';
  IF v_subject_id IS NULL THEN
    INSERT INTO subjects (organization_id, class_id, name, code, description, display_order, status)
    VALUES (
      v_org_id,
      v_class_id,
      'AI SUBJECT',
      'AI',
      'Artificial Intelligence Subject for PG FINAL YEAR',
      1,
      'published'
    )
    RETURNING id INTO v_subject_id;
  END IF;

  -- Chapter 1: AI DISCOVER (PG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 1 — AI DISCOVER';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 1 — AI DISCOVER',
      '1',
      'AI Basics — See • Understand • Explore AI Basics',
      'Month 1 / Chapter 1 Focus: See • Understand • Explore AI Basics. Area: AI Basics.',
      1,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 1 — AI DISCOVER', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Frontiers of AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Frontiers of AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Frontiers of AI', 'Lesson 1: Frontiers of AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Frontiers of AI</h2><p>Welcome to Frontiers of AI for PG FINAL YEAR. In this topic, we will explore key concepts of AI Basics.</p>', 20);
  END IF;

  -- 3. Lesson 2: Human + Machine Intelligence
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Human + Machine Intelligence') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Human + Machine Intelligence', 'Lesson 2: Human + Machine Intelligence', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Human + Machine Intelligence</h2><p>Deep-dive into Human + Machine Intelligence. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 1 — AI DISCOVER', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 1 — AI DISCOVER', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 1 — AI DISCOVER', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 1 — AI DISCOVER', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 1 — AI DISCOVER', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 1 — AI DISCOVER. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 2: AI CONNECT (PG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 2 — AI CONNECT';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 2 — AI CONNECT',
      '2',
      'Communicate with AI — Think • Instruct • Code',
      'Month 2 / Chapter 2 Focus: Think • Instruct • Code. Area: Communicate with AI.',
      2,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 2 — AI CONNECT', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Engineer Intelligent Solutions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Engineer Intelligent Solutions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Engineer Intelligent Solutions', 'Lesson 1: Engineer Intelligent Solutions', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Engineer Intelligent Solutions</h2><p>Welcome to Engineer Intelligent Solutions for PG FINAL YEAR. In this topic, we will explore key concepts of Communicate with AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI System Thinking
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI System Thinking') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI System Thinking', 'Lesson 2: AI System Thinking', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI System Thinking</h2><p>Deep-dive into AI System Thinking. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 2 — AI CONNECT', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 2 — AI CONNECT', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 2 — AI CONNECT', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 2 — AI CONNECT', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 2 — AI CONNECT', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 2 — AI CONNECT. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 3: AI SOLVE (PG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 3 — AI SOLVE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 3 — AI SOLVE',
      '3',
      'AI Applications — Problems • Solutions • Impact',
      'Month 3 / Chapter 3 Focus: Problems • Solutions • Impact. Area: AI Applications.',
      3,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 3 — AI SOLVE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI for Transformation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Transformation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Transformation', 'Lesson 1: AI for Transformation', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Transformation</h2><p>Welcome to AI for Transformation for PG FINAL YEAR. In this topic, we will explore key concepts of AI Applications.</p>', 20);
  END IF;

  -- 3. Lesson 2: AI for Breakthrough Innovation
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI for Breakthrough Innovation') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI for Breakthrough Innovation', 'Lesson 2: AI for Breakthrough Innovation', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI for Breakthrough Innovation</h2><p>Deep-dive into AI for Breakthrough Innovation. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 3 — AI SOLVE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 3 — AI SOLVE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 3 — AI SOLVE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 3 — AI SOLVE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 3 — AI SOLVE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 3 — AI SOLVE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 4: AI RISE (PG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 4 — AI RISE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 4 — AI RISE',
      '4',
      'AI & Career — Skills • Careers • Future',
      'Month 4 / Chapter 4 Focus: Skills • Careers • Future. Area: AI & Career.',
      4,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 4 — AI RISE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Lead with AI
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Lead with AI') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Lead with AI', 'Lesson 1: Lead with AI', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Lead with AI</h2><p>Welcome to Lead with AI for PG FINAL YEAR. In this topic, we will explore key concepts of AI & Career.</p>', 20);
  END IF;

  -- 3. Lesson 2: Research → Innovation → Enterprise
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Research → Innovation → Enterprise') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Research → Innovation → Enterprise', 'Lesson 2: Research → Innovation → Enterprise', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Research → Innovation → Enterprise</h2><p>Deep-dive into Research → Innovation → Enterprise. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 4 — AI RISE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 4 — AI RISE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 4 — AI RISE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 4 — AI RISE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 4 — AI RISE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 4 — AI RISE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 5: AI CREATE (PG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 5 — AI CREATE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 5 — AI CREATE',
      '5',
      'AI Tools — Try • Build • Innovate',
      'Month 5 / Chapter 5 Focus: Try • Build • Innovate. Area: AI Tools.',
      5,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 5 — AI CREATE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: Future AI Lab
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Future AI Lab') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Future AI Lab', 'Lesson 1: Future AI Lab', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Future AI Lab</h2><p>Welcome to Future AI Lab for PG FINAL YEAR. In this topic, we will explore key concepts of AI Tools.</p>', 20);
  END IF;

  -- 3. Lesson 2: Innovation to Prototype
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Innovation to Prototype') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Innovation to Prototype', 'Lesson 2: Innovation to Prototype', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Innovation to Prototype</h2><p>Deep-dive into Innovation to Prototype. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 5 — AI CREATE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 5 — AI CREATE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 5 — AI CREATE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 5 — AI CREATE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 5 — AI CREATE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 5 — AI CREATE. Passing score is 60%.', 30, 60, 3);
  END IF;

  -- Chapter 6: AI CARE (PG FINAL YEAR)
  SELECT id INTO v_chapter_id FROM chapters WHERE organization_id = v_org_id AND subject_id = v_subject_id AND title = 'Chapter 6 — AI CARE';
  IF v_chapter_id IS NULL THEN
    INSERT INTO chapters (organization_id, subject_id, title, chapter_number, short_description, description, display_order, status)
    VALUES (
      v_org_id,
      v_subject_id,
      'Chapter 6 — AI CARE',
      '6',
      'Responsible AI — Verify • Protect • Respect',
      'Month 6 / Chapter 6 Focus: Verify • Protect • Respect. Area: Responsible AI.',
      6,
      'published'
    )
    RETURNING id INTO v_chapter_id;
  END IF;

  -- 1. Default Video
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'video' AND title = 'Introduction & Overview Video') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'video', 'Introduction & Overview Video', 'Introductory overview for Chapter 6 — AI CARE', 1, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO videos (organization_id, chapter_content_id, video_url, description)
    VALUES (v_org_id, v_content_id, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Introductory concept video');
  END IF;

  -- 2. Lesson 1: AI & Society
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'AI & Society') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'AI & Society', 'Lesson 1: AI & Society', 2, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>AI & Society</h2><p>Welcome to AI & Society for PG FINAL YEAR. In this topic, we will explore key concepts of Responsible AI.</p>', 20);
  END IF;

  -- 3. Lesson 2: Building AI for Humanity
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'lesson' AND title = 'Building AI for Humanity') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'lesson', 'Building AI for Humanity', 'Lesson 2: Building AI for Humanity', 3, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO lessons (chapter_content_id, content, estimated_duration)
    VALUES (v_content_id, '<h2>Building AI for Humanity</h2><p>Deep-dive into Building AI for Humanity. Build hands-on understanding and practical insights.</p>', 25);
  END IF;

  -- 4. Workbook
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'worksheet' AND title = 'Workbook') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'worksheet', 'Workbook', 'Interactive activity workbook for Chapter 6 — AI CARE', 4, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO worksheets (chapter_content_id, description, instructions, worksheet_type, maximum_marks)
    VALUES (v_content_id, 'Comprehensive student workbook', 'Complete all questions and submit your working.', 'interactive', 50);
  END IF;

  -- 5. Questions
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'resource' AND title = 'Questions') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'resource', 'Questions', 'Practice question bank and discussion prompts for Chapter 6 — AI CARE', 5, false, 'published');
  END IF;

  -- 6. Practical
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'activity' AND title = 'Practical') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'activity', 'Practical', 'Hands-on practical exercise for Chapter 6 — AI CARE', 6, false, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO activities (chapter_content_id, activity_type, instructions, maximum_marks)
    VALUES (v_content_id, 'short_answer', 'Follow the practical steps outlined in the guide and document your findings.', 25);
  END IF;

  -- 7. Assignment
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'assignment' AND title = 'Assignment') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'assignment', 'Assignment', 'Graded assignment for Chapter 6 — AI CARE', 7, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO assignments (chapter_content_id, instructions, maximum_marks)
    VALUES (v_content_id, 'Submit your completed assignment text or file here before the due date.', 100);
  END IF;

  -- 8. Quiz
  IF NOT EXISTS (SELECT 1 FROM chapter_content WHERE chapter_id = v_chapter_id AND content_type = 'quiz' AND title = 'Quiz') THEN
    INSERT INTO chapter_content (organization_id, chapter_id, content_type, title, description, display_order, is_required, status)
    VALUES (v_org_id, v_chapter_id, 'quiz', 'Quiz', 'Comprehensive assessment quiz for Chapter 6 — AI CARE', 8, true, 'published')
    RETURNING id INTO v_content_id;

    INSERT INTO quizzes (chapter_content_id, instructions, time_limit, passing_percentage, maximum_attempts)
    VALUES (v_content_id, 'Test your knowledge on Chapter 6 — AI CARE. Passing score is 60%.', 30, 60, 3);
  END IF;

END $$;
