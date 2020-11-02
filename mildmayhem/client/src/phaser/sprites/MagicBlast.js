import Phaser from 'phaser';
export default class MagicBlast extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,{owner}={})
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);

            //Adds physics to sprite
            scene.physics.add.existing(this);
            this.setScale(.4);
            this.magicSpeed = 800;
            this.setCircle(85);
            this.createAnimations(scene);
            this.anims.play('magicBlastSpin',true);
            this.owner = owner;
            this.x = x;
            this.y = y;
            let timedEvent = this.scene.time.delayedCall(1000, this.onEvent, [], this);
            this.on('animationcomplete', function(anim) {
              //console.log("animation completed!");
              this.emit('animationcomplete_' + anim.key, anim);
            },this);
            this.on('animationcomplete_magicBlastExplode', function() {
              this.destroy();
            });
            
        }
        onEvent(){
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
          let vectorAngle = Phaser.Math.Angle.Between(player.x,player.y,this.x,this.y);
          //console.log(vectorAngle*180/Math.PI);
          this.body.setVelocity(Math.cos(vectorAngle)*this.magicSpeed,Math.sin(vectorAngle)*this.magicSpeed);
        }
    }