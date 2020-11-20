import React, { Component } from 'react'
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import LocalGameScene from '../phaser/scenes/LocalGameScene.js';
class GamePage extends Component {
  constructor(props){
    super(props);
    let controlConfig = this.props.controlConfig;
    this.state = {
    initialize: true,
    //This is the Phaser game code
    game: {
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
      input: {
        gamepad: true
      },
      scene: {
        init: function() {
          //Here we can pass in the Control Config and any other data the Phaser scene needs from React
          this.controlConfig = controlConfig;
        },
        preload: LocalGameScene.preload,
        create: LocalGameScene.create,
        update: LocalGameScene.update
      }
      
    }
  }
  }
  
  
  render() {
    const { initialize, game } = this.state
    return (
      <div style={{maxWidth: 800, minWidth:800, minHeight:600, maxHeight:600, margin: 'auto'}}>
      {/*Take a look at: https://github.com/proyecto26/ion-phaser/tree/master/react in order to see how this is implemented*/}
        <IonPhaser game={game} initialize={initialize} />
      </div>
    )
  }
}

export default GamePage;