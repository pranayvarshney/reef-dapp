// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20, ERC20Burnable, AccessControl, ERC20Permit, ERC20Votes {
    uint256 public s_maxSupply = 300000;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor()
        ERC20("ConserveGovernanceToken", "CTK")
        ERC20Permit("ConserveGovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    // // The following functions are overrides required by Solidity.
    // function decimal() pure public returns (uint32) {
    //     return 6 ;
    // }
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20,ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }


    function tranferBatch(address[] memory recipients, uint256[] memory amounts) public {
        require(recipients.length == amounts.length, "recipients and amounts must be the same length");
        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amounts[i]);
        }
    }


    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20,ERC20Votes)
    {
        super._burn(account, amount);
    }



}
