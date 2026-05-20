import sys
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = bytearray(f.read())

# Show the exact 30 bytes right after position 2360
for pos in range(2360, 2400):
    b = content[pos]
    ch = chr(b) if 32 <= b < 127 else '?'
    sys.stdout.write(f'pos {pos}: 0x{b:02x} = {repr(ch)}\n')

print()
print('Total file length:', len(content))
print()

# Find the style boundaries
st_open = content.find(b'<style>')
print(f'<style> at {st_open}')
print('Opening context:', content[st_open:st_open+15].hex())
print()

st_close = content.find(b'</style>')
print(f'</style> at {st_close}')
print('Closing context (hex):', content[st_close-15:st_close+8].hex())
