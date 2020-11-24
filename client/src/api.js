import io from 'socket.io-client';
const socket = io('http://localhost:8080', {
                transports: ['websocket'],
                path: '/socket'
            });
function subscribeToOnlineRoomCreate(cb) {
    socket.on('showRooms', room => cb(null,room));
    socket.emit('subscribeToOnlineRoomCreate')
}
function checkRoomCreation(){
    socket.emit('checkRoomCreation');
}

export {subscribeToOnlineRoomCreate,checkRoomCreation,socket};