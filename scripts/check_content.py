import json

with open('src/components/gaio/config/gaioFullBookScreens.json', 'r', encoding='utf-8') as f:
    screens = json.load(f)

print(f'Total screens: {len(screens)}')
print()

# Check content uniqueness for lets_learn_intro
print('=== LETS_LEARN_INTRO screens ===')
for s in screens:
    if s['interactionType'] == 'lets_learn_intro':
        payload = s.get('payload', {})
        print(f'  M{s["monthNumber"]} Screen {s["screenNumber"]}: title={s["title"][:50]}')
        print(f'    topicTitle={s.get("topicTitle", "")}')
        print(f'    payload keys: {list(payload.keys())}')
        body = payload.get('bodyText', payload.get('conceptText', payload.get('body', 'MISSING')))
        print(f'    body: {str(body)[:80]}')

print()
print('=== QUIZ_PART1 screens ===')
for s in screens:
    if s['interactionType'] == 'quiz_part1':
        payload = s.get('payload', {})
        questions = payload.get('questions', [])
        print(f'  M{s["monthNumber"]} Screen {s["screenNumber"]}: {s["title"][:50]} | {len(questions)} questions')
        if questions:
            print(f'    Q1: {questions[0].get("q", "")[:80]}')

print()
print('=== WORD_SEARCH screens ===')
for s in screens:
    if s['interactionType'] == 'word_search':
        payload = s.get('payload', {})
        words = payload.get('hiddenWords', payload.get('words', []))
        print(f'  M{s["monthNumber"]} Screen {s["screenNumber"]}: {s["title"][:50]}')
        print(f'    words: {words[:5]}')
