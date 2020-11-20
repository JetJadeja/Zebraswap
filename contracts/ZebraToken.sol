pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/erc20/ERC20.sol';


/**
    @title ZebraToken
    @notice The Governance Token behind ZebraSwap
*/
contract ZebraToken is ERC20 {
    constructor() ERC20("ZebraToken", "ZBT") public {}
}