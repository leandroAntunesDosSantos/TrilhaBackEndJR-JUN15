const rotasTarefas = require('express').Router();
const rotasLogin = require('./rotasLogin');
const autenticacao = require("../middlewares/autenticacao");

const {criarTabelaTarefa,buscarTarefasUsuario,buscarTarefaId, inserirTarefa, alterarTarefa, deletarTarefa} = require("../controllers/Tarefa");

criarTabelaTarefa();

//rotasTarefas.use("/login", rotasLogin);
//rotasTarefas.use(autenticacao);

//todas as tarefas
rotasTarefas.get("/", buscarTarefasUsuario);

rotasTarefas.get("/:id", buscarTarefaId);

rotasTarefas.post("/", inserirTarefa);

rotasTarefas.put("/:id", alterarTarefa);

rotasTarefas.delete("/:id", deletarTarefa);

module.exports = rotasTarefas;
