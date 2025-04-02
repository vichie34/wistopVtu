/**
 * Script to ensure the asset directories exist
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for asset directories
const publicCssDir = path.join(__dirname, '../wisTemplate-SSF/public/css');
const assetsImgDir = path.join(__dirname, '../wisTemplate-SSF/assets/uploads/logo');

// Ensure directories exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
}

// Create the directories
ensureDirectoryExists(publicCssDir);
ensureDirectoryExists(assetsImgDir);

console.log('Asset directories have been set up.');
