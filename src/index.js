require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");

const authRouter = require("./routes/authRoutes");
const trackRouter = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const mongoUri =
  "mongodb+srv://admin:a0a0a0a0@cluster0-mkbs8.mongodb.net/test?retryWrites=true&w=majority";
const app = express();

app.use(bodyParse.json()); // use parser before the router
app.use(authRouter);
app.use(trackRouter);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", err => {
  console.error("error connecting to mongo", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
