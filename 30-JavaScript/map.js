let map = new Map();

map.set("name", "john");
map.set("age",30);
map.set("city","Delhi");

map.forEach((value,key)=>{
    console.log(key+'='+value)
});