var express = require("express");
var router = express.Router();

const db = require("../db/todos");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const todos = await db.getTodos();
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).json({ message: "No todos found" });
  }
});

// GET /todos/:id
router.get("/:id", async function (req, res, next) {
  const todo = await db.getTodo(req.params.id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "No todo found" });
  }
});

// POST /todos
router.post("/", async function (req, res, next) {
  // check if title and description are provided
  if (!req.body.title || !req.body.description) {
    res.status(400).json({ message: "Title and description are required" });
  }

  const todo = await db.createTodo(req.body.title, req.body.description);
  console.log(req);

  if (todo) {
    res.status(201).json({ id: todo[0] });
  } else {
    res.status(500).json({ message: "Error creating todo" });
  }
});

// delete /todos/:id
router.delete("/:id", async function (req, res, next) {
  // check if id is provided
  if (!req.params.id) {
    res.status(400).json({ message: "Id is required" });
  }
  //if id is < 3 not allowed to delete
  if (req.params.id < 2) {
    res.status(400).json({ message: "Id must be greater than 2" });
  }

  const todo = await db.deleteTodo(req.params.id);
  if (todo) {
    res.status(200).json({ id: parseInt(req.params.id) });
  } else {
    res.status(404).json({ message: "No todo found" });
  }
});

module.exports = router;
