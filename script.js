window.addEventListener('load', () => {
    const form = document.getElementById("new-task-form");
    const input = document.querySelector('#new-task-input');
    const list_ele = document.querySelector('#tasks');

    // Function to add task to the list
    const addTaskToList = (taskContent) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_ele = document.createElement("input");
        task_input_ele.classList.add("text");
        task_input_ele.type = "text";
        task_input_ele.value = taskContent;
        task_input_ele.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_ele);

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("actions");

        const task_edit_elem = document.createElement("button");
        task_edit_elem.classList.add("edit");
        task_edit_elem.innerHTML = "edit";

        const task_delete_elem = document.createElement("button");
        task_delete_elem.classList.add("delete");
        task_delete_elem.innerHTML = "Delete";

        task_action_el.appendChild(task_edit_elem);
        task_action_el.appendChild(task_delete_elem);

        task_el.appendChild(task_action_el);

        list_ele.appendChild(task_el);

        // Event listener for editing task
        task_edit_elem.addEventListener('click', () => {
            if (task_edit_elem.innerText.toLowerCase() == "edit") {
                task_input_ele.removeAttribute("readonly");
                task_input_ele.focus();
                task_edit_elem.innerText = "save";
            } else {
                task_input_ele.setAttribute("readonly", "readonly");
                task_edit_elem.innerText = "Edit";
                saveTasksToLocalStorage(); // Save tasks after editing
            }
        });

        // Event listener for deleting task
        task_delete_elem.addEventListener('click', () => {
            list_ele.removeChild(task_el);
            saveTasksToLocalStorage(); // Save tasks after deletion
        });
    };

    // Function to load tasks from local storage
    const loadTasksFromLocalStorage = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task);
        });
    };

    // Function to save tasks to local storage
    const saveTasksToLocalStorage = () => {
        const tasks = Array.from(list_ele.children).map(task => task.querySelector('.text').value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert("please fill the task");
            return;
        }

        addTaskToList(task);
        input.value = "";
        saveTasksToLocalStorage(); // Save tasks after adding new task
    });
});
