// Server-side implementation for Virtual Top Up Application

import { sqlite } from "https://esm.town/v/stevekrouse/sqlite";

// Utility functions for validation
function validatePhoneNumber(phone) {
    const phoneRegex = /^(0|\+234)[7-9][0-1]\d{8}$/;
    return phoneRegex.test(phone);
}

function validateAmount(amount) {
    return amount > 0 && amount <= 100000;
}

// Payment processing simulation
async function processPayment(type, amount, phoneNumber) {
    // Simulate payment gateway interactions
    switch(type) {
        case 'airtime':
            return { 
                success: true, 
                message: '₦' + amount + ' airtime purchased for ' + phoneNumber
            };
        case 'subscription':
            return { 
                success: true, 
                message: 'Subscription of ₦' + amount + ' processed for ' + phoneNumber
            };
        case 'remita':
            return { 
                success: true, 
                message: 'Remita payment of ₦' + amount + ' completed for ' + phoneNumber
            };
        default:
            return { 
                success: false, 
                message: 'Invalid service type' 
            };
    }
}

 // Static file serving
// const staticFiles = {
//     '/': `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Virtual Top Up Nigeria</title>
//             <style>
//                 body {
//                     font-family: Arial, sans-serif;
//                     background-color: #f4f4f4;
//                     margin: 0;
//                     padding: 0;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     min-height: 100vh;
//                 }
//                 .container {
//                     background-color: white;
//                     max-width: 500px;
//                     width: 100%;
//                     padding: 20px;
//                     border-radius: 8px;
//                     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//                 }
//                 h1 { text-align: center; color: #333; }
//                 .error-message {
//                     color: red;
//                     background-color: #ffeeee;
//                     padding: 10px;
//                     margin-bottom: 10px;
//                     border-radius: 5px;
//                     text-align: center;
//                 }
//                 select, input, button {
//                     width: 100%;
//                     margin-bottom: 10px;
//                     padding: 10px;
//                     border: 1px solid #ddd;
//                     border-radius: 4px;
//                     box-sizing: border-box;
//                 }
//                 button {
//                     background-color: #4CAF50;
//                     color: white;
//                     border: none;
//                     cursor: pointer;
//                     transition: background-color 0.3s ease;
//                 }
//                 button:hover {
//                     background-color: #45a049;
//                 }
//                 .transaction-history {
//                     margin-top: 20px;
//                 }
//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                 }
//                 table th, table td {
//                     border: 1px solid #ddd;
//                     padding: 8px;
//                     text-align: left;
//                 }
//                 table thead {
//                     background-color: #f2f2f2;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h1>💸 Virtual Top Up Nigeria</h1>
                
//                 <div id="error-container" class="error-message" style="display: none;"></div>
                
//                 <form id="topup-form">
//                     <select id="service-type" required>
//                         <option value="airtime">Airtime Purchase</option>
//                         <option value="subscription">Subscription Payment</option>
//                         <option value="remita">Remita Payment</option>
//                     </select>

//                     <input 
//                         type="tel" 
//                         id="phone-number" 
//                         placeholder="Phone Number (e.g., 08012345678)" 
//                         required 
//                     />

//                     <input 
//                         type="number" 
//                         id="amount" 
//                         placeholder="Amount (₦)" 
//                         required 
//                         min="1" 
//                         max="100000" 
//                     />

//                     <button type="submit">Process Payment</button>
//                 </form>

//                 <div class="transaction-history">
//                     <h2>Transaction History</h2>
//                     <table id="transaction-table">
//                         <thead>
//                             <tr>
//                                 <th>Type</th>
//                                 <th>Amount</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody id="transaction-body">
//                             <tr>
//                                 <td colspan="3">No transactions yet</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             <script>
//                 // Client-side JavaScript
//                 var form = document.getElementById('topup-form');
//                 var serviceTypeSelect = document.getElementById('service-type');
//                 var phoneNumberInput = document.getElementById('phone-number');
//                 var amountInput = document.getElementById('amount');
//                 var errorContainer = document.getElementById('error-container');
//                 var transactionBody = document.getElementById('transaction-body');

//                 function showError(message) {
//                     errorContainer.textContent = message;
//                     errorContainer.style.display = 'block';
//                 }

