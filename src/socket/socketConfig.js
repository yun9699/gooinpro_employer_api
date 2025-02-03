import { WebSocketServer } from 'ws';

export const configureWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('A user connected'); // 연결된 유저 로그 출력

        // 유저가 메시지를 보내면
        ws.on('message', (message) => {
            console.log(`Received: ${message}`); // 받은 메시지 출력
            // 메시지를 해당 채팅방에 있는 다른 유저에게 전달
            broadcastMessage(ws, message);
        });

        // 유저가 특정 채팅방에 입장
        ws.on('joinRoom', (roomId) => {
            ws.roomId = roomId; // ws 객체에 roomId 저장
            console.log(`User joined room: ${roomId}`);
        });

        // 연결 종료 시
        ws.on('close', () => {
            console.log('A user disconnected'); // 유저가 연결을 종료했을 때 로그 출력
        });
    });

    // WebSocket 서버에 연결된 모든 클라이언트에게 메시지를 broadcast
    const broadcastMessage = (senderWs, message) => {
        wss.clients.forEach((client) => {
            // 클라이언트가 연결되어 있고, 동일한 roomId를 가진 경우에만 메시지를 보냄
            if (client.readyState === client.OPEN && client.roomId === senderWs.roomId) {
                client.send(JSON.stringify({ event: 'chatMessage', message }));
            }
        });
    };

    return wss;
};
