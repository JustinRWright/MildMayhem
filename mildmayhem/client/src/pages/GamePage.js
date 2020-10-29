import React, { Component } from 'react'
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import bckg from '../phaser/assets/bckg.png';
//import LocalGame from '../phaser/scenes/game.js';
import LocalGameScene from '../phaser/scenes/LocalGameScene.js';
class GamePage extends Component {
  state = {
    initialize: true,
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
      scene: LocalGameScene
    }
  }
  render() {
    const { initialize, game } = this.state
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  }
}

export default GamePage;