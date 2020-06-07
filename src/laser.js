export default class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy,onOff, timeOn, timeOff) {
        super(scene, x, y, "laser");


        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body


        this.body.allowGravity = false;
        scene.lasers.add(this);
        this.name = "laser";
        this.timeOn = timeOn;
        this.timeOff = timeOff;
        this.onOff = onOff;
        this.actTime = 0;
        this.body.setSize(7,35);
        this.body.setOffset(5, 17);
        this.scaleY = 1;
        this.body.gameObject.width = 10;
    }

    createLaserAnimations() { 
        this.scene.anims.create({
            key: 'laserOn',
            frames: [ { key: 'laserOff', frame: 1 } ],
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'laserPoweringUp',
            frames:this.scene.anims.generateFrameNumbers('laserOn', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'laserPoweringDown',
            frames: this.scene.anims.generateFrameNumbers('laserOff', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
          this.scene.anims.create({
            key: 'laserOff',
            frames: [ { key: 'laserOff', frame: 6 } ],
            frameRate: 10,
            repeat: -1
        });

    }

    update(t, dt) {
        
        super.update(t, dt);
        if(!this.onOff)
        {
            if(this.actTime == this.timeOff)
            {
                this.onOff = true;
                this.actTime = 0;

            }
            this.anims.play('laserOff', true);

            this.actTime += 1;
        }
        else
        {
            if(this.actTime == this.timeOn)
            {
                this.onOff = false;
                this.actTime = 0;
                this.anims.play('laserPoweringDown', true);
            }
            //else if(this.actTime == 0)
                //this.anims.play('laserPoweringUp', true);
            this.anims.play('laserOn', true);
            this.actTime += 1;
        }
    }
}
