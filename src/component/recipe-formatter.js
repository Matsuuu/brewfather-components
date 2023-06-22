import { LitElement, html } from "lit";

export class RecipeFormatter extends LitElement {

    onFileChange(event) {
        console.log(event);
    }

    render() {
        return html`
        <form>
            <input type="file" accept=".json" />
        </form>
        `
    }
}

if (!customElements.get("recipe-formatter")) {
    customElements.define("recipe-formatter", RecipeFormatter);
}