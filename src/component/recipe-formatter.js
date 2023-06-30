import { LitElement, html } from "lit";
import { getBrewFatherJsonFromFile } from "../parser/file-parser.js";
import { Recipe } from "../parser/recipe-parser.js";

export class RecipeFormatter extends LitElement {

    async onFileChange(event) {
        const fileInput = /** @type {HTMLInputElement} */ (event.target);
        if (fileInput.files.length < 1) {
            return;
        }
        const brewfatherJson = await getBrewFatherJsonFromFile(fileInput.files[0]);
        console.log(brewfatherJson);
        const markdownField = /** @type { HTMLTextAreaElement} */ 
                (this.shadowRoot.querySelector("#markdown"));
        markdownField.value = new Recipe(brewfatherJson).toString();
    }


    render() {
        return html`
        <form>
            <input @change=${this.onFileChange} type="file" accept=".json" />
        </form>

        <textarea rows="80" cols="60" id="markdown"></textarea>
        `
    }
}

if (!customElements.get("recipe-formatter")) {
    customElements.define("recipe-formatter", RecipeFormatter);
}