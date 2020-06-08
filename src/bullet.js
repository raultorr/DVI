export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, angle) {
        super(scene, x, y, "projectile");

/*
        this.minX = 70;
        this.maxX = 3300;
*/
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body

        this.scene.physics.velocityFromRotation(angle, 400, this.body.velocity);

        this.body.allowGravity = false;
        scene.projectiles.add(this);
        this.body.syncBounds = true;

        this.name = "bullet";

        this.mapBoundaryLeft = -70;
        this.mapBoundaryRight = 3300;

        this.shootEffect = this.scene.sound.add('shootSoundEffect',{loop: false, volume:0.2});
        this.shootEffect.play();
    }

    createProjectileAnimations() { 
        this.scene.anims.create({
            key: 'projectileFire',
            frames: 1,
            frameRate: 10,
            repeat: -1
        });
    }

    update(t, dt) {
        super.update(t, dt);
        if (this.x < this.mapBoundaryLeft || this.x > this.mapBoundaryRight) //se va del mapa
            this.destroy();
    }
}
