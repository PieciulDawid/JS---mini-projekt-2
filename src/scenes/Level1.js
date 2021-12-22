import {CST} from "../CST.js";
  
var endGame;
var score;
var cursors;
var bullets; 
var Bullet;
var lastFired;
var info;
let backgrnd;
var explosions;
var boom;
var boom2
var gameoverText;
var bullet;
var endGame2;
var shipSpeed;
var asteroidsSpeed;
var asteroids2Speed;
var speedsSpeed;
var slowsSpeed;
var helpersSpeed;
var asteroidsHowClose;
var asteroids2HowClose;
var speedsHowClose;
var slowsHowClose;
var helpersHowClose;
var backgroundSpeed;
var ship;
var asteroids;
var AsteroidClass;
var Asteroid2Class;
var SpeedClass;
var SlowClass;
var HelperClass;
var posXAsteroids;
var posXAsteroids2;
var posXSpeeds;
var posXSlows;
var posXHelpers;
var angle;
var sprite;
var playButton;
var endLevelScore;
var nextLevelText;
var nextLevelButton;
var wifu;
var cloud;
var nextLevelText2;
var nextLevelButton2;

export class Level1 extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LEVEL1
        })
    }
    init(){
        //*******************************************************//
        //*                     Parametry                       *//
        //*******************************************************//
        //ilośc punktów do zbobycia aby przejść poziom 
        endLevelScore = 10;
        score = 10;
        nextLevelButton = null;
        nextLevelButton2 = null;
        //optymalnna prędkosć 3, czym większa liczba tym szybciej 
        shipSpeed = 3;
        // optymalna prędkosć 1, czym większa liczba tym szybciej 
        asteroidsSpeed = 1;
        asteroids2Speed = 1;
        speedsSpeed = 1.2;
        slowsSpeed = 1.3;
        helpersSpeed = 1.4;
        // optymalna ilość 1,  czym większa liczba tym więcej
        asteroidsHowClose = 0.5;
        asteroids2HowClose = 1;
        speedsHowClose = 1;
        slowsHowClose = 1;
        helpersHowClose = 0.07;
        //*******************************************************//

        AsteroidClass = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize: function AsteroidClass(scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'asteroid')
            },
            kill: function ()
                {
                    this.setActive(false);
                    this.setVisible(false);
                    this.body.stop();
                }
        })
        Asteroid2Class = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize: function Asteroid2Class(scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'asteroid2')
            },
            kill: function ()
                {
                    this.setActive(false);
                    this.setVisible(false);
                    this.body.stop();
                }
        })
        SpeedClass = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize: function SpeedClass(scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'speed')
            },
            kill: function ()
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        })
        SlowClass = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize: function SlowClass(scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'slow')
            },
            kill: function ()
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        })
        HelperClass = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize: function HelperClass(scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'helper')
            },
            kill: function ()
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        })
        endGame = false;
        lastFired = 0;
        endGame2 = false;
        posXAsteroids = 750;
        posXAsteroids2 = 750;
        posXSpeeds = 750;
        posXSlows = 750;
        posXHelpers = 750;
        angle = 0;
        sprite = 0;
    }
    preload () {
          cursors = this.input.keyboard.createCursorKeys();
          this.load.image('ship', 'https://examples.phaser.io/assets/games/asteroids/ship.png');
          this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
          this.load.image('asteroid', 'https://examples.phaser.io/assets/games/asteroids/asteroid1.png');
          this.load.image('asteroid2', 'https://examples.phaser.io/assets/games/asteroids/asteroid2.png');
          this.load.image('bullet', 'https://examples.phaser.io/assets/sprites/shmup-bullet.png');
          this.load.image('speed', 'https://examples.phaser.io/assets/sprites/melon.png');
          this.load.image('slow', 'https://examples.phaser.io/assets/sprites/pineapple.png');
          this.load.image('helper', 'https://examples.phaser.io/assets/sprites/spinObj_04.png');
          this.load.image('wifu', 'https://examples.phaser.io/assets/pics/contra1.png');
          this.load.image('cloud', 'https://examples.phaser.io/assets/particlestorm/cloud.png');
          this.load.spritesheet('explode', 'https://examples.phaser.io/assets/games/invaders/explode.png', {
              frameWidth: 128, frameHeight: 128
          });
          this.load.spritesheet('explode2', 'https://examples.phaser.io/assets/games/invaders/explode.png', {
              frameWidth: 128, frameHeight: 128
          });
      }

