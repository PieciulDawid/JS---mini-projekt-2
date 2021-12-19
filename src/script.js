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
//optymalnna prędkosć 7, czym większa liczba tym szybciej 
var shipSpeed = 7;
// optymalna prędkosć 1, czym większa liczba tym szybciej 
var asteroidsSpeed = 1.5;
// optymalna ilość 1,  czym większa liczba tym więcej
var asteroidsHowClose = 1;
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

    var shipCanvasX = ship.x - this.cameras.main.scrollX * ship.scrollFactorX;
    var shipCanvasY = ship.y - this.cameras.main.scrollY * ship.scrollFactorY;
    boom = this.physics.add.sprite(shipCanvasX, shipCanvasY, 'explode');
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

var posX = 750
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
        //jak blisko siebie mogą być asteroidy
        posX+=100 / asteroidsHowClose;
    }

    
    this.physics.add.collider(ship, this.aster, shipHitsAsteroid);
    //akcja podczas kolizji statku z asteroidą
    function shipHitsAsteroid(ship) {
        //var shipCanvasX = ship.x - this.cameras.main.scrollX * ship.scrollFactorX;
        //var shipCanvasY = ship.y - this.cameras.main.scrollY * ship.scrollFactorY;
        boom.setPosition(ship.x, ship.y);
        ship.disableBody(true, true);
        boom.visible = true;
        boom.anims.play('boom', true);
        gameoverText.visible = true;

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