export default class ConsolaPuente extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tam, tipo, temporizador, xPuente, yPuente) {
        super(scene, x, y, "ConsolaPuente");

       // this.name = "Interaction";


        this.onOff = false;
        this.tamPuente = tam;
        this.timeToReactive = 10;
        this.tipo = tipo;
        this.temporizador = temporizador;
        this.tempAct = temporizador;
        this.posX = xPuente;
        this.posY = yPuente;
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

    update(mapa,t, dt) {
        super.update(t, dt);
        if(this.onOff)
        {  
            if(this.temporizador != 0 && this.onOff) //Comprobar caso para temporizador
            {
                if(this.tempAct != 0)
                {
                    this.anims.play('consolaOn', true);
                    this.tempAct -= 1;
                }
                else
                {
                    this.timeToReactive = 0;
                    this.interaction(mapa);
                    this.timeToReactive = 10;
                    this.tempAct = this.temporizador;
                }
            }
            else
                this.anims.play('consolaOn', true);
        }
        else
        {
            this.anims.play('consolaOff', true);
        }
    }

    interaction(mapa)
    {
            let i;
            if(this.tipo == "puente")
            {
                if(this.timeToReactive == 0)
                {
                    this.onOff = !this.onOff;
                    if(!this.onOff)
                    {
                        for(i= 0; i < 16*this.tamPuente; i += 16)
                        {
                            mapa.removeTileAtWorldXY(Math.round(this.posX + i), Math.round(this.posY));
                        }
                    }
                    else
                    {
                        for(i= 0; i < 16*this.tamPuente; i += 16)
                        {
                            const tile = mapa.putTileAtWorldXY(75, Math.round(this.posX + i), Math.round(this.posY));
                            tile.setCollision(true);
                        }

                    }       
                    this.timeToReactive = 10;
                }
                else
                {
                    this.timeToReactive -= 1;
                }
            }
            else if(this.tipo == "puerta")
            {
                if(this.timeToReactive == 0)
                {
                    this.onOff = !this.onOff;
                    if(!this.onOff)
                    {
                        for(i= 0; i < 8*this.tamPuente; i += 8)
                        {
                            mapa.removeTileAtWorldXY(Math.round(this.posX) , Math.round(this.posY + i));
                        }

                    }
                    else
                    {
                        for(i= 0; i < 8*this.tamPuente; i += 8)
                        {
                            const tile = mapa.putTileAtWorldXY(75, Math.round(this.posX) , Math.round(this.posY + i));
                            tile.setCollision(true);
                        }

                    }
                    this.timeToReactive = 10;
                }
                else
                {
                    this.timeToReactive -= 1;
                }
            }
    }
}
