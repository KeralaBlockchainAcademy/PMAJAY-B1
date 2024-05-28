const shoppingCart= new Map();

shoppingCart.set("Apple",2);
shoppingCart.set("Banana", 3);
shoppingCart.set("Milk",1);

const prices = {"Apple":0.80,"Banana":0.50,"Milk":2.50};
let totalCost = 0;

console.log("Invoice:");
console.log("Item\t Quantity\t\tPrice\t\tTotal");

shoppingCart.forEach((quantity,item)=>{
    const itemPrice = prices[item];
    const itemTotal = itemPrice * quantity;
    totalCost += itemTotal;

    console.log(`${item}\t\t${quantity}\t\t${itemPrice}\t\t${itemTotal}`);
});

console.log("\nTotal Cost:",totalCost.toFixed(2));
