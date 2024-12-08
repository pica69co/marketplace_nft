const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const MarketplaceNFTs = await hre.ethers.getContractFactory(
    "MarketplaceNFTs"
  );
  const marketplaceNFTs = await MarketplaceNFTs.deploy();

  await marketplaceNFTs.deployed();

  console.log("MarketplaceNFTs deployed to:", marketplaceNFTs.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
