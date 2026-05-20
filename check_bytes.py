with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = f.read()

# Show bytes around important positions
print('Checking positions around </style>:')
st_pos = content.find(b'</style>')
print('  </style> at:', st_pos)
ctx = content[st_pos-15:st_pos+8]
print('  Context hex:', ctx.hex())

# Find } right before </style>
last_brace = ctx.rfind(b'}')
print('  Relative position of } in context:', last_brace)
print('  Absolute position of }: ', st_pos - 15 + last_brace)

# Show what comes after }
abs_brace = st_pos - 15 + last_brace
if abs_brace + 1 < len(content):
    b = content[abs_brace + 1]
    ch = chr(b) if 32 <= b < 127 else '?'
    print('  Byte after }: 0x{:02x} = {}'.format(b, ch))

# Also check <style> opening
print()
style_pos = content.find(b'<style>')
print('  <style> at:', style_pos)
ctx2 = content[style_pos:style_pos+15]
print('  Opening context hex:', ctx2.hex())
print('  Opening context decoded:', ctx2.decode())
