import base64
with open(r'C:\Users\qshub\OneDrive\Desktop\PORTFOLIO\_q.py', 'r') as me:
    raw = me.read()
print(raw.count(chr(0x60)))
print('Line 5:', raw.split(chr(0x0a))[4] if len(raw.split(chr(0x0a))) > 4 else 'N/A')
