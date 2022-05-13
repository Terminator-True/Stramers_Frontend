import Card from "./Card";

export default class Polimorf extends Card{
    constructor(scene) {
        super(scene);
        this.name="polimorf"
        this.playerCardSprite = "polimorf";
        this.opponentCardSprite = "polimorf";
        this.hechizo=true;
        this.coste=4;
    }
}