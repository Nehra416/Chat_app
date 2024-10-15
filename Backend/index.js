require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Routes...
const UserRoutes = require('./routes/UserRoutes');
const ChatRoutes = require('./routes/ChatRoutes');

app.use('/user', UserRoutes);
app.use('/chat', ChatRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})