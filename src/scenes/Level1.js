export class LoadScene extends Phaser.Scene{
    constructor(){
        super("LEVEL1")
    }
    init(){

    }
    preload(){

    }
    create(){

        let text = this.add.text(0,0,"TADAAA")
        text.setFontSize(60)
    }
}
