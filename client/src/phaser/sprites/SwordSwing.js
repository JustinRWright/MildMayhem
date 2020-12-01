import Phaser from 'phaser';
export default class SwordSwing extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture,{owner}={})
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);
            //Pair sprite to owner sprite(Either will be a player or opponent)
            this.owner = owner;
            //Adds physics to sprite
            scene.physics.add.existing(this);
           
            
            
            this.setCircle(220);
            
            this.body.setOffset(this.owner.displayWidth/2,this.owner.displayHeight/2);
            this.setScale(.4);
          
          
            this.createAnimations(scene);
            //When the swing completes, the sword is destroyed
            this.on('animationcomplete', function() {
              this.swinging = false;
              this.destroy();
            },this);
           

           
            this.x = x;
            this.y = y;
            this.swinging = false;
        }
       
        createAnimations(scene){
          scene.anims.create({
            key: 'swordSlash',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 1, end: 5 }),
            frameRate: 30,
            hideOnComplete: true
          });
          
          
        }
        update(){
          //This is called in the update l
          if (this.swinging){
            this.followOwner();
          }
        }
        //Orients sword to player, so that the sword doesn't just swing up all the time
        orientSword(playerOrientationVector){
         
          //Convert orientation vector to degrees, shift 90 degrees(The sword animation starts by facing up, it also inverts the orientation y vector as the yaxis is inverted)
          let newOrientation = (Math.atan2(-playerOrientationVector.y,-playerOrientationVector.x)*180/Math.PI-90);
         
          this.angle = newOrientation; 
          
        }
        
        swingSword(){

          this.swinging = true;
          this.orientSword(this.owner.getOrientationVector());
          this.anims.play('swordSlash');
        }
        isSwinging(){
          return this.swinging;
        }

        followOwner(){
          this.x = this.owner.x;
          this.y = this.owner.y;
        }
        inSwordSweep(gameObject){
          //Checks to see if an object is within the sweep of the sword attack
          //converts the angle between objects to rotate counter clockwise
          //in order to match the rotation of the sword angle math in orient sword
          //**A -270 degrees seems to be automatically converted to 90 inside of phaser.arcade.sprite.angle after it is set
          let collisionAngle = Phaser.Math.Angle.Between(gameObject.x,gameObject.y,this.x,this.y)*180/Math.PI-90;
         
          //This is the collision width of the object
          if (collisionAngle>this.angle-60&&collisionAngle<this.angle+60){
            return true;
          }
          else{
            return false;
          }
        }
        getOwner(){
          return this.owner;
        }
    }