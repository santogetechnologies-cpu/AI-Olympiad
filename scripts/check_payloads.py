import json

with open('src/components/gaio/config/gaioFullBookScreens.json', 'r', encoding='utf-8') as f:
    screens = json.load(f)

# Show the full payload for M1 lets_learn_intro
for s in screens:
    if s['interactionType'] == 'lets_learn_intro' and s['monthNumber'] == 1:
        import pprint
        print('=== M1 lets_learn_intro payload ===')
        pprint.pprint(s['payload'])
        print()
        break

# Show quiz_part1 payload
for s in screens:
    if s['interactionType'] == 'quiz_part1' and s['monthNumber'] == 1:
        print('=== M1 quiz_part1 payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break

# Show word_search payload
for s in screens:
    if s['interactionType'] == 'word_search' and s['monthNumber'] == 1:
        print('=== M1 word_search payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break

# Show true_false payload
for s in screens:
    if s['interactionType'] == 'true_false' and s['monthNumber'] == 1:
        print('=== M1 true_false payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break

# Show worksheet_matching payload
for s in screens:
    if s['interactionType'] == 'worksheet_matching' and s['monthNumber'] == 1:
        print('=== M1 worksheet_matching payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break

# Show worksheet_blanks payload
for s in screens:
    if s['interactionType'] == 'worksheet_blanks' and s['monthNumber'] == 1:
        print('=== M1 worksheet_blanks payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break

# Show puzzle_odd_one payload
for s in screens:
    if s['interactionType'] == 'puzzle_odd_one' and s['monthNumber'] == 1:
        print('=== M1 puzzle_odd_one payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break

# Show puzzle_count payload
for s in screens:
    if s['interactionType'] == 'puzzle_count' and s['monthNumber'] == 1:
        print('=== M1 puzzle_count payload ===')
        import pprint
        pprint.pprint(s['payload'])
        print()
        break
