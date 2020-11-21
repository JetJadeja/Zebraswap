import React, {useState} from 'react';
import {Box, Text, Input} from '@chakra-ui/react';

/**
 * Remember to remove this once multiple tokens are added
 */
import tokenLogo from '../../static/token-logo.png';
import ethLogo from '../../static/eth-logo.png';

const SwapForm = React.memo(() => {
    const [amounts, setAmounts] = useState({
        sellToken: 0,
        buyToken: ""
    })
    return (
            <Box
                display="flex"
                borderRadius={75}
                borderWidth={0.2}
                width="400px"
                height="465px"
                direction="column"
                alignItems="center"

                backgroundColor="grey"
            >
                <Box>
                    <Box
                        display="flex"
                        borderRadius={75}
                        borderWidth={0.2}
                        color="white"
                        width="375px"
                        height="80px"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                            <Input
                                fontSize="160%"
                                border="none"
                                outline="none"
                                focusBorderColor="transparent"
                            ></Input>
                    </Box>
                    <Box
                        height={200}
                    />
                    <Box
                        display="flex"
                        borderRadius={75}
                        borderWidth={0.2}
                        color="white"
                        width="375px"
                        height="80px"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                            <Input
                                fontSize="160%"
                                border="none"
                                outline="none"
                                focusBorderColor="transparent"
                            ></Input>
                    </Box>
                </Box>
            </Box>
    )
});

export default SwapForm;