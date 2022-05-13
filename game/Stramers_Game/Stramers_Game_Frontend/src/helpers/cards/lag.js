import Card from "./Card";

export default class Lag extends Card{
    constructor(scene) {
        super(scene);
        this.name="lag"
        this.playerCardSprite = "lag";
        this.opponentCardSprite = "lag";
        this.hechizo=true;
        this.coste=4;
    }
}