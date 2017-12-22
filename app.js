// Define vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


const createDeleteLink = () => {
  const deleteLink = document.createElement('a');
  // Add class
  deleteLink.className = 'delete-item secondary-content';
  // Add title
  deleteLink.setAttribute('title', 'Delete');
  // Add text html
  deleteLink.innerHTML = '</i><i class="fa fa-remove"></i>';
  return deleteLink;
};

const createUpdateLink = () => {
  const updateLink = document.createElement('a');
  // Add class
  updateLink.className = 'update-item secondary-content';
  // Add title
  updateLink.setAttribute('title', 'Change');
  // Add text html
  updateLink.innerHTML = '<i class="fa fa-pencil"></i>';
  return updateLink;
};

const createSaveLink = () => {
  const saveLink = document.createElement('a');
  // Add class
  saveLink.className = 'save-item secondary-content';
  // Add title
  saveLink.setAttribute('title', 'Save');
  // Add text html
  saveLink.innerHTML = '<i class="fa fa-floppy-o"></i>';
  return saveLink;
};

const createNewTask = (taskText) => {
  // Create li element
  const task = document.createElement('li');
  // Add class to li
  task.className = 'collection-item';
  // Create textNode and appent to li
  task.appendChild(document.createTextNode(taskText));
  // Create new link element
  const deleteLink = createDeleteLink();
  // Append link to li
  task.appendChild(deleteLink);
  const updateLink = createUpdateLink();
  // Append link to li
  task.appendChild(updateLink);
  return task;
};

// Store task to local storage
const addTaskToLocalStorage = ((task) => {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } else {
    tasks = [];
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

// Get task from local storage
const getTasks = () => {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => {
      taskList.appendChild(createNewTask(task));
    });
  }
};

// Remove task from local storage
const removeTaskFromLocalStorage = (elem) => {
  let tasks;
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task !== elem.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

// Remove all tasks from local storage
const removeAllTaskFromLocalStorage = () => {
  localStorage.clear();
};

// Add task
const addTask = (e) => {
  e.preventDefault();
  const taskText = taskInput.value;

  if (taskText !== '') {
    const task = createNewTask(taskText);
    // Append li to ul
    taskList.appendChild(task);
    // Clear input
    taskInput.value = '';

    addTaskToLocalStorage(taskText);
  }
};

// Create update input
const createInput = (taskText) => {
  const div = document.createElement('div');
  div.className = 'input-fields col s6';
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('value', taskText);
  div.appendChild(input);
  return div;
};

// Update task
const updateTask = (e) => {
  const link = e.target.parentElement;
  const li = link.parentElement;
  let text = '';
  const foo = (event) => {
    text = event.target.value;
  };

  if (link.classList.contains('update-item')) {
    const inputDiv = createInput(li.textContent);
    const saveLink = createSaveLink();
    li.removeChild(li.firstChild);
    inputDiv.firstChild.addEventListener('keyup', foo);
    li.insertBefore(inputDiv, li.childNodes[0]);
    li.replaceChild(saveLink, li.childNodes[2]);
  }

  if (link.classList.contains('save-item')) {
    const updateLink = createUpdateLink();
    
    console.log(li.firstChild);
    // li.removeChild(li.firstChild);
    // input.firstChild.addEventListener('submit', foo);
    // li.insertBefore(input, li.childNodes[0]);
  }
};

// Remove task
const removeTask = (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
};

// Clear all tasks
const clearTasks = (e) => {
  e.preventDefault();
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  removeAllTaskFromLocalStorage();
};

// Filter tasks
const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  const tasks = document.querySelectorAll('.collection-item');
  tasks.forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
};

const loadEventListeners = () => {
  // Add DOM event load
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Add update item event
  taskList.addEventListener('click', updateTask);
  // Add remove item event
  taskList.addEventListener('click', removeTask);
  // Add remove all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Add filter event
  filter.addEventListener('keyup', filterTasks);
};

// Load all event listener
loadEventListeners();
