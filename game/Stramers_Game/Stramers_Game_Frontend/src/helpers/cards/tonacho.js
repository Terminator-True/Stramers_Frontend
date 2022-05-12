import Card from "./Card";

export default class Tonacho extends Card{
    constructor(scene) {
        super(scene);
        this.name="tonacho"
        this.playerCardSprite = "tonacho";
        this.opponentCardSprite = "tonacho";
        this.vida=2;
        this.lifeA=2;
        this.lifeM=2;
        this.dmgA=1;
        this.dmg=1;
        this.coste=2;
    }
}