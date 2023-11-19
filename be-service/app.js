require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const cors = require('cors')
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || '3100';

const httpServer = app.listen(port, () => {
  console.log('Server Connected on: http://localhost:' + port);
});

const io = new Server(httpServer, {
  connectionStateRecovery: {}
});
const usersRouter = require('./router/user');
const filesRouter = require('./router/file')

app.use(cors())
app.use(express.json());
app.use('/v1/users', usersRouter);
app.use('/v1/files/', filesRouter)
app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.sendFile(join(`${__dirname}/client`, 'index.html'));
// });

// io.on('connection', async (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//   });

//   socket.on('chat message', async (msg) => {
//     let insertedId;
//     try {

//       // store the message in the database
//       const command = `INSERT INTO pesan (isi) VALUES (?)`;
//       const result = await connection.promise().query(command, [msg]);
//       insertedId = result[0].insertId
//     } catch (e) {
//       // TODO handle the failure
//       return;
//     }

//     // include the offset with the message
//     io.emit('chat message', msg, insertedId);
//   });

//   if (!socket.recovered) {
//     // if the connection state recovery was not successful
//     try {
//       const command = `SELECT id, isi FROM pesan WHERE id > ?`;
//       const data = await connection.promise().query(
//         command,
//         [socket.handshake.auth.serverOffset || 0]
//       );

//       data[0].forEach((row) => {
//         socket.emit('chat message', row.isi, row.id);
//       })
//     } catch (e) {
//       return
//       // something went wrong
//     }
//   }
// });
