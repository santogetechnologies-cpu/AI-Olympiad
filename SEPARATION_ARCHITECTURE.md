# SEPARATION OF CONCERNS - NO CONFLICT ARCHITECTURE

## Problem
4 people generating content + developers working on code = potential conflicts

## Solution
Complete separation by folder and file type

## CONTENT TEAM (4 People)
Work Location: public/content/
File Type: .json only
Branches: content/person1, content/person2, content/person3, content/person4

Person 1 -> public/content/junior/ (45 JSON files)
Person 2 -> public/content/middle/ (45 JSON files)
Person 3 -> public/content/senior/ (45 JSON files)
Person 4 -> public/content/supersenior/ (45 JSON files)

Rules:
- CREATE lesson JSON files only
- NEVER touch .ts/.tsx/.js files
- NEVER touch src/ folder
- NEVER modify manifest files

## DEV TEAM (1-2 People)
Work Location: src/
File Type: .ts/.tsx/.js only
Branches: feature/components, feature/navigation

Developers -> src/ (All code files)

Rules:
- EDIT code in src/ only
- NEVER create/edit JSON content files
- NEVER modify manifest files
- Read JSON structure, build display components

## ZERO CONFLICTS BECAUSE
1. Different folders (junior/ vs middle/ vs senior/ vs supersenior/ vs src/)
2. Different file types (.json vs .ts/.tsx)
3. Different git branches
4. No shared files to edit

## WORKFLOW
Content: Generate JSON -> Save in your folder -> Commit
Dev: Build components -> Test with JSON -> Commit
Integration: Automatic via hooks (no manual work needed)

## GIT STRATEGY
git checkout -b content/person1-junior
git add public/content/junior/*.json
git commit -m "Add lessons"

Later merge all branches - NO CONFLICTS because different folders!

See QUICK_START.md for detailed workflow
