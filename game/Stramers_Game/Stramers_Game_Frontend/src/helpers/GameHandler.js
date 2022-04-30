export default class GameHandler{
    constructor(scene){
        this.gameState = "Initializing"
        this.isMyTurn = false;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.playerHand = [];
        this.opponentHand = [];

        this.changeTurn = () =>{
            this.isMyTurn = !this.isMyTurn;
            console.log("isMyturn:"+this.isMyTurn)
            scene.opponentZone.data
        }

        this.changeGameState = (gameState) =>{
            this.gameState = gameState
            console.log("Estado: "+this.gameState)
        }
    }
}
