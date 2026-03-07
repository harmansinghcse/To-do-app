let tasks = [];

const taskinput = document.getElementById("taskinput");
const addtask = document.getElementById("addtask");
const tasklist = document.getElementById("tasklist");

addtask.addEventListener("click", addTask);

// Load tasks when page loads
loadtasks();

function addTask(){
    const tasktext = taskinput.value;

    if(tasktext === ""){
        return;
    }

    const task = {
        text: tasktext,
        completed: false
    };

    tasks.push(task);

    createTaskElement(task);

    savetasks();

    taskinput.value = "";
}

function createTaskElement(task){

    const taskitem = document.createElement("li");

    const taskspan = document.createElement("span");
    taskspan.textContent = task.text;

    if(task.completed){
        taskspan.classList.add("Completed");
    }

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("deleteBtn");

    taskspan.addEventListener("click", function(){
        taskspan.classList.toggle("Completed");

        task.completed = !task.completed;

        savetasks();
    });

    deletebtn.addEventListener("click", function(){
        taskitem.remove();

        tasks = tasks.filter(t => t !== task);

        savetasks();
    });

    taskitem.appendChild(taskspan);
    taskitem.appendChild(deletebtn);

    tasklist.appendChild(taskitem);
}

function savetasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadtasks(){
    const storedtasks = localStorage.getItem("tasks");

    if(storedtasks){
        tasks = JSON.parse(storedtasks);

        tasks.forEach(function(task){
            createTaskElement(task);
        });
    }
}