const rotasUsuarios = require('express').Router();
const rotasLogin = require('./rotasLogin');
const autenticacao = require("../middlewares/autenticacao");

const {criarTabelaUsuario,criarUsuario,modificarUsuario, deletarUsuario} = require("../controllers/Usuario");


criarTabelaUsuario();


rotasUsuarios.post('/criar', criarUsuario);

rotasUsuarios.use(autenticacao);

rotasUsuarios.put('/alterar', modificarUsuario);

rotasUsuarios.delete('/deletar', deletarUsuario);

module.exports = rotasUsuarios;

