export default class ConsolaPuente extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tamPuente) {
        super(scene, x, y, "ConsolaPuente");

       // this.name = "Interaction";


        this.onOff = false;
        this.tamPuente = tamPuente;
        this.timeToReactive = 10;
    }

    createConsolaAnimations() { 
            this.scene.anims.create({
            key: 'consolaOn',
            frames: [ { key: 'consola', frame: 1 } ],
            frameRate: 1
        });


        this.scene.anims.create({
            key: 'consolaOff',
             frames: [ { key: 'consola', frame: 0 } ],
            frameRate: 1,
            repeat: -1
        });
    }

    update(t, dt) {
        super.update(t, dt);
        if(this.onOff)
        {
          this.anims.play('consolaOn', true);
        }
        else
        {
            this.anims.play('consolaOff', true);
        }
    }
}
