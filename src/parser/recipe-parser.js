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
        return this.recipeJson.abv.toFixed(1) + "%";
    }

    get og() {
        return this.recipeJson.og.toFixed(3);
    }

    get fg() {
        return this.recipeJson.fg.toFixed(3);
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

    get yeasts() {
        return this.recipeJson.yeasts;
    }

    get yeastsStringArray() {
        return this.yeasts.map(yeast => `| ${yeast.laboratory} | ${yeast.productId} | ${yeast.amount} ${yeast.unit} |`);
    }

    get mash() {
        return this.recipeJson.mash;
    }

    get mashStepsStringArray() {
        return this.mash.steps.map(step => `${step.stepTime} min @ ${step.stepTemp}°C`);
    }

    get boil() {
        return this.recipeJson.boilTime;
    }

    get fermentation() {
        return this.recipeJson.fermentation;
    }

    get fermentationStepsStringArray() {
        return this.fermentation.steps.map(step => `${step.stepTime} päivää @ ${step.stepTemp}°C`);
    }

    get notes() {
        return this.recipeJson.notes;
    }

    toString() {
        return `
# ${this.name}


**Panimo:** ${this.brewery}

${this.teaser ?? ''}

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

**Hiivat**

| Valmistaja | Lajike | Määrä |
|---|----|---|
${this.yeastsStringArray.join("\n")}

**Mäskäys**
${this.mashStepsStringArray.join("\n")}

**Keitto**
${this.boil} min

**Extrat**

**TODO: Extrat**

**Käyminen**

${this.fermentationStepsStringArray.join("\n")}


**TODO: Kuva oluesta, yms.**

**TODO: Linkki reseptiin**

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