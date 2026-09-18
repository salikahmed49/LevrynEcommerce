const fs = require('fs');
const path = require('path');

const directories = ['src/pages', 'src/components'];

directories.forEach(dir => {
  const fullDir = path.join('e:/Levryn_final', dir);
  if (!fs.existsSync(fullDir)) return;
  
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.css'));
  
  files.forEach(file => {
    // Skip already manually updated files
    if (file === 'index.css' || file === 'ProductCard.css' || file === 'Header.css' || file === 'Home.css') return;
    
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let updated = false;
    
    // Replace old dark mode backgrounds
    if (content.includes('var(--black)')) {
      content = content.replace(/background:\s*var\(--black\)/g, 'background: var(--white)');
      content = content.replace(/background-color:\s*var\(--black\)/g, 'background-color: var(--white)');
      updated = true;
    }
    
    if (content.includes('var(--black-soft)')) {
      content = content.replace(/background:\s*var\(--black-soft\)/g, 'background: var(--white)');
      content = content.replace(/background-color:\s*var\(--black-soft\)/g, 'background-color: var(--white)');
      updated = true;
    }
    
    // Replace color white with text black
    if (content.includes('color: var(--white)')) {
      content = content.replace(/color:\s*var\(--white\)/g, 'color: var(--black)');
      updated = true;
    }
    
    // Replace white transparent borders
    if (content.includes('255, 255, 255')) {
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'rgba(0, 0, 0, 0.05)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'rgba(0, 0, 0, 0.05)');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  });
});
