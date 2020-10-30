import { Scene } from 'phaser';
import Player from "../sprites/Player.js";
import Controls from "../controls/Controls.js";
import MagicBlast from "../sprites/MagicBlast.js";
import SwordSwing from "../sprites/SwordSlash.js";
import Phaser from 'phaser';
import bckg from '../assets/bckg.png';
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
            this.deflectBlast = function(magicBlast,swordHitbox){
                if(swordHitbox.inSwordSweep(magicBlast)){
                    magicBlast.deflectFrom(swordHitbox.getOwner());
                }

            };
            console.log("config is: " + this.controlConfig);
            this.player1 = new Player(this, 400, 500,'player');
            this.player2 = new Player(this, 400, 100, 'otherPlayer');
            this.controlsP1 = new Controls(this,{directionals: 'WASD', magicBlast: 'p', swordSwing: 'SPACE'});
            this.controlsP2 = new Controls(this,{directionals: 'WASD', magicBlast: 'p', swordSwing: 'SPACE'});
            this.magicBlasts = this.physics.add.group();
            this.swordHitBoxes = this.physics.add.group();
            this.physics.add.overlap(this.magicBlasts,this.swordHitBoxes,this.deflectBlast);
            
        },

    update: function()
        {
        //console.log("control config is: " + this.controlConfig);
        //get Player input
        this.movementVector = this.controlsP1.getMovementVector();
        this.movementVector = this.controlsP2.getMovementVector();

        this.player1.setPlayerVelocity(this.movementVector);
        this.player1.setOrientationVector(this.movementVector);
        let attackInputs = this.controlsP1.getAttackInput();
        
        //this.physics.add.overlap(this.player1, this.magicBlasts,this.deflectBlast,this);
        //Check for user firing magic blast
        if (attackInputs.magicBlastFiring){
            //Create magic Blast
            var magicBlast = new MagicBlast(this,this.player1.getX(),
            this.player1.getY(),'magicBlast');
            
            //Add to collision group
            this.magicBlasts.add(magicBlast);
            //Fire in direction of player orientation
            magicBlast.setMagicBlastVelocity(this.player1.getOrientationVector());
            
            magicBlast.setCollideWorldBounds(true);
            magicBlast.setBounce(1);
        };
        //Update states for GameObjects
        if (this.swordSwing){
            this.swordSwing.update()
        }
        
        //Check for user swinging sword
        //The animation runs on a timer which gets reset if the player is pressing space for more than one game tick, therefore I had to run !this.swordSwing.isSwinging, this needs to get changed because it's so complicated and ugly
        if ((attackInputs.swordSwingFiring && typeof this.swordSwing == "undefined") || attackInputs.swordSwingFiring && !this.swordSwing.isSwinging()){
            //console.log("Sword Swung!!");
            //Set sword swing spawn point
            let swordSpawnX = this.player1.getX();
            let swordSpawnY = this.player1.getY();
            //console.log("swordSpawnX is:" + swordSpawnX);
            //console.log("swordSpawnY is:" + swordSpawnY);
            //Create new sword swing
            this.swordSwing = new SwordSwing(this,swordSpawnX,swordSpawnY,'swordSwing',{owner: this.player1});
            this.swordSwing.swingSword();
            this.swordHitBoxes.add(this.swordSwing);
            
        }

        
        }
    
    


}

export default LocalGameScene;