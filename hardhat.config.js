require('@nomiclabs/hardhat-waffle')
require('hardhat-deploy')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY

if (!privateKey) {
  throw new Error('PRIVATE_KEY not set')
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'scroll',
  networks: {
    scroll: {
      url: process.env.SCROLL_RPC || 'https://alpha-rpc.scroll.io/l2',
      accounts: [privateKey]
    },
    goerli: {
      url: process.env.GOERLI_RPC || 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [privateKey]
    },
  },
  solidity: '0.8.4',
}
