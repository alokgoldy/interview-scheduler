import React from 'react';
import {
  VStack,
  IconButton,
  Heading,
  useColorMode,
  Wrap,
  WrapItem,
  Stack,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Card from './components/card';
import AddItem from './components/addItem';
import './App.css';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  // const [items, setItems] = useState(
  //   () => JSON.parse(localStorage.getItem('items')) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(items));
  // }, [items]);

  const candidates = useSelector((state) => state.item.candidates);

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading
        mb="8"
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
        bgClip="text"
      >
        Interview Scheduler
      </Heading>
      <AddItem />
      <Stack p={4}>
        <Wrap spacing="30px" justify="center">
          {candidates.map((item, index) => (
            <WrapItem>
              <Card item={item} index={index} />
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
    </VStack>
  );
}

export default App;
