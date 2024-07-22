const rotasTarefas = require('express').Router();

const {criarTabelaTarefa,buscarTarefaId, inserirTarefa, alterarTarefa, deletarTarefa, buscarTarefasUsuario} = require("../controllers/Tarefa");

criarTabelaTarefa();

//todas as tarefas
rotasTarefas.get("/",  async (req, res) => {
    const {id} = req.params;
    if(id){
        let tarefa = await buscarTarefasUsuario(Number(req.usuario.id),Number(id)); 
        return res.status(201).json(tarefa);
    }
    let tarefas = await buscarTarefasUsuario(Number(req.usuario.id));
    return res.status(201).json(tarefas);
}
);

//tarefa por id ////////////
rotasTarefas.get("/:id", async (req, res) => {
    let tarefa = await buscarTarefaId(Number(req.params.id), Number(req.usuario.id));
    res.status(201).json(tarefa);
    }
);

//criar tarefa
rotasTarefas.post("/", (req, res) => {
    inserirTarefa(req.body, req.usuario.id);
    res.status(201).json({
        message: "Tarefa inserida com sucesso"
    });
});

//modificar tarefa
rotasTarefas.put("/:id", (req, res) => {
    alterarTarefa(req.body, req.params.id, req.usuario.id);
    res.status(200).json({
        message: "Tarefa alterada com sucesso"
    });
    }
);

//deletar tarefa

rotasTarefas.delete("/:id", (req, res) => {
    deletarTarefa(req.params.id, req.usuario.id);
    res.status(200).json({
        message: "Tarefa deletada com sucesso"
    });
    }
);

module.exports = rotasTarefas;