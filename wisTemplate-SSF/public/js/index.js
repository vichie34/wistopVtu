const greetingElement = document.getElementById("greeting");

// Function to get the current time

function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
}

// Fxn to generate greeting based on time

function generateGreeting() {
    const currentTime = getCurrentTime();
    let greeting;
    if (currentTime < 12) {
        greeting = "Good morning!"
    } else if (currentTime < 18) {
        greeting = "Good afternoon!"
    } else {
        greeting = "Good evening!"
    }

    const userName = prompt("What is your name?") || "there";
    greeting +=  `${userName}`

    return greeting;

}


// updating greeting on refresh
document.addEventListener("DOMContentLoaded", () => {
    greetingElement.textContent = generateGreeting();
});

// updating greeting every min
// setInterval(() => {
//     greetingElement.textContent = generateGreeting();
// }, 60000)
