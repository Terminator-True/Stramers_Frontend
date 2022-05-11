import Card from "./Card";

export default class Andorra extends Card{
    constructor(scene) {
        super(scene);
        this.name="andorra"
        this.playerCardSprite = "andorra";
        this.opponentCardSprite = "andorra";
        this.vida=10;
        this.lifeA=10;
        this.lifeM=10;
        this.dmgA=0;
        this.dmg=0;
        this.coste=5;
    }
}