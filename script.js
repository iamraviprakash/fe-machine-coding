// Features
// * Show the Todo records
// * Search the Todos
// * Sort Todos based on name
// * Paginate the records

/*
Dashboard
- Search bar
- Todo list
*/

function getSearchComponent({ rootElement, onSearch }) {
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("searchContainer");

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search by Name";
  searchContainer.append(searchInput);

  searchInput.addEventListener("keyup", onSearch);

  rootElement.append(searchContainer);
}

function getTodoItem({ todoData }) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todoContainer");

  const title = document.createElement("div");
  title.innerHTML = "title: " + todoData.todo;
  todoContainer.append(title);

  const status = document.createElement("div");
  status.innerHTML = "Status: " + todoData.completed;
  todoContainer.append(status);

  return todoContainer;
}

function getTodoList({ rootElement, todoList }) {
  console.log("Hello Change");
  const listContainer = document.createElement("div");
  listContainer.id = "todoList";
  listContainer.classList.add("listContainer");

  todoList.map((item) => {
    const todoElement = getTodoItem({ todoData: item });
    listContainer.append(todoElement);
  });

  rootElement.append(listContainer);
}

function clearTodoList() {
  document.getElementById("todoList").remove();
}

function getSortComponent({ rootElement, onSort }) {
  const sortContainer = document.createElement("select");
  sortContainer.classList.add("sorContainer");

  const opt1Container = document.createElement("option");
  opt1Container.innerHTML = "ASC";
  opt1Container.value = "ASC";
  sortContainer.append(opt1Container);

  const opt2Container = document.createElement("option");
  opt2Container.innerHTML = "DESC";
  opt2Container.value = "DESC";
  sortContainer.append(opt2Container);

  sortContainer.addEventListener("change", onSort);

  rootElement.append(sortContainer);
}

async function getTodoDashboard({ rootElement }) {
  // fetch data
  // show search component
  // show Todo feed
  let filteredData = [];

  const response = await fetch("https://dummyjson.com/todos/", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    filteredData = data.todos;

    function onSearch(e) {
      console.log(e.target.value);
      const searchTerm = e.target.value;

      filteredData = searchTerm
        ? data.todos.filter((todoItem) => {
            return (
              todoItem.todo.includes(searchTerm) ||
              todoItem.id.toString().includes(searchTerm)
            );
          })
        : data.todos;

      console.log({ filteredData });

      clearTodoList();
      getTodoList({
        rootElement,
        todoList: filteredData,
      });
    }

    function onSort(e) {
      const sortBy = e.target.value;

      if (sortBy == "ASC") {
        filteredData = filteredData.sort((a, b) => (a.todo > b.todo ? 1 : -1));
      } else {
        filteredData = filteredData.sort((a, b) => (a.todo > b.todo ? -1 : 1));
      }

      clearTodoList();
      getTodoList({
        rootElement,
        todoList: filteredData,
      });
    }

    getSearchComponent({ rootElement, onSearch });
    getSortComponent({ rootElement, onSort });
    getTodoList({ rootElement, todoList: filteredData });
  }
}

function App() {
  const rootElement = document.getElementById("root");
  rootElement.classList.add("container");

  getTodoDashboard({ rootElement });
}

App();
