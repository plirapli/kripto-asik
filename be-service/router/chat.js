const express = require('express');
const router = express.Router();
const connection = require('../config/database.js');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;

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

module.exports = router;