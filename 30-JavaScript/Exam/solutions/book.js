const books = new Map([
    [1, { title: 'To Kill a Mockingbird', author: 'Harper Lee' }],
    [2, { title: '1984', author: 'George Orwell' }],
    [3, { title: 'Moby Dick', author: 'Herman Melville' }]
  ]);
  
  const addBook = (id, title, author) => {
    if (books.has(id)) {
      console.log(`A book with ID ${id} already exists.`);
    } else {
      books.set(id, { title, author });
      console.log(`Book "${title}" by ${author} added successfully.`);
    }
  };
  
  const removeBook = (id) => {
    if (books.delete(id)) {
      console.log(`Book with ID ${id} removed successfully.`);
    } else {
      console.log(`No book found with ID: ${id}`);
    }
  };
  
  const searchBooks = (query) => {
    const results = [];
    for (let [id, book] of books) {
      if (book.title.includes(query) || book.author.includes(query) || id.toString().includes(query)) {
        results.push({ id, ...book });
      }
    }
  
    if (results.length > 0) {
      console.log('Search results:');
      results.forEach(book => console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}`));
    } else {
      console.log('No books found matching the query.');
    }
  };
  
  const updateBook = (id, newTitle, newAuthor) => {
    if (books.has(id)) {
      const book = books.get(id);
      book.title = newTitle || book.title;
      book.author = newAuthor || book.author;
      books.set(id, book);
      console.log(`Book with ID: ${id} updated successfully.`);
    } else {
      console.log(`No book found with ID: ${id}`);
    }
  };
  
  const generateReport = () => {
    if (books.size === 0) {
      console.log('No books in the library.');
    } else {
      console.log('Library Summary Report:');
      for (let [id, book] of books) {
        console.log(`ID: ${id}, Title: ${book.title}, Author: ${book.author}`);
      }
    }
  };
  
  // Hardcoded operations
  console.log("Initial Library:");
  generateReport();
  
  // Add a new book
  addBook(4, 'The Great Gatsby', 'F. Scott Fitzgerald');
  generateReport();
  
  // Remove a book
  removeBook(2);
  generateReport();
  
  // Search for books
  console.log("Search for 'Moby Dick':");
  searchBooks('Moby Dick');
  
  // Update a book
  updateBook(1, 'To Kill a Mockingbird', 'Harper Lee Updated');
  generateReport();
  
  // Generate final report
  console.log("Final Library Report:");
  generateReport();  