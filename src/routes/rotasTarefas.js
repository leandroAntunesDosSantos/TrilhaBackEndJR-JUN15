const rotasTarefas = require('express').Router();
const rotasLogin = require('./rotasLogin');
const autenticacao = require("../middlewares/autenticacao");

const {criarTabelaTarefa,buscarTarefasUsuario,buscarTarefaId, inserirTarefa, alterarTarefa, deletarTarefa} = require("../controllers/Tarefa");

criarTabelaTarefa();


//todas as tarefas
rotasTarefas.get("/buscarTarefas", buscarTarefasUsuario);

rotasTarefas.get("/buscarTarefa/:id", buscarTarefaId);

rotasTarefas.post("/criar", inserirTarefa);

rotasTarefas.put("/alterar/:id", alterarTarefa);

rotasTarefas.delete("/deletar/:id", deletarTarefa);

module.exports = rotasTarefas;
