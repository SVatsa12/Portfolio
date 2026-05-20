import sys
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
# Replace the faulty style tag span
# Current has: 0%{ftshrink:0;}}< /style>
# We need: ...0%{flex-shrink:0;}}</style>
# Find } before </style> in the style section
st = content.find('</style>')
context = content[st-30:st]
print('Context before </style>:', repr(context))
# Find last } in context
brace = context.rfind('}')
print('Last } at position:', brace, 'in context')
abs_brace = st - 30 + brace
print('Absolute {} position:', abs_brace)
print('Char at abs_brace+1:', repr(content[abs_brace+1]))
if content[abs_brace+1] in ('\n', ' '):
    print('INSERTING BACKTICK between } and next char')
    new_content = content[:abs_brace+1] + chr(0x60) + content[abs_brace+1:]
    with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    # Verify
    with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\portfolio\components\SkillsSection.tsx', 'r') as f:
        c2 = f.read()
    st2 = c2.find('</style>')
    print('After fix context:', repr(c2[st2-10:st2]))
else:
    print('No space between } and <, not inserting')
