import React from "react";
import Navbar from "./shared/NavBar";
import NavBar from "./shared/NavBar";
import SwapForm from "./shared/SwapForm";

import { Box, Text } from "@chakra-ui/react";

const App = React.memo(() => {
  return (
    <Box>
      <Box w="100vw">
        <Navbar />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="100px"
        bgImage="url(https://freestock.ca/zebra_stripes__eps_vector_sjpg2124.jpg)"
        bgRepeat="no-repeat"
        bgSize="100%"
      >
        <SwapForm />
      </Box>
    </Box>
  );
});

export default App;
