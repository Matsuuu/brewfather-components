import { LitElement, css, html } from "lit";
import { getBrewFatherJsonFromFile } from "../parser/file-parser.js";
import { Recipe } from "../parser/recipe-parser.js";

export class RecipeFormatter extends LitElement {

    static properties = {
        showCopiedText: { type: Boolean }
    }

    constructor() {
        super();
        this.showCopiedText = false;
    }

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

    copyToClipboard() {
        const markdownField = /** @type { HTMLTextAreaElement} */ 
                (this.shadowRoot.querySelector("#markdown"));
        const data = markdownField.value;

        navigator.clipboard.writeText(data);
        this.showCopiedText = true;
        setTimeout(() => {
            this.showCopiedText = false;
        }, 2000);
    }

    render() {
        return html`
        <form>
            <input @change=${this.onFileChange} type="file" accept=".json" />
        </form>

        <div>
            <button @click=${this.copyToClipboard}>Kopioi resepti leikepöydälle</button>
            ${this.showCopiedText ? html`<p class="copied-text">Kopioitu leikepöydälle</p>` : ''}
        </div>

        <textarea rows="80" cols="60" id="markdown"></textarea>
        `
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
        }

        :host > * {
            width: fit-content;
            height: min-content;
        }

        :host > div {
            display: flex;
        }

        .copied-text {
            animation: 200ms fade-in;
            opacity: 1;
            color: mediumblue;
            padding: 0 0 0 1rem ;
            margin: 0;
            font-weight: bold;
        }

        @keyframes fade-in {
            from {
                opacity: 0;
            }
        }
    `
}

if (!customElements.get("recipe-formatter")) {
    customElements.define("recipe-formatter", RecipeFormatter);
}