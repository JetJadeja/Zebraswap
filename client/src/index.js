import React from "react";
import ReactDOM from "react-dom";
import SwapForm from "./components/shared/SwapForm";
import { Box, ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
    <ChakraProvider>
        <Box
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <SwapForm walletConnected={false} />
        </Box>
    </ChakraProvider>,
    document.getElementById("root")
);
