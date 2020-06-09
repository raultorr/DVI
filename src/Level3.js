import Player from './player.js';
import Item from './item.js';
export default class Level3 extends Phaser.Scene {
    constructor(scene) {
        super({ key: 'Level3' });
    }

    preload() {}
    create() {

        this.game = this.scene.get('main');



        //Mapa
        const map = this.make.tilemap({ key: "map3" });
        const tileset = map.addTilesetImage("industrial.v1", "tilesMap");
        const tileset2 = map.addTilesetImage("Goal", "tilesGoal", 16,8,0,0);
        const scifi = map.addTilesetImage("scifi", "bgImage2", 16,8,0,0);

        const worldLayerEnemy = map.createStaticLayer("enemyCollisionLayer", tileset , 0 , 0);
        const blackLayout = map.createStaticLayer("Black", scifi, 0, 0);
        const backGround = map.createStaticLayer("BackGround", [tileset, tileset2] , 0 , 0);
        this.worldLayer = map.createDynamicLayer("WorldLayer", tileset , 0 , 0);
        
        //atributos
        this.worldLayer.setCollisionByProperty({ collides: true });
        worldLayerEnemy.setCollisionByProperty({ collides: true });



        //Capa de objetos
       this.spawnPoint = map.findObject("Spawners", obj => obj.name === "PlayerSpawn");
       this.puente1 = map.findObject("Spawners", obj => obj.name === "puente1");
       this.consoleB1 = map.findObject("Spawners", obj => obj.name === "cPuente1");
       this.consoleD1 = map.findObject("Spawners", obj => obj.name === "cPuerta1");
       this.door1 = map.findObject("Spawners", obj => obj.name === "puerta1");
       this.bridge1 = map.findObject("Spawners", obj => obj.name === "puente1");
       this.gloves = map.findObject("Spawners", obj => obj.name === "gloves");

       this.laser1 = map.findObject("Spawners", obj => obj.name === "laser1");
       this.laser2 = map.findObject("Spawners", obj => obj.name === "laser2");
       this.laser3 = map.findObject("Spawners", obj => obj.name === "laser3");

       this.chaser1 = map.findObject("Spawners", obj => obj.name === "chaser1");
       this.chaser2 = map.findObject("Spawners", obj => obj.name === "chaser2");

       this.robot1 = map.findObject("Spawners", obj => obj.name === "Robot1");
       this.robot2 = map.findObject("Spawners", obj => obj.name === "Robot2");
       this.robot3 = map.findObject("Spawners", obj => obj.name === "Robot3");

       this.end = map.findObject("Spawners", obj => obj.name === "goal");
        //Jugador
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y, this.worldLayer, true, false, true);
        this.physics.add.collider(this.player, this.worldLayer);


        //Camara
        
        this.game.addCamera(this, this.player,  this.worldLayer);


        //Enemigos


        this.enemy = this.physics.add.group();
        this.game.spawnRobot(this, this.robot1.x, this.robot1.y, this.enemy);
        this.game.spawnRobot(this, this.robot2.x, this.robot2.y, this.enemy);
        this.game.spawnRobot(this, this.robot3.x, this.robot3.y, this.enemy);
        this.physics.add.collider(this.enemy, worldLayerEnemy);
        //this.physics.add.collider(this.enemy, worldLayer);
        

        this.chasers = this.physics.add.group();
        this.game.spawnChaser(this, this.chaser1.x, this.chaser1.y, this.chasers);
        this.game.spawnChaser(this, this.chaser2.x, this.chaser2.y, this.chasers);
        this.physics.add.collider(this.chasers, worldLayerEnemy);

        //proyectiles
        this.projectiles = this.add.group();

       



        //Lasers
        this.lasers = this.add.group();
        this.game.putLaser(this, this.laser1.x, this.laser1.y, this.lasers, true, 200, 200);
        this.game.putLaser(this, this.laser2.x, this.laser2.y, this.lasers, true, 200, 200);
        this.game.putLaser(this, this.laser3.x, this.laser3.y, this.lasers, true, 200, 200);

        //spikes
        this.spikeGroup = this.physics.add.staticGroup();
        this.game.putSpikes(this.spikeGroup,this.worldLayer );

          //items
        this.item = new Item(this, this.gloves.x, this.gloves.y, 2); //el ultimo parametro es para indicar el tipo del item

        //Consolas
        this.consoles = this.add.group();

        //scene / PosConsolaX / PosConsolaY / tamaño/tipo/temporizador/consolas/posInix/posIniY
        this.game.putConsole(this, this.consoleB1.x, this.consoleB1.y,20, "puente", 400, this.consoles ,this.bridge1.x, this.bridge1.y );
        this.game.putConsole(this, this.consoleD1.x, this.consoleD1.y,4, "puerta", 0, this.consoles, this.door1.x, this.door1.y);

        //Overlaps
        this.physics.add.overlap( this.player,this.lasers,this.game.playerDie,this.game.hitPlayer, this);
        this.physics.add.overlap( this.player,this.projectiles,this.game.playerDie,this.game.hitPlayer, this);
        this.physics.add.overlap( this.player,this.chasers,this.game.playerDie,this.game.hitPlayer, this);
        this.physics.add.overlap( this.player,this.spikeGroup,this.game.playerDie,this.game.hitPlayer, this);
        this.physics.add.overlap( this.player,this.item,this.game.playerPickItem, this.game.hitPlayer, this);
        

        //teclas

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {
        this.player.update(this.game);
        this.game.enemyUpdate(this, this.enemy, this.player);
        this.game.laserUpdate(this,this.lasers, this.player);
        this.game.goalReach(this.end, this.player);
        this.game.enemyChasersUpdate(this, this.chasers, this.player);
        this.game.consoleUpdate(this, this.consoles, this.worldLayer);

        this.player.bullets.getChildren().forEach(function (item) {
            this.game.enemyUpdate(this, this.enemy, item);
        }, this);

    }  
    checkInteraction(x,y,player)
    {
        let panel;

        this.consoles.getChildren().forEach(function (item) {
            if ( Math.abs(player.x - item.x) < 40 && Math.abs(player.y - item.y) < 40)
            {
                panel = item;
            }
        }, this);



        if(panel != undefined)
        {
         panel.interaction(this.worldLayer);
        }
    }
}