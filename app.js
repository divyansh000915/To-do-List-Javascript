//DOM Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Function
function addTodo (Event){
    //To Prevent from Submitting
    event.preventDefault();
    
    //console.log("hello")
    
    //ToDo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO Local Storage
    saveLocalTodos(todoInput.value);
    
    //CHECK MARK Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //CLEAR TODO InputValue
    todoInput.value="";
    

}
//Function to delete

function deleteCheck(e){
    //console.log(e.target);
    const item = e.target;

    //DELETE TODO
    if (item.classList[0]==="trash-btn"){
        //item.remove();
        const todo = item.parentElement;
        //Animation
          todo.classList.add("fall");
          removeLocalTodos(todo);
            todo.addEventListener('transitionend', function(){
            todo.remove(); 
        }); 
    }

    //CHECK MARK
    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
//Filtering Function

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
       switch(e.target.value){
            case "all" :
                todo.style.display = "flex";
               break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                }
                break;
            case "incomplete" :
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
        }
   });
}

function saveLocalTodos(todo){
    //CHECK IF A TODO LIST ALREADY THERE?

    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
} 

//localStorage.clear();

function getTodos(){
    //console.log("The Fk?");
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //ToDo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO Local Storage
    //saveLocalTodos(todoInput.value);
    
    //CHECK MARK Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
