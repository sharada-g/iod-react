const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "./cwc.sqlite3",
  },
});

connectedKnex.schema
  .createTableIfNotExists("todo", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("description");
  })
  .then(() => {
    console.log("Table created");
  })
  .catch((err) => {
    console.log(err);
  });

// if no data in todo table, insert data
connectedKnex("todo")
  .count("* as count")
  .then(([{ count }]) => {
    if (count === 0) {
      connectedKnex("todo")
        .insert({
          title: "Learn Node.js",
          description: "Learn Node.js by building a todo app",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connectedKnex;
