export default class GameHandler{
    constructor(scene){
        this.gameState = "Initializing"
        this.isMyTurn = false;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
        this.playerLife;
        this.opponentLife;
        this.playerMana=scene.add.bitmapText(500,940,"text","").setFontSize(24)                    
        this.opponentMana=scene.add.bitmapText(500,120,"text","").setFontSize(24) 
        this.turn=0;
        this.player={
            life:20,
            manaMax: 0,
            manaA:0
        };
        this.opponent={
            life:20,
            manaMax: 1,
            manaA:1
        }
        this.opponentMana.text=this.opponent.manaA.toString()+"/"+"1"
        /**
         * @Todo 
         * -Que las cartas hagan el daño en cuanto hagan click al pasar turno.
         * -Detectar que carta muere, y al morir que elimine de la array de la zona la carta
         * además que reste -1 a la cantidad de cartas que hay en la zona para que se puedan poner más.
         * -Si ha muerto alguna carta, movilizar toda la array a la izquierda.
         * -Entonces, recargar toda las cartas:
         *      *Se destruirá el gameObject dentro de scene.opponentZone.data.values.card_list o scene.playerZone.data.valuescard_list que muera
         * -Cuando se de click al pasar turno, el jugador al que pertenezca el turno siguiente robe una carta
         * 
         * Apunte: no hace falta intercambiar info mediante el socket, el cálculo se hará para cada jugador, debido a que la infromación de los dos en pantalla
         * siempre es igual para los dos jugadores solo que cambiando las zonas de lugar, el resultado en ambos casos será el mismo.
         */

        /**
         * Arreglar mana: 
         *  -No se enseña correctamente el del oponente
         *  -Bug: a veces sale -1/1 
         *  -Recolocar los numeros, a veces se supoerponen a la mano del oponente
         *  -Los numeros del aliado también, colocarlos más a la izquierda
         */
        this.changeTurn = () =>{
            this.turn++;
            this.isMyTurn = !this.isMyTurn;
            console.log("isMyturn:"+this.isMyTurn)
            if (this.isMyTurn) {
                this.player.manaMax++;
                this.player.manaA=this.player.manaMax;
                this.playerMana.text=this.player.manaA.toString()+"/"+this.player.manaMax.toString()

                scene.changeTrun.setInteractive();
            }else{
                if (!this.turn==1) {
                    this.opponent.manaMax++;
                }
                this.opponent.manaA=this.opponent.manaMax;
                this.opponentMana.text=this.opponent.manaA.toString()+"/"+this.opponent.manaMax.toString()

            }
        }

        this.changeGameState = (gameState) =>{
            this.gameState = gameState
            console.log("Estado: "+this.gameState)          
        }
        this.recibeDaño = (player,cantidad)=>{
            if (player) {
                this.player.life-=cantidad
                this.playerLife.destroy()
                this.playerLife=scene.add.text(285,120,this.GameHandler.player.life.toString()).setFontSize(24)
            }else{
                this.opponent.life-=cantidad
                this.opponentLife.destroy()
                this.opponentLife=scene.add.text(285,120,this.opponent.life.toString()).setFontSize(24)
            }
        }
    }
}
