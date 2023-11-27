import { useContext } from "react";

import { InventoryContext } from "../data/inventoryContext";

export default function Recipe({ product }) {
  const { deleteProduct, setEditing, updateProduct } = useContext(
    InventoryContext
  );

  return (
    <div className="product">
      <h3>{product.name}</h3>
      {/* <p>
        <span>Price:</span> {`$${product.price}`}
      </p> */}
      <p>
        <span>Category:</span> {product.category}
      </p>

      <button className="edit-btn" onClick={() => setEditing(product.id)}>
        edit
      </button>
      <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
        remove
      </button>
    </div>
  );
}
