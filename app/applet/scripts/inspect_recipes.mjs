import fs from 'fs';
import path from 'path';

const hrPath = path.join(process.cwd(), 'src/data/herbierRecipesRegistry.ts');
const hr = fs.readFileSync(hrPath, 'utf-8');

console.log('herbierRecipesRegistry.ts total length:', hr.length);
const slugMatches = hr.match(/slug:\s*['"`]([^'"`]+)['"`]/g);
console.log('Total recipes in herbierRecipesRegistry:', slugMatches ? slugMatches.length : 0);

// Let's inspect the first recipe
const idMatch = hr.match(/id:\s*['"`]([^'"`]+)['"`]/g);
console.log('id match count:', idMatch ? idMatch.length : 0);

// Let's see how recipes are formatted
const startIdx = hr.indexOf('export const HERBIER_RECIPES');
console.log('export const HERBIER_RECIPES found at:', startIdx);
if (startIdx !== -1) {
  console.log('Snippet of HERBIER_RECIPES:\n', hr.slice(startIdx, startIdx + 800));
}
