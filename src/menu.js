export default class Game extends Phaser.Scene {

  constructor(configGame) {
      super({ key: 'menu' });

  }
  preload() {  
      //this.load.image("backGround", "assets/backGround.png");
      this.load.image("tv", "assets/Menu/menuTV.png");
      this.load.image("tvButton", "assets/Menu/buttonTV.png");
      this.load.image("play", "assets/Menu/play_button.png");
      this.load.image("options", "assets/Menu/options_button.png");
      this.load.image("cursor", "assets/Menu/cursor.png");
      this.load.image("bg", "assets/Menu/static.png");
  }
  create() {
  this.add.image(this.scale.width / 2, this.scale.height / 2 ,'bg').setScale(3);
    this.add.image(this.scale.width / 2, this.scale.height / 2 ,'tv');
   var button = this.add.sprite(1240, 800,'tvButton');

  let playButton = this.add.sprite(300, 200,'play');
  let optionsButton = this.add.sprite(300, 300,'options');


  let hoverSprite= Phaser.GameObjects.Sprite = this.add.sprite(100, 100, 'cursor');
    hoverSprite.setScale(2);
    hoverSprite.setVisible(false);





    playButton.setInteractive();

    playButton.on("pointerover", () => {
        hoverSprite.setVisible(true);
        //hoverSprite.play("walk");
        hoverSprite.x = playButton.x - playButton.width;
        hoverSprite.y = playButton.y;
        button.angle -= 6;

    })

    playButton.on("pointerout", () => {
        hoverSprite.setVisible(false);
         button.angle += 6;
    })
  playButton.on("pointerdown", () => {
       this.scene.start('main');
       //new Phaser.Game(config);
    })

   optionsButton.setInteractive();

    optionsButton.on("pointerover", () => {
        hoverSprite.setVisible(true);
        //hoverSprite.play("walk");
        hoverSprite.x = optionsButton.x - optionsButton.width;
        hoverSprite.y = optionsButton.y;
        button.angle -= 12;

    })

    optionsButton.on("pointerout", () => {
        hoverSprite.setVisible(false);
         button.angle += 12;
    })
   /* optionsButton.on("pointerup", () => {
        this.scene.start(CST.SCENES.PLAY);
    })*/

  this.cursors = this.input.keyboard.createCursorKeys();

  if (this.cursors.down.isDown)
  {
    button.angle -= 6;
  }
  }

  //update(time, delta) {   
 
}