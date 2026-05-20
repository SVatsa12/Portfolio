with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    lines = f.read().split(b'\n')
print('Total lines:', len(lines))
for i in [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 95, 96, 97, 98]:
    ln = lines[i].decode('utf-8', errors='replace') if i < len(lines) else 'MISSING'
    print(f'Line {i+1}: {ln}')
