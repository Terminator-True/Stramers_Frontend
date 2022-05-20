import ZoneHandler from "./ZoneHandler";
export default class UIHandler{
    constructor(scene){
        this.zoneHandler = new ZoneHandler(scene);
        this.buildZones = (x,y,type) =>{
            var dropZone = this.zoneHandler.renderZone(x,y,type);
            this.zoneHandler.renderOutline(dropZone);
            return dropZone
        }
        this.buildPlayerAreas = () =>{
            scene.playerHandArea = scene.add.rectangle(1000,960,850,230);
            scene.playerHandArea.setStrokeStyle(4, 0xff69b4);
            scene.playerDeckArea= scene.add.rectangle(1550,960,155,215);
            scene.playerDeckArea.setStrokeStyle(3,0x00ffff)

            scene.oponentHandArea = scene.add.rectangle(1000,135,850,230);
            scene.oponentHandArea.setStrokeStyle(4, 0xff69b4);
            scene.oponentDeckArea= scene.add.rectangle(1550,135,155,215);
            scene.oponentDeckArea.setStrokeStyle(3,0x00ffff)
        }
        this.buildGameText = () =>{
            scene.changeTrun = scene.add.text(1500,540,"Pasa Turno").setFontSize(24)
            scene.add.image(300,130,"corazon").setScale(0.20,0.20)
            scene.add.image(300,950,"corazon").setScale(0.20,0.20)

            scene.add.image(450,130,"mana").setScale(0.20,0.20)
            scene.add.image(450,950,"mana").setScale(0.20,0.20)


        }
        this.buildUI = ()=>{
            scene.opponentZone=this.buildZones(1000,425,"opponent");
            scene.playerZone=this.buildZones(1000,675,"player");
            this.buildPlayerAreas();
            this.buildGameText();
        }
    }
}