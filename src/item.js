export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "item");

            this.scene.add.existing(this);

            this.scene.physics.add.existing(this); //enable body


            this.body.setSize(16, 16);
            this.body.setOffset(0, 0);

            this.body.allowGravity = false;

            this.id = 1;

            this.name = "item";

            this.scene.anims.create({
                key: 'bootsItemAnim',
                frames: [ { key: 'bootsItem', frame: 0 } ],
                frameRate: 1
            });

    }


    update(t, dt) {
        super.update(t, dt);
        this.anims.play("bootsItemAnim", true);
    }



}
