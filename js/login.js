// ===========================
// LOGIN
// ===========================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if(!savedUser){

        alert("No account found. Please sign up first.");
        return;

    }

    if(
        email === savedUser.email &&
        password === savedUser.password
    ){

        localStorage.setItem("isLoggedIn","true");

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    }
    else{

        alert("Invalid Email or Password!");

    }

});