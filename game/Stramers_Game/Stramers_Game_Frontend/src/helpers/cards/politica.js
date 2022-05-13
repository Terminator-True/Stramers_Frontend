import Card from "./Card";

export default class Politica extends Card{
    constructor(scene) {
        super(scene);
        this.name="politica"
        this.playerCardSprite = "politica";
        this.opponentCardSprite = "politica";
        this.hechizo=true;
        this.coste=3;
    }
}