export class Recipe {
    constructor(brewFatherJson) {
        this.recipeJson = brewFatherJson; 
    }

    get name() {
        return this.recipeJson.name;
    }

    get brewery() {
        return this.recipeJson.author;
    }

    get beerStyle() {
        return this.recipeJson.style.name;
    }

    get teaser() {
        return this.recipeJson.teaser;
    }

    get abv() {
        return this.recipeJson.abv + "%";
    }

    get og() {
        return this.recipeJson.og;
    }

    get fg() {
        return this.recipeJson.fg;
    }

    get ibu() {
        return this.recipeJson.ibu;
    }

    get buGu() {
        return this.recipeJson.buGuRatio;
    }

    get color() {
        return this.recipeJson.color + " EBC";
    }

    get batchSize() {
        return this.recipeJson.batchSize;
    }

    get mashingEfficiency() {
        return this.recipeJson.efficiency;
    }

    get waterProfile() {
        const adjustments = this.recipeJson.water.totalAdjustments;

        return {
            calcium: adjustments.calcium,
            magnesium: adjustments.magnesium,
            sodium: adjustments.sodium,
            chloride: adjustments.chloride,
            sulfate: adjustments.sulfate,
            sodiumBicarbonate: adjustments.sodiumBicarbonate
        }
    }

    get waterProfileString() {
        const levels = this.waterProfile;
        return `Ca ${levels.calcium}, Mg ${levels.magnesium}, Na ${levels.sodium}, Cl ${levels.chloride}, SO ${levels.sulfate}, HCO ${levels.sodiumBicarbonate}`;
    }

    get equipment() {
        return this.recipeJson.equipment.name;
    }

    get fermentables() {
        return this.recipeJson.fermentables;
    }

    get fermentableStringsArray() {
        return this.fermentables.map(ferm => `| ${ferm.name} | ${parseFermentableAmountAndUnit(ferm)} | ${ferm.percentage}% |`);
    }

    get hops() {
        return this.recipeJson.hops;
    }

    get hopsStringArray() {
        return this.hops.map(hop => `| ${hop.name} | ${hop.amount} g | ${parseHopUse(hop)} | ${hop.alpha} | ${hop.ibu} |`);
    }

    toString() {
        return `
# ${this.name}


**Panimo:** ${this.brewery}

${this.teaser}

**Palkinnot/Maininnat:** 

---

**Oluttyyli:** ${this.beerStyle}

**Vahvuus:** ${this.abv}

**OG:** ${this.og}

**FG:** ${this.fg}

**IBU:** ${this.ibu}

**BU/GU:** ${this.buGu}

**Väri:** ${this.color}

**Eräkoko:** ${this.batchSize}

**Mäskäystehokkuus:** ${this.mashingEfficiency}

**Vesiprofiili:** ${this.waterProfileString}

**Laitteisto:** ${this.equipment}

---

## Resepti

**Maltaat**

| Mallas | Määrä | % kokonaisuudesta |
|--------|-------|-------|
${this.fermentableStringsArray.join("\n")}

**Humalat**

| Humala | Määrä | Ajoitus | Alfa-hapot | IBU |
|---|---|---|---|---|
${this.hopsStringArray.join("\n")}
        `;
    }
}

function parseFermentableAmountAndUnit(fermentable) {
    const measurement = fermentable.amount > 1 ? "kg" : "g";
    return (measurement == "g"
    ? fermentable.amount * 1000
    : fermentable.amount) + " " + measurement
}

function parseHopUse(hop) {
    console.log("HOp use ", hop.use);
    if (hop.use === "First Wort") {
        return ``;
    }
    if (hop.use === "Dry Hop") {
        if (hop.timeUnit === "day") {
            return `Dry Hop @ ${hop.timeUnit} ${hop.time} ${hop.temp ? "@ " + hop.temp : ''}`
        }
        if (hop.timeUnit === "days") {
            return `Dry Hop ${hop.time} ${hop.timeUnit} ${hop.temp ? "@ " + hop.temp : ''}`
        }
    }
    return hop.time;
}