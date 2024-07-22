const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaSecreta');
const openDB = require('../database/configDB');


const login = async (req, res) => {
    const { email, senha } = req.body;
    const buscarUsuarioDB = await openDB();
    const usuario = await buscarUsuarioDB.get(`SELECT * FROM Usuario WHERE email = ? AND senha = ?`, [email, senha]);
    if(!usuario){
        return res.status(401).json({erro: "Email ou senha inválidos"});
    }
    const token = jwt.sign({ id: usuario.id }, senhaSecreta, { expiresIn: '8h' });
    return res.status(200).json({token});
}

module.exports = {
    login
}