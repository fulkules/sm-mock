require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);

// CONTROLLERS
const ac = require('./controller');
const pc = require('./postCtrl');


// .ENV
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

// MIDDLEWARE
const app = express();

const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
});

app.use(express.json());

app.use(session({
    store: new pgSession({
        pool: pgPool,
        pruneSessionInterval: 60 * 60 * 24
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 }
}));


massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('db is live');
    app.listen(SERVER_PORT, () => console.log(`Port ${SERVER_PORT}, living large!`))
});

// USER ENDPOINTS
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);
app.get('/api/current', ac.getUser);

// POSTS
app.get('/api/posts', pc.getAllPosts);
app.get('/api/post/:id', pc.getPost);
app.post('/api/new', pc.addPost);
app.delete('/api/post/:id', pc.deletePost);
app.put('/api/post/:id', pc.updatePost);