export default class card{
    constructor(scene) {
        this.render = (x,y,type)=>{
            let sprite;
            if (type === 'playerCard') {
                sprite = this.playerCardSprite;
            }else{
                sprite = this.opponentCardSprite;
            }
            let card = scene.add.image(x,y,sprite).setScale(0.15,0.15).setInteractive().setData({
                "name": this.name,
                "type": type,
                "sprite":sprite,
                "life":this.vida,
                "dmg":this.dmg,
                "cost":this.coste
            })
            if (type ==="playerCard") {
                scene.input.setDraggable(card);
            }
            return card;
        } 
    }
}