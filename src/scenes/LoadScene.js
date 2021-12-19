import {CST} from "./CST";
export class LoadScene extends Pharser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    inti(){

    }
    preload(){

    }
    create(){
        this.scene.start(CST.SCENES.MENU, "hello")
    }
}