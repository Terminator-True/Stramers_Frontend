import Card from "./Card";

export default class Andiamo extends Card{
    constructor(scene) {
        super(scene);
        this.name="andiamo"
        this.playerCardSprite = "andiamo";
        this.opponentCardSprite = "andiamo";
        this.vida=2;
        this.lifeA=2;
        this.lifeM=2;
        this.dmgA=1;
        this.dmg=1;
        this.coste=1;
    }
}