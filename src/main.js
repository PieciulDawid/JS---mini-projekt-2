import { LoadScene } from ".scenes/LoadScene";
import { MenuScene } from ".scenes/MenuScene";

let game = new Pharser.Game({
    width: 750,
    height: 350,
    scene:[
        LoadScene, MenuScene
    ]
});