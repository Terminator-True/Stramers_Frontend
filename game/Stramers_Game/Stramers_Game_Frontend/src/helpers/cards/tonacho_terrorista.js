import Card from "./Card";

export default class Tonacho_terrorista extends Card{
    constructor(scene) {
        super(scene);
        this.name="tonacho_terrorista"
        this.playerCardSprite = "tonacho_terrorista";
        this.opponentCardSprite = "tonacho_terrorista";
        this.vida=1;
        this.lifeA=1;
        this.lifeM=1;
        this.dmgA=1;
        this.dmg=1;
        this.coste=2;
    }
}