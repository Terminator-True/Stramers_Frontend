import Card from "./Card";
export default class Programador extends Card{
    constructor(scene) {
        super(scene);
        this.name="Programador"
        this.playerCardSprite = "programador";
        this.opponentCardSprite = "programador";
        this.vida=1;
        this.dmg=1;
        this.coste=0;
    }
}