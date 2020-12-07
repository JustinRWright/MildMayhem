import Phaser from 'phaser';

export default class Shield extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,{duration,owner}={})
        {
            super(scene,x,y,texture);
            
            //Adds sprite to screen
            this.scene = scene;
            this.owner = owner;
            //scene.add.existing(this.coolDownBar);
            scene.add.existing(this);
            //Adds physics to sprite
            scene.physics.add.existing(this);
            this.duration = duration;
            //this.texture = texture;
            this.x = x;
            this.y = y;
            let shieldTimeOut = this.scene.time.delayedCall(this.duration, this.shieldTimer, [], this);
            this.createAnimations(scene);
            this.anims.play('shieldExist',true);
            //Set shield orientation to owner orientation
            let ownerOrientation = owner.getOrientationVector();

            //right
            if (ownerOrientation.x>0){
                this.setFrame(2)
                this.x += 40;
                this.body.setSize(30, 100, {x: this.x + 40, y: this.y});
                this.body.setOffset(60,0);
               
            }
            //left
            if (ownerOrientation.x<0){
                this.setFrame(3)
                this.x -= 40;
                this.body.setSize(30, 100, {x: this.x - 40, y: this.y});
                this.body.setOffset(15,0);
            }
            //bottom
            if (ownerOrientation.y>0){
                this.setFrame(2)
                this.angle += 90;
                this.y += 40;
                this.body.setSize(100, 30, {x: this.x, y: this.y + 40});
                this.body.setOffset(0,60);
            }
            //top
            if (ownerOrientation.y<0){
                this.setFrame(2)
                this.angle -= 90;
                this.y -= 40;
                this.body.setSize(100, 30, {x: this.x, y: this.y - 40});
                this.body.setOffset(0,15);
            }

        }
        getOwner(){
            return this.owner;
        }
        createAnimations(scene){
          scene.anims.create({
            key: 'shieldExist',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 0, end: 3 }),
            frameRate: 0,
            repeat: -1
          });
          
        }
       shieldTimer(){
           this.destroy();
       }
    }