const Zebra_Token = artifacts.require("Zebra_Token");
const Zebraswap = artifacts.require("Zebraswap");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Zebra_Token);
  const token = await Zebra_Token.deployed()

  // Deploy EthSwap
  await deployer.deploy(Zebraswap, token.address);
  const zebraswap = await Zebraswap.deployed()

  // Transfer all tokens to EthSwap (1 million)
  await token.transfer(zebraswap.address, '1000000000000000000000000')
};
