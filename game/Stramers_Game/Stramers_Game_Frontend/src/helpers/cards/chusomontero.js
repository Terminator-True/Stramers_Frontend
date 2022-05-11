import Card from "./Card";

export default class Chusomontero extends Card{
    constructor(scene) {
        super(scene);
        this.name="chusomontero"
        this.playerCardSprite = "chusomontero";
        this.opponentCardSprite = "chusomontero";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=6;
        this.dmg=6;
        this.coste=5;
    }
}