import Card from "./Card";

export default class Camera_cafe_100 extends Card{
    constructor(scene) {
        super(scene);
        this.name="camera_cafe_100"
        this.playerCardSprite = "camera_cafe_100";
        this.opponentCardSprite = "camera_cafe_100";
        this.vida=3;
        this.lifeA=3;
        this.lifeM=3;
        this.dmgA=1;
        this.dmg=1;
        this.coste=5;
    }
}