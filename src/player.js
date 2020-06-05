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
		this.speed = 110;
		this.walkingSpeed= 50;
		this.jumpPower = 0;
		this.xjumpPower = 0;
		this.loadingJump = false;
        this.speedCrouch = 40;
        this.jumpSpeed = -200;
		this.facingR = true;
		this.isWalking = false;


        //Audio
		this.walkSound = this.scene.sound.add('walkSoundEffect',{loop: false});
		this.jumpSound = this.scene.sound.add('jumpSoundEffect',{loop: false});



		this.cursors = this.scene.input.keyboard.addKeys('W, A, D, S , E, SPACE, SHIFT');
		

    }
    loadsprites()
    {
    }

    update(game) {
				
		if(this.scene.input.manager.activePointer.isDown){			
			if(this.loadingJump)
			{
				this.jumpPower-=5;
			}
			else
			{
				this.loadingJump = true;
			}
		}
		else
		{
			if(this.loadingJump && this.body.onFloor())
			{
				this.body.setVelocityY(this.jumpPower);
				this.loadingJump = false;
			}
			this.jumpPower = 0;
		}


		this.body.setSize(16, 32);
		this.body.setOffset(0, 0);


		//Salto
		if(this.cursors.SPACE.isDown  && this.cursors.D.isDown)
		{
			this.facingR = true;
			if(this.body.onFloor())
			{
				this.jumpSound.play();
				this.body.setVelocityY(this.jumpSpeed);
			}
			this.body.setVelocityX(this.speed);

		    this.anims.play('rightJump', true);
		}
		else if(this.cursors.SPACE.isDown && this.cursors.A.isDown)
		{
			this.facingR = false;
			if(this.body.onFloor())
			{
				this.jumpSound.play();
				this.body.setVelocityY(this.jumpSpeed);
			}
			this.body.setVelocityX(-(this.speed));

		    this.anims.play('leftJump', true);
		}
		else if (this.cursors.SPACE.isDown)
		{	
			if(this.body.onFloor())
			{
				this.jumpSound.play();
				this.body.setVelocityY(this.jumpSpeed);
				if(!this.facingR)
					this.anims.play('leftJump', true);
				else
					this.anims.play('rightJump', true);
			}
		}

		//Agacharse


		else if(this.cursors.S.isDown && this.cursors.D.isDown)
		{
			this.body.setSize(16, 20);
			this.body.setOffset(0, 5);
			this.facingR = true;
			this.walkSound.stop();
			if(this.body.onFloor())
				this.body.setVelocityX(this.speedCrouch);

		    this.anims.play('rightCrouch', true);
		}
		else if(this.cursors.S.isDown && this.cursors.A.isDown)
		{
			this.body.setSize(16, 20);
			this.body.setOffset(0, 5);
			this.walkSound.stop();
			this.facingR = false;
			if(this.body.onFloor())
				this.body.setVelocityX(-(this.speedCrouch));

		    this.anims.play('leftCrouch', true);
		}
		else if(this.cursors.S.isDown){
			this.body.setSize(16, 20);
			this.body.setOffset(0, 5);
			this.walkSound.stop();
			if(this.body.onFloor())
				this.body.setVelocityX(0);

			if(!this.facingR)
				this.anims.play('staticCrouchL', true);
			else
				this.anims.play('staticCrouchR', true);
			
		}

		//Mov Izquierda
		else if(this.cursors.A.isDown && this.cursors.SHIFT.isDown)
		{
			this.walkSound.stop();
			
			this.facingR = false;
		    this.body.setVelocityX(-(this.walkingSpeed));

		    this.anims.play('leftWalk', true);
		}
		else if(this.cursors.A.isDown)
		{
			if(!this.walkSound.isPlaying)
			{
				this.walkSound.play();
			}
			this.facingR = false;
		    this.body.setVelocityX(-(this.speed));

		    this.anims.play('left', true);
		}

		//Mov Derecha
		else if (this.cursors.D.isDown && this.cursors.SHIFT.isDown)
		{
			this.walkSound.stop();
			this.facingR = true;
		    this.body.setVelocityX(this.walkingSpeed);

		    this.anims.play('rightWalk', true);
		}
		else if (this.cursors.D.isDown)
		{
			if(!this.walkSound.isPlaying)
			{
				this.walkSound.play();
			}
			this.facingR = true;
		    this.body.setVelocityX(this.speed);

		    this.anims.play('right', true);
		}	
		//Interaccion
		else if(this.cursors.E.isDown)
		{
			game.interaction(this.scene, this.x,this.y, this);
		}





		//Estatico
		else
		{
			this.walkSound.stop();
		    this.body.setVelocityX(0);
		    if(!this.facingR)
		   		this.anims.play('turnL');
		   	else
		   		this.anims.play('turnR');
		}


    }

    
    createPlayerAnimations() {
         this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 7, end: 11 }),
            frameRate: 10,
            repeat: -1
		});
		
		this.scene.anims.create({
            key: 'leftWalk',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 7, end: 11 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turnL',
            frames: [ { key: 'run', frame: 6 } ],
            frameRate: 1
        });

         this.scene.anims.create({
            key: 'turnR',
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
            key: 'rightWalk',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 0, end: 4 }),
            frameRate: 4,
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
			key: 'staticCrouchR',
			frames: [ { key: 'crouch', frame: 0 } ],
			frameRate: 1
		});

		this.scene.anims.create({
			key: 'staticCrouchL',
			frames: [ { key: 'crouch', frame: 5 } ],
			frameRate: 1
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
    isDead()
    {
    	return this.isDeath;
    }
    death()
    {
    	this.isDeath = true;
    }
}

