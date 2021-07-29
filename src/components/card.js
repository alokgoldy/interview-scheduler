import React from 'react';
import {
  Box,
  Divider,
  Button,
  Spacer,
  Badge,
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem, updateIndex, completeItem } from '../redux/action/actions';

function Card({ item, index }) {
  const dispatch = useDispatch();

  function updateBadge() {
    dispatch(updateIndex(index));
    dispatch(completeItem(!item.completed));
    dispatch(updateIndex(-1));
  }

  return (
    <Box w={200} p={4} borderWidth="1px" borderRadius="lg">
      <Flex>
        <FaUserAlt />
        <Spacer />
        <Badge
          colorScheme={!item.completed ? 'green' : 'red'}
          rounded="full"
          fontSize="xs"
          onClick={updateBadge}
          cursor="pointer"
        >
          {!item.completed ? 'Upcoming' : 'Completed'}
        </Badge>
      </Flex>
      <Text fontWeight="bold" mt="2">
        {item.name}
      </Text>
      <HStack>
        <Text mt="2">{item.date}</Text>
        <Spacer />
        <Text mt="2">{item.time}</Text>
      </HStack>
      <Divider mt="2" />
      <Box mt="6" d="flex">
        <Button
          colorScheme="teal"
          size="xs"
          onClick={() => dispatch(updateIndex(index))}
        >
          Edit
        </Button>
        <Spacer />
        <Button
          colorScheme="red"
          size="xs"
          onClick={() => dispatch(deleteItem(index))}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  item: PropTypes.instanceOf(Array).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
