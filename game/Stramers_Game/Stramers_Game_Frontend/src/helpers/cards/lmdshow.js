import Card from "./Card";

export default class Lmdshow extends Card{
    constructor(scene) {
        super(scene);
        this.name="lmdshow"
        this.playerCardSprite = "lmdshow";
        this.opponentCardSprite = "lmdshow";
        this.vida=5;
        this.lifeA=5;
        this.lifeM=5;
        this.dmgA=4;
        this.dmg=4;
        this.coste=6;
    }
}