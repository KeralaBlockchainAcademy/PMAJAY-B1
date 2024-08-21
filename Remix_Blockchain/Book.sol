// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

contract Book{

    string  title;
    uint price;

    function setBook(string memory x,uint y)public  {
        title=x;
        price=y;
    }

    function getBook()public view returns(string memory,uint){
        return (title,price);
    }



}

