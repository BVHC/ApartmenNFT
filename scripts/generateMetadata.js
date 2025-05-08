const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "apartment_metadata");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

for (let i = 0; i < 100; i++) {
  const data = {
    name: `Apartment #${i + 1}`,
    description: `Căn hộ tầng ${i + 1}, diện tích 75m2, 3 phòng, hướng Đông Nam.`,
    image: "https://via.placeholder.com/300?text=Apartment+Image",
    attributes: [
      { trait_type: "Tầng", value: i + 1 },
      { trait_type: "Diện tích", value: "75m2" },
      { trait_type: "Số phòng", value: 3 },
      { trait_type: "Hướng", value: "Đông Nam" },
      { trait_type: "Lịch sử sở hữu", value: "Chưa có" }
    ]
  };
  fs.writeFileSync(path.join(outputDir, `${i}.json`), JSON.stringify(data, null, 2));
}

console.log("✅ Đã tạo xong 100 file metadata.");
