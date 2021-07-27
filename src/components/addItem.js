import React, { useState, useEffect } from 'react';
import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../action/actions';

function AddItem() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.item.currentIndex);
  const updateCandidate = useSelector((state) => state.item.candidates);

  const toast = useToast();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [buttonValue, setButtonValue] = useState('Schedule');

  useEffect(() => {
    if (currentIndex !== -1) {
      setName(updateCandidate[currentIndex].name);
      setDate(updateCandidate[currentIndex].date);
      setTime(updateCandidate[currentIndex].time);
      setButtonValue('Update');
    }
  }, [currentIndex]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !date || !time) {
      toast({
        title: 'No content',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const candidate = {
      name,
      date,
      time,
    };

    if (currentIndex === -1) {
      dispatch(addItem(candidate));
    } else {
      dispatch(updateItem(candidate));
    }

    setName('');
    setDate('');
    setTime('');
    setButtonValue('Schedule');
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          variant="filled"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="time"
          variant="filled"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button colorScheme="pink" px="8" type="submit">
          {buttonValue}
        </Button>
      </HStack>
    </form>
  );
}

export default AddItem;
