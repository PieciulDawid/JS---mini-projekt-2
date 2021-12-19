// import { CST } from
// export class LoadScene extends Phaser.Scene{
//     constructor(){
//         super({
//             key: CSSTransition.SCENES.LOAD
//         })
//     }
// }

var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 350,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
    }

   };
   
var game = new Phaser.Game(config);
var cursors;
var bullets; 
var Bullet;
var lastFired = 0;
var info;
let backgrnd;
var explosions;
//optymalnna prędkosć 7, czym większa liczba tym szybciej 
var shipSpeed = 7;


// optymalna prędkosć 1, czym większa liczba tym szybciej 
var asteroidsSpeed = 1.5;
var asteroids2Speed = 1.6;
var speedsSpeed = 1.8;
var slowsSpeed = 2;
// optymalna ilość 1,  czym większa liczba tym więcej
var asteroidsHowClose = 1;
var asteroids2HowClose = 40;
var speedsHowClose = 10;
var slowsHowClose = 1;


var backgroundSpeed;
var ship;
var asteroids;
var AsteroidClass = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function AsteroidClass(scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'asteroid')
    }
})
var Asteroid2Class = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function Asteroid2Class(scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'asteroid2')
    }
})
var SpeedClass = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function SpeedClass(scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'speed')
    }
})
var SlowClass = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function SlowClass(scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'slow')
    }
})

//******************//
//ładowanie zasobów//
//******************//

function preload () {
  //deklaracja paska ładowania
    var loadinBar = this.add.graphics({
        fillStyle: {
            color: 0xffffff
        }
    })
    //for()
    this.load.on("progress", (percent)=>{
        loadinBar.fillRect(0, this.game.renderer.heigh / 2, this.game.renderer.width * percent, 50);
    })

    cursors = this.input.keyboard.createCursorKeys();
    this.load.image('ship', 'https://examples.phaser.io/assets/games/asteroids/ship.png');
    this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
    this.load.image('asteroid', 'https://examples.phaser.io/assets/games/asteroids/asteroid1.png');
    this.load.image('asteroid2', 'https://examples.phaser.io/assets/games/asteroids/asteroid2.png');
    this.load.image('bullet', 'https://examples.phaser.io/assets/sprites/bullet.png');
    this.load.image('speed', 'https://examples.phaser.io/assets/sprites/loop.png');
    this.load.image('slow', 'https://examples.phaser.io/assets/sprites/pineapple.png');
    this.load.spritesheet('explode', 'https://examples.phaser.io/assets/games/invaders/explode.png', {
        frameWidth: 128, frameHeight: 128
    });

}



//**********************//
//tworzenie obiektów gry//
//**********************//

function create () {

    //tworzenie grupy asteroid
    this.asteroids = this.physics.add.group({
        classType: AsteroidClass,
        runChildUpdate: true,
        allowGravity: false
    })
    this.asteroids2 = this.physics.add.group({
        classType: Asteroid2Class,
        runChildUpdate: true,
        allowGravity: false
    })
    //tworzenie przyspieszaczy
    this.speeds = this.physics.add.group({
        classType: SpeedClass,
        runChildUpdate: true,
        allowGravity: false
    })
    //tworzenie spowalniaczy
    this.slows = this.physics.add.group({
        classType: SlowClass,
        runChildUpdate: true,
        allowGravity: false
    })

    //tworzenie tła gry
    backgrnd = this.add.tileSprite(0, -30, 750, 450, 'backgrnd');
    backgrnd.setOrigin(0)

    //tworzenie statku i eksplozji
    ship = this.physics.add.sprite(125, 150, 'ship');

    boom = this.physics.add.sprite(1, 1, 'explode');
    boom.visible = false;

    ship.setCollideWorldBounds(true);

    // tekst końca gry
    gameoverText = this.add.text(
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY,
        'GAME OVER',
        {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
        });
    gameoverText.setOrigin(0.5);
    gameoverText.visible = false;
       
    //animacja wybuchu
    this.anims.create({
        key: 'boom',
        frames: this.anims.generateFrameNumbers('explode', {
            start: 0, end: 15
        }),
        frameRate: 15,
        repeat: 0
    })

    //strzelanie
    Bullet = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Bullet (scene){
            bullet = Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.speed = Phaser.Math.GetSpeed(400, 1);
        },

        fire: function (x, y){
            this.setPosition(x + 15, y);
            this.setActive(true); 
            this.setVisible(true);
        },

        // doładowanie pocisków
        update: function (time, delta){
            this.x += this.speed * delta;
            if (this.x > 900){
                this.setActive(false);
                this.setVisible(false);
            }
        }
    });
    //grupa z pociskami
    bullets = this.add.group({
        classType: Bullet,
        maxSize: 5,
        runChildUpdate: true
    });


    info = this.add.text(0, 0, 'Click to add objects', { fill: '#FFFFFF' });

}


