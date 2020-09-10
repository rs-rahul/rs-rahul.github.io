const FILTER_OPTION = {
  all: "all",
  active: "active",
  completed: "completed",
};

let list = [];

/**
 * Sets the attribute named list to the todoDOM
 * @param {Array} list 
 */
function refreshListAttribute(list) {
  const todoDOM = document.querySelector("#todoList");
  todoDOM.setAttribute("list", JSON.stringify(list));
}

/**
 * Adds a todo item
 * @param {Object} listItem 
 */
function addList(listItem) {
  list = [...list, listItem];
  refreshListAttribute(list);
}

/**
 * Updates the completed property
 * @param {string} id 
 */
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

/**
 * Filters todo list
 * @param {string} option 
 */
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
