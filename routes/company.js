const express = require("express");
const router = express.Router();
const {
  addCompany,
  getCompany,
  getCompanyJson,
} = require("../handlers/companyHandler");

router.route("/").get(getCompany).post(addCompany);

router.get("/getjson", getCompanyJson);

module.exports = router;
