import Phaser from 'phaser';
import CoolDownBar from "../sprites/CoolDownBar.js"
export default class CoolDown extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,coolDownMS)
        {
            super(scene,x,y,texture);
            
            //Adds sprite to screen
            this.scene = scene;
            this.coolDownBar = new CoolDownBar({scene: this.scene, x: x-23, y: y-34},{duration: coolDownMS});
            
            //scene.add.existing(this.coolDownBar);
            scene.add.existing(this);
            
            this.setScale(.5);
            this.active = false;
            //Duration of cooldown
            this.coolDownMS = coolDownMS;
            this.x = x;
            this.y = y;
           
            
            
        }
        startCoolDown(){
            this.active = true;
            this.coolDownBar.start();
            //Change opacity
            this.setAlpha(.5);
            console.log('scene is: ' + this.scene);
            if(this.scene){
                let timedEvent = this.scene.time.delayedCall(this.coolDownMS, this.onEvent, [], this);
            }
            //let timedEvent = this.scene.time.delayedCall(this.coolDownMS, this.onEvent, [], this);
        }
        update(){
            this.coolDownBar.update();
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