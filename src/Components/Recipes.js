import React, { useState } from "react";
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const startEditing = (taskId) => {
    setEditingTask(taskId);
  };

  const stopEditing = () => {
    setEditingTask(null);
  };

  const updateRecipe = (updatedTask) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedTask.id ? { ...recipe, title: updatedTask.title } : recipe
    );
    setRecipes(updatedRecipes);
    stopEditing(); // Stop editing after updating task
  };

  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    stopEditing(); // Stop editing after adding task
  };

  const removeRecipe = (task) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== task.id);
    setRecipes(updatedRecipes);
  };

  const toggleFinished = (task) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === task.id ? { ...recipe, finished: !recipe.finished } : recipe
    );
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      {editingTask === null ? (
        <div>
          <ul>
            {recipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                remove={removeRecipe}
                toggleFinished={toggleFinished}
                setEditing={startEditing}
              />
            ))}
          </ul>
          <button onClick={() => setEditingTask({})}>Add Recipe</button>
        </div>
      ) : (
        <RecipeForm
          addRecipe={addRecipe}
          updateRecipe={updateRecipe}
          initialValue={
            recipes.find((recipe) => recipe.id === editingTask)?.title || ""
          }
          onCancel={stopEditing}
        />
      )}
    </div>
  );
}
