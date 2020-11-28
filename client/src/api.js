import io from 'socket.io-client';
const socket = io('http://localhost:8080', {
                transports: ['websocket'],
                path: '/socket'
            });
function subscribeToShowRooms(cb) {
    socket.on('showRooms', room => cb(null,room));
}
function clearSocket() {
    socket.removeAllListeners();
}
function getRooms(cb2) {
    console.log('getRoomsCalled');
    socket.emit('getRooms');
    socket.on('updateRooms', room => cb2(null,room));
}
function checkRoomCreation(){
    socket.emit('checkRoomCreation');
}
function joinRoom(playerId){
    socket.emit('joinRoom', playerId);
}

export {subscribeToShowRooms,clearSocket,getRooms,socket,joinRoom};