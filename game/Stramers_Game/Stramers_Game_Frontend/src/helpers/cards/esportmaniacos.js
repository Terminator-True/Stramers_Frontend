import Card from "./Card";

export default class Esportmaniacos extends Card{
    constructor(scene) {
        super(scene);
        this.name="esportmaniacos"
        this.playerCardSprite = "esportmaniacos";
        this.opponentCardSprite = "esportmaniacos";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=2;
        this.dmg=2;
        this.coste=4;
    }
}