import Card from "./Card";

export default class Mdlr extends Card{
    constructor(scene) {
        super(scene);
        this.name="mdlr"
        this.playerCardSprite = "mdlr";
        this.opponentCardSprite = "mdlr";
        this.vida=2;
        this.lifeA=2;
        this.lifeM=2;
        this.dmgA=3;
        this.dmg=3;
        this.coste=2;
    }
}