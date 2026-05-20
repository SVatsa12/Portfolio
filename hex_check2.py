import sys
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = bytearray(f.read())
print('File total bytes:', len(content))

# Print bytes 2300-2500 as hex
sys.stdout.write('Bytes 2300-2500 (hex):')
for b in content[2300:2500]:
    sys.stdout.write(f' {b:02x}')
print()
