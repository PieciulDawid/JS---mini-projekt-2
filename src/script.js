var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 350,
    backgroundColor: "CCC",
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
var shipSpeed = 7;
var asteroidsSpeed = 1.3;
var asteroidsDensity = 10;
var backgroundSpeed;
var ship;
var asteroids;
var AsteroidClass = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function AsteroidClass(scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'asteroid')
    }
})


//******************//
//ładowanie zasobów//
//******************//

function preload () {
    cursors = this.input.keyboard.createCursorKeys();
    this.load.image('ship', 'https://examples.phaser.io/assets/games/asteroids/ship.png');
    this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
    this.load.image('asteroid', 'https://examples.phaser.io/assets/games/asteroids/asteroid1.png');
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

    //tworzenie tła gry
    let back = this.add.tileSprite(0, -30, 750, 450, 'backgrnd');
    back.setOrigin(0)

    //tworzenie statku i eksplozji
    ship = this.physics.add.sprite(125, 150, 'ship');
    boom = this.physics.add.sprite(125, 150, 'explode');
    boom.visible = false;
    ship.setCollideWorldBounds(true);

    // asteroids = this.physics.add.staticGroup();
    // asteroids.create(200, 240, 'asteroid1');
    // asteroids.create(300, 190, 'asteroid1');
    // asteroids.create(400, 140, 'asteroid1');
    // asteroids.children.iterate((child) => {
    //     child.setScale(1.3).setOrigin(0).refreshBody()
    // })

    //this.physics.add.collider(this.ship, this.asteroids, shipHitsAsteroid());

    // animacja wybuchu
    this.anims.create({
        key: 'boom',
        frames: this.anims.generateFrameNumbers('explode', {
            start: 0, end: 15
        }),
        frameRate: 15,
        repeat: 0
    })
}


//********************//
//aktualizacja klatek//
//*******************//

var posX = 1000
function update (time) {

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
        //jak gęsto są asteroidy
        posX+=100 / asteroidsDensity;
    }

    

    //akcja podczas kolizji statku z asteroidą
    function shipHitsAsteroid(ship) {
        ship.disableBody(true, true);
        boom.visible = true;
        boom.anims.play('boom', true);
    }


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
}


// losowanie liczb z zakresu
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }