import Card from "./Card";

export default class Espectador extends Card{
    constructor(scene) {
        super(scene);
        this.name="espectador"
        this.playerCardSprite = "espectador";
        this.opponentCardSprite = "espectador";
        this.vida=1;
        this.lifeA=1;
        this.lifeM=1;
        this.dmgA=1;
        this.dmg=1;
        this.coste=1;
    }
}