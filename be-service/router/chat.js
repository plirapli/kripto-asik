const express = require('express');
const router = express.Router();
const connection = require('../config/database.js');
const jwt = require('jsonwebtoken');
const getToken = require('../utils/getToken.js');
const crypt = require("crypto-js");
const caesar = require('../utils/caesar');

const key = process.env.TOKEN_SECRET_KEY;
const caesarKey = process.env.CAESAR_SECRET_KEY


// GET /chats
router.get("/", async (req, res) => {
  try {
    let token;
    const header = req.headers;
    const authorization = header.authorization;

    if (authorization !== undefined && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      const error = new Error("Login dulu 😠");
      error.statusCode = 403;
      throw error;
    }

    jwt.verify(token, key)
    const command = `SELECT c.id AS id, msg, is_encrypt, created_at, u.id AS user_id, name FROM chat c INNER JOIN user u ON u.id = sender`;
    const data = await connection.promise().query(command)

    res.status(200).json({
      status: "Success",
      message: 'Successfully get all chats',
      data: data[0]
    })

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    })
  }
})

// POST /chats/decrypt/:id
router.post("/decrypt/:id", async (req, res) => {
  try {
    const token = getToken(req.headers)
    if (token) {
      jwt.verify(token, key)
    } else {
      const error = new Error("Login dulu 😠");
      error.statusCode = 403;
      throw error;
    }

    const { id } = req.params
    const { msgKey } = req.body
    const command = `SELECT msg, passphrase FROM chat WHERE id = ?`;
    const [[{ msg, passphrase }]] = await connection.promise().query(command, id)

    if (msgKey == passphrase) {
      const decryptedCaesar = caesar(msg, 26 - 12) // Didekripsi menggunakan Caesar Cipher
      const decryptedRC4 = crypt.RC4Drop.decrypt(decryptedCaesar, msgKey).toString(crypt.enc.Utf8); // Didekripsi menggunakan RC4 Cipher

      res.status(200).json({
        status: "Success",
        message: 'Chat decrypted',
        data: decryptedRC4
      })
    } else {
      const error = new Error("Kunci tidak valid 😠");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    })
  }
})

module.exports = router;