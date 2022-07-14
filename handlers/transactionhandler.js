const Transaction = require("../models/transaction");
const Company = require("../models/company");
const Item = require("../models/item");

const addTransaction = (req, res) => {
  const { item, company, quantity } = req.body;
  const transaction = new Transaction({ item, company, quantity });

  transaction.save();

  if (transaction.errors) {
    req.flash("error", transaction.errors.item.message);
    req.flash("error", transaction.errors.company.message);
    req.flash("error", transaction.errors.quantity.message);
  } else {
    req.flash("success", "transaction added");
  }

  res.redirect("/transaction");
};

const getTransaction = async (req, res, next) => {
  // get traansaction with populate company and item
  const transactions = await Transaction.find()
    .populate("company")
    .populate("item")
    .exec();

  const companies = await Company.find({});
  const items = await Item.find({});
  req.view = "transaction";

  req.renderData = { transactions, items, companies };
  next();
};

const getJson = (req, res) => {
  const params = {};

  try {
    if (req.query.search) {
      params[$or] = [{ code: req.query.search }, { name: req.query.search }];
    }
  } catch (error) {}

  Transaction.find(params, (err, transactions) => {
    if (!err) {
      res.json(transactions);
    }
  });
};

const getCsv = async (req, res) => {
  const transactions = await Transaction.find()
    .populate("company")
    .populate("item")
    .exec();

  let results = [];

  transactions.forEach((transaction) => {
    results.push({
      item: transaction.item.name,
      company: transaction.company.name,
      quantity: transaction.quantity,
    });
  });

  res.csv(results, true);
};

module.exports = { addTransaction, getTransaction, getJson, getCsv };
