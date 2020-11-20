import Phaser from 'phaser';
export default class LightningBolt extends Phaser.Physics.Arcade.Sprite
    {
        //This object is purely an animation, it has no hitbox as Axis aligned bounding boxes (AABB)
        //The reason is that to implement a diagonal attack, one would need to create a diagonal bounding box
        //This is impossible with AABB, so another solution was used with
        //a series of lightningBolt Hitbox objects 
        constructor (scene,x,y,texture,{owner}={})
        {
            super(scene,x,y,texture);
           
            scene.add.existing(this);
            
            //create and play lightning strike animations
            this.createAnimations(scene);
            this.anims.play('lightningStrike',true);
            
            //set angle of object to match that of the player
            let vectorAngle = Phaser.Math.Angle.Between(0,0,owner.getOrientationVector().x,owner.getOrientationVector().y);
           
            //Angle is in degrees in phaser,
            //as well, the object needs to be rotated 90 extra degrees to actually line up with the player
            this.angle = vectorAngle*180/Math.PI+90;
            this.owner = owner;
            
            //This code sets the animation position at a distance just outside the width/height
            //of the player so it doesn't look like it spawned right on top of them 
            this.x = x + (owner.getOrientationVector().x*owner.width/2) + (owner.getOrientationVector().x*this.height/2*Math.abs(Math.cos(vectorAngle)));
            this.y = y + (owner.getOrientationVector().y*owner.height/2) + (owner.getOrientationVector().y*this.height/2*Math.abs(Math.sin(vectorAngle)));
           
           //This timer is for if the lightning bolt doesn't collide with a player and times out.
           //it then destroys the animation object
            let timedEvent = this.scene.time.delayedCall(3000, this.endLightningBolt, [], this);
            
            this.on('animationcomplete', function(anim) {
              this.emit('animationcomplete_' + anim.key, anim);
            },this);
            //This animation runs once the lightning has reached it's peak 'size'
            //and spreads across the screen, it basically 
            //just sits there until a collision or timeout
            this.on('animationcomplete_lightningStrike', function() {
              this.anims.play('lightningSizzle');
            });
            
        }
        endLightningBolt(){
          this.destroy();
        }
        //Creates lightning animations
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
        }
        //Used for checking collisions, etc
        getOwner(){
          return this.owner;
        }
       
        
       
    }