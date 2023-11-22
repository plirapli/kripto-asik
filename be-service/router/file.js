require('dotenv').config();
const router = require('express').Router();
const connection = require('../config/database.js');
const { nanoid } = require('nanoid')
const jwt = require('jsonwebtoken');
const { upload, uploadKey } = require('../middleware/uploadFiles')
const fs = require('fs');
const path = require('path')
const crypt = require("crypto-js");
const getToken = require('../utils/getToken.js');

const tokenKey = process.env.TOKEN_SECRET_KEY;

// Upload and encrypt images
router.post("/", upload, async (req, res) => {
  try {
    const token = getToken(req.headers)
    if (token) {
      jwt.verify(token, tokenKey)
    } else {
      const error = new Error("Login dulu 😠");
      error.statusCode = 403;
      throw error;
    }

    if (req.file) {
      const key = process.env.AES_SECRET_KEY;
      const id = nanoid()
      const filePath = path.join(process.cwd(), 'uploaded_files/')
      const file = req.file;

      const encoded = fs.readFileSync(filePath + file.filename, { encoding: 'base64' });
      const base64String = 'data:image/png;base64,' + encoded;

      const ciphertext = crypt.AES.encrypt(base64String, key).toString(); // Encrypt
      const inserCommand = `INSERT INTO file VALUES (?, ?)`;
      await connection.promise().query(inserCommand, [id, ciphertext]);

      const keyFileName = 'key-' + id + '.bagus'
      fs.appendFile('public/' + keyFileName, ciphertext, (err) => {
        if (err) throw new Error('Gagal menyimpan file. ❌');
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

router.post("/key", uploadKey, async (req, res) => {
  const token = getToken(req.headers)
  if (token) {
    jwt.verify(token, tokenKey)
  } else {
    const error = new Error("Login dulu 😠");
    error.statusCode = 403;
    throw error;
  }

  try {
    if (req.file) {
      const key = process.env.AES_SECRET_KEY;
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

router.delete('/key', async (req, res) => {
  const token = getToken(req.headers)
  if (token) {
    jwt.verify(token, tokenKey)
  } else {
    const error = new Error("Login dulu 😠");
    error.statusCode = 403;
    throw error;
  }

  try {
    // Delete file yang udah diupload ke server public
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
})

module.exports = router;