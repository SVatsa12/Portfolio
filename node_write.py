import sys, base64
content = base64.b64decode(sys.stdin.read().strip()).decode('utf-8')
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print(f'Written {len(content)} chars')
# Verify backticks present
bt = content.count(chr(0x60))
print(f'Backtick count: {bt}')
# Verify style tag
si = content.find('<style>{')
ei = content.find('</style>')
print(f'Style open [si:si+10]: {content[si:si+10]!r}')
print(f'Style close at [ei-5:ei+8]: {content[ei-5:ei+8]!r}')
