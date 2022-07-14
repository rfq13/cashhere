const express = require("express");
const router = express.Router();
const { addItem, getItem, getItemJson } = require("../handlers/itemHandler");

router.route("/").get(getItem).post(addItem);

router.get("/getjson", getItemJson);

module.exports = router;
