/**
 * Script to update the JavaScript in Airtime.html
 * Using ES Modules syntax
 * Script to update the HTML template with proper CSS and image references
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the HTML file
const htmlPath = path.join(__dirname, '../wisTemplate-SSF/Airtime.html');

// Read the HTML file
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Read our updated client-side JavaScript
const updatedJsPath = path.join(__dirname, 'client-updates.js');
const updatedJs = fs.readFileSync(updatedJsPath, 'utf8');

// Find the existing script section in the HTML
const scriptStartMarker = '<script>';
const scriptEndMarker = '</script>';

// Find the position of the last script tag before the body closing tag
const lastScriptStartPos = htmlContent.lastIndexOf(scriptStartMarker, htmlContent.lastIndexOf('</body>'));
const lastScriptEndPos = htmlContent.indexOf(scriptEndMarker, lastScriptStartPos) + scriptEndMarker.length;

// Replace the script content
if (lastScriptStartPos !== -1 && lastScriptEndPos !== -1) {
  const newHtmlContent = 
    htmlContent.substring(0, lastScriptStartPos) + 
    `<script>\n${updatedJs}\n` + 
    htmlContent.substring(lastScriptEndPos);
  
  // Write the updated HTML back to the file
  fs.writeFileSync(htmlPath, newHtmlContent, 'utf8');
  console.log('Successfully updated the JavaScript in Airtime.html');
} else {
  console.error('Could not find the script section in Airtime.html');
}
