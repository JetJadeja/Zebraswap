pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/erc20/ERC20.sol";
import "@openzeppelin/contracts/token/erc20/IERC20.sol";
import "@openzeppelin/contracts/token/erc20/SafeERC20.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

contract ZebraLiquidityPool is ERC20 {
    using SafeMath for uint256;

    ///@dev The minimum liquidity that can be within a pool
    uint256 public MIN_LIQUIDITY = 10**3;

    ///@dev The pair of tokens that are contained within the pool
    address public token0;
    address public token1;

    ///@dev The address of the unit (that created this contract)
    address public unit;

    ///@dev The reserves for each token
    uint256 private tokenReserve0;
    uint256 private tokenReserve1;

    ///@dev tokenReserve0 * tokenReserve1
    uint256 public lastTotalK;

    ///@dev Set the ZebraUnit to the address that deployed this contract.
    constructor() public {
        unit = msg.sender;
    }
}
