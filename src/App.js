import React from 'react';
import {
  VStack,
  IconButton,
  Heading,
  useColorMode,
  Wrap,
  WrapItem,
  Stack,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Card from './components/card';
import AddItem from './components/addItem';
import './App.css';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

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
      <Spacer />
      <AddItem />
      <Stack p={4}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Upcoming</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Wrap spacing="30px" justify="center">
                {candidates.map((item, index) => {
                  if (item.completed === false) {
                    return (
                      <WrapItem>
                        <Card item={item} index={index} />
                      </WrapItem>
                    );
                  }
                  return [];
                })}
              </Wrap>
            </TabPanel>
            <TabPanel>
              <Wrap spacing="30px" justify="center">
                {candidates.map((item, index) => {
                  if (item.completed === true) {
                    return (
                      <WrapItem>
                        <Card item={item} index={index} />
                      </WrapItem>
                    );
                  }
                  return [];
                })}
              </Wrap>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </VStack>
  );
}

export default App;
