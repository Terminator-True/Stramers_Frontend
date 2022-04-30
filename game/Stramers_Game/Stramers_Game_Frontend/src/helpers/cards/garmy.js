import Card from "./Card";

export default class Garmy extends Card{
    constructor(scene) {
        super(scene);
        this.name="Garmy"
        this.playerCardSprite = "garmy";
        this.opponentCardSprite = "garmy";
        this.vida=3;
        this.dmg=3;
        this.coste=3;
    }
}