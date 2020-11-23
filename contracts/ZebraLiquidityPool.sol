pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/erc20/IERC20.sol";
import "@openzeppelin/contracts/token/erc20/SafeERC20.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

contract ZebraLiquidityPool {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

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

    ///@dev Set the ZebraUnit to the address that deployed this contract
    constructor() public {
        unit = msg.sender;
    }

    ///@dev Set the pair of tokens supported by this pool
    function initialize(address _token0, address _token1) public {
        token0 = _token0;
        token1 = _token1;
    }

    ///@dev Return the reserve values for each token
    function getTokenReserves() public view returns (uint256, uint256) {
        return (tokenReserve0, tokenReserve1);
    }

    function _updateTokenReserves(uint256 balance0, uint256 balance1) private {
        require(balance0 <= uint256(-1) && balance1 <= uint256(-1), "Overflow");
        uint32 lastTimestamp = uint32(block.timestamp % 2**32);

        tokenReserve0 = balance0;
        tokenReserve1 = balance1;
        lastUpdateTimestamp = lastTimestamp;
    }

    function _getTokens() external view returns (address, address) {
        return (token0, token1);
    }

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to
    ) external {
        (uint256 _tokenReserve0, uint256 _tokenReserve1) = getTokenReserves();
        require(amount0Out > 0 || amount1Out > 0, "Input Too Low!");
        require(
            amount0Out < _tokenReserve0 && amount1Out < tokenReserve1,
            "Liquidity Insufficient"
        );
        require(to != token0 && to != token1, "Invalid Address");

        if (amount0Out > 0) {
            IERC20(token0).safeTransfer(to, amount0Out);
            IERC20(token1).safeTransferFrom(
                to,
                address(this),
                amount0Out.mul(_tokenReserve0.div(tokenReserve1))
            );
        } else {
            IERC20(token1).safeTransfer(to, amount1Out);
            IERC20(token0).safeTransferFrom(
                to,
                address(this),
                amount1Out.mul(_tokenReserve1.div(tokenReserve0))
            );
        }
    }
}
