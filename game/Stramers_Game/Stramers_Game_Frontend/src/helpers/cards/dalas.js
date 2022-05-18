import Card from "./Card";

export default class Dalasreview extends Card{
    constructor(scene) {
        super(scene);
        this.name="dalas"
        this.playerCardSprite = "dalas";
        this.opponentCardSprite = "dalas";
        this.vida=1;
        this.lifeA=1;
        this.lifeM=1;
        this.dmgA=2;
        this.dmg=2;
        this.coste=4;
    }
}