import Card from "./Card";

export default class Horcus extends Card{
    constructor(scene) {
        super(scene);
        this.name="horcus"
        this.playerCardSprite = "horcus";
        this.opponentCardSprite = "horcus";
        this.vida=2;
        this.lifeA=2;
        this.lifeM=2;
        this.dmgA=2;
        this.dmg=2;
        this.coste=3;
    }
}