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
import { addItem, updateIndex, updateItem } from '../action/actions';

function AddItem() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.item.currentIndex);
  const updateCandidate = useSelector((state) => state.item.candidates);

  const toast = useToast();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [edit, setEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const datetime = new Date(`${date}" "${time}`);

  const initialRef = React.useRef();
  useEffect(() => {
    if (currentIndex !== -1) {
      setName(updateCandidate[currentIndex].name);
      setDate(updateCandidate[currentIndex].date);
      setTime(updateCandidate[currentIndex].time);
      setEdit(true);
      onOpen();
    }
  }, [currentIndex]);

  function closeModal() {
    onClose();
    dispatch(updateIndex(-1));
    setName('');
    setDate('');
    setTime('');
  }
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
    if (datetime < Date.now()) {
      toast({
        title: 'Date Not Accepted',
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
      completed: false,
      datetime: datetime.getTime(),
    };

    if (currentIndex === -1) {
      dispatch(addItem(candidate));
    } else {
      dispatch(updateItem(candidate));
    }

    setName('');
    setDate('');
    setTime('');
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>Schedule</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {edit ? 'Update Interview' : 'Schedule Interview'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddItem;
