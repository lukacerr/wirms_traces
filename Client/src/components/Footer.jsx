import {
  Box,
  chakra,
  Image,
  Container,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import Logo from '../assets/wirtrack_logo.png';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const SocialButton = ({ children, label, onClick }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      onClick={onClick}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer({ openWirtrack }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos="fixed"
      left={0}
      bottom={0}
      w="100%"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Image
          height={8}
          src={Logo}
          filter={colorMode === 'light' && 'invert(1) hue-rotate(180deg)'}
          onClick={openWirtrack}
          cursor="pointer"
        />
        <Text>© 2011-2022 Wirsolut S.A.</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'LinkedIn'} onClick={() => open('https://www.linkedin.com/company/wirsolut/')}>
            <FaLinkedinIn />
          </SocialButton>
          <SocialButton label={'Instagram'} onClick={() => open('https://www.instagram.com/wirsolut/')}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={'Theme'} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
