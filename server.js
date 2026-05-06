const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // Erlaubt den Zugriff von Ihrer Angular-PWA
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  // Wenn Angular oder PHP eine Nachricht schickt:
  socket.on('message', (msg) => {
    // Sende sie an ALLE verbundenen Clients weiter
    io.emit('message', msg);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});