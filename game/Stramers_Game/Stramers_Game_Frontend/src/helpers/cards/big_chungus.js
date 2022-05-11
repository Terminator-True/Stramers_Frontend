import Card from "./Card";

export default class Big_chungus extends Card{
    constructor(scene) {
        super(scene);
        this.name="big_chungus"
        this.playerCardSprite = "big_chungus";
        this.opponentCardSprite = "big_chungus";
        this.vida=10;
        this.lifeA=10;
        this.lifeM=10;
        this.dmgA=6;
        this.dmg=6;
        this.coste=7;
    }
}