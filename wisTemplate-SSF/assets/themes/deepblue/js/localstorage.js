const signupForm = document.getElementById("register-form");
const loginForm = document.getElementById("loginForm");
const signupButton = document.getElementById("register-btn");
const loginButton = document.getElementById("loginBtn");
const statusMessage = document.getElementById("status-message");
const signupUsername = document.getElementById("register-username");
const signupPassword = document.getElementById("register-password");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");


signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = signupUsername.value;
    const password = signupPassword.value;

    if (!username || !password) {
        statusMessage.textContent = "Please fill in both fields";
        return;
    }

    localStorage.setItem("password", password);
    statusMessage.textContent = "Signup Successful!";
    signupPassword.value = "";
});

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginUsername.value;
    const password = loginPassword.value;
    
    if (!username || !password) {
        statusMessage.textContent = "Please fill in both fields";
        return;
    }

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword){
        statusMessage.textContent = "Login Successful!";
        loginUsername.value = "";
        loginPassword.value = "";
    } else{
        statusMessage.textContent = "Invalid Credentials";
    }
});

loginButton.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log("redme");
});
