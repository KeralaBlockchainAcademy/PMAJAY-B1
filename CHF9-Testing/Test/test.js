 
const assert = require('assert');

const add = require('./add');
describe('add', function () {
    it('should add two numbers', function () {
        assert.equal(add(1, 2), 3);
        assert.equal(add(5, 10), 15);
    });
    it('should handle negative numbers', function () {
        assert.equal(add(-1, -2), -3);
    });

    it('should not return the wrong result', function () {
        assert.notEqual(add(1, 2), 4);
    });


});

