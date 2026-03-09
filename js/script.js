// Task storage array
let tasks = [];

// Get elements from HTML
const taskinput = document.getElementById("taskinput");
const addtask = document.getElementById("addtask");
const tasklist = document.getElementById("tasklist");

const All = document.getElementById("All");
const Completedtasks = document.getElementById("Completedtasks");
const Pendingtasks = document.getElementById("Pendingtasks");

const progresstext = document.getElementById("progresstext")

// Current filter state
let currentfilter = "All";

// Add task button
addtask.addEventListener("click", addTask);

// Filter buttons
All.addEventListener("click", function () {
    currentfilter = "All";
    setActiveButton(this);
    rendertask();
});

Completedtasks.addEventListener("click", function () {
    currentfilter = "Completed";
    setActiveButton(this);
    rendertask();
});

Pendingtasks.addEventListener("click", function () {
    currentfilter = "Pending";
    setActiveButton(this);
    rendertask();
});

// Load tasks when page opens
loadtasks();


// Add a new task
function addTask() {

    const tasktext = taskinput.value;

    if (tasktext === "") {
        return;
    }

    const task = {
        text: tasktext,
        completed: false
    };

    tasks.push(task);

    savetasks();
    rendertask();

    taskinput.value = "";
}



// Create task element
function createTaskElement(task) {

    const taskitem = document.createElement("li");

    const taskspan = document.createElement("span");
    taskspan.textContent = task.text;

    if (task.completed) {
        taskspan.classList.add("completed");
    }

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("deleteBtn");
    const completebtn = document.createElement("button");
    completebtn.textContent = "Complete";
    completebtn.classList.add("completebtn");

    if(task.completed){
        completebtn.disabled = true;
        completebtn.textContent = "Completed";
    }


    // Toggle completed
    taskspan.addEventListener("click", function () {

        task.completed = !task.completed;

        savetasks();
        rendertask();

    });


    // Delete task
    deletebtn.addEventListener("click", function () {

        tasks = tasks.filter(t => t !== task);

        savetasks();
        rendertask();

    });

    completebtn.addEventListener("click", function (){

        task.completed = true;
        savetasks();
        rendertask();
    })


    taskitem.appendChild(taskspan);
    taskitem.appendChild(deletebtn);
    taskitem.appendChild(completebtn);
    tasklist.appendChild(taskitem);

}



// Save tasks in local storage
function savetasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// Load tasks from local storage
function loadtasks() {

    const storedtasks = localStorage.getItem("tasks");

    if (storedtasks) {

        tasks = JSON.parse(storedtasks);

        rendertask();

    }

}



// Render tasks based on filter
function rendertask() {

    tasklist.innerHTML = "";

    tasks.forEach(function (task) {

        if (currentfilter === "Completed" && !task.completed) {
            return;
        }

        if (currentfilter === "Pending" && task.completed) {
            return;
        }

        createTaskElement(task);

    });

    // calculate progress
    let completed = tasks.filter(task => task.completed).length;
    let total = tasks.length;

    // display progress
    progresstext.textContent = completed + " / " + total + " tasks completed";

    // progress bar
    if(total > 0){
        let percentage = (completed/total) * 100;
        progressfill.style.width = percentage + "%";
    }
    else if(total === 0){
        progressfill.style.width = "0%";
    }

}

function setActiveButton(button){

    const buttons = document.querySelectorAll(".filters button");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

}

taskinput.addEventListener("keydown", function(event){
    if(event.key === "Enter") {
        addTask();
    }
});