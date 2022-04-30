import Card from "./Card";

export default class Mdlr extends Card{
    constructor(scene) {
        super(scene);
        this.name="Mdlr"
        this.playerCardSprite = "mdlr";
        this.opponentCardSprite = "mdlr";
        this.vida=2;
        this.dmg=3;
        this.coste=2;
    }
}