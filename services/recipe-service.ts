import { db } from "@/lib/firebase";
import Recipe from "@/models/recipe";
import { Timestamp, addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const addRecipe = async (recipe: Recipe) => {
    recipe.id = uuidv4();

    const docRef = await addDoc(collection(db, "recipes"), {
        id: recipe.id,
        name: recipe.name,
        imagePath: recipe.imagePath,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        active: recipe.active,
        createdAt: Timestamp.fromDate(recipe.createdAt),
    });

    return recipe;
};

const getRecipes = async () => {
    const recipesRef = collection(db, "recipes");

    const q = query(recipesRef, where("active", "==", true));
    const snapshot = await getDocs(q);

    const recipes: any[] = [];
    snapshot.forEach(async (doc) => {
        const data = doc.data();

        recipes.push({
            id: data.id,
            name: data.name,
            imagePath: data.imagePath,
            createdAt:  data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
            active: data.active,
            createdBy: data.createdBy,
        });
    });
    return recipes;
}

const getRecipeById = async (id: string) => {
    const recipesRef = collection(db, "recipes");

    const q = query(recipesRef, where("id", "==", id), limit(1));
    const snapshot = await getDocs(q);

    let recipe: Recipe | null = null;
    snapshot.forEach((doc) => {
        const data = doc.data();
        recipe = new Recipe(
            data.id,
            data.name,
            data.imagePath,
            data.ingredients,
            data.steps,
            data.createdAt,
            data.active,
            data.createdBy
        );
    });
    
    return recipe;
}

export { addRecipe, getRecipeById, getRecipes };
