const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");

app.use(
  cors({ 
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/", routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


