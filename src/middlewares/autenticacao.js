const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaSecreta');
const openDB = require('../database/configDB');

const autenticacao = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({erro: "Token não informado"});
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const { id } = jwt.verify(token, senhaSecreta);
        const buscarUsuarioDB = await openDB();
        const usuario = await buscarUsuarioDB.get(`SELECT * FROM Usuario WHERE id = ?`, [id]);
        if(!usuario){
            return res.status(401).json({erro: "Usuário não encontrado"});
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({erro: "Token inválido"});
    }
}

module.exports = autenticacao;