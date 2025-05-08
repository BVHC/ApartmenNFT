require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const PINATA_JWT = process.env.PINATA_JWT;
const metadataDir = path.join(__dirname, './apartment_metadata'); // 📁 đúng thư mục chứa metadata

async function uploadFileToPinata(filePath) {
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxBodyLength: "Infinity",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      ...data.getHeaders()
    },
  });

  return response.data.IpfsHash;
}

async function main() {
  const files = fs.readdirSync(metadataDir).filter(f => f.endsWith(".json"));
  const cidMap = {}; // 💾 Lưu mapping filename → CID

  if (files.length === 0) {
    console.error("❌ Không có file JSON nào trong metadata");
    return;
  }

  console.log(`📁 Đang upload ${files.length} file JSON lên Pinata...`);

  for (const file of files) {
    const filePath = path.join(metadataDir, file);
    try {
      const cid = await uploadFileToPinata(filePath);
      console.log(`✅ ${file} → CID: ${cid}`);
      cidMap[file] = cid; // Ghi vào mapping
    } catch (err) {
      console.error(`❌ Lỗi upload ${file}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, "cid-map.json"), JSON.stringify(cidMap, null, 2));
  console.log("🗂 CID map saved to cid-map.json");
  console.log("🏁 Hoàn tất upload.");
}

main().catch(console.error);
