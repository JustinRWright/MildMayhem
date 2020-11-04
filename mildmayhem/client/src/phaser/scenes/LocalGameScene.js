import { Scene } from 'phaser';
import Player from "../sprites/Player.js";
import Controls from "../controls/Controls.js";
import MagicBlast from "../sprites/MagicBlast.js";
import SwordSwing from "../sprites/SwordSwing.js";
import Phaser from 'phaser';
import bckg from '../assets/bckg.png';
import HealthBar from "../sprites/HealthBar.js";
import CoolDown from "../sprites/CoolDown.js";
let LocalGameScene = {
    
    
    preload: function()
        {
            this.load.image('bckg', 'https://i.imgur.com/DMVC2IQ.png');
            this.load.image('wall', 'https://i.imgur.com/av8q7Or.png');
            this.load.image('vwall', 'https://i.imgur.com/UB2GdEL.png');
            this.load.spritesheet('swordSwing', 'https://i.imgur.com/ULyXfap.png', {frameWidth: 500, frameHeight: 500});
            this.load.image('swordCool', 'https://i.imgur.com/SnLjQdR.png');
            this.load.image('blastCool', 'https://i.imgur.com/d4Enueh.png');
            this.load.spritesheet('magicBlast', 'https://i.imgur.com/dEhNPqO.png', {frameWidth: 150, frameHeight: 150});
            this.load.spritesheet('explosion','https://i.imgur.com/UHZiUKC.png', {frameWidth: 192, frameHeight: 192});
            this.load.spritesheet('player', 'https://i.imgur.com/nRFZx7v.png', { frameWidth: 68, frameHeight: 68 });
            this.load.spritesheet('otherPlayer','https://i.imgur.com/V78wgrC.png', { frameWidth: 68, frameHeight: 68 });
            this.load.spritesheet('Background','https://i.imgur.com/T6q69wx.png', {frameWidth: 800, frameHeight: 600});
        },

    create: function()
        {   
            //Deflect Magic Blast with sword
            this.deflectBlast = function(magicBlast,swordHitbox){
                if(swordHitbox.inSwordSweep(magicBlast)){
                    magicBlast.deflectFrom(swordHitbox.getOwner());
                }

            };
            //console.log(this.props.returnMP);
            this.explosionAnim = this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion',{ start: 1, end: 23}),
                frameRate: 10,
                repeat: -1
            });
            //Callback function for player/magicBlast Collision
            this.playerHit = function(magicBlast,player){
               
                if (magicBlast.getOwner()!==player){
                    console.log("hit by enemy!");
                    magicBlast.explode();
                    //Check if player is stunned, if not, play stun animation and calculate damage
                    if (player.getStun() === false){
                        player.playStun();
                        //When the Healthbar reaches 0, this evaluates to true
                        if(player.getHealthBar().decrease(4)){
                            player.gameOver();
                            player.anims.play('explode', true);
                            //Win Screen and link people back to main menu
                           
                            
                        };

                        player.knockBack(magicBlast);
                    }
                    
                }
            }
           
            this.background = this.add.sprite(400,300,'Background');
            this.anims.create({
                key: 'glow',
                frames: this.anims.generateFrameNumbers('Background', { start: 1, end: 12 }),
                frameRate: 4,
                repeat: -1
            });
            this.background.anims.play('glow');
            console.log(this.background.anims.setYoyo(true));
            
            
            this.player1 = new Player(this, 400, 500,'player', this.explosionAnim);
            this.player2 = new Player(this, 400, 100, 'otherPlayer', this.explosionAnim);

          
           
            this.youWin = this.add.text(150,300-60,'PLAYER2 WINS ',{fontSize: '70px', color: '#66FF00'});
            this.youWin.setVisible(false);

            this.healthBarP1 = new HealthBar({scene: this, x: 0, y:584});
            this.healthBarP2 = new HealthBar({scene: this, x: 0, y:0});

            this.swordCoolDownP1 = new CoolDown(this, 230, 560, 'swordCool', 700);
            this.swordCoolDownP2 = new CoolDown(this, 570, 40, 'swordCool', 700);
           
            this.magicCoolDownP1 = new CoolDown(this, 278, 560, 'blastCool', 1000);
            this.magicCoolDownP2 = new CoolDown(this, 618, 40, 'blastCool', 1000);
            

             console.log("controlConfig is: " + JSON.stringify(this.controlConfig));
            this.controlsP1 = new Controls(this,{directionals: this.controlConfig.player1.Movement, magicBlast: this.controlConfig.player1.MagicBlast, swordSwing: this.controlConfig.player1.SwordSlash});
            this.controlsP2 = new Controls(this,{directionals: this.controlConfig.player2.Movement, magicBlast: this.controlConfig.player2.MagicBlast, swordSwing: this.controlConfig.player2.SwordSlash});
            
            this.magicBlasts = this.physics.add.group();
            this.swordHitBoxes = this.physics.add.group();
            
            this.players = this.physics.add.group();
            this.players.add(this.player1);
            this.players.add(this.player2);

            this.player1.setHealthBar(this.healthBarP1);
            this.player2.setHealthBar(this.healthBarP2);
            this.player1.setBounce(1);
            this.player2.setBounce(1);

            this.physics.add.overlap(this.magicBlasts,this.swordHitBoxes,this.deflectBlast);
            this.physics.add.overlap(this.magicBlasts,this.players,this.playerHit);
            
            //4 walls on the outside
            this.leftWall = this.physics.add.sprite(-55,300,'vwall');
            this.leftWall.body.immovable = true;
            this.rightWall = this.physics.add.sprite(855,300,'vwall');
            this.rightWall.body.immovable = true;
            this.topWall = this.physics.add.sprite(400,-55,'wall');
            this.topWall.body.immovable = true;
            this.bottomWall = this.physics.add.sprite(400,655,'wall');
            this.bottomWall.body.immovable = true;
            
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
        
        if (!this.player1.isAlive()){
            this.youWin.setVisible(true);
        }
        else if(!this.player2.isAlive()){
            this.youWin.setVisible(true);
            this.youWin.setText('PLAYER1 WINS');
        }
        //get Player input
        this.movementVectorP1 = this.controlsP1.getMovementVector();
        this.movementVectorP2 = this.controlsP2.getMovementVector();

        //Check if the player is stunned
        if(!this.player1.getStun() && this.player1.isAlive()){
            this.player1.setPlayerVelocity(this.movementVectorP1);
            this.player1.setOrientationVector(this.movementVectorP1);
        }
       
        if(!this.player2.getStun() && this.player2.isAlive()){
            this.player2.setPlayerVelocity(this.movementVectorP2);
            this.player2.setOrientationVector(this.movementVectorP2);
        }

        //Get attack inputs every update cycle
        let attackInputsP1 = this.controlsP1.getAttackInput();
        let attackInputsP2 = this.controlsP2.getAttackInput();

        //Check for user firing magic blast
        if (attackInputsP1.magicBlastFiring && !this.magicCoolDownP1.isActive()){
           this.magicCoolDownP1.startCoolDown();
           this.createMagicBlast(this.player1);
        };
        if (attackInputsP2.magicBlastFiring && !this.magicCoolDownP2.isActive()){
           this.magicCoolDownP2.startCoolDown();
           this.createMagicBlast(this.player2);
        };
        //Check if sword swings exist, and update them as needed
        let swordSwings = this.swordHitBoxes.getChildren();
        if (swordSwings.length>0){
            swordSwings.forEach(swordSwing => {
            swordSwing.update();
            }
            );
            
        }
        
        //Check for user swinging sword and then swing, starting the cooldown
        this.checkForSwingThenSwing(attackInputsP1, this.player1, this.swordCoolDownP1);
        this.checkForSwingThenSwing(attackInputsP2, this.player2, this.swordCoolDownP2);

        
        }
    
    


}

export default LocalGameScene;