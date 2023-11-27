import { useContext } from "react";

import { InventoryContext } from "../data/inventoryContext";

import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Image, Text } from '@chakra-ui/react'

// add image for different recipe product.image

export default function Recipe({ product }) {
  const { deleteProduct, setEditing, updateProduct } = useContext(
    InventoryContext
  );

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='../assets/han-sandwich.jpeg'
          fallbackSrc='https://via.placeholder.com/300'
          alt='Recipe Image'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{product.name}</Heading>
          <Text>
            <span>Category:</span> {product.category}
          </Text>
          {/* <Text color='blue.600' fontSize='2xl'>
        $450
      </Text> */}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue' onClick={() => setEditing(product.id)}>
            Edit
          </Button>
          <Button variant='outline' colorScheme='red' onClick={() => deleteProduct(product.id)}>
            Remove
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
