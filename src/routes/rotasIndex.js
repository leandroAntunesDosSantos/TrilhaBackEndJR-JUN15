const rotasUsuarios = require("./rotasUsuarios")
const rotasTarefas = require("./rotasTarefas")
const rotasLogin = require("./rotasLogin")

const rotas = require('express').Router();

rotas.use("/usuario", rotasUsuarios);
rotas.use("/tarefa", rotasTarefas);
rotas.use("/login", rotasLogin);


module.exports = rotas;