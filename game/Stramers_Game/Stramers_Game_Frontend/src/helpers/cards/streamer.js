import Card from "./Card";

export default class Streamer extends Card{
    constructor(scene) {
        super(scene);
        this.name="streamer"
        this.playerCardSprite = "streamer";
        this.opponentCardSprite = "streamer";
        this.vida=1;
        this.lifeA=1;
        this.lifeM=1;
        this.dmgA=2;
        this.dmg=2;
        this.coste=1;
    }
}