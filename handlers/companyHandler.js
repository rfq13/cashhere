const Company = require("../models/company");

const addCompany = (req, res) => {
  const { code, name } = req.body;
  const company = new Company({ code, name });

  company.save();
  if (company.errors) {
    req.flash("error", company.errors.name.message);
    req.flash("error", company.errors.code.message);
  } else {
    req.flash("success", "Company added");
  }

  res.redirect("/company");
};

const getCompany = (req, res, next) => {
  Company.find({}, (err, companies) => {
    req.view = "company";
    if (!err) {
      req.renderData = { companies };
    }

    next();
  });
};

const getCompanyJson = (req, res, next) => {
  const params = {};

  try {
    if (req.query.search) {
      params[$or] = [{ code: req.query.search }, { name: req.query.search }];
    }
  } catch (error) {}

  Company.find(params, (err, companies) => {
    if (!err) {
      res.json(companies);
    }
  });
};

module.exports = { addCompany, getCompany, getCompanyJson };
