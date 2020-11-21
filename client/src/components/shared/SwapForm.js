import React, {useState} from 'react';
import {Box, Text, Input, Grid, Button} from '@chakra-ui/react';

/**
 * Remember to remove this once multiple tokens are added
 */
import tokenLogo from '../../static/token-logo.png';
import ethLogo from '../../static/eth-logo.png';

const SwapForm = React.memo(({ walletConnected }) => {
    const [amounts, setAmounts] = useState({
        sellToken: 0,
        buyToken: 0,
    })

    return (
        <Box
            bg="blackAlpha.900"
            height="375px"
            width="375px"
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="space-around"
        >
            <Grid
                templateColumns="repeat(1, 1fr)"
                gap={50}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box 
                    display="flex"
                    direction="column"
                    paddingLeft={5}
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
                        placeholder={0.1}
                        onChange={(event) => {
                            setAmounts(
                                {
                                    sellToken: parseFloat(event.target.value),
                                    buyToken: parseFloat(event.target.value) * 10
                                }
                            )
                        }}
                    />
                </Box>
                <Box
                    display="flex"
                    direction="column"
                    paddingLeft={5}
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
                        placeholder={amounts.buyToken==Number.NaN? 0.0 : amounts.buyToken}
                        readOnly={true}
                    />
                </Box>
                <Button
                    width="300px"
                    height="60px"
                    borderRadius={50}
                    bgImage="url(https://i.imgur.com/um4z5xe.png)"
                    textColor="white"
                    fontSize="lg"
                    disabled={!walletConnected}
                >
                    {walletConnected? "Swap!" : "Connect Wallet"}
                </Button>
            </Grid>
        </Box>
    )
});

export default SwapForm;