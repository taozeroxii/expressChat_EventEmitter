const message = document.getElementById('message')
const chatEvent = new EventSource('http://localhost:3000/chat')
chatEvent.addEventListener('message',(event) =>{
  console.log(JSON.parse(event.data).message)
})

async function onSendMessage (event){
  event.preventDefault()
  await fetch('/chat',{
    method: 'post',
    headers:{
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ message:  message.value })
  })
  message.value=''
}

