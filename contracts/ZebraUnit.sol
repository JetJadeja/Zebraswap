pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

/**
    @title Zebra Unit
    @notice This is the main contract behind ZebraSwap. Similar to UniswapV2Factory, ZebraUnit creates new Liquidity Pools
    @author ZebraSwap
*/
contract ZebraUnit is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    ///@dev Stores the address pairs of the liquidity pools
    mapping(address => mapping(address => address)) pools;

    ///@dev The addresses of all the liquidity pools created by the contract thus far
    address[] poolAddresses;

    event NewPool(address indexed tokenA, address indexed tokenB, address pool);

    ///@dev Set the Owner to the user who deployed the contract
    constructor(uint256 _fee) public Ownable() {}

    /**
        @dev Create a new liquidity pool
        @param token0 The address of the first token
        @param token1 The address of the second token
    */
    function newPool(address token0, address token1)
        external
        returns (address)
    {
        require(token0 != token1, "Identical Tokens");
        require(token0 != address(0) && token1 != address(0), "Zero Address");
        require(pools[token0][token1] == address(0), "Existing Pool");
    }
}
