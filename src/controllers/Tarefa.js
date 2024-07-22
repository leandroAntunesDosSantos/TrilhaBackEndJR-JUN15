const openDB = require('../database/configDB');

const criarTabelaTarefa = async () =>{
    const criarTabelaTarefa = await openDB();
    await criarTabelaTarefa.run(`
        CREATE TABLE IF NOT EXISTS Tarefa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            status TEXT NOT NULL,
            usuario_id INTEGER NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        )
    `);
    await criarTabelaTarefa.close();
}

const buscarTarefasUsuario = async (usuario_id) =>{
    const buscarTarefasDB = await openDB();
    let tarefas = await buscarTarefasDB.all(`SELECT * FROM Tarefa WHERE usuario_id = ?`, [usuario_id]);
    return tarefas;

}

const buscarTarefaId = async (params_id, user_id) =>{
    const buscarTarefaIdDB = await openDB();
    let tarefa = await buscarTarefaIdDB.get(`SELECT * FROM Tarefa WHERE id = ? AND usuario_id = ?`, [params_id, user_id]);
    return tarefa;
}

const inserirTarefa = async (tarefa, usuario_id) =>{
    const inserirTarefaDB = await openDB();
    await inserirTarefaDB.run(`
        INSERT INTO Tarefa (titulo, descricao, status, usuario_id) VALUES (?, ?, ?, ?)
    `, [tarefa.titulo, tarefa.descricao, tarefa.status, usuario_id]);
    await inserirTarefaDB.close();
}

const alterarTarefa = async (tarefa, id_params, user_id) =>{
    const alterarTarefaDB = await openDB();
    await alterarTarefaDB.run(`
        UPDATE Tarefa SET titulo = ?, descricao = ?, status = ? WHERE id = ? AND usuario_id = ?
    `, [tarefa.titulo, tarefa.descricao, tarefa.status, id_params, user_id]);
    await alterarTarefaDB.close();
}

const deletarTarefa = async (tarefa, user_id) =>{
    const deletarTarefaDB = await openDB();
    await deletarTarefaDB.run(`
        DELETE FROM Tarefa WHERE id = ? AND usuario_id = ?
    `, [tarefa, user_id]);
    await deletarTarefaDB.close();
}

module.exports = {
    criarTabelaTarefa,
    buscarTarefasUsuario, 
    buscarTarefaId,
    inserirTarefa,
    alterarTarefa,
    deletarTarefa
}