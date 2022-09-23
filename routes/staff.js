const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getStaff)
router.get("/todo/:id", todosController.getTodos);
// router.post("/createTodo", todosController.createTodo);

router.put("/todo/markComplete/:id", todosController.markComplete);
router.put("/assignJob/:id", todosController.markComplete);

module.exports = router;
