const conexao=require('./conexao')

var ProdutoSchema=new conexao.Schema({
    marca:{
        type:String
    },
    tipo:{
        type:String
    },
    cor:{
        type:String
    },
    valor:{
        type:Number
    }
})

module.exports=conexao.model("Produto",ProdutoSchema)