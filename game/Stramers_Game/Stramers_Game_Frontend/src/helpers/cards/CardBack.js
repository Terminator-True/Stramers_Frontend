import Card from "./Card";

export default class CardBack extends Card{
    constructor(scene) {
        super(scene);
        this.name="CardBack"
        this.playerCardSprite = "dorso_luna";
        this.opponentCardSprite = "dorso_sol";
        this.vida=0;
        this.lifeA=0;
        this.lifeM=0;
        this.dmgA=0;
        this.dmg=0;
    }
}