import { db } from "@/lib/firebase";
import Recipe from "@/models/recipe";
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const addRecipe = async (recipe: Recipe) => {
    recipe.id = uuidv4();

    const docRef = await addDoc(collection(db, "recipes"), {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        imagePath: recipe.imagePath,
        ingredients: recipe.ingredients,
        steps: recipe.steps
    });

    return recipe;
};

const getRecipes = async () => {
    const recipesRef = collection(db, "recipes");


    const snapshot = await getDocs(recipesRef);
    const recipes: any[] = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        recipes.push({
            id: data.id,
            name: data.name,
        });
    });
    return recipes;
}

const getRecipeById = async (id: string) => {
  console.log(id);
    const recipesRef = collection(db, "recipes");

    const q = query(recipesRef, where("id", "==", id), limit(1));
    const snapshot = await getDocs(q);

    let recipe: Recipe | null = null;
    snapshot.forEach((doc) => {
        const data = doc.data();
        recipe = new Recipe(
            data.id,
            data.name,
            data.description,
            data.imagePath,
            data.ingredients,
            data.steps
        );
    });
    
    return recipe;
}

export { addRecipe, getRecipeById, getRecipes };
