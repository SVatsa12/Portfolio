import sys
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = bytearray(f.read())

print('All backtick positions:', [i for i, b in enumerate(content) if b == 0x60])
print()
print('Total backticks:', sum(1 for b in content if b == 0x60))

# Find <style> and </style> by scanning for their ASCII patterns
st_open = content.find(b'<style>')
st_close = content.find(b'</style>')
print('<style> at:', st_open, 'hex:', content[st_open:st_open+8].hex())
print('</style> at:', st_close, 'hex:', content[st_close:st_close+10].hex())
print()

# Position before </style>
for pos in range(st_close - 30, st_close + 8):
    b = content[pos]
    print(f'  pos {pos}: 0x{b:02x} = {repr(chr(b) if 32 <= b < 127 else "?")}')
