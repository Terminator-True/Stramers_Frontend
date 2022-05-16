import Phaser from 'phaser';
import Game from './scenes/game';

const config = {
    type: Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.RESIZE,
        width:"100%",
        height:"90%"
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
