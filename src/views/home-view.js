import { html } from "lit"
import "../component/latest-batches.js";

export const HomeView = () => {
    return html`
        <h2>Hello world!</h2>
        <a href="/foo">Foo</a>
        <a href="/recipe-formatter">Recipe formatter</a>
        <latest-batches
            user-id="6PoxdmkWbogHQfBo8g3gz1jJ6Q23"
            api-key="yAw5a7Nz1HvamRSPTtDeUoAXkAHezdwkFx1UHypRC6TlcwRJ8dLPuCspLLazhLw5"
        ></latest-batches>
    `;
}
