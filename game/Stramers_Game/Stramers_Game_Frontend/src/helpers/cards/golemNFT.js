import Card from "./Card";

export default class GolemNFT extends Card{
    constructor(scene) {
        super(scene);
        this.name="golemNFT"
        this.playerCardSprite = "golemNFT";
        this.opponentCardSprite = "golemNFT";
        this.vida=5;
        this.lifeA=5;
        this.lifeM=5;
        this.dmgA=5;
        this.dmg=5;
        this.coste=5;
    }
}