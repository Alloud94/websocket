const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "https://extranet.eglizimmerei.ch",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Ein Benutzer ist verbunden');

    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('backend_update', (data) => {
        io.emit('refresh_data', data);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});