## ASSIGNMENT QUESTIONS:

## Callback

1. Create a callback hell functionality with a minimum of 4 callbacks each function should do a separate task. 

Eg:

Student started studying Programming, studying Frontend, Studying HTML, Studying CSS, Studying Tailwind, Studying Frameworks, Studying React, Studying Next JS.

2. Simulating a Coin Flip:
Write a function flipCoin(callback) that simulates a coin flip using a callback function. The callback should be called with either "heads" or "tails" depending on the random outcome.

3. Convert the following synchronous function to use a callback for asynchronous behavior

```bash
function add(a, b) {
    return a * b;
}
```

## Promises

```bash
function job() {
    return new Promise(function(resolve, reject) {
        reject();
    });
}

let promise = job();

promise

.then(function() {
    console.log('Success 1');
})

.then(function() {
    console.log('Success 2');
})

.then(function() {
    console.log('Success 3');
})

.catch(function() {
    console.log('Error 1');
})

.then(function() {
    console.log('Success 4');
});
```

Explain the flow of this code

2. Write a Node.js program that fetches data from a public API using Promise concept.(Try with jsonplaceholder)

3. Write a Node.js program that processes an array of numbers. The program should double each number in the array, but with a simulated delay of 1 second for each number using Promises.

