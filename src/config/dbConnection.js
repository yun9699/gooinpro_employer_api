// MongoDB 연결
const mongoose = require('mongoose');

mongoose.connect('mongodb://gooinprochatdbuser:gooinprochatdbuser@localhost:27017/gooinprochatdb')
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error);
    });

// MariaDB 연결
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'gooinprodbuser',
    password: 'gooinprodbuser',
    database: 'gooinprodb',
    port: 13307
});

connection.connect((err) => {
    if (err) {
        console.error('MariaDB connection failed:', err);
    } else {
        console.log('MariaDB connected successfully!');
    }
});
