document.addEventListener("DOMContentLoaded", function() {

//const socket = io.connect('http://127.0.0.1:5000/');

/*Here is for nav*/

const loginButtonContainer = document.getElementById("login-button-container");
    const signupButtonContainer = document.getElementById("signup-button-container");
    const logoutButtonContainer = document.getElementById("logout-button-container");

    // Check if an email is present in sessionStorage
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {

        const emailDisplayContainer = document.getElementById("email-display-container");
        if (emailDisplayContainer) {
            emailDisplayContainer.textContent = `Logged in as: ${userEmail}`;
        }

        // Create and append the logout button
        const logoutButton = document.createElement("button");
        logoutButton.classList.add("btn", "btn-danger");
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", function() {
            // Handle logout logic here (e.g., clearing sessionStorage)
            

            sessionStorage.removeItem("userEmail");
            sessionStorage.clear();

            fetch("/logout_timer")
            .then(response => response.text())
            .then(() => {
                // After starting, disable Start and enable Exit
                //toggleButtons(true, false);
            });

            //socket.close();
            // Redirect the user to the login page or perform any other logout actions
            window.location.href = "/login"; // Change this to your logout URL
        });

        logoutButtonContainer.appendChild(logoutButton);
    } else {
        // Create and append the login button
        const loginButton = document.createElement("a");
        loginButton.classList.add("nav-link");
        loginButton.href = "/login";
        loginButton.textContent = "Login";
        loginButtonContainer.appendChild(loginButton);

        // Create and append the sign-up button
        const signupButton = document.createElement("a");
        signupButton.classList.add("nav-link");
        signupButton.href = "/signup";
        signupButton.textContent = "Sign Up";
        signupButtonContainer.appendChild(signupButton);
    }

    // Common elements and functions shared across pages
    console.log("page loaded")
    /*
    const timerElement = document.getElementById("timer");
    const startButton = document.getElementById("start-button");
    const exitButton = document.getElementById("exit-button");
    */

    //------------------------------------------------------

    /* Code for login.html */
    const loginButton = document.getElementById("loginbutton");

    if (loginButton) {
        console.log("login page detected");
        loginButton.addEventListener("click", () => {
            // Handle login form submission here
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            console.log("email for login is" + email);
            console.log("password for login is" + password);

            fetch("/loginform", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Login successful") {
                    sessionStorage.setItem("userEmail", email);
                    sessionStorage.setItem("uid", data.uid);
                    window.location.href = "/index";
                } else {
                    console.error("Login failed:", data.error);
                }
            })
            .catch(error => {
                console.error("Login failed:", error);
            });
        });
    }

    /* Code for signup.html */
    const signupButton = document.getElementById("signupbutton");

    if (signupButton) {
        console.log("signup page detected");
        signupButton.addEventListener("click", () => {
            console.log("signup button clicked");
            // Handle signup form submission here
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const confirmpassword = document.getElementById("confirm-password").value;

            console.log("email for signup is" + email);
            console.log("password for signup is" + password);

            fetch("/signupform", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Signup successful") {
                    window.location.href = "/login";
                } else {
                    console.error("Signup failed:", data.error);
                }
            })
            .catch(error => {
                console.error("Signup failed:", error);
            });
        });
    }

    //--------------------------------------------------

    






});