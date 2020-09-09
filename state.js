const FILTER_OPTION = {
  all: "all",
  active: "active",
  completed: "completed",
};

let list = [];

function refreshListAttribute(list) {
  const todoDOM = document.querySelector("#todoList");
  todoDOM.setAttribute("list", JSON.stringify(list));
}

function addList(listItem) {
  list = [...list, listItem];
  refreshListAttribute(list);
}

function toggleList(id) {
  id = parseInt(id);

  list = list.map((item) => {
    if (item.id == id) {
      return { ...item, completed: !item.completed };
    } else {
      return item;
    }
  });
  refreshListAttribute(list);
}

function filterTodo(option) {
  let filteredList;
  switch (option) {
    case FILTER_OPTION.completed:
      filteredList = list.filter((item) => item.completed);
      refreshListAttribute(filteredList);
      break;
    case FILTER_OPTION.active:
      filteredList = list.filter((item) => !item.completed);
      refreshListAttribute(filteredList);
      break;
    default:
      refreshListAttribute(list);
  }
}

refreshListAttribute(list);
