const http = require('http');
const { Server } = require('socket.io');

// 1. HTTP Server erstellen
const server = http.createServer();

// 2. Socket.io initialisieren mit CORS-Freigabe für Ihr Angular Frontend
const io = new Server(server, {
    cors: {
        origin: "https://egli.thomas-braendle.com", // Hier Ihre Angular-URL eintragen
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket'] // Erzwingt Websocket für stabilere Verbindung auf Render
});

// 3. Event-Logik (Wer kommuniziert mit wem)
io.on('connection', (socket) => {
    console.log('Mitarbeiter verbunden:', socket.id);

    // Empfängt Nachricht von Angular (z.B. CHAT oder REFRESH_NEWS)
    socket.on('message', (data) => {
        // Verteilt die Nachricht an ALLE anderen verbundenen Clients
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Verbindung getrennt');
    });
});

// 4. WICHTIG: Port-Bindung für Render
// Render vergibt Port 10000. '0.0.0.0' ist zwingend erforderlich!
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Websocket-Server läuft auf Port ${PORT}`);
});