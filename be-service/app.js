require('dotenv').config();
const express = require('express');
const { join } = require('node:path');
const { Server } = require('socket.io')
const cors = require('cors')
const connection = require('./config/database');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || '3100';

server.listen(port, () => {
  console.log('Server Connected on: http://localhost:' + port);
});

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
  },
});

const userRouter = require('./router/user');
const chatRouter = require('./router/chat');
const fileRouter = require('./router/file');
const { nanoid } = require('nanoid');

app.use(cors())
app.use(express.json());
app.use('/v1/users', userRouter);
app.use('/v1/files/', fileRouter)
app.use('/v1/chats/', chatRouter)
app.use(express.static('public'))

io.on('connection', async (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('chat', async (msgInfo) => {
    const id = nanoid()
    const { user, msg, key, isEncrypt } = msgInfo

    try {
      // Store the message in the database
      const command = `INSERT INTO chat (id, msg, is_encrypt, passphrase, sender) VALUES (?, ?, ?, ?, ?)`;
      const result = await connection.promise().query(command, [id, msg, isEncrypt, key, user]);

      const checkUser = `SELECT created_at, name FROM chat c INNER JOIN user u ON u.id = sender WHERE c.id = ?`;
      const [[{ created_at, name }]] = await connection.promise().query(checkUser, [id]);

      socket.emit('chat', { id, user_id: user, name, msg, is_encrypt: isEncrypt, created_at });
    } catch (e) {
      // TODO handle the failure
      console.log(e)
      return;
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
