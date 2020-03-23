export default class Game extends Phaser.Scene {

	constructor(configGame) {
	   	super({ key: 'main' });

	}
	preload() {  
		//this.load.image('backGround', 'assets/backGround.png');
		this.load.spritesheet('run', '../assets/sprites/runAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
		//this.load.image('ground', 'assets/platform.png');
		/*this.load.image("tiles", "assets/Assets.png");
  		this.load.tilemapTiledJSON("map", "Maps/PruebaJson.json");*/
  		this.load.image("tiles", "../Maps/Assets.png");
  		this.load.tilemapTiledJSON("map", "../Maps/PJson.json");
  		/*this.load.image("tiles", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/tuxemon-town.json");*/
	}
	create() {
		/*
		const backGround = map.createStaticLayer("Capa de patrones 2", tileset , 0 , 0);
		 */
		const map = this.make.tilemap({ key: "map" });

		const tileset = map.addTilesetImage("Assets2", "tiles");


		const backGround = map.createStaticLayer("Capa de patrones 2", tileset , 0 , 0);
		const worldLayer = map.createStaticLayer("Capa de patrones 1", tileset , 0 , 0);
		


		worldLayer.setCollisionByProperty({ collides: true });






		/*const debugGraphics = this.add.graphics().setAlpha(0.75);
		worldLayer.renderDebug(debugGraphics, {
		  tileColor: null, // Color of non-colliding tiles
		  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});*/
		 //const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  //const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
 /* const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);*/
	/*this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 400, 'ground');
    this.platforms.create(800, 220, 'ground');


*/
    this.player = this.physics.add.sprite(200, 450, 'run');

    //this.physics.add.collider(this.player, this.worldLayer);
    this.physics.add.collider(this.player, worldLayer);


	this.player.setBounce(0.2);
	this.player.setCollideWorldBounds(true);
	
	this.player.body.setGravityY(50);
	this.anims.create({
	    key: 'left',
	    frames: this.anims.generateFrameNumbers('run', { start: 6, end: 10 }),
	    frameRate: 10,
	    repeat: -1
	});

	this.anims.create({
	    key: 'turn',
	    frames: [ { key: 'run', frame: 5 } ],
	    frameRate: 1
	});

	this.anims.create({
	    key: 'right',
	    frames: this.anims.generateFrameNumbers('run', { start: 0, end: 4 }),
	    frameRate: 10,
	    repeat: -1
	});


	this.cursors = this.input.keyboard.createCursorKeys();
}

update(time, delta) {   
	if (this.cursors.left.isDown)
	{
	    this.player.setVelocityX(-160);

	    this.player.anims.play('left', true);
	}
	else if (this.cursors.right.isDown)
	{
	    this.player.setVelocityX(160);

	    this.player.anims.play('right', true);
	}
	else
	{
	    this.player.setVelocityX(0);

	   this.player.anims.play('turn');
	}

	if (this.cursors.up.isDown && this.player.body.touching.down)
	{
	    this.player.setVelocityY(-330);
	}
}
}