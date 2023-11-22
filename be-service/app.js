require('dotenv').config();
const express = require('express');
const { Server } = require('socket.io')
const cors = require('cors')
const connection = require('./config/database');
const app = express();
const server = require('http').createServer(app);
const caesar = require('./utils/caesar')
const port = process.env.PORT || '3100';
const caesarKey = process.env.CAESAR_SECRET_KEY

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
  console.log(`User ${socket.id} connected`);

  socket.on('chat', async (msgInfo) => {
    const id = nanoid()
    let { user, msg, key, isEncrypt } = msgInfo

    if (isEncrypt) {
      const { ciphertext } = CryptoJS.RC4Drop.encrypt(msg, key); // Dienkripsi menggunakan RC4 Cipher
      msg = ciphertext
    }
    const caesarEncryptedMsg = caesar(msg, parseInt(caesarKey)) // Dienkripsi menggunakan Caesar Cipher
    msg = caesarEncryptedMsg

    try {
      // Store the message in the database
      const command = `INSERT INTO chat (id, msg, is_encrypt, passphrase, sender) VALUES (?, ?, ?, ?, ?)`;
      const result = await connection.promise().query(command, [id, msg, isEncrypt, key, user]);

      // Ngambil beberapa parameter buat di-emit
      const checkUser = `SELECT created_at, name FROM chat c INNER JOIN user u ON u.id = sender WHERE c.id = ?`;
      const [[{ created_at, name }]] = await connection.promise().query(checkUser, [id]);

      const caesarDecryptedMsg = caesar(msg, parseInt(26 - caesarKey)) // Didekripsi menggunakan Caesar Cipher
      msg = caesarDecryptedMsg

      socket.emit('chat', { id, user_id: user, name, msg, is_encrypt: isEncrypt, created_at });
    } catch (e) {
      // TODO handle the failure
      console.log(e)
      return;
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});
