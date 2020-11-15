import Phaser from 'phaser';
export default class LightningBolt extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,{owner}={})
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);

            //Adds physics to sprite
            //scene.physics.add.existing(this);
            //this.body.enable = false;
            this.createAnimations(scene);
            this.anims.play('lightningStrike',true);
            
            let vectorAngle = Phaser.Math.Angle.Between(0,0,owner.getOrientationVector().x,owner.getOrientationVector().y);
            console.log('vector angle is: ' + vectorAngle);
            this.angle = vectorAngle*180/Math.PI+90;
            this.owner = owner;
            
            this.x = x + (owner.getOrientationVector().x*owner.width/2) + (owner.getOrientationVector().x*this.height/2*Math.abs(Math.cos(vectorAngle)));
            this.y = y + (owner.getOrientationVector().y*owner.height/2) + (owner.getOrientationVector().y*this.height/2*Math.abs(Math.sin(vectorAngle)));
           
            let timedEvent = this.scene.time.delayedCall(3000, this.onEvent, [], this);
            this.on('animationcomplete', function(anim) {
              
              //console.log("animation completed!");
              this.emit('animationcomplete_' + anim.key, anim);
            },this);
            this.on('animationcomplete_lightningStrike', function() {
              this.anims.play('lightningSizzle');
            });
            
        }
        onEvent(){
          //this.explode();
          this.destroy();
        }
        createAnimations(scene){
          scene.anims.create({
            key: 'lightningStrike',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 1, end: 17 }),
            frameRate: 30,
          });
          scene.anims.create({
            key: 'lightningSizzle',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 15, end: 17 }),
            frameRate: 10,
            repeat: -1
          });
          /*
          scene.anims.create({
            key: 'magicBlastExplode',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 13,end: 29 }),
            frameRate: 20,
           
          });
          */
        }
        getOwner(){
          return this.owner;
        }
        /*
        setMagicBlastVelocity(velocity){
          
          let vectorAngle = Phaser.Math.Angle.Between(0,0,velocity.x,velocity.y);
          this.body.setVelocity(velocity.x*Math.abs(Math.cos(vectorAngle))*this.magicSpeed,velocity.y*Math.abs(Math.sin(vectorAngle))*this.magicSpeed);
        }
        */
        explode(){
          if (this.body){
            this.body.enable = false;
            /*this.anims.play('magicBlastExplode',
            true);
            */
          }
         
        }
       
    }