// ===========================
// SETTINGS
// ===========================

// Elements
const userName = document.getElementById("userName");
const saveName = document.getElementById("saveName");

const darkMode = document.getElementById("darkMode");

const notifications = document.getElementById("notifications");

const clearTasks = document.getElementById("clearTasks");

// ===========================
// Load Saved Settings
// ===========================

window.onload = function(){

    // Name

    const savedName = localStorage.getItem("userName");

    if(savedName){

        userName.value = savedName;

    }

    // Dark Mode

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        darkMode.checked = true;

        document.body.classList.add("dark");

    }

    // Notifications

    const notify = localStorage.getItem("notifications");

    if(notify === "true"){

        notifications.checked = true;

    }

};

// ===========================
// Save Name
// ===========================

saveName.addEventListener("click",function(){

    localStorage.setItem("userName",userName.value);

    alert("Name Saved Successfully!");

});

// ===========================
// Dark Mode
// ===========================

darkMode.addEventListener("change",function(){

    if(this.checked){

        document.body.classList.add("dark");

        localStorage.setItem("theme","dark");

    }

    else{

        document.body.classList.remove("dark");

        localStorage.setItem("theme","light");

    }

});

// ===========================
// Notifications
// ===========================

notifications.addEventListener("change",function(){

    localStorage.setItem("notifications",this.checked);

});

// ===========================
// Clear Tasks
// ===========================

clearTasks.addEventListener("click",function(){

    const confirmDelete = confirm(
        "Delete all tasks?"
    );

    if(confirmDelete){

        localStorage.removeItem("tasks");

        alert("All tasks deleted.");

    }

});