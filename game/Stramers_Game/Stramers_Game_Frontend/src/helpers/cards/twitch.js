import Card from "./Card";

export default class Twitch extends Card{
    constructor(scene) {
        super(scene);
        this.name="twitch"
        this.playerCardSprite = "twitch";
        this.opponentCardSprite = "twitch";
        this.hechizo=true;
        this.coste=1;
    }
}