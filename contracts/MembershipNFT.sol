// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MembershipNFT is ERC1155, Ownable, ERC1155Supply {
    // enter uri here

    uint256 public totalSupply;
    uint256 public maxTotalSupply = 100000;
    mapping(address => uint256) public walletClaimCount;
    constructor(string memory _uri) ERC1155(_uri) {
        _setURI(_uri);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }


    function Mint(
        address _address
    ) public onlyOwner {
        require(
            totalSupply + 1 < maxTotalSupply,
            "exceed max mint supply."
        );
        require(
            walletClaimCount[_address] < 1,
            "exceed claim limit for wallet"
        );
        totalSupply = totalSupply + 1;
        walletClaimCount[_address] = walletClaimCount[_address] + 1;
        _mint(_address, 0, 1, "");
    }

    function airdrop( address[] calldata _list)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _list.length; i++) {
            Mint(_list[i]);
        }
    }
    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }


    
}
