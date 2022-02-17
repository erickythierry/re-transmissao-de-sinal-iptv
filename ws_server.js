var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');
var fs = require('fs');
var express = require('express');
const {PassThrough} = require('stream')

const app = express();
var wss = new WebSocketServer({port: 8098});

// variavel que vai receber e armazenar temporariamente os "pedaços" da stream
var d = new PassThrough()

// servidor express para servir a replicação da stream
app.listen(3000, ()=>{
    console.log(`servidor rodando...`)
});

// servidor web socket criado para receber a stream
wss.on('connection', function connect(ws) {

    // aqui é criado um arquivo do tipo WriteStream que vai recebendo os "pedaços" da stream enviada via websocket
    const nome = 'output'
    const writeStream = fs.createWriteStream(nome)

    writeStream.on('open', () => {
        
        // aqui é criado o objeto websocket que conecta com o cliente que ta enviando a stream
        let stream = websocket(ws);
        
        // salvando a stream recebida no arquivo criado mais acima
        stream.pipe(writeStream)

        // aqui a stream recebida tambem é redirecionada para a variavel d criada no começo do arquivo
        // essa variavel que vai armazenar temporariamente os "pedaços" da stream que estamos recebendo
        stream.pipe(d)
        
        // evento que informa no terminal quando o script client começa a enviar a stream
        stream.once('data', ()=>{
            console.log('recebendo streaming do cliente...')
        })
        stream.on('error', (err) => {
            if (err) console.log(err.message)
            console.log(`erro: fechando websocket`)
            stream.unpipe(d)
        }).on('close', (err) => {
            if (err) console.log(err.message)
            console.log(`close: fechando websocket`)
            stream.unpipe(d)
        })
      
        writeStream.on('close', () => {
          console.log(`fechando arquivo:  tamanho: ${fs.statSync(nome).size} bytes`)
        })
    })
    
});

// servidor http que serve a stream replicada para os players
// caso o player se conecte na url http:// ip_do_servidor : 3000 / multi a stream sera enviada para ele
app.get('/multi', (req, res) => {

    console.log('nova conexão')

    // aqui nos reenviamos para o response do express os "pedaços" da stream que está sendo armazenado temporariamente na variavel d
    d.pipe(res)
    
    // evento que observa se o player fechou a conexão
    req.on('close', () =>{

        console.log('conexão fechada')

        // caso o player desconecte, é desfeito o envio de dados para o player especifico
        d.unpipe(res)
        
    })

})

