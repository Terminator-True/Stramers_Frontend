export default class card{
    constructor(scene) {
        this.render = (x,y,type)=>{
            let sprite;
            if (type === 'playerCard') {
                sprite = this.playerCardSprite;
            }else{
                sprite = this.opponentCardSprite;
            }
            let card = scene.add.image(x,y,sprite).setScale(0.10,0.10).setInteractive().setData({
                "name": this.name,
                "type": type,
                "sprite":sprite,
                "life":this.vida,
                "lifeA":this.lifeA,
                "lifeM":this.lifeM,
                "dmg":this.dmg,
                "dmgA":this.dmgA,
                "cost":this.coste,
            })
            if (type ==="playerCard") {
                scene.input.setDraggable(card);
            }
            return card;
        } 
    }
}