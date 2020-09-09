const templateTodoForm = document.createElement("template");

templateTodoForm.innerHTML = `
<style>

</style>
<form>
<input name="text" placeholder="Enter todo text">
<button>Add</button>
</form>
`;

class TodoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoForm.content.cloneNode(true));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const text = e.target.text.value;

    if(!text.trim()) return;

    addList({
      id: Date.now(),
      text,
      completed: false,
    });

    e.target.reset();
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.handleFormSubmit);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("form").removeEventListener("submit");
  }
}

window.customElements.define("todo-form", TodoForm);
