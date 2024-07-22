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

const buscarTarefas = async () =>{
    const buscarTarefasDB = await openDB();
    let tarefas = await buscarTarefasDB.all(`SELECT * FROM Tarefa`);
    return tarefas;
}

const buscarTarefa = async (id) =>{
    const buscarTarefaDB = await openDB();
    let tarefa = await buscarTarefaDB.get(`SELECT * FROM Tarefa WHERE id = ?`, [id]);
    return tarefa;
}

const inserirTarefa = async (tarefa) =>{
    const inserirTarefaDB = await openDB();
    await inserirTarefaDB.run(`
        INSERT INTO Tarefa (titulo, descricao, status, usuario_id) VALUES (?, ?, ?, ?)
    `, [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.usuario_id]);
    await inserirTarefaDB.close();
}

const alterarTarefa = async (tarefa, id) =>{
    const alterarTarefaDB = await openDB();
    await alterarTarefaDB.run(`
        UPDATE Tarefa SET titulo = ?, descricao = ?, status = ? usuario_id = ? WHERE id = ?
    `, [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.usuario_id, id]);
    await alterarTarefaDB.close();
}

const deletarTarefa = async (id) =>{
    const deletarTarefaDB = await openDB();
    await deletarTarefaDB.run(`
        DELETE FROM Tarefa WHERE id = ?
    `, [id]);
    await deletarTarefaDB.close();
}

module.exports = {
    criarTabelaTarefa,
    buscarTarefa,
    buscarTarefas,
    inserirTarefa,
    alterarTarefa,
    deletarTarefa
}