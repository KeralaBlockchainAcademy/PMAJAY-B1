// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

contract Bank{
    //mapping(type of key=>type of value) mappingName;
    uint public count;
    mapping(uint=>address)public addressCount;
    mapping(address=>uint) public  balanceLedger;

    modifier balanceCheck(uint amt){
        
        require(balanceLedger[msg.sender]>=amt,"Insufficient balance");
         _;
       
    }

    function deposit()public payable {
        if(balanceLedger[msg.sender]==0){
            addressCount[++count]=msg.sender;
        }
        balanceLedger[msg.sender]+=msg.value;
    }

    function withdraw(uint amt)public balanceCheck(amt){
        // if(balanceLedger[msg.sender]>=amt){
            // require(balanceLedger[msg.sender]>=amt,"Insufficient balance");
            balanceLedger[msg.sender]-=amt;
            payable(msg.sender).transfer(amt);
        // }
    }

    function transferTo(address _recepient, uint amt) public balanceCheck(amt){
        // if(balanceLedger[msg.sender]>amt){
            // require(balanceLedger[msg.sender]>amt,"Insufficient Balance");
            balanceLedger[msg.sender]-=amt;
            payable(_recepient).transfer(amt);
        
        
    }

    function monitorBal()public view  returns(address,uint){
        uint maxBalance;
        address maxAddress;
        for(uint i=1;i<=count;i++){
            maxAddress= addressCount[i];
            if(maxBalance<balanceLedger[maxAddress]){
                maxBalance=balanceLedger[maxAddress];
            }
        }
        return(maxAddress,maxBalance);
    }
}