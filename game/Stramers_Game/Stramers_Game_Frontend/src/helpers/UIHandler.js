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
            scene.playerHandArea = scene.add.rectangle(470,960,850,230);
            scene.playerHandArea.setStrokeStyle(4, 0xff69b4);
            scene.playerDeckArea= scene.add.rectangle(1000,960,155,215);
            scene.playerDeckArea.setStrokeStyle(3,0x00ffff)

            scene.oponentHandArea = scene.add.rectangle(470,135,850,230);
            scene.oponentHandArea.setStrokeStyle(4, 0xff69b4);
            scene.oponentDeckArea= scene.add.rectangle(1000,135,155,215);
            scene.oponentDeckArea.setStrokeStyle(3,0x00ffff)
        }
        this.buildGameText = () =>{
            scene.dealCards = scene.add.text(960,540,"Pasa Turno").setFontSize(24)
        }
        this.buildUI = ()=>{
            scene.opponentZone=this.buildZones(470,400,"opponent");
            scene.playerZone=this.buildZones(470,700,"player");
            this.buildPlayerAreas();
            this.buildGameText();
        }
    }
}