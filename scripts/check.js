// scripts/check.js
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // địa chỉ hợp đồng
  const tokenId = 1; // ✅ chọn 1 token chắc chắn đã mint

  const nft = await hre.ethers.getContractAt("ApartmentNFT", contractAddress);

  try {
    const owner = await nft.ownerOf(tokenId);
    const tokenURI = await nft.tokenURI(tokenId);

    console.log(`🔍 Token #${tokenId}`);
    console.log("👤 Chủ sở hữu:", owner);
    console.log("🌐 Token URI:", tokenURI);
  } catch (err) {
    console.error(`❌ Token ID #${tokenId} chưa tồn tại hoặc không thể truy vấn.`);
  }
}

main().catch(console.error);
