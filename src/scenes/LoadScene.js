// import {CST} from "./CST.js";
class LoadScene extends Phaser.Scene{
    constructor(){
        super(
            "LOAD"
        )
    }
    init(){

    }
    preload(){

    }
    create(){
        console.log("1")
        this.add.text(0,0,"hello")
    }
}

export { LoadScene }