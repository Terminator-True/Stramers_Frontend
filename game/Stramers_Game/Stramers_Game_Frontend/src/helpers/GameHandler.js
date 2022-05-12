export default class GameHandler{
    constructor(scene){
        this.gameState = "Initializing"
        this.isMyTurn = false;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.playerHand = [];
        this.opponentHand = [];

        this.playerLife=scene.add.bitmapText(275,940,"text","").setFontSize(24);
        this.opponentLife=scene.add.bitmapText(275,120,"text","").setFontSize(24);

        this.playerLife.setDepth(1);
        this.opponentLife.setDepth(1);

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
                if (!scene.room.playerA && this.turn>=2) {
                    this.opponent.manaMax++;
                }else if(scene.room.playerA && this.turn>=3){
                    this.opponent.manaMax++;
                }
                this.opponent.manaA=this.opponent.manaMax;
                this.opponentMana.text=this.opponent.manaA.toString()+"/"+this.opponent.manaMax.toString()
            }
            if (this.turn>1) {
                if (!scene.room.playerA && this.turn>=4 || scene.room.playerA && this.turn>=5 ) {
                    let terminated=false;
                    let i=0;
                    let final;
                    while (!terminated) {
                        terminated = i===final
                        final = scene.playerZone.data.values.cards < scene.opponentZone.data.values.cards ? scene.opponentZone.data.values.cards:scene.playerZone.data.values.cards
                        if (scene.playerZone.data.values.cards_list[i] && scene.opponentZone.data.values.cards_list[i]) {
                            let dmgP = scene.playerZone.data.values.cards_list[i].data.list.dmgA
                            let hpP = scene.playerZone.data.values.cards_list[i].data.list.lifeA

                            let dmgO = scene.opponentZone.data.values.cards_list[i].data.list.dmgA
                            let hpO = scene.opponentZone.data.values.cards_list[i].data.list.lifeA

                            console.log(dmgP+"/"+hpP+"vs"+dmgO+"/"+hpO)

                            if (hpO-dmgP>0 && hpP-dmgO>0) {
                                scene.playerZone.data.values.card_text[i].text=hpO.toString()+"/"+(hpO-dmgP).toString()
                                scene.opponentZone.data.values.card_text[i].text=hpP.toString()+"/"+(hpP-dmgO).toString()

                            }else if(hpP-dmgO<=0){
                                if (hpO-dmgP<=0) {
                                    scene.opponentZone.data.values.cards_list[i].destroy()
                                    scene.opponentZone.data.values.card_text[i].destroy()
                                }
                                scene.playerZone.data.values.cards_list[i].destroy()
                                scene.playerZone.data.values.card_text[i].destroy()
                            }else if(hpO-dmgP<=0){
                                if (hpP-dmgO<=0) {
                                    scene.playerZone.data.values.cards_list[i].destroy()
                                    scene.playerZone.data.values.card_text[i].destroy()
                                }
                                scene.opponentZone.data.values.cards_list[i].destroy()
                                scene.opponentZone.data.values.card_text[i].destroy()
                                
                            }


                        }else if(scene.playerZone.data.values.cards_list[i]){
                            let dmg=scene.playerZone.data.values.cards_list[i].data.list.dmgA
                            let player=false
                            this.recibeDañoPlayer(player,dmg)
                        }else if(scene.opponentZone.data.values.cards_list[i]){
                            let player=true
                            let dmg=scene.opponentZone.data.values.cards_list[i].data.list.dmgA
                            this.recibeDañoPlayer(player=true,dmg)
                        }
                        i++
                    }

                    let finalP = scene.playerZone.data.values.cards_list.length-1
                    for (let j = 0; j < finalP; j++) {
                        var carta = cardArray[j]
                         if(carta.visible===true){
                            scene.playerZone.data.values.cards_list[j].x-=170*j
                            scene.playerZone.data.values.cards_list[j].x-=170*j
                         }
                    }
                    cardArray.map((carta)=>{
                        if (carta.visible===true) {
                            return carta
                        }
                    })
                    console.log(cardArray)
                    scene.playerZone.data.values.cards_list=cardArray
                }    

            }


        }

        this.changeGameState = (gameState) =>{
            this.gameState = gameState
            console.log("Estado: "+this.gameState)          
        }

        this.recibeDañoPlayer = (player,cantidad)=>{
            if (player) {
                this.player.life-=cantidad
                this.playerLife.text=this.player.life.toString()
            }else{
                this.opponent.life-=cantidad
                this.opponentLife.text=this.opponent.life.toString()
            }
        }
    }
}
