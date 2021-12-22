import { LoadScene } from './scenes/LoadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { Level1 } from './scenes/Level1.js';
import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';
import { LevelBonus } from './scenes/LevelBonus.js';
import { EndLevel1 } from './scenes/EndLevel1.js';
import { Gameover } from './scenes/Gameover.js';

let game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 750,
    height: 350,
    scene:[
        LoadScene, 
        MenuScene,
        Level1,
        Level2,
        Level3,
        LevelBonus,
        EndLevel1,
        Gameover
    ],
    physics: {
        default: 'arcade',
    }
});