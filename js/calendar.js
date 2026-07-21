// ===========================
// CALENDAR
// ===========================

const calendar = document.querySelector(".calendar");
const monthYear = document.getElementById("monthYear");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderCalendar(){

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = currentDate.toLocaleString("default",{
        month:"long",
        year:"numeric"
    });

    // Remove old dates only
    calendar.querySelectorAll(".day").forEach(day=>{
        day.remove();
    });

    const firstDay = new Date(year,month,1).getDay();

    const lastDate = new Date(year,month+1,0).getDate();

    // Empty boxes before month starts
    for(let i=0;i<firstDay;i++){

        const blank = document.createElement("div");
        blank.classList.add("day");

        blank.style.visibility="hidden";

        calendar.appendChild(blank);

    }

    // Dates
    for(let date=1;date<=lastDate;date++){

        const day=document.createElement("div");

        day.classList.add("day");

        day.textContent=date;
        const fullDate =
`${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

const hasTask = tasks.some(task => task.dueDate === fullDate);

if(hasTask){

    day.classList.add("task-date");

}

        const today=new Date();

        if(
            date===today.getDate() &&
            month===today.getMonth() &&
            year===today.getFullYear()
        ){

            day.classList.add("today");

        }
day.addEventListener("click", () => {

    showTasks(fullDate);

});

calendar.appendChild(day);

    }

}

renderCalendar();

prevBtn.addEventListener("click",()=>{

    currentDate.setMonth(currentDate.getMonth()-1);

    renderCalendar();

});

nextBtn.addEventListener("click",()=>{

    currentDate.setMonth(currentDate.getMonth()+1);

    renderCalendar();

});
function showTasks(date){

    const upcoming = document.getElementById("upcomingTasks");

    const filtered = tasks.filter(task => task.dueDate === date);

    if(filtered.length === 0){

        upcoming.innerHTML = "<p>No tasks on this date.</p>";

        return;

    }

    upcoming.innerHTML = "";

    filtered.forEach(task => {

        upcoming.innerHTML += `

        <div class="task-item">

            <h3>${task.title}</h3>

            <p><strong>Category:</strong> ${task.category}</p>

            <p><strong>Priority:</strong> ${task.priority}</p>

        </div>

        `;

    });

}
