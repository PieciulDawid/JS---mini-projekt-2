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
var backgroundSpeed;
var ship;

//ładowanie zasobów
function preload () {
    //this.load.image('ship', 'assets/ship.png');
    cursors = this.input.keyboard.createCursorKeys();
    this.load.image('ship', 'https://examples.phaser.io/assets/games/asteroids/ship.png');
    this.load.image('backgrnd', 'https://examples.phaser.io/assets/games/invaders/starfield.png');
    this.load.image('asteroid1', 'https://examples.phaser.io/assets/games/asteroids/asteroid1.png');
    this.load.spritesheet('explode', 'https://examples.phaser.io/assets/games/invaders/explode.png', {
        frameWidth: 128, frameHeight: 128
    });
}



//tworzenie obiektów gry
function create () { 
    let back = this.add.tileSprite(0, -30, 750, 450, 'backgrnd');
    back.setOrigin(0)

    ship = this.physics.add.sprite(125, 150, 'ship');
    boom = this.physics.add.sprite(125, 150, 'explode');
    boom.visible = false;
    ship.setCollideWorldBounds(true);
    ship.setBounce(0.2);
    ship.body.gravity.y = 0
    ship.setOrigin(0.5, 0.5);

    asteroids = this.physics.add.staticGroup();
    asteroids.create(200, 240, 'asteroid1');
    asteroids.create(300, 190, 'asteroid1');
    asteroids.create(400, 140, 'asteroid1');
    asteroids.children.iterate((child) => {
        child.setScale(1.3).setOrigin(0).refreshBody()
    })
    this.physics.add.collider(ship, asteroids);

    //wybuch
    this.anims.create({
        key: 'boom',
        frames: this.anims.generateFrameNumbers('explode', {
            start: 0, end: 15
        }),
        frameRate: 14,
        repeat: 0
    })

    //stworzenie wybuchu

    function getBoom(){
        return boom = this.physics.add.sprite(125, 150, 'explode');
    }


}

//aktualizacja klatek 
function update () {
    

    this.physics.collide(ship, asteroids, shipHitsAsteroid);

    function shipHitsAsteroid(ship, asteroids) {
        ship.disableBody(true, true);
        boom.visible = true;
        boom.anims.play('boom', true);
    }


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
   