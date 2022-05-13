import Card from "./Card";

export default class Pionera_del_clan_pambisito extends Card{
    constructor(scene) {
        super(scene);
        this.name="pionera_del_clan_pambisito"
        this.playerCardSprite = "pionera_del_clan_pambisito";
        this.opponentCardSprite = "pionera_del_clan_pambisito";
        this.vida=4;
        this.lifeA=4;
        this.lifeM=4;
        this.dmgA=0;
        this.dmg=0;
        this.coste=3;
    }
}