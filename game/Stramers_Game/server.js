const server = require("express")();
const http = require("http").createServer(server)
const cors = require("cors");
const shuffle = require("shuffle-array");
const { Socket } = require("socket.io");
let waiting = [];
let rooms = {};
let Nrooms = 0;
let readyCheck=0;

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET","POST"]
    }
}) 

io.on("connection", function(socket){
    let roomId = Nrooms //Nrooms%2==0 ? Nrooms:Nrooms-1
    console.log("A user connected: "+socket.id)
    waiting.push(socket.id)
    
    socket.on("getInRoom", ()=> {
        //console.log(socket.id+" connected to "+roomId)
        socket.join(roomId.toString());
        socket.room=roomId.toString();
        socket.emit("room",roomId.toString())
        console.log(socket.id+" connected to "+socket.room)
    })

    if (waiting.length>1) { 
        console.log(waiting)
        io.to(socket.id).emit("firstTurn");
        let players={}
        players[waiting[0]] = {
                inDeck: [],
                inHand: [],
                isPlayerA: false
        }
        players[waiting[1]] = {
                inDeck: [],
                inHand: [],
                isPlayerA: true
        }
        rooms[roomId.toString()]=players
        players={}
        //console.log(waiting[1])
        waiting.splice(0,2)
        Nrooms++;
         setTimeout(()=>{
            io.sockets.in(roomId.toString()).emit("match")
         },500)
    }

    /**
     * @inDeck se hará una petición al backend de usuarios y 
     * éste devolverá el mazo principal(nombres de las cartas)
     */
    socket.on("dealDeck", function(roomId,socketId) {
        console.log("dealdeck roomId: "+roomId)
        console.log("dealdeck socketId: "+socketId)
        console.log(rooms)
        rooms[roomId][socketId].inDeck = shuffle(["elxokas","mdlr","garmy","programador","streamer"])
        if (Object.keys(rooms[roomId]).lenght < 2) return;
        io.sockets.in(roomId).emit("changeGameState", "Initializing")
    })

    socket.on("dealCards", function(roomId,socketId){
        console.log("dealCard roomId: "+roomId)
        console.log("dealCard socketId: "+socketId)
        for(let i=0; i<5; i++){
            if (rooms[roomId][socketId].inDeck===0) {
                rooms[roomId][socketId].inDeck = shuffle(["elxokas","mdlr","garmy","programador","streamer"])
            }
            rooms[roomId][socketId].inHand.push(rooms[roomId][socketId].inDeck.shift());
        }
        io.sockets.in(roomId).emit("dealCards",roomId, socketId, rooms[roomId][socketId].inHand);
        readyCheck++;
        if(readyCheck === 2){
            readyCheck=0;
            io.sockets.in(roomId).emit("changeGameState","Ready")
        }
    })
    socket.on("cardPlayed", function(cardName,roomId, socketId){
        io.sockets.in(roomId).emit("cardPlayed", cardName,roomId, socketId);
    })

    socket.on("changeTurn", function(roomId){
        io.sockets.in(roomId).emit("changeTurn");
    })



    socket.on("disconnecting", function(){
        delete rooms[socket.room]
        console.log(socket.room)
        socket.leave(socket.room);  
    })
})

http.listen(3000, function(){
    console.log("[+] server started")
}) 