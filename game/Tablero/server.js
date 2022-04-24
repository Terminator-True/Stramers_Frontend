const server = require("express")();
const http = require("http").createServer(server)
const cors = require("cors");
const shuffle = require("shuffle-array");
let players = {};
let rooms = {};
let Nrooms = 0;
let readyCheck = 0;
let gameState = "Initializing";

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET","POST"]
    }
})

io.on("connection", function(socket){
    /**
     * Socket.io tiene una herramienta de rooms,
     * se ha de adaptar todas las conexiones 
     * para que funcione con éstas rooms
     */
    console.log("A user connected: "+socket.id)
    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false
    }
    
    /*if (Object.keys(players).length==2) { 
       Nrooms++;
        rooms["room"+Nrooms.toString()]=players
        players={}
    }*/
    //console.log(rooms)
    if (Object.keys(players).length<2) {
        players[socket.id].isPlayerA = true;
        io.emit("firstTurn");
    }
    /**
     * @inDeck se hará una petición al backend de usuarios y 
     * éste devolverá el mazo principal(nombres de las cartas)
     */
    socket.on("dealDeck", function(socketId) {
        players[socketId].inDeck = shuffle(["Elxokas","Mdlr","Garmy","Programador","Streamer"])
        if (Object.keys(players).lenght < 2) return;
        io.emit("changeGameState", "Initializing")
    })
    socket.on("dealCards", function(socketId){
        for(let i=0; i<5; i++){
            if (players[socketId].inDeck===0) {
                players[socketId].inDeck = shuffle(["Elxokas","Mdlr","Garmy","Programador","Streamer"])
            }
            players[socketId].inHand.push(players[socketId].inDeck.shift());
        }
        io.emit("dealCards", socketId, players[socketId].inHand);
        readyCheck++;
        if(readyCheck >= 2){
            gameState="Ready";
            io.emit("changeGameState","Ready")
        }
    })
    socket.on("cardPlayed", function(cardName, socketId){
        io.emit("cardPlayed", cardName, socketId);
        io.emit("changeTurn");
    })

    socket.on("close", function(){
        players = {};
    })
})


http.listen(3000, function(){
    console.log("[+] server started")
}) 