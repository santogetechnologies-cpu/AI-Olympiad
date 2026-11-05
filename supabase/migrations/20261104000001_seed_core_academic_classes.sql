-- ============================================================
-- SEED CORE ACADEMIC CLASSES & SUBJECTS (CLASS 3 TO PG FINAL YEAR)
-- Ensures real database UUIDs exist for all curriculum levels
-- Prevents non-UUID slugs (like cat-cls-class5) from missing UUID mappings
-- ============================================================

DO $$
DECLARE
  v_org_id UUID;
  v_cat_id UUID := 'c0000000-0000-0000-0000-000000000001';
BEGIN
  -- 1. Ensure Default Organization exists
  SELECT id INTO v_org_id FROM public.organizations WHERE slug = 'nanjil-academy' LIMIT 1;
  IF v_org_id IS NULL THEN
    INSERT INTO public.organizations (id, name, slug, description, status)
    VALUES (
      'a0000000-0000-0000-0000-000000000001',
      'Nanjil Academy',
      'nanjil-academy',
      'A premier learning institution offering comprehensive education across all levels.',
      'active'
    )
    ON CONFLICT (slug) DO UPDATE SET updated_at = NOW()
    RETURNING id INTO v_org_id;
  END IF;

  -- 2. Ensure Category exists
  INSERT INTO public.categories (id, organization_id, name, slug, description, display_order, status)
  VALUES (
    v_cat_id,
    v_org_id,
    'AI Olympiad',
    'ai-olympiad',
    'Authentic AI & Computing Curriculum from Class 3 to PG Final Year',
    1,
    'published'
  )
  ON CONFLICT (id) DO NOTHING;

  -- 3. Seed Classes with known UUIDs
  INSERT INTO public.classes (id, organization_id, category_id, name, code, description, display_order, status)
  VALUES
    ('b0000003-0000-0000-0000-000000000003', v_org_id, v_cat_id, 'Class 3', 'CLS-03', 'Junior AI & Playful Logic', 1, 'published'),
    ('b0000004-0000-0000-0000-000000000004', v_org_id, v_cat_id, 'Class 4', 'CLS-04', 'Elementary AI & Algorithmic Patterns', 2, 'published'),
    ('b0000005-0000-0000-0000-000000000005', v_org_id, v_cat_id, 'Class 5', 'CLS-05', 'Foundations of Smart Computing', 3, 'published'),
    ('b0000006-0000-0000-0000-000000000006', v_org_id, v_cat_id, 'Class 6', 'CLS-06', 'Middle School AI & Computational Thinking', 4, 'published'),
    ('b0000007-0000-0000-0000-000000000007', v_org_id, v_cat_id, 'Class 7', 'CLS-07', 'Data Logic & Python Foundations', 5, 'published'),
    ('b0000008-0000-0000-0000-000000000008', v_org_id, v_cat_id, 'Class 8', 'CLS-08', 'Applied AI Thinking & Python Coding', 6, 'published'),
    ('b0000009-0000-0000-0000-000000000009', v_org_id, v_cat_id, 'Class 9', 'CLS-09', 'AI Foundations & Machine Learning Concepts', 7, 'published'),
    ('b0000010-0000-0000-0000-000000000010', v_org_id, v_cat_id, 'Class 10', 'CLS-10', 'Machine Learning & Neural Network Foundations', 8, 'published'),
    ('b0000011-0000-0000-0000-000000000011', v_org_id, v_cat_id, 'Class 11', 'CLS-11', 'Modern AI Systems & Mathematical Foundations', 9, 'published'),
    ('b0000012-0000-0000-0000-000000000012', v_org_id, v_cat_id, 'Class 12', 'CLS-12', 'Deep Learning & Applied AI Engineering', 10, 'published'),
    ('b0000021-0000-0000-0000-000000000021', v_org_id, v_cat_id, 'UG 1st Year', 'UG-01', 'Computational AI, Data Structures & Applied Algorithms', 11, 'published'),
    ('b0000022-0000-0000-0000-000000000022', v_org_id, v_cat_id, 'UG 2nd Year', 'UG-02', 'Classical Machine Learning & Applied Statistical Models', 12, 'published'),
    ('b0000023-0000-0000-0000-000000000023', v_org_id, v_cat_id, 'UG 3rd Year', 'UG-03', 'Deep Learning, NLP & Enterprise LLM Engineering', 13, 'published'),
    ('b0000024-0000-0000-0000-000000000024', v_org_id, v_cat_id, 'UG Final Year', 'UG-04', 'Autonomous AI Agents & System Architecture', 14, 'published'),
    ('b0000031-0000-0000-0000-000000000031', v_org_id, v_cat_id, 'PG 1st Year', 'PG-01', 'Advanced Machine Learning Theory & Optimization', 15, 'published'),
    ('b0000032-0000-0000-0000-000000000032', v_org_id, v_cat_id, 'PG Final Year', 'PG-02', 'Frontiers of AI & Research Dissertation', 16, 'published')
  ON CONFLICT (id) DO NOTHING;

  -- 4. Seed Standard Subjects referencing real class UUIDs
  INSERT INTO public.subjects (id, organization_id, class_id, name, code, description, display_order, status)
  VALUES
    ('e0000003-0000-0000-0000-000000000003', v_org_id, 'b0000003-0000-0000-0000-000000000003', 'Junior AI & Playful Logic', 'JAI-03', 'Primary AI Curriculum for Class 3', 1, 'published'),
    ('e0000004-0000-0000-0000-000000000004', v_org_id, 'b0000004-0000-0000-0000-000000000004', 'Elementary AI & Algorithmic Patterns', 'EAI-04', 'Primary AI Curriculum for Class 4', 1, 'published'),
    ('e0000005-0000-0000-0000-000000000005', v_org_id, 'b0000005-0000-0000-0000-000000000005', 'Foundations of Smart Computing', 'FSC-05', 'Primary AI Curriculum for Class 5', 1, 'published'),
    ('e0000006-0000-0000-0000-000000000006', v_org_id, 'b0000006-0000-0000-0000-000000000006', 'Middle School AI & Computational Thinking', 'MAI-06', 'Middle School AI Curriculum for Class 6', 1, 'published'),
    ('e0000007-0000-0000-0000-000000000007', v_org_id, 'b0000007-0000-0000-0000-000000000007', 'Data Logic & Python Foundations', 'DLP-07', 'Middle School AI Curriculum for Class 7', 1, 'published'),
    ('e0000008-0000-0000-0000-000000000008', v_org_id, 'b0000008-0000-0000-0000-000000000008', 'Applied AI Thinking & Python Coding', 'AAI-08', 'Middle School AI Curriculum for Class 8', 1, 'published'),
    ('e0000009-0000-0000-0000-000000000009', v_org_id, 'b0000009-0000-0000-0000-000000000009', 'AI Foundations & Machine Learning Concepts', 'AIM-09', 'Secondary AI Curriculum for Class 9', 1, 'published'),
    ('e0000010-0000-0000-0000-000000000010', v_org_id, 'b0000010-0000-0000-0000-000000000010', 'Machine Learning & Neural Network Foundations', 'MLN-10', 'Secondary AI Curriculum for Class 10', 1, 'published'),
    ('e0000011-0000-0000-0000-000000000011', v_org_id, 'b0000011-0000-0000-0000-000000000011', 'Modern AI Systems & Mathematical Foundations', 'MMN-11', 'Senior Secondary AI Curriculum for Class 11', 1, 'published'),
    ('e0000012-0000-0000-0000-000000000012', v_org_id, 'b0000012-0000-0000-0000-000000000012', 'Deep Learning & Applied AI Engineering', 'DLT-12', 'Senior Secondary AI Curriculum for Class 12', 1, 'published'),
    ('e0000021-0000-0000-0000-000000000021', v_org_id, 'b0000021-0000-0000-0000-000000000021', 'Computational AI, Data Structures & Applied Algorithms', 'CAI-01', 'Undergraduate Curriculum for UG 1st Year', 1, 'published'),
    ('e0000022-0000-0000-0000-000000000022', v_org_id, 'b0000022-0000-0000-0000-000000000022', 'Classical Machine Learning & Applied Statistical Models', 'CML-02', 'Undergraduate Curriculum for UG 2nd Year', 1, 'published'),
    ('e0000023-0000-0000-0000-000000000023', v_org_id, 'b0000023-0000-0000-0000-000000000023', 'Deep Learning, NLP & Enterprise LLM Engineering', 'DLE-03', 'Undergraduate Curriculum for UG 3rd Year', 1, 'published'),
    ('e0000024-0000-0000-0000-000000000024', v_org_id, 'b0000024-0000-0000-0000-000000000024', 'Autonomous AI Agents & System Architecture', 'AAA-04', 'Undergraduate Curriculum for UG Final Year', 1, 'published'),
    ('e0000031-0000-0000-0000-000000000031', v_org_id, 'b0000031-0000-0000-0000-000000000031', 'Advanced Machine Learning Theory & Optimization', 'AML-01', 'Postgraduate Curriculum for PG 1st Year', 1, 'published'),
    ('e0000032-0000-0000-0000-000000000032', v_org_id, 'b0000032-0000-0000-0000-000000000032', 'Frontiers of AI & Research Dissertation', 'FAI-02', 'Postgraduate Curriculum for PG Final Year', 1, 'published')
  ON CONFLICT (id) DO NOTHING;

END $$;

