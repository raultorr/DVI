
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy', 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.render = this.scene.add.graphics();

        this.body.colliderWorldBounds = true;


        this.createEnemyAnimations();

        
        this.name = "robot";
        this.health = 3;
        this.isDeath = false;
        this.speed = 80;
        this.facingR = false;
        this.body.offset.y = 20;
        this.body.offset.x = 20;
        this.distanceToPlayer = 200;
        this.timeToShoot = 30;
        this.haveShoot = false;
    }


    update(player, game) {


        
    	if(	this.playerInRange(player) && this.facingCorrect(player))
    	{
            if(this.facingR)
    		    this.anims.play('staticEnemyRight', true);
            else
                this.anims.play('staticEnemyLeft', true);
    		this.body.setVelocityX(0);
            if(this.timeToShoot == 0 && !this.haveShoot)
            {
                //Disparo
                game.spawnProjectile(this.scene, this.x, this.y, this);
                this.timeToShoot = 30; 
                this.haveShoot = true;
            }
            this.timeToShoot = this.timeToShoot -1;

    	}
    	else
    	{
            this.timeToShoot = 30;
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
                this.anims.play('rightEnemy', true);
            }
            else
            {
                this.body.setVelocityX(-(this.speed));
                this.anims.play('leftEnemy', true);
            }
    	}
    }

    
    createEnemyAnimations() {
         this.scene.anims.create({
            key: 'rightEnemy',
            frames: this.scene.anims.generateFrameNumbers('enemyMove', { start:4, end: 7 }),
            frameRate: 1,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'staticEnemyLeft',
            frames: [ { key: 'enemyMove', frame: 0 } ],
            frameRate: 1
        });

        this.scene.anims.create({
            key: 'staticEnemyRight',
            frames: [ { key: 'enemyMove', frame: 4 } ],
            frameRate: 1
        });


        this.scene.anims.create({
            key: 'leftEnemy',
            frames: this.scene.anims.generateFrameNumbers('enemyMove', { start: 0, end: 3 }),
            frameRate: 1,
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
        if (player.x < this.x) //Si el jugador esta a la izq devuelve el negativo del bool que dice si el enemigo mira a la derecha
        {
            return !this.facingR;
        }
        else
            return this.facingR;
    }
}
