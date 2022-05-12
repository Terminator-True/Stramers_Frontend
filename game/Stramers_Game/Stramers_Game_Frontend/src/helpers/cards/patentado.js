import Card from "./Card";

export default class Patentado extends Card{
    constructor(scene) {
        super(scene);
        this.name="patentado"
        this.playerCardSprite = "patentado";
        this.opponentCardSprite = "patentado";
        this.hechizo=true;
        this.coste=3;
    }
}