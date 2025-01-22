import { Server as socketIo } from 'socket.io';

export const configureSocket = (server) => {
    const io = new socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');  // 연결된 유저 로그 출력

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);  // 해당 roomId에 유저를 참여시킴
            console.log(`User joined room: ${roomId}`);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');  // 유저가 연결을 종료했을 때 로그 출력
        });
    });

    return io;
};
