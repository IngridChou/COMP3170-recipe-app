// Recipe.js

import { useContext } from "react";
import { InventoryContext } from "../data/inventoryContext";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

export default function Recipe({ recipe }) {
  const { deleteRecipe, setEditing, updateRecipe } =
    useContext(InventoryContext);

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={recipe.image || "https://via.placeholder.com/300"}
          fallbackSrc="https://via.placeholder.com/300"
          alt="Recipe Image"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{recipe.title}</Heading>
          <Text>
            <span>Type:</span>{" "}
            {recipe.type || (recipe.dishTypes && recipe.dishTypes[0]) || "N/A"}
          </Text>
          <Text>
            <span>Cuisine:</span>{" "}
            {recipe.cuisines && recipe.cuisines.length > 0
              ? recipe.cuisines.join(", ")
              : "N/A"}
          </Text>
          <Text>
            <span>Ready in:</span> {recipe.readyInMinutes} minutes
          </Text>
          {/* Add more details based on the Spoonacular API response */}
        </Stack>
      </CardBody>

      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => setEditing(recipe.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => deleteRecipe(recipe.id)}
          >
            Remove
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
