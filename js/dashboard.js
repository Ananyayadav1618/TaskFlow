// ===============================
// TASKFLOW DASHBOARD JAVASCRIPT
// ===============================

// Get Elements
// ===========================
// CHECK LOGIN
// ===========================

if(localStorage.getItem("isLoggedIn") !== "true"){

    window.location.href = "login.html";

}
let tasks = [];
let editIndex = -1;
let currentFilter = "all";
const modal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeBtn = document.querySelector(".close");

// Open Modal
addTaskBtn.addEventListener("click", function () {
    modal.style.display = "flex";
});

// Close Modal using X
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Close Modal when clicking outside
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
const taskForm = document.getElementById("taskForm");
const taskContainer = document.getElementById("taskContainer");
const searchTask = document.getElementById("searchTask");
taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const category = document.getElementById("taskCategory").value;
    const priority = document.getElementById("taskPriority").value;
    const dueDate = document.getElementById("taskDate").value;

    const task = {
        title,
        category,
        priority,
        dueDate,
        completed: false
    };

    if(editIndex === -1){

    tasks.push(task);

}
else{

    tasks[editIndex] = task;

    editIndex = -1;

}
    saveTasks();
    displayTasks();

    taskForm.reset();

    modal.style.display = "none";

});
function displayTasks(search = "") {
    updateStats();

    taskContainer.innerHTML = "";

    if(tasks.length === 0){
        taskContainer.innerHTML = "<p>No tasks added yet.</p>";
        return;
    }
    tasks
.filter(task => {

    const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    if(currentFilter === "completed"){

        return matchesSearch && task.completed;

    }

    if(currentFilter === "pending"){

        return matchesSearch && !task.completed;

    }

    return matchesSearch;

})
.forEach((task,index)=>{

        const taskCard = document.createElement("div");
const today = new Date().toISOString().split("T")[0];

if(task.dueDate && task.dueDate < today && !task.completed){
    taskCard.classList.add("overdue");
}
        taskCard.classList.add("task-card");

        if(task.completed){
            taskCard.classList.add("completed");
        }

        taskCard.innerHTML = `
            <h3>${task.title}</h3>

            <p><strong>Category:</strong> ${task.category}</p>

            <p>
    <strong>Priority:</strong>
    <span class="priority ${task.priority.toLowerCase()}">
        ${task.priority}
    </span>
</p>

            <p><strong>Due Date:</strong> ${task.dueDate}</p>

           <div class="task-buttons">

    <button class="edit-btn"
        onclick="editTask(${index})">

        Edit

    </button>

    <button class="complete-btn"
        onclick="toggleComplete(${index})">

        ${task.completed ? "Undo" : "Complete"}

    </button>

    <button class="delete-btn"
        onclick="deleteTask(${index})">

        Delete

    </button>

</div> 
        `;

        taskContainer.appendChild(taskCard);

    });

}
function deleteTask(index){

    tasks.splice(index,1);

    displayTasks();
    saveTasks();
}

function toggleComplete(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}
function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks(){

    const storedTasks = localStorage.getItem("tasks");

    if(storedTasks){

        tasks = JSON.parse(storedTasks);

        displayTasks();

    }

}
loadTasks();
searchTask.addEventListener("keyup", function () {

    displayTasks(this.value);

});
function editTask(index){

    editIndex = index;

    const task = tasks[index];

    document.getElementById("taskTitle").value = task.title;

    document.getElementById("taskCategory").value = task.category;

    document.getElementById("taskPriority").value = task.priority;

    document.getElementById("taskDate").value = task.dueDate;

    modal.style.display = "flex";

}
function updateStats(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}
function filterTasks(filter){

    currentFilter = filter;

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");

    displayTasks(searchTask.value);

}
// ===========================
// NOTIFICATIONS
// ===========================

const notificationIcon =
document.getElementById("notificationIcon");

const notificationPanel =
document.getElementById("notificationPanel");

const notificationList =
document.getElementById("notificationList");

notificationIcon.addEventListener("click",()=>{

    if(notificationPanel.style.display==="block"){

        notificationPanel.style.display="none";

    }

    else{

        loadNotifications();

        notificationPanel.style.display="block";

    }

});

function loadNotifications(){

    notificationList.innerHTML="";

    const today=new Date().toISOString().split("T")[0];

    let found=false;

    tasks.forEach(task=>{

        if(!task.completed){

            if(task.dueDate===today){

                found=true;

                notificationList.innerHTML+=`

                <div class="notification-item">

                ⚠ <strong>${task.title}</strong><br>

                Due Today

                </div>

                `;

            }

            else if(task.dueDate<today){

                found=true;

                notificationList.innerHTML+=`

                <div class="notification-item">

                ❗ <strong>${task.title}</strong><br>

                Overdue

                </div>

                `;

            }

        }

    });

    if(!found){

        notificationList.innerHTML=

        "<p>No pending notifications 🎉</p>";

    }

}
// ===========================
// USER NAME
// ===========================

const savedName = localStorage.getItem("userName");

if(savedName){

    document.getElementById("welcomeMessage").textContent =
    `Welcome Back, ${savedName} 👋`;

}
// ===========================
// LOGOUT
// ===========================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function(e){

    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){

        localStorage.removeItem("isLoggedIn");

        window.location.href = "login.html";

    }

});