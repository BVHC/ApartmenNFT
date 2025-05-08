// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ApartmentNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor(address initialOwner) ERC721("ApartmentNFT", "APT") Ownable(initialOwner) {
        _tokenIdCounter = 0;
    }

    function mintApartment(address to, string memory tokenURI) public onlyOwner {
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIdCounter += 1;
    }
}
