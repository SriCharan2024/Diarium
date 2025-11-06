# Git Commit Guide for Diarium

## Current Status
You have modified files and new files that need to be committed.

## Steps to Commit Your Changes

### Step 1: Stage All Changes
Add all modified and new files to staging:
```bash
git add .
```
Or stage specific files:
```bash
git add client/
git add config/
git add app.js
git add *.md
```

### Step 2: Check What Will Be Committed
Review your staged changes:
```bash
git status
```

### Step 3: Commit with a Descriptive Message
```bash
git commit -m "Add enhanced UI with pastel theme, todo list, and cursive aesthetics"
```

Or a more detailed message:
```bash
git commit -m "Major UI improvements and new features

- Enhanced UI with pastel theme and elegant typography
- Added To-Do List page with full CRUD functionality
- Implemented new entry creation with modal forms
- Added cursive aesthetics to descriptions
- Improved calendar with month navigation
- Fixed navbar spacing and alignment
- Added MongoDB setup documentation
- All text properly capitalized with title case
- Responsive design improvements"
```

### Step 4: Push to Remote Repository (if applicable)
If you have a remote repository:
```bash
git push origin main
```
Or if your default branch is master:
```bash
git push origin master
```

## Quick Commit Script
Run all commands at once:
```bash
git add .
git commit -m "Add enhanced UI with pastel theme, todo list, and cursive aesthetics"
git push
```

## Alternative: Commit in Stages
If you want to commit features separately:

1. **Commit UI improvements:**
```bash
git add client/css/ client/views/ client/index.html
git commit -m "Add pastel theme and improve UI styling"
```

2. **Commit new features:**
```bash
git add client/controllers/todo.controller.js client/views/todo.view.html client/css/todo-style.css client/app.js
git commit -m "Add To-Do List page with full functionality"
```

3. **Commit documentation:**
```bash
git add *.md
git commit -m "Add MongoDB setup and quick start guides"
```

## View Your Changes
Before committing, you can review:
```bash
# See what changed
git diff

# See summary
git status
```

## Undo Last Commit (if needed)
If you make a mistake:
```bash
git reset --soft HEAD~1  # Undo commit but keep changes
git reset HEAD~1          # Undo commit and unstage changes
```


