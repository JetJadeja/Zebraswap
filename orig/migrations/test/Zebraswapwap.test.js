const Zebra_Token = artifacts.require('Zebra_Token')
const Zebraswap = artifacts.require('Zebraswap')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('Zebraswap', ([deployer, investor]) => {
  let token, zebraswap

  before(async () => {
    token = await Zebra_Token.new()
    zebraswap = await Zebraswap.new(token.address)
    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(zebraswap.address, tokens('1000000'))
  })

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Zebra Token')
    })
  })

  describe('Zebraswap deployment', async () => {
    it('contract has a name', async () => {
      const name = await zebraswap.name()
      assert.equal(name, 'Zebraswap Instant Exchange')
    })

    it('contract has tokens', async () => {
      let balance = await token.balanceOf(zebraswap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('buyTokens()', async () => {
    let result

    before(async () => {
      // Purchase tokens before each example
      result = await zebraswap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether') })
    })

    it('Allows user to instantly purchase tokens from zebraswap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check zebraswap balance after purchase
      let zebraswapBalance
      zebraswapBalance = await token.balanceOf(zebraswap.address)
      assert.equal(zebraswapBalance.toString(), tokens('999900'))
      zebraswapBalance = await web3.eth.getBalance(zebraswap.address)
      assert.equal(zebraswapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

  describe('sellTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await token.approve(zebraswap.address, tokens('100'), { from: investor })
      // Investor sells tokens
      result = await zebraswap.sellTokens(tokens('100'), { from: investor })
    })

    it('Allows user to instantly sell tokens to zebraswap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check ethSwap balance after purchase
      let zebraswapBalance
      zebraswapBalance = await token.balanceOf(zebraswap.address)
      assert.equal(zebraswapBalance.toString(), tokens('1000000'))
      zebraswapBalance = await web3.eth.getBalance(zebraswap.address)
      assert.equal(zebraswapBalance.toString(), web3.utils.toWei('0', 'Ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      // FAILURE: investor can't sell more tokens than they have
      await zebraswap.sellTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

})
