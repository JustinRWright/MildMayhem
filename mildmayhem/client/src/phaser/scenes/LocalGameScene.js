import { Scene } from 'phaser';
import Player from "../sprites/Player.js";
import Controls from "../controls/Controls.js";
import MagicBlast from "../sprites/MagicBlast.js";
import SwordSwing from "../sprites/SwordSwing.js";
import Phaser from 'phaser';
import bckg from '../assets/bckg.png';
import HealthBar from "../sprites/HealthBar.js";
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
        },

    create: function()
        {   
            //Deflect Magic Blast with sword
            this.deflectBlast = function(magicBlast,swordHitbox){
                if(swordHitbox.inSwordSweep(magicBlast)){
                    magicBlast.deflectFrom(swordHitbox.getOwner());
                }

            };
            //Callback function for player/magicBlast Collision
            this.playerHit = function(magicBlast,player){
               
                if (magicBlast.getOwner()!==player){
                    console.log("hit by enemy!");
                    magicBlast.explode();
                    if (player.getStun() === false){
                        player.playStun();
                        player.getHealthBar().decrease(3);
                        player.knockBack(magicBlast);
                    }
                    
                }
            }
            console.log("config is: " + this.controlConfig);
            this.player1 = new Player(this, 400, 500,'player');
            this.player2 = new Player(this, 400, 100, 'otherPlayer');
                
            this.healthBarP1 = new HealthBar({scene: this, x: 0, y:570});
            this.healthBarP2 = new HealthBar({scene: this, x: 0, y:0});
            this.player1.setHealthBar(this.healthBarP1);
            this.player2.setHealthBar(this.healthBarP2);

            this.controlsP1 = new Controls(this,{directionals: 'WASD', magicBlast: 'p', swordSwing: 'SPACE'});
            this.controlsP2 = new Controls(this,{directionals: 'ArrowKeys', magicBlast: 'NUMKEY9', swordSwing: 'NUMKEY0'});
            
            this.magicBlasts = this.physics.add.group();
            this.swordHitBoxes = this.physics.add.group();
            
            this.players = this.physics.add.group();
            this.players.add(this.player1);
            this.players.add(this.player2);
            this.physics.add.overlap(this.magicBlasts,this.swordHitBoxes,this.deflectBlast);
            this.physics.add.overlap(this.magicBlasts,this.players,this.playerHit);
            
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
            this.checkForSwingThenSwing = function(attackInput, player){
                //Check if swordSwing exists, and then check if it belongs to the player
                this.swordHitBoxes.getChildren().forEach(swordSwing => {
                    if (swordSwing.getOwner() === player) {
                        let swordToCheck = swordSwing;
                    }
                });
                //Check if sword swing can be activated
                 if ((attackInput.swordSwingFiring && typeof swordToCheck == 'undefined')){
                    //Set sword swing spawn point
                    let swordSpawnX = player.getX();
                    let swordSpawnY = player.getY();
                   
                    //Create new sword swing
                    let newSwordSwing = new SwordSwing(this,swordSpawnX,swordSpawnY,'swordSwing',{owner: player});
                    newSwordSwing.swingSword();
                    this.swordHitBoxes.add(newSwordSwing);
                   
                 }
            };
        },

    update: function()
        {
        
        //get Player input
        this.movementVectorP1 = this.controlsP1.getMovementVector();
        this.movementVectorP2 = this.controlsP2.getMovementVector();

        if(!this.player1.getStun()){
            this.player1.setPlayerVelocity(this.movementVectorP1);
            this.player1.setOrientationVector(this.movementVectorP1);
        }
       
        if(!this.player2.getStun()){
            this.player2.setPlayerVelocity(this.movementVectorP2);
            this.player2.setOrientationVector(this.movementVectorP2);
        }

        let attackInputsP1 = this.controlsP1.getAttackInput();
        let attackInputsP2 = this.controlsP2.getAttackInput();

        //this.physics.add.overlap(this.player1, this.magicBlasts,this.deflectBlast,this);
        //Check for user firing magic blast
        if (attackInputsP1.magicBlastFiring){
           this.createMagicBlast(this.player1);
        };
        if (attackInputsP2.magicBlastFiring){
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
        
        //Check for user swinging sword
        //The animation runs on a timer which gets reset if the player is pressing space for more than one game tick, therefore I had to run !this.swordSwing.isSwinging, this needs to get changed because it's so complicated and ugly
        
        this.checkForSwingThenSwing(attackInputsP1, this.player1);
        this.checkForSwingThenSwing(attackInputsP2, this.player2);

        
        }
    
    


}

export default LocalGameScene;