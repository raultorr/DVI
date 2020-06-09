export default class Item extends Phaser.GameObjects.Sprite {
    //CLASE PARA LOS ITEMS QUE SE PUEDEN RECOGER DEL SUELO
    constructor(scene, x, y, id) {
        super(scene, x, y, "item");

            this.scene.add.existing(this);

            this.scene.physics.add.existing(this); //enable body


            this.body.setSize(16, 16);
            this.body.setOffset(0, 0);

            this.body.allowGravity = false;

            this.id = id;

            this.name = "item";

            this.scene.anims.create({
                key: 'bootsItemAnim',
                frames: [ { key: 'bootsItem', frame: 0 } ],
                frameRate: 1
            });
            this.scene.anims.create({
                key: 'gloveItemAnim',
                frames: [ { key: 'glovesItem', frame: 0 } ],
                frameRate: 1
            });
            this.scene.anims.create({
                key: 'weaponItemAnim',
                frames: [ { key: 'weaponItem', frame: 0 } ],
                frameRate: 1
            });

            if(this.id == 1){
                this.anims.play("bootsItemAnim", true);
            }else if(this.id == 2){
                this.anims.play("gloveItemAnim", true);
            }else if(this.id == 3){
                this.anims.play("weaponItemAnim", true);
            }

    }


    update(t, dt) {
        super.update(t, dt);
    }



}
