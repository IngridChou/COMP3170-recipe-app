import { useContext, useState } from "react";
import Recipe from "./Recipe";
import { InventoryContext } from "../data/inventoryContext";
import { Select, Box } from "@chakra-ui/react";

export default function RecipeList() {
  const { recipes } = useContext(InventoryContext);
  const [filterSelection, setFilterSelection] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  console.log("Recipes in RecipeList:", recipes); // Add this line

  return (
    <Box bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)' borderRadius='20' pt='10' pb='5'>
      <div className="filters">
        <label>
          Filters:
          <Select
            defaultValue={filterSelection}
            onChange={(e) => setFilterSelection(e.target.value)}
            bg="tomato"
            borderColor="tomato"
            color="white"
          >
            <option value="">All</option>
            {/* Add other filter options based on your data */}
          </Select>
        </label>
        <label>
          Sort By:
          <Select
            defaultValue={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            bg="tomato"
            borderColor="tomato"
            color="white"
          >
            <option value="">Default</option>
            {/* Add other sorting options based on your data */}
          </Select>
        </label>
      </div>
      <div className="products">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </Box>
  );
}
