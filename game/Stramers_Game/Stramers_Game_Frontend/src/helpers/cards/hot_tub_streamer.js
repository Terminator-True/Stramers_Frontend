import Card from "./Card";

export default class Hot_tub_streamer extends Card{
    constructor(scene) {
        super(scene);
        this.name="hot_tub_streamer"
        this.playerCardSprite = "hot_tub_streamer";
        this.opponentCardSprite = "hot_tub_streamer";
        this.vida=2;
        this.lifeA=2;
        this.lifeM=2;
        this.dmgA=2;
        this.dmg=2;
        this.coste=2;
    }
}