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
       this.console = map.findObject("Spawners", obj => obj.name === "console");


        //Jugador
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y);
        this.physics.add.collider(this.player, this.worldLayer);


        //Camara
        
        this.game.addCamera(this, this.player,  this.worldLayer);


        //Enemigos

        this.enemy = this.physics.add.group();
       // this.physics.add.collider(this.enemy, worldLayerEnemy);
        //this.physics.add.collider(this.enemy, worldLayer);
        


        //proyectiles
        this.projectiles = this.add.group();

       


        //Lasers
        this.lasers = this.add.group();


        //Consolas
        this.consoles = this.add.group();
        this.game.putConsole(this, this.console.x, this.console.y,13,  this.consoles);
        this.game.putConsole(this, 150,400,13,  this.consoles);

        //Overlaps
       // this.physics.add.overlap( this.player,this.lasers,this.game.playerDie,this.game.hitPlayer, this);
       // this.physics.add.overlap( this.player,this.projectiles,this.game.playerDie,this.game.hitPlayer, this);
      //  this.physics.add.overlap( this.player,this.spikes,this.game.playerDie,this.game.hitPlayer, this);
      this.physics.add.overlap( this.player,this.interaction,this.game.playerDie,this.game.hitPlayer, this);
        

        //teclas

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {
        this.player.update(this.game);

        this.game.consoleUpdate(this, this.consoles);
       /* const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

          // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
          // then tile -> world, we end up with the position of the tile under the pointer
        const pointerTileXY = this.worldLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = this.worldLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
        this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

          // Draw or erase tiles (only within the groundLayer)
        if (this.input.manager.activePointer.isDown) {

            
        }
        
*/      /*
        if ( Math.abs(this.player.x - this.console.x) < 40 )
        {
            let i;
            for(i= 0; i < 16*6  ; i += 16)
            {
                const tile = this.worldLayer.putTileAtWorldXY(75, this.puente.x + i, this.puente.y);
                tile.setCollision(true);
            }
        }*/
    }  
    checkInteraction(x,y,player)
    {
        let i;
        let panel;

        this.consoles.getChildren().forEach(function (item) {
            if ( Math.abs(player.x - item.x) < 40 && Math.abs(player.y - item.y) < 40)
            {
                panel = item;
            }
        }, this);
        if(panel != undefined)
        {
            if(panel.timeToReactive == 0)
            {
                if(panel.onOff)
                {
                    for(i= 32; i < 16*panel.tamPuente +32  ; i += 16)
                    {
                        this.worldLayer.removeTileAtWorldXY(panel.x + i, panel.y+10);
                    }

                }
                else
                {
                    for(i= 32; i < 16*panel.tamPuente +32  ; i += 16)
                    {
                        const tile = this.worldLayer.putTileAtWorldXY(75, panel.x + i, panel.y +10);
                        tile.setCollision(true);
                    }

                }
                panel.onOff = !panel.onOff;
                panel.timeToReactive = 10;
            }
            else
            {
                panel.timeToReactive -= 1;
            }
        }
    }
}