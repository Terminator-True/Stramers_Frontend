export default class GameHandler{
    constructor(scene){
        this.gameState = "Initializing"
        this.isMyTurn = false;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
        /**
         * @Todo 
         * -Que las cartas hagan el daño en cuanto hagan click al pasar turno
         * -Detectar que carta muere, y al morir que elimine de la array de la zona la carta
         * además que reste -1 a la cantidad de cartas que hay en la zona para que se puedan poner más
         * -Si ha muerto alguna carta, movilizar toda la array a la izquierda
         * -Entonces, recargar toda las cartas:
         *      *Se destruirá el gameObject dentro de scene.opponentZone.data.values.card_list o scene.playerZone.data.valuescard_list que muera
         * 
         * Apunte: no hace falta intercambiar info mediante el socket, el cálculo se hará para cada jugador, debido a que la infromación de los dos en pantalla
         * siempre es igual para los dos jugadores solo que cambiando las zonas de lugar, el resultado en ambos casos será el mismo.
         */
        this.changeTurn = () =>{
            this.isMyTurn = !this.isMyTurn;
            console.log("isMyturn:"+this.isMyTurn)
        }

        this.changeGameState = (gameState) =>{
            this.gameState = gameState
            console.log("Estado: "+this.gameState)
        }
    }
}
