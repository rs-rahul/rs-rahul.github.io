const templateTodoList = document.createElement("template");

templateTodoList.innerHTML = `
<style>
  li {
    text-decoration: none;
    cursor: pointer;
  }

  .strike {
    text-decoration: line-through;
  }
</style>
<ul></ul>
`;

/**
 * TodoList class
 */
class TodoList extends HTMLElement {
  /**
   * Returns an array of attributes to be monitored for change, delete or add
   */
  static get observedAttributes() {
    return ["list"];
  }

  /**
   * Constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoList.content.cloneNode(true));

    this.getIndexOfItem = this.getIndexOfItem.bind(this);
    this.handleListAttributeChange = this.handleListAttributeChange.bind(this);
    this.removeListDom = this.removeListDom.bind(this);
  }

  /**
   * It returns the index of li in the ul element where todoItem is present
   * @param {Object} todoItem 
   */
  getIndexOfItem(todoItem) {
    const lis = this.shadowRoot.querySelector("ul").children;

    let index = -1;

    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const id = parseInt(li.getAttribute("data-id"));

      if (id === todoItem.id) {
        index = i;
      }
    }

    return index;
  }

  /**
   * Changes the completion state of the todoItem
   * @param {Object} e 
   */
  toggleListState(e) {
    toggleList(e.target.getAttribute("data-id"));
  }

  /**
   * Renders only those todo items that are present in the state variable newList
   * @param {Array} newList 
   */
  removeListDom(newList) {
    const ul = this.shadowRoot.querySelector("ul");

    while (ul.firstChild) {
      let found = false;
      newList.forEach((item) => {
        if (item.id == ul.firstChild.id) {
          found = true;
        }
      });

      if (!found) {
        ul.removeChild(ul.firstChild);
      }
    }
  }

  /**
   * Renders todo items
   * @param {Array} newList 
   */
  handleListAttributeChange(newList) {
    this.removeListDom(newList);

    newList.forEach((todoItem) => {
      const index = this.getIndexOfItem(todoItem);
      let li;

      if (index === -1) {
        li = document.createElement("li");
        li.addEventListener("click", this.toggleListState);
      } else {
        li = this.shadowRoot.querySelector("ul").children[index];
      }

      li.setAttribute("data-id", `${todoItem.id}`);

      if (todoItem.completed) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }

      li.textContent = todoItem.text;

      this.shadowRoot.querySelector("ul").appendChild(li);
    });
  }

  /**
   * The method is called every time watachable attributes are added, changed or deleted
   * @param {string} name 
   * @param {*} oldVal 
   * @param {*} newVal 
   */
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "list") {
      let oldList, newList;
      try {
        oldList = oldVal ? JSON.parse(oldVal) : [];
        newList = newVal ? JSON.parse(newVal) : [];
      } catch {
        oldList = [];
        newList = [];
      }

      this.handleListAttributeChange(newList);
    }
  }
}

window.customElements.define("todo-list", TodoList);
