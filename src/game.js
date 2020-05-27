import Player from './player.js';
import Enemy   from './enemy.js';
import Projectile from './projectile.js';
import Laser from './laser.js';

export default class Game extends Phaser.Scene {

	constructor(configGame) {
	   	super({ key: 'main' });

	}
	preload() {  
		this.load.spritesheet('laserOn', 'assets/sprites/laser/laser-turn-on.png',{ frameWidth: 16, frameHeight:50 });
		this.load.spritesheet('laserOff', 'assets/sprites/laser/laser-turn-off.png',{ frameWidth: 16, frameHeight: 50 });
  		this.load.image("tilesMap1", "assets/TileSets/industrial.v1.png");
  		this.load.tilemapTiledJSON("map1", "Maps/level1.json");
  		this.load.spritesheet('run', 'assets/sprites/runAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('jump', 'assets/sprites/runAnimation/jump.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('crouch', 'assets/sprites/runAnimation/crouch.png',{ frameWidth: 16, frameHeight: 25 });
        this.load.spritesheet('enemyMove', 'assets/sprites/enemy/Robot.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('projectile', 'assets/sprites/enemy/projectile.png',{ frameWidth: 3, frameHeight: 1 });

	}
	create() {

		this.scene.start("Level1");

	}

	update(time, delta) {
	}


	/* addMap(scene, level) {
        let map;
        switch (level) {
            case 1: map = scene.make.tilemap({
                key: 'map1',
                tileWidth: 64,
                tileHeight: 64
            }); break;        }
        return map;
    }*/



	//Spawns
	spawnRobot(scene, x, y, enemies) {
        let robot = new Enemy(scene, x, y);
        robot.createEnemyAnimations();
        robot.play('staticEnemyRight', true);
        enemies.add(robot);
    }
    spawnProjectile(scene, x, y, enemy) {
        let projectile = new Projectile(scene, x, y, enemy);
        projectile.createProjectileAnimations();
        return projectile;
    }

    //Traps
    putLaser(scene, x, y, lasers, onOff, tOn, tOff)
    {
    	let laser = new Laser(scene, x, y, lasers, onOff, tOn, tOff);
    	laser.createLaserAnimations();
    	lasers.add(laser);
    }



    //Updates
    enemyUpdate(scene, enemies, player) {
        enemies.getChildren().forEach(function (item) {
            item.update(player, this);
        }, this);
    }
    laserUpdate(scene,lasers,  player)
    {
    	lasers.getChildren().forEach(function (item) {
            item.update(player, this);
        }, this);
    }






    //Camara
    addCamera(scene, player, groundLayer) {
       // scene.cameras.main.setBounds(0, 0, 50,50);
        scene.cameras.main.startFollow(player, true, 0.9,0.9);
        scene.cameras.main.setZoom(3);

    }




    //Player
    playerDie(player)
    {
    	if(player.isDeath)
    		this.scene.start("Level1");
    }
    hitPlayer(player, object)
    {	
    	switch(object.name)
    	{
    		case "laser":
				if(object.onOff)
    				player.isDeath = true;
    			break;
    		case "robot":
				player.isDeath = true;
				break;
			case "projectile":
				player.isDeath = true;
    			break;
    		default:
    			player.isDeath = false;
    	}
    	
    }

}