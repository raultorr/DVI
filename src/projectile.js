export default class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, "projectile");

/*
        this.minX = 70;
        this.maxX = 3300;
*/
        this.vel = 900;
        if(!enemy.facingR)
            this.vel = -this.vel;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body


        this.body.setVelocityX(this.vel);
        this.body.allowGravity = false;
        scene.projectiles.add(this);
        this.body.syncBounds = true;

        this.name = "projectile";

       this.mapBoundaryLeft = -70;
        this.mapBoundaryRight = 3300;


        this.shootEffect = this.scene.sound.add('shootSoundEffect',{loop: false});
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
