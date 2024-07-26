const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaSecreta');
const openDB = require('../database/configDB');
const validacaoAutenticacao = require('../models/validacaoAutenticacao');
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    try {
        await validacaoAutenticacao.validate(req.body);
        const buscarUsuarioDB = await openDB();
        const usuario = await buscarUsuarioDB.get(`SELECT * FROM Usuario WHERE email = ?`, [req.body.email]);
        if(!usuario){
            return res.status(400).json({ erro: "Email ou senha inválidos" });
        }
        const senhaValida = bcrypt.compare(req.body.senha, senhaSecreta);
        if(!senhaValida){
            return res.status(400).json({ erro: "Email ou senha inválidos" });
        }
        await buscarUsuarioDB.close();
        const token = jwt.sign({ id: usuario.id }, senhaSecreta, { expiresIn: '8h' });
        return res.status(200).json({token});
    } catch (error) {
        return res.status(400).json({ erro: error.message });
    }
}

module.exports = {
    login
}