let exampleVariable =5;

if(exampleVariable>0 && exampleVariable <10){
    console.log('exampleVariable is between 0 and 10');
}

if(exampleVariable<0 ||exampleVariable>4){
    console.log('exampleVariable is either less than 0 or greater than 4');
}

if(!exampleVariable){
    console.log('exampleVariable is falsy');
} else{
    console.log('exampleVariable is truthy');
}