import Card from "./Card";

export default class Elxokas extends Card{
    constructor(scene) {
        super(scene);
        this.name="elxokas"
        this.playerCardSprite = "elxokas";
        this.opponentCardSprite = "elxokas";
        this.vida=4;
        this.dmg=4;
        this.coste=4;
    }


}