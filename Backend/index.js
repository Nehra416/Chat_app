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
        origin: '*',
        credentials: true,
    }
));

// Routes...
const UserRoutes = require('./routes/UserRoutes');

app.use('/user', UserRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})