import { LoadScene } from './scenes/LoadScene.js';
import { MenuScene } from './scenes/MenuScene.js';

let game = new Phaser.Game({
    width: 750,
    height: 350,
    scene:[
        LoadScene
        , MenuScene
    ]
});