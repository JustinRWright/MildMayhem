import Phaser from 'phaser';
export default class CoolDownBar extends Phaser.GameObjects.Sprite
 {
    //This is from the Phaser3 healthbar example,
    //https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
    // with a few tweaks it seems to work great for this game
    constructor (config,{duration})
    {
        super(config.scene,config.x,config.y);
        config.scene.add.existing(this);
        this.scene = config.scene;
        this.duration = duration;
        var x = config.x;
        var y = config.y;
        this.bar = new Phaser.GameObjects.Graphics(this.scene);
        this.canTakeDamage = true;
        this.x = x;
        this.y = y;
        this.running = false;
        this.value = 72;
        
        //What is this.p?
        this.p = 100 / 100;

        this.draw();

        this.scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        let concurrentDamageCheck = this.scene.time.delayedCall(40, this.setTakeDamage, [], this);
        if (this.canTakeDamage){
             this.value -= amount;
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
    start()
    {
        console.log("start was called");
        this.running = true;
        this.p = 0;
        this.timer = this.scene.time.delayedCall(this.duration, null, [], this);
    }
    update()
    {
        //if it's running
        if (this.running){
            var progress = this.timer.getProgress();   // ms
            this.p = progress
            //console.log("elapsed is:" + elapsed);
            this.draw();
            if (this.p>=1){
                this.p = 1;
            }
        }
    }
    draw ()
    {
        this.bar.clear();

        //  BG
        //this.bar.fillStyle(0x000000);
        //this.bar.fillRect(this.x, this.y, 46, 72);

        //  Health

        //this.bar.fillStyle(0xffffff);
        //this.bar.fillRect(this.x , this.y ,46, 72);

       
        this.bar.fillStyle(0x0000ff);
        

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x , this.y + 72, 46, -d);
    }

}