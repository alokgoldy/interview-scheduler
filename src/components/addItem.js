import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
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
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>{buttonValue}</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddItem;
