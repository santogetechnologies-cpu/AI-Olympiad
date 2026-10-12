import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/components/gaio/config/gaioFullBookScreens.json', encoding='utf-8') as f:
    screens = json.load(f)

print("Total screens in class 3:", len(screens))
# Let's inspect Month 1 screens (first 10)
m1_screens = [s for s in screens if s.get('monthNumber') == 1]
print(f"Total month 1 screens: {len(m1_screens)}")
for i, s in enumerate(m1_screens[:10]):
    print(f"{i+1}. id={s.get('id')} | interactionType={s.get('interactionType')} | title={s.get('title')} | topicNumber={s.get('topicNumber')}")
    print("   payload keys:", list(s.get('payload', {}).keys()))
