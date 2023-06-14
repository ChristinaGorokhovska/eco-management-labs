require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./routes/routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const PORT = process.env.NODE_LOCAL_PORT || 3020;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cookieParser());

app.use(cors(corsOptions));

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT || 27017}/${DB_NAME}`, {
    useNewUrlParser: true,
  })
  .catch((err: any) => console.log(err));
mongoose.connection.on("connected", () => console.log("Connected to db"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT || 8082, () => {
  console.log(`Server is working on ${PORT} port`);
});

app.use("/api", apiRoutes);
