const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const nft = await hre.ethers.getContractAt("ApartmentNFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3");


  const tx = await nft.mintApartment(
    deployer.address,
    "https://ipfs.io/ipfs/Qm...YOUR_METADATA_CID"
  );

  await tx.wait();
  console.log("NFT minted to:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
