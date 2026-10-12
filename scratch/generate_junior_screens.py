import json, sys

# Helper to load topic profiles
def load_profiles_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    return text

print("Writing screen generator...")
