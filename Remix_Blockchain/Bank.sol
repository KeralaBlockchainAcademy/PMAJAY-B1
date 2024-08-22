// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

contract Bank{
    //mapping(type of key=>type of value) mappingName;
    mapping(address=>uint) public  balanceLedger;

    function deposit()public payable {
        balanceLedger[msg.sender]+=msg.value;
    }

    function withdraw(uint amt)public{
        // if(balanceLedger[msg.sender]>=amt){
            require(balanceLedger[msg.sender]>=amt,"Insufficient balance");
            balanceLedger[msg.sender]-=amt;
            payable(msg.sender).transfer(amt);
        // }
    }
}