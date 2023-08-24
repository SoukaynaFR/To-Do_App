let input=  document.querySelector(".input");
let submit=  document.querySelector(".add");
let tasksDiv=  document.querySelector(".tasks");

// An empty array to store the tasks 
 let arrayOfTasks = [];

 // Check if there's tasks in local storage
 if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
 }

 // Trigger getDataFromLocalStorage
 getDataFromLocalStorage();


//Add task
submit.onclick=function(){
    if (input.value != ""){
        addTaskToarray(input.value); // add task to array of tasks
        input.value= ""; // empty the input   
    }
}

// Click on Task Element
tasksDiv.addEventListener("click", (e)=>{
    //delete button
    if (e.target.classList.contains("del")){
      // Remove elemnt from local storage
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      // Remove elemnt from page
    e.target.parentElement.remove();
    }
 // task element 
 if (e.target.classList.contains("task")){
    // Toggel completed for the task 
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle done class
    e.target.classList.toggle("done");
 }
});

function addTaskToarray(taskText){
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push task to array of tasks
  arrayOfTasks.push(task);
  // Add tasks to Page
  addElementsToPageFrom(arrayOfTasks);
  // Add tasks to local storage
  addDtataToLocalStorageFrom(arrayOfTasks);

  // For testing purposes
  console.log(arrayOfTasks);
  console.log(JSON.stringify(arrayOfTasks));


}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty task Div
    tasksDiv.innerHTML =  "";
    // Looping on array of tasks
    arrayOfTasks.forEach(task => {
        // Create main div
        let div= document.createElement("div");
        div.className= "task";
        // Check if task is done
        if(task.completed){
            div.className= "task done";

        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append button to main div
        div.appendChild(span);
        // Add task Div to Tasks container
        tasksDiv.appendChild(div);
       

    });
}

function addDtataToLocalStorageFrom(arrayOfTasks){
window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
   arrayOfTasks = arrayOfTasks.filter((task) =>task.id !=taskId);
   addDtataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for ( let i = 0 ; i < arrayOfTasks.length; i++ ) {
        if ( arrayOfTasks[i].id == taskId ) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDtataToLocalStorageFrom(arrayOfTasks);
}