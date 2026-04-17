import json
import requests
import re

# Read app.js
with open('static/app.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

# Extract levels
match = re.search(r'const levelsData = (\[.*?\]);', js_code, re.DOTALL)
if match:
    levels_str = match.group(1)
    # Convert JS object to JSON
    # This might be tricky because of unquoted keys. Let's do some replacement.
    levels_str = re.sub(r'([a-zA-Z0-9_]+):', r'"\1":', levels_str)
    # Also single quotes to double quotes
    levels_str = levels_str.replace("'", '"')
    # Let's just eval it in JS using node to stringify it properly
    pass