//                 function hideError() {
//                     errorContainer.textContent = '';
//                     errorContainer.style.display = 'none';
//                 }

//                 function fetchTransactionHistory() {
//                     fetch('/transaction-history')
//                         .then(function(response) { return response.json(); })
//                         .then(function(history) {
//                             transactionBody.innerHTML = '';

//                             if (history.length === 0) {
//                                 transactionBody.innerHTML = 
//                                     '<tr><td colspan="3">No transactions yet</td></tr>';
//                                 return;
//                             }

//                             history.forEach(function(transaction) {
//                                 var row = document.createElement('tr');
//                                 row.innerHTML = 
//                                     '<td>' + transaction.serviceType + '</td>' +
//                                     '<td>₦' + transaction.amount + '</td>' +
//                                     '<td>' + new Date(transaction.timestamp).toLocaleString() + '</td>';
//                                 transactionBody.appendChild(row);
//                             });
//                         })
//                         .catch(function(error) {
//                             console.error('Failed to fetch transaction history', error);
//                         });
//                 }

//                 function processPayment(e) {
//                     e.preventDefault();
//                     hideError();

//                     var phoneNumber = phoneNumberInput.value;
//                     var amount = parseFloat(amountInput.value);
//                     var serviceType = serviceTypeSelect.value;

//                     fetch('/process-payment', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             phoneNumber: phoneNumber,
//                             amount: amount,
//                             serviceType: serviceType
//                         })
//                     })
//                     .then(function(response) { return response.json(); })
//                     .then(function(result) {
//                         if (result.success) {
//                             alert(result.message);
//                             fetchTransactionHistory();
//                         } else {
//                             showError(result.message);
//                         }
//                     })
//                     .catch(function(error) {
//                         console.error('Transaction failed', error);
//                         showError('Transaction could not be completed');
//                     });
//                 }

//                 form.addEventListener('submit', processPayment);
//                 fetchTransactionHistory();
//             </script>
//         </body>
//         </html>
//     `
// }; 

export default async function server(request) {
    // Get the unique key for this val
    const KEY = new URL(request.url).pathname.split("/").at(-1);

    // Ensure transactions table exists
    await sqlite.execute(`
        CREATE TABLE IF NOT EXISTS ${KEY}_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            serviceType TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            amount REAL NOT NULL,
            status TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    `);

    // Route handling
    const url = new URL(request.url);

    // Serve static HTML
    if (url.pathname === '/' && request.method === 'GET') {
        return new Response(staticFiles['/'], {
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // Payment processing endpoint
    if (url.pathname === '/process-payment' && request.method === 'POST') {
        try {
            const payload = await request.json();
            
            // Validate inputs
            if (!validatePhoneNumber(payload.phoneNumber)) {
                return new Response(JSON.stringify({ 
                    success: false, 
                    message: 'Invalid phone number format' 
                }), { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (!validateAmount(payload.amount)) {
                return new Response(JSON.stringify({ 
                    success: false, 
                    message: 'Invalid amount' 
                }), { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // Process payment
            const result = await processPayment(
                payload.serviceType, 
                parseFloat(payload.amount),
                payload.phoneNumber
            );
            
            // Log transaction
            await sqlite.execute(`
                INSERT INTO ${KEY}_transactions 
                (serviceType, phoneNumber, amount, status, timestamp) 
                VALUES (?, ?, ?, ?, ?)
            `, [
                payload.serviceType, 
                payload.phoneNumber, 
                payload.amount, 
                result.success ? 'SUCCESS' : 'FAILED',
                new Date().toISOString()
            ]);

            return new Response(JSON.stringify(result), {
                headers: { 'Content-Type': 'application/json' }
            });

        } catch (error) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Payment processing failed' 
            }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // Transaction history endpoint
    if (url.pathname === '/transaction-history' && request.method === 'GET') {
        try {
            const transactions = await sqlite.execute(`
                SELECT serviceType, amount, timestamp 
                FROM ${KEY}_transactions 
                ORDER BY timestamp DESC 
                LIMIT 10
            `);

            return new Response(JSON.stringify(transactions.rows), {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify([]), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    // 404 for any other routes
    return new Response('Not Found', { status: 404 });
};