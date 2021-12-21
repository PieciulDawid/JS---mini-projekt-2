import { LoadScene } from './scenes/LoadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { Level1 } from './scenes/Level1.js';

let game = new Phaser.Game({
    width: 750,
    height: 350,
    scene:[
        LoadScene, 
        MenuScene,
        Level1
    ],
    physics: {
        default: 'arcade',
    }
});