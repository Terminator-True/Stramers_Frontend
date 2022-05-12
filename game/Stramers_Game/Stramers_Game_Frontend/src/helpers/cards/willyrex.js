import Card from "./Card";

export default class Willyrex extends Card{
    constructor(scene) {
        super(scene);
        this.name="willyrex"
        this.playerCardSprite = "willyrex";
        this.opponentCardSprite = "willyrex";
        this.vida=4;
        this.lifeA=4;
        this.lifeM=4;
        this.dmgA=2;
        this.dmg=2;
        this.coste=5;
    }
}