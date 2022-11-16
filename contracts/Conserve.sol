// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Conserve {
    IERC20 token;
    address governanceContract;  
    struct ngo {
        //ngoID is actually the address of that NGO
        address ngoID ;
        uint32 amountOfTokens;
    }
    ngo[] public ngoArray;

    constructor(address _token, address _governanceContract) {
        token = IERC20(_token);
        governanceContract = _governanceContract;
    }

    function addNGO(address _ngoID) public {
        ngoArray.push(ngo(_ngoID, 0));
    }

    function donate(address _ngoID, uint32 _amount) public {
        token.transferFrom(msg.sender, address(governanceContract), _amount);
        for (uint256 i = 0; i < ngoArray.length; i++) {
            if (ngoArray[i].ngoID == _ngoID) {
                ngoArray[i].amountOfTokens += _amount;
            }
        }
    }

    function returnAllNGOs() public view returns (ngo[] memory) {
        return ngoArray;
    }

    function getNGO(address _ngoID) public view returns (address, uint32) {
        for (uint256 i = 0; i < ngoArray.length; i++) {
            if (ngoArray[i].ngoID == _ngoID) {
                return (ngoArray[i].ngoID, ngoArray[i].amountOfTokens);
            }
        }
        return(_ngoID,0);
    }
 
    // todo : make afterProposal only accessible to Governance contract 
    
    function afterProposal() public {
        for (uint256 i = 0; i < ngoArray.length; i++) {
            ngoArray[i].amountOfTokens = 0;
        }
    }
}