with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = bytearray(f.read())

st_idx = content.find(b'</style>')
print('</style> at', st_idx)

# cout = positions 2355..2375
for pos in range(2355, 2376):
    b = content[pos]
    ch = chr(b) if 32 <= b < 127 else '?'
    print(f'  pos {pos}: 0x{b:02x} = {repr(ch)}')
