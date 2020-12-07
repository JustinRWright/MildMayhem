import Phaser from 'phaser';
export default class HealthBar extends Phaser.GameObjects.Sprite
 {
    //This is from the Phaser3 healthbar example,
    //https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
    // with a few tweaks it seems to work great for this game
    constructor (config)
    {
        super(config.scene,config.x,config.y);
        config.scene.add.existing(this);
        var scene = config.scene;
        var x = config.x;
        var y = config.y;
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.canTakeDamage = true;
        this.x = x;
        this.y = y;
        this.value = 100;
        //What is this.p?
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        let concurrentDamageCheck = this.scene.time.delayedCall(200, this.setTakeDamage, [], this);
        if (this.canTakeDamage){
             this.value -= amount*10;
             this.canTakeDamage = false;
        }
       
        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    setTakeDamage()
    {
        this.canTakeDamage = true
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 800, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 792, 12);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d*10, 12);
    }

}