import Player from './player.js';

export default class Level2 extends Phaser.Scene {
    constructor(scene) {
        super({ key: 'Level2' });
    }

    preload() {}
    create() {

        this.game = this.scene.get('main');
       


        //Mapa
        const map = this.make.tilemap({ key: "map2" });
        const tileset = map.addTilesetImage("industrial.v1", "tilesMap");
        const worldLayerEnemy = map.createStaticLayer("enemyCollisionLayer", tileset , 0 , 0);
        const blackLayout = map.createStaticLayer("Black", tileset, 0, 0);
        const backGround = map.createStaticLayer("BackGround", tileset , 0 , 0);
        const worldLayer = map.createStaticLayer("WorldLayer", tileset , 0 , 0);
        
        
        worldLayer.setCollisionByProperty({ collides: true });
        worldLayerEnemy.setCollisionByProperty({ collides: true });




        //Capa de objetos mapa
        this.spawnPoint = map.findObject("Spawners", obj => obj.name === "PlayerSpawn");


        


        //Jugador
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.physics.add.collider(this.player, worldLayer);


        //Camara
        
        this.game.addCamera(this, this.player,  worldLayer);


        //Enemigos
        //this.physics.add.collider(this.enemy, worldLayer);
        


        //proyectiles

       


        //teclas

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {

        this.player.update();
        //this.game.enemyUpdate(this, this.enemy, this.player);
        //this.game.laserUpdate(this,this.lasers, this.player);
    }


}