//********************//
//aktualizacja klatek//
//*******************//

var posX = 750
function update (time, delta) {

    //generowanie asteroid
    if((time)%3 == 0){
        if(time%6 == 0){
            this.aster = this.asteroids.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(2,2);
        }
        else{
            this.aster = this.asteroids.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(2,2);
        }
        //jak szybko latają 
        this.asteroids.setVelocityX(-200 * asteroidsSpeed);
        //jak blisko siebie mogą być asteroidy
        posX+=100 / asteroidsHowClose;
    }
        //generowanie asteroid
        if((time)%3 == 0){
            if(time%2 == 0){
                this.aster2 = this.asteroids2.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(1,1);
            }
            else{
                this.aster2 = this.asteroids2.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(1,1);
            }
            //jak szybko latają 
            this.asteroids2.setVelocityX(-200 * (asteroids2Speed+0.1));
            //jak blisko siebie mogą być asteroidy
            posX+=100 / asteroids2HowClose;
        }

    //generowanie przyspieszaczy
    if((time)%6 == 0){
        if(time%3 == 0){
            this.speed = this.speeds.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(0.5,0.5)
        }
        else{
            this.speed = this.speeds.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(0.5,0.5)
        }
        //jak szybko latają 
        this.speeds.setVelocityX(-200 * speedsSpeed);
        //jak blisko siebie mogą być asteroidy
        posX+=100 / speedsHowClose;
    }

    //generowanie spowalniaczy
    if((time)%6 == 0){
        if(time%3 == 0){
            this.slow = this.slows.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(0.5,0.5)
        }
        else{
            this.slow = this.slows.get().setActive(true).setVisible(true).setPosition(posX+100, game.config.height*(getRandom(0,10))/10).setScale(0.5,0.5)
        }
        //jak szybko latają 
        this.slows.setVelocityX(-200 * slowsSpeed);
        //jak blisko siebie mogą być asteroidy
        posX+=100 / speedsHowClose;
    }

    // zderzenia statku z asteroidą
    this.physics.add.overlap(ship, this.aster, shipHitsAsteroid, null, this);
    this.physics.add.overlap(ship, this.aster2, shipHitsAsteroid, null, this);
    // zderzenia statku z przyspieszaczem
    this.physics.add.overlap(ship, this.speed, shipHitsSpeed, null, this);
    // zderzenia statku z spowalniaczem
    this.physics.add.overlap(ship, this.slow, shipHitsSlow, null, this);

    //Sterowanie statkiem za pomocą strzałek
    if(cursors.left.isDown){
        ship.x -= (1 * shipSpeed);
    }
    if(cursors.right.isDown){
        ship.x += (1 * shipSpeed);
    }
    if (cursors.down.isDown){
        ship.y += (1 * shipSpeed);
    }
    if (cursors.up.isDown){
        ship.y -= (1 * shipSpeed);

    }
    if (cursors.space.isDown && time > lastFired){
        bullet = bullets.get();
        console.log(bullet )
        if (bullet)
        {
            bullet.fire(ship.x, ship.y);  

            lastFired = time + 50;
        }
    }
    info.setText([
        'Bullets: ' + bullets.getTotalFree(),
        'Score: ' + Math.round((time/1000)),
    ]);
    //todo nie łapie zderzeń
    this.physics.add.overlap(bullets, this.aster, bulletHitsAsteroid, null, this);
    function bulletHitsAsteroid() {
        console.log("trafiony")
        this.aster.disableBody(true, true);
    }
}
 
//akcja podczas kolizji statku z asteroidą
function shipHitsAsteroid(ship) {
    boom.setPosition(ship.x, ship.y);
    ship.disableBody(true, true);
    boom.visible = true;
    boom.anims.play('boom', true);
    setTimeout(function(){
    boom.visible = false;
    gameoverText.visible = true;
    }, 1000);
}

//akcja podczas kolizji statku z przyspieszaczem
function shipHitsSpeed() {
    asteroidsSpeed += 0.002;
    asteroids2Speed -= 0.002;
}

//akcja podczas kolizji statku z przyspieszaczem
function shipHitsSlow() {
    asteroidsSpeed -= 0.002;
    asteroids2Speed += 0.002;
}

// losowanie liczb z zakresu
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }