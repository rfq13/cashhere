const User = require("../models/user");

const {
  compare,
  state: { session },
  hash,
} = require("../utils/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  let route = "/auth/login";

  if (!user) {
    req.flash("error", "User not found");
  } else if (!compare(password, user.password)) {
    req.flash("error", "Invalid password");
  } else if (user) {
    session.user = user;
    route = "/";
  }

  res.redirect(route);
};

const register = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    req.flash("error", "User already exists");
    // redirect back
    res.redirect("/auth/register");
  } else {
    password = await hash(password);
    const newUser = new User({ email, password });
    await newUser.save();
    req.flash("success", "User created");
    res.redirect("/auth/login");
  }
};

module.exports = { login, register };
