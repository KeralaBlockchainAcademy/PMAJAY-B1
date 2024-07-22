const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
  })
);


app.use("/", routes);
// app.use("/auth", authRoute)
app.use("/", authRoute)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://mongodb:27017/kba_courses");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
