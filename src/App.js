import { useState } from "react";
import "./styles.css";

import Recipe from "./Components/Recipe";
import RecipeForm from "./Components/RecipeForm";

import { InventoryContext } from "./data/inventoryContext";
import RecipeList from "./Components/RecipeList";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState(null);

  function addProduct(product) {
    setProducts([...products, product]);

    // remove the form after creating product
    setEditing(null);
  }

  function updateProduct(product) {
    setProducts(
      products.map(function (p) {
        if (p.id === product.id) {
          return product;
        } else {
          return p;
        }
      })
    );
    // remove the form after creating product
    setEditing(null);
  }

  function deleteProduct(id) {
    setProducts(
      products.filter(function (p) {
        return p.id !== id;
      })
    );
  }

  return (
    <div className="App">
      <InventoryContext.Provider
        value={{
          products,
          addProduct,
          deleteProduct,
          updateProduct,
          setEditing,
          editing
        }}
      >
        <h2>Recipes</h2>
        {!editing ? (
          <>
            <RecipeList />
            <button
              className="save-btn add-btn"
              onClick={() => setEditing("new")}
            >
              Add product
            </button>
          </>
        ) : (
          <RecipeForm />
        )}
      </InventoryContext.Provider>
    </div>
  );
}

const initialProducts = [
  {
    id: 1,
    name: "Ham Sandwich",
    // price: 4.56,
    category: "Lunch",
    inStock: false
  },
  {
    id: 2,
    name: "Chocolate Chip Cookies",
    // price: 5.99,
    category: "Dessert",
    inStock: true
  }
];
