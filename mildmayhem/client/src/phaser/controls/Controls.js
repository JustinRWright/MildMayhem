import Phaser from 'phaser';
export default class Controls extends Phaser.GameObjects.Sprite
    {

        constructor (scene,type)
        {
            super(scene,type);
            this.setKeyInput(scene,type);
            this.scene = scene;
            
        }
        setKeyInput(scene,{directionals,magicBlast,swordSwing,dodge}={}){
          //Potentially can add more configurable controls by using if statements here in the future
          if (directionals === 'WASD'){
            this.directionals = scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D
            });
          }
          else if (directionals === 'ArrowKeys'){
            this.directionals = scene.input.keyboard.createCursorKeys();
           
          }
          else if (directionals === 'GamePad'){
            this.gamePadMode = true;
            console.log("game pad mode active" + this.gamePadMode);
            const xAxis = 0;
            const yAxis = 0;
            this.directionals = {
                up: {isDown: yAxis > 0 ? true : false},
                down: {isDown: yAxis < 0 ? true : false},
                left: {isDown: xAxis > 0 ? true : false},
                right: {isDown: xAxis > 0 ? true : false},
              }
            /*
            this.scene.input.gamepad.on('down', function (pad, button, index) {
               console.log("connected!");
                
                this.scene.input.gamepad = pad;
                this.directionals = {
                  up: {isDown: this.scene.input.gamepad.axes[0].getValue() > 0 ? true : false},
                  down: {isDown: this.scene.input.gamepad.axes[0].getValue() < 0 ? true : false},
                  left: {isDown: this.scene.input.gamepad.axes[0].getValue() > 0 ? true : false},
                  right: {isDown: this.scene.input.gamepad.axes[0].getValue() > 0 ? true : false},
              }
                
            }, this);
           */
          }
          if (magicBlast === 'p'){
            this.magicBlastAttack = scene.input.keyboard.addKeys({p: Phaser.Input.Keyboard.KeyCodes.P});
          }
          else if (magicBlast === 'NUMKEY9'){
            this.magicBlastAttack = scene.input.keyboard.addKeys({p: Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE});
          }
          if (swordSwing === 'SPACE'){
            this.swordSwing = scene.input.keyboard.addKeys({spaceBar: Phaser.Input.Keyboard.KeyCodes.SPACE});
          }
          else if (swordSwing === 'NUMKEY0'){
            this.swordSwing = scene.input.keyboard.addKeys({spaceBar: Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO});
          }
        }
        
        getMovementVector(){
         
          if (this.gamePadMode){

            let pad: Phaser.Input.Gamepad.Gamepad;
            if (this.scene.input.gamepad.total){ 
                pad = this.scene.input.gamepad.getPad(0);

                const xAxis = pad.axes[0].getValue();
                const yAxis = pad.axes[1].getValue();
               
                this.directionals = {
                  up: {isDown: yAxis < 0 ? true : false},
                  down: {isDown: yAxis > 0 ? true : false},
                  left: {isDown: xAxis < 0 ? true : false},
                  right: {isDown: xAxis > 0 ? true : false},
              }
            }


            /*
            if(this.input.gamepad.total){
              let pad = this.scene.input.gamepad.getPad(0);
              console.log("we have set up the gamepad thing");
               this.directionals = {
                  up: {isDown: pad.axes[0].getValue() > 0 ? true : false},
                  down: {isDown: pad.gamepad.axes[0].getValue() < 0 ? true : false},
                  left: {isDown: pad.axes[0].getValue() > 0 ? true : false},
                  right: {isDown: pad.axes[0].getValue() > 0 ? true : false},
              }
            }
            */
           }
         return {
           //Gets the vector for a directional press(y is inverted)
           x: ((this.directionals.right.isDown)? 1:0)+((this.directionals.left.isDown)? -1:0),
           y: ((this.directionals.up.isDown)? -1:0)+((this.directionals.down.isDown)? 1:0)};
        }
        getAttackInput(){
          return {magicBlastFiring: this.magicBlastAttack.p.isDown,swordSwingFiring: this.swordSwing.spaceBar.isDown};
          
        }
        
       
    }