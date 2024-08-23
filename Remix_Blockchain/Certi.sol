// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract Cert{

    struct Certificate{
        string name;
        string course;
        string grade;
        string date;
    }
    mapping(uint=>Certificate) public Certificates;
    address public admin;
    constructor(){
        admin=msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender==admin,"Unauthorized acess");
        _;
    }

    function issue(uint _id,string memory _name,string memory _course,string memory _grade,string memory _date)public onlyAdmin{
        // Certificates[_id].name=_name;
        // Certificates[_id].course=_course;
        // Certificates[_id].grade=_grade;
        // Certificates[_id].date=_date;
        Certificates[_id]=Certificate(_name,_course,_grade,_date);
    }
}