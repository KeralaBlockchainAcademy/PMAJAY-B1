const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "invokeTxn",
    "",
    "createCar",
    "Car-33",
    "Tata",
    "Nexon",
    "White",
    "22/05/2023",
    "Manufacturer-2"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Car successfully created")
})