
export default class EnemyChaser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyChaser', 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.render = this.scene.add.graphics();

        this.body.colliderWorldBounds = true;
        this.chaserEffect = this.scene.sound.add('chaserSoundEffect',{loop: false, volume:0.8});


        this.createEnemyAnimations();

        
        this.name = "chaser";
        this.speed = 80;
        this.run =400;
        this.facingR = false;
        this.body.offset.y = 20;
        this.body.offset.x = 20;
        this.distanceToPlayer = 200;
        this.isRunning = false;
        this.body.setSize(25,27);
        this.body.setOffset(0, 0);
    }


    update(player, game) {
        let playerVelocity = player.body.velocity;
    	if(	this.playerInRange(player) && Math.abs(playerVelocity.x) >= 110)
    	{
            this.isRunning = true;
            this.facingCorrect(player);
            if(this.facingR)
            {
                this.chaserEffect.play();
                this.body.setVelocityX(this.run);
                this.anims.play('righChaser', true);
            }
            else
            {
                this.chaserEffect.play();
                this.body.setVelocityX(-this.run);
                this.anims.play('leftChaser', true);
            }
    	}
    	else
    	{
            this.isRunning = false;
            if(!this.body.onFloor() && this.body.velocity.x != 0)
            {
                this.facingR = !this.facingR; 
            }

            if(this.body.onWall())
            {
                if(this.facingR)
                {
                    this.facingR = false;
                }
                else
                {
                    this.facingR = true;
                }
            }
            if(this.facingR)
            {
                this.body.setVelocityX(this.speed);
                this.anims.play('righChaser', true);
            }
            else
            {
                this.body.setVelocityX(-(this.speed));
                this.anims.play('leftChaser', true);
            }
    	}
    }

    
    createEnemyAnimations() {
         this.scene.anims.create({
            key: 'righChaser',
            frames: this.scene.anims.generateFrameNumbers('chaserMove', { start:4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'staticChaserLeft',
            frames: [ { key: 'chaserMove', frame: 0 } ],
            frameRate: 1
        });

        this.scene.anims.create({
            key: 'staticChaserRight',
            frames: [ { key: 'chaserMove', frame: 4 } ],
            frameRate: 1
        });


        this.scene.anims.create({
            key: 'leftChaser',
            frames: this.scene.anims.generateFrameNumbers('chaserMove', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }
   	setX(cordX){
   		this.body.x = cordX;
   	}
   	playerInRange(player) {
   		let first = Math.abs(this.x - player.x) <= this.distanceToPlayer;
   		let second = Math.abs(this.y - player.y) <= 15; 
		return first && second;
	}
    facingCorrect(player)
    {
        if (player.x < this.x) //Si el jugador esta a la izq cambia el sentido de facingR
        {
            this.facingR = false;
        }
        else
            this.facingR = true;
    }
}
