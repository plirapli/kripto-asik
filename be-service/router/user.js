const router = require('express').Router();
const connection = require('../config/database.js');

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