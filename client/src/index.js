import React from "react";
import ReactDOM from "react-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";

import App from "./components/App";

ReactDOM.render(
  <ChakraProvider>
    <Box
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <App />
    </Box>
  </ChakraProvider>,
  document.getElementById("root")
);
