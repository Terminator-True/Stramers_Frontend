import Card from "./Card";

export default class Elmillor extends Card{
    constructor(scene) {
        super(scene);
        this.name="elmillor"
        this.playerCardSprite = "elmillor";
        this.opponentCardSprite = "elmillor";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=4;
        this.dmg=4;
        this.coste=3;
    }
}