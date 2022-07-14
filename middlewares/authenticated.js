const { state } = require("../utils/auth");

module.exports = (req, res, next) => {
  if (state.session.user) {
    next();
  } else {
    req.flash("warning", "you're not logged in!");
    res.redirect("/auth/login");
  }
};
