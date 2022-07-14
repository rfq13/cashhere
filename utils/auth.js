const bcrypt = require("bcrypt");

const state = { session: {} };

const compare = (password, hash) => bcrypt.compareSync(password, hash);

const hash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

module.exports = { compare, hash, state };
