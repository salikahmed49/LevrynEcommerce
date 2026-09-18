import re

with open('src/data/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken backslash quotes
content = re.sub(r"name:\s*\\'(.*?)\\'", r"name: '\1'", content)

renames = {
  'Velvet Blossom': 'Coco',
  'Amber Crown': 'Althair',
  'The Executive': 'Office',
  'Zen Dew': 'Issey',
  'Crimson Ember': 'Intensely',
  'Sugar Cloud': 'Marshmallow',
  'Dark Enigma': 'Code',
  'Majestic Oud': 'Stronger Oud',
  'Arctic Frost': 'Hawas Ice',
  'Oceanic Rush': 'Aqua',
  'Liquid Gold': 'Elixir',
  'Royal Alexandria': 'Alexandria',
  'Ethereal Path': 'Guidance',
  'Infinite Vision': 'Imagination',
  'Fiery Spice': 'Spicebomb',
  'Highland Green': 'Tweed',
  'Luminous Sky': 'Meteore',
  'Stellar Bloom': 'Stellar',
  'Coastal Drift': 'Wood Sage'
}

for new_n, old_n in renames.items():
    content = re.sub(fr"name:\s*'{new_n}'", f"name: '{old_n}'", content)

with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
