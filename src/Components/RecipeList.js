import { useContext, useState } from "react";
import Recipe from "./Recipe";
import { InventoryContext } from "../data/inventoryContext";
import { categories } from "../data/categories";
import { filter, sort } from "../utils/helpers";

export default function RecipeList() {
  const { products } = useContext(InventoryContext);

  // local state for tracking filter and sorting selections
  const [filterSelection, setFilterSelection] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  let displayedProducts = sort(products, sortOrder);
  displayedProducts = filter(displayedProducts, filterSelection);

  return (
    <>
      <div className="filters">
        <label>
          Filters:
          <select
            defaultValue={filterSelection}
            onChange={(e) => setFilterSelection(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          Sort By:
          <select
            defaultValue={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">alphabetically</option>
            {/* <option value="2">price</option> */}
          </select>
        </label>

      </div>
      <div className="products">
        {displayedProducts.map((p) => (
          <Recipe product={p} />
        ))}
      </div>
    </>
  );
}
