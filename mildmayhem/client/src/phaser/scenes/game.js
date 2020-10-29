import Player from "../sprites/Player.js";
import Controls from "../controls/Controls.js";
import MagicBlast from "../sprites/MagicBlast.js";
import SwordSwing from "../sprites/SwordSlash.js";
import Phaser from 'phaser';
import bckg from '../assets/bckg.png';
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bckg', '../assets/bckg.png');
    this.load.image('wall', '../assets/Walls.png');
    this.load.image('vwall', '../assets/VWalls.png');
    this.load.image('sword', '../assets/Sword.png');
    this.load.spritesheet('swordSwing', '../assets/SwordSlashWithSwing.png', {frameWidth: 500, frameHeight: 500});
    this.load.image('swordCool', '../assets/SwordCool.png');
    this.load.image('blastCool', '../assets/BlastCool.png');
    this.load.spritesheet('magicBlast', '../assets/MagicBlastNew.png', {frameWidth: 150, frameHeight: 150});
    this.load.spritesheet('explosion','../assets/Explosion1.png', {frameWidth: 192, frameHeight: 192});
    this.load.spritesheet('player', 'https://i.imgur.com/nRFZx7v.png', { frameWidth: 68, frameHeight: 68 });
    this.load.spritesheet('otherPlayer','https://i.imgur.com/V78wgrC.png', { frameWidth: 68, frameHeight: 68 });
}

function create ()
{
    this.player = new Player(this,250,250,'player');
    this.controls = new Controls(this,{directionals: 'WASD', magicBlast: 'p', swordSwing: 'SPACE'});
    this.magicBlasts = this.physics.add.group();
    this.swordHitBoxes = this.physics.add.group();
    this.physics.add.overlap(this.magicBlasts,this.swordHitBoxes,deflectBlast);
    //this.physics.add.collider(this)
   
    //this.magicBlastGroup.createMagicBlast(this,300,300,'magicBlast');
    ///this.magicBlasts.create(300,300,'magicBlast');
}

function update ()
{
   //get Player input
   this.movementVector = this.controls.getMovementVector();
   
   this.player.setPlayerVelocity(this.movementVector);
   this.player.setOrientationVector(this.movementVector);
   let attackInputs = this.controls.getAttackInput();
   
   //this.physics.add.overlap(this.player, this.magicBlasts,deflectBlast,this);
   //Check for user firing magic blast
   if (attackInputs.magicBlastFiring){
      //Create magic Blast
      var magicBlast = new MagicBlast(this,this.player.getX(),
      this.player.getY(),'magicBlast');
      
      //Add to collision group
      this.magicBlasts.add(magicBlast);
      //Fire in direction of player orientation
      magicBlast.setMagicBlastVelocity(this.player.getOrientationVector());
      
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
      let swordSpawnX = this.player.getX();
      let swordSpawnY = this.player.getY();
      //console.log("swordSpawnX is:" + swordSpawnX);
      //console.log("swordSpawnY is:" + swordSpawnY);
      //Create new sword swing
      this.swordSwing = new SwordSwing(this,swordSpawnX,swordSpawnY,'swordSwing',{owner: this.player});
      this.swordSwing.swingSword();
      this.swordHitBoxes.add(this.swordSwing);
      
   }

   
}
function deflectBlast(magicBlast,swordHitbox){
    if(swordHitbox.inSwordSweep(magicBlast)){
    magicBlast.deflectFrom(swordHitbox.getOwner());
    }

}


