const promise = new Promise((resolve, reject) => {
    const num = Math.random();
    let a =5
    if (num >= 0.5) {
      resolve(a);
    } else {
      reject("Promise failed!");
    }
  });

promise
    .then(function(msg){
    console.log(msg);
})
    .catch(function(errmsg) {
        console.log(errmsg);
    })
    .finally(function () {
        console.log("The code execution is completed");
    })
