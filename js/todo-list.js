var listButton = [];
var listTasks = [];

function validateDate(dt) {
    // Get DateTime
    const hoy = new Date().toISOString();
    const regexDate = /^(202[0-9]-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    const fecha = hoy.match(regexDate);
    
    dt.setAttribute("min", fecha[0]);
}

function createTask(task, dt) {
    // container
    const newContainer = document.createElement("div");

    // Task
    const newTask = document.createElement("p");
    newTask.textContent = task.value;
    newTask.style.width = "60%";

    // Date    
    const date = document.createElement("p");
    date.textContent = dt.value;
    date.style.width = "30%";

    // Detele button
    const btnExit = document.createElement("button");
    btnExit.textContent = "X";
    btnExit.setAttribute("class", "btn-exit");

    // Add task to container
    newContainer.appendChild(newTask);
    // Add date to container
    newContainer.appendChild(date);
    // Add delte button
    newContainer.appendChild(btnExit);
    // Add color what user select
    newContainer.style.backgroundColor = color;
    if (color === "#000000"){
        newTask.style.color = "white";
        date.style.color = "white";
        btnExit.style.color = "white";
    }else if( color === "#FFFFFF"){
        newTask.style.color = "black";
        date.style.color = "black";
        btnExit.style.color = "black";
    }

    tasksContainer.appendChild(newContainer);
}

function deleteTask(e){
    let divId = e.target.id;
    // Get button's parent element
    divTask = document.getElementById(divId).parentElement;
    
    tasksContainer.removeChild(divTask);

    listTasks.splice(e.target.id,1);
    saveToLocalStorage(listTasks);
    deleteButtons();
}

function deleteButtons(){
    let listButton = document.querySelectorAll(".btn-exit");
    for(let i =0; i<listButton.length; i++){
        listButton[i].id = i;
        listButton[i].addEventListener('click', deleteTask, false);
    }
}

function saveToLocalStorage(){
    localStorage.setItem('task', JSON.stringify(listTasks));
}

function start() {
    //Get task date
    const dt = document.getElementById("dt");
    validateDate(dt);
    const form = document.getElementById("form");
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Task to add
        const task = document.getElementById("task");
        // Color Picker
        color = document.getElementById("background-task").value;
        // Place to append every task
        tasksContainer = document.getElementById("tasks-container");

        const setTask = {
            comment: task.value,
            color: color,
            date: dt.value
        }

        listTasks.push(setTask);
        
        createTask(task, dt);
        deleteButtons();

        saveToLocalStorage();

        task.value = "";
        dt.value = null;
    })
}

window.onload = start;