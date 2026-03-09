// Task storage array
let tasks = [];

// Get elements from HTML
const taskinput = document.getElementById("taskinput");
const addtask = document.getElementById("addtask");
const tasklist = document.getElementById("tasklist");

const All = document.getElementById("All");
const Completedtasks = document.getElementById("Completedtasks");
const Pendingtasks = document.getElementById("Pendingtasks");

// Current filter state
let currentfilter = "All";

// Add task button
addtask.addEventListener("click", addTask);

// Filter buttons
All.addEventListener("click", function () {
    currentfilter = "All";
    rendertask();
});

Completedtasks.addEventListener("click", function () {
    currentfilter = "Completed";
    rendertask();
});

Pendingtasks.addEventListener("click", function () {
    currentfilter = "Pending";
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


    taskitem.appendChild(taskspan);
    taskitem.appendChild(deletebtn);

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

}