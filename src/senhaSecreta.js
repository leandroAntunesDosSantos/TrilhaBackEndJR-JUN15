require("dotenv").config();

const { SENHA_SECRETA } = process.env;

module.exports = SENHA_SECRETA;
