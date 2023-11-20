require('dotenv').config();
const router = require('express').Router();
const connection = require('../config/database.js');

const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_SECRET_KEY;

// GET /users
router.get("/", async (req, res) => {
  try {
    const command = `SELECT * FROM user`;
    const data = await connection.promise().query(command)
    res.status(200).json({
      status: "Success",
      message: 'Successfully get all users',
      data: data[0]
    })
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

// GET user own profile (users/profile)
router.get('/profile', async (req, res, next) => {
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

    const data = jwt.verify(token, key);

    res.status(200).json({
      status: "Success",
      message: "Successfully get profile",
      data
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
})

// GET /users/:id
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const command = `SELECT * FROM user WHERE username = ?`;
    const [[user]] = await connection.promise().query(command, [username])
    if (user === undefined) {
      res.status(400).json({
        status: "Error",
        message: `Username ${username} does not exist!`
      })
    }
    res.status(200).json({
      status: "Success",
      message: 'Successfully get user by username (' + username + ')',
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

// Register new User
router.post("/register", async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = nanoid()

    // Cek apakah username udah ada atau engga
    const checkCommand = `SELECT id FROM user WHERE username = ?`;
    const [[checkId]] = await connection.promise().query(checkCommand, [username])

    if (checkId) {
      const error = new Error(`Username ${username} already exist!`);
      error.statusCode = 400;
      throw error;
    }

    // Insert data ke tabel User
    const inserCommand = `INSERT INTO user VALUES (?, ?, ?, ?)`;
    await connection.promise().query(inserCommand, [id, name, username, hashedPassword]);

    // Send response
    res.status(201).json({
      status: "Success",
      message: "Register Successful",
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Cek user ada apa engga
    const checkCommand = `SELECT * FROM user WHERE username = ?`;
    const [[user]] = await connection.promise().query(checkCommand, [username])

    if (!user) {
      const error = new Error("Wrong email or password");
      error.statusCode = 400;
      throw error;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    // Apabila password salah
    if (!checkPassword) {
      const error = new Error("Wrong email or password");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign({
      id: user.id,
      name: user.name,
      username: user.username
    }, key, {
      algorithm: "HS256",
      expiresIn: "3d"
    })

    res.status(200).json({
      status: "Success",
      message: "Login Successful",
      token
    })

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message
    })
  }
});


/*
// POST /todp
router.post("/", async (req, res, next) => {
  try {
    const { judul, isi } = req.body;
    const command = `INSERT INTO todo (judul, isi) VALUES (?, ?)`;
    const [{ insertId }] = await connection.promise().query(command, [judul, isi]);

    res.status(201).json({
      status: "Success",
      message: "Successfully create todo",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err,
    });
  }
})

// PUT /todo/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi } = req.body;
    const command = `UPDATE todo SET judul = ?, isi = ? WHERE id = ?`
    const update = await connection.promise().query(command, [judul, isi, id]);

    res.status(200).json({
      status: "Success",
      message: "Successfully update todo",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err,
    });
  }
});

// DELETE /todo/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const command = `DELETE FROM todo WHERE id=?`;
    const update = await connection.promise().query(command, [id]);

    res.status(200).json({
      status: "Success",
      message: "Successfully delete todo",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err,
    });
  }
});
*/



module.exports = router;