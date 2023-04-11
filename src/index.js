
document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector('#create-task-form');

  document.querySelector('#main-content').style.backgroundColor = 'blue';

  document.querySelector('#create-task-form label').style.backgroundColor = 'red'

  const inputPlaceholderStyle = document.createElement('style');
inputPlaceholderStyle.innerHTML = `
  #new_task_description::placeholder {
    color: orange;
  }`;
document.head.appendChild(inputPlaceholderStyle);

  document.querySelector('#list').style.backgroundColor = 'yellow'
  
  let mainH1 = document.querySelector('#main-content h1');
  mainH1.textContent = 'Franklin Daily Chores';

  let listHeader = document.querySelector('#list h2');
  listHeader.textContent = 'Daily Tasks:';

  form.addEventListener('submit', (e) =>{
    e.preventDefault();
    createToDo(e.target.new_task_description.value);
    form.reset();
    
  })
 });

function createToDo(todo){
  let li = document.createElement('li');

  let taskToDo = document.createElement('span');
  taskToDo.textContent = `${todo} `;
  li.appendChild(taskToDo);

  let btnDelete = document.createElement('button');
  btnDelete.addEventListener('click', handleDelete);
  btnDelete.textContent = 'X';
  li.appendChild(btnDelete);

  let btnEdit = document.createElement('button');
  btnEdit.addEventListener('click', handleEdit);
  btnEdit.textContent = 'Edit';
  li.appendChild(btnEdit);

  document.querySelector('#tasks').appendChild(li)
}

function handleDelete(e){
  e.target.parentNode.remove()
}

function handleEdit(e) {
  let li = e.target.parentNode;
  let taskSpan = li.querySelector('span');
  let currentTaskText = taskSpan.textContent.slice(6); // how to edit from the beginning?

  let editInput = document.createElement('input');
  editInput.setAttribute('type', 'text');
  editInput.setAttribute('value', currentTaskText);

  // How to replace the current task text with the input field?
  li.insertBefore(editInput, taskSpan);
  taskSpan.style.display = 'none';

  // how to Change the 'Edit' button to 'Save'?
  e.target.textContent = 'Save';
  e.target.removeEventListener('click', handleEdit);
  e.target.addEventListener('click', handleSave);
}

function handleSave(e) {
  let li = e.target.parentNode;
  let taskSpan = li.querySelector('span');
  let editInput = li.querySelector('input');

  // Update the task text and remove the input field
  taskSpan.textContent = `Task: ${editInput.value} `;
  taskSpan.style.display = '';
  li.removeChild(editInput);

  // Change the 'Save' button back to 'Edit'
  e.target.textContent = 'Edit';
  e.target.removeEventListener('click', handleSave);
  e.target.addEventListener('click', handleEdit);
}

