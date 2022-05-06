const server = require("express")();
const http = require("http").createServer(server)
const cors = require("cors");
const shuffle = require("shuffle-array");
const { Socket } = require("socket.io");
let waiting = [];
let rooms = {};
let Nrooms = 0;
let readyCheck=0;
let gameState = "Initializing";
let roomId = Nrooms%2==0 ? Nrooms:Nrooms-1

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET","POST"]
    }
})

io.on("connection", function(socket){

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
        let players={}
        players[waiting[0]] = {
                inDeck: [],
                inHand: [],
                isPlayerA: true
        }
        players[waiting[1]] = {
                inDeck: [],
                inHand: [],
                isPlayerA: false
        }
        rooms[roomId.toString()]=players
        players={}
        //console.log(waiting[1])
        waiting.splice(0,2)
        Nrooms++;
        /**
         * Parece que esto no funciona en el segundo usuario
         * no envía la accion match al cliente
         */
        io.sockets.in(roomId.toString()).emit("match")

    }

    /**
     * @inDeck se hará una petición al backend de usuarios y 
     * éste devolverá el mazo principal(nombres de las cartas)
     */
    socket.on("dealDeck", function(roomId,socketId) {
        console.log("dealdeck roomId: "+rooms)
        console.log("dealdeck socketId: "+socketId)
        rooms[roomId][socketId].inDeck = shuffle(["elxokas","mdlr","garmy","programador","streamer"])
        if (Object.keys(rooms[roomId]).lenght < 2) return;
        io.sockets.in(roomId).emit("changeGameState", "Initializing")
    })

    socket.on("dealCards", function(roomId,socketId){
        console.log("dealCard roomId: "+rooms)
        console.log("dealCard socketId: "+socketId)
        for(let i=0; i<5; i++){
            if (rooms[roomId][socketId].inDeck===0) {
                rooms[roomId][socketId].inDeck = shuffle(["elxokas","mdlr","garmy","programador","streamer"])
            }
            rooms[roomId][socketId].inHand.push(rooms[roomId][socketId].inDeck.shift());
        }
        io.sockets.in(roomId).emit("dealCards",roomId, socketId, rooms[roomId][socketId].inHand);
        readyCheck++;
        if(readyCheck >= 2){
            readyCheck=0;
            gameState="Ready";
            io.sockets.in(roomId).emit("changeGameState","Ready")
        }
    })
    socket.on("cardPlayed", function(cardName,roomId, socketId){
        io.sockets.in(roomId).emit("cardPlayed", cardName, socketId);
        io.sockets.in(roomId).emit("changeTurn");
    })

    socket.on("disconnecting", function(socketId){
        console.log(socket.rooms)
        socket.leave(socket.room);
        
    })


})


http.listen(3000, function(){
    console.log("[+] server started")
}) 