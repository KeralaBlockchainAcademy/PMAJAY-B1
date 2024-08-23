// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;
contract DemoF{
    string Msg;
    address payable public admin;
    constructor(){
        admin=payable(msg.sender);
    }
    function setMsg(string memory _msg)public{
        Msg=_msg;
    }
    fallback() external payable {
        revert();
     }
     receive() external payable {
        admin.transfer(msg.value);
      }

}