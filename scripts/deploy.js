const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deploying with:", deployer.address);

  const ApartmentNFT = await hre.ethers.getContractFactory("ApartmentNFT");
  const contract = await ApartmentNFT.deploy(deployer.address); // 👈 truyền vào constructor

  await contract.deployed();
  console.log("🏠 ApartmentNFT deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
