import sys
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = bytearray(f.read())
print('File total bytes:', len(content))

# Go back to position 2300 and show 200 bytes
sys.stdout.write('Bytes 2300-2500 (hex): ')
sys.stdout.flush()
print(Buffer(content[2300:2500]).toString('hex'))
