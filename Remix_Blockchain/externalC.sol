//SPDX-License-Identifier:MIT
pragma solidity ^0.8.23;

contract ContractA {
   string public message = "Hi Contract A";
  
   function setMessage(string memory _message) public {
       message = _message;
   }
}

contract ContractB {
   ContractA objA =  ContractA(0xf2B1114C644cBb3fF63Bf1dD284c8Cd716e95BE9);

   function getMessageFromContractA() public view returns(string memory) {
       return objA.message();
   }
  
}