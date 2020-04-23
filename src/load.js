export default class Load extends Phaser.Scene {
    constructor(scene) {
        super({ key: 'load' });
    }

    animsPlayer()
    {
        this.spritesPlayer();
    }
    spritesPlayer()
    {
        this.load.spritesheet('run', 'assets/sprites/runAnimation/run.png',{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('jump', 'assets/sprites/runAnimation/jump.png',{ frameWidth: 16, frameHeight: 32 });
    }



}