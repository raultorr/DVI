export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, angle, layer) {
        super(scene, x, y, "projectileGreen");

        /*
                this.minX = 70;
                this.maxX = 3300;
        */
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body

        this.scene.physics.velocityFromRotation(angle, 300, this.body.velocity);

        //this.angle = angle;

        this.body.allowGravity = false;
        scene.projectiles.add(this);
        this.body.syncBounds = true;

        this.name = "bullet";

        this.mapBoundaryLeft = -70;
        this.mapBoundaryRight = 3300;

        this.shootEffect = this.scene.sound.add('shootSoundEffect', { loop: false, volume: 0.2 });
        this.shootEffect.play();

        this.scene.physics.add.collider(this, layer);
        this.temporizador = 500;
        this.impact = false;
    }

    createBulletAnimations() {
        this.scene.anims.create({
            key: 'projectileGreenFire',
            frames: 1,
            frameRate: 10,
            repeat: -1
        });
    }

    update(t, dt) {
        super.update(t, dt);

        //this.body.angle = -180;

        if (this.x < this.mapBoundaryLeft || this.x > this.mapBoundaryRight) //se va del mapa
            this.destroy();





        if (this.body.onFloor() || this.body.onCeiling()) {
            this.body.setVelocityX(0);
            this.impact = true;
        }

        if (this.body.onWall()) {
            this.body.setVelocityY(0);
            this.impact = true;
        }

        if (this.impact)
            this.temporizador--;

        if (this.temporizador == 0)
            this.destroy();

    }
}
