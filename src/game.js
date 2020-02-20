export default class Game extends Phaser.Scene {
  function preload ()
{
	this.load.setBaseURL('http://labs.phaser.io');

	this.load.image('sky', '/assets/skies/sky1.png');
    this.load.image('ground', 'src/games/firstgame/assets/platform.png');
    this.load.image('star', 'src/games/firstgame/assets/star.png');
    this.load.image('bomb', 'src/games/firstgame/assets/bomb.png');
    this.load.spritesheet('dude', 
        'src/games/firstgame/assets/dude.png',
        { frameWidth: 32, frameHeight: 48 });
}
var platforms;
function create ()
{
	this.add.image(400, 300, 'sky');

	platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');


    player = this.physics.add.sprite(100, 450, 'dude');

    this.physics.add.collider(player, platforms);

	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	player.body.setGravityY(100);
	this.anims.create({
	    key: 'left',
	    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
	    frameRate: 10,
	    repeat: -1
	});

	this.anims.create({
	    key: 'turn',
	    frames: [ { key: 'dude', frame: 4 } ],
	    frameRate: 20
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
	    frameRate: 10,
	    repeat: -1
	});


	cursors = this.input.keyboard.createCursorKeys();
	 }

function update ()
{

	if (cursors.left.isDown)
	{
	    player.setVelocityX(-60);

	    player.anims.play('left', true);
	}
	else if (cursors.right.isDown)
	{
	    player.setVelocityX(160);

	    player.anims.play('right', true);
	}
	else
	{
	    player.setVelocityX(0);

	    player.anims.play('turn');
	}

	if (cursors.up.isDown && player.body.touching.down)
	{
	    player.setVelocityY(-330);
	}
}
}