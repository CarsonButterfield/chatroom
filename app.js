//this is a project I worked on for an afternoon to better understand websockets so I could assist some students in my class

const WebSocket = require('ws')
const port = process.env.PORT || 4000
//rooms are WIP
class Room {
  constructor(creator) {
    this.members = [creator]
    this.messages = []
  }
}
const rooms = {}

const wss = new WebSocket.Server({
  port
})
const changeRoom = (parsed,ws) => {
if (rooms[parsed.newroom]) {
        if (rooms[parsed.oldroom]) {
          rooms[parsed.oldroom].members = rooms[parsed.oldroom].members.filter(mem => mem.user !== parsed.user)
        }
        rooms[parsed.newroom].members.push(ws)
        ws.send(JSON.stringify(rooms[parsed.newroom].messages))
      }
}
//slightly unfinished as Im building rooms out, originally all the users connected were stored together
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const parsed = JSON.parse(message)
    ws.user = parsed.user
    const {type,oldroom,newroom,...content} = parsed
    if (type === "roomchange") {
      changeRoom(parsed,ws)
      
    }
    if(type === "message"){
      rooms[room].messages.push(content)
      //without rooms this was basically all it needed to work, just replaces rooms[room] with an array of all users
      rooms[room].members.forEach(user => {
        user.send(content)
      })
    }
  });


});