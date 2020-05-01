
export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.render = this.scene.add.graphics();

        this.body.colliderWorldBounds = false;


        this.loadsprites();
        this.createPlayerAnimations();


        this.health = 3;
        this.isDeath = false;
        this.speed = 200;
        this.jumpSpeed = -400;

    }
    loadsprites()
    {
    }

    update() {
		
		this.body.setSize(16, 32);
		this.body.setOffset(0, 0);

		if(this.scene.cursors.up.isDown && this.scene.cursors.right.isDown)
		{
			if(this.body.onFloor())
				this.body.setVelocityY(-330);
			this.body.setVelocityX(160);

		    this.anims.play('rightJump', true);
		}
		else if(this.scene.cursors.up.isDown && this.scene.cursors.left.isDown)
		{
			if(this.body.onFloor())
				this.body.setVelocityY(-330);
			this.body.setVelocityX(-160);

		    this.anims.play('leftJump', true);
		}
		else if(this.scene.cursors.down.isDown && this.scene.cursors.right.isDown)
		{
			this.body.setSize(16, 20);
			this.body.setOffset(0, 5);
			if(this.body.onFloor())
				this.body.setVelocityX(80);

		    this.anims.play('rightCrouch', true);
		}
		else if(this.scene.cursors.down.isDown && this.scene.cursors.left.isDown)
		{
			this.body.setSize(16, 20);
			this.body.setOffset(0, 5);
			if(this.body.onFloor())
				this.body.setVelocityX(-80);

		    this.anims.play('leftCrouch', true);
		}

		else if(this.scene.cursors.left.isDown)
		{
		    this.body.setVelocityX(-160);

		    this.anims.play('left', true);
		}
		else if (this.scene.cursors.right.isDown)
		{
		    this.body.setVelocityX(160);

		    this.anims.play('right', true);
		}
		else if (this.scene.cursors.up.isDown)
		{	
			if(this.body.onFloor())
			{
				this.body.setVelocityY(-330);
				this.anims.play('leftJump', true);
			}
		}
		
		else
		{
		    this.body.setVelocityX(0);
		   this.anims.play('turn');
		}
    }

    
    createPlayerAnimations() {
         this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'run', frame: 5 } ],
            frameRate: 1
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
	        key: 'rightJump',
	        frames: this.scene.anims.generateFrameNumbers('jump', {start: 0, end: 4}),
	        frameRate: 5,
	        repeat: -1
        });
        this.scene.anims.create({
            key: 'leftJump',
            frames: this.scene.anims.generateFrameNumbers('jump', {start: 6, end: 10}),
            frameRate: 5,
            repeat: -1
        }); 
        this.scene.anims.create({
			key: 'leftCrouch',
			frames: this.scene.anims.generateFrameNumbers('crouch', {start: 5, end: 9}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'rightCrouch',
			frames: this.scene.anims.generateFrameNumbers('crouch', {start: 0, end: 4}),
			frameRate: 5,
			repeat: -1
		});
    }
}
