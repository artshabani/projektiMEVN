// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//middlewares

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.log(err));

//routes prefix
app.use("/api/movies", require("./routes/routes"));

app.use("/users", require("./routes/userRoute"));

app.use("/logs", require("./routes/logsRoute"));

app.use("/updateNoImage", require("./routes/updateNoImage"));

//start server

app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
