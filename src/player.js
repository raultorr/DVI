export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, mapLayer, item1, item2, item3) {
        super(scene, x, y, 'player', 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.render = this.scene.add.graphics();

        this.body.colliderWorldBounds = false;
		this.layer = mapLayer;

        this.createPlayerAnimations();


		this.equipped = 1; //0 nada, 1 botas, 2 guantes de escalada, 3 arma distraccion

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
		this.isPowerJumping = false;
		this.isPowerJumpingIniCount = 0;

		this.climbing = false;
        //Audio
		this.walkSound = this.scene.sound.add('walkSoundEffect',{loop: false});
		this.jumpSound = this.scene.sound.add('jumpSoundEffect',{loop: false});
		this.powerJumpSound = this.scene.sound.add('powerJumpSoundEffect',{loop: false});
		this.deathSound = this.scene.sound.add('deathSoundEffect',{loop: false});


		this.cursors = this.scene.input.keyboard.addKeys('ZERO, ONE, TWO, THREE, W, A, D, S , E, SPACE, SHIFT');


		this.inventoryBg = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY+110, 'inventory');
		this.boots = this.scene.add.sprite(this.scene.cameras.main.centerX-17, this.scene.cameras.main.centerY+110, 'boots');
		this.gloves = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY+110, 'gloves');
		this.weapon = this.scene.add.sprite(this.scene.cameras.main.centerX+17, this.scene.cameras.main.centerY+110, 'weapon');
		this.inventoryActive = this.scene.add.sprite(683, this.scene.cameras.main.centerY+110, 'inventory-active');
		

		this.inventoryBg.setScrollFactor(0);
		this.inventoryActive.setScrollFactor(0);
		this.boots.setScrollFactor(0);
		this.gloves.setScrollFactor(0);
		this.weapon.setScrollFactor(0);


		this.picked1 = item1;
		this.picked2 = item2;
		this.picked3 = item3;


		this.bullets = this.scene.add.group();
		this.timeToShoot = 0;

		this.body.angle = 90;

		this.kill=false;
		this.dying=-1;

		/*
		this.bullets = this.scene.add.group();
    	this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

		this.fireRate = 100;
		this.nextFire = 0;	
		
		this.bullets.createMultiple(50, 'bullet');*/
		//this.bullets.setAll('checkWorldBounds', true);
		//this.bullets.setAll('outOfBoundsKill', true);


		//PARA SACAR UNA LINEA CON LA DIRECCION
		
		this.gfx = this.scene.add.graphics().setDefaultStyles({ lineStyle: { width: 1, color: 0xffdd00, alpha: 0.5 } });
		this.line = new Phaser.Geom.Line();
		this.angler = 0;
		this.scene.input.on('pointermove', function (pointer) {
			
		}, this);
    }

    update(game) {
		
		//this.rotation = this.scene.physics.arcade.angleToPointer(sprite);
		//this.scene.physics.moveTo(this, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y, null, 750);

		//this.scene.scoreText.setScrollFactor(0);
		this.drawHudActive();

		this.body.setSize(16, 32);
		this.body.setOffset(0, 0);
		

		if(this.isPowerJumping){
			this.body.setSize(25, 16);
			this.body.setOffset(0, 0);
			if(this.facingR){
				this.anims.play("rightPowerJump", true);
				
			}else{
				this.anims.play("leftPowerJump", true);
			}
		}

		if(this.equipped == 1 && this.picked1){

			
			this.gfx.setScale(0);
			if(this.scene.input.manager.activePointer.isDown && !this.isPowerJumping && this.body.onFloor()){			
				if(this.loadingJump)
				{
					this.gfx.setScale(1);
					this.angler = Phaser.Math.Angle.Between(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
					Phaser.Geom.Line.SetToAngle(this.line, this.x, this.y, this.angler, (-this.jumpPower)/5);
					
					this.gfx.clear().strokeLineShape(this.line);
					

					if(this.jumpPower > -350)
						this.jumpPower-=4;
				}
				else
				{
					this.loadingJump = true;
				}
			}
			else
			{
				if(this.loadingJump)
				{	
					this.powerJumpSound.play();
					/*
					if(this.scene.input.mousePointer.x > 700){
						this.body.setVelocityX(-this.jumpPower);
						this.facingR = true;
					}else{
						this.body.setVelocityX(this.jumpPower);
						this.facingR = false;
					}*/

					let angle = Phaser.Math.Angle.Between(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
					this.scene.physics.velocityFromRotation(angle, -this.jumpPower, this.body.velocity);
					console.log(angle);
					if(angle<1.5 && angle>-1.5){
						this.facingR = true;
					}else{
						this.facingR = false;
					}


					this.isPowerJumping = true;

					this.loadingJump = false;
				}
				this.jumpPower = 0;
			}
		}
		if(this.equipped == 2 && this.picked2)
		{

			if(this.body.onWall() || this.body.blocked.right || this.body.blocked.left || this.climbing)
			{
				this.walkSound.stop();
				//this.body.allowGravity = false;
				this.climbing = true;
				if(this.facingR)
				{
					this.anims.play("wallClimbingRight", true);
				}
				else
					this.anims.play("wallClimbingLeft", true);
				if(this.cursors.W.isDown)
				{
					this.body.setVelocityY(-6); //Mantiene al jugador colgado

				}
				else if(this.cursors.D.isDown )
				{
					this.body.setVelocityX(this.speed);
					if(!this.facingR || !this.body.blocked.right)
						this.climbing = false;
					else
						this.body.setVelocityY(-this.speed);
				}
				else if(this.cursors.A.isDown)
				{
					this.body.setVelocityX(-this.speed);
					if(this.facingR || !this.body.blocked.left)
						this.climbing = false;
					else
						this.body.setVelocityY(-this.speed);
				}
				else if(this.cursors.S.isDown)
				{
					//this.body.setVelocityY(this.speed);
					this.climbing = false;
				}
				else if(this.cursors.SPACE.isDown)
				{
					this.climbing = false;
					if(this.facingR)
					{
						this.body.setVelocityY(this.jumpSpeed);
						this.body.setVelocityX(-(this.speed));

					}
					else
					{
						this.body.setVelocityY(this.jumpSpeed);
						this.body.setVelocityX(this.speed);
					}
					this.facingR = !this.facingR;
				}
				else
				{
					//this.anims.play("wallClimbingStatic", true);
					//this.body.setVelocityY(0);
				}
				return;
			}

		}


		if(this.equipped == 3 && this.picked3)
		{
			if ( this.scene.input.manager.activePointer.isDown && this.timeToShoot == 0) {
				
				
				this.bullets.add(game.spawnBullet(this.scene, this.x, this.y, Phaser.Math.Angle.Between(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y), this.layer));
				this.timeToShoot = 500;
			}
			
			if(this.timeToShoot>0){
				this.timeToShoot--;
			}
		}

		if(!this.climbing && !this.kill)
		{
			this.body.allowGravity = true;
			this.normalMovements(game);
		}else{
			this.body.allowGravity = false;
		}

		

		//EQUIPAMIENTOS
		if (this.cursors.ZERO.isDown){
			this.equipped = 0;
		}
		if (this.cursors.ONE.isDown){ //Si no esta cogido no puede seleccionarlo
			this.equipped = 1;
		}
		else if(this.cursors.TWO.isDown){
			this.equipped = 2;
		}
		else if(this.cursors.THREE.isDown){
			this.equipped = 3;
		}


		this.bullets.getChildren().forEach(function (item) {
            item.update();
		}, this);
		
		if(this.kill){
			if(this.dying == -1){
				this.dying = 160;
				this.walkSound.stop();
				this.deathSound.play();
				this.body.y = this.body.y + 10;
				this.body.setVelocityX(0);
				this.body.setVelocityY(0);
			}
			else if(this.dying == 0){
				
				this.body.setVelocityX(0);
				this.body.setVelocityY(0);
				this.kill = false;
				this.dying == -1;
				this.isDeath = true;
				game.playerDie(this);
			}else{
				this.dying--;
				this.body.setSize(32, 15);
				this.body.setOffset(0, 0);
				if(this.facingR)
					this.anims.play('rightDead', true);
				else
					this.anims.play('leftDead', true);
			}
		}

    }

    normalMovements(game)
    {
		//Salto
		if(!this.isPowerJumping ){

			if(this.cursors.SPACE.isDown  && this.cursors.D.isDown)
			{
				this.walkSound.stop();
				this.facingR = true;
				if(this.body.onFloor())
				{
					this.jumpSound.play();
					this.body.setVelocityY(this.jumpSpeed);
				}
				this.body.setVelocityX(this.speed);

				if(this.equipped==1 && this.picked1){
					this.anims.play('rightJumpBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('rightJumpWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('rightJumpWeapon', true);
				}else{
					this.anims.play('rightJump', true);
				}
			}
			else if(this.cursors.SPACE.isDown && this.cursors.A.isDown)
			{
				this.walkSound.stop();
				this.facingR = false;
				if(this.body.onFloor())
				{
					this.jumpSound.play();
					this.body.setVelocityY(this.jumpSpeed);
				}
				//if()
				this.body.setVelocityX(-(this.speed));
				if(this.equipped==1 && this.picked1){
					this.anims.play('leftJumpBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('leftJumpWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('leftJumpWeapon', true);
				}else{
					this.anims.play('leftJump', true);
				}
			}
			else if (this.cursors.SPACE.isDown)
			{	
				this.walkSound.stop();
				if(this.body.onFloor())
				{
					this.jumpSound.play();
					this.body.setVelocityY(this.jumpSpeed);
					if(!this.facingR){
						if(this.equipped==1 && this.picked1){
							this.anims.play('leftJumpBoots', true);
						}else if((this.equipped==2 && this.picked2)){
							this.anims.play('leftJumpWallClimbing', true);
						}else if((this.equipped==3 && this.picked3)){
							this.anims.play('leftJumpWeapon', true);
						}else{
							this.anims.play('leftJump', true);
						}
					}
					else{
						if(this.equipped==1 && this.picked1){
							this.anims.play('rightJumpBoots', true);
						}else if((this.equipped==2 && this.picked2)){
							this.anims.play('rightJumpWallClimbing', true);
						}else if((this.equipped==3 && this.picked3)){
							this.anims.play('rightJumpWeapon', true);
						}else{
							this.anims.play('rightJump', true);
						}
					}
				}
			}

			//Agacharse


			else if(this.cursors.S.isDown && this.cursors.D.isDown)
			{
				this.body.setSize(16, 24);
				this.body.setOffset(0, 0);
				this.facingR = true;
				this.walkSound.stop();
				if(this.body.onFloor())
					this.body.setVelocityX(this.speedCrouch);

				if(this.equipped==1 && this.picked1){
					this.anims.play('rightCrouchBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('rightCrouchWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('rightCrouchWeapon', true);
				}else{
					this.anims.play('rightCrouch', true);
				}
			}
			else if(this.cursors.S.isDown && this.cursors.A.isDown)
			{
				this.body.setSize(16, 24);
				this.body.setOffset(0, 0);
				this.walkSound.stop();
				this.facingR = false;
				if(this.body.onFloor())
					this.body.setVelocityX(-(this.speedCrouch));

				if(this.equipped==1 && this.picked1){
					this.anims.play('leftCrouchBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('leftCrouchWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('leftCrouchWeapon', true);
				}else{
					this.anims.play('leftCrouch', true);
				}
			}
			else if(this.cursors.S.isDown){
				this.body.setSize(16, 24);
				this.body.setOffset(0, 0);
				this.walkSound.stop();
				if(this.body.onFloor())
					this.body.setVelocityX(0);

				if(!this.facingR){
					if(this.equipped==1 && this.picked1){
						this.anims.play('staticCrouchLBoots', true);
					}else if((this.equipped==2 && this.picked2)){
						this.anims.play('staticCrouchLWallClimbing', true);
					}else if((this.equipped==3 && this.picked3)){
						this.anims.play('staticCrouchLWeapon', true);
					}else{
						this.anims.play('staticCrouchL', true);
					}
				}
				else{
					if(this.equipped==1 && this.picked1){
						this.anims.play('staticCrouchRBoots', true);
					}else if((this.equipped==2 && this.picked2)){
						this.anims.play('staticCrouchRWallClimbing', true);
					}else if((this.equipped==3 && this.picked3)){
						this.anims.play('staticCrouchRWeapon', true);
					}else{
						this.anims.play('staticCrouchR', true);
					}
				}
				
			}

			//Mov Izquierda
			else if(this.cursors.A.isDown && this.cursors.SHIFT.isDown)
			{
				this.walkSound.stop();
				
				this.facingR = false;
			    this.body.setVelocityX(-(this.walkingSpeed));

			    if(this.equipped==1 && this.picked1){
					this.anims.play('leftWalkBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('leftWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('leftWalkWeapon', true);
				}else{
					this.anims.play('leftWalk', true);
				}
			}
			else if(this.cursors.A.isDown)
			{
				if(!this.walkSound.isPlaying)
				{
					this.walkSound.play();
				}
				this.facingR = false;
			    this.body.setVelocityX(-(this.speed));

			    if(this.equipped==1 && this.picked1){
					this.anims.play('leftBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('leftWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('leftWeapon', true);
				}else{
					this.anims.play('left', true);
				}
			}

			//Mov Derecha
			else if (this.cursors.D.isDown && this.cursors.SHIFT.isDown)
			{
				this.walkSound.stop();
				this.facingR = true;
			    this.body.setVelocityX(this.walkingSpeed);

			    if(this.equipped==1 && this.picked1){
					this.anims.play('rightWalkBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('rightWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('rightWalkWeapon', true);
				}else{
					this.anims.play('rightWalk', true);
				}
			}
			else if (this.cursors.D.isDown)
			{
				if(!this.walkSound.isPlaying)
				{
					this.walkSound.play();
				}
				this.facingR = true;
			    this.body.setVelocityX(this.speed);

			    if(this.equipped==1 && this.picked1){
					this.anims.play('rightBoots', true);
				}else if((this.equipped==2 && this.picked2)){
					this.anims.play('rightWallClimbing', true);
				}else if((this.equipped==3 && this.picked3)){
					this.anims.play('rightWeapon', true);
				}else{
					this.anims.play('right', true);
				}
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
				
				if(!this.isPowerJumping){
					this.body.setVelocityX(0);
				}
				
				
			    if(!this.facingR){
					if(this.equipped==1 && this.picked1){
						this.anims.play('turnLBoots', true);
					}else if((this.equipped==2 && this.picked2)){
						this.anims.play('turnLtWallClimbing', true);
					}else if((this.equipped==3 && this.picked3)){
						this.anims.play('turnLWeapon', true);
					}else{
						this.anims.play('turnL', true);
					}
				}
			   	else{
					if(this.equipped==1 && this.picked1){
						this.anims.play('turnRBoots', true);
					}else if((this.equipped==2 && this.picked2)){
						this.anims.play('turnRtWallClimbing', true);
					}else if((this.equipped==3 && this.picked3)){
						this.anims.play('turnRWeapon', true);
					}else{
						this.anims.play('turnR', true);
					}
				}
			}
		}
		else{
			if(this.body.onFloor() && this.isPowerJumpingIniCount > 5){
				this.isPowerJumpingIniCount = 0;
				this.isPowerJumping = false;
			}else {
				this.isPowerJumpingIniCount++;
			}
		}
    }
    createPlayerAnimations() {
		this.scene.anims.create({
            key: 'leftDead',
            frames: [ { key: 'dead', frame: 1 } ],
            frameRate: 1,
		});

		this.scene.anims.create({
            key: 'rightDead',
            frames: [ { key: 'dead', frame: 0 } ],
            frameRate: 1,
		});

         this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 7, end: 11 }),
            frameRate: 10,
            repeat: -1
		});

		this.scene.anims.create({
            key: 'leftBoots',
            frames: this.scene.anims.generateFrameNumbers('runBoots', { start: 7, end: 11 }),
            frameRate: 10,
            repeat: -1
		});

		this.scene.anims.create({
            key: 'leftWeapon',
            frames: this.scene.anims.generateFrameNumbers('runWeapon', { start: 7, end: 11 }),
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
            key: 'leftWallClimbing',
            frames: this.scene.anims.generateFrameNumbers('runWallClimbing', { start: 7, end: 11 }),
            frameRate: 4,
            repeat: -1
		});
		
		this.scene.anims.create({
            key: 'leftWalkBoots',
            frames: this.scene.anims.generateFrameNumbers('runBoots', { start: 7, end: 11 }),
            frameRate: 4,
            repeat: -1
        });

		this.scene.anims.create({
            key: 'leftWalkWeapon',
            frames: this.scene.anims.generateFrameNumbers('runWeapon', { start: 7, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
		
        this.scene.anims.create({
            key: 'turnL',
            frames: [ { key: 'run', frame: 6 } ],
            frameRate: 1
		});
		
		this.scene.anims.create({
            key: 'turnLBoots',
            frames: [ { key: 'runBoots', frame: 6 } ],
            frameRate: 1
		});
		this.scene.anims.create({
            key: 'turnLWeapon',
            frames: [ { key: 'runWeapon', frame: 6 } ],
            frameRate: 1
        });
        this.scene.anims.create({
            key: 'turnLtWallClimbing',
            frames: [ { key: 'runWallClimbing', frame: 6 } ],
            frameRate: 1
        });

         this.scene.anims.create({
            key: 'turnR',
            frames: [ { key: 'run', frame: 5 } ],
            frameRate: 1
		});
		
		this.scene.anims.create({
            key: 'turnRBoots',
            frames: [ { key: 'runBoots', frame: 5 } ],
            frameRate: 1
		});
		this.scene.anims.create({
            key: 'turnRWeapon',
            frames: [ { key: 'runWeapon', frame: 5 } ],
            frameRate: 1
        });
         this.scene.anims.create({
            key: 'turnRtWallClimbing',
            frames: [ { key: 'runWallClimbing', frame: 5 } ],
            frameRate: 1
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
		});

		this.scene.anims.create({
            key: 'rightBoots',
            frames: this.scene.anims.generateFrameNumbers('runBoots', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
		});
		this.scene.anims.create({
            key: 'rightWeapon',
            frames: this.scene.anims.generateFrameNumbers('runWeapon', { start: 0, end: 4 }),
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
            key: 'rightWallClimbing',
            frames: this.scene.anims.generateFrameNumbers('runWallClimbing', { start: 0, end: 4 }),
            frameRate: 4,
            repeat: -1
		});

		this.scene.anims.create({
            key: 'rightWalkBoots',
            frames: this.scene.anims.generateFrameNumbers('runBoots', { start: 0, end: 4 }),
            frameRate: 4,
            repeat: -1
		});
		this.scene.anims.create({
            key: 'rightWalkWeapon',
            frames: this.scene.anims.generateFrameNumbers('runWeapon', { start: 0, end: 4 }),
            frameRate: 4,
            repeat: -1
        });
		this.scene.anims.create({
	        key: 'rightJump',
	        frames: [ { key: 'jump', frame: 0 } ],
	        frameRate: 1
		});
		this.scene.anims.create({
	        key: 'rightJumpBoots',
	        frames: [ { key: 'jumpBoots', frame: 0 } ],
	        frameRate: 1
		});
		this.scene.anims.create({
	        key: 'rightJumpWeapon',
	        frames: [ { key: 'jumpWeapon', frame: 0 } ],
	        frameRate: 1
        });
        this.scene.anims.create({
	        key: 'rightJumpWallClimbing',
	        frames: [ { key: 'jumpWallClimbing', frame: 0 } ],
	        frameRate: 1
        });
        this.scene.anims.create({
            key: 'leftJump',
            frames: [ { key: 'jump', frame: 1 } ],
            frameRate: 1
		});
		this.scene.anims.create({
            key: 'leftJumpBoots',
            frames: [ { key: 'jumpBoots', frame: 1 } ],
            frameRate: 1
		});
		this.scene.anims.create({
            key: 'leftJumpWeapon',
            frames: [ { key: 'jumpWeapon', frame: 1 } ],
            frameRate: 1
		});
		this.scene.anims.create({
	        key: 'leftJumpWallClimbing',
	        frames: [ { key: 'jumpWallClimbing', frame: 1 } ],
	        frameRate: 1
        });
		
		this.scene.anims.create({
			key: 'staticCrouchR',
			frames: [ { key: 'crouch', frame: 0 } ],
			frameRate: 1
		});
		this.scene.anims.create({
			key: 'staticCrouchRBoots',
			frames: [ { key: 'crouchBoots', frame: 0 } ],
			frameRate: 1
		});
		this.scene.anims.create({
			key: 'staticCrouchRWeapon',
			frames: [ { key: 'crouchWeapon', frame: 0 } ],
			frameRate: 1
		});
		this.scene.anims.create({
			key: 'staticCrouchRWallClimbing',
			frames: [ { key: 'crouchWallClimbing', frame: 0 } ],
			frameRate: 1
		});
		this.scene.anims.create({
			key: 'staticCrouchL',
			frames: [ { key: 'crouch', frame: 5 } ],
			frameRate: 1
		});

		this.scene.anims.create({
			key: 'staticCrouchLBoots',
			frames: [ { key: 'crouchBoots', frame: 5 } ],
			frameRate: 1
		});
		this.scene.anims.create({
			key: 'staticCrouchLWeapon',
			frames: [ { key: 'crouchWeapon', frame: 5 } ],
			frameRate: 1
		});

		this.scene.anims.create({
			key: 'staticCrouchLWallClimbing',
			frames: [ { key: 'crouchWallClimbing', frame: 5 } ],
			frameRate: 1
		});

        this.scene.anims.create({
			key: 'leftCrouch',
			frames: this.scene.anims.generateFrameNumbers('crouch', {start: 5, end: 9}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'leftCrouchBoots',
			frames: this.scene.anims.generateFrameNumbers('crouchBoots', {start: 5, end: 9}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftCrouchWeapon',
			frames: this.scene.anims.generateFrameNumbers('crouchWeapon', {start: 5, end: 9}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftCrouchWallClimbing',
			frames: this.scene.anims.generateFrameNumbers('crouchWallClimbing', {start: 5, end: 9}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'rightCrouch',
			frames: this.scene.anims.generateFrameNumbers('crouch', {start: 0, end: 4}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'rightCrouchBoots',
			frames: this.scene.anims.generateFrameNumbers('crouchBoots', {start: 0, end: 4}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'rightCrouchWeapon',
			frames: this.scene.anims.generateFrameNumbers('crouchWeapon', {start: 0, end: 4}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'rightCrouchWallClimbing',
			frames: this.scene.anims.generateFrameNumbers('crouchWallClimbing', {start: 0, end: 4}),
			frameRate: 5,
			repeat: -1
		});
		//Wallclimbing
		this.scene.anims.create({
			key: 'wallClimbingLeft',
			frames: this.scene.anims.generateFrameNumbers('wallClimbing', {start: 4, end: 7}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'wallClimbingRight',
			frames: this.scene.anims.generateFrameNumbers('wallClimbing', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'wallClimbingStatic',
			frames: [ { key: 'wallClimbing', frame: 5 } ],
			frameRate: 10,
			repeat: -1
		});
		//PowerJump
		this.scene.anims.create({
	        key: 'rightPowerJump',
	        frames: [ { key: 'powerJump', frame: 0 } ],
	        frameRate: 1
		});

		this.scene.anims.create({
	        key: 'leftPowerJump',
	        frames: [ { key: 'powerJump', frame: 1 } ],
	        frameRate: 1
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
    drawHudActive()
    {
		if(!this.picked1){
			this.boots.visible = false;
		}else{
			this.boots.visible = true;
		}

		if(!this.picked2){
			this.gloves.visible = false;
		}else{
			this.gloves.visible = true;
		}

		if(!this.picked3){
			this.weapon.visible = false;
		}else{
			this.weapon.visible = true;
		}



		this.inventoryActive.x = 683 + (this.equipped * 17) - 17;
    }
}

