import Player from './player.js';
import Enemy   from './enemy.js';
import Projectile from './projectile.js';
import Laser from './laser.js';
import Consola from './consolaPuente.js';

export default class Game extends Phaser.Scene {

	constructor(configGame) {
	   	super({ key: 'main' });
	   	this.actLevel = 1;
	   	this.nameLevel;

	}
	preload() {  
		this.load.spritesheet('laserOn', 'assets/sprites/laser/laser-turn-on.png',{ frameWidth: 16, frameHeight:50 });
		this.load.spritesheet('laserOff', 'assets/sprites/laser/laser-turn-off.png',{ frameWidth: 16, frameHeight: 50 });

		this.load.spritesheet('run', 'assets/sprites/RunAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('runBoots', 'assets/sprites/RunAnimation/runBoots.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('runWallClimbing', 'assets/sprites/RunAnimation/runWallclimbing.png',{ frameWidth: 16, frameHeight: 32 });
		
		this.load.spritesheet('jump', 'assets/sprites/RunAnimation/jump.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('powerJump', 'assets/sprites/RunAnimation/powerJump.png',{ frameWidth: 25, frameHeight: 16 });
		this.load.spritesheet('jumpBoots', 'assets/sprites/RunAnimation/jumpBoots.png',{ frameWidth: 16, frameHeight: 32 });
		
		this.load.spritesheet('crouch', 'assets/sprites/RunAnimation/crouch.png',{ frameWidth: 16, frameHeight: 25 });
		this.load.spritesheet('crouchBoots', 'assets/sprites/RunAnimation/crouchBoots.png',{ frameWidth: 16, frameHeight: 25 });

        this.load.spritesheet('enemyMove', 'assets/sprites/enemy/Robot.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('projectile', 'assets/sprites/enemy/projectile.png',{ frameWidth: 3, frameHeight: 1 });
        this.load.spritesheet('consola', 'assets/sprites/consola/consola.png',{ frameWidth: 33, frameHeight: 25 });

        this.load.spritesheet('wallClimbing', 'assets/sprites/RunAnimation/wallClimbing.png',{ frameWidth: 16, frameHeight: 32 })

		//HUD IMGS
		this.load.image('inventory', 'assets/sprites/hud/inventory-bg.png');
		this.load.image('inventory-active', 'assets/sprites/hud/inventory-active.png');
		this.load.image('boots', 'assets/sprites/hud/boots16.png');


        //maps
		this.load.image("tilesMap", "assets/TileSets/industrial.v1.png");
		this.load.image("tilesGoal", "assets/TileSets/Goal.png");
  		this.load.tilemapTiledJSON("map1", "Maps/level1.json");
  		this.load.tilemapTiledJSON("map2", "Maps/level2.json");
  		this.load.tilemapTiledJSON("map3", "Maps/level3.json");


  		//Sounds
  		this.load.audio('shootSoundEffect', 'assets/audio/Rifleprimary2.ogg');
        // this.load.audio('walkSoundEffect', 'assets/audio/steps_platform.ogg');
        //this.load.audio('shootSoundEffect', 'assets/audio/Rifleprimary2.ogg');
        this.load.audio('walkSoundEffect', 'assets/audio/Run raul.ogg');
		this.load.audio('jumpSoundEffect', 'assets/audio/Jump.wav');
		this.load.audio('level1music', 'assets/audio/walking the devil.mp3');


	}
	create() {
		this.mapSelector();
		this.scene.start(this.nameLevel);

	}

	update(time, delta) {
	}

	mapSelector()
	{
		switch(this.actLevel)
		{
			case 1:
				this.nameLevel = "Level1";
				break;
			case 2:
				this.nameLevel = "Level2";
				break;
			case 3:
				this.nameLevel = "Level3";
				break
			default:
				this.nameLevel = "Menu";
				break;
		}
	}


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

    putConsole(scene, x, y,tam,tipo, temp,  consolas, xModf, yModf)
    {
    	let consola = new Consola(scene, x, y, tam, tipo, temp, xModf, yModf);
    	consola.createConsolaAnimations();
    	consolas.add(consola);
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
    consoleUpdate(scene, consoles, mapa)
    {
    	consoles.getChildren().forEach(function (item) {
            item.update(mapa);
        }, this);
    }






    //Camara
    addCamera(scene, player, groundLayer) {
       // scene.cameras.main.setBounds(0, 0, 50,50);
        scene.cameras.main.startFollow(player, true, 0.9,0.9);
        scene.cameras.main.setZoom(3);

    }




    //Player
    interaction(scene, x,y, player)
    {
    	scene.checkInteraction(x,y,player);

    }
    playerDie(player)
    {
    	this.game.mapSelector();
    	if(player.isDeath)
    		this.scene.start(this.game.nameLevel);
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


    goalReach(goal, player)
    {

    	if(Math.abs(player.x - goal.x) < 14 && Math.abs(player.y - goal.y) < 30)
    		this.nextLevel();
    }
    nextLevel()
    {
    	this.scene.stop(this.nameLevel);
    	this.actLevel += 1;
    	this.mapSelector();
    	this.scene.start(this.nameLevel);
    }

}