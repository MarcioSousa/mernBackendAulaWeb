//cSpell:ignore UsuarioSchema, ativo, tipo, muito, usuário, curto, usuario, criadoEm, alteradoEm, obrigatório, senha, administrador, cliente,digitador, maxlength
const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [2, 'O nome do usuário é muito curto'],
        maxlength: [30, 'O nome do usuário é muito grande'],
        required: [true, 'O nome do usuário é obrigatório']
    },
    senha:{type: String, required: true},
    avatar: {type: String, required: false},
    ativo: {type: Boolean, default: true},
    tipo: {type: String, enum:['administrador','cliente','digitador'], default:'cliente'},
    email: {type: String, unique:true},
},{
    timestamps:{createdAt: 'criadoEm', updatedAt:'alteradoEm'}
})

module.exports = mongoose.model('usuario', UsuarioSchema)