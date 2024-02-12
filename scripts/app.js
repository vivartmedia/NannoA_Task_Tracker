import { addTask, editTask, tasks } from './taskManager.js';

// Renders tasks based on their status
const renderTasks = () => {
    // Define containers for each status category
    const todoContainer = document.getElementById('todo-tasks');
    const inProgressContainer = document.getElementById('inprogress-tasks');
    const completedContainer = document.getElementById('completed-tasks');

    // Clear existing tasks
    [todoContainer, inProgressContainer, completedContainer].forEach(container => {
        container.innerHTML = '<h2 class="text-lg font-bold mb-2">' + container.dataset.status + '</h2>';
    });

    // Iterate over tasks and append them to the appropriate container
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-teal-700 p-4 rounded-lg shadow mb-4';
        taskElement.innerHTML = `
            <h3 class="text-xl font-bold">${task.name}</h3>
            <p>${task.description}</p>
            <p>Priority: ${task.priority}, Due: ${task.dueDate}</p>
            <button class="edit-task bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${task.id}">Edit</button>
        `;

        switch (task.status) {
            case 'ToDo':
                todoContainer.appendChild(taskElement);
                break;
            case 'InProgress':
                inProgressContainer.appendChild(taskElement);
                break;
            case 'Complete':
                completedContainer.appendChild(taskElement);
                break;
        }
    });
};

// Handles clicking the edit button on any task
document.getElementById('tasks-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-task')) {
        const taskId = event.target.getAttribute('data-id');
        const taskToEdit = tasks.find(task => task.id.toString() === taskId);

        // Populate the form for editing
        document.getElementById('task-id').value = taskId;
        document.getElementById('task-name').value = taskToEdit.name;
        document.getElementById('task-description').value = taskToEdit.description;
        document.getElementById('task-status').value = taskToEdit.status;
        document.getElementById('priority-status').value = taskToEdit.priority;
        document.getElementById('due-date').value = taskToEdit.dueDate;

        // Switch to Update Task mode
        document.querySelector('#task-form button[type="submit"]').textContent = 'Update Task';
    }
});

// Handles adding a new task or updating an existing one
const handleFormSubmit = (event) => {
    event.preventDefault();

    const taskId = document.getElementById('task-id').value;
    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;
    const taskStatus = document.getElementById('task-status').value;
    const priorityStatus = document.getElementById('priority-status').value;
    const dueDate = document.getElementById('due-date').value;

    const taskDetails = {
        name: taskName,
        description: taskDescription,
        status: taskStatus,
        priority: priorityStatus,
        dueDate: dueDate
    };

    if (taskId) {
        editTask(taskId, taskDetails);
    } else {
        addTask({ ...taskDetails, id: Date.now().toString() });
    }

    // Reset the form to default state
    document.getElementById('task-form').reset();
    document.querySelector('#task-form button[type="submit"]').textContent = 'Add Task';
    document.getElementById('task-id').value = '';

    // Re-render tasks to reflect changes
    renderTasks();
};

document.getElementById('task-form').addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', renderTasks);
