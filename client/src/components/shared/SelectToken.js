import React from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import lists from "../../static/tokenLists";

const SelectToken = React.memo(({ isOpen, onClose }) => {
  const [list, setList] = React.useState(0);
  const [tokens, setTokens] = React.useState([]);
  React.useEffect(() => {
    console.log(lists[list].url);
    fetch(lists[list].url)
      .then((res) => res.json())
      .then((data) => setTokens(data.tokens));
  }, [list]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent
          borderRadius={30}
          width="400px"
          height="500px"
          bgColor="#020a14"
        >
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            padding="10px"
            templateColumns="repeat(0, 1fr)"
          >
            <Box width="400px">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
                paddingBottom="10px"
              >
                Search for a Token
              </Text>
              <Input
                size="lg"
                width="370px"
                color="white"
                placeholder="Search by name or address"
              />
            </Box>
          </Grid>
          <Box paddingLeft="20px" overflowY="scroll" overflowX="hidden">
            <Box>
              {tokens.map((token) => {
                if (String(token.symbol).startsWith("a")) {
                } else {
                  return (
                    <Box width="400px" display="flex" flexDirection="row">
                      <Button
                        bgColor="transparent"
                        width="300px"
                        justifyContent="flex-start"
                      >
                        <Image
                          src={`https://cloudflare-ipfs.com/ipfs/${
                            String(token.logoURI).split("/")[2]
                          }/${token.symbol}.svg`}
                          width="50px"
                          height="50px"
                          padding="5px"
                          fallbackSrc={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`}
                          borderRadius={1000}
                        />
                        <Text
                          size="xl"
                          color="white"
                          fontWeight="bold"
                          paddingTop="2px"
                        >
                          {token.symbol}
                        </Text>
                      </Button>
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="100px"
            padding="20px"
          ></Box>
          <ModalCloseButton color="white" />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});

export default SelectToken;
