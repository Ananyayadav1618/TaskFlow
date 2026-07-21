// ===========================
// SIGNUP
// ===========================

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check passwords

    if(password !== confirmPassword){

        alert("Passwords do not match!");

        return;

    }

    // Save User

    const user = {

        name,
        email,
        password

    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created Successfully!");

    window.location.href = "login.html";

});