const openDB = require('../database/configDB');
const validacaoUsuarios = require('../models/validacaoUsuarios');


const criarTabelaUsuario = async () =>{
    try {
        const criarTabelaUsuarioDB = await openDB();
        await criarTabelaUsuarioDB.run(`CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            senha TEXT NOT NULL
        )`);
        await criarTabelaUsuarioDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const criarUsuario = async (usuario) =>{
    try {
        await validacaoUsuarios.validate(usuario);
        const criarUsuarioDB = await openDB();
        await criarUsuarioDB.run(`
            INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)
        `, [usuario.nome, usuario.email, usuario.senha]);
        await criarUsuarioDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const modificarUsuario = async (usuario, id) =>{
    try {
        await validacaoUsuarios.validate(usuario);
        const modificarUsuarioDB = await openDB();
        await modificarUsuarioDB.run(`
            UPDATE Usuario SET nome = ?, email = ?, senha = ? WHERE id = ?
        `, [usuario.nome, usuario.email, usuario.senha, id]);
        await modificarUsuarioDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const deletarUsuario = async (id) =>{
    try {
        const deletarUsuarioDB = await openDB();
        await deletarUsuarioDB.run(`DELETE FROM Usuario WHERE id = ?`, [id]);
        await deletarUsuarioDB.close();
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    criarTabelaUsuario,
    criarUsuario,
    modificarUsuario,
    deletarUsuario
}


