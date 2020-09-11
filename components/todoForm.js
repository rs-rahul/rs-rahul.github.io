import { html } from "../node_modules/lit-html/lit-html.js";
import { render } from "../node_modules/lit-html/lib/render.js";

const templateTodoFormResult = () => html`
  <style></style>
  <form>
    <input name="text" placeholder="Enter todo text" />
    <button>Add</button>
  </form>
`;

/**
 * TodoForm class
 */
class TodoForm extends HTMLElement {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(templateTodoFormResult(), this.shadowRoot);
  }

  /**
   * Handles form submission
   * @param {Object} e 
   */
  handleFormSubmit(e) {
    e.preventDefault();
    const text = e.target.text.value;

    if (!text.trim()) return;

    addList({
      id: Date.now(),
      text,
      completed: false,
    });

    e.target.reset();
  }

  /**
   * Life cycle method called when component is mounted
   */
  connectedCallback() {
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.handleFormSubmit);
  }

  /**
   * Life cycle method called when component is unmounted
   */
  disconnectedCallback() {
    this.shadowRoot.querySelector("form").removeEventListener("submit");
  }
}

window.customElements.define("todo-form", TodoForm);
