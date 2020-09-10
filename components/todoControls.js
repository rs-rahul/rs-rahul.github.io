const templateTodoControls = document.createElement("template");

templateTodoControls.innerHTML = `
<style>
  ul {
    padding-left: 0;
  }
  ul li {
    display: inline-block;
    padding: 5px 15px;
    background-color: #757575;
    color: #fff;
    cursor: pointer;
    min-width: 50px;
    text-align: center;
  }

  ul li:hover {
    background-color: #555;
  }
</style>
<ul>
  <li id="all">All</li>
  <li id="active">Active</li>
  <li id="completed">Completed</li>
</ul>
`;

/**
 * Menu for filtering Todo into three categories: All, Active and Completed
 */
class TodoControls extends HTMLElement {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoControls.content.cloneNode(true));
  }

  /**
   * Filters todo
   * @param {string} option 
   */
  filterList(option) {
    filterTodo(option);
  }

  /**
   * Life cycle method called when component is mounted
   */
  connectedCallback() {
    this.shadowRoot
      .querySelector("#all")
      .addEventListener("click", (e) => this.filterList(FILTER_OPTION.all));

    this.shadowRoot
      .querySelector("#active")
      .addEventListener("click", (e) => this.filterList(FILTER_OPTION.active));

    this.shadowRoot
      .querySelector("#completed")
      .addEventListener("click", (e) => this.filterList(FILTER_OPTION.completed));
  }

  /**
   * Life cycle method called when component is unmounted
   */
  disconnectedCallback() {
    this.shadowRoot.querySelector("#all").removeEventListener("click");
    this.shadowRoot.querySelector("#active").removeEventListener("click");
    this.shadowRoot.querySelector("#completed").removeEventListener("click");
  }
}

window.customElements.define("todo-controls", TodoControls);
