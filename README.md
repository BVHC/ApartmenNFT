# Hướng Dẫn Chạy Dự Án ApartmentNFT

Dự án này hướng dẫn cách tạo và mint 100 NFT đại diện cho 100 căn hộ, sử dụng Hardhat, Pinata (IPFS), và blockchain cục bộ.

## Mục Lục
1. [Tạo Metadata cho 100 Căn Hộ](#bước-1-tạo-metadata-cho-100-căn-hộ)
2. [Upload Metadata lên Pinata](#bước-2-upload-metadata-lên-pinata)
3. [Khởi Chạy Blockchain và Deploy Hợp Đồng](#bước-3-khởi-chạy-blockchain-cục-bộ-và-deploy-hợp-đồng)
4. [Cập Nhật Địa Chỉ Hợp Đồng](#bước-4-cập-nhật-địa-chỉ-hợp-đồng-vào-script-mint)
5. [Mint NFT](#bước-5-mint-nft)
6. [Kiểm Tra NFT](#bước-6-kiểm-tra-các-nft-đã-được-mint)

## Bước 1: Tạo Metadata cho 100 Căn Hộ

1. Tạo thư mục `apartment_metadata/` cùng cấp với file `upload-pinata.js`.
2. Tạo file `generateMetadata.js` để sinh metadata.
3. Chạy lệnh:
   ```bash
   node scripts/generateMetadata.js
   ```
4. Kết quả: Tạo 100 file JSON (từ `0.json` đến `99.json`) trong thư mục `apartment_metadata/`.

**Cấu trúc Metadata của Căn Hộ:**
- Mã căn hộ (ID)
- Tầng
- Diện tích
- Số phòng
- Hướng
- Lịch sử sở hữu

**Ví dụ Metadata:**
```json
{
  "id": 0,
  "floor": 1,
  "area": 50,
  "rooms": 2,
  "direction": "East",
  "ownershipHistory": []
}
```

## Bước 2: Upload Metadata lên Pinata

1. **Tạo file `.env` ở thư mục gốc dự án:**
   ```plaintext
   PRIVATE_KEY=0x...
   INFURA_API_KEY=...
   PINATA_JWT=...
   ```

   **a. Lấy PRIVATE_KEY (khóa ví):**
   - Mở ví (VD: MetaMask) → Chọn tài khoản → Account Details → Export Private Key.
   - Copy chuỗi bắt đầu bằng `0x...`.
   - Thêm vào `.env`:
     ```plaintext
     PRIVATE_KEY=0xabc123...  # KHÔNG chia sẻ công khai!
     ```

   **b. Lấy INFURA_API_KEY:**
   - Truy cập [https://infura.io](https://infura.io/).
   - Đăng nhập/tạo tài khoản → Tạo project mới → Copy Project ID.
   - Thêm vào `.env`:
     ```plaintext
     INFURA_API_KEY=88d6...
     ```

   **c. Lấy PINATA_JWT:**
   - Truy cập [https://pinata.cloud](https://pinata.cloud/).
   - Đăng nhập → API Keys → Tạo JWT Key → Copy JWT Token.
   - Thêm vào `.env`:
     ```plaintext
     PINATA_JWT=eyJhbGciOi...
     ```

2. **Chạy script upload metadata lên IPFS (Pinata):**
   ```bash
   node scripts/upload-pinata.js
   ```

## Bước 3: Khởi Chạy Blockchain Cục Bộ và Deploy Hợp Đồng

1. **Khởi động Hardhat node:**
   ```bash
   npx hardhat node
   ```

2. **Deploy hợp đồng:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. **Lưu ý:** Copy địa chỉ hợp đồng (VD: `0x5FbDB2315678afecb367f032d93F642f64180aa3`) và dán vào các file:
   - `createApartments.js`
   - `listAllMintedTokens.js`
   - `mint.js`

## Bước 4: Cập Nhật Địa Chỉ Hợp Đồng vào Script Mint

1. Mở file `createApartments.js` và cập nhật:
   ```javascript
   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Thay bằng địa chỉ mới
   ```

2. File này sẽ sử dụng `cid-map.json` để mint 100 NFT tương ứng 100 căn hộ.

## Bước 5: Mint NFT

Chạy lệnh:
```bash
npx hardhat run scripts/createApartments.js --network localhost
```

## Bước 6: Kiểm Tra Các NFT Đã Được Mint

1. **Kiểm tra tất cả NFT:**
   ```bash
   npx hardhat run scripts/listAllMintedTokens.js --network localhost
   ```

2. **Kiểm tra một token cụ thể:**
   ```bash
   npx hardhat run scripts/check.js --network localhost
   ```

3. **Lưu ý khi sửa file `ApartmentNFT`:**
   Nếu chỉnh sửa hợp đồng `ApartmentNFT`, chạy lại các lệnh:
   ```bash
   npx hardhat clean
   npx hardhat compile
   npx hardhat node
   ```