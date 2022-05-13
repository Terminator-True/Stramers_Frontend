import Card from "./Card";

export default class Podcast extends Card{
    constructor(scene) {
        super(scene);
        this.name="podcast"
        this.playerCardSprite = "podcast";
        this.opponentCardSprite = "podcast";
        this.hechizo=true;
        this.coste=6;
    }
}