const templateTodoControls = document.createElement("template");

templateTodoControls.innerHTML = `
<button id="all">All</button>
<button id="active">Active</button>
<button id="completed">Completed</button>
`;

class TodoControls extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoControls.content.cloneNode(true));
  }

  filterList(option) {
    filterTodo(option);
  }

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

  disconnectedCallback() {
    this.shadowRoot.querySelector("#all").removeEventListener("click");
    this.shadowRoot.querySelector("#active").removeEventListener("click");
    this.shadowRoot.querySelector("#completed").removeEventListener("click");
  }
}

window.customElements.define("todo-controls", TodoControls);
