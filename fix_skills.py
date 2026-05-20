import re

with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and fix key props
# The current content has: key={\skill-1-`}
# We need to replace it with: key={`skill-1-${index}`}

# Replace one backslash followed by skill with backtick-skill
def fix_key(match):
    prefix = match.group(1)
    num = match.group(2)
    return prefix + num + '${index}`}'

content = re.sub(r'key=\{\\(\d+)-', fix_key, content)
content = content.replace('\\skill-1-`}', '`skill-1-${index}`}')
content = content.replace('\\skill-2-`}', '`skill-2-${index}`}')

with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'r') as f:
    new_content = f.read()
    
matches = list(re.finditer(r'key=\{\\?`?\$\{index\}\}', new_content))
if matches:
    for m in matches:
        start = max(0, m.start()-5)
        end = min(len(new_content), m.end()+5)
        print('Found fixed key:', repr(new_content[start:end]))
else:
    print('No fixed keys found, checking current state...')
    idx = new_content.find('skill-1')
    if idx >= 0:
        print('Current key=1 section:', repr(new_content[idx:idx+30]))
