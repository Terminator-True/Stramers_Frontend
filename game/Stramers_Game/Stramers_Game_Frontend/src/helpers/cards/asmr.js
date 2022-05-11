import Card from "./Card";

export default class Asmr extends Card{
    constructor(scene) {
        super(scene);
        this.name="asmr"
        this.playerCardSprite = "asmr";
        this.opponentCardSprite = "asmr";
        this.hechizo=true;
        this.coste=0;
    }
}