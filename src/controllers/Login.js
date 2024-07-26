const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaSecreta');
const openDB = require('../database/configDB');
const validacaoAutenticacao = require('../models/validacaoAutenticacao');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    try {
        const usuario = req.body;
        await validacaoAutenticacao.validate(usuario);
        const loginDB = await openDB();
        const buscarUsuario = await loginDB.get(`SELECT * FROM Usuario WHERE email = ?`, [usuario.email]);
        await loginDB.close();
        if(!buscarUsuario){
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        const senhaCorreta = await bcrypt.compare(usuario.senha, buscarUsuario.senha);
        if(!senhaCorreta){
            return res.status(400).json({ erro: "Senha incorreta" });
        }
        const token = jwt.sign({ id: buscarUsuario.id }, senhaSecreta, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    login
}

