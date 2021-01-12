import Phaser from 'phaser';
export default class MagicBlast extends Phaser.Physics.Arcade.Sprite
    {

        //https://www.youtube.com/watch?v=jEaoeEdv7eU I used this tutorial to for extending a sprite in phaser3
        constructor (scene,x,y,texture,{owner, duration}={})
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);

            //Adds physics to sprite
            scene.physics.add.existing(this);
            //Make sprite .4 times the size
            this.setScale(.4);
            this.magicSpeed = 800;
            //Turns hitbox into circle
            this.setCircle(85);
            this.createAnimations(scene);
            this.anims.play('magicBlastSpin',true);
            //Set which player owns the magic blast
            this.owner = owner;
            this.x = x;
            this.y = y;
            console.log('duration is: ' + duration);
            if (typeof duration == 'undefined'){
              let magicBlastTimeOut = this.scene.time.delayedCall(1000, this.explodeTimer, [], this);
            }
            else {
              let magicBlastTimeOut = this.scene.time.delayedCall(duration, this.explodeTimer, [], this);
            }
            
            //this callback plays at the end of an animation sequence
            this.on('animationcomplete', function(anim) {
              //This nested event emit allows for specific animations to trigger specific actions
              //Without it, the object would destroy itself at the end of any animation loop, 
              //AKA before it explodes
              this.emit('animationcomplete_' + anim.key, anim);
            },this);
            this.on('animationcomplete_magicBlastExplode', function() {
              this.destroy();
            });
            
        }
        //Callback for magicBlast timeout timer, 
        //this runs if the magicBlast hasn't been destroyed by some other means
        //(Hits player) after a certain amount of time
        explodeTimer(){
          this.explode();
        }

        createAnimations(scene){
          scene.anims.create({
            key: 'magicBlastSpin',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 1, end: 12 }),
            frameRate: 10,
            repeat: -1
          });
          scene.anims.create({
            key: 'magicBlastExplode',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 13,end: 29 }),
            frameRate: 20,
           
          });
          
        }
        getOwner(){
          return this.owner;
        }
        
        setMagicBlastVelocity(velocity){
          
          let vectorAngle = Phaser.Math.Angle.Between(0,0,velocity.x,velocity.y);
          this.body.setVelocity(velocity.x*Math.abs(Math.cos(vectorAngle))*this.magicSpeed,velocity.y*Math.abs(Math.sin(vectorAngle))*this.magicSpeed);
        }
        explode(){
          if (this.body){
            this.body.enable = false;
            this.anims.play('magicBlastExplode',
            true);
          }
         
        }
        deflectFrom(player){
          //This code takes an input object 
          //and sets a velocity that moves the magicblast directly away from it
          let vectorAngle = Phaser.Math.Angle.Between(player.x,player.y,this.x,this.y);
          this.body.setVelocity(Math.cos(vectorAngle)*this.magicSpeed,Math.sin(vectorAngle)*this.magicSpeed);
        }
    }