import Phaser from 'phaser';
export default class Target extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture)
        {
            super(scene,x,y,texture);
            
            //Adds sprite to screen
            this.scene = scene;
            this.setScale(.6);
            
            //scene.add.existing(this.coolDownBar);
            scene.add.existing(this);
            
            this.setScale(.5);
            
            //Duration of cooldown
           
            this.x = x;
            this.y = y;
           
            
            
        }
        
    
        endExplosion(){
            this.setAlpha(1);
            this.active = false;
        }
    }