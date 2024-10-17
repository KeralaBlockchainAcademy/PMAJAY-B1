const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "readCar",
    "Car-23",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Car details: ")
            // Log the JSON object
            console.log(jsonObject);
});



