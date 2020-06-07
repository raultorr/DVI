import Player from './player.js';

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
        //const blackLayout = map.createDynamicLayer("Black", tileset, 0, 0);
        const backGround = map.createDynamicLayer("BackGround", tileset , 0 , 0);
        this.worldLayer = map.createDynamicLayer("WorldLayer", tileset , 0 , 0);
        
        
        this.worldLayer.setCollisionByProperty({ collides: true });
       // worldLayerEnemy.setCollisionByProperty({ collides: true });

       this.spawnPoint = map.findObject("Spawners", obj => obj.name === "PlayerSpawn");
       this.puente = map.findObject("Spawners", obj => obj.name === "puente");
       this.consoleB1 = map.findObject("Spawners", obj => obj.name === "consoleB1");
       this.consoleD1 = map.findObject("Spawners", obj => obj.name === "consoleD1");
       this.door1 = map.findObject("Spawners", obj => obj.name === "puerta1");
       this.bridge1 = map.findObject("Spawners", obj => obj.name === "puente1");

        //Jugador
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.physics.add.collider(this.player, this.worldLayer);


        //Camara
        
        this.game.addCamera(this, this.player,  this.worldLayer);

        


        //Enemigos

        this.enemy = this.physics.add.group();
        //this.physics.add.collider(this.enemy, worldLayerEnemy);
        //this.physics.add.collider(this.enemy, worldLayer);
        


        //proyectiles
        this.projectiles = this.add.group();

       


        //Lasers
        this.lasers = this.add.group();


        //Consolas
        this.consoles = this.add.group();

        //scene / PosConsolaX / PosConsolaY / tamaño/tipo/temporizador/consolas/posInix/posIniY
        this.game.putConsole(this, this.consoleB1.x, this.consoleB1.y,14, "puente", 0, this.consoles ,this.bridge1.x, this.bridge1.y );
        this.game.putConsole(this, this.consoleD1.x, this.consoleD1.y,8, "puerta", 100, this.consoles, this.door1.x, this.door1.y);

        //Overlaps
       // this.physics.add.overlap( this.player,this.lasers,this.game.playerDie,this.game.hitPlayer, this);
       // this.physics.add.overlap( this.player,this.projectiles,this.game.playerDie,this.game.hitPlayer, this);
      //  this.physics.add.overlap( this.player,this.spikes,this.game.playerDie,this.game.hitPlayer, this);
        

        //teclas

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {
        this.player.update(this.game);

        this.game.consoleUpdate(this, this.consoles, this.worldLayer);

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