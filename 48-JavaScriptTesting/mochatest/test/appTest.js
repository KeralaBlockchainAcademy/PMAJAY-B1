const assert = require('chai').assert
const { sayHello, addNumbers } = require('../app')


//Results
sayHelloResult = sayHello()
addNumbersResult = addNumbers(5, 5)

describe('App', () => {

    describe('sayHello', () => {
        it('should return hello', () => {
            assert.equal(sayHelloResult, 'hello')
        })

        it('should return type string', () => {
            // let result = sayHello()
            assert.typeOf(sayHelloResult, 'string')
        })
    })

    describe('addNumbers', () => {
        it('should be above 5', () => {
            // let result = addNumbers(5, 5);
            // let result = addNumbers(1, 1);
            assert.isAbove(addNumbersResult, 5)
        })

        it('should return type number', () => {
            // let result = addNumbers()
            assert.typeOf(addNumbersResult, 'number')
        })
    })


})