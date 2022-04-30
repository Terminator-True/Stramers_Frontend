import Card from "./Card";

export default class Streamer extends Card{
    constructor(scene) {
        super(scene);
        this.name="Streamer"
        this.playerCardSprite = "streamer";
        this.opponentCardSprite = "streamer";
        this.vida=1;
        this.dmg=2;
        this.coste=1;
    }
}