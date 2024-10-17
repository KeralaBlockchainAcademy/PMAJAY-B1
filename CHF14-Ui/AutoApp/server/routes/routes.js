const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

router.post("/readcar", async (req, res) => {
  try {
    const { carId } = req.body;
    let mvdClient = new clientApplication();
    let cars = await mvdClient.submitTxn(
      "manufacturer",
      "autochannel",
      "KBA-Automobile",
      "CarContract",
      "queryTxn",
      "",
      "readCar",
      carId
    );
    const data = new TextDecoder().decode(cars);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "Car data read successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the Car ID!",
      data: { error },
    });
  }
});

router.post("/createcar", async (req, res) => {
  try {
    const { carId, make, model, color, dom, ownedBy } = req.body;

    let ManufacturerClient = new clientApplication();

    const result = await ManufacturerClient.submitTxn(
      "manufacturer",
      "autochannel",
      "KBA-Automobile",
      "CarContract",
      "invokeTxn",
      "",
      "createCar",
      carId,
      make,
      model,
      color,
      dom,
      ownedBy
    );

    res.status(201).json({
      success: true,
      message: "Car created successfully!",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the Car ID!",
      data: { error },
    });
  }
});


module.exports = router;
