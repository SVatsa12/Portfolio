with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'rb') as f:
    content = f.read()

# Find </style>
st = content.find(b'</style>')
print('</style> at', st)

# Print hex+zstring representation for 40 bytes BEFORE </style>
ctx = content[st-40:st+10]
print('40 bytes before + 10 after:')
for i in range(len(ctx)):
    b = ctx[i]
    ch = chr(b) if 32 <= b < 127 else '?'
    print(f'{st-40+i:6d} (0x{(st-40+i):04x}): 0x{b:02x} = {repr(ch)}')

# Also check if there's a backtick (0x60) in this segment
backtick_count = ctx.count(0x60)
print(f'Backtick count in ctx: {backtick_count}')
print('All backtick positions in file:', [i for i, b in enumerate(content) if b == 0x60])