//**********************//
//tworzenie obiektów gry//
//**********************//
create () {

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
    //tworzenie pomagaczy
    this.helpers = this.physics.add.group({
        classType: HelperClass,
        runChildUpdate: true,
        allowGravity: false
    })

    //tworzenie tła gry
    backgrnd = this.add.tileSprite(0, -30, 22750, 450, 'backgrnd');
    backgrnd.setOrigin(0)

    //tworzenie statku i eksplozji
    ship = this.physics.add.sprite(125, 150, 'ship');
    boom = this.physics.add.sprite(1, 1, 'explode');
    boom.visible = false;
    boom2 = this.physics.add.sprite(1, 1, 'explode2');
    boom2.visible = false;
    ship.setCollideWorldBounds(true);


    //dodanie wifu
    wifu = this.physics.add.sprite(650, 220, 'wifu');
    wifu.setScale(1.6,1.6)
    wifu.visible = false;

    //dodanie chmury 
    cloud = this.physics.add.sprite(400, 80, 'cloud');
    cloud.setScale(1,1)
    cloud.visible = false;

    // tekst końca gry
    gameoverText = this.add.text(
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY-50,
        'GAME OVER',{
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
        });
    gameoverText.setOrigin(0.5);
    gameoverText.visible = false;


    nextLevelText = this.add.text(
        this.physics.world.bounds.centerX-40, 
        this.physics.world.bounds.centerY-80,
        'GOOD JOB',{
        font: "30px Arial",
        fill: "#000000",
        align: "center"
        });
    nextLevelText.setOrigin(0.5);
    nextLevelText.visible = false;

    nextLevelText2 = this.add.text(
        this.physics.world.bounds.centerX-35,
        this.physics.world.bounds.centerY-58,
        'Where do you want to go next?',{
        font: "13px Arial",
        fill: "#000000",
        align: "center"
        });
    nextLevelText2.setOrigin(0.5);
    nextLevelText2.visible = false;

       
    //animacje wybuchu
    this.anims.create({
        key: 'boom',
        frames: this.anims.generateFrameNumbers('explode', {
            start: 0, end: 15
        }),
        frameRate: 15,
        repeat: 0
    })
    this.anims.create({
        key: 'miniBoom',
        frames: this.anims.generateFrameNumbers('explode2', {
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
            if (this.x > 1000){
                this.setActive(false);
                this.setVisible(false);
            }
        },
        kill: function ()
        {
            this.setActive(false);
            this.setVisible(false);
            this.body.stop();
        }
    });
    //grupa z pociskami
    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });

    //napis z iloscią pocisków i  ilością punktów
    info = this.add.text(10, 10, '', { fill: '#FFFFFF' });

    playButton = this.add.text(this.game.renderer.width / 2.2,220,"< MENU >").setFontSize(15);
    playButton.visible = false; 
    playButton.setInteractive();
    playButton.on("pointerdown", ()=> {
       this.scene.start(CST.SCENES.MENU);
    });

    nextLevelButton = this.add.text(this.game.renderer.width / 2,220,"< LAVA LAND >").setFontSize(15);
    nextLevelButton.visible = false; 
    nextLevelButton.setInteractive();
    nextLevelButton.on("pointerdown", (a)=> {
        console.log(a)
        console.log("lava - level2")
       this.scene.start(CST.SCENES.LEVEL2);
    });

    nextLevelButton2 = this.add.text(this.game.renderer.width / 4,220,"< GREEN SPACE >").setFontSize(15);
    nextLevelButton2.visible = false; 
    nextLevelButton2.setInteractive();
    nextLevelButton2.on("pointerdown", (a)=> {
        console.log(a)
        console.log("green - level3")
       this.scene.start(CST.SCENES.LEVEL3);
    });


}


