import io from "socket.io-client"
export default class SocketHandler{
    constructor(scene){
        scene.socket = io("http://localhost:3000");

        scene.socket.on("connect", ()=>{
            console.log("connected")
            scene.socket.emit("dealDeck", scene.socket.id)
        })

        scene.socket.on("firstTurn", ()=>{
            scene.GameHandler.changeTurn();
        })
        scene.socket.on("changeGameState",(gameState)=>{
            scene.GameHandler.changeGameState(gameState);
            if (gameState === "Initializing") {
                scene.DeckHandler.dealCard(1550, 960, "cardBack", "playerCard")
                scene.DeckHandler.dealCard(1550,135, "cardBack","opponentCard");
                scene.dealCards.setInteractive();
                scene.dealCards.setColor("#00ffff")
            }
        })

        scene.socket.on("changeTurn", ()=>{
            scene.GameHandler.changeTurn();
        })

        scene.socket.on("dealCards", (socketId, cards) =>{
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(658+(i*170), 960, cards[i], "playerCard"))
                }
            }else{
                for(let i in cards){
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(658+(i*170), 135, "cardBack", "opponentCard"))
                }
            }
        })

        scene.socket.on("cardPlayed", (cardName, socketId)=>{
            if (socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().destroy();
                let gameObject=scene.DeckHandler.dealCard((scene.opponentZone.x-350)+(scene.opponentZone.data.values.cards*170), scene.opponentZone.y, cardName, "opponentCard");
                console.log(gameObject);
                scene.opponentZone.data.values.cards_list[scene.opponentZone.data.values.cards]=gameObject;
                scene.add.text(gameObject.x-20,gameObject.y-145,scene.opponentZone.data.values.cards_list[scene.opponentZone.data.values.cards].data.list.dmg+"/"+scene.opponentZone.data.values.cards_list[scene.opponentZone.data.values.cards].data.list.life).setFontSize(24)
                scene.opponentZone.data.values.cards++;
            }
        })



    }
}
