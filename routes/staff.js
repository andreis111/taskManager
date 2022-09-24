const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, tasksController.getStaff)
router.get("/todo/:id", tasksController.getTasks);
// router.post("/createTodo", todosController.createTodo);

router.put("/todo/markComplete/:id", tasksController.markComplete);
router.put("/assignJob/:id", tasksController.assignJob);

module.exports = router;
