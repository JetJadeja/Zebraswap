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

    ///@dev The timestamp recorded at
    uint32 private lastUpdateTimestamp;

    ///@dev tokenReserve0 * tokenReserve1 . This is modified everytime liquidity is modified
    uint256 public lastTotalK;

    ///@dev Set the ZebraUnit to the address that deployed this contract, and define the tokens
    constructor(address _token0, address _token1) public {
        unit = msg.sender;
        token0 = _token0;
        token1 = _token1;
    }

    ///@dev Return the reserve values for each token
    function getTokenReserves() public view returns (uint256, uint256) {
        return (tokenReserve0, tokenReserve1);
    }

    function _updateTokenReserves(uint256 balance0, uint256 balance1) private {
        require(balance0 <= uint256(-1) && balance1 <= (-1), "Overflow");
        uint32 lastTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = lastTimeStamp - lastUpdateTimestamp;

        tokenReserve0 = balance0;
        tokenReserve1 = balance1;
        lastUpdateTimestamp = lastTimeStamp;
    }
}
