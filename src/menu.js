export default class Game extends Phaser.Scene {

  constructor(configGame) {
    super({ key: 'menu' });

  }
  preload() {
    //this.load.image("backGround", "assets/backGround.png");
    this.load.image("play", "assets/menu/play_button.png");
    this.load.image("cursor", "assets/menu/cursor.png");
    this.load.image("bg", "assets/menu/tyrannybg.png");

    this.load.audio('menuMusic', 'assets/audio/flags.mp3');
  }
  create() {
    
    this.game.sound.stopAll();
    this.menumusic = this.sound.add('menuMusic', { loop: true, volume: 0.05 });
    this.menumusic.play();

    this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg').setScale(1.67);

    let playButton = this.add.sprite(630, 300, 'play');


    let hoverSprite = Phaser.GameObjects.Sprite = this.add.sprite(100, 100, 'cursor');
    hoverSprite.setScale(2);
    hoverSprite.setVisible(false);



    playButton.setInteractive();

    playButton.on("pointerover", () => {
      hoverSprite.setVisible(true);
      hoverSprite.x = playButton.x - playButton.width;
      hoverSprite.y = playButton.y;
    })

    playButton.on("pointerout", () => {
      hoverSprite.setVisible(false);
    })
    playButton.on("pointerdown", () => {
      this.scene.start('main');
    })

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  //update(time, delta) {   

}