//********************//
//aktualizacja klatek//
//*******************//

update (time, delta) {
    backgrnd.x -=1;

    //ship.angle += 1;
    //generowanie asteroid
    if((time)%3 == 0 && !endGame){
        if(time%6 == 0){
            this.aster = this.asteroids.get().setActive(true).setVisible(true).setPosition(posXAsteroids+100, this.game.config.height*(getRandom(0,10))/10).setScale(2,2);
        }
        else{
            this.aster = this.asteroids.get().setActive(true).setVisible(true).setPosition(posXAsteroids+100, this.game.config.height*(getRandom(0,10))/10).setScale(2,2);
        }
        //jak szybko latają 
        this.asteroids.setVelocityX(-200 * asteroidsSpeed);
        //jak blisko siebie mogą być asteroidy
        posXAsteroids+=100 / asteroidsHowClose;
    }
    //generowanie asteroid2
    if((time)%3 == 0 && !endGame){
        if(time%2 == 0){
            this.aster2 = this.asteroids2.get().setActive(true).setVisible(true).setPosition(posXAsteroids2+100, this.game.config.height*(getRandom(0,10))/10).setScale(1,1);
        }
        else{
            this.aster2 = this.asteroids2.get().setActive(true).setVisible(true).setPosition(posXAsteroids2+100, this.game.config.height*(getRandom(0,10))/10).setScale(1,1);
        }
        //jak szybko latają 
        this.asteroids2.setVelocityX(-200 * (asteroids2Speed+0.1));
        //jak blisko siebie mogą być asteroidy
        posXAsteroids2+=100 / asteroids2HowClose;
    }

    //listenery na usuwanie po lewej stronie planszy
    //console.log(this.asteroids2)

    //generowanie przyspieszaczy
    if((time)%7 == 0 && !endGame){
        if(time%3 == 0){
            this.speed = this.speeds.get().setActive(true).setVisible(true).setPosition(posXSpeeds+100, this.game.config.height*(getRandom(0,10))/10).setScale(0.6,0.6)
        }
        else{
            this.speed = this.speeds.get().setActive(true).setVisible(true).setPosition(posXSpeeds+100, this.game.config.height*(getRandom(0,10))/10).setScale(0.6,0.6)
        }
        //jak szybko latają 
        this.speeds.setVelocityX(-200 * speedsSpeed);
        //jak blisko siebie mogą być asteroidy
        posXSpeeds+=100 / speedsHowClose;
    }

    //generowanie spowalniaczy
    if((time)%4 == 0 && !endGame){
        if(time%3 == 0){
            this.slow = this.slows.get().setActive(true).setVisible(true).setPosition(posXSlows+100, this.game.config.height*(getRandom(0,10))/10).setScale(0.5,0.5)
        }
        else{
            this.slow = this.slows.get().setActive(true).setVisible(true).setPosition(posXSlows+100, this.game.config.height*(getRandom(0,10))/10).setScale(0.5,0.5)
        }
        //jak szybko latają 
        this.slows.setVelocityX(-200 * slowsSpeed);
        //jak blisko siebie mogą być asteroidy
        posXSlows+=100 / speedsHowClose;
    }

    //generowanie pomagaczy
    if((time)%6 == 0 && !endGame){
        if(time%3 == 0){
            this.helper = this.helpers.get().setActive(true).setVisible(true).setPosition(posXHelpers+100, this.game.config.height*(getRandom(0,10))/10).setScale(0.2,0.2)
        }
        else{
            this.helper = this.helpers.get().setActive(true).setVisible(true).setPosition(posXHelpers+100, this.game.config.height*(getRandom(0,10))/10).setScale(0.2,0.2)
        }
        //jak szybko latają 
        this.helpers.setVelocityX(-200 * helpersSpeed);
        //jak blisko siebie mogą być asteroidy
        posXHelpers+=100 / helpersHowClose;
    }

    //this.helper.rotate(angle++);
    // zderzenia statku z asteroidą
    this.physics.add.overlap(ship, this.aster, shipHitsAsteroid, null, this);
    this.physics.add.overlap(ship, this.aster2, shipHitsAsteroid, null, this);
    // zderzenia statku z przyspieszaczem
    this.physics.add.overlap(ship, this.speed, shipHitsSpeed, null, this);
    // zderzenia statku z spowalniaczem
    this.physics.add.overlap(ship, this.slow, shipHitsSlow, null, this);
    // zderzenia statku z pomagaczem
    this.physics.add.overlap(ship, this.helper, shipHitsHelper, null, this);

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
    if (cursors.space.isDown && time > lastFired && !endGame){
        bullet = bullets.get();
        if (bullet)
        {
            bullet.fire(ship.x, ship.y);  

            lastFired = time + 50;
        }
    }
    let scoreRound = Math.round(score)
    if(score < 0){
        score = 0.001;
        endLevel();
    }

    info.setText([
        'Points left | ' + scoreRound,
        '    Bullets | ' + bullets.getTotalFree(),
    ]);

    //lekkie przyspieszanie asteroid z czasem
    if(time%8 == 0){
        asteroidsSpeed += 0.04;
        asteroids2Speed += 0.04;
    }

    //todo nie łapie zderzeń
    this.physics.add.overlap(bullets, this.aster, bulletHitsAsteroid, checkBulletVsEnemy, this);

    this.physics.add.overlap(bullets, this.aster2, bulletHitsAsteroid, checkBulletVsEnemy, this);

    this.physics.add.overlap(ship, this.speed, shipHitsSpeedSlowHelper, checkBulletVsEnemy, this);

    this.physics.add.overlap(ship, this.slow, shipHitsSpeedSlowHelper, checkBulletVsEnemy, this);

    this.physics.add.overlap(ship, this.helper, shipHitsSpeedSlowHelper, checkBulletVsEnemy, this);

}

}
function checkBulletVsEnemy (bullet, enemy)
{
    return (bullet.active && enemy.active);
}

