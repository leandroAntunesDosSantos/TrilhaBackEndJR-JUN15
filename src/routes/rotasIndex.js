const rotasUsuarios = require("./rotasUsuarios")
const rotasTarefas = require("./rotasTarefas")
const rotasLogin = require("./rotasLogin");
const autenticacao = require("../middlewares/autenticacao");

const rotas = require('express').Router();

rotas.use("/usuario", rotasUsuarios);

rotas.use("/login", rotasLogin);

rotas.use(autenticacao);

rotas.use("/tarefa", rotasTarefas);



module.exports = rotas;