let month;
let dayOfMonth;
let arrWithNames = [];
let arrWithTasks = [];
let task;

window.onload = () => {
   document.getElementById('toDoList').innerHTML = localStorage.getItem('save');
};

const doTrueWritingDate = () => {
    if (month < 10) {
        month += 1;
        month = '0' + month;
    }
    if (dayOfMonth < 10) {
        dayOfMonth = '0' + dayOfMonth;
    }
};


const confirm = (event) => {
    const eventElement = event.target;
    eventElement.className = 'ready-text';
    eventElement.innerHTML = 'Выполнено';
    localStorage.setItem('save', document.getElementById('toDoList').innerHTML);
};

const remove = (event) => {
    const eventElement = event.target;
    const parentElement = document.getElementById('toDoList');

    parentElement.removeChild(eventElement.parentNode.parentNode);
    arrWithNames = [];
    arrWithTasks = document.getElementsByClassName('task-block');

    for (let i = 0; i < arrWithTasks.length; i++) {
        arrWithNames.push(document.getElementsByClassName('taskName')[i].textContent);
    }

    localStorage.setItem('save', document.getElementById('toDoList').innerHTML);
};

const appendixTask = () => {
    const date = new Date();
    const year = date.getFullYear();
    let checkTaskName = 1;
    const name = document.getElementById('TaskNameWriter').value;

    month = date.getMonth();
    dayOfMonth = date.getDate();
    doTrueWritingDate();

    arrWithNames.forEach(function (item, i, arrWithNames) {
        if (item === name) {
            checkTaskName = 0;
        }
    });

    if (checkTaskName) {
        task = ` <div class='task-block'>
                <div>
                    <div><p class='taskName'>${name}</p></div>
                    <p class='time'>${dayOfMonth} . ${month} . ${year}</p>
                </div>
                <div>
                   <a  id="acceptButton" class="accept-button" onclick="confirm(event)">Выполнить</a>
                    <a id="removeButton" onclick="remove(event)" class="delete-button">Удалить</a>
                </div>
            </div>`;

        document.getElementById('TaskNameWriter').value = '';
        document.getElementById('toDoList').innerHTML += `${task}`;
        localStorage.clear();
        arrWithNames = [];
        arrWithTasks = document.getElementsByClassName('task-block');

        for (let i = 0; i < arrWithTasks.length; i++) {
            arrWithNames.push(document.getElementsByClassName('taskName')[i].textContent);
        }
        localStorage.setItem('save', document.getElementById('toDoList').innerHTML);
    }
};

const removeAllTasks = () => {
    document.getElementById('toDoList').innerHTML = '';
    arrWithNames = [];
    arrWithTasks = [];
    localStorage.clear();
};
