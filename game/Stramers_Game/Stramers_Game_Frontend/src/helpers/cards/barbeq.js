import Card from "./Card";

export default class Barbeq extends Card{
    constructor(scene) {
        super(scene);
        this.name="barbeq"
        this.playerCardSprite = "barbeq";
        this.opponentCardSprite = "barbeq";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=4;
        this.dmg=4;
        this.coste=6;
    }
}