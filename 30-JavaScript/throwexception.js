function checkAge(age){
    if(age<18){
        throw new Error("You must be 18 or older.");
    }else{
        console.log("You are allowed!")
    }
}

try{
    checkAge(16);
}catch(error){
    console.log("Error:"+error.message);

} finally{
    console.log("Thanks for visiting!");
}