function bulletHitsAsteroid(b,e) {
        boom2.setPosition(e.x, e.y);
        boom2.visible = true;
        boom2.anims.play('miniBoom', true).setScale(0.5,0.5);
        setTimeout(function(){
            boom2.visible = false;
            }, 1000);
        e.kill()
        b.kill()

}

function shipHitsSpeedSlowHelper(b,e) {
    e.kill()
}

//akcja podczas kolizji statku z asteroidą
function shipHitsAsteroid(ship) {
    boom.setPosition(ship.x, ship.y);
    ship.disableBody(true, true);
    boom.visible = true;
    boom.anims.play('boom', true).setScale(1,1);
    endGame = true;
    endGame2 = true;
    setTimeout(function(){
    boom.visible = false;
    gameoverText.visible = true;
    info.visible = false;
    playButton.visible = true;
    }, 1000);
}

function endLevel(){
    boom.setPosition(375, 175);
    ship.disableBody(true, true);
    boom.visible = true;
    boom.anims.play('boom', true).setScale(4,4);
    endGame = true;
    setTimeout(function(){
    boom.visible = false;
    info.visible = false;
    nextLevelText.visible = true;
    nextLevelButton.visible = true;
    nextLevelButton2.visible = true;
    nextLevelText2.visible = true;
    cloud.visible = true;
    wifu.visible = true;
    }, 1000);

}

//akcja podczas kolizji statku z przyspieszaczem
function shipHitsSpeed() {
    score-=0.1;
    asteroidsSpeed += 0.0002;
    asteroids2Speed -= 0.0002;
}

//akcja podczas kolizji statku z przyspieszaczem
function shipHitsSlow() {
    score-=0.1;
    asteroidsSpeed -= 0.0002;
    asteroids2Speed += 0.0002;
}

//akcja podczas kolizji statku z pomagaczem
function shipHitsHelper() {
    score-=0.01;
    asteroidsSpeed = 0.8;
    asteroids2Speed = 0.8;
}

// losowanie liczb z zakresu
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}