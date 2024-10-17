const { clientApplication } = require('./client')

let userClient = new clientApplication();

const transientData = {
    make: Buffer.from("Tata"),
    model: Buffer.from("Nexon"),
    color: Buffer.from("White"),
    dealerName: Buffer.from("Dealer 2")
}

userClient.submitTxn(
    "dealer",
    "autochannel",
    "KBA-Automobile",
    "OrderContract",
    "privateTxn",
    transientData,
    "createOrder",
    "Order-09",
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Order successfully created")
})