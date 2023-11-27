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
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
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
          <Button variant='ghost' colorScheme='blue' onClick={() => deleteProduct(product.id)}>
            Remove
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
