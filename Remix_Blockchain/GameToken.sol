// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract GameT is ERC20{
    constructor()ERC20("GameT","GT") {
       _mint(msg.sender, 100000000000000000000); 
    }

    function safeMint(address to,uint value)public{
        _mint(to, value);
    }

}