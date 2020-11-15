import Phaser from 'phaser';
export default class lightningHB extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,{owner, animationSprite, Olength}={})
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);

            //Adds physics to sprite
            scene.physics.add.existing(this);
            this.setCircle(16);
            this.setVisible(false);

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
            
            //Creates a recursive, growing oscillation distance that accelerates with the lightning 
            //bolt. 
            //This allows for an illision of a diagonal, rotating hitbox that arcade physics cannot create,
            //I'd rather not have to use matter just for diagonal hitboxes,
            //or resort to custom hitboxes and collision detection in the update loop
            this.scene.tweens.add({
                targets: this,
                x: this.x + this.oscillationLength*this.orientationx,
                y: this.y + this.oscillationLength*this.orientationy,
                duration: 100,
                yoyo: true,
                onComplete: onCompleteHandler,
                onCompleteParams: [this.scene]
            });
           //Recursive function that allows for a growing oscillation length to our circular hitbox, simulating a non AABB hitbox effectively
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
                self.destroy();
            }
            
        }
        destroyAnimationSprite(){
            this.animationSprite.destroy();
        }
        getOwner(){
          return this.owner;
        }
        
        
      
    }