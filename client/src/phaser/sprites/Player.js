
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
            //Player starts out looking forwards so x: 0, y: -1 makes sense as initial value
            this.orientationVector = {x: 0, y: -1};
            //
            this.alive = true;
            this.x = x;
            this.y = y;
            this.dodging = false;
            this.scene = scene;
            this.stunned = false;
            //This can be passed into contructor later
            //Should I use getters and setters like this?
            this.setPlayerSpeed(400);
           
        }
        
        //Starts stun for player
        playStun(){
            this.toggleStun();
            //calls a timer which removes player stun after 1 second
            let timedEvent = this.scene.time.delayedCall(1000, this.onEvent, [], this);
        }
        knockBack(gameObj){
          //This code finds the angle between the player and the object that damaged the player,
          //then it sends the player flying in the exact opposite direction
          let gameObjCenter = gameObj.getCenter();
          let playerCenter = this.getCenter();
          let vectorAngle = Phaser.Math.Angle.Between(gameObjCenter['x'],gameObjCenter['y'],playerCenter['x'],playerCenter['y']);
          
          let knockBackVel = 1200;
          let movementX = Math.cos(vectorAngle)*knockBackVel;
          let movementY = Math.sin(vectorAngle)*knockBackVel;
          this.setVelocity(movementX,movementY);
        }
        onEvent(){
          this.toggleStun();
        }
        toggleStun(){
          //While player is stunned, changed the player opacity
          this.stunned = !this.stunned;
          if (this.stunned === false){
            this.setAlpha(1);
          }
          else {
            this.setAlpha(.5);
          }
          
        }
        dodge(){
          //Changes player velocity and sets dodge property 
          this.body.setVelocity(this.orientationVector.x*1500,this.orientationVector.y*1500);
          this.dodging = true;
          this.setBounce(0);
          console.log(this.orientationVector);
          //This calls after the dodge cooldown completes
          let timedEvent = this.scene.time.delayedCall(150, this.finishedDodging, [], this);
        }
        finishedDodging(){
          this.setBounce(0);
          this.dodging = false;
          this.body.setVelocity(0,0);
        }
        //These two functions are for checking collisions in the scene code,
        //In the event that player is hit while stunned, the player shouldn't take damage or do anything else that's strange.
        getDodging(){
          return this.dodging;
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
        setMovementAnim(velocityVector){
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
          //Check to make sure 0,0 is not passed in(that is not a direction)
          if(Math.abs(velocityVector.x)+Math.abs(velocityVector.y)>0){
             
            //Check to see if there is a change in orientation
            if (this.orientationVector.x !== velocityVector.x || this.orientationVector.y !== velocityVector.y){
              
              this.orientationVector = velocityVector;
              
             
            }

          }
        }
        gameOver(){
          this.alive = false;
        }
        isAlive(){
          return this.alive;
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
        //Create player animations
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
