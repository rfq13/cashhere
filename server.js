require("dotenv").config();

const { PORT, MONGODB_URL } = process.env;

const express = require("express");

const app = express();
const route = require("./routes");
const mongoose = require("mongoose");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const mongooseHidden = require("mongoose-hidden");
const { flash } = require("express-flash-message");
const { updateIfCurrentPlugin } = require("mongoose-update-if-current");
var csv = require("csv-express");

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs"); //setting view
app.use(express.static(__dirname + "/public")); //setting public folder
app.use(express.urlencoded({ extended: true })); //setting body parser
app.use(flash({ sessionKeyName: "flashMessage" })); //setting flash message

app.use(route); //setting route

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB  🔗`))
  .catch((err) => console.log(err));

mongoose.plugin(updateIfCurrentPlugin);
mongoose.plugin(mongooseHidden);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, function () {
  console.log(`👂  📢  ${PORT}`);
});
