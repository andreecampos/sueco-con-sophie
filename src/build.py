#!/usr/bin/env python3
"""Build script: inline data.js + sophie-audio.js + app.js into index.html → single bundle."""
import os, sys

SRC = '/home/claude/sueco-con-sofi'
OUT = '/home/claude/sueco-con-sofi-plataforma.html'

def read(name):
    with open(os.path.join(SRC, name), 'r', encoding='utf-8') as f:
        return f.read()

html      = read('index.html')
data_js   = read('data.js')
audio_js  = read('sophie-audio.js')
app_js    = read('app.js')

# Replace data.js script tag → inline data + audio
html = html.replace(
    '<script src="data.js"></script>',
    f'<script>\n{data_js}\n</script>\n<script>\n{audio_js}\n</script>'
)

# Replace app.js script tag → inline app
html = html.replace(
    '<script src="app.js"></script>',
    f'<script>\n{app_js}\n</script>'
)

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)

size_mb = os.path.getsize(OUT) / 1_048_576
print(f'✅ Bundle written: {OUT}  ({size_mb:.1f} MB)')
