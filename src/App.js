import { useState } from "react";
import "./styles.css";

import Recipe from "./Components/Recipe";
import RecipeForm from "./Components/RecipeForm";

import { InventoryContext } from "./data/inventoryContext";
import RecipeList from "./Components/RecipeList";

import { ChakraProvider } from '@chakra-ui/react'
import { Heading, Text, Button } from '@chakra-ui/react'

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
    <ChakraProvider>
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
          <Heading m='10'>Recipes</Heading>
          {!editing ? (
            <>
              <Button
                className="save-btn add-btn"
                onClick={() => setEditing("new")}
              >
                Add New Recipe
              </Button>
              <RecipeList />
            </>
          ) : (
            <RecipeForm />
          )}
        </InventoryContext.Provider>
      </div>
    </ChakraProvider>
  );
}

const initialProducts = [
  {
    id: 1,
    name: "Ham Sandwich",
    // price: 4.56,
    category: "Lunch",
  },
  {
    id: 2,
    name: "Chocolate Chip Cookies",
    // price: 5.99,
    category: "Dessert",
  }
];
