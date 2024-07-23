const rotasUsuarios = require('express').Router();
const rotasLogin = require('./rotasLogin');
const autenticacao = require("../middlewares/autenticacao");

const {criarTabelaUsuario,criarUsuario,modificarUsuario, deletarUsuario} = require("../controllers/Usuario");

criarTabelaUsuario();


rotasUsuarios.post('/', criarUsuario);

//estar logado para acessar as rotas
//rotasUsuarios.use("/login", rotasLogin);
rotasUsuarios.use(autenticacao);

rotasUsuarios.put('/', modificarUsuario); // Rota para modificar um usuário

rotasUsuarios.delete('/', deletarUsuario);

module.exports = rotasUsuarios;
