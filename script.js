let arrWithTasks = [];
let trueWritingName;

const appendixTaskByEnter = (key) => {
    key = key || window.event;
    if (key.keyCode === 13) {
         appendixTask();
    }

    return false;
};

window.onload = () => {
    if (JSON.parse(localStorage.getItem('tasks')) != null) {
        arrWithTasks = JSON.parse(localStorage.getItem('tasks'));
        addTasksToPage();
    }
};

const getAddTime = () => {
    const date = new Date;
    const year = date.getFullYear();
    let month = date.getMonth();
    let dayOfMonth = date.getDate();

    if (month < 10) {
        month += 1;
        month = '0' + month;
    }
    if (dayOfMonth < 10) {
        dayOfMonth = '0' + dayOfMonth;
    }

    return dayOfMonth + '.' + month + '.' + year;
};

const checkTaskName = (nameOfTheTask) => {
    let obj;

    if (nameOfTheTask === '') {
        trueWritingName = false;
    }

    arrWithTasks.forEach(function (item) {
        obj = item;

        if (obj.name === nameOfTheTask) {
            trueWritingName = false;
        }
    });
};


const addThisTaskToArray = (taskName, addTime, taskStatus, taskId) => {
    arrWithTasks.push({
        name: taskName,
        time: addTime,
        status: taskStatus,
        taskId: taskId
    })
};

const addTasksToPage = () => {
    let obj;

    document.getElementById('toDoList').innerHTML = '';
    arrWithTasks.forEach(function (item) {
        obj = item;
        document.getElementById('toDoList').innerHTML += `
        <div id =${obj.taskId} class='task-block'>
               <div>
                    <div>
                        <p class='taskName'>${obj.name}</p>
                    </div>
                    <p class='time'>${obj.time}</p>     
               </div>
               <div> 
                    ${obj.status ? ' <a id="cancelButton" onclick="cancel(this.id)">Cancel</a>' : '<a  id="acceptButton" class="accept-button" onclick="confirm(this.id)">Complete</a>'}
                    ${obj.status ? '<a  id="acceptButton" class="ready-text" onclick="confirm(event)">Ready</a>' : ''}
                    <a id="removeButton" onclick="remove(event)" class="delete-button">Delete</a>
                </div>
            </div>
        `;
    });
};

const appendixTask = () => {
    const taskName = document.getElementById('TaskNameWriter').value;
    const taskId = +new Date;
    const taskAddTime = getAddTime();
    let taskStatus = false;
    trueWritingName = true;

    checkTaskName(taskName);
    if (trueWritingName) {
        document.getElementById('TaskNameWriter').value = '';

        addThisTaskToArray(taskName, taskAddTime, taskStatus, taskId);
        addTasksToPage();

        localStorage.setItem('tasks', JSON.stringify(arrWithTasks));
    }
};

const confirm = (taskId) => {
    const idOfThisTask = event.target.parentNode.parentNode.id;
    let obj;

    arrWithTasks.forEach(function (item, i,) {
        obj = item;
        if (obj.taskId === Number(idOfThisTask)) {
            obj.status = true;
        }
    });

    document.getElementById('toDoList').innerHTML = '';
    addTasksToPage();

    localStorage.setItem('tasks', JSON.stringify(arrWithTasks));
};

const cancel = (taskStatus) => {
    const idOfThisTask = event.target.parentNode.parentNode.id;
    let obj;

    arrWithTasks.forEach(function (item, i,) {
        obj = item;
        if (obj.taskId === Number(idOfThisTask)) {
            obj.status = false;
        }
    });

    document.getElementById('toDoList').innerHTML = '';
    addTasksToPage();

    localStorage.setItem('tasks', JSON.stringify(arrWithTasks));
};

const remove = (event) => {
    const idOfThisTask = event.target.parentNode.parentNode.id;
    let obj;

    arrWithTasks.forEach(function (item, i,) {
        obj = item;
        if (obj.taskId === Number(idOfThisTask)) {
            arrWithTasks.splice(i, 1);
        }
    });

    addTasksToPage();

    localStorage.setItem('tasks', JSON.stringify(arrWithTasks));
};

const removeReadyTasks = () => {
    let obj;

    const searchReadyTasks = () => {
        arrWithTasks.forEach(function (item, i,) {
            obj = item;
            if (obj.status === true) {
                arrWithTasks.splice(i, 1);
                searchReadyTasks()
            }
        });
    };

    searchReadyTasks();
    addTasksToPage();

    localStorage.setItem('tasks', JSON.stringify(arrWithTasks));
};

const removeAllTasks = () => {
    document.getElementById('toDoList').innerHTML = '';
    arrWithTasks = [];
    localStorage.clear();
};
