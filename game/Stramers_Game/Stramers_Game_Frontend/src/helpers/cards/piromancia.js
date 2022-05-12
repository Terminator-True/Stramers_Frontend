import Card from "./Card";

export default class Piromancia extends Card{
    constructor(scene) {
        super(scene);
        this.name="piromancia"
        this.playerCardSprite = "piromancia";
        this.opponentCardSprite = "piromancia";
        this.hechizo=true;
        this.coste=3;
    }
}