const API_URL = 'http://localhost:3000/Tasks';

window.onload = function() {
    fetchTasks();
};

function fetchTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            displayTasks(data);
        });
};

function displayTasks(tasks) {
    const taskList = document.getElementById('todoList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        li.setAttribute('data-id', task.ID);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(task.ID);
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
};

function addTask() {
    const input = document.getElementById('taskInput');
    const taskdec = input.value.task;
    input.value = '';

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',

        },
        body: JSON.stringify({
            task: taskdec
        }),
    })
    .then(response => response.json())
    .then(data => {
        fetchTasks();
    });
};

function deleteTask(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        frtchTodos();
    });
};
