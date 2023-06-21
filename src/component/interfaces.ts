

export interface Batch {
    _id: string;
    batchNo: number;
    brewDate: number;
    brewer: string;
    name: string;
    recipe: Recipe;
    status: string;
}

export interface Recipe {
    _id: string;
    name: string;
    abv: number;
    ibu: number;
}
