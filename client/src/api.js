import io from 'socket.io-client';
const socket = io('http://localhost:8080', {
                transports: ['websocket'],
                path: '/socket'
            });
function subscribeToOnlineRoomCreate(cb) {
    socket.on('addRoom', room => cb(null,room));
    socket.emit('subscribeToOnlineRoomCreate')
}

export {subscribeToOnlineRoomCreate,socket};