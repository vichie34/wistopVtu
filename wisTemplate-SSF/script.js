// const fetch = window.fetch;

// // BE apiEndpoint URL
// const apiEndpoint = "localhost:7000";

// async function getData() {
//     try {
//         // make GET request
//         const response = await fetch(`${apiEndpoint}/api`);
//         const data = await response.json();
//         // document.getElementById("data-container").innerHTML = data.message;
//     }

//     // update the web page with received data
//     catch (error) {
//         console.error("Error fetching data", error);
//     }    
// }

// const response = await fetch(`${apiEndpoint}/data`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json", 
//     },
//     body: JSON.stringify(userData),
// });
// const data = await response.json();


const fetch = window.fetch;

// BE apiEndpoint URL
const apiEndpoint = "";

async function getData() {
    try {
        // make GET request
        const response = await fetch(`${apiEndpoint}/api`);
        const data = await response.json();
        // document.getElementById("data-container").innerHTML = data.message;
    } catch (error) {
        console.error("Error fetching data", error);
    }    
}

// Wrap the POST request in an async function
async function postData(userData) {
    try {
        const response = await fetch(`${apiEndpoint}/api`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error posting data", error);
    }
}

// Example usage
const userData = { name: "John Doe", age: 30 };
postData(userData);