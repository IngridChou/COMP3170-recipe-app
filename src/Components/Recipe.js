import { useContext } from "react";

import { InventoryContext } from "../data/inventoryContext";

export default function Recipe({ product }) {
  const { deleteProduct, setEditing, updateProduct } = useContext(
    InventoryContext
  );

  function handleCheckbox() {
    updateProduct({
      ...product,
      inStock: !product.inStock
    });
  }

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>
        <span>Price:</span> {`$${product.price}`}
      </p>
      <p>
        <span>Category:</span> {product.category}
      </p>
      <label>
        {product.inStock ? "In Stock" : "Not in stock"}
        <input
          type="checkbox"
          checked={product.inStock}
          onChange={handleCheckbox}
        />
      </label>
      <button className="edit-btn" onClick={() => setEditing(product.id)}>
        edit
      </button>
      <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
        remove
      </button>
    </div>
  );
}
