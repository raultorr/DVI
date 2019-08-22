import Main from './main.js'

export default class Game extends Phaser.Game {
  constructor() {
    var config = {
      type: Phaser.AUTO,
      width: 1400,
      height: 800,
      pixelArt: true,
      input: {
        gamepad: true
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [Main],
      physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: false } }
    };
    super(config);
  }
}
