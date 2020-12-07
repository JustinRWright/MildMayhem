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
import io from 'socket.io-client';
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
            this.load.spritesheet('Background','https://i.imgur.com/8SzCikO.png', {frameWidth: 800, frameHeight: 600});
            this.load.image('dodgeCool', 'https://i.imgur.com/mTklmkU.png');
            this.load.spritesheet('lightningBolt', 'https://i.imgur.com/3MskIUy.png', {frameWidth: 16, frameHeight: 1000});
            this.load.image('lightningCool', 'https://i.imgur.com/FVquIxw.png');
            this.load.spritesheet('shield', 'https://i.imgur.com/xiVxzaW.png', {frameWidth: 100, frameHeight: 100});
            this.load.image('shieldCool', 'https://i.imgur.com/2u16NSJ.png');
        },

    create: function()
        {   
             let self = this;
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
                frames: this.anims.generateFrameNumbers('explosion',{ start: 1, end: 23}),
                frameRate: 10,
                repeat: -1
            });
            //This needs to be added because the player2 animation breaks when called for some reason, unsure why?
            //It must have to do with something where 'explode' is played
            this.explosionAnim = this.anims.create({
                key: 'explode2',
                frames: this.anims.generateFrameNumbers('explosion',{ start: 1, end: 23}),
                frameRate: 10,
                repeat: -1
            });
            //Callback function for player/magicBlast Collision
            this.playerHit = function(magicBlast,player){
               //Check that the magicBlast is hitting the right player
                if (magicBlast.getOwner()!==player){
                    //In online mode, only the opposing player(who does not active hitbox in your game) will get hit, when they do, this is called
                    //Depending on how we implement magic blasts, this may require an index to be sent through for selecting and destroy the object
                    console.log('this.roomName is: ' + self.roomName);
                    self.socket.emit('destroyMagicBlast', self.roomName);
                   
                    magicBlast.explode();
                    //Check if player is stunned or dodging, if neither is true, play stun animation and calculate damage
                    if (player.getStun() === false || player.getDodging() === false){
                        self.socket.emit('damagePlayer', self.roomName);
                        player.playStun();
                        //Reduce player health
                        //When the healthbar reaches 0, this evaluates to true
                        if(player.getHealthBar().decrease(4)){
                            //This function has the player blow up
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
                    //Don't let the player take damage within a certain amount of time. 
                    //Somehow wait for the decrease to happen and then rechecking the stun, async functions?
                    //Check if player is stunned or dodging, if neither is true, play stun animation and calculate damage
                    if (player.getStun() === false || player.getDodging() === false){
                        
                        self.socket.emit('damagePlayer', self.roomName);
                        
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
            //Collision between lightning and player
            this.playerHitLightning = function(lightningBolt,player){
                //Players cannot hit themselves with their own attacks
                if(lightningBolt.getOwner()!==player){
                   
                    if (player.getStun() === false && player.getDodging() === false){
                        
                        //Stun is started for player
                        player.playStun();
                        self.socket.emit('destroyLightningBolt', self.roomName);
                        self.socket.emit('damagePlayer', self.roomName);
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
            this.shieldHitLightningBolt = function(shield, lightningBolt){
                 console.log("shield hit lightning Bolt");
                if(shield.getOwner() !== lightningBolt.getOwner()){
                    console.log("Opponent shield collision");
                    self.socket.emit('destroyLightningBolt', self.roomName);
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
                    self.socket.emit('destroyMagicBlast', self.roomName);
                    magicBlast.explode();
                }
            }


            //Callback for sending user back to main page when game ends
            this.redirect = function(){
                 window.location.replace('https://mildmayhem.herokuapp.com/');
            }
            //Glowing Background Sprite
            this.background = this.add.sprite(400,300,'Background');
            this.anims.create({
                key: 'glow',
                frames: this.anims.generateFrameNumbers('Background', { start: 1, end: 12 }),
                frameRate: 4,
                repeat: -1,
                yoyo: true
            });
            this.background.anims.play('glow');
            
            //Refactoring idea: make every variable passed into constructors 
            //descriptive javascript properties for readability
            this.setCoolDowns = function(swordCoolDown,dodgeCoolDown,magicCoolDown,lightningCoolDown,shieldCoolDown,position){
               if (position === 'top'){
                //Create Cooldowns: Note, final variable passed in is a timer, it sets how long the cooldown lasts in milliseconds            
                this[swordCoolDown] = new CoolDown(this, 570, 40, 'swordCool', 700); 
                this[magicCoolDown] = new CoolDown(this, 618, 40, 'blastCool', 1000);  
                this[dodgeCoolDown] = new CoolDown(this, 665, 40, 'dodgeCool', 1000);
                this[lightningCoolDown] = new CoolDown(this, 713, 40, 'lightningCool', 5000);
                this[shieldCoolDown] = new CoolDown(this, 761, 40, 'shieldCool', 7000);
               }
               else if(position === 'bottom'){
                this[swordCoolDown] = new CoolDown(this, 230, 560, 'swordCool', 700);
                this[magicCoolDown] = new CoolDown(this, 278, 560, 'blastCool', 1000);
                this[dodgeCoolDown] = new CoolDown(this, 326, 560, 'dodgeCool', 1000);
                this[lightningCoolDown] = new CoolDown(this, 374, 560, 'lightningCool', 5000);
                this[shieldCoolDown] = new CoolDown(this, 422, 560, 'shieldCool', 7000);
               }
            }
           //Create Health Bars
            this.healthBarP1 = new HealthBar({scene: this, x: 0, y:584});
            this.healthBarP2 = new HealthBar({scene: this, x: 0, y:0});

            //console.log('gameconfig is: ' + this.gameConfig);
            if (this.gameConfig === 'joinOnline') {
                this.player1 = new Player(this, 400, 200,'otherPlayer', this.explosionAnim);
                this.player2 = new Player(this, 400, 500,'player', this.explosionAnim);
                this.player1.setHealthBar(this.healthBarP2);
                this.player2.setHealthBar(this.healthBarP1);
                this.setCoolDowns('swordCoolDownP1','dodgeCoolDownP1','magicCoolDownP1','lightningCoolDownP1','shieldCoolDownP1',"top");
                this.setCoolDowns('swordCoolDownP2','dodgeCoolDownP2','magicCoolDownP2','lightningCoolDownP2','shieldCoolDownP2',"bottom");
                this.player1.createAnimations(this);
                this.player2.createAnimations(this);
                console.log('my id is: ' + this.socket.id);    
                this.player2.setVisible(true);
                
               
            }
            if (this.gameConfig === 'createOnline'){
                this.player1 = new Player(this, 400, 500,'player', this.explosionAnim);
                this.player2 = new Player(this, 400, 200,'otherPlayer', this.explosionAnim);
                this.player1.setHealthBar(this.healthBarP1);
                this.player2.setHealthBar(this.healthBarP2);
                this.player1.createAnimations(this);
                this.setCoolDowns('swordCoolDownP1','dodgeCoolDownP1','magicCoolDownP1','lightningCoolDownP1','shieldCoolDownP1',"bottom");
                this.setCoolDowns('swordCoolDownP2','dodgeCoolDownP2','magicCoolDownP2','lightningCoolDownP2','shieldCoolDownP2',"top");
                this.player2.createAnimations(this);
                this.player2.setVisible(false);
                this.socket.emit('createOnlineRoom');
                this.socket.emit('getRoomName');
                
            }
            
           /* //Create Cooldowns: Note, final variable passed in is a timer, it sets how long the cooldown lasts in milliseconds            
            this.swordCoolDownP1 = new CoolDown(this, 230, 560, 'swordCool', 700);
            this.swordCoolDownP2 = new CoolDown(this, 570, 40, 'swordCool', 700);
           
            this.magicCoolDownP1 = new CoolDown(this, 278, 560, 'blastCool', 1000);
            this.magicCoolDownP2 = new CoolDown(this, 618, 40, 'blastCool', 1000);
            
            this.dodgeCoolDownP1 = new CoolDown(this, 326, 560, 'dodgeCool', 1000);
            this.dodgeCoolDownP2 = new CoolDown(this, 665, 40, 'dodgeCool', 1000);
            this.lightningCoolDownP1 = new CoolDown(this, 374, 560, 'lightningCool', 5000);
            this.lightningCoolDownP2 = new CoolDown(this, 713, 40, 'lightningCool', 5000);
            */
            this.player2.moving = false;
            this.player2.moveTimer = 0;
            this.socket.on('yourRoomName', function(roomName) {
                //console.log('myroomName is called here');
                self.roomName = roomName;
            });
            this.socket.on('opponentJoined', function(opponentSocketId) {
                self.player2.setVisible(true);
                //console.log('opponentJoined, id: ' + opponentSocketId);
                self.opponentSocketId = opponentSocketId;
                self.socket.emit('confirmJoinRoom', opponentSocketId);
            });
            this.socket.on('joinedRoom', function(opponentSocketId) {
                //console.log('joined Room socket event happened')
                self.opponentSocketId = opponentSocketId;
            });
            this.socket.on('playerMoved', function (player2Movement){
               
                    self.player2.moving = true;
                    self.player2.x = player2Movement.x;
                    self.player2.y = player2Movement.y;
                    self.player2.setOrientationVector(player2Movement.direction);
                    if(self.player2.isAlive()){
                         self.player2.setMovementAnim(player2Movement.direction);
                    }
                   
            });
            this.socket.on('shieldCreated', function(){
                let shield = new Shield(self,self.player2.getX(),self.player2.getY(),'shield', {duration: 5000, owner: self.player2});
                self.shieldCoolDownP2.startCoolDown();
                self.shields.add(shield);
            });
           this.socket.on('swordSwung', function(){
               self.onlinePlayerSwing(self.player2, self.swordCoolDownP2);
           })
           this.socket.on('magicBlastCreated', function(){
               self.magicCoolDownP2.startCoolDown();
               self.createMagicBlast(self.player2);
           });
           this.socket.on('magicBlastDestroyed', function(){
               //console.log('magicBlastDestroyed ran');
               
                self.magicBlasts.getChildren().forEach(magicBlast => {
                    if (magicBlast.getOwner() !== self.player2) {
                        magicBlast.explode();
                    }
                });
           });
           this.socket.on('playerDamaged', function() {
               self.player2.playStun();
               if (self.player2.getHealthBar().decrease(4)){
                   self.player2.gameOver();
                   self.player2.anims.play('explode2', false);
                   
                   
                   let timedEvent = self.time.delayedCall(3000, self.redirect, [], self);
               }
           });
           this.socket.on('dodgeCoolDownStarted', function(){
               self.dodgeCoolDownP2.startCoolDown();
           });
           this.socket.on('lightningBoltCreated', function(){
               self.lightningCoolDownP2.startCoolDown();
               self.createLightningBolt(self.player2);
           });
           this.socket.on('lightningBoltDestroyed', function(){
               //console.log('animation destruction ran');
                         //Destroy the animation associated with these hitboxes
                        let lightningAnimDestroyed = false;
                        //Find all other associated lightning bolt hitboxes and destroy them
                        self.lightningBolts.getChildren().forEach(lightningBolt => {
                            if (lightningBolt.getOwner() !== self.player2) {
                                lightningBolt.body.enable = false;
                                if (lightningAnimDestroyed === false){
                                    //console.log('animation destruction ran');
                                    lightningAnimDestroyed = true;
                                    lightningBolt.destroyAnimationSprite();
                                }
                            }
                    });
           });
            //Create Win Text
            this.youWin = this.add.text(150,300-60,'PLAYER2 WINS ',{fontSize: '70px', color: '#66FF00'});
            this.youWin.setVisible(false);

            
          

            //Checks for the amount of gamepads connected to the phaser game, if the passed controls do not match the quantity of connected gamepads,
            //the controls will be reset, this can be fixed later
            let pad: Phaser.Input.Gamepad.Gamepad;
            let gamePadCount = ((this.controlConfig.player1.Movement==='GamePad')? 1:0);
           

            //Create controls object which can be accessed in the update logic for game object interactions
            this.controlsP1 = new Controls(this,{directionals: this.controlConfig.player1.Movement, magicBlast: this.controlConfig.player1.MagicBlast, swordSwing: this.controlConfig.player1.SwordSlash},gamePadCount,1);
           
            
            //These phaser groups allow for collisino detection of classes of objects at scale, for example all magic blasts have the same collision callack that is called
            this.magicBlasts = this.physics.add.group();
            this.swordHitBoxes = this.physics.add.group();
            this.lightningBolts = this.physics.add.group();
            this.shields = this.physics.add.group();
            //Create a sprite group in order to handle collisions
            this.players = this.physics.add.group();
            this.players.add(this.player1);
          

            //Attach healthbars to the selected players, this is so the game knows whose healthbar is whose
            //this.player1.setHealthBar(this.healthBarP1);

          

            //phaser has a prebuilt bounce physics setup, any value greater than 1 causes an exponential growth in object velocity as it multiplies each bounce
            this.player1.setBounce(1);


            //Collision handling for object groups (group1, group2, callback)
            this.physics.add.overlap(this.magicBlasts,this.swordHitBoxes,this.deflectBlast);
            this.physics.add.overlap(this.magicBlasts,this.players,this.playerHit);
            this.physics.add.overlap(this.lightningBolts,this.players,this.playerHitLightning);
            this.physics.add.overlap(this.swordHitBoxes,this.players,this.playerHitSwordSwing);
            this.physics.add.overlap(this.shields,this.magicBlasts, this.shieldHitMagicBlast);
            this.physics.add.overlap(this.shields,this.lightningBolts, this.shieldHitLightningBolt);
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
            
            //midline barrier wall
            this.midWall = this.physics.add.sprite(400,300,'wall');
            this.midWall.setScale(1,.08);
            this.midWall.setVisible(false);
            this.midWall.body.immovable = true;

            this.physics.add.collider(this.midWall,this.players);
            
            //The order of the objects in the collider matters, magicBlasts 
            //will only bounce off the walls if this.magicBlasts is the first argument
            this.physics.add.collider(this.magicBlasts,this.walls);
            this.physics.add.collider(this.walls,this.players);
             
            self.createMagicBlast = function(player){
                    //Create magic Blast
                    var magicBlast = new MagicBlast(self,player.getX(),
                    player.getY(),'magicBlast',{owner: player});
                    //Add to collision group
                    self.magicBlasts.add(magicBlast);
                    //Fire in direction of player orientation
                    magicBlast.setMagicBlastVelocity(player.getOrientationVector());
                    //Set magicBlast bounce
                    magicBlast.setCollideWorldBounds(true);
                    magicBlast.setBounce(1);
                    
            };
            this.createLightningBolt = function(player)
            {
                //DO NOT CALL SOCKET EMITS IN HERE, INFINITE FEEDBACK LOOP
                 //create lightning Bolt animation object
                let lightningBolt = new LightningBolt(this,player.getX(),player.getY(),'lightningBolt',{owner: player});
                //Creates 4 lightning bolt hitboxes which are the WIDTH of the lightning bolt, they travel 
                //at a speed so fast that it mimics a diagonal hitbox. This normally
                //can't be created using Arcade physics and its Axis aligned bounding boxes;
                let lightningBoltHB1 = new LightningHB(this,player.getX(),player.getY(),'magicBlast',{owner: player, animationSprite: lightningBolt, Olength: 100});
                let lightningBoltHB2 = new LightningHB(this,player.getX(),player.getY(),'magicBlast',{owner: player, animationSprite: lightningBolt, Olength: 50});
                let lightningBoltHB3 = new LightningHB(this,player.getX(),player.getY(),'magicBlast',{owner: player, animationSprite: lightningBolt, Olength: 25});
                let lightningBoltHB4 = new LightningHB(this,player.getX(),player.getY(),'magicBlast',{owner: player, animationSprite: lightningBolt, Olength: 75});
                //Add to collision group
                this.lightningBolts.add(lightningBoltHB1);
                this.lightningBolts.add(lightningBoltHB2);
                this.lightningBolts.add(lightningBoltHB3);
                this.lightningBolts.add(lightningBoltHB4);

            }
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
                   
                   
                    //Send sword swing to server
                    this.socket.emit('swingSword',this.roomName);
                    //Set sword swing spawn point
                    let swordSpawnX = player.getX();
                    let swordSpawnY = player.getY();
                    //emit sword swing event:
                    //Create new sword swing
                    let newSwordSwing = new SwordSwing(this,swordSpawnX,swordSpawnY,'swordSwing',{owner: player});
                    newSwordSwing.swingSword();
                    coolDown.startCoolDown();
                    this.swordHitBoxes.add(newSwordSwing);
                   
                 }
            };
            this.onlinePlayerSwing = function (player, coolDown){
                //Set sword swing spawn point
                let swordSpawnX = player.getX();
                let swordSpawnY = player.getY();
                //emit sword swing event:
                //Create new sword swing
                let newSwordSwing = new SwordSwing(this,swordSpawnX,swordSpawnY,'swordSwing',{owner: player});
                newSwordSwing.body.active = false;
                newSwordSwing.swingSword();
                coolDown.startCoolDown();
                this.swordHitBoxes.add(newSwordSwing);
            };
           
        },

    update: function()
        {
        
        //Checks if player 1 or player2 have lost, can events be used for this instead?
        if (!this.player1.isAlive()){
            this.youWin.setVisible(true);
           this.youWin.setText('OPPONENT WINS');
        }
        //Checks if player 1 or player2 have lost, can events be used for this instead?
        else if (!this.player2.isAlive()){
            this.youWin.setVisible(true);
            this.youWin.setText('YOU WIN');
            console.log("is player 2 anim playing?" + this.player2.anims.getTotalFrames());
        }
        
        //CoolDownAnims
        this.swordCoolDownP1.update();
        this.swordCoolDownP2.update();
        this.magicCoolDownP1.update();
        this.magicCoolDownP2.update();
        this.dodgeCoolDownP1.update();
        this.dodgeCoolDownP2.update();
        this.lightningCoolDownP1.update();
        this.lightningCoolDownP2.update();
        this.shieldCoolDownP1.update();
        this.shieldCoolDownP2.update();
        //Get Player inputgetMovementVector
        this.movementVectorP1 = this.controlsP1.getMovementVector();
        

        //Set the orientation of the player
        this.player1.setOrientationVector(this.movementVectorP1);
        
        // emit player movement data
        var x = this.player1.x;
        var y = this.player1.y;
        var d = this.player1.getOrientationVector();
        if (this.player1.oldPosition && (x !== this.player1.oldPosition.x || y !== this.player1.oldPosition.y || d !== this.player1.oldPosition.direction)) {
         
            this.socket.emit('playerMovement', { x: x, y: y, direction: d , roomName: this.roomName});
        }
 
        // save old position data
        this.player1.oldPosition = {
          x: x,
          y: y,
          direction: d
        };
        //Stop animation if not moving and alive(explode animation can play)
        if (this.player2.moving === false && this.player2.isAlive())
        {
            this.player2.anims.pause();
            
            
        }
        else
        {
            
            //Count some update frames, compensating for server delay,
            //If there is an acceptable delay from the server, then it can be assumed that the opponent
            //has stopped moving since the last time
            //They triggered a movmement event
            this.player2.moveTimer += 1;
            if (this.player2.moveTimer > 17){
                this.player2.moving = false;
                this.player2.moveTimer = 0;
            }
            
        }
        //Check to make sure the player is not stunned, alive, and is not dodging
        if(!this.player1.getStun() && this.player1.isAlive() && !this.player1.getDodging()){
            this.player1.setPlayerVelocity(this.movementVectorP1);
            this.player1.setMovementAnim(this.movementVectorP1);
        }



        //Get attack inputs every update cycle
        let attackInputsP1 = this.controlsP1.getMoveInput();
       
        //Check for user firing magic blast and that the cooldown is not active
        if (attackInputsP1.magicBlastFiring && !this.magicCoolDownP1.isActive()){
           this.magicCoolDownP1.startCoolDown();
           this.socket.emit('createMagicBlast', this.roomName);
           this.createMagicBlast(this.player1);
        };
        
        //Check for user firing Lightning Bolt
        if (attackInputsP1.lightningBoltFiring && !this.lightningCoolDownP1.isActive()){
           this.lightningCoolDownP1.startCoolDown();
           this.socket.emit('createLightningBolt',this.roomName);
           this.createLightningBolt(this.player1);
          
        };
        

       
        //Check for user dodging and check that they aren't already in dodge mode
        if (attackInputsP1.dodgeFiring && !this.player1.getDodging() && !this.dodgeCoolDownP1.isActive()){
            this.dodgeCoolDownP1.startCoolDown();
            this.socket.emit('startDodgeCoolDown',this.roomName);
            this.player1.dodge();
        };
        
         if(attackInputsP1.shieldFiring && !this.shieldCoolDownP1.isActive()){
            let shield = new Shield(this,this.player1.getX(),this.player1.getY(),'shield', {duration: 5000, owner: this.player1});
            this.shieldCoolDownP1.startCoolDown();
            this.shields.add(shield);
            this.socket.emit('createShield',this.roomName);
        }

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