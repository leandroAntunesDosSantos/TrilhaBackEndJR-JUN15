const yup = require('yup');

const validacaoAutenticacao = yup.object().shape({
    email: yup.string("Email incorreto").email("Informe um email válido").required("o email é obrigatório"),
    senha: yup.string("Informe uma senha válida").required("A senha é obrigatória")
});

module.exports = validacaoAutenticacao;