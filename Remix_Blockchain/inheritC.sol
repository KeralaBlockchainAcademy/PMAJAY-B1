// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract BaseOne {
   struct Book { 
        uint id;
        string title;
        string author;
   }
   
   Book public book;

   function setBook() public {
        book = Book(1001, 'Learn Blockchain Part 1', 'KBA');
   }
}

contract DerivedOne is BaseOne {
    function getBookDetails() public view returns (uint, string memory, string memory) {
        return (book.id, book.title, book.author);
   }
}

