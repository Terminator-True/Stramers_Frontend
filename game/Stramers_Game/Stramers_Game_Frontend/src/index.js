import Phaser from 'phaser';
import Game from './scenes/game';

const config = {
    type: Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT,
        width:"80%",
        height:"80%"
    },
    physics: {
        default: 'matter',
        matter: {
            debug: false
        }
    },
    scene: [
        Game
    ]
};
const game = new Phaser.Game(config);
