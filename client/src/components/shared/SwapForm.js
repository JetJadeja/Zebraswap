import React, { useState } from "react";
import {
  Box,
  Text,
  Icon,
  IconButton,
  Input,
  Image,
  Grid,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { UpDownIcon } from "@chakra-ui/icons";

/**
 * Remember to remove this once multiple tokens are added
 */
import tokenLogo from "../../static/token-logo.png";
import ethLogo from "../../static/eth-logo.png";
import SelectToken from "./SelectToken";

const SecondDisclosure = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return [isOpen, onOpen, onClose];
};

const BuyInput = React.memo(
  ({ amounts, setAmounts, onTokenClick, token, clear, setClear }) => {
    return (
      <Box
        display="flex"
        direction="column"
        padding={5}
        borderWidth="1px"
        width="300px"
        height="75px"
        borderRadius={75}
      >
        <Input
          variant="unstyled"
          size="lg"
          fontSize="xl"
          color="white"
          placeholder={0}
          onChange={(event) => {
            setClear(false);
            if (!clear) {
              if (isNaN(parseFloat(event.target.value))) {
                setAmounts({
                  sellToken: 0,
                  buyToken: 0,
                });
              } else {
                setAmounts({
                  sellToken: parseFloat(event.target.value),
                  buyToken: parseFloat(event.target.value) * 10,
                });
              }
            } else {
              event.target.value = "";
            }
          }}
        />
        <Box
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            bgColor="transparent"
            borderRadius={100}
            padding={5}
            onClick={onTokenClick}
          >
            <Image
              src={token.logoURI}
              w="30px"
              h="30px"
              fallbackSrc={token.fallbackURI}
            />
            <Box padding={3}>
              <Text fontWeight="bold" color="white" size="sm">
                {token.symbol}
              </Text>
            </Box>
          </Button>
        </Box>
      </Box>
    );
  }
);

const SellForm = React.memo(({ amounts, setAmounts, token, onTokenClick }) => {
  return (
    <Box
      display="flex"
      direction="column"
      padding={5}
      borderWidth="1px"
      width="300px"
      height="75px"
      borderRadius={75}
      color="white"
    >
      <Input
        size="lg"
        variant="unstyled"
        fontSize="xl"
        placeholder={amounts.buyToken === Number.NaN ? 0.0 : amounts.buyToken}
        readOnly={true}
      />
      <Box
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          bgColor="transparent"
          borderRadius={100}
          padding={5}
          onClick={onTokenClick}
        >
          <Image
            src={token.logoURI}
            w="30px"
            h="30px"
            fallbackSrc={token.fallbackURI}
          />
          <Box padding={3}>
            <Text fontWeight="bold" color="white" size="sm">
              {token.symbol}
            </Text>
          </Box>
        </Button>
      </Box>
    </Box>
  );
});

const SwapForm = React.memo(({ walletConnected, balance }) => {
  const [amounts, setAmounts] = useState({
    sellToken: 0,
    buyToken: 0,
  });

  const [buyToken, setBuyToken] = React.useState({
    symbol: "DAI",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    address: "0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d",
  });

  const [sellToken, setSellToken] = React.useState({
    symbol: "YFI",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png",
    address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  });

  const [clearInput, setClearInput] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sellIsOpen, sellOnOpen, sellOnClose] = SecondDisclosure();

  const swap = () => {
    setAmounts({ sellToken: 0, buyToken: 0 });
    const [_sellToken, _buyToken] = [buyToken, sellToken];
    setBuyToken(_buyToken);
    setSellToken(_sellToken);
    setClearInput(true);
  };

  return (
    <>
      <Box
        bg="blackAlpha.900"
        height="420px"
        width="375px"
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        borderRadius={50}
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={10}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <BuyInput
            setAmounts={setAmounts}
            amounts={setAmounts}
            balance={2}
            onTokenClick={onOpen}
            token={buyToken}
            clear={clearInput}
            setClear={setClearInput}
          />

          <IconButton
            aria-label="icon"
            colorScheme="transparent"
            _highlighted={false}
            outlineColor="transparent"
            boxShadow="none"
            icon={<UpDownIcon color="white.500" />}
            onClick={swap}
          />
          <SellForm
            amounts={amounts}
            setAmounts={setAmounts}
            token={sellToken}
            onTokenClick={sellOnOpen}
          />
          <Button
            width="300px"
            height="60px"
            borderRadius={50}
            bgImage="url(https://i.imgur.com/um4z5xe.png)"
            textColor="white"
            fontSize="lg"
            disabled={!walletConnected}
          >
            {walletConnected ? "Swap!" : "Connect Wallet"}
          </Button>
        </Grid>
      </Box>
      <SelectToken
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setToken={setBuyToken}
      />
      <SelectToken
        isOpen={sellIsOpen}
        onClose={sellOnClose}
        setToken={setSellToken}
      />
    </>
  );
});

export default SwapForm;
