import Phaser from 'phaser';
export default class lightningHB extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,{owner, animationSprite, Olength}={})
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);
            console.log('hitbox created');

            //Adds physics to sprite
            scene.physics.add.existing(this);
            this.setCircle(16);
            this.setVisible(false);
            this.lightningSpeed = 800;
            this.texture = texture;
            this.animationSprite = animationSprite;
            this.owner = owner;
            this.firstx = x+owner.width-8;
            this.firsty = y+owner.height-8;
            this.x = x+owner.width-8;
            this.y = y+owner.height-8;
            this.oscillationLength = Olength;
            this.startingOlength = Olength;
            this.orientationx = owner.getOrientationVector().x;
            this.orientationy = owner.getOrientationVector().y;
            
            //Create a recursive, growing oscillation distance that accelerates with the lightning 
            //bolt. 
            //This allows for an illision of a hitbox that arcade physics cannot create,
            //I'd rather not have to use matterjs just for diagonal hitboxes, or resort to custom hitboxes and collision detection in the update loop
            this.scene.tweens.add({
                targets: this,
                x: this.x + this.oscillationLength*this.orientationx,
                y: this.y + this.oscillationLength*this.orientationy,
                duration: 100,
                yoyo: true,
                onComplete: onCompleteHandler,
                onCompleteParams: [this.scene]
            });
           function onCompleteHandler(tween, targets, scene){
                 let self = targets[0];
                if(self){
               
                        self.oscillationLength *= 3;
                    
                    if (self.oscillationLength <= 1000*self.startingOlength/100){
                            self.scene.tweens.add({
                            targets: self,
                            x: self.x + self.oscillationLength*self.orientationx,
                            y: self.y + self.oscillationLength*self.orientationy,
                            duration: 100,
                            yoyo: true,
                            onComplete: onCompleteHandler,
                            onCompleteParams: [self]
                        
                        });
                    }
                    else {
                        if (self){
                            self.scene.tweens.add({
                            targets: self,
                            x: self.x + 1000*self.orientationx*self.startingOlength/100,
                            y: self.y + 1000*self.orientationy*self.startingOlength/100,
                            duration: 100,
                            onComplete: countRuns,
                            repeat: 10,
                            yoyo: true,
                            });
                        }
                    }
                }
               
            };
            function countRuns(tween, targets, scene){
                let self = targets[0];
                console.log('runCounted');
                self.destroy();
            }
            //this.timeline = this.scene.tweens.createTimeline();
            /*this.timeline.add({
                targets: this,
                x: this.x + 1000*owner.getOrientationVector().x,
                y: this.y + 1000*owner.getOrientationVector().y,
                duration: 1200,
                //ease: 'Power3'
            });
            this.timeline.add({
                targets: this,
                x: this.firstx,
                y: this.firsty,
                duration: 100,
                ease: 'Power1',
                yoyo: true,
                repeat: 8,
                delay: 0
            });
            this.timeline.play();
            */
            ///this.accelerateTo()
            //this.setLightningHBVelocity(owner.getOrientationVector());
          

            //let timedEvent = this.scene.time.delayedCall(1000, this.onEvent, [], this);
            
            
        }
        
        destroyAnimationSprite(){
            this.animationSprite.destroy();
        }
        onEvent(){
            this.destroy();
        }
        getOwner(){
          return this.owner;
        }
        /*setLightningHBVelocity(velocity){
          let vectorAngle = Phaser.Math.Angle.Between(0,0,velocity.x,velocity.y);
          this.body.setVelocity(velocity.x*Math.abs(Math.cos(vectorAngle))*this.lightningSpeed,velocity.y*Math.abs(Math.sin(vectorAngle))*this.lightningSpeed);
        }*/
        
      
    }