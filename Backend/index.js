require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB database 
const DbConnection = require('./config/DbConnection');
DbConnection();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent 
    }
));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listening for a 'message' event
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast message to other clients
        io.emit('message', data);
    });

});

// Routes...
const UserRoutes = require('./routes/UserRoutes');
const ChatRoutes = require('./routes/ChatRoutes');

app.use('/user', UserRoutes);
app.use('/chat', ChatRoutes);


// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})