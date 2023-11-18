const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Socket
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        socket.broadcast.emit('message', msg);
    });
});
