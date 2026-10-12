import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/services/curriculumTopicProfilesClass5.ts', encoding='utf-8') as f:
    text = f.read()

keys = [
    'the secret behind ai', 'learning machines', 'crack the logic!', 'command to creation',
    'ai in the hospital', 'ai in the classroom', 'my future with ai', 'skills of tomorrow',
    'ai study buddy', 'ai creative corner', 'can ai be wrong?', 'be a smart ai user'
]

for k in keys:
    pos = text.find(f"'{k}':")
    next_pos = text.find("': {", pos + len(k) + 5)
    chunk = text[pos:next_pos] if next_pos != -1 else text[pos:]
    has_game = 'gameMechanic:' in chunk
    has_olympiad = 'olympiadQuestions:' in chunk
    has_safety = 'reflectionSafety:' in chunk
    print(f"Lesson [{k}]: len={len(chunk)}, game={has_game}, olympiad={has_olympiad}, safety={has_safety}")
