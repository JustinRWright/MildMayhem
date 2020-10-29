import Phaser from 'phaser';
export default class Controls extends Phaser.GameObjects.Sprite
    {

        constructor (scene,type)
        {
            super(scene,type);
            this.setKeyInput(scene,type);
            
        }
        setKeyInput(scene,{directionals,magicBlast,swordSwing,dodge}={}){
          //Potentially can add configurable controls by using if statements here in the future
          if (directionals === 'WASD'){
            this.directionals = scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D
            });
          }
          if (magicBlast === 'p'){
            this.magicBlastAttack = scene.input.keyboard.addKeys({p: Phaser.Input.Keyboard.KeyCodes.P});
          }
          if (swordSwing === 'SPACE'){
            this.swordSwing = scene.input.keyboard.addKeys({spaceBar: Phaser.Input.Keyboard.KeyCodes.SPACE});
          }
        }
        getMovementVector(){
         return {
           //Gets the vector for a directional key press(y is inverted)
           x: ((this.directionals.right.isDown)? 1:0)+((this.directionals.left.isDown)? -1:0),
           y: ((this.directionals.up.isDown)? -1:0)+((this.directionals.down.isDown)? 1:0)};
        }
        getAttackInput(){
          return {magicBlastFiring: this.magicBlastAttack.p.isDown,swordSwingFiring: this.swordSwing.spaceBar.isDown};
          
        }
        
       
    }