import Card from "./Card";

export default class Thegrefg extends Card{
    constructor(scene) {
        super(scene);
        this.name="thegrefg"
        this.playerCardSprite = "thegrefg";
        this.opponentCardSprite = "thegrefg";
        this.vida=9;
        this.lifeA=9;
        this.lifeM=9;
        this.dmgA=5;
        this.dmg=5;
        this.coste=8;
    }
}