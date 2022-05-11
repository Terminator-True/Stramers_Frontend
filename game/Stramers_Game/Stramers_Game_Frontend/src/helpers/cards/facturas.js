import Card from "./Card";

export default class Facturas extends Card{
    constructor(scene) {
        super(scene);
        this.name="facturas"
        this.playerCardSprite = "facturas";
        this.opponentCardSprite = "facturas";
        this.hechizo=true;
        this.coste=4;
    }
}