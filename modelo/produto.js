const conexao=require('./conexao')

var Produto=new conexao.Schema({
    marca:{
        type:String
    },
    tipo:{
        type:String
    },
    cor:{
        type:String
    }
    valor:{
        type:Double
    }
})

modulo.exports=conexao.Model("Produto",Produto)