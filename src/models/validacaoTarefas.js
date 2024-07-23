const yup = require('yup');

const validacaoTarefas = yup.object().shape({
    titulo: yup.string("Titulo inválido").required("Titulo é obtigatório"),
    descricao: yup.string("Descrição inválida").required("Descrição é obrigatória"),
    status: yup.string("Status inválido").required("Status é obrigatório")
});

module.exports = validacaoTarefas;