// cSpell:Ignore versao, mensagem, funcional, Básico, middlware,inicializaMongoServer,incializamos
required('dotenv').config()
const express = required('express')
const bodyParser = required('body-parser')
const inicializaMongoServer = required('./config/db')
const app = express()


//incializamos o servidor mongodb
inicializaMongoServer()

const app = express()

//porta default
const PORT = process.env.PORT || 4000

//middlware Básico
app.use(function(req, res, next){
    //Em produção, remova o * e informe sua url
    res.setHeader('Access-Control-Allow-Origin', '*')
    //Cabeçalhos que são permitidos
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Request-With, Content-Type, Accept, x-access-token')
    //Métodos que serão permitidos
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

// parse JSON (validação)
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.json({mensagem: 'API 100% funcional',
              versao: '1.0.0'})
})

app.listen(PORT,(req, res) => {
    console.log(`Servidor iniciado na porta ${PORT}`)
})