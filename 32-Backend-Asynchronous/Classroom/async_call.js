function greetAsync(name, callback) {
    console.log("Hello, " + name + "!");
    setTimeout(callback, 10000); // Schedule callback execution after 1 second
    console.log("I came before callback")
  }

function sayGoodbye() {
    console.log("Goodbye!");
  }
  
  greetAsync("Bob", sayGoodbye);  // Asynchronous call, greeting first, goodbye after 1 sec
  