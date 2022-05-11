import Card from "./Card";

export default class Callate extends Card{
    constructor(scene) {
        super(scene);
        this.name="callate"
        this.playerCardSprite = "callate";
        this.opponentCardSprite = "callate";
        this.hechizo=true;
        this.coste=2;
    }
}