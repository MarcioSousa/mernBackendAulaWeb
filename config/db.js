//cSpell:ignore Permite,Utiliza,Conexao, criação,MONTOURI, conectar, servidores, novos, possível, padrão, descoberta, utilizará, InicializaMongoServer, Conectado
const mongoose = require('mongoose')
//String de Conexao
const MONTOURI = process.env.MONGODB_URL

const InicializaMongoServer = async() => {
    try{
        await mongoose.connect(MONTOURI, {
            useNewUrlParser: true,   //Utiliza o novo parser do mongo
            useCreateIndex: true,    //Permite a criação de índices
            useFindAndModify: true,  //Por padrão utilizará o findOneAndUpdate
            useUnifiedTopology: true //Permite a descoberta de novos servidores
        })
        console.log('Conectado ao MongoDB!')
    }catch(e){
        console.log('Não foi possível conectar ao MongoDB')
        console.error(e)
        throw e
    }
}

module.exports = InicializaMongoServer