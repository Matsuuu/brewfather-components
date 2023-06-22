import { Suunta } from "suunta";
import { FooView } from "../views/foo-view.js";
import { HomeView } from "../views/home-view.js";
import { RecipeFormatterView } from "../views/recipe-formatter-view.js";

/**
 * @type { import("suunta").Route[] }
 * */
const routes = [
    {
        path: "/",
        name: "Home",
        view: HomeView
    },
    {
        path: "/foo",
        name: "FooView",
        view: FooView
    },
    {
        path: "/recipe-formatter",
        name: "Recipe Formatter",
        view: RecipeFormatterView
    }
];

/**
 * @type { import("suunta").SuuntaInitOptions }
 * */
const options = {
    routes
}

export const router = new Suunta(options);
