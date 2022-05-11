import Card from "./Card";

export default class Garmy extends Card{
    constructor(scene) {
        super(scene);
        this.name="garmy"
        this.playerCardSprite = "garmy";
        this.opponentCardSprite = "garmy";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=3;
        this.dmg=3;
        this.coste=3;
    }
}