const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ địa chỉ vừa deploy
const metadataDir = path.join(__dirname, "./apartment_metadata");
const cidMap = require("./cid-map.json"); // ✅ mapping filename → CID

// const nft = await hre.ethers.getContractAt("ApartmentNFT", contractAddress);
// const contractOwner = await nft.owner();
// console.log("👑 Contract Owner:", contractOwner);
// console.log("👤 Đang dùng ví:", owner.address);


async function main() {

  
  const [owner] = await hre.ethers.getSigners();
  console.log("👤 Đang dùng ví:", owner.address);

  const nft = await hre.ethers.getContractAt("ApartmentNFT", contractAddress);
  const files = fs.readdirSync(metadataDir).filter(f => f.endsWith(".json"));

  const contractOwner = await nft.owner();
console.log("👑 Contract Owner:", contractOwner);
console.log("👤 Đang dùng ví:", owner.address);

  for (const fileName of files) {
    const tokenId = parseInt(fileName.split(".")[0]);
    const cid = cidMap[fileName];
    const tokenURI = `ipfs://${cid}`; // 👈 mỗi file có CID riêng

    if (!cid) {
      console.warn(`⚠️ Không tìm thấy CID cho ${fileName}, bỏ qua.`);
      continue;
    }

    try {
      const tx = await nft.mintApartment(owner.address, tokenURI);
      await tx.wait();
      console.log(`✅ Minted NFT #${tokenId} → ${tokenURI}`);
    } catch (err) {
      console.warn(`❌ Lỗi mint từ ${fileName}:`, err.message);
    }
  }

  console.log("🏁 Đã mint xong tất cả NFT.");
}

main().catch(console.error);
