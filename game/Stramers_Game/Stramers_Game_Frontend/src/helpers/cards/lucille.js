import Card from "./Card";

export default class Lucille extends Card{
    constructor(scene) {
        super(scene);
        this.name="lucille"
        this.playerCardSprite = "lucille";
        this.opponentCardSprite = "lucille";
        this.vida=2;
        this.lifeA=2;
        this.lifeM=2;
        this.dmgA=3;
        this.dmg=3;
        this.coste=4;
    }
}