const getTaskNode = ({ id, task, created_at, finished_at }) => {
  const checkbox = createHtmlElement("input", "checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = !!finished_at;
  checkbox.addEventListener(
    "click",
    () => markTaskStatus(checkbox.checked, id),
  );

  const taskContent = createHtmlElement("div", "task-content");
  taskContent.innerHTML = task;

  const addedDate = createHtmlElement("div", "added-date");
  addedDate.innerHTML = formatTime(created_at);

  const deleteButton = createHtmlElement("img", "delete-button");
  deleteButton.src = "./assets/delete.png";
  deleteButton.addEventListener("click", () => deleteTask(id, deleteButton));

  const taskDiv = createHtmlElement("div", "task-div");
  taskDiv.append(checkbox, taskContent, addedDate, deleteButton);

  return taskDiv;
};

const getTasks = async () => {
  try {
    const resp = await axios.get(
      "https://postgresql-server-mx5e.onrender.com/get-tasks",
    );
    return resp.data;
  } catch (err) {
    showToast("Error occured", "error");
    console.error(err);
    return [
      { task: "-----", finished_at: null },
      { task: "-----", finished_at: null },
      { task: "-----", finished_at: null },
    ];
  }
};

const putTasksToDisplay = async () => {
  await delay(400);
  const tasks = await getTasks();
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.append(...tasks.map(getTaskNode));

  loader.stop();
};

document.addEventListener("DOMContentLoaded", putTasksToDisplay);

const addTask = async () => {
  const task = document.getElementById("text-box");

  if (task.value.trim()) {
    try {
      loader.start();
      await delay(500);
      const resp = await axios.post(
        "https://postgresql-server-mx5e.onrender.com/add-task",
        {
          task: task.value,
        },
      );

      const itemsContainer = document.getElementById("items-container");
      itemsContainer.append(...resp.data.map(getTaskNode));

      showToast("Task added");
      task.value = "";
    } catch (error) {
      console.log(error);
      showToast("Failed to add task !", "error");
    } finally {
      loader.stop();
    }
  } else {
    showToast("Task cannot be empty", "warning");
  }
};

const deleteTask = async (id, currentNode) => {
  try {
    loader.start();
    await delay(500);
    await axios.post(
      "https://postgresql-server-mx5e.onrender.com/delete-task",
      { id },
    );
    currentNode.parentNode.remove();
    showToast("Task deleted");
  } catch (error) {
    console.log(error);
    showToast("Failed to delete task !", "error");
  } finally {
    loader.stop();
  }
};

const markTaskStatus = async (status, id) => {
  try {
    loader.start();
    await delay(500);

    await axios.post(
      "https://postgresql-server-mx5e.onrender.com/update-task-status",
      {
        id,
        status,
      },
    );

    showToast("Task status updated");
  } catch (error) {
    console.log(error);
    showToast("Failed to update task !", "error");
  } finally {
    loader.stop();
  }
};
