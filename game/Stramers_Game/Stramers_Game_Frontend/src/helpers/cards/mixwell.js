import Card from "./Card";

export default class Mixwell extends Card{
    constructor(scene) {
        super(scene);
        this.name="mixwell"
        this.playerCardSprite = "mixwell";
        this.opponentCardSprite = "mixwell";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=3;
        this.dmg=3;
        this.coste=4;
    }
}