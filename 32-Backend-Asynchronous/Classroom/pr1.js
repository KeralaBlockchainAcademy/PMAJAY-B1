let promise = new Promise(function (resolve, reject) {
    const x = "geeksforgeeks";
    const y = "geeksforgeeaks"
    if (x === y) {
        resolve();
    } else {
        reject();
    }
});

// console.log(promise);

promise.
    then(function () {
        console.log('Success, You are a GEEK');
    }).
    catch(function () {
        console.log('Some error has occurred');
    }); 
    