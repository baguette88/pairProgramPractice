// setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3003;
const cors = require("cors");

// middleware
app.use(express.json());

const whitelist = [
  "http://localhost:3000",
  "https://mcdonalds.com",
  "https://burgerking.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// mongoose connection logic
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () =>
  console.log("mongo is disconnected")
);

mongoose.connect("mongodb://localhost:27017/animals", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// animals controller
const animalsController = require("./controllers/animals.js");
app.use("/animals", animalsController);

app.listen(PORT, () => {
  console.log("celebrations happening on port", PORT);
});
