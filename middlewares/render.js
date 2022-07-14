const getFlash = require("../utils/flash");

const {
  state: { session },
} = require("../utils/auth");

module.exports = async (req, res, next) => {
  const flash = await getFlash(req);

  // if req has key renderData
  if (!Object.hasOwnProperty.call(req, "renderData")) {
    req.renderData = {};
  }

  let isLogin = false;
  // check is login
  if (session.user) {
    isLogin = true;
  }

  // if title page is not set
  if (!Object.hasOwnProperty.call(req.renderData, "title")) {
    req.renderData.title = "Hallo";
  }

  res.render(req.view, {
    ...req.renderData,
    user: session.user,
    isLogin,
    flash,
  });
};
