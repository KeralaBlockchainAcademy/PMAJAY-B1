var express = require('express');
var router = express.Router();
const { clientApplication } = require('./client');
const { EventListener } = require('./events')

let eventClient = new EventListener()
eventClient.contractEventListener("manufacturer", "autochannel", "KBA-Automobile")

/* GET home page. */
router.get('/', function (req, res, next) {
  let mvdClient = new clientApplication();

  mvdClient.submitTxn(
    "mvd",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "queryAllCars"
  )
    .then(cars => {
      const dataBuffer = new TextDecoder().decode(cars);
      console.log("cars are ", dataBuffer)
      const value = JSON.parse(dataBuffer)
      console.log("History DataBuffer is", value)
      res.render('index', { title: 'Automobile Consortium', itemList: value });
    }).catch(err => {
      res.render("error", {
        message: `Some error occured`,
        callingScreen: "error",
      })
    })
});

router.get('/manufacturer', function (req, res, next) {
  let manufacturerClient = new clientApplication();
  manufacturerClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "queryAllCars"
  ).then(cars => {
    const data = new TextDecoder().decode(cars);
    const value = JSON.parse(data)
    res.render('manufacturer', { title: 'Manufacturer Dashboard', itemList: value });
  }).catch(err => {
    res.render("error", {
      message: `Some error occured`,
      callingScreen: "error",
    })
  })

});

router.get('/dealer', function (req, res, next) {
  res.render('dealer', { title: 'Dealer Dashboard' });
});

router.get('/event', function (req, res, next) {
  console.log("Event Response: ", eventClient.getEvents().toString())
  var event = eventClient.getEvents().toString()
  res.send({ carEvent: event })
});

router.get('/mvd', function (req, res, next) {
  let mvdClient = new clientApplication();
  mvdClient.submitTxn(
    "mvd",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "queryAllCars"
  )
    .then(cars => {
      const dataBuffer = new TextDecoder().decode(cars);
      console.log("cars are ", dataBuffer)
      const value = JSON.parse(dataBuffer)
      console.log("History DataBuffer is", value)
      res.render('mvd', { title: 'MVD Dashboard', itemList: value });
    }).catch(err => {
      res.render("error", {
        message: `Some error occured`,
        callingScreen: "error",
      })
    })
});

