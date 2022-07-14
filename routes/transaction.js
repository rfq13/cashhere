const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransaction,
  getJson,
  getCsv,
} = require("../handlers/transactionHandler");

router.route("/").get(getTransaction).post(addTransaction);
router.get("/getjson", getJson);
router.get("/getcsv", getCsv);

module.exports = router;
