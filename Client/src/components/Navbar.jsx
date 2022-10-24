import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  ButtonGroup,
  Button,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BsServer } from 'react-icons/bs';

import Logo from '../assets/logo.png';

export default function Navbar({ openWirtrack, openDatabase }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing="2vw">
            <Image
              height={8}
              src={Logo}
              onClick={() => open('http://www.wirsolut.com/')}
              cursor="pointer"
              filter={colorMode !== 'light' && 'invert(1) hue-rotate(180deg)'}
            />
            <Heading size="lg">Traces</Heading>
          </HStack>

          <ButtonGroup gap={2}>
            <Button variant="outline" onClick={openDatabase}>
              Database
            </Button>
            <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </>
  );
}
