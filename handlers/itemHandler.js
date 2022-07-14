const Item = require("../models/item");

const addItem = (req, res) => {
  const { name, price, stock } = req.body;
  const item = new Item({ name, price, stock });
  item.save();
  if (item.errors) {
    req.flash("error", item.errors.name.message);
    req.flash("error", item.errors.price.message);
    req.flash("error", item.errors.stock.message);
  } else {
    req.flash("success", "Item added");
  }

  res.redirect("/item");
};

const getItem = (req, res, next) => {
  Item.find({}, (err, items) => {
    req.view = "item";
    if (!err) {
      req.renderData = { items };
    }
    next();
  });
};

const getItemJson = (req, res, next) => {
  const params = {};

  try {
    if (req.query.search) {
      params.name = req.query.search;
    }
  } catch (error) {}

  Item.find(params, (err, items) => {
    if (!err) {
      res.json(items);
    }
  });
};

module.exports = { addItem, getItem, getItemJson };
