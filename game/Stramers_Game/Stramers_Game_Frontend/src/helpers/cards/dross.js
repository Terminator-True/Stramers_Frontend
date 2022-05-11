import Card from "./Card";

export default class Dross extends Card{
    constructor(scene) {
        super(scene);
        this.name="dross"
        this.playerCardSprite = "dross";
        this.opponentCardSprite = "dross";
        this.vida=7;
        this.lifeA=7;
        this.lifeM=7;
        this.dmgA=7;
        this.dmg=7;
        this.coste=5;
    }
}