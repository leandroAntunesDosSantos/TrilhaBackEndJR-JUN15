const rotasUsuarios = require("./rotasUsuarios")
const rotasTarefas = require("./rotasTarefas")

const rotas = require('express').Router();

rotas.use("/usuario", rotasUsuarios);
rotas.use("/tarefa", rotasTarefas);


module.exports = rotas;