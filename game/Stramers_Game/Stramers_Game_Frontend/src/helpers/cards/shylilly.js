import Card from "./Card";

export default class Shylily extends Card{
    constructor(scene) {
        super(scene);
        this.name="shylily"
        this.playerCardSprite = "shylily";
        this.opponentCardSprite = "shylily";
        this.vida=4;
        this.lifeA=4;
        this.lifeM=4;
        this.dmgA=3;
        this.dmg=3;
        this.coste=6;
    }
}