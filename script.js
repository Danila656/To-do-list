let month;
let dayOfMonth;
let arrWithNames = [];
let arrWithTasks = [];
let task;

window.onload = () => {
    arrWithTasks = JSON.parse(localStorage.getItem('save'));

    for (let i = 0; i < arrWithTasks.length; i++) {
        const obj = arrWithTasks[i];
        if (obj.status === 'Выполнено') {
            document.getElementById('toDoList').innerHTML += `
         <div class='task-block'>
                <div>
                    <div><p class='taskName'>${obj.name}</p></div>
                    <p class='time'>${obj.time}</p>
                </div>
                <div>
                   <a  id="acceptButton" class="ready-text side-class" onclick="confirm(event)">${obj.status}</a>
                    <a id="removeButton" onclick="remove(event)" class="delete-button">Удалить</a>
                </div>
            </div>
        `
        } else {
            document.getElementById('toDoList').innerHTML += `
         <div class='task-block'>
                <div>
                    <div><p class='taskName'>${obj.name}</p></div>
                    <p class='time'>${obj.time}</p>
                </div>
                <div>
                   <a  id="acceptButton" class="accept-button side-class" onclick="confirm(event)">${obj.status}</a>
                    <a id="removeButton" onclick="remove(event)" class="delete-button">Удалить</a>
                </div>
            </div>
        `
        }
    }
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
    const size = arrWithTasks.length;

    eventElement.className = 'ready-text side-class';
    eventElement.innerHTML = 'Выполнено';

    localStorage.clear();
    arrWithTasks = [];

    for (let i = 0; i < size; i++) {
        arrWithTasks.push({
            name: document.getElementsByClassName('taskName')[i].innerHTML,
            time: document.getElementsByClassName('time')[i].innerHTML,
            status: document.getElementsByClassName('side-class')[i].innerHTML
        });
    }
    localStorage.setItem('save', JSON.stringify(arrWithTasks));
};

const remove = (event) => {
    const eventElement = event.target;
    const parentElement = document.getElementById('toDoList');

    parentElement.removeChild(eventElement.parentNode.parentNode);

    arrWithNames = document.getElementsByClassName('taskName');

    localStorage.clear();
    arrWithTasks = [];

    for (let i = 0; i < arrWithNames.length; i++) {
        arrWithTasks.push({
            name: arrWithNames[i].textContent,
            time: document.getElementsByClassName('time')[i].textContent,
            status: document.getElementsByClassName('side-class')[i].textContent
        });
    }
    localStorage.setItem('save', JSON.stringify(arrWithTasks));
};

const appendixTask = () => {
    const date = new Date();
    const year = date.getFullYear();
    const name = document.getElementById('TaskNameWriter').value;
    let checkTaskName = 1;

    month = date.getMonth();
    dayOfMonth = date.getDate();
    doTrueWritingDate();

    arrWithTasks = document.getElementsByClassName('task-block');
    arrWithNames = [];

    for (let i = 0; i < arrWithTasks.length; i++) {
        arrWithNames.push(document.getElementsByClassName('taskName')[i].textContent);
    }

    if (name === '') {
        checkTaskName = 0;
    }
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
                   <a  id="acceptButton" class="accept-button side-class" onclick="confirm(event)">Выполнить</a>
                    <a id="removeButton" onclick="remove(event)" class="delete-button">Удалить</a>
                </div>
            </div>`;

        arrWithNames.push(name);
        document.getElementById('TaskNameWriter').value = '';
        document.getElementById('toDoList').innerHTML += `${task}`;

        localStorage.clear();
        arrWithTasks = [];

        for (let i = 0; i < arrWithNames.length; i++) {
            arrWithTasks.push({
                name: document.getElementsByClassName('taskName')[i].innerHTML,
                time: document.getElementsByClassName('time')[i].innerHTML,
                status: document.getElementsByClassName('side-class')[i].innerHTML
            });
        }
        localStorage.setItem('save', JSON.stringify(arrWithTasks));
    }
};

const removeAllTasks = () => {
    document.getElementById('toDoList').innerHTML = '';
    arrWithNames = [];
    arrWithTasks = [];
    localStorage.clear();
};

//Когда использовал forEach ,выдавало постоянно ошибку в консоли в браузере и код не работал.
