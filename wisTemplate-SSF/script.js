const fetch = window.fetch;

// BE apiEndpoint URL
const apiEndpoint = "";

async function getData() {
    try {
        // make GET request
        const response = await fetch(`${apiEndpoint}/data`);
        const data = await response.json();
        // document.getElementById("data-container").innerHTML = data.message;
    }

    // update the web page with received data
    catch (error) {
        console.error("Error fetching data", error);
    }    
}

const response = await fetch(`${apiEndpoint}/data`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json", 
    },
    body: JSON.stringify(userData),
});
const data = await response.json();