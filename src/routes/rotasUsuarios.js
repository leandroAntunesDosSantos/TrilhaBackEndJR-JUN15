const rotasUsuarios = require('express').Router();

const {criarTabelaUsuario,criarUsuario,modificarUsuario, deletarUsuario} = require("../controllers/Usuario");

criarTabelaUsuario();

rotasUsuarios.post('/', async (req, res) => {
    const usuario = req.body;
    await criarUsuario(usuario);
    res.status(201).send();
});

rotasUsuarios.put('/:id', async (req, res) => {
    const usuario = req.body;
    const id = req.params.id;
    await modificarUsuario(usuario, id);
    res.status(200).send();
});

rotasUsuarios.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await deletarUsuario(id);
    res.status(200).send();
});

module.exports = rotasUsuarios;