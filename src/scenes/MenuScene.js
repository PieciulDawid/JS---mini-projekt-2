// import {CST} from "./CST.js";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super("MAIN")
    }
    init(data){
        console.log(data)
    }
    preload(){

    }
    create(){
        let text = this.add.text(0,0,"TADAAA")
        text.setFontSize(60)
    }
}