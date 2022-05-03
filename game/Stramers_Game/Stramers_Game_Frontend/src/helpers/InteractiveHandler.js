export default class InteractiveHandler{
    constructor(scene){

        scene.dealCards.on("pointerdown", () => {
            scene.socket.emit("dealCards",scene.socket.id);
            scene.dealCards.disableInteractive();
        })

        scene.dealCards.on("pointerover", ()=>{
            scene.dealCards.setColor("#ff69b4");
        })

        scene.dealCards.on("pointerout", (event, gameObjects)=>{
            scene.dealCards.setColor("#00ffff");

        })
        scene.input.on("pointerover", (event, gameObjects)=>{

            let pointer = scene.input.activePointer;

            if (gameObjects[0].type=== "Image" && gameObjects[0].data.list.name!== "cardBack") {
                scene.cardPreview = scene.add.image(pointer.worldX, pointer.worldY-100, gameObjects[0].data.values.sprite).setScale(0.20,0.20)
            }

        })

        scene.input.on("pointerout", (event, gameObjects)=>{
            if (gameObjects[0].type=== "Image" && gameObjects[0].data.list.name!== "cardBack") {
                scene.cardPreview.setVisible(false)
            }

        })

        scene.input.on("drag", (pointer, gameObject, dragx, dragy)=>{
            gameObject.x = dragx;
            gameObject.y = dragy;
        })
        scene.input.on("dragstart", (pointer,gameObject)=>{
            gameObject.setTint(0xff69b4);
            scene.children.bringToTop(gameObject);
            scene.cardPreview.setVisible(false);
        })
        scene.input.on("dragend",(pointer,gameObject,dropped)=>{
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })
        scene.input.on("drop",(pointer,gameObject,dropZone)=>{
            if(scene.GameHandler.isMyTurn && scene.GameHandler.gameState==="Ready" && dropZone.data.values.type==="player"){
                gameObject.x = (dropZone.x-350)+(dropZone.data.values.cards*170);
                gameObject.y = dropZone.y;
                scene.playerZone.data.values.cards++;
                scene.input.setDraggable(gameObject, false);
                scene.socket.emit("cardPlayed",gameObject.data.values.name, scene.socket.id)
            }else{
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })
    }
}
