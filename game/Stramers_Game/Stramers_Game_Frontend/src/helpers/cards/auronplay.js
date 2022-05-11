import Card from "./Card";

export default class Auronplay extends Card{
    constructor(scene) {
        super(scene);
        this.name="auronplay"
        this.playerCardSprite = "auronplay";
        this.opponentCardSprite = "auronplay";
        this.vida=10;
        this.lifeA=10;
        this.lifeM=10;
        this.dmgA=8;
        this.dmg=8;
        this.coste=8;
    }
}