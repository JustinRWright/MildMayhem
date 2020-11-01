
import Phaser from 'phaser';
export default class Player extends Phaser.Physics.Arcade.Sprite
    {

        constructor (scene,x,y,texture)
        {
            super(scene,x,y,texture);
            //Adds sprite to screen
            scene.add.existing(this);
            //Adds physics to sprite
            scene.physics.add.existing(this);
            this.body.setSize(30,61);
            this.createAnimations(scene);
            //Tracks changes in player orientation
            this.orientationVector = {x: 0, y: 1};
            //
            this.x = x;
            this.y = y;
            this.scene = scene;
            this.stunned = false;
            this.setPlayerSpeed(400);
           
        }
        
        playStun(){
            this.toggleStun();
            let timedEvent = this.scene.time.delayedCall(1000, this.onEvent, [], this);
            console.log("playStun was called");
            //console.log(timedEvent.getProgress());
        }
        knockBack(gameObj){
          let gameObjCenter = gameObj.getCenter();
          let playerCenter = this.getCenter();
          let distance = Phaser.Math.Distance.Between(gameObjCenter['x'],gameObjCenter['y'],playerCenter['x'],playerCenter['y']);
          let vectorAngle = Phaser.Math.Angle.Between(gameObjCenter['x'],gameObjCenter['y'],playerCenter['x'],playerCenter['y']);
          console.log("distance is: " + distance);
          console.log("vectorAngle is: " + vectorAngle);
          let movementX = Math.cos(vectorAngle)*distance;
          let movementY = Math.sin(vectorAngle)*distance;
          this.setPosition(this.getX()+movementX,this.getY()+movementY);
        }
        onEvent(){
          this.toggleStun();
        }
        toggleStun(){
          this.stunned = !this.stunned;
          if (this.stunned === false){
            this.setAlpha(1);
          }
          else {
            this.setAlpha(.5);
          }
          console.log("stunned is: " + this.stunned);
        }
        getStun(){
          return this.stunned;
        }
        setPlayerSpeed(speed)
        {
          this.playerSpeed = speed;
        }
        setPlayerVelocity(velocityVector)
        {
          this.body.setVelocity(velocityVector.x*this.playerSpeed,velocityVector.y*this.playerSpeed);
          //Not Moving
          if(velocityVector.x === 0 && velocityVector.y === 0){
            this.anims.stop();
          }
          //Moving Up
          else if (velocityVector.y > 0){
            this.anims.play(this.texture.key + 'down', true);
          }
          //Moving Down
          else if (velocityVector.y < 0){
            this.anims.play(this.texture.key + 'up', true);
          }
          //Moving Right
          else if (velocityVector.x > 0) {
            this.anims.play(this.texture.key + 'right', true);
          }
          //Moving Left
          else if (velocityVector.x < 0) {
            this.anims.play(this.texture.key + 'left', true);
          }
        
        }
        setOrientationVector(velocityVector){
          //Check to make sure 0,0 is not passed in
          if(Math.abs(velocityVector.x)+Math.abs(velocityVector.y)>0){
            //Check to see if there is a change in orientation
            if (this.orientationVector.x !== velocityVector.x || this.orientationVector.y !== velocityVector.y){
              
              this.orientationVector = velocityVector;
              
              //console.log("Change detected! Orientation vector is: " + JSON.stringify(this.orientationVector));
            }
          }
        }
        checkSwinging(isSwordSwinging){
          if (isSwordSwinging){
           return; 
         }
         else {
           this.swinging = true;
         }
        }
        getWidth(){
          return this.body.width;
        }
        getHeight(){
          return this.body.height;
        }
        getOrientationVector(){
          return this.orientationVector;
        }
        setHealthBar(healthBar){
          this.healthBar = healthBar;
        }
        getHealthBar(){
          return this.healthBar;
        }
        getX()
        {
          return this.x;
        }
        getY()
        {
          return this.y;
        }
        createAnimations(scene){
          scene.anims.create({
            key: this.texture.key + 'left',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
          });
          scene.anims.create({
            key: this.texture.key + 'up',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
          });
          scene.anims.create({
            key: this.texture.key + 'right',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
          });
          scene.anims.create({
            key: this.texture.key + 'down',
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: 6, end: 7 }),
            frameRate: 10,
            repeat: -1
          });
        }
    }
