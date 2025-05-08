const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ thay bằng địa chỉ mới nếu bạn vừa redeploy
  const nft = await hre.ethers.getContractAt("ApartmentNFT", contractAddress);

  console.log("📋 Danh sách token đã được mint:\n");

  for (let tokenId = 0; tokenId < 100; tokenId++) {
    try {
      const owner = await nft.ownerOf(tokenId);
      const tokenURI = await nft.tokenURI(tokenId);
      console.log(`✅ Token #${tokenId} | 👤 Owner: ${owner}`);
      console.log(`   🌐 URI: ${tokenURI}\n`);
    } catch (err) {
      // Token chưa được mint thì Hardhat sẽ throw → bỏ qua
    }
  }

  console.log("🏁 Hoàn tất kiểm tra token.");
}

main().catch(console.error);
