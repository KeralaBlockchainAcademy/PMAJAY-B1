function delay() {
    return new Promise((resolve) => {
    setTimeout(resolve, 1000);
    });
    }
    
    
    function double(num){
    return num*2;
    }
    
    
    async function start(arr){
    let new_arr=[];
    for(i=0;i<arr.length;i++){
    let temp=double(arr[i]);
    console.log(temp);
    new_arr.push(temp);
    await delay();
    }
    
    console.log(new_arr);
    }
    
    start([1,2,3,4,5])
    