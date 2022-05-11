import Card from "./Card";

export default class Ibai extends Card{
    constructor(scene) {
        super(scene);
        this.name="ibai"
        this.playerCardSprite = "ibai";
        this.opponentCardSprite = "ibai";
        this.vida=8;
        this.lifeA=8;
        this.lifeM=8;
        this.dmgA=8;
        this.dmg=8;
        this.coste=7;
    }
}