const path = require("path");
var cors = require("cors");

const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const errHandler = require("./middlewares/error");
const images = require("./routes/image");

const app = express();

app.use(express.json());

const limitter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});
app.use(limitter);
app.use(fileupload());

app.use(cors());

app.use("/public", express.static(path.join(__dirname, "/public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.status(200).send("Hello world");
});

app.use("/api/v1/images", images);

//app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(
  PORT,
  console.log(
    `Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections (Close server)
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
