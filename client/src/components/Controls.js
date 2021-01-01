import React from "react";
import { controlsAtom, keyBindingsAtom } from "../jotai";
import { useAtom } from "jotai";
import styled from "styled-components";

// components with styles
const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .controls-option {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;

    .keyboard {
      margin: 0 1.5rem 0 0;
    }

    .gamepad {
      margin: 0 0 0 1.5rem;
    }

    button {
      border-radius: 15px;
      padding: 10px 30px;
      outline: none;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background-color: rgb(221,221,221);
    }
  }

  .controls-details {
    display: flex;
    flex-direction: column;
    align-items: center;

    .player-details {
      display: flex;
      align-items: center;

      .players {
        margin: 0 60px;
      }

      span {
        text-decoration: underline;
        font-size: 1.3rem;
      }
    }

  }
  .list-container {
    display: flex;
    align-items: center;
  }
`;
const KeyTitle = styled.span`
grid-area: title;
font-size: 1rem;
`;
const KeyValue = styled.span`
grid-area: value;
font-size: 1.15rem;
justify-self: center;
padding-left: 20px;
`;

const ListItem = styled.li`
display: grid;
grid-template: 'title value';
grid-template-columns: 95px 120px;
list-style: none;
align-items: center;
`;

const List = styled.ul`
margin-left: 0;
padding-left: 0;
`;
// controls
const controlsList = [
  ["WASD", "SPACE", "O", "P", "I", "SHIFT"],
  ["ArrowKeys", "NumPad 0", "NumPad 8", "NumPad 9", "NumPad 1", "NumPad 4"],
  ["Left Stick", "X", "Right Trigger", "Left Trigger", "B", "Right Bumper"],
];

const Controls = () => {
  const [controlMode, setControlMode] = useAtom(controlsAtom);
  const [keyBindings, setKeyBindings] = useAtom(keyBindingsAtom);

  const toggleControl = (e) => {
    if(e.target.innerText.toLowerCase() === controlMode.toLowerCase()) {
      return
    }
    if (controlMode === "keyboard") {
      setControlMode("gamepad");
      setKeyBindings(false);
    } else {
      setControlMode("keyboard");
      setKeyBindings(true);
    }
  };
  // displays keys
  const mapKeys = (item) => {
    return (
      <div className="list-container">
        <List>
          <ListItem>
            <KeyTitle>Movement</KeyTitle>
            <KeyValue>{item[0][0]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Sword Slash</KeyTitle>
            <KeyValue>{item[0][1]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Magic Blast</KeyTitle>
            <KeyValue>{item[0][2]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Lightning</KeyTitle>
            <KeyValue>{item[0][3]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Shield</KeyTitle>
            <KeyValue>{item[0][4]}</KeyValue>
          </ListItem>
          <ListItem>
            <KeyTitle>Dodge</KeyTitle>
            <KeyValue>{item[0][5]}</KeyValue>
          </ListItem>
        </List>
        {item.length > 1 && (
          <List >
            <ListItem>
              <KeyTitle>Movement</KeyTitle>
              <KeyValue>{item[1][0]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Sword Slash</KeyTitle>
              <KeyValue>{item[1][1]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Magic Blast</KeyTitle>
              <KeyValue>{item[1][2]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Lightning</KeyTitle>
              <KeyValue>{item[1][3]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Shield</KeyTitle>
              <KeyValue>{item[1][4]}</KeyValue>
            </ListItem>
            <ListItem>
              <KeyTitle>Dodge</KeyTitle>
              <KeyValue>{item[1][5]}</KeyValue>
            </ListItem>
          </List>
        )}
      </div>
    );
  };

  return (
    <StyledControls>
      <h2>Controls</h2>
      <div className="controls-option">
        <button onClick={toggleControl} className="keyboard">
          Keyboard
        </button>
        <button onClick={toggleControl} className="gamepad">
          Gamepad
        </button>
      </div>
      <div className="controls-details">
        <div className="player-details">
          {controlMode === "keyboard" ? (
            <>
              <span className="players">Player 1</span>
              <span className="players">Player 2</span>
            </>
          ) : (
              <span>All players</span>
            )}
        </div>
        <div className="key-bindings">
          {keyBindings
            ? mapKeys(controlsList.slice(0, 2))
            : mapKeys(controlsList.slice(2))}
        </div>
      </div>
    </StyledControls>
  );
};

export default Controls;
