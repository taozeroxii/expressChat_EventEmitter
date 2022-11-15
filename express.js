const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const { EventEmitter } = require('events')

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'./views'))
app.use(express.static(path.join(__dirname,'./public')))

const chatEmitter = new EventEmitter();
const chatmessage = [];

app.use(express.json());

//Router
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/chat', (req, res) => {
  res.writeHead(200,{
    'Content-type' : 'text/event-stream',
    'Connection': 'keep-alive',
    'Catche-Control' :'no-cache'
  })
  const onNewMessageHandler = (message) =>{
    res.write(`data: ${JSON.stringify({message})}\n\n`)
  }
  chatEmitter.on('newMessage',onNewMessageHandler)
  res.on('close',onNewMessageHandler)
})

app.post('/chat', (req, res) => {
  chatmessage.push(req.body.message)
  chatEmitter.emit('newMessage',req.body.message)
  res.end()
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
