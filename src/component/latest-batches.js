import { LitElement, html } from "lit";

const BATCHES_API = "https://api.brewfather.app/v2/batches";

export class LatestBatches extends LitElement {

    static properties = {
        apiKey: { type: String, attribute: "api-key" },
        userId: { type: String, attribute: "user-id" },
        batches: { type: Array }
    };

    constructor() {
        super();
        this.apiKey = "";
        this.userId = "";
        /** @type { import("./interfaces").Batch[] } */
        this.batches = [];
    }

    firstUpdated() {
        this.fetchLatestBatches();
    }

    getApiKey() {
        return btoa(this.userId + ":" + this.apiKey);
    }

    async fetchLatestBatches() {
        const batchesRequest = await fetch(BATCHES_API, {
            headers: {
                "Authorization": "Basic " + this.getApiKey()
            }
        });

        console.log(batchesRequest);
        if (batchesRequest.ok) {
            this.batches = await batchesRequest.json();
        }
    }

    render() {
        return html`
            <p>Hello</p>
            <ul>
                ${this.batches.map(batch => html`
                    <li>${batch.name} - Recipe: ${batch.recipe.name} - #${batch.batchNo} (${batch._id})</li>
                `)}
                </ul>
        `;
    }
}

customElements.define("latest-batches", LatestBatches);
