import sys, json
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/topic_content_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

topics = data['topics']
for t_num in sorted(topics.keys()):
    t = topics[t_num]
    title = t['topicTitle']
    quiz_qs = t.get('quizQuestions', [])
    tf = t.get('trueFalse', [])
    magic = t.get('magicWords', [])
    concepts = t.get('concepts', [])
    steps = t.get('activitySteps', [])
    panels = t.get('storyPanels', [])
    look = t.get('lookData', {})
    ws_words = data['wordSearches'][str(t['monthNumber'])]['words']

    print(f"\n=== Topic {t_num}: {title} (Month {t['monthNumber']}) ===")
    print(f"  Concepts: {len(concepts)} items")
    print(f"  Magic words: {len(magic)}: {[m['word'] for m in magic]}")
    print(f"  Story panels: {len(panels)}")
    print(f"  Quiz questions: {len(quiz_qs)}")
    for q in quiz_qs:
        print(f"    {q['q'][:50]} | correct={q['correct']}")
    print(f"  TF statements: {len(tf)}")
    for s in tf:
        print(f"    {str(s['statement'])[:50]} | ans={s['answer']}")
    print(f"  Activity steps: {len(steps)}")
    print(f"  WS words for month: {ws_words}")
