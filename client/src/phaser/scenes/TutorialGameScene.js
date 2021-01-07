import { Scene } from 'phaser';
import Player from "../sprites/Player.js";
import Controls from "../controls/Controls.js";
import MagicBlast from "../sprites/MagicBlast.js";
import SwordSwing from "../sprites/SwordSwing.js";
import Phaser from 'phaser';
import bckg from '../assets/bckg.png';
import HealthBar from "../sprites/HealthBar.js";
import CoolDown from "../sprites/CoolDown.js";
import LightningBolt from '../sprites/lightningBolt.js';
import LightningHB from '../sprites/lightningBoltHitbox.js';
import Shield from '../sprites/Shield.js';


//import proxy from 'socket.io-proxy';
let LocalGameScene = {
    
    
    preload: function()
        {
            //I load the images from my publicly hosted imgur
            //because the file system seems to break for some reason when this is run in IonPhaser
            //(Which is inside a React application)
            //I make these drawings/spritesheets in piskel
            this.load.image('bckg', 'https://i.imgur.com/DMVC2IQ.png');
            this.load.image('wall', 'https://i.imgur.com/av8q7Or.png');
            this.load.image('vwall', 'https://i.imgur.com/UB2GdEL.png');
            this.load.spritesheet('swordSwing', 'https://i.imgur.com/ULyXfap.png', {frameWidth: 500, frameHeight: 500});
            this.load.image('swordCool', 'https://i.imgur.com/SnLjQdR.png');
            this.load.image('blastCool', 'https://i.imgur.com/d4Enueh.png');
            this.load.spritesheet('magicBlast', 'https://i.imgur.com/dEhNPqO.png', {frameWidth: 150, frameHeight: 150});
            this.load.spritesheet('explosion','https://i.imgur.com/UHZiUKC.png', {frameWidth: 192, frameHeight: 192});
            this.load.spritesheet('player', 'https://i.imgur.com/WlEeiKT.png', { frameWidth: 68, frameHeight: 68 });
            this.load.spritesheet('otherPlayer','https://i.imgur.com/NYAJusD.png', { frameWidth: 68, frameHeight: 68 });
            this.load.spritesheet('Background','https://i.imgur.com/T6q69wx.png', {frameWidth: 800, frameHeight: 600});
            this.load.image('dodgeCool', 'https://i.imgur.com/mTklmkU.png');
            this.load.spritesheet('lightningBolt', 'https://i.imgur.com/3MskIUy.png', {frameWidth: 16, frameHeight: 1000});
            this.load.image('lightningCool', 'https://i.imgur.com/FVquIxw.png');
            this.load.spritesheet('shield', 'https://i.imgur.com/xiVxzaW.png', {frameWidth: 100, frameHeight: 100});
            this.load.image('shieldCool', 'https://i.imgur.com/2u16NSJ.png');
            this.load.image('target', 'https://i.imgur.com/Z9lQ678.png');
        },

    create: function()
        {   
           
           
           /*I define some of the functions ex:this.deflectBlast
           this way instead of outside of the preload/create/update
           because that is the way they don't throw an error while using IonPhaser,
           Perhaps they can be moved to another file and imported in*/

          //Deflect Magic Blast with sword
            this.deflectBlast = function(magicBlast,swordHitbox){
                if(swordHitbox.inSwordSweep(magicBlast)){
                    magicBlast.deflectFrom(swordHitbox.getOwner());
                }
            };
           //Create explosion animation
            this.explosionAnim = this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion',{ start: 6, end: 23}),
                frameRate: 10,
                repeat: -1
            });
            //Callback function for player/magicBlast Collision
            this.playerHit = function(magicBlast,player){
               //Check that the magicBlast is hitting the right player
                if (magicBlast.getOwner()!==player){
                    magicBlast.explode();
                    //Check if player is stunned or dodging, if neither is true, play stun animation and calculate damage
                    if (player.getStun() === false || player.getDodging() === false){
                        player.playStun();
                        //When the healthbar reaches 0, this evaluates to true
                        if(player.getHealthBar().decrease(4)){
                            //This function 
                            player.gameOver();
                            player.anims.play('explode', true);
                            //Win Screen and link people back to main menu   
                            //How could we access the react router DOM here?

                            let timedEvent = player.scene.time.delayedCall(3000, player.scene.redirect, [], this);
                        };
                        //Knock opponent backwards
                        player.knockBack(magicBlast);
                    }
                    
                }
            }
            this.playerHitSwordSwing = function(swordSwing, player){
           
                if(swordSwing.getOwner()!==player){

                    //Problem, this code isn't working. It's because the stun check isn't working at the correct time 
                    //and the player set function isn't set before the player takes like double or triple damage
                    //Since the hitbox isn't destroy on impact it does a lot of other stuff
                    //Potential Fixes: 
                    //Destroy sword hitbox
                    //Don't let the player take damage within like, a certain amount of time. 
                    //Somehow wait for the decrease to happen and then rechecking the stun, async functions?
                    //
                    //Check if player is stunned or dodging, if neither is true, play stun animation and calculate damage
                    if (player.getStun() === false || player.getDodging() === false){
                        
                        
                        player.playStun();


                        //When the healthbar reaches 0, this evaluates to true
                        if(player.getHealthBar().decrease(4)){
                            //This function 
                            player.gameOver();
                            player.anims.play('explode', true);
                            //Win Screen and link people back to main menu   
                            //How could we access the react router DOM here?

                            let timedEvent = player.scene.time.delayedCall(3000, player.scene.redirect, [], this);
                        };
                        //Knock opponent backwards
                        player.knockBack(swordSwing);
                    }
                }
            }
            this.shieldHitLightningBolt = function(shield, lightningBolt){
                 console.log("shield hit lightning Bolt");
                if(shield.getOwner() !== lightningBolt.getOwner()){
                    console.log("Opponent shield collision");
                        //Destroy the animation associated with these hitboxes
                        lightningBolt.destroyAnimationSprite();

                        //Find all other associated lightning bolt hitboxes and destroy them
                        lightningBolt.scene.lightningBolts.getChildren().forEach(lightningBolt => {
                            if (lightningBolt.getOwner() !== shield.getOwner()) {
                                lightningBolt.body.enable = false;
                            }
                    });
                }
            }
            this.shieldHitMagicBlast = function(shield, magicBlast){
                console.log("shield hit magic Blast");
                if (shield.getOwner() !== magicBlast.getOwner()){
                     console.log("Opponenet shield collision");
                    magicBlast.explode();
                }
            }
            this.magicBlastHitTarget = function(target, magicBlast){
                 
                
                if(target.isDestroyed === false)
                {
                    target.isDestroyed=true;
                }
                else{
                    return;
                }
                target.anims.play('explode', false);
                let sceneRef = magicBlast.getOwner().scene;
                let destroyTarget = function(){
                    target.destroy();
                    sceneRef.Target = sceneRef.physics.add.sprite(400, 200, 'target');
                    sceneRef.Target.setScale(.2);
                    sceneRef.Target.setCollideWorldBounds(true);
                    sceneRef.Target.setBounce(1);
                    sceneRef.Target.setVelocity(1100,-30);
                    sceneRef.Target.isDestroyed=false;
                    sceneRef.physics.add.overlap(sceneRef.Target, sceneRef.lightningBolts, sceneRef.lightningBoltHitTarget);
                  
                };
                let timedEvent = sceneRef.time.delayedCall(1000, destroyTarget, [], this);
                sceneRef.tutorialText.setText('VERY GOOD! \n Now, cut off the lateral movement of the target... \n With a lightningBolt(O)!!');
            }
            this.lightningBoltHitTarget = function(target, lightningBolt) {
                if(target.isDestroyed === false)
                {
                    target.isDestroyed=true;
                }
                else{
                    return;
                }
                target.anims.play('explode', false);
                let sceneRef = lightningBolt.getOwner().scene;
                target.setVelocity(0,0)
                let destroyTarget = function(){
                    target.destroy();
                    
                };
                let timedEvent = sceneRef.time.delayedCall(1000, destroyTarget, [], this);
                sceneRef.tutorialText.setText('OH NO, YOU ANGERED THE TARGET(Someone got excited with the enchantment), \n RETURN FIRE \n QUICK, DODGE THROUGH IT \n (SHIFT)');
            }
            //Collision between lightning and player
            this.playerHitLightning = function(lightningBolt,player){
                //Players cannot hit themselves with their own attacks
                if(lightningBolt.getOwner()!==player){
                   
                    if (player.getStun() === false && player.getDodging() === false){
                        
                        //Stun is started for player
                        player.playStun();

                        if(player.getHealthBar().decrease(4)){
                            //Player dies
                            player.gameOver();
                            player.anims.play('explode', true);
                            //Send players back to main menu
                            let timedEvent = player.scene.time.delayedCall(3000, player.scene.redirect, [], this);
                        }
                        
                        player.knockBack(lightningBolt);
                      
                        //Destroy the animation associated with these hitboxes
                        lightningBolt.destroyAnimationSprite();

                        //Find all other associated lightning bolt hitboxes and destroy them
                        lightningBolt.scene.lightningBolts.getChildren().forEach(lightningBolt => {
                            if (lightningBolt.getOwner() !== player) {
                                lightningBolt.body.enable = false;
                            }
                    });
                }
            }
            }
            //Callback for sending user back to main page when game ends
            this.redirect = function(){
                  window.location.replace('https://mildmayhem.herokuapp.com/');
            }
            //Glowing Background Sprite
            //this.background = this.add.sprite(400,300,'Background');
            /*this.anims.create({
                key: 'glow',
                frames: this.anims.generateFrameNumbers('Background', { start: 1, end: 12 }),
                frameRate: 4,
                repeat: -1,
                yoyo: true
            });
            */
            //this.background.anims.play('glow');
            
            //Refactoring idea: make every variable passed into constructors 
            //descriptive javascript properties for readability

            //Create Both Players
            this.player1 = new Player(this, 400, 500,'player', this.explosionAnim);
            
            this.target = this.physics.add.sprite(400, 200, 'target');
            this.target.setScale(.6);
            this.target.isDestroyed = false;
            //Create tutorial directions
            this.tutorialText = this.add.text(100,100, 'Hit the target with your Magic Blast!(P)');
            //Create Health Bars
            this.healthBarP1 = new HealthBar({scene: this, x: 0, y:584});
          

            //Create Cooldowns: Note, final variable passed in is a timer, it sets how long the cooldown lasts in milliseconds            
            this.swordCoolDownP1 = new CoolDown(this, 230, 560, 'swordCool', 700);
          
           
            this.magicCoolDownP1 = new CoolDown(this, 278, 560, 'blastCool', 1000);
           
            
            this.dodgeCoolDownP1 = new CoolDown(this, 326, 560, 'dodgeCool', 1000);
           

            this.lightningCoolDownP1 = new CoolDown(this, 374, 560, 'lightningCool', 5000);
        

            this.shieldCoolDownP1 = new CoolDown(this, 422, 560, 'shieldCool', 7000);
          

            //Checks for the amount of gamepads connected to the phaser game, if the passed controls do not match the quantity of connected gamepads,
            //the controls will be reset, this can be fixed later
            let pad: Phaser.Input.Gamepad.Gamepad;
            let gamePadCount = ((this.controlConfig.player1.Movement==='GamePad')? 1:0);
          

            //Create controls object which can be accessed in the update logic for game object interactions
            this.controlsP1 = new Controls(this,{directionals: this.controlConfig.player1.Movement, magicBlast: this.controlConfig.player1.MagicBlast, swordSwing: this.controlConfig.player1.SwordSlash, shield: "L1"},gamePadCount,1);
           
            
            //These phaser groups allow for collisino detection of classes of objects at scale, for example all magic blasts have the same collision callack that is called
            this.magicBlasts = this.physics.add.group();
            this.swordHitBoxes = this.physics.add.group();
            this.lightningBolts = this.physics.add.group();
            this.shields = this.physics.add.group();
            
            //Create a sprite group in order to handle collisions
            this.players = this.physics.add.group();
            this.players.add(this.player1);
           

            //Attach healthbars to the selected players, this is so the game knows whose healthbar is whose
            this.player1.setHealthBar(this.healthBarP1);
           
            //phaser has a prebuilt bounce physics setup, any value greater than 1 causes an exponential growth in object velocity as it multiplies each bounce
            this.player1.setBounce(1);
           

            //Collision handling for object groups (group1, group2, callback)
            this.physics.add.overlap(this.magicBlasts,this.swordHitBoxes,this.deflectBlast);
            this.physics.add.overlap(this.magicBlasts,this.players,this.playerHit);
            this.physics.add.overlap(this.lightningBolts,this.players,this.playerHitLightning);
            this.physics.add.overlap(this.swordHitBoxes,this.players,this.playerHitSwordSwing);
            this.physics.add.overlap(this.shields,this.magicBlasts, this.shieldHitMagicBlast);
            this.physics.add.overlap(this.shields,this.lightningBolts, this.shieldHitLightningBolt);
            this.physics.add.overlap(this.target, this.magicBlasts, this.magicBlastHitTarget);
            //this.physics.add.collider(this.shields,this.players);
           
            

            //4 walls on the outside
            this.leftWall = this.physics.add.sprite(-55,300,'vwall');
            //Set immovable allows the objects to not move on collision
            this.leftWall.body.immovable = true;
            this.rightWall = this.physics.add.sprite(855,300,'vwall');
            this.rightWall.body.immovable = true;
            this.topWall = this.physics.add.sprite(400,-55,'wall');
            this.topWall.body.immovable = true;
            this.bottomWall = this.physics.add.sprite(400,655,'wall');
            this.bottomWall.body.immovable = true;
            
            //staticGroup is a different type of group that doesn't move I believe
            this.walls = this.physics.add.staticGroup();
            this.walls.add(this.leftWall);
            this.walls.add(this.rightWall);
            this.walls.add(this.topWall);
            this.walls.add(this.bottomWall);
            /*
            //midline barrier wall
            this.midWall = this.physics.add.sprite(400,300,'wall');
            this.midWall.setScale(1,.08);
            this.midWall.setVisible(false);
            this.midWall.body.immovable = true;
            */
            //this.physics.add.collider(this.midWall,this.players);
            
            //The order of the objects in the collider matters, magicBlasts 
            //will only bounce off the walls if this.magicBlasts is the first argument
            this.physics.add.collider(this.magicBlasts,this.walls);
            this.physics.add.collider(this.walls,this.players);
            
            
            this.createMagicBlast = function(player){
                    //Create magic Blast
                    var magicBlast = new MagicBlast(this,player.getX(),
                    player.getY(),'magicBlast',{owner: player});
                    //Add to collision group
                    this.magicBlasts.add(magicBlast);
                    //Fire in direction of player orientation
                    magicBlast.setMagicBlastVelocity(player.getOrientationVector());
                    //Set magicBlast bounce
                    magicBlast.setCollideWorldBounds(true);
                    magicBlast.setBounce(1);
                    
            };
            this.checkForSwingThenSwing = function(attackInput, player, coolDown){
                //Check if swordSwing exists, and then check if it belongs to the player
                this.swordHitBoxes.getChildren().forEach(swordSwing => {
                    if (swordSwing.getOwner() === player) {
                        let swordToCheck = swordSwing;
                    }
                });
                //Check if sword swing can be activated
                //if the attack button is pressed,
                //and there is no sword currently active on the player,
                //and the cooldown is no active, then the sword can be swung
                 if ((attackInput.swordSwingFiring && typeof swordToCheck == 'undefined' && !coolDown.isActive())){
                    //Set sword swing spawn point
                    let swordSpawnX = player.getX();
                    let swordSpawnY = player.getY();
                   
                    //Create new sword swing
                    let newSwordSwing = new SwordSwing(this,swordSpawnX,swordSpawnY,'swordSwing',{owner: player});
                    newSwordSwing.swingSword();
                    coolDown.startCoolDown();
                    this.swordHitBoxes.add(newSwordSwing);
                   
                 }
            };
        },

    update: function()
        {
        //Checks if player 1 or player2 have lost, can events be used for this instead?
        if (!this.player1.isAlive()){
            this.youWin.setVisible(true);
            this.youWin.setText('PLAYER2 WINS');
        }
       

        //CoolDownAnims
        this.swordCoolDownP1.update();
      
        this.magicCoolDownP1.update();
      
        this.dodgeCoolDownP1.update();
   
        this.lightningCoolDownP1.update();
      
        this.shieldCoolDownP1.update();

        //Get Player input
        this.movementVectorP1 = this.controlsP1.getMovementVector();
       
        //Set the orientation of the player
        this.player1.setOrientationVector(this.movementVectorP1);
    

        //Check to make sure the player is not stunned, alive, and is not dodging
        if(!this.player1.getStun() && this.player1.isAlive() && !this.player1.getDodging()){
            this.player1.setPlayerVelocity(this.movementVectorP1);
        }

        //Get attack inputs every update cycle
        let attackInputsP1 = this.controlsP1.getMoveInput();
      

        //Check for user firing magic blast and that the cooldown is not active
        if (attackInputsP1.magicBlastFiring && !this.magicCoolDownP1.isActive()){
           this.magicCoolDownP1.startCoolDown();
           this.createMagicBlast(this.player1);
        };
        
        if(attackInputsP1.shieldFiring && !this.shieldCoolDownP1.isActive()){
            let shield = new Shield(this,this.player1.getX(),this.player1.getY(),'shield', {duration: 5000, owner: this.player1});
            this.shieldCoolDownP1.startCoolDown();
            this.shields.add(shield);
        }
     

        //Check for user firing Lightning Bolt
        if (attackInputsP1.lightningBoltFiring && !this.lightningCoolDownP1.isActive()){
           this.lightningCoolDownP1.startCoolDown();
           
           //create lightning Bolt animation object
           let lightningBolt = new LightningBolt(this,this.player1.getX(),this.player1.getY(),'lightningBolt',{owner: this.player1});
           //Creates 4 lightning bolt hitboxes which are the WIDTH of the lightning bolt, they travel 
           //at a speed so fast that it mimics a diagonal hitbox. This normally
           //can't be created using Arcade physics and its Axis aligned bounding boxes;
           let lightningBoltHB1 = new LightningHB(this,this.player1.getX(),this.player1.getY(),'magicBlast',{owner: this.player1, animationSprite: lightningBolt, Olength: 100});
           let lightningBoltHB2 = new LightningHB(this,this.player1.getX(),this.player1.getY(),'magicBlast',{owner: this.player1, animationSprite: lightningBolt, Olength: 50});
           let lightningBoltHB3 = new LightningHB(this,this.player1.getX(),this.player1.getY(),'magicBlast',{owner: this.player1, animationSprite: lightningBolt, Olength: 25});
           let lightningBoltHB4 = new LightningHB(this,this.player1.getX(),this.player1.getY(),'magicBlast',{owner: this.player1, animationSprite: lightningBolt, Olength: 75});
           //Add to collision group
           this.lightningBolts.add(lightningBoltHB1);
           this.lightningBolts.add(lightningBoltHB2);
           this.lightningBolts.add(lightningBoltHB3);
           this.lightningBolts.add(lightningBoltHB4);
        };
     

       
        //Check for user dodging and check that they aren't already in dodge mode
        if (attackInputsP1.dodgeFiring && !this.player1.getDodging() && !this.dodgeCoolDownP1.isActive()){
            this.dodgeCoolDownP1.startCoolDown();
            this.player1.dodge();
        };
       

        //Check if sword swings exist, and update them as needed, 
        //this is the best way I can think of for tracking and following player position in the main loop
        //Perhaps there's a better way? Without it 
        //the sword is stuck in place, perhaps it can be attached to a reference to player position?
        //I took a look at an update pattern for a situation like this
        let swordSwings = this.swordHitBoxes.getChildren();
        if (swordSwings.length>0){
            swordSwings.forEach(swordSwing => {
                swordSwing.update();
            }
            );
            
        }
        
        //Check for user swinging sword and then swing, starting the cooldown
        //I think functions are supposed to do only one thing, I'll fix this later
        this.checkForSwingThenSwing(attackInputsP1, this.player1, this.swordCoolDownP1);
       
        }
    
    


}

export default LocalGameScene;