import Card from "./Card";

export default class Illojuan extends Card{
    constructor(scene) {
        super(scene);
        this.name="illojuan"
        this.playerCardSprite = "illojuan";
        this.opponentCardSprite = "illojuan";
        this.vida=30;
        this.lifeA=30;
        this.lifeM=30;
        this.dmgA=30;
        this.dmg=30;
        this.coste=99;
    }
}