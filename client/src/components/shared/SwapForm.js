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
} from "@chakra-ui/react";

import { UpDownIcon } from "@chakra-ui/icons";

/**
 * Remember to remove this once multiple tokens are added
 */
import tokenLogo from "../../static/token-logo.png";
import ethLogo from "../../static/eth-logo.png";

const BuyInput = React.memo(({ amounts, setAmounts, userBalance }) => {
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
          if (isNaN(parseFloat(event.target.value) * 10)) {
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
        }}
      />
      <Box
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box>
          <Text color="white">{userBalance}</Text>
        </Box>
        <Button bgColor="transparent" borderRadius={100} padding={5}>
          <Image src={ethLogo} w="30px" h="30px" />
          <Box padding={3}>
            <Text fontWeight="bold" color="white" size="sm">
              ETH
            </Text>
          </Box>
        </Button>
      </Box>
    </Box>
  );
});

const SellForm = React.memo(({ amounts, setAmounts, userBalance }) => {
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
        <Button bgColor="transparent" borderRadius={100} padding={5}>
          <Image src={tokenLogo} w="30px" h="30px" />
          <Box padding={3}>
            <Text fontWeight="bold" color="white" size="sm">
              TKN
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

  const swap = () => {
    setAmounts({ sellToken: amounts.buyToken, buyToken: amounts.sellToken });
  };

  return (
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
        <BuyInput setAmounts={setAmounts} amounts={setAmounts} balance={2} />

        <IconButton
          aria-label="icon"
          colorScheme="transparent"
          _highlighted={false}
          outlineColor="transparent"
          boxShadow="none"
          icon={<UpDownIcon color="white.500" />}
          onClick={swap}
        />
        <SellForm amounts={amounts} setAmounts={setAmounts} />
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
  );
});

export default SwapForm;
