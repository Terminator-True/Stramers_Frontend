import Card from "./Card";

export default class Momoladinastia extends Card{
    constructor(scene) {
        super(scene);
        this.name="momoladinastia"
        this.playerCardSprite = "momoladinastia";
        this.opponentCardSprite = "momoladinastia";
        this.vida=4;
        this.lifeA=4;
        this.lifeM=4;
        this.dmgA=0;
        this.dmg=0;
        this.coste=3;
    }
}