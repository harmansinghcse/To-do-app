const taskinput = document.getElementById("taskinput")
const addtask = document.getElementById("addtask")
const tasklist = document.getElementById("tasklist")

addtask.addEventListener("click", addTask);

function addTask(){
    const tasktext = taskinput.value; 

    if(tasktext === ""){
        return;
    }

    const taskitem = document.createElement("li");

    const taskspan = document.createElement("span");
    taskspan.textContent = tasktext;

    const deletebtn = document.createElement("button");

    deletebtn.textContent = "Delete";

    deletebtn.classList.add("deleteBtn");

    taskspan.addEventListener("click", function(){
        taskspan.classList.toggle("Completed");
    });

    deletebtn.addEventListener("click", function(){
        taskitem.remove();
    });

    taskitem.appendChild(taskspan);
    taskitem.appendChild(deletebtn);

    tasklist.appendChild(taskitem);

    taskinput.value = "";
}