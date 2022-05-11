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
                "life":this.vida,//vida normal
                "lifeA":this.lifeA,//vida actual
                "lifeM":this.lifeM,//vida max(puede ser aumentada)
                "dmg":this.dmg,
                "dmgA":this.dmgA,
                "cost":this.coste,
                "hechizo":this.hechizo,
            })
            if (type ==="playerCard") {
                scene.input.setDraggable(card);
            }
            return card;
        } 
    }
}