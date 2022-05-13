import io from "socket.io-client"
export default class SocketHandler{
    constructor(scene){
        scene.socket = io("http://localhost:3000");

        scene.socket.on("connect", ()=>{
            console.log("connected: "+scene.socket.id)
            scene.socket.emit("getInRoom")
        })

        scene.socket.on("room", (roomId)=>{
            scene.room={roomId:roomId,playerId:scene.socket.id,playerA:null};
                
        })

        scene.socket.on("match", ()=>{
            scene.socket.emit("dealDeck", scene.room.roomId, scene.room.playerId)
            scene.socket.emit("dealCards",scene.room.roomId, scene.room.playerId)
        })

        scene.socket.on("firstTurn", ()=>{
            setTimeout(() => {
                scene.room.playerA=true;
            }, 500);
            scene.GameHandler.changeTurn();
        })
        
        scene.socket.on("changeGameState",(gameState)=>{
            scene.GameHandler.changeGameState(gameState);            
            if (gameState === "Initializing") {
                scene.DeckHandler.dealCard(1550, 960, "cardBack", "playerCard")
                scene.DeckHandler.dealCard(1550,135, "cardBack","opponentCard")
                scene.changeTrun.setInteractive()
                scene.changeTrun.setColor("#00ffff")
                console.log(scene.GameHandler.playerLife)
                scene.GameHandler.playerLife.text=scene.GameHandler.player.life.toString()

                scene.GameHandler.opponentLife.text=scene.GameHandler.opponent.life.toString()
            }
        })

        scene.socket.on("changeTurn", ()=>{
            scene.GameHandler.changeTurn();
        })

        scene.socket.on("dealCards", (roomId,socketId, cards) =>{
            if (scene.room.roomId === roomId) {    
                if ( socketId === scene.room.playerId) {
                    for (let i in cards) {
                        let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(658+(i*170), 960, cards[i], "playerCard"))
                    }
                }else{
                    for(let i in cards){
                        let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(658+(i*170), 135, "cardBack", "opponentCard"))
                    }
                }
            }
        })
        scene.socket.on("dealCard", (roomId,socketId, cards) =>{
            if (scene.room.roomId === roomId) {    
                if (socketId === scene.room.playerId) {
                    for (let i = 0; i < scene.GameHandler.playerHand.length; i++) {
                        scene.GameHandler.playerHand[i].destroy();  
                    }
                    scene.GameHandler.playerHand.splice()
                    for (let i in cards) {
                        let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(658+(i*170), 960, cards[i], "playerCard"))
                    }
                }else{
                    for(let i in cards){
                        let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(658+(i*170), 135, "cardBack", "opponentCard"))
                    }
                }
            }
        })
        scene.socket.on("cardPlayed", (cardName, roomId,socketId)=>{
            if (roomId === scene.room.roomId) {
                if (socketId !== scene.room.playerId) {
                    scene.GameHandler.opponentHand.shift().destroy();

                    let gameObject=scene.DeckHandler.dealCard((scene.opponentZone.x-350)+(scene.opponentZone.data.values.cards*170), scene.opponentZone.y, cardName, "opponentCard");
                    scene.GameHandler.opponent.manaA=scene.GameHandler.opponent.manaA-gameObject.data.list.cost
                    scene.GameHandler.opponentMana.text=scene.GameHandler.opponent.manaA.toString()+"/"+ scene.GameHandler.opponent.manaMax.toString()

                    scene.opponentZone.data.values.cards_list[scene.opponentZone.data.values.cards]=gameObject;
                    scene.opponentZone.data.values.card_text[scene.opponentZone.data.values.cards]=scene.add.bitmapText(gameObject.x-40,gameObject.y-145,"text",scene.opponentZone.data.values.cards_list[scene.opponentZone.data.values.cards].data.list.dmg+"/"+scene.opponentZone.data.values.cards_list[scene.opponentZone.data.values.cards].data.list.life).setFontSize(24) 
                    scene.opponentZone.data.values.cards++;
                }
            }
        })

        scene.socket.on("disconnecting",()=>{
            scene.socket.emit("disconnecting", scene.socket.id)

        })
    }
}
