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

  tasks.forEach((task, i) => {
    const matchStatus = !sFilter || task[3] === sFilter;
    const matchCategory = !cFilter || task[1].toLowerCase().includes(cFilter);

    if (matchStatus && matchCategory) {
      const li = document.createElement("li");

      const taskText = document.createTextNode(`${task[0]} | ${task[1]} | ${task[2]} | `);
      li.appendChild(taskText);

      const select = document.createElement("select");
      ["In Progress", "Completed", "Overdue"].forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        if (task[3] === status) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      select.addEventListener("change", () => {
        tasks[i][3] = select.value;
        saveTasks();
        showTasks();
      });

      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.addEventListener("click", () => {
        tasks.splice(i, 1);
        saveTasks();
        showTasks();
      });

      li.appendChild(select);
      li.appendChild(btn);
      taskList.appendChild(li);
    }
  });
}
  
  function checkOverdue() {
    const today = new Date().toISOString().split("T")[0]
    for (let i = 0; i < tasks.length; i++) {
      const deadline = tasks[i][2]
      const status = tasks[i][3]
      if (status !== "Completed" && deadline < today) {
        tasks[i][3] = "Overdue"
      }
    }
  }
  
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
  
  function loadTasks() {
    const saved = localStorage.getItem("tasks")
    if (saved) {
      tasks = JSON.parse(saved)
    }
    showTasks()
  }
  
  statusFilter.addEventListener("change", showTasks)
  categoryFilter.addEventListener("input", showTasks)
  
  window.onload = loadTasks