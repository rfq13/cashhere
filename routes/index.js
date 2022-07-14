const express = require("express");
const authenticated = require("../middlewares/authenticated");
const render = require("../middlewares/render");

// make routes
const router = express.Router();

router.get(
  "/",
  authenticated,
  function (req, res, next) {
    var today = new Date();
    var currrentDay = today.getDay();
    var day = "";

    if (currrentDay === 6 || currrentDay === 0) {
      day = "Weekend";
    } else {
      day = "Weekday";
    }

    req.view = "home";
    req.renderData = { kindOfDay: day, title: "kuntol" };
    next();
  },
  render
);
router.use("/auth", require("./auth"), render);
router.use("/company", authenticated, require("./company"), render);
router.use("/transaction", authenticated, require("./transaction"), render);
router.use("/item", authenticated, require("./item"), render);
module.exports = router;
