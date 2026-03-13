const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Povolí přístup z tvého GitHub Pages
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Uživatel připojen:', socket.id);

  socket.on('hand_state', (data) => {
    // Přeposlání informace o plácnutí všem ostatním
    socket.broadcast.emit('hand_state', data);
  });

  socket.on('disconnect', () => {
    console.log('Uživatel odpojen');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
