import Card from "./Card";

export default class Mr_jagger extends Card{
    constructor(scene) {
        super(scene);
        this.name="mr_jagger"
        this.playerCardSprite = "mr_jagger";
        this.opponentCardSprite = "mr_jagger";
        this.vida=12;
        this.lifeA=12;
        this.lifeM=12;
        this.dmgA=12;
        this.dmg=12;
        this.coste=10;
    }
}