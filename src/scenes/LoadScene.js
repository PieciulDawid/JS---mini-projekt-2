import {CST} from "../CST.js";
import { MenuScene } from "./menuScene.js";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){


    }
    preload(){

            this.load.image('ship', 'https://examples.phaser.io/assets/games/asteroids/ship.png');
            this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
            this.load.image('asteroid', 'https://examples.phaser.io/assets/games/asteroids/asteroid1.png');
            this.load.image('asteroid2', 'https://examples.phaser.io/assets/games/asteroids/asteroid2.png');
            this.load.image('bullet', 'https://examples.phaser.io/assets/sprites/shmup-bullet.png');
            this.load.image('speed', 'https://examples.phaser.io/assets/sprites/loop.png');
            this.load.image('slow', 'https://examples.phaser.io/assets/sprites/pineapple.png');
            this.load.image('helper', 'https://examples.phaser.io/assets/sprites/spinObj_04.png');
            this.load.spritesheet('explode', 'https://examples.phaser.io/assets/games/invaders/explode.png', {
                frameWidth: 128, frameHeight: 128
            });
        console.log("Log")
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

      
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        })


    }
    create(){
        //this.a+=1
        //if(this.a>300)  
        
        this.scene.start(CST.SCENES.MENU);
    }
}
