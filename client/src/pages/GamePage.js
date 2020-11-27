import React, { Component } from 'react'
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import LocalGameScene from '../phaser/scenes/LocalGameScene.js';
import OnlineGameScene from '../phaser/scenes/OnlineGameScene.js';
import {socket} from '../api';
class GamePage extends Component {
  constructor(props){
    super(props);
    let gameConfig = this.props.gameConfig;
    let roomName = this.props.roomName;
    console.log("gameConfig is: " + gameConfig);
    let newScene = LocalGameScene;
    if (gameConfig==='createOnline'){
      newScene = OnlineGameScene;
    }
    else if (gameConfig=='joinOnline'){
      newScene = OnlineGameScene;
    }
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
          this.gameConfig = gameConfig;
          this.roomName = roomName;
          this.socket = socket;
        },
        preload: newScene.preload,
        create: newScene.create,
        update: newScene.update,
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