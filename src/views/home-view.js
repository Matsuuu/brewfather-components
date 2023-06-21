import { html } from "lit"
import "../component/latest-batches.js";

export const HomeView = () => {
    return html`
        <h2>Hello world!</h2>
        <a href="/foo">Foo</a>
        <latest-batches
            user-id="6PoxdmkWbogHQfBo8g3gz1jJ6Q23"
            api-key="sjeyBb5Ija4ujA51BEWj7vYX7D96viAbt4FtHHrAs24r9S7qmkvwxmsAWPP5JBlv"
        ></latest-batches>
    `;
}
