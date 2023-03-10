const hre = require("hardhat");
require('dotenv').config()

async function main() {
  const l1GasPriceOracle = '0x5300000000000000000000000000000000000002'
  const provider = new hre.ethers.providers.StaticJsonRpcProvider(hre.network.config.url)
  const feeMethodId = ethers.utils.id('l1BaseFee()').slice(0, 10)
  const callResult = await provider.call({to: l1GasPriceOracle, data: feeMethodId })
  const baseFee = hre.ethers.BigNumber.from(callResult)
  console.log('l1BaseFee:', hre.ethers.utils.formatEther(baseFee))

  const gasLimit = 500000
  console.log('gasLimit:', gasLimit)

  const fee = baseFee.mul(gasLimit)
  console.log('fee:', hre.ethers.utils.formatEther(fee))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
