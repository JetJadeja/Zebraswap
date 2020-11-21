import React from 'react';
import {Flex, Box, Text} from '@chakra-ui/react';

const Navbar = React.memo(({
    address,
    loadButton
}) => {
    return(
        <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bgPosition="center"
        bgRepeat='no-repeat'
        backgroundColor="#303030"
        >
            <Box>
                <Box display="flex" alignItems="center" justifyContent="flex-start">
                    <Text fontWeigh="bold" fontSize="xl" color="#d0d0d0">
                        🦓&nbsp;ZebraSwap
                    </Text>
                </Box>
                <Text fontSize="sm" color="grey">Decentralized Exchange</Text>
            </Box>
        </Flex>
    )
});

export default Navbar;