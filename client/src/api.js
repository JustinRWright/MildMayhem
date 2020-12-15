import io from 'socket.io-client';
const socket = io();
function subscribeToShowRooms(cb) {
    socket.on('showRooms', room => cb(null,room));
    socket.emit('getRooms', room => cb(null,room));
}
function clearSocket() {
    socket.removeAllListeners();
}

function checkRoomCreation(){
    socket.emit('checkRoomCreation');
}
function joinRoom(playerId){
    socket.emit('joinRoom', playerId);
}

export {subscribeToShowRooms,clearSocket,socket,joinRoom};