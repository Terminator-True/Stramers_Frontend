import Card from "./Card";

export default class Bigchungus extends Card{
    constructor(scene) {
        super(scene);
        this.name="bigchungus"
        this.playerCardSprite = "bigchungus";
        this.opponentCardSprite = "bigchungus";
        this.vida=10;
        this.lifeA=10;
        this.lifeM=10;
        this.dmgA=6;
        this.dmg=6;
        this.coste=7;
    }
}