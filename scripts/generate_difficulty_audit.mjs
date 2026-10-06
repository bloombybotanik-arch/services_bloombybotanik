import fs from 'fs';
import path from 'path';

// Load datasets
import { discoveryRecipes } from '../src/data/recipesData.ts';
import { cosmeticsRecipes } from '../src/cosmeticsData.ts';
import { culinaryDatabaseFR } from '../src/data/culinaryData.ts';

console.log("Discovery:", discoveryRecipes.length);
console.log("Cosmetics:", cosmeticsRecipes.length);
console.log("Culinary:", culinaryDatabaseFR.length);
