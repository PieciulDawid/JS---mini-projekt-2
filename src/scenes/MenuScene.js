import {CST} from "../CST.js";

var image;
var cursors;
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }
    preload(){

        cursors = this.input.keyboard.createCursorKeys();
        this.load.image('backgrnd3', 'https://examples.phaser.io/assets/virtualjoystick/starfield2.jpg');
    
    }

    create(){
        image = this.add.image(this.game.renderer.width / 2, this.game.renderer.height, "backgrnd3").setScale(2,2)

        let text = this.add.text(this.game.renderer.width / 3.2,100,"SHQOTNIG").setFontSize(60)

        let playButton = this.add.text(this.game.renderer.width / 2.45,190,"< PLAY >").setFontSize(30)


        playButton.setInteractive();

        playButton.on("pointerdown", ()=> {
           this.scene.start(CST.SCENES. LEVEL1);
        });
    }
    update(){
        if(cursors.space.isDown){
            this.scene.start(CST.SCENES. LEVEL1);
        }
        image.rotation += 0.001;
    }
}