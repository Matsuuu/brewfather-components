import { LitElement, html } from "lit";
import { getBrewFatherJsonFromFile } from "../parser/file-parser";

export class RecipeFormatter extends LitElement {

    async onFileChange(event) {
        const fileInput = /** @type {HTMLInputElement} */ (event.target);
        if (fileInput.files.length < 1) {
            return;
        }
        const brewfatherJson = await getBrewFatherJsonFromFile(fileInput.files[0]);
        console.log(brewfatherJson);
    }


    render() {
        return html`
        <form>
            <input @change=${this.onFileChange} type="file" accept=".json" />
        </form>
        `
    }
}

if (!customElements.get("recipe-formatter")) {
    customElements.define("recipe-formatter", RecipeFormatter);
}