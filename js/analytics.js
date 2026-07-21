// ===========================
// ANALYTICS
// ===========================

// Load tasks from Local Storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Total Statistics
const total = tasks.length;
const completed = tasks.filter(task => task.completed).length;
const pending = total - completed;

// Completion Percentage
const completionRate = total === 0
    ? 0
    : Math.round((completed / total) * 100);

// Display Statistics
document.getElementById("totalTasks").textContent = total;
document.getElementById("completedTasks").textContent = completed;
document.getElementById("pendingTasks").textContent = pending;
document.getElementById("completionRate").textContent = completionRate + "%";

// Progress Bar
document.getElementById("progressFill").style.width =
completionRate + "%";

// Priority Counts
const high = tasks.filter(task => task.priority === "High").length;
const medium = tasks.filter(task => task.priority === "Medium").length;
const low = tasks.filter(task => task.priority === "Low").length;

document.getElementById("highCount").textContent = high;
document.getElementById("mediumCount").textContent = medium;
document.getElementById("lowCount").textContent = low;

// Category Counts
const study = tasks.filter(task => task.category === "Study").length;
const work = tasks.filter(task => task.category === "Work").length;
const fitness = tasks.filter(task => task.category === "Fitness").length;
const personal = tasks.filter(task => task.category === "Personal").length;

document.getElementById("studyCount").textContent = study;
document.getElementById("workCount").textContent = work;
document.getElementById("fitnessCount").textContent = fitness;
document.getElementById("personalCount").textContent = personal;

// Motivation Message
const message = document.getElementById("motivation");

if(total === 0){

    message.textContent =
    "Start by adding your first task! 🚀";

}
else if(completionRate === 100){

    message.textContent =
    "Outstanding! You completed all your tasks! 🎉";

}
else if(completionRate >= 75){

    message.textContent =
    "Excellent work! Keep up the great momentum! 💪";

}
else if(completionRate >= 50){

    message.textContent =
    "Good progress! You're halfway there. 👍";

}
else{

    message.textContent =
    "Keep going! Every completed task is progress. 🚀";

}
// ===========================
// CHARTS
// ===========================

// Category Chart
new Chart(document.getElementById("categoryChart"),{

    type:"bar",

    data:{

        labels:["Study","Work","Fitness","Personal"],

        datasets:[{

            label:"Tasks",

            data:[study,work,fitness,personal],

            backgroundColor:[
                "#2563EB",
                "#22C55E",
                "#F59E0B",
                "#EF4444"
            ]

        }]

    },

    options:{

        responsive:true,

        plugins:{

            legend:{
                display:false
            }

        }

    }

});

// Status Chart
new Chart(document.getElementById("statusChart"),{

    type:"doughnut",

    data:{

        labels:["Completed","Pending"],

        datasets:[{

            data:[completed,pending],

            backgroundColor:[
                "#22C55E",
                "#EF4444"
            ]

        }]

    },

    options:{
        responsive:true
    }

});