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
            if (magicBlast === 'P'){
              this.magicBlastAttack = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
            }
            if (swordSwing === 'SPACE'){
            this.swordSwing = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
          }
          }
          else if (directionals === 'ArrowKeys'){
            this.directionals = scene.input.keyboard.createCursorKeys();
            if (magicBlast === 'NumPad9'){
              this.magicBlastAttack = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);
            }
            if (swordSwing === 'NumPad0'){
              this.swordSwing = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
            }
            
          }
          else if (directionals === 'GamePad'){
            this.gamePadMode = true;
            console.log("game pad mode active" + this.gamePadMode);
            this.swordSwing = {};
            this.magicBlastAttack = {};
            const xAxis = 0;
            const yAxis = 0;
            this.directionals = {
                up: {isDown: yAxis > 0 ? true : false},
                down: {isDown: yAxis < 0 ? true : false},
                left: {isDown: xAxis > 0 ? true : false},
                right: {isDown: xAxis > 0 ? true : false},
              };
            this.scene.input.gamepad.on('down', function (pad, button, index) {
              this.swordSwing.isDown = pad.X;
              this.magicBlastAttack.isDown = pad.R2;
              //console.log('padx is: ' + pad.X);
              //console.log('padR2 is: ' + pad.R2);
            }, this);
           this.scene.input.gamepad.on('up', function (pad, button, index) {
              this.swordSwing.isDown = false;
              this.magicBlastAttack.isDown = false;
              //console.log('padx is: ' + pad.X);
              //console.log('padR2 is: ' + pad.R2);
            }, this);
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
          return {magicBlastFiring: this.magicBlastAttack.isDown,swordSwingFiring: this.swordSwing.isDown};
          
        }
        
       
    }