// import {CST} from "./CST.js";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super(
            "LOAD"
        )
    }
    init(){
        this.a=1
    }
    preload(){

    }
    create(){
        console.log("1")
        this.add.text(0,0,"ZACZEKAJ CHWILE")
       

    }
    update(){
        this.a+=1
        if(this.a>100)
        this.scene.start("MAIN")
    }
}
