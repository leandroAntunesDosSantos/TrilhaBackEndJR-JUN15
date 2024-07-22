const rotasLogin = require('express').Router();
const { login } = require('../controllers/Login');


rotasLogin.post('/', login);

module.exports = rotasLogin;