router.post('/manuwrite', function (req, res) {
  const vin = req.body.VinNumb;
  const make = req.body.CarMake;
  const model = req.body.CarModel;
  const color = req.body.CarColor;
  const DOM = req.body.DOM;
  const flag = req.body.CarFlag;

  let ManufacturerClient = new clientApplication();

  ManufacturerClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "invokeTxn",
    "",
    "createCar",
    vin, make, model, color, DOM, flag
  ).then(result => {
    console.log("result is : ", result)
    res.status(200).send({ message: "Added Car" })
  }
  )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Add`, message: `${error}` })
    });
});

router.post('/manuread', async function (req, res) {
  const Qvin = req.body.QVinNumb;
  let ManufacturerClient = new clientApplication();

  ManufacturerClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "readCar", Qvin)
    .then(result => {
      // const newMessage = new TextDecoder().decode(result);
      res.status(200).send({ Cardata: new TextDecoder().decode(result) });
    }).catch(error => {
      res.status(500).send({ error: `Failed to Read`, message: `${error}` })
    });

})

//  Get History of a car
router.get('/itemhistory', async function (req, res) {
  const carId = req.query.carId;

  let mvdClient = new clientApplication();

  mvdClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "getCarHistory", carId).then(result => {
      const dataBuffer = new TextDecoder().decode(result);
      const value = JSON.parse(dataBuffer)

      console.log("History DataBuffer is====", value)
      res.render('history', { itemList: value, title: "Car History" })

    });

})

//Register a car
router.post('/registerCar', async function (req, res) {
  const Qvin = req.body.QVinNumb;
  const CarOwner = req.body.carOwner;
  const RegistrationNumber = req.body.regNumber
  let MVDClient = new clientApplication();

  MVDClient.submitTxn(
    "mvd",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "invokeTxn",
    "",
    "registerCar", Qvin, CarOwner, RegistrationNumber)
    .then(result => {
      res.status(200).send("Successfully created")
    }).catch(error => {

      res.status(500).send({ error: `Failed to create`, message: `${error}` })
    });

})

// Create order
router.post('/createOrder', async function (req, res) {
  const orderNumber = req.body.orderNumber;
  const carMake = req.body.carMake;
  const carModel = req.body.carModel;
  const carColour = req.body.carColour;
  const dealerName = req.body.dealerName
  let DealerClient = new clientApplication();

  const transientData = {
    make: Buffer.from(carMake),
    model: Buffer.from(carModel),
    color: Buffer.from(carColour),
    dealerName: Buffer.from(dealerName)
  }

  DealerClient.submitTxn(
    "dealer",
    "autochannel",
    "KBA-Automobile",
    "OrderContract",
    "privateTxn",
    transientData,
    "createOrder", orderNumber)
    .then(result => {
      res.status(200).send("Successfully created")
    }).catch(error => {
      res.status(500).send({ error: `Failed to create`, message: `${error}` })
    });
})

router.post('/readOrder', async function (req, res) {
  const orderNumber = req.body.orderNumber;
  let DealerClient = new clientApplication();
  DealerClient.submitTxn(
    "dealer",
    "autochannel",
    "KBA-Automobile",
    "OrderContract",
    "queryTxn",
    "",
    "readOrder", orderNumber).then(result => {
      // const newMessage = new TextDecoder().decode(result);
      res.status(200).send({ orderData: new TextDecoder().decode(result) });
    }).catch(error => {
      console.log(error)
      res.status(500).send({ error: `Failed to Read`, message: `${error}` })
    })
})

//Get all orders
router.get('/allOrders', async function (req, res) {
  let DealerClient = new clientApplication();
  DealerClient.submitTxn(
    "dealer",
    "autochannel",
    "KBA-Automobile",
    "OrderContract",
    "queryTxn",
    "",
    "queryAllOrders").then(result => {
      const dataBuffer = new TextDecoder().decode(result);
      const value = JSON.parse(dataBuffer);
      res.render('orders', { itemList: value, title: "All Orders" })
    }).catch(error => {
      console.log(error)
    })

})

//Find matching orders
router.get('/matchOrder', async function (req, res) {
  const carId = req.query.carId;

  let mvdClient = new clientApplication();
  mvdClient.submitTxn(
    "manufacturer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryTxn",
    "",
    "checkMatchingOrders", carId).then(result => {
      console.log("Matching orders: ", result)
      var dataBuffer = new TextDecoder().decode(result);
      var data = [];
      data.push(dataBuffer, carId)
      console.log("checkMatchingOrders", data)
      const value = JSON.parse(dataBuffer)
      let array = [];
      if (value.length) {
        for (i = 0; i < value.length; i++) {
          array.push({
            "orderId": `${value[i].Key}`, "carId": `${carId}`,
            "Make": `${value[i].Record.make}`, "Model": `${value[i].Record.model}`,
            "Color": `${value[i].Record.color}`,
            "dealerName": `${value[i].Record.dealerName}`, "assetType": `${value[i].Record.assetType}`
          })
        }
      }
      console.log("Array value is ", array)
      console.log("Car id sent", carId)
      res.render('matchOrder', { itemList: array, title: "Matching Orders" })
    });
})

router.post('/match', async function (req, res) {
  const orderId = req.body.orderId;
  const carId = req.body.carId
  let DealerClient = new clientApplication();
  DealerClient.submitTxn(
    "dealer",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "invokeTxn",
    "",
    "matchOrder", carId, orderId).then(result => {
      res.status(200).send("Successfully Matched order")
    }).catch(error => {
      res.status(500).send({ error: `Failed to Match Order`, message: `${error}` })
    });
})


module.exports = router;


