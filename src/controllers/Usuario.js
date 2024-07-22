const openDB = require('../database/configDB');


const criarTabelaUsuario = async () =>{
    const criarTabelaPessoa = await openDB();
    await criarTabelaPessoa.run(`
        CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            senha TEXT NOT NULL
        )
    `);
    await criarTabelaPessoa.close();
}

const criarUsuario = async (usuario) =>{
    const criarUsuarioDB = await openDB();
    await criarUsuarioDB.run(`
        INSERT INTO Usuario (nome, email, senha ) VALUES (?, ?, ?)
    `, [usuario.nome, usuario.email, usuario.senha]);
    await criarUsuarioDB.close();
}

const modificarUsuario = async (usuario, id) =>{
    const modificarUsuarioDB = await openDB();
    await modificarUsuarioDB.run(`
        UPDATE Usuario SET nome = ?, email = ?, senha = ? WHERE id = ?
    `, [usuario.nome, usuario.email, usuario.senha, id]);
    await modificarUsuarioDB.close();
}

const deletarUsuario = async (id) =>{
    const deletarUsuarioDB = await openDB();
    await deletarUsuarioDB.run(`
        DELETE FROM Usuario WHERE id = ?
    `, [id]);
    await deletarUsuarioDB.close();
}

module.exports = {
    criarTabelaUsuario,
    criarUsuario,
    modificarUsuario,
    deletarUsuario
}


