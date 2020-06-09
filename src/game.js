import Player from './player.js';
import Enemy   from './enemy.js';
import EnemyChaser   from './enemyChaser.js';
import Projectile from './projectile.js';
import Bullet from './bullet.js';
import Laser from './laser.js';
import Consola from './consolaPuente.js';

export default class Game extends Phaser.Scene {

    constructor(configGame) {
        super({ key: 'main' });
        this.actLevel = 3;
        this.nameLevel;
        this.killcounter = 0;
    }
    preload() {  
        //trampas
        this.load.spritesheet('laserOn', 'assets/sprites/laser/laser-turn-on.png',{ frameWidth: 16, frameHeight:50 });
        this.load.spritesheet('laserOff', 'assets/sprites/laser/laser-turn-off.png',{ frameWidth: 16, frameHeight: 50 });
        this.load.image("spike", "assets/sprites/spikes/spikes.png");
        this.load.image("spikeR", "assets/sprites/spikes/spikesR.png");
        this.load.image("spikeL", "assets/sprites/spikes/spikesL.png");

        //Enemigos
        this.load.spritesheet('enemyMove', 'assets/sprites/enemy/Robot.png',{ frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('chaserMove', 'assets/sprites/enemy/Chaser.png',{ frameWidth: 25, frameHeight: 27 });
        this.load.spritesheet('projectile', 'assets/sprites/enemy/Projectile.png',{ frameWidth: 3, frameHeight: 1 });
        this.load.spritesheet('projectileGreen', 'assets/sprites/enemy/ProjectileGreen.png',{ frameWidth: 3, frameHeight: 1 });
        this.load.spritesheet('consola', 'assets/sprites/consola/consola.png',{ frameWidth: 33, frameHeight: 25 });




        //Jugador
        this.load.spritesheet('run', 'assets/sprites/playerAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('dead', 'assets/sprites/playerAnimation/dead.png',{ frameWidth: 32, frameHeight: 15 });
		this.load.spritesheet('runBoots', 'assets/sprites/playerAnimation/runBoots.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('runWeapon', 'assets/sprites/playerAnimation/runWeapon.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('runWallClimbing', 'assets/sprites/playerAnimation/runWallclimbing.png',{ frameWidth: 16, frameHeight: 32 });
        
        this.load.spritesheet('jump', 'assets/sprites/playerAnimation/jump.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('jumpBoots', 'assets/sprites/playerAnimation/jumpBoots.png',{ frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('jumpWeapon', 'assets/sprites/playerAnimation/jumpWeapon.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('jumpWallClimbing', 'assets/sprites/playerAnimation/jumpWallClimbing.png',{ frameWidth: 16, frameHeight: 32 });


        this.load.spritesheet('powerJump', 'assets/sprites/playerAnimation/powerJump.png',{ frameWidth: 25, frameHeight: 16 });


        this.load.spritesheet('crouch', 'assets/sprites/playerAnimation/crouch.png',{ frameWidth: 16, frameHeight: 25 });
		this.load.spritesheet('crouchBoots', 'assets/sprites/playerAnimation/crouchBoots.png',{ frameWidth: 16, frameHeight: 25 });
		this.load.spritesheet('crouchWeapon', 'assets/sprites/playerAnimation/crouchWeapon.png',{ frameWidth: 16, frameHeight: 25 });
        this.load.spritesheet('crouchWallClimbing', 'assets/sprites/playerAnimation/crouchWallClimbing.png',{ frameWidth: 16, frameHeight: 25 });


        this.load.spritesheet('wallClimbing', 'assets/sprites/playerAnimation/wallClimbing.png',{ frameWidth: 16, frameHeight: 32 })

        //Itemss
        this.load.spritesheet('bootsItem', 'assets/sprites/hud/boots16.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('glovesItem', 'assets/sprites/hud/gloves16.png',{ frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('bootsItem', 'assets/sprites/hud/boots16.png',{ frameWidth: 16, frameHeight: 16 });
		this.load.spritesheet('weaponItem', 'assets/sprites/hud/weapon16.png',{ frameWidth: 16, frameHeight: 16 });

        //HUD IMGS
        this.load.image('inventory', 'assets/sprites/hud/inventory-bg.png');
        this.load.image('inventory-active', 'assets/sprites/hud/inventory-active.png');
        this.load.image('boots', 'assets/sprites/hud/boots16.png');
		this.load.image('gloves', 'assets/sprites/hud/gloves16.png');
		this.load.image('weapon', 'assets/sprites/hud/weapon16.png');


        //maps
        this.load.image("tilesMap", "assets/TileSets/industrial.v1.png");
        this.load.image("bgImage2", "Maps/scifi.png");
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
        this.load.audio('deathSoundEffect', 'assets/audio/pain1.wav');
        this.load.audio('chaserSoundEffect', 'assets/audio/goblin.wav');
        this.load.audio('level1music', 'assets/audio/walking the devil.mp3');
        this.load.audio('powerJumpSoundEffect', 'assets/audio/PowerJump.ogg');

        

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
        enemies.add(robot);
    }
    spawnChaser(scene, x, y, chasers) {
        let chaser = new EnemyChaser(scene, x, y);
        chaser.createEnemyAnimations();
        chasers.add(chaser);
    }
    spawnProjectile(scene, x, y, enemy) {
        let projectile = new Projectile(scene, x, y, enemy);
        projectile.createProjectileAnimations();
        return projectile;
	}
	
	spawnBullet(scene, x, y, angle, layer) {
        let bullet = new Bullet(scene, x, y, angle, layer);
        bullet.createBulletAnimations();
        return bullet;
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

    putSpikes(spikeGroup,worldLayer )
    {
        worldLayer.forEachTile(tile => {
        if (tile.index === 173) {
            const spike = spikeGroup.create(tile.getCenterX() , tile.getCenterY()  , "spike");
            spike.name = "spikes";
        // The map has spikes rotated in Tiled (z key), so parse out that angle to the correct body
        // placement
            spike.rotation = tile.rotation;
            spike.body.setSize(18,4).setOffset(0, 4);
           worldLayer.removeTileAt(tile.x, tile.y);
          }
          else if (tile.index === 141) {
            const spike = spikeGroup.create(tile.getCenterX(), tile.getCenterY() , "spikeL");
            spike.name = "spikes";
        // The map has spikes rotated in Tiled (z key), so parse out that angle to the correct body
        // placement
            spike.rotation = tile.rotation;
            spike.body.setSize(4, 8).setOffset(0, 0);
           worldLayer.removeTileAt(tile.x, tile.y);
          } 
          else if (tile.index === 109) {
            const spike = spikeGroup.create(tile.getCenterX(), tile.getCenterY() , "spikeR");
            spike.name = "spikes";
        // The map has spikes rotated in Tiled (z key), so parse out that angle to the correct body
        // placement
            spike.rotation = tile.rotation;
            spike.body.setSize(4, 8).setOffset(12, 0);
           worldLayer.removeTileAt(tile.x, tile.y);
          }
        });
    }



    //Updates
    enemyUpdate(scene, enemies, player) {
        enemies.getChildren().forEach(function (item) {
            item.update(player, this);
        }, this);
    }
    enemyChasersUpdate(scene, chasers, player) {
        chasers.getChildren().forEach(function (item) {
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
    playerPickItem(player, item)
    {
        this.game.mapSelector();
        
        if(item.id == 1){
            player.picked1 = true;
        }else if(item.id == 2){
            player.picked2 = true;
        }else if(item.id == 3){
            player.picked3 = true;
        }

        item.destroy();
    }
    playerDie(player)
    {
        //this.game.mapSelector();

        //player.kill = true;
        
        if(player.isDeath)
            this.scene.start(this.game.nameLevel);
    }
    hitPlayer(player, object)
    {   
        switch(object.name)
        {
            case "laser":
                if(object.onOff)
                    player.kill = true;
                break;
            case "robot":
                player.kill = true;
                break;
            case "projectile":
                player.kill = true;
                break;
            case "chaser":
                if(object.isRunning)
                    player.kill = true;
                break;
            case "spikes":
                    player.kill = true;
                break;
            default:
                player.kill = false;
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
