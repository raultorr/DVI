import Player from './player.js';
import Item from './item.js';
export default class Level2 extends Phaser.Scene {
    constructor(scene) {
        super({ key: 'Level2' });
    }

    preload() { }
    create() {

        this.game = this.scene.get('main');
        this.game.sound.stopAll();
        this.level1music = this.sound.add('level1music', { loop: true, volume: 0.05 });
        this.level1music.play();


        //Mapa
        this.backgroundColor = "#4488AA";

        const map = this.make.tilemap({ key: "map2" });
        const tileset = map.addTilesetImage("industrial.v1", "tilesMap", 16, 8, 0, 0);
        const tileset2 = map.addTilesetImage("Goal", "tilesGoal", 16, 8, 0, 0);
        const scifi = map.addTilesetImage("scifi", "bgImage2", 16, 8, 0, 0);
        const worldLayerEnemy = map.createStaticLayer("enemyCollisionLayer", tileset, 0, 0);
        const blackLayout = map.createStaticLayer("Black", [scifi, tileset2], 0, 0);
        const backGround = map.createStaticLayer("BackGround", tileset, 0, 0);
        const GoalLayer = map.createStaticLayer("GoalLayer", tileset2, 0, 0);
        this.worldLayer = map.createDynamicLayer("WorldLayer", tileset, 0, 0);


        this.worldLayer.setCollisionByProperty({ collides: true });
        worldLayerEnemy.setCollisionByProperty({ collides: true });




        //Capa de objetos mapa
        this.spawnPoint = map.findObject("Spawners", obj => obj.name === "PlayerSpawn");
        this.spawnPointR2 = map.findObject("Spawners", obj => obj.name === "Robot2");
        this.spawnPointR3 = map.findObject("Spawners", obj => obj.name === "Robot3");
        this.spawnPointR4 = map.findObject("Spawners", obj => obj.name === "Robot4");
        this.spawnPointR5 = map.findObject("Spawners", obj => obj.name === "Robot5");
        this.spawnPointR6 = map.findObject("Spawners", obj => obj.name === "Robot6");

        this.chaser1 = map.findObject("Spawners", obj => obj.name === "chaser1");
        this.chaser2 = map.findObject("Spawners", obj => obj.name === "chaser2");
        this.chaser3 = map.findObject("Spawners", obj => obj.name === "chaser3");
        //this.chaser2 = map.findObject("Spawners", obj => obj.name === "chaser2");

        this.spawnPointL1 = map.findObject("Spawners", obj => obj.name === "laser1");
        this.spawnPointL2 = map.findObject("Spawners", obj => obj.name === "laser2");
        this.spawnPointL3 = map.findObject("Spawners", obj => obj.name === "laser3");
        this.spawnPointL4 = map.findObject("Spawners", obj => obj.name === "laser4");
        this.end = map.findObject("Spawners", obj => obj.name === "End");





        //Jugador
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y, this.worldLayer, false, false, true);
        this.physics.add.collider(this.player, this.worldLayer);


        //Camara

        //this.game.addCamera(this, this.player,  this.worldLayer);
        this.cameras.main.setBackgroundColor('#1D212D');

        //Pinchos
        this.spikeGroup = this.physics.add.staticGroup();
        this.game.putSpikes(this.spikeGroup, this.worldLayer);

        //Enemigos

        this.enemy = this.physics.add.group();

        //this.game.spawnRobot(this, this.spawnPointR1.x, this.spawnPointR1.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR2.x, this.spawnPointR2.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR3.x, this.spawnPointR3.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR4.x, this.spawnPointR4.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR5.x, this.spawnPointR5.y, this.enemy);
        this.game.spawnRobot(this, this.spawnPointR6.x, this.spawnPointR6.y, this.enemy);

        this.physics.add.collider(this.enemy, worldLayerEnemy);
        //this.physics.add.collider(this.enemy, worldLayer);

        //Chasers
        this.chasers = this.physics.add.group();
        this.game.spawnChaser(this, this.chaser1.x, this.chaser1.y, this.chasers);
        this.game.spawnChaser(this, this.chaser2.x, this.chaser2.y, this.chasers);
        this.game.spawnChaser(this, this.chaser3.x, this.chaser3.y, this.chasers);
        this.physics.add.collider(this.chasers, worldLayerEnemy);


        //proyectiles
        this.projectiles = this.add.group();

        //items
        this.item = new Item(this, 888, 690, 1); //el ultimo parametro es para indicar el tipo del item


        //Lasers
        this.lasers = this.add.group();

        this.game.putLaser(this, this.spawnPointL1.x, this.spawnPointL1.y, this.lasers, true, 200, 200);
        this.game.putLaser(this, this.spawnPointL2.x, this.spawnPointL2.y, this.lasers, false, 200, 200);
        this.game.putLaser(this, this.spawnPointL3.x, this.spawnPointL3.y, this.lasers, false, 200, 200);
        this.game.putLaser(this, this.spawnPointL4.x, this.spawnPointL4.y, this.lasers, true, 100, 100);



        //Overlaps
        this.physics.add.overlap(this.player, this.lasers, this.game.playerDie, this.game.hitPlayer, this);
        this.physics.add.overlap(this.player, this.projectiles, this.game.playerDie, this.game.hitPlayer, this);
        this.physics.add.overlap(this.player, this.spikeGroup, this.game.playerDie, this.game.hitPlayer, this);
        this.physics.add.overlap(this.player, this.chasers, this.game.playerDie, this.game.hitPlayer, this);
        this.physics.add.overlap(this.player, this.item, this.game.playerPickItem, this.game.hitPlayer, this);

        //teclas

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {

        this.player.update(this.game);
        this.game.enemyUpdate(this, this.enemy, this.player);
        this.game.enemyChasersUpdate(this, this.chasers, this.player);
        this.player.bullets.getChildren().forEach(function (item) {
            this.game.enemyUpdate(this, this.enemy, item);
        }, this);

        this.game.laserUpdate(this, this.lasers, this.player);
        this.game.goalReach(this.end, this.player);

    }


}