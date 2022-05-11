import Card from "./Card";

export default class Jordi_wild extends Card{
    constructor(scene) {
        super(scene);
        this.name="jordi_wild"
        this.playerCardSprite = "jordi_wild";
        this.opponentCardSprite = "jordi_wild";
        this.vida=5;
        this.lifeA=5;
        this.lifeM=5;
        this.dmgA=5;
        this.dmg=5;
        this.coste=6;
    }
}