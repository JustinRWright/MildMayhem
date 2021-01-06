import { atom, useAtom } from 'jotai';

export const displayModeAtom = atom('');
export const gameConfigAtom = atom({player1: "..."});
export const controlConfigAtom = atom({
    player1: {
      Movement: 'WASD',
      SwordSlash: 'SPACE',
      MagicBlast: 'P'
    },
    player2: {
      Movement: 'ArrowKeys',
      SwordSlash: 'NumPad0',
      MagicBlast: 'NumPad9'
    }
  });
export const roomsAtom = atom({});
export const matchAtom = atom({gameType: 'offline', roomName: '', roomId: ''});
export const controlsAtom = atom('keyboard')
export const keyBindingsAtom = atom(true)


