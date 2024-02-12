// taskManager.js

import { saveTasks, getTasks } from './storage.js';

let tasks = getTasks(); // Load tasks from storage on start

const addTask = (task) => {
    tasks.push(task);
    saveTasks(tasks);
};

const editTask = (id, updatedTask) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    saveTasks(tasks);
};

export { addTask, editTask, tasks };
