/**
 * Main entry point for the Virtual Top Up application
 * Using ES Modules syntax with named imports
 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import minimist from 'minimist';
import { ServerClientConnector } from './connector.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the connector.js file exists
const connectorPath = path.join(__dirname, 'connector.js');
if (!fs.existsSync(connectorPath)) {
  console.error(`Error: Could not find ${connectorPath}`);
  process.exit(1);
}

// Parse command line arguments
const args = minimist(process.argv.slice(2));
const serverJsPath = args['server-js'] || path.join(__dirname, '../wisTemplate-SSF/tst.js');
const htmlTemplatePath = args['html-template'] || path.join(__dirname, '../wisTemplate-SSF/Airtime.html');
const port = args.port || 8000;

// Ensure template file exists
if (!fs.existsSync(htmlTemplatePath)) {
  console.error(`Error: Could not find HTML template at ${htmlTemplatePath}`);
  process.exit(1);
}

// Create the connector and start the server
const connector = new ServerClientConnector(serverJsPath, htmlTemplatePath);
const server = connector.startServer(port);

// Handle graceful shutdown
process.on('SIGINT', function() {
  console.log('\nShutting down server...');
  server.close(function() {
  connector.cleanup();
  console.log('Server has been terminated');
  process.exit(0);
});
});

// Log startup information
console.log(`Virtual Top Up application running at http://localhost:${port}`);
console.log('Press Ctrl+C to stop the server');

