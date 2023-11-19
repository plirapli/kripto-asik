require('dotenv').config();
const router = require('express').Router();
const connection = require('../config/database.js');

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = process.env.TOKEN_SECRET_KEY;

const { upload, uploadKey } = require('../middleware/uploadFiles')
const fs = require('fs');
const path = require('path')
const crypt = require("crypto-js");

// Register new User
router.post("/upload", upload, async (req, res, next) => {
  try {
    if (req.file) {
      const key = process.env.AES_SECRET_KEY;
      const id = nanoid()
      const filePath = path.join(process.cwd(), 'uploaded_files/')
      const file = req.file;

      const encoded = fs.readFileSync(filePath + file.filename, { encoding: 'base64' });
      const base64String = 'data:image/png;base64,' + encoded;

      fs.appendFile('public/base64/' + Date.now() + '.txt', base64String, (err) => {
        if (err) throw err;
        console.log('Saved!');
      });

      const ciphertext = crypt.AES.encrypt(base64String, key).toString(); // Encrypt
      const bytes = crypt.AES.decrypt(ciphertext, key); // Decrypt
      const originalText = bytes.toString(crypt.enc.Utf8);

      // Insert data ke tabel User
      const inserCommand = `INSERT INTO file VALUES (?, ?)`;
      await connection.promise().query(inserCommand, [id, ciphertext]);

      const keyFileName = 'key-' + id + '.bagus'
      fs.appendFile('public/' + keyFileName, ciphertext, (err) => {
        if (err) throw err;
        console.log('Saved!');
      });

      // Send response
      res.status(201).json({
        status: "Success",
        message: "Image uploaded",
        data: {
          filename: file.originalname,
          keyURL: 'http://localhost:3002/' + keyFileName
        }
      })
    } else {
      const error = new Error('Upload gambarnya dulu 😠')
      error.statusCode = 400
      throw error;
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
});

router.post("/upload-key", uploadKey, async (req, res, next) => {
  try {
    if (req.file) {
      const key = process.env.AES_SECRET_KEY;
      const id = nanoid()
      const filePath = path.join(process.cwd(), 'uploaded_key/')
      const file = req.file;

      const bufferString = fs.readFileSync(filePath + file.filename).toString();

      // Insert data ke tabel User
      const checkCommand = `SELECT * FROM file WHERE image = ?`;
      const [[checkImg]] = await connection.promise().query(checkCommand, [bufferString]);

      if (checkImg) {
        const bytes = crypt.AES.decrypt(bufferString, key); // Decrypt
        const originalText = bytes.toString(crypt.enc.Utf8);

        // Send response
        res.status(201).json({
          status: "Success",
          message: "Image decrypted",
          data: originalText
        })
      } else {
        const error = new Error('Kunci tidak valid 😥')
        error.statusCode = 400
        throw error;
      }

      // const keyFileName = 'key-' + id + '.bagus'
      // fs.appendFile('public/' + keyFileName, ciphertext, (err) => {
      //   if (err) throw err;
      //   console.log('Saved!');
      // });

    } else {
      const error = new Error('Upload gambarnya dulu 😠')
      error.statusCode = 400
      throw error;
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
});

module.exports = router;