import {CST} from "../CST.js";

var image;
export class EndLevel1 extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.ENDLEVEL1
        })
    }
    init(){

    }
    preload(){

        this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
    
    }

    create(){
        image = this.add.image(this.game.renderer.width / 2, this.game.renderer.height, "backgrnd").setScale(2,2)

        let text = this.add.text(this.game.renderer.width / 2.9,100,"GOOD JOB").setFontSize(50)

        let playButton = this.add.text(this.game.renderer.width / 2.55,190,"< NEXT LEVEL >").setFontSize(20)


        playButton.setInteractive();

        playButton.on("pointerdown", ()=> {
           this.scene.start(CST.SCENES.MENU);
        });
    }
    update(){
        image.rotation += 0.001;
    }
}