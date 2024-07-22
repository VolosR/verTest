const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

function getRandomNumbers() {
    let numbers = [];
    while (numbers.length < 6) {
        let num = Math.floor(Math.random() * 50) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

server.on('connection', (socket) => {
    console.log('Client connected');

    const interval = setInterval(() => {
        const numbers = getRandomNumbers();
        socket.send(JSON.stringify(numbers));
    }, 30000); // 180000 ms = 3 minutes

    socket.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started on ws://localhost:8080');
