require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

// CONTROLLERS


// ENV
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

// MIDDLEWARE
const app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 48
    }
}))

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('db live');
    app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT}, living large!`))
})