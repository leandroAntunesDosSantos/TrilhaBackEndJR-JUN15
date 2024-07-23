const rotasUsuarios = require("./rotasUsuarios")
const rotasTarefas = require("./rotasTarefas")
const rotasLogin = require("./rotasLogin");
const autenticacao = require("../middlewares/autenticacao");
const rotasSwagger = require("./rotasSwagger");

const rotas = require('express').Router();

rotas.use("/usuario", rotasUsuarios);
rotas.use("/docs", rotasSwagger);
rotas.use("/login", rotasLogin);

rotas.use(autenticacao);

rotas.use("/tarefa", rotasTarefas);



module.exports = rotas;
