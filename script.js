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

function showTasks() {
    taskList.innerHTML = "";
    checkOverdue();
  
    const sFilter = statusFilter.value;
    const cFilter = categoryFilter.value.toLowerCase();
  
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const matchStatus = !sFilter || task[3] === sFilter;
      const matchCategory = !cFilter || task[1].toLowerCase().includes(cFilter);
  
      if (matchStatus && matchCategory) {
        const li = document.createElement("li");
        li.innerHTML = `
          ${task[0]} | ${task[1]} | ${task[2]} | 
          <select data-index="${i}">
            <option ${task[3] === "In Progress" ? "selected" : ""}>In Progress</option>
            <option ${task[3] === "Completed" ? "selected" : ""}>Completed</option>
            <option ${task[3] === "Overdue" ? "selected" : ""}>Overdue</option>
          </select>
          <button data-delete="${i}">Delete</button>
        `;
        taskList.appendChild(li);
      }
    }
  
    setupStatusDropdowns();
    setupDeleteButtons();
  }

  function setupDeleteButtons() {
    const deletes = document.querySelectorAll("button[data-delete]");
    deletes.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const i = btn.getAttribute("data-delete");
        tasks.splice(i, 1);
        saveTasks();
        showTasks();
      });
    });
  }
  
  function checkOverdue() {
    const today = new Date().toISOString().split("T")[0];
    for (let i = 0; i < tasks.length; i++) {
      const deadline = tasks[i][2];
      const status = tasks[i][3];
      if (status !== "Completed" && deadline < today) {
        tasks[i][3] = "Overdue";
      }
    }
  }
  