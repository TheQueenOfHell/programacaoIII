const endereco="mongodb://localhost:27017/loja"
const mongoose=require('mongoose')

mongoose.connect(enderco, {useNewUrlParser: true})
mongoose.set('useFindAndModify',false)

module.exports=mongoose