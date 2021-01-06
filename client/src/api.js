import io from 'socket.io-client';
//use this for deploying build
const socket = io();
//use this below for proxy server in development
/*const socket = io('http://localhost:8080', {
                transports: ['websocket'],
                path: '/socket'
            });
*/
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