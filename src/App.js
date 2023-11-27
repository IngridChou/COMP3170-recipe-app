// App.js

import { useState, useEffect } from "react";
import "./styles.css";
import Recipe from "./Components/Recipe";
import RecipeForm from "./Components/RecipeForm";
import RecipeList from "./Components/RecipeList";
import { ChakraProvider } from "@chakra-ui/react";
import { Heading, Button } from "@chakra-ui/react";
import { InventoryContext } from "./data/inventoryContext";

const API_KEY = "6f9cb552d1b843288f6ebeb76688a49d"; // Use the provided Spoonacular API key

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  async function fetchRecipeData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const newRecipes = data.recipes.map((recipe) => ({
        ...recipe,
        id: recipe.id || String(Math.random()), // Fallback to random string if 'id' is missing
      }));
      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (recipes.length === 0 || page > 1) {
      fetchRecipeData();
    }
  }, [page, recipes]);

  function addRecipe(recipe) {
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    setEditing(null);
  }

  function updateRecipe(updatedRecipe) {
    const newRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    setEditing(null);
  }

  function deleteRecipe(id) {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
  }

  function loadMoreRecipes() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <ChakraProvider>
      <div className="App">
        <InventoryContext.Provider
          value={{
            recipes: recipes.slice().sort((a, b) => {
              const idA = String(a.id).toLowerCase();
              const idB = String(b.id).toLowerCase();
              return idA.localeCompare(idB);
            }),
            addRecipe,
            deleteRecipe,
            updateRecipe,
            setEditing,
            editing,
          }}
        >
          <Heading m="10">Recipes</Heading>
          {!editing ? (
            <>
              <Button
                className="save-btn add-btn"
                onClick={() => setEditing("new")}
              >
                Add New Recipe
              </Button>
              <RecipeList />
              <Button
                className="load-more-btn"
                onClick={loadMoreRecipes}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </>
          ) : (
            <RecipeForm />
          )}
        </InventoryContext.Provider>
      </div>
    </ChakraProvider>
  );
}
