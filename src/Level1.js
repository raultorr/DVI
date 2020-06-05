import Player from './player.js';

export default class Level1 extends Phaser.Scene {
    constructor(scene) {
        super({ key: 'Level1' });
    }

    preload() {}
    create() {

        this.game = this.scene.get('main');
        this.game.sound.stopAll();
        this.level1music = this.sound.add('level1music',{loop: true, volume:0.1});
        this.level1music.play();
        //Mapa
        const map = this.make.tilemap({ key: "map1" });
        const tileset = map.addTilesetImage("industrial.v1", "tilesMap");
        const worldLayerEnemy = map.createStaticLayer("enemyCollisionLayer", tileset , 0 , 0);
        const blackLayout = map.createStaticLayer("Black", tileset, 0, 0);
        const backGround = map.createStaticLayer("BackGround", tileset , 0 , 0);
        const worldLayer = map.createStaticLayer("WorldLayer", tileset , 0 , 0);
        
        
        worldLayer.setCollisionByProperty({ collides: true });
        worldLayerEnemy.setCollisionByProperty({ collides: true });




        //Capa de objetos mapa
        this.spawnPoint = map.findObject("Spawners", obj => obj.name === "PlayerSpawn");
        this.spawnPointR1 = map.findObject("Spawners", obj => obj.name === "Robot1");
        this.spawnPointR2 = map.findObject("Spawners", obj => obj.name === "Robot2");
        this.spawnPointR3 = map.findObject("Spawners", obj => obj.name === "Robot3");
        this.spawnPointR4 = map.findObject("Spawners", obj => obj.name === "Robot4");
        this.spawnPointL1 = map.findObject("Spawners", obj => obj.name === "laser1");
        this.spawnPointL2 = map.findObject("Spawners", obj => obj.name === "laser2");
        this.spawnPointL3 = map.findObject("Spawners", obj => obj.name === "laser3");
        this.spawnPointL4 = map.findObject("Spawners", obj => obj.name === "laser4");
        this.spawnPointL5 = map.findObject("Spawners", obj => obj.name === "laser5");
        this.spawnPointL6 = map.findObject("Spawners", obj => obj.name === "laser6");
        this.end = map.findObject("Spawners", obj => obj.name === "End");


        


        //Jugador
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.physics.add.collider(this.player, worldLayer);


        //Camara
        
        this.game.addCamera(this, this.player,  worldLayer);


        //Enemigos

        this.enemy = this.physics.add.group();

        this.game.spawnRobot(this, this.spawnPointR1.x, this.spawnPointR1.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR2.x, this.spawnPointR2.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR3.x, this.spawnPointR3.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR4.x, this.spawnPointR4.y, this.enemy);

        this.physics.add.collider(this.enemy, worldLayerEnemy);
        //this.physics.add.collider(this.enemy, worldLayer);
        


        //proyectiles
        this.projectiles = this.add.group();

       


        //Lasers
        this.lasers = this.add.group();

        this.game.putLaser(this, this.spawnPointL1.x, this.spawnPointL1.y, this.lasers, true, 200, 200);
        this.game.putLaser(this, this.spawnPointL2.x, this.spawnPointL2.y, this.lasers, false, 200, 200);
        this.game.putLaser(this, this.spawnPointL3.x, this.spawnPointL3.y, this.lasers, false, 200, 200);
        this.game.putLaser(this, this.spawnPointL4.x, this.spawnPointL4.y, this.lasers, true, 100, 100);
        this.game.putLaser(this, this.spawnPointL5.x, this.spawnPointL5.y, this.lasers, false, 100, 100);
        this.game.putLaser(this, this.spawnPointL6.x, this.spawnPointL6.y, this.lasers, true, 100, 100);



        //Overlaps
        this.physics.add.overlap( this.player,this.lasers,this.game.playerDie,this.game.hitPlayer, this);
        this.physics.add.overlap( this.player,this.projectiles,this.game.playerDie,this.game.hitPlayer, this);
        this.physics.add.overlap( this.player,this.spikes,this.game.playerDie,this.game.hitPlayer, this);
        

        //teclas

        this.cursors = this.input.keyboard.createCursorKeys();


        
    }

    update(time, delta) {

        this.player.update();
        this.game.enemyUpdate(this, this.enemy, this.player);
        this.game.laserUpdate(this,this.lasers, this.player);
        this.game.goalReach(this.end, this.player);
    }


}