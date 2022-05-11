import Card from "./Card";

export default class Knekro extends Card{
    constructor(scene) {
        super(scene);
        this.name="knekro"
        this.playerCardSprite = "knekro";
        this.opponentCardSprite = "knekro";
        this.vida=4;
        this.lifeA=4;
        this.lifeM=4;
        this.dmgA=7;
        this.dmg=7;
        this.coste=6;
    }
}