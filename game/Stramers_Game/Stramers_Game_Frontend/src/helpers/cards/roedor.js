import Card from "./Card";

export default class Roedor extends Card{
    constructor(scene) {
        super(scene);
        this.name="roedor"
        this.playerCardSprite = "roedor";
        this.opponentCardSprite = "roedor";
        this.vida=1;
        this.lifeA=1;
        this.lifeM=1;
        this.dmgA=1;
        this.dmg=1;
        this.coste=1;
    }
}