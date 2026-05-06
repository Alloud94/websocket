const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
    cors: {
        // Falls Angular noch auf localhost läuft, muss das hier stehen.
        // Im produktiven Betrieb hier die URL Ihrer PWA eintragen.
        origin: ["http://localhost:4200", "https://extranet.eglizimmerei.ch", "https://intranet.eglizimmerei.ch", "https://egli.thomas-braendle.com"],
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'] // Erlaubt Fallback, falls wss blockiert wird
});

io.on('connection', (socket) => {
    console.log('Client verbunden:', socket.id);

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client getrennt');
    });
});

// WICHTIG: Render vergibt den Port 10000 automatisch via process.env.PORT
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf Port ${port}`);
});