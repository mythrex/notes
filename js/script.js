let todoItems = [];
window.onload = function(){
  var newtodo = document.getElementById('newtodo');
  var addtodo = document.getElementById('addtodo');
  var todolist = document.getElementById('todolist');

  refreshTodo();
  addtodo.onclick = () => {
    addAndSave(newtodo.value);
  }

  //for making list with checkbox
  function appendItemsToList(list,idItem,itemObj){
    var li = document.createElement('li');
    var input = document.createElement('input');
    var label = document.createElement('label');
    var upBtn = document.createElement('a');
    var downBtn = document.createElement('a');
    li.className = "list-item";
    input.className = "filled-in";
    input.id = "list-item-"+idItem;
    input.type="checkbox";
    input.addEventListener('click',doneSelf);
    if(itemObj.done){
      label.style.textDecoration = "line-through";
      input.checked =   true;
    }
    else{
      label.style.textDecoration = "none";
      input.checked =   false;
    }
    label.htmlFor = "list-item-"+idItem;
    label.textContent = itemObj.task;
    upBtn.className = "material-icons up";
    upBtn.textContent = "keyboard_arrow_up";
    downBtn.className = "material-icons down";
    downBtn.textContent = "keyboard_arrow_down";
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    list.appendChild(li);
  }

  function setItemArrayToList(list,itemArray){//for retreiving from array and putting it into list
    list.innerHTML = '';
    for (index in itemArray)
      appendItemsToList(list,index,itemArray[index]);
  }

  function retrieveTodos(){
    let todoInStore = localStorage.getItem('todoList');
    if(todoInStore){
      todoItems = JSON.parse(todoInStore);
    }
  }

  function refreshTodo(){
    retrieveTodos();
    setItemArrayToList(todolist,todoItems);
  }

  function addAndSave(itemText){
    todoItems.push({
      task: itemText,
      done: false
    });
    localStorage.setItem('todoList',JSON.stringify(todoItems));
    refreshTodo();
  }

  function doneSelf(event){
    let id = event.target.id.split('-')[2];
    console.log("The checkbox with id"+id+" is clicked.");
    if(event.target.checked){
      todoItems[id].done = true;
    }
    else {
      todoItems[id].done = false;
    }
    localStorage.setItem('todoList',JSON.stringify(todoItems));
    refreshTodo();
  }

}
