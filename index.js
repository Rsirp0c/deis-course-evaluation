require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");

const connectFlash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const passport = require("passport");
const User = require("./models/user");
const router = require("./routes/index");


const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to mongodb!");
});

app.use(morgan(":method :url :status * :response-time ms"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());


app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(cookieParser("secret-pascode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 40000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

const server = app.listen(PORT, () => {
  console.log("application is running");
});

