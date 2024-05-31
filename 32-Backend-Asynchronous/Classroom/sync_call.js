function greet(name, call) {
    console.log("Hello, " + name + "!");
    call(); // Call the callback function immediately
  }
  
  function sayGoodbye() {
    console.log("Goodbye!");
  }
  
  greet("Alice", sayGoodbye);  // Synchronous call, both functions execute immediately
  
  sayGoodbye();