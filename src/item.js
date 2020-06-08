export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, id) {
        super(scene, x, y, "item");

            this.scene.add.existing(this);

            this.scene.physics.add.existing(this); //enable body


            this.body.setSize(16, 16);
            this.body.setOffset(0, 0);

            this.body.allowGravity = false;

            this.id = id;

            this.name = "item";

            if(this.id == 1){
                this.scene.anims.create({
                    key: 'itemAnim',
                    frames: [ { key: 'bootsItem', frame: 0 } ],
                    frameRate: 1
                });
            }else if(this.id == 2){
                this.scene.anims.create({
                    key: 'itemAnim',
                    frames: [ { key: 'glovesItem', frame: 0 } ],
                    frameRate: 1
                });
            }else if(this.id == 3){
                this.scene.anims.create({
                    key: 'itemAnim',
                    frames: [ { key: 'weaponItem', frame: 0 } ],
                    frameRate: 1
                });
            }

            
            this.anims.play("itemAnim", true);

    }


    update(t, dt) {
        super.update(t, dt);
    }



}
