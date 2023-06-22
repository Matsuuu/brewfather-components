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

    get abv() {
        return this.recipeJson.abv + "%";
    }

    get og() {
        return this.recipeJson.og;
    }

    get fg() {
        return this.recipeJson.fg;
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
        return this.fermentables.map(ferm => `${ferm.name} | ${parseFermentableAmountAndUnit(ferm)} | ${ferm.percentage}%`);
    }
}

function parseFermentableAmountAndUnit(fermentable) {
    const measurement = fermentable.amount > 1 ? "kg" : "g";
    return (measurement == "g"
    ? fermentable.amount * 1000
    : fermentable.amount) + " " + measurement
}