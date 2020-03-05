export default class Menu extends Phaser.Scene {

	constructor() {
   		super({ key: 'main' });
  	}
  	preload() { 
  		game.load.image('backGround', 'assets/backGround.jpg');
  	}

  	create() {
  		this.add.image(400,300, 'backGround');
  	}

  	update(time, delta) {    
  	}

}