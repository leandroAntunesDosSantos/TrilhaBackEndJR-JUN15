const rotasTarefas = require('express').Router();

const {criarTabelaTarefa,buscarTarefa, buscarTarefas, inserirTarefa, alterarTarefa, deletarTarefa} = require("../controllers/Tarefa");

criarTabelaTarefa();

//todas as tarefas
rotasTarefas.get("/",  async (req, res) => {
    let tarefas = await buscarTarefas();
    return res.status(201).json(tarefas);
}
);

//tarefa por id
rotasTarefas.get("/:id", async (req, res) => {
    let tarefa = await buscarTarefa(req.params.id);
    return res.status(201).json(tarefa);
 }
);

//criar tarefa
rotasTarefas.post("/", (req, res) => {
    inserirTarefa(req.body);
    res.status(201).json({
        message: "Tarefa inserida com sucesso"
    });
});

//modificar tarefa
rotasTarefas.put("/:id", (req, res) => {
    let {id} = req.params;
    alterarTarefa(req.body, req.params.id);
    res.status(200).json({
        message: "Tarefa alterada com sucesso"
    });
    }
);

//deletar tarefa

rotasTarefas.delete("/:id", (req, res) => {
    let {id} = req.params;
    deletarTarefa(id);
    res.status(200).json({
        message: "Tarefa deletada com sucesso"
    });
    }
);

module.exports = rotasTarefas;