import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Core from './components/Core';

export default function App() {
  const openWirtrack = () => open(import.meta.env.VITE_WIRTRACK_URL);
  const openDatabase = () => open(import.meta.env.VITE_ATLAS_URL);

  return (
    <Box>
      <Navbar openDatabase={openDatabase} openWirtrack={openWirtrack}></Navbar>
      <Core></Core>
      <Footer openWirtrack={openWirtrack}></Footer>
    </Box>
  );
}
