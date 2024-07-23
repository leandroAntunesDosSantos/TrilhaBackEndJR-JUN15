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
        return error.message;
    }
}

const criarUsuario = async (req, res) =>{
    const usuario = req.body;
    try {
        await validacaoUsuarios.validate(usuario);
        const criarUsuarioDB = await openDB();
        const buscarEmail = await criarUsuarioDB.get(`SELECT * FROM Usuario WHERE email = ?`, [usuario.email]);
        if(buscarEmail){
            return res.status(400).json({ Msg: "Email já cadastrado" });
        }
        await criarUsuarioDB.run(`
            INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)
        `, [usuario.nome, usuario.email, usuario.senha]);
        await criarUsuarioDB.close();
        return res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const modificarUsuario = async (req,res) =>{
    const usuario = req.body;
    const id = req.usuario.id;
    try {
        await validacaoUsuarios.validate(usuario);
        const modificarUsuarioDB = await openDB();
        const buscarEmail = await modificarUsuarioDB.get(`SELECT * FROM Usuario WHERE email = ? AND id != ?`, [usuario.email, id]);
        if(buscarEmail){
            return res.status(400).json({ Msg: "Email já cadastrado" });
        }
        await modificarUsuarioDB.run(`
            UPDATE Usuario SET nome = ?, email = ?, senha = ? WHERE id = ?
        `, [usuario.nome, usuario.email, usuario.senha, id]);
        await modificarUsuarioDB.close();
        return res.status(200).json({ mensagem: "Usuário modificado com sucesso" });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

const deletarUsuario = async (req,res) =>{
    const id = req.usuario.id;
    try {
        const deletarUsuarioDB = await openDB();
        await deletarUsuarioDB.run(`DELETE FROM Usuario WHERE id = ?`, [id]);
        await deletarUsuarioDB.close();
        return res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
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


