import {CST} from "../CST.js";

var image;
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }
    preload(){

        this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
    
    }

    create(){
        image = this.add.image(this.game.renderer.width / 2, this.game.renderer.height, "backgrnd").setScale(2,2)

        let text = this.add.text(this.game.renderer.width / 3.2,100,"SHQOTNIG").setFontSize(60)

        let playButton = this.add.text(this.game.renderer.width / 2.45,190,"< PLAY >").setFontSize(30)


        playButton.setInteractive();

        playButton.on("pointerdown", ()=> {
           this.scene.start(CST.SCENES.LEVEL1);
        });
    }
    update(){
        image.rotation += 0.001;
    }
}