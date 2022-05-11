import Card from "./Card";

export default class Alexelcapo_san extends Card{
    constructor(scene) {
        super(scene);
        this.name="alexelcapo_san"
        this.playerCardSprite = "alexelcapo_san";
        this.opponentCardSprite = "alexelcapo_san";
        this.vida=1;
        this.lifeA=1;
        this.lifeM=1;
        this.dmgA=4;
        this.dmg=4;
        this.coste=4;
    }
}