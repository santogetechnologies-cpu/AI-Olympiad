import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass4.ts', encoding='utf-8') as f:
    text = f.read()

keys = [
    'where is ai hiding?', 'meet the smart machines', 'say it clearly!', 'mission: instructions',
    'ai in my mobile', 'ai on the move', 'future job hunt', 'my technology talent',
    'create a story', 'design with ai', 'secret or share?', 'ai: right or wrong?'
]

for k in keys:
    pos = text.find(f"'{k}':")
    next_pos = text.find("': {", pos + len(k) + 5)
    chunk = text[pos:next_pos] if next_pos != -1 else text[pos:]
    has_game = 'gameMechanic:' in chunk
    has_olympiad = 'olympiadQuestions:' in chunk
    has_safety = 'reflectionSafety:' in chunk
    print(f"Lesson [{k}]: len={len(chunk)}, game={has_game}, olympiad={has_olympiad}, safety={has_safety}")
