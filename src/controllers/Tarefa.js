const openDB = require('../database/configDB');
const validacaoTarefas = require('../models/validacaoTarefas');

const criarTabelaTarefa = async () =>{
    try {
        const criarTabelaTarefaDB = await openDB();
        await criarTabelaTarefaDB.run(`CREATE TABLE IF NOT EXISTS Tarefa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            status TEXT NOT NULL,
            usuario_id INTEGER NOT NULL,
            FOREIGN KEY(usuario_id) REFERENCES Usuario(id)
        )`);
        await criarTabelaTarefaDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const buscarTarefasUsuario = async (usuario_id) =>{
    try {
        const buscarTarefasUsuarioDB = await openDB();
        let tarefas = await buscarTarefasUsuarioDB.all(`SELECT * FROM Tarefa WHERE usuario_id = ?`, [usuario_id]);
        if (!tarefas) {
            return res.status(400).json({ erro: "Nenhuma tarefa foi encontrada"});
        }
        await buscarTarefasUsuarioDB.close();
        return tarefas;
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const buscarTarefaId = async (params_id, user_id) =>{
    try {
        const buscarTarefaIdDB = await openDB();
        let tarefa = await buscarTarefaIdDB.get(`SELECT * FROM Tarefa WHERE id = ? AND usuario_id = ?`, [params_id, user_id]);
        if (!tarefa) {
            return res.status(400).json({ erro: "Nenhuma tarefa foi encontrada"});
        }
        await buscarTarefaIdDB.close();
        return tarefa;
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const inserirTarefa = async (tarefa, usuario_id) =>{
    try {
        await validacaoTarefas.validate(tarefa);
        const inserirTarefaDB = await openDB();
        await inserirTarefaDB.run(`
        INSERT INTO Tarefa (titulo, descricao, status, usuario_id) VALUES (?, ?, ?, ?)
    `, [tarefa.titulo, tarefa.descricao, tarefa.status, usuario_id]);
        await inserirTarefaDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const alterarTarefa = async (tarefa, id_params, user_id) =>{
    try {
        await validacaoTarefas.validate(tarefa);
        const alterarTarefaDB = await openDB();
        await alterarTarefaDB.run(`
        UPDATE Tarefa SET titulo = ?, descricao = ?, status = ? WHERE id = ? AND usuario_id = ?
    `, [tarefa.titulo, tarefa.descricao, tarefa.status, id_params, user_id]);
        await alterarTarefaDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const deletarTarefa = async (tarefa, user_id) =>{
    try {
        const deletarTarefaDB = await openDB();
        await deletarTarefaDB.run(`
        DELETE FROM Tarefa WHERE id = ? AND usuario_id = ?
    `, [tarefa.id, user_id]);
        await deletarTarefaDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

//remocao returns pois apresentava erro

module.exports = {
    criarTabelaTarefa,
    buscarTarefasUsuario, 
    buscarTarefaId,
    inserirTarefa,
    alterarTarefa,
    deletarTarefa
}