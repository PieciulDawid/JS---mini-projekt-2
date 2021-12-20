import { LoadScene } from './scenes/loadScene.js';
import { MenuScene } from './scenes/menuScene.js';

let game = new Phaser.Game({
    width: 750,
    height: 350,
    scene:[
        LoadScene
        , MenuScene
    ]
});