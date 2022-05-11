import Card from "./Card";

export default class Impuestos extends Card{
    constructor(scene) {
        super(scene);
        this.name="impuestos"
        this.playerCardSprite = "impuestos";
        this.opponentCardSprite = "impuestos";
        this.hechizo=true;
        this.coste=4;
    }
}