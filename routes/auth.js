const express = require("express");
const { nextTick } = require("process");
const { login, register } = require("../handlers/authHandler");
const authenticated = require("../middlewares/authenticated");
const getFlash = require("../utils/flash");
const { state } = require("../utils/auth");

const router = express.Router();

router
  .route("/login")
  .post(login)
  .get((req, res, next) => {
    req.view = "login";
    req.renderData = {
      title: "Login Page",
    };
    next();
  });

router.get("/logout", authenticated, (req, res) => {
  req.session.destroy();
  state.session.user = null;

  res.redirect("/auth/login");
});

router
  .route("/register")
  .post(register)
  .get((req, res, next) => {
    req.renderData = { title: "Registration Page" };
    req.view = "register";
    next();
  });

module.exports = router;
