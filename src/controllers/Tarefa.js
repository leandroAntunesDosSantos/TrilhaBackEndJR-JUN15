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
        return error.message;
    }
}

const buscarTarefasUsuario = async (req,res) =>{
    try {
        const buscarTarefasUsuarioDB = await openDB();
        let tarefas = await buscarTarefasUsuarioDB.all(`SELECT * FROM Tarefa WHERE usuario_id = ?`, [req.usuario.id]);
        if(tarefas.length === 0){
            return res.status(404).json({ erro: "Nenhuma tarefa encontrada" });
        }
        await buscarTarefasUsuarioDB.close();
        return res.status(200).json(tarefas);
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const buscarTarefaId = async (req,res) =>{
    const tarefa_id = req.params.id;
    try {
        const buscarTarefaIdDB = await openDB();
        let tarefa = await buscarTarefaIdDB.get(`SELECT * FROM Tarefa WHERE id = ? AND usuario_id = ?`, [tarefa_id, req.usuario.id]);
        if(!tarefa){
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        await buscarTarefaIdDB.close();
        if(tarefa){
            return res.status(200).json(tarefa);
        }else{
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const inserirTarefa = async (req,res) =>{
    const tarefa = req.body;
    try {
        await validacaoTarefas.validate(tarefa);
        const inserirTarefaDB = await openDB();
        await inserirTarefaDB.run(`
            INSERT INTO Tarefa (titulo, descricao, status, usuario_id) VALUES (?, ?, ?, ?)
        `, [tarefa.titulo, tarefa.descricao, tarefa.status, req.usuario.id]);
        await inserirTarefaDB.close();
        return res.status(200).json({ mensagem: "Tarefa criada com sucesso" });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const alterarTarefa = async (req,res) =>{
    const tarefa = req.body;
    const tarefa_id = req.params.id;
    try {
        await validacaoTarefas.validate(tarefa);
        const alterarTarefaDB = await openDB();
        const buscartarefa = await alterarTarefaDB.get(`SELECT * FROM Tarefa WHERE id = ? AND usuario_id = ?`, [tarefa_id, req.usuario.id]);
        if(!buscartarefa){
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        await alterarTarefaDB.run(`
            UPDATE Tarefa SET titulo = ?, descricao = ?, status = ? WHERE id = ? AND usuario_id = ?
        `, [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa_id, req.usuario.id]);
        await alterarTarefaDB.close();
        return res.status(200).json({ mensagem: "Tarefa alterada com sucesso" });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const deletarTarefa = async (req,res) =>{
    const tarefa_id = req.params.id;
    try {
        const deletarTarefaDB = await openDB();
        const buscartarefa = await deletarTarefaDB.get(`SELECT * FROM Tarefa WHERE id = ? AND usuario_id = ?`, [tarefa_id, req.usuario.id]);
        if(!buscartarefa){
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        await deletarTarefaDB.run(`DELETE FROM Tarefa WHERE id = ? AND usuario_id = ?`, [tarefa_id, req.usuario.id]);
        await deletarTarefaDB.close();
        return res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    criarTabelaTarefa,
    buscarTarefasUsuario,
    buscarTarefaId,
    inserirTarefa,
    alterarTarefa,
    deletarTarefa
}
