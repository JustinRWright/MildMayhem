import Phaser from 'phaser';
export default class Controls extends Phaser.GameObjects.Sprite
    {

        constructor (scene,type,gamePadCount,gamePadNumber)
        {
            super(scene,type,gamePadCount,gamePadNumber);
            this.setKeyInput(scene,type);
            this.scene = scene;
            this.gamePadCount = gamePadCount;
            this.gamePadNumber = gamePadNumber;
            
        }
        setWASDControls(){
          this.directionals = this.directionals = this.scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D
            });
            this.magicBlastAttack = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
            this.swordSwing = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.dodge = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
            this.lightningBolt = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        }
        setArrowKeyControls(){
          this.directionals = this.scene.input.keyboard.createCursorKeys();
          this.magicBlastAttack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);
          this.swordSwing = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
          this.dodge = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
          this.lightningBolt = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);
        }
        setKeyInput(scene,{directionals,magicBlast,swordSwing,dodge}={}){
          //Potentially can add more configurable controls by using passing keycodes in here in the future
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
            this.dodge = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

            this.lightningBolt = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
          }
          else if (directionals === 'ArrowKeys'){
            this.directionals = scene.input.keyboard.createCursorKeys();
            if (magicBlast === 'NumPad9'){
              this.magicBlastAttack = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);
            }
            if (swordSwing === 'NumPad0'){
              this.swordSwing = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
            }
            this.dodge = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
            this.lightningBolt = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);
          }
          else if (directionals === 'GamePad'){
            
            this.gamePadMode = true;
            console.log("game pad mode active" + this.gamePadMode);
            this.swordSwing = {};
            this.magicBlastAttack = {};
            this.dodge = {};
            this.lightningBolt = {};
            const xAxis = 0;
            const yAxis = 0;
            this.directionals = {
                up: {isDown: yAxis > 0 ? true : false},
                down: {isDown: yAxis < 0 ? true : false},
                left: {isDown: xAxis > 0 ? true : false},
                right: {isDown: xAxis > 0 ? true : false},
              };
            this.scene.input.gamepad.once('connected', function (pad, event) {
              console.log('pad index is: ' + pad.index);
              //console.log('padx is: ' + pad.X);
              //console.log('padR2 is: ' + pad.R2);
            }, this);
            this.scene.input.gamepad.on('down', function (pad, button, index) {
              console.log("button pressed" + button);
              this.swordSwing.isDown = pad.X;
              this.magicBlastAttack.isDown = pad.R2;
              this.dodge.isDown =  pad.R1;
              this.lightningBolt = pad.L2;
              
            }, this);
           this.scene.input.gamepad.on('up', function (pad, button, index) {
              this.swordSwing.isDown = false;
              this.magicBlastAttack.isDown = false;
              this.dodge.isDown = false;
              this.lightningBolt.isdown = false;
              
            }, this);
          }
          
          
          
          
          
         
        }
        
        getMovementVector(){
         
          if (this.gamePadMode){

            let pad: Phaser.Input.Gamepad.Gamepad;
            //If there are 2 controllers connected and the gamepad isActive at all then...
            if (this.scene.input.gamepad.total&&this.scene.input.gamepad.isActive()){ 
                if (this.scene.input.gamepad.total>=this.gamePadCount){
                 
                  pad = this.scene.input.gamepad.pad1
                  
                  if (this.scene.input.gamepad.pad2 && this.gamePadNumber===2){
                    pad = this.scene.input.gamepad.pad2;
                  }

                  
                  
                  const xAxis = pad.axes[0].getValue();
                  const yAxis = pad.axes[1].getValue();
                
                  this.directionals = {
                    up: {isDown: yAxis < 0 ? true : false},
                    down: {isDown: yAxis > 0 ? true : false},
                    left: {isDown: xAxis < 0 ? true : false},
                    right: {isDown: xAxis > 0 ? true : false},
              }
                }
                else {
                  console.log("Hey you didn't connect enough controllers");
                  //We should create a callback function here that resets the control scheme that is missing
                  //and inform the user of the error of their ways.
                  //We need player which is
                  if (this.gamePadNumber == 1){

                    //set controls back to keyboard wasd
                  }
                  else
                  {
                    //set controls to arrowkeys
                  }
                }
                
                
            }


       
           }
         return {
           //Gets the vector for a directional press(y is inverted)
           x: ((this.directionals.right.isDown)? 1:0)+((this.directionals.left.isDown)? -1:0),
           y: ((this.directionals.up.isDown)? -1:0)+((this.directionals.down.isDown)? 1:0)};
        }
        getMoveInput(){
          return {lightningBoltFiring: this.lightningBolt.isDown, dodgeFiring: this.dodge.isDown, magicBlastFiring: this.magicBlastAttack.isDown,swordSwingFiring: this.swordSwing.isDown};
          
        }
        
       
    }