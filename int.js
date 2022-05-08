const form = document.querySelector(".todo_form");
const input = document.querySelector(".task_title");
const taskin= document.querySelector(".task_descr");
const date = document.querySelector(".task_date");
const todo_container = document.querySelector(".todo_container");

//let deleteBtn;
//let checkboxes;

const startConf = () => {
    // baslangic ayarlari
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
       localStorage.setItem("todos", JSON.stringify([]));
    } else {
        todos.forEach((todo) =>{
            addHTML(todo);
        });
        /* deleteBtn = document.querySelectorAll("todo_delete");
        console.log(deleteBtn);
        deleteBtn.forEach(btn => btn.addEventListener("click",deleteTodo));
        checkboxes.forEach(btn => btn.addEventListener("click", completeTodo)); */
    }
 }
 //startConf();

 const addTodo = (e) => {
    e.preventDefault(); //sayfayı sürekli yenilemeyi engelliyor
    
    const todoText =input.value;
    const todoDesc =taskin.value;
    const todoDate =date.value;

    if (todoText == '' || todoDesc =='' || todoDate=='')  { // boş değer girilmeye çalışıyor ise hata veriyoruz
        input.style.border = '1px solid tomato';
        taskin.style.border = '1px solid tomato';
        date.style.border = '1px solid tomato';
        setTimeout(() => {
           input.style.borderColor = 'transparent';
           taskin.style.borderColor = 'transparent';
           date.style.borderColor = 'transparent';
        }, 2500);
        alert("Dear Shiva Gupta, please enter task title, task description and task date :D");
        return false;
    }
    const todo = {
        text:todoText,
        textdescription:todoDesc,
        date:todoDate,
        isCompleted:false,
    };
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    
    addHTML(todo);

    form.reset();

}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[0].textContent;
 
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));
    todo.remove();
    //deleteBtn = document.querySelectorAll("todo_delete");
 
    
}
const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[0].textContent;
 
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));
    todo.remove();

    input.value = text;

}

window.onload = function(){
    // LOCAL STORAGE EKLEMEYE ÇALIŞ
    const dragArea = document.querySelector(".todo_container");
    new Sortable(dragArea,{
    animation:500
    });
};  

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[0].textContent;
 
    let todos = JSON.parse(localStorage.getItem("todos"));
    
    todos.forEach(td => {
       if (td.text === text) td.isCompleted = !td.isCompleted 
    });
 
    localStorage.setItem("todos", JSON.stringify(todos));
}
 const addHTML = (todo) => {
    const tasksDiv = document.createElement("div");
    tasksDiv.classList.add("tasks");

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task_left");

    const todoTitle = document.createElement("span");
    todoTitle.classList.add("todo_title2");
    todoTitle.textContent = todo.text;

    const todoDescr = document.createElement("span");
    todoDescr.classList.add("todo_desc");
    todoDescr.textContent = todo.textdescription;

    const todoDatee= document.createElement("time");
    todoDatee.classList.add("todo_date");
    todoDatee.textContent = todo.date;

    taskLeft.appendChild(todoTitle);
    taskLeft.appendChild(todoDescr);
    taskLeft.appendChild(todoDatee);

    const taskRight = document.createElement("div");
    taskRight.classList.add("task_right");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo_delete");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTodo);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("todo_edit");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editTodo); 

    /*const saveBtn = document.createElement("button");
    saveBtn.classList.add("todo_save");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", saveTodo); */ 

    const todoCb = document.createElement("input");
    todoCb.type = "checkbox";
    todoCb.checked =todo.isCompleted;
    todoCb.classList.add("todo_cb");
    todoCb.addEventListener("click",completeTodo);

    taskRight.appendChild(deleteBtn);
    taskRight.appendChild(editBtn);
   // taskRight.appendChild(saveBtn);
    taskRight.appendChild(todoCb);


    tasksDiv.appendChild(taskLeft);
    tasksDiv.appendChild(taskRight);
    
    todo_container.appendChild(tasksDiv);

}

 startConf();

form.addEventListener("submit",addTodo);

 
