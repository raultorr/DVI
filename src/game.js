export default class Game extends Phaser.Scene {

	constructor(configGame) {
	   	super({ key: 'main' });

	}
	preload() {  
		this.load.spritesheet('run', 'assets/sprites/runAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('jump', 'assets/sprites/runAnimation/jump.png',{ frameWidth: 16, frameHeight: 32 });
  		this.load.image("tiles", "Maps/Assets.png");
  		this.load.tilemapTiledJSON("map", "Maps/PJson.json");

	}
	create() {

		var scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
		/*
		const backGround = map.createStaticLayer("Capa de patrones 2", tileset , 0 , 0);
		 */
		const map = this.make.tilemap({ key: "map" });

		const tileset = map.addTilesetImage("Assets2", "tiles");


		const backGround = map.createStaticLayer("Capa de patrones 2", tileset , 0 , 0);
		const worldLayer = map.createStaticLayer("Capa de patrones 1", tileset , 0 , 0);
		


		worldLayer.setCollisionByProperty({ collides: true });

	    this.player = this.physics.add.sprite(200, 450, 'run');
	    //this.physics.add.collider(this.player, this.worldLayer);
	    this.physics.add.collider(this.player, worldLayer);


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
		this.anims.create({
		key: 'rightJump',
		frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 4}),
		frameRate: 5,
		repeat: -1
		});
		this.anims.create({
			key: 'leftJump',
			frames: this.anims.generateFrameNumbers('jump', {start: 6, end: 10}),
			frameRate: 5,
			repeat: -1
		});

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update(time, delta) {

		if(this.cursors.up.isDown && this.cursors.right.isDown)
		{
			if(this.player.body.onFloor())
				this.player.setVelocityY(-330);
			this.player.setVelocityX(160);

		    this.player.anims.play('rightJump', true);
		}
		else if(this.cursors.up.isDown && this.cursors.left.isDown)
		{
			if(this.player.body.onFloor())
				this.player.setVelocityY(-330);
			this.player.setVelocityX(-160);

		    this.player.anims.play('leftJump', true);
		}


		else if(this.cursors.left.isDown)
		{
		    this.player.setVelocityX(-160);

		    this.player.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
		    this.player.setVelocityX(160);

		    this.player.anims.play('right', true);
		}
		else if (this.cursors.up.isDown)
		{
			if(this.player.body.onFloor())
		    	this.player.setVelocityY(-330);
			
			/*else if(this.cursors.up.isDown || !this.player.body.onFloor())
			{
				this.player.setVelocityY(-330);
				this.player.anims.play('leftJump', true);
			}*/

		}
		
		else
		{
		    this.player.setVelocityX(0);

		   this.player.anims.play('turn');
		}

		
	}
}