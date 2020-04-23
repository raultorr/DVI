import Player from './player.js';
import Load   from './load.js';
export default class Game extends Phaser.Scene {

	constructor(configGame) {
	   	super({ key: 'main' });

	}
	preload() {  
		this.load.spritesheet('laserOn', 'assets/sprites/laser/laser-turn-on.png',{ frameWidth: 5, frameHeight: 50 });
		this.load.spritesheet('laserOff', 'assets/sprites/laser/laser-turn-off.png',{ frameWidth: 5, frameHeight: 50 });
  		this.load.image("tiles", "Maps/Assets.png");
  		this.load.tilemapTiledJSON("map", "Maps/PJson.json");
  		this.load.spritesheet('run', 'assets/sprites/RunAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('jump', 'assets/sprites/RunAnimation/jump.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('crouch', 'assets/sprites/RunAnimation/crouch.png',{ frameWidth: 16, frameHeight: 25 });

	}
	create() {


		//let load = new Load(this, 0 ,0)

		//load.animsPlayer();


		/*
		const backGround = map.createStaticLayer("Capa de patrones 2", tileset , 0 , 0);
		 */
		const map = this.make.tilemap({ key: "map" });

		const tileset = map.addTilesetImage("Assets2", "tiles");


		const backGround = map.createStaticLayer("Capa de patrones 2", tileset , 0 , 0).setPipeline('Light2D');
		const worldLayer = map.createStaticLayer("Capa de patrones 1", tileset , 0 , 0);
		


		worldLayer.setCollisionByProperty({ collides: true });



	    this.player = new Player(this, 200, 450);
	    //this.physics.add.collider(this.player, this.worldLayer);
	    this.physics.add.collider(this.player, worldLayer);
		//var lights = this.lights.addLight(500,200,200);
		//this.lights.enable().setAmbientColor(0x555555);

		//this.player.setCollideWorldBounds(true);
		
		//this.player.body.setGravityY(50);



		//laser = this.physics.add.sprite(500,450, 'laserOn');

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update(time, delta) {

		this.player.update();
	}
}
