const express = require('express')
const app = express()
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
var Produto=require('./modelo/produto')

app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname, 'public')));

// Inicializa o servidor na porta 3000
app.listen(3000,function(){
    console.log('Conectado!')
})

// Esta realizando uma função e dentro da função esta realizando um codigo
// O codigo diz que esta renderizando a pagina "index.ejs" e na págia não esta recebendo nenhum arquivo(nao tem nenhuma informação sendo enviada)
app.get('/',function(req,res){
    Produto.find({}).lean().exec(
        function(err,docs){
            if(err){
                res.render('index.ejs',{"msg":err})
            }else{
                res.render('index.ejs',{"Produtos":docs})
            }
        }
    )
})

// Esta realizando uma função que tem uma requisição e uma resposta
// Dentro da função tem como resposta a renderização do "cadastro.ejs" e no "cadastro.ejs" ele envia o que esta na função
app.get('/cadastro',function(req,res){
    res.render('cadastro.ejs',{})
})

// O metodo post é o chamado de alguma coisa atravez de um formulario, chamando alguma coisa atravez das informações do formulario
// Quando renderiza o mesmo "index.ejs", só que com as informações do formulario que ja havia sido preenchino no campo anterior
// A diferenças entre os "index.ejs" é que o do post ele manda as informações que foram mandadas pelo formulario
app.post('/cadastro', function(req,res){
    var produto=new Produto({
        marca:req.body.marca, 
        tipo:req.body.tipo, 
        cor:req.body.cor, 
        valor:req.body.preco
    })
    produto.save(function(err){
        if(err){
            res.render('cadastro.ejs', {"msg":err})
        }
        else{
            res.render('cadastro.ejs', {"msg": 'Adicionado com sucesso!'})
        }
    })
})
//Deleta o item
app.get('/deletar/:id',function(req,res){
    Produto.findByIdAndDelete(req.params.id,function(err,produto){
        Produto.find({}).lean().exec(function(err,docs){
            res.render('index.ejs',{"Produtos":docs,msg:"Deletado com sucesso!!"})
        })
    })
})