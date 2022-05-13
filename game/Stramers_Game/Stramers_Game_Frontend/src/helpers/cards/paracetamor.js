import Card from "./Card";

export default class Paracetamor extends Card{
    constructor(scene) {
        super(scene);
        this.name="paracetamor"
        this.playerCardSprite = "paracetamor";
        this.opponentCardSprite = "paracetamor";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=2;
        this.dmg=2;
        this.coste=2;
    }
}