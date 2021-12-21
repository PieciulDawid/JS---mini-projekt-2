import {CST} from "../CST.js";
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
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height, "backgrnd").setScale(1.5,1.5)
        let gameoverText = this.add.text(
            this.game.renderer.height,
            this.game.renderer.width,
            'Miglanc',{
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
            });
            gameoverText.setOrigin(0.5);
            //gameoverText.visible = true;
            //this.setFontSize(60)
            let text = this.add.text(this.game.renderer.width / 3,100,"SHQOTNIG").setFontSize(60)
    }
}