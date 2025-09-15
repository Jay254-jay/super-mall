// database/connection.js
const mysql2 = require("mysql2");
require('dotenv').config(); // Load environment variables from .env file

let connectionParams;

// Use flag to toggle between localhost and server configurations
const useLocalhost = process.env.USE_LOCALHOST === 'true';


if (useLocalhost) {
    console.log("Inside local")
    connectionParams = {
        user: "root",
        host: "127.0.0.1",
        password: "Mwangi254.",
        database: "e_commerce",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
} else {
    connectionParams = {
        user: process.env.DB_SERVER_USER,
        host: process.env.DB_SERVER_HOST,
        password: process.env.DB_SERVER_PASSWORD,
        database: process.env.DB_SERVER_DATABASE,
    };
}



const pool = mysql2.createConnection(connectionParams);

pool.connect((err) => {
    if (err) console.log(err.message);
    else console.log("DB Connection Done")
});

// Export the pool
module.exports = pool;