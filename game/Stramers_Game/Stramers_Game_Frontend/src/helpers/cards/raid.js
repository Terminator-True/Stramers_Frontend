import Card from "./Card";

export default class Raid extends Card{
    constructor(scene) {
        super(scene);
        this.name="raid"
        this.playerCardSprite = "raid";
        this.opponentCardSprite = "raid";
        this.hechizo=true;
        this.coste=3;
    }
}