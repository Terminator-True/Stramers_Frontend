import Card from "./Card";

export default class Suckway extends Card{
    constructor(scene) {
        super(scene);
        this.name="suckway"
        this.playerCardSprite = "suckway";
        this.opponentCardSprite = "suckway";
        this.hechizo=true;
        this.coste=6;
    }
}