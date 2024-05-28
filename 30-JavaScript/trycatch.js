function riskyOperation(){
    let obj;
    return obj.property //trying to return a property which does not exist
}

try{
    //code which might have error
    let result = riskyOperation();
    console.log(result)
}catch(error){
    //code to handle error
    console.log("An error occurred:"+error.message);
} finally{
    //executes always
    console.log("This always executes!")
}