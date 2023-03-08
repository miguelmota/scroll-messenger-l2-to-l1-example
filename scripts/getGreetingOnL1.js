require('dotenv').config()

async function main() {
  const l1ContractAddress = process.env.L1_CONTRACT

  const L1Contract = await hre.ethers.getContractFactory('L1Contract')
  const l1Contract = L1Contract.attach(l1ContractAddress)

  const greeting = await l1Contract.greet()
  console.log(`greeting: ${greeting}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
