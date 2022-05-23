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
        /**
         * @Done 
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
                if (this.turn===1) {
                    setTimeout(() => {
                        scene.InfoText.text="Fase de Preparación !!!"
                        scene.InfoText.setDepth(1)
                    }, 1500);       
                    setTimeout(() => {
                        scene.InfoText.text=""
                    }, 2500);       
                }
                if (this.player.manaMax<11) {
                    this.player.manaMax++;
                }
                this.player.manaA=this.player.manaMax;
                this.playerMana.text=this.player.manaA.toString()+"/"+this.player.manaMax.toString()


            }else{
                if (!scene.room.playerA && this.turn>=2) {
                    if (this.opponent.manaMax<10) {
                        this.opponent.manaMax++;

                    }
                }else if(scene.room.playerA && this.turn>=3){
                    if (this.opponent.manaMax<10) {
                        this.opponent.manaMax++;

                    }
                }
                this.opponent.manaA=this.opponent.manaMax;
                this.opponentMana.text=this.opponent.manaA.toString()+"/"+this.opponent.manaMax.toString()
            }
            if (this.turn>1) {
                if (!scene.room.playerA && this.turn>=2 || scene.room.playerA && this.turn>=3 ) {
                    if (this.isMyTurn) {
                        if (this.gameState==="Initializing") {
                            this.gameState="Ready"
                        }
                        scene.changeTrun.setInteractive();
                        scene.socket.emit("dealCard",scene.room.roomId,scene.room.playerId) 
                                        
                    }

                }
                if (!scene.room.playerA && this.turn>=4 || scene.room.playerA && this.turn>=5 ) {
                    if (!scene.room.playerA && this.turn===4 || scene.room.playerA && this.turn===5 ) {
                        scene.InfoText.text="Fase de Ataque!!!"
                        scene.InfoText.setDepth(1)
                        setTimeout(() => {
                            scene.InfoText.text=""
                        }, 2500);     
                    }       
                    let terminated=false;
                    let i=0;
                    let final=scene.playerZone.data.values.cards < scene.opponentZone.data.values.cards ? scene.opponentZone.data.values.cards:scene.playerZone.data.values.cards;
                    
                    while (!terminated) {
                        terminated = i===final
                        if (scene.playerZone.data.values.cards_list[i] && scene.opponentZone.data.values.cards_list[i]) {
                            let dmgP = scene.playerZone.data.values.cards_list[i].data.list.dmgA
                            let hpP = scene.playerZone.data.values.cards_list[i].data.list.lifeA

                            let dmgO = scene.opponentZone.data.values.cards_list[i].data.list.dmgA
                            let hpO = scene.opponentZone.data.values.cards_list[i].data.list.lifeA

                            console.log(dmgP+"/"+hpP+"vs"+dmgO+"/"+hpO)
                            
                            if (hpO-dmgP>0 || hpP-dmgO>0) {
                                if (hpO-dmgP>0) {
                                    scene.opponentZone.data.values.cards_list[i].data.list.lifeA-=dmgP
                                    scene.opponentZone.data.values.card_text[i].text=dmgO.toString()+"/"+(hpO-dmgP).toString()
                                }else{
                                    scene.opponentZone.data.values.cards--;
                                    scene.opponentZone.data.values.cards_list[i].destroy()
                                    scene.opponentZone.data.values.card_text[i].destroy()
                                    scene.opponentZone.data.values.cards_list.splice(i,i+1)
                                    scene.opponentZone.data.values.card_text.splice(i,i+1)
                                }
                                
                                if (hpP-dmgO>0) {
                                    scene.playerZone.data.values.cards_list[i].data.list.lifeA-=dmgO
                                    scene.playerZone.data.values.card_text[i].text=dmgP.toString()+"/"+(hpP-dmgO).toString()

                                }else{
                                    scene.playerZone.data.values.cards--;
                                    scene.playerZone.data.values.cards_list[i].destroy()
                                    scene.playerZone.data.values.card_text[i].destroy()
                                    scene.playerZone.data.values.cards_list.splice(i,i+1)
                                    scene.playerZone.data.values.card_text.splice(i,i+1)
                                }


                            }else if(hpP-dmgO<=0){
                                if (hpO-dmgP<=0) {
                                    scene.opponentZone.data.values.cards--;
                                    scene.opponentZone.data.values.cards_list[i].destroy()
                                    scene.opponentZone.data.values.card_text[i].destroy()
                                    scene.opponentZone.data.values.cards_list.splice(i,i+1)
                                    scene.opponentZone.data.values.card_text.splice(i,i+1)

                                }
                                scene.playerZone.data.values.cards--;
                                scene.playerZone.data.values.cards_list[i].destroy()
                                scene.playerZone.data.values.card_text[i].destroy()
                                scene.playerZone.data.values.cards_list.splice(i,i+1)
                                scene.playerZone.data.values.card_text.splice(i,i+1)
                                i--;

                            }else if(hpO-dmgP<=0){
                                if (hpP-dmgO<=0) {
                                    scene.playerZone.data.values.cards--;
                                    scene.playerZone.data.values.cards_list[i].destroy()
                                    scene.playerZone.data.values.card_text[i].destroy()
                                    scene.playerZone.data.values.cards_list.splice(i,i+1)
                                    scene.playerZone.data.values.card_text.splice(i,i+1)
                                }
                                scene.opponentZone.data.values.cards--;
                                scene.opponentZone.data.values.cards_list[i].destroy()
                                scene.opponentZone.data.values.card_text[i].destroy()
                                scene.opponentZone.data.values.cards_list.splice(i,i+1) 
                                scene.opponentZone.data.values.card_text.splice(i,i+1)
                                i--;
                            }

                        }else if(scene.playerZone.data.values.cards_list[i]){
                            let dmg=scene.playerZone.data.values.cards_list[i].data.list.dmgA
                            let player=false
                            this.recibeDañoPlayer(player,dmg)                 
                        }else if(scene.opponentZone.data.values.cards_list[i]){
                            let player=true
                            let dmg=scene.opponentZone.data.values.cards_list[i].data.list.dmgA
                            this.recibeDañoPlayer(player,dmg)
                        }   
                        i++
                    }
                   
                    let playerZoneCardName = scene.playerZone.data.values.cards_list.map((carta)=>{
                        return carta.data.list.name
                    })

                    let opponentZoneCardName = scene.opponentZone.data.values.cards_list.map((carta)=>{
                        return carta.data.list.name
                    })
                    
                    /**
                     * Se crea una array que con un cálculo se nos dice cuántas posiciones se ha de restar a las carta restante
                     * 
                     * Manera de hacer el cálculo
                     */
                    let statsP = []
                    let statsO = []

                    if (playerZoneCardName.length>0) {
                        for (let i in scene.playerZone.data.values.cards_list) {
                            statsP[i]={dmg: scene.playerZone.data.values.cards_list[i].data.list.dmgA, life: scene.playerZone.data.values.cards_list[i].data.list.lifeA}
                            scene.playerZone.data.values.cards_list[i].destroy()
                            scene.playerZone.data.values.card_text[i].destroy()
                        }
                        console.log(scene.playerZone.data.values.cards_list)
                        scene.playerZone.data.values.cards_list=[]
                        scene.playerZone.data.values.card_text=[]

                        for (let i in playerZoneCardName) {
                            scene.playerZone.data.values.cards_list[i]=scene.DeckHandler.dealCard((scene.playerZone.x-350)+(i*170), scene.playerZone.y, playerZoneCardName[i], "playerCard")
                            scene.playerZone.data.values.cards_list[i].data.list.dmgA=statsP[i].dmg
                            scene.playerZone.data.values.cards_list[i].data.list.lifeA=statsP[i].life
                            scene.playerZone.data.values.card_text[i]=scene.add.bitmapText(scene.playerZone.data.values.cards_list[i].x-40,scene.playerZone.data.values.cards_list[i].y+120,"text",statsP[i].dmg+"/"+statsP[i].life).setFontSize(24) 
                         }
                    }
                    if (opponentZoneCardName.length>0) {
                        for (let i in scene.opponentZone.data.values.cards_list) {
                            statsO[i] = {dmg: scene.opponentZone.data.values.cards_list[i].data.list.dmgA, life: scene.opponentZone.data.values.cards_list[i].data.list.lifeA}

                            scene.opponentZone.data.values.cards_list[i].destroy()
                            scene.opponentZone.data.values.card_text[i].destroy()
                        }
                       
                        scene.opponentZone.data.values.cards_list=[]
                        scene.opponentZone.data.values.card_text=[]

                        for (let i in opponentZoneCardName) {
                            scene.opponentZone.data.values.cards_list[i]=scene.DeckHandler.dealCard((scene.opponentZone.x-350)+(i*170), scene.opponentZone.y, opponentZoneCardName[i], "playerCard")
                            scene.opponentZone.data.values.cards_list[i].data.list.dmgA=statsO[i].dmg
                            scene.opponentZone.data.values.cards_list[i].data.list.lifeA=statsO[i].life
                            scene.opponentZone.data.values.card_text[i]=scene.add.bitmapText(scene.opponentZone.data.values.cards_list[i].x-40,scene.opponentZone.data.values.cards_list[i].y-145,"text",statsO[i].dmg+"/"+statsO[i].life).setFontSize(24) 
                        }
                    }
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
                if (this.player.life<=0) {
                    scene.InfoText.text="Conglaturations you lose!! :D"
                    scene.InfoText.setDepth(1)
                    setTimeout(() => {
                        window.location.replace("https://infla.cat:10186/lobby/?win=false")
                    }, 3000);
                }
            }else{
                this.opponent.life-=cantidad
                this.opponentLife.text=this.opponent.life.toString()
                if (this.opponent.life<=0) {
                    scene.InfoText.text="I'm sorry you WON! :C"
                    scene.InfoText.setDepth(1)
                    setTimeout(() => {
                        window.location.replace("http://localhost:4200/lobby/?win=true")
                    }, 3000);
                }
            }
        }
    }
}
