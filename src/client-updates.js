// // Replace the JavaScript section in Airtime.html with this version
// // that correctly interacts with our Node.js API endpoints

// // Utility functions for validation
// function validatePhoneNumber(phone) {
//     const phoneRegex = /^(0|\+234)[7-9][0-1]\d{8}$/;
//     return phoneRegex.test(phone);
// }

// function validateAmount(amount) {
//     return amount > 0 && amount <= 100000;
// }

// // DOM Elements
// const form = document.getElementById('topup-form');
// const serviceTypeSelect = document.getElementById('service-type');
// const phoneNumberInput = document.getElementById('phone-number');
// const amountInput = document.getElementById('amount');
// const errorContainer = document.getElementById('error-container');
// const transactionBody = document.getElementById('transaction-body');

// // Error handling functions
// function showError(message) {
//     errorContainer.textContent = message;
//     errorContainer.style.display = 'block';
// }

// function hideError() {
//     errorContainer.textContent = '';
//     errorContainer.style.display = 'none';
// }

// // Fetch transaction history
// async function fetchTransactionHistory() {
//     try {
//         const response = await fetch('/transaction-history');
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
        
//         const history = await response.json();
        
//         // Clear existing transactions
//         transactionBody.innerHTML = '';

//         if (!history || history.length === 0) {
//             transactionBody.innerHTML = `
//                 <tr>
//                     <td colspan="5">No transactions yet</td>
//                 </tr>
//             `;
//             return;
//         }

//         // Add each transaction to the table
//         history.forEach(transaction => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${new Date(transaction.timestamp).toLocaleString()}</td>
//                 <td>${transaction.serviceType}</td>
//                 <td>${transaction.phoneNumber}</td>
//                 <td>₦${transaction.amount}</td>
//                 <td>${transaction.status}</td>
//             `;
//             transactionBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Failed to fetch transaction history:', error);
//         transactionBody.innerHTML = `
//             <tr>
//                 <td colspan="5">Error loading transaction history</td>
//             </tr>
//         `;
//     }
// }

// // Process payment
// async function processPayment(e) {
//     e.preventDefault();
//     hideError();

//     const phoneNumber = phoneNumberInput.value;
//     const amount = parseFloat(amountInput.value);
//     const serviceType = serviceTypeSelect.value;

//     // Validate inputs client-side before sending to server
//     if (!validatePhoneNumber(phoneNumber)) {
//         showError('Invalid phone number. Use Nigerian format (0/+234)');
//         return;
//     }

//     if (!validateAmount(amount)) {
//         showError('Invalid amount. Must be between ₦1 and ₦100,000');
//         return;
//     }

//     try {
//         // Show processing status
//         const submitButton = form.querySelector('button[type="submit"]');
//         const originalButtonText = submitButton.textContent;
//         submitButton.disabled = true;
//         submitButton.textContent = 'Processing...';

//         const response = await fetch('/process-payment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 phoneNumber,
//                 amount,
//                 serviceType
//             })
//         });

//         // Reset button
//         submitButton.disabled = false;
//         submitButton.textContent = originalButtonText;

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success) {
//             // Success case
//             alert(result.message);
            
//             // Clear form fields after successful transaction
//             phoneNumberInput.value = '';
//             amountInput.value = '';
            
//             // Refresh transaction history
//             fetchTransactionHistory();
//         } else {
//             // Server returned success: false
//             showError(result.message || 'Transaction failed');
//         }
//     } catch (error) {
//         console.error('Transaction failed:', error);
//         showError('Transaction could not be completed. Please try again later.');
//     }
// }

// // Event Listeners
// form.addEventListener('submit', processPayment);

// // Initial load of transaction history when page loads
// document.addEventListener('DOMContentLoaded', function() {
//     fetchTransactionHistory();
// });
