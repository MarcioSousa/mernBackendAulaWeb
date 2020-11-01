//cSpell:ignore Usuario, Padrão, usuário, informe, sucesso, existe, outro, erro, incluído, válido, caracteres, informado, administrador, cliente, mínimo, tipo, senha, Funcionou, mensagem
const express = require('express')
const { check, validationResult } = require('express-validator')
const { restart } = require('nodemon')
const router = express.Router()
const Usuario = required('../model/Usuario')

/* URL Padrão: localhost:4000/usuario */
//router.get('/',(req, res) =>{res.json({mensagem: 'Usuário Ok'})})

router.post('/', [
    check('nome', 'Por favor informe o nome do usuário').not().isEmpty(),
    check('email', 'Informe um email válido').isEmail(),
    check('senha', 'Informe uma senha com no mínimo 6 caracteres').isLength({ min: 6 }),
    check('tipo', 'Informe um tipo de usuário válido!').isIn(['administrador', 'cliente']),
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        /*else{
            return restart.status(200).json(){
                ok: 'Funcionou!'
            }
        }*/

        const { nome, email, senha, avatar, tipo } = req.body
        try {
            let usuario = await Usuario.findOne({ email })
            
            if (usuario) {
                return res.status(400).json({
                    mensagem: 'O email informado já existe com outro usuário!'
                })
            }
            usuario = new usuario({nome, email, senha, avatar, tipo})
            await usuario.save()
            return res.json({'mensagem': 'Usuário incluído com sucesso!'})

        }catch(e){
            return res.json({'mensagem': 'erro'})
        }
    }
)

module.exports = router