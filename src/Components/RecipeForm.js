import { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { InventoryContext } from "../data/inventoryContext";
import { categories } from "../data/categories";

export default function RecipeForm() {
  const {
    addProduct,
    setEditing,
    updateProduct,
    editing,
    products
  } = useContext(InventoryContext);

  // check if value of editing is "new" or some id of a product
  let initialData = {
    name: "",
    // price: 0,
    category: "",
  };

  if (editing !== "new") {
    initialData = products.find(function (p) {
      return p.id === editing;
    });
  }

  const [product, setProduct] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();

    if (editing === "new") {
      addProduct({
        ...product,
        id: nanoid()
      });
    } else {
      updateProduct(product);
    }
  }

  function handleInput(e, field) {
    setProduct({ ...product, [field]: e.target.value });
  }
  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleInput(e, "name")}
          />
        </div>
        {/* <div>
          <label>Price:</label>
          <input
            type="text"
            value={product.price}
            onChange={(e) => handleInput(e, "price")}
          />
        </div> */}
        <div>
          <label>Category:</label>
          <select
            defaultValue={product.category}
            onChange={(e) => handleInput(e, "category")}
          >
            <option value="">--select category--</option>
            {categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-btns">
          <button className="cancel-btn" onClick={() => setEditing(null)}>
            cancel
          </button>
          <button className="save-btn">save</button>
        </div>
      </form>
    </div>
  );
}
