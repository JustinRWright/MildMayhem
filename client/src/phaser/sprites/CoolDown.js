import Phaser from 'phaser';
export default class CoolDown extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,coolDownMS)
        {
            super(scene,x,y,texture);
            
            //Adds sprite to screen
            scene.add.existing(this);
            this.setScale(.5);
            this.active = false;
            //Duration of cooldown
            this.coolDownMS = coolDownMS;
            this.x = x;
            this.y = y;
            this.scene = scene;
            
            
        }
        startCoolDown(){
            this.active = true;
            //Change opacity
            this.setAlpha(.5);
            console.log('scene is: ' + this.scene);
            if(this.scene){
                let timedEvent = this.scene.time.delayedCall(this.coolDownMS, this.onEvent, [], this);
            }
            //let timedEvent = this.scene.time.delayedCall(this.coolDownMS, this.onEvent, [], this);
        }
        isActive()
        {
            return this.active;
        }
        onEvent(){
            this.setAlpha(1);
            this.active = false;
        }
    }