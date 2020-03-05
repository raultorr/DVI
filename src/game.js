export default class Game extends Phaser.Scene {

	constructor(configGame) {
	   	super({ key: 'main' });

	}
	preload() {  
		this.load.image('backGround', '../assets/backGround.png');
		this.load.spritesheet('run', '../assets/sprites/runAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.image('ground', '../assets/platform.png');
	}
	create() {

	this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 400, 'ground');
    this.platforms.create(800, 220, 'ground');



    this.player = this.physics.add.sprite(100, 450, 'run');

    this.physics.add.collider(this.player, this.platforms);

	this.player.setBounce(0.2);
	this.player.setCollideWorldBounds(true);
	
	this.player.body.setGravityY(50);
	this.anims.create({
	    key: 'left',
	    frames: this.anims.generateFrameNumbers('run', { start: 6, end: 10 }),
	    frameRate: 10,
	    repeat: -1
	});

	this.anims.create({
	    key: 'turn',
	    frames: [ { key: 'run', frame: 5 } ],
	    frameRate: 1
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }),
	    frameRate: 10,
	    repeat: -1
	});


	this.cursors = this.input.keyboard.createCursorKeys();
}

update(time, delta) {   
	if (this.cursors.left.isDown)
	{
	    this.player.setVelocityX(-160);

	    this.player.anims.play('left', true);
	}
	else if (this.cursors.right.isDown)
	{
	    this.player.setVelocityX(160);

	    this.player.anims.play('right', true);
	}
	else
	{
	    this.player.setVelocityX(0);

	   this.player.anims.play('turn');
	}

	if (this.cursors.up.isDown && this.player.body.touching.down)
	{
	    this.player.setVelocityY(-330);
	}
}
}