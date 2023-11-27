import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { InventoryContext } from "../data/inventoryContext";
import { Select, Button } from "@chakra-ui/react";

export default function RecipeForm() {
  const {
    addRecipe,
    setEditing,
    updateRecipe,
    editing,
    recipes,
  } = useContext(InventoryContext);

  let initialData = {
    title: "",
    dishType: "",
    image: "",
  };

  if (editing !== "new") {
    initialData = recipes.find((recipe) => recipe.id === editing);
  }

  const [recipe, setRecipe] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();

    if (editing === "new") {
      addRecipe({
        ...recipe,
        id: nanoid(),
      });
    } else {
      updateRecipe(recipe);
    }
  }

  function handleInput(e, field) {
    setRecipe({ ...recipe, [field]: e.target.value });
  }

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => handleInput(e, "title")}
          />
        </div>
        <div>
          <label>Dish Type:</label>
          <input
            type="text"
            value={recipe.dishType}
            onChange={(e) => handleInput(e, "dishType")}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={recipe.image}
            onChange={(e) => handleInput(e, "image")}
          />
        </div>
        <div className="form-btns">
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => setEditing(null)}
          >
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
