const knex = require("./knex");

function createTodo(title, description) {
  return knex("todo")
    .insert({
      title: title,
      description: description,
    })
    .returning("id", "title", "description");
}

function getTodos() {
  return knex("todo")
    .select("id", "title", "description")
    .orderBy("id", "desc");
}

function getTodo(id) {
  return knex("todo")
    .select("id", "title", "description")
    .where("id", id)
    .first();
}

function updateTodo(id, title, description) {
  return knex("todo")
    .where("id", id)
    .update({
      title: title,
      description: description,
    })
    .returning("id", "title", "description");
}

function deleteTodo(id) {
  return knex("todo").where("id", id).del().returning("id");
}

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
