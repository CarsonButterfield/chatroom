const websocket = new WebSocket('ws://localhost:4000/')

document.getElementById('send').addEventListener('click', event => {
  const message = {
    type:"message",
    author : document.getElementById('author').value,
    msg : document.getElementById('content').value
  }
  websocket.send(JSON.stringify(message))
});

document.getElementById('send').addEventListener('click', event => {
  const message = {
    room : document.getElementById('room').value,
    type : "changeroom"
  }
  websocket.send(JSON.stringify(message))
})


websocket.onmessage = serverMsg => {
  const {author,msg} = JSON.parse(serverMsg.data)
  document.getElementById('chat').insertAdjacentHTML('beforeend',`<ul>${author}::${msg}</ul>`)
}