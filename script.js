let tasks = []

const nameInput = document.getElementById("taskName")
const categoryInput = document.getElementById("taskCategory")
const deadlineInput = document.getElementById("taskDeadline")
const statusInput = document.getElementById("taskStatus")
const addBtn = document.getElementById("addTaskBtn")

addBtn.addEventListener("click", function(){
    const task = [
        nameInput.value,
        categoryInput.value,
        deadlineInput.value,
        statusInput.value
    ]
    if (task[0] && task[1] && task[2]){
        tasks.push(task)
        saveTasks()
        clearInputs()
        showTasks()
    }
})

function clearInputs(){
    nameInput.value = ""
    categoryInput.value = ""
    deadlineInput.value = ""
    statusInput.value = "In Progress"
}