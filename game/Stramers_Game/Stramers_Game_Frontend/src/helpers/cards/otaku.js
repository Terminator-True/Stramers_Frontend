import Card from "./Card";

export default class Otaku extends Card{
    constructor(scene) {
        super(scene);
        this.name="otaku"
        this.playerCardSprite = "otaku";
        this.opponentCardSprite = "otaku";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=1;
        this.dmg=1;
        this.coste=2;
    }
}