import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { verbose } = sqlite3;
const sqlite = verbose();

export class ServerClientConnector {
  constructor(serverJsPath, htmlTemplatePath) {
    this.serverJsPath = serverJsPath;
    this.htmlTemplatePath = htmlTemplatePath;
    this.dbFile = path.join(__dirname, '../data/transactions.sqlite');
    
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    this.initDatabase();
  }

  initDatabase() {
    this.db = new sqlite.Database(this.dbFile);
    
    this.db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serviceType TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        amount REAL NOT NULL,
        status TEXT NOT NULL,
        timestamp TEXT NOT NULL
      )
    `);
  }

  extractStaticHtml() {
    try {
      return fs.readFileSync(this.htmlTemplatePath, 'utf8');
    } catch (error) {
      console.error(`Error reading HTML template: ${error.message}`);
      throw error;
    }
  }

  validatePhoneNumber(phone) {
    const phoneRegex = /^(0|\+234)[7-9][0-1]\d{8}$/;
    return phoneRegex.test(phone);
  }

  validateAmount(amount) {
    return amount > 0 && amount <= 100000;
  }

  async processPayment(type, amount, phoneNumber) {
    let result;
    
    switch(type) {
      case 'airtime':
        result = { 
          success: true, 
          message: '₦' + amount + ' airtime purchased for ' + phoneNumber
        };
        break;
      case 'subscription':
        result = { 
          success: true, 
          message: 'Subscription of ₦' + amount + ' processed for ' + phoneNumber
        };
        break;
      case 'remita':
        result = { 
          success: true, 
          message: 'Remita payment of ₦' + amount + ' completed for ' + phoneNumber
        };
        break;
      default:
        result = { 
          success: false, 
          message: 'Invalid service type' 
        };
    }
    
    if (result.success) {
      return new Promise((resolve, reject) => {
        const timestamp = new Date().toISOString();
        this.db.run(
          `INSERT INTO transactions (serviceType, phoneNumber, amount, status, timestamp) 
           VALUES (?, ?, ?, ?, ?)`,
          [type, phoneNumber, amount, 'SUCCESS', timestamp],
          function(err) {
            if (err) {
              console.error('Error saving transaction:', err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }
    
    return result;
  }

  getTransactionHistory() {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT serviceType, phoneNumber, amount, status, timestamp 
         FROM transactions 
         ORDER BY timestamp DESC 
         LIMIT 10`,
        (err, rows) => {
          if (err) {
            console.error('Error fetching transaction history:', err);
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  serveStaticFile(url, res) {
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };

    if (url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(this.extractStaticHtml());
      return true;
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const cssPath = path.join(__dirname, '../wisTemplate-SSF/public');
    const imgPath = path.join(__dirname, '../wisTemplate-SSF/assets');

    let filePath;

    if (url.startsWith('/css/')) {
      filePath = path.join(cssPath, url);
    }
    else if (url.startsWith('/public/css/')) {
      const cssUrl = url.replace('/public', '');
      filePath = path.join(cssPath, cssUrl);
    }
    else if (url.startsWith('/img/') || url.startsWith('/assets/') ||
            url.startsWith('/uploads/') || url.includes('logo')) {
      const imgUrl = url.replace(/^\/img\/|^\/assets\//, '');
      filePath = path.join(imgPath, imgUrl);

      if (!fs.existsSync(filePath)) {
        filePath = path.join(imgPath, 'uploads/logo', path.basename(url));
      }
    }
    else {
      filePath = path.join(cssPath, url);
      if (!fs.existsSync(filePath)) {
        filePath = path.join(imgPath, url);
      }
    }

    if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return true;
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
      }
    }

    return false;
  }
  async handleRequest(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET' && this.serveStaticFile(pathname, res)) {
      return;
    }

    if (pathname === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(this.extractStaticHtml());
      return;
    }

    if (pathname === '/process-payment' && req.method === 'POST') {
      try {
        const body = await this.getRequestBody(req);
        const payload = JSON.parse(body);

        if (!this.validatePhoneNumber(payload.phoneNumber)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid phone number format'
          }));
          return;
        }

        if (!this.validateAmount(parseFloat(payload.amount))) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid amount'
          }));
          return;
        }

        const result = await this.processPayment(
          payload.serviceType,
          parseFloat(payload.amount),
          payload.phoneNumber
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Payment processing error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: 'Payment processing failed'
        }));
      }
      return;
    }

    if (pathname === '/transaction-history' && req.method === 'GET') {
      try {
        const transactions = await this.getTransactionHistory();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(transactions));
      } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([]));
      }
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }

  getRequestBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
      req.on('error', err => {
        reject(err);
      });
    });
  }
  
  startServer(port = 8000) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res).catch(err => {
        console.error('Server error:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      });
    });

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });

    return server;
  }

  cleanup() {
    if (this.db) {
      this.db.close();
    }
  }
}