const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB_FILE = "./db.json";


const readDB = async () => {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData.todos ? parsedData : { todos: [] };
  } catch (err) {
    return console.log(err)
  }
};

// 
const collectData = async (data, res) => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify({ todos: data.todos }, null, 2));
  } catch (err) {
    res.status(500).json({ error: "Failed to write to database" });
  }
};

// Add 
app.post("/item", async (req, res) => {
  const db = await readDB();
  if (!req.body.todos) return res.status(400).json({ error: "Todo is not coming" });

  const newItem = { id: Date.now(), todos: req.body.todos };
  db.todos.push(newItem);
  await collectData(db, res);

  res.json({ message: "Todo added successfully", item: newItem });
});

//  Get 
app.get("/item", async (req, res) => {
  const db = await readDB();
  res.json(db);
});

// Delete
app.delete("/item/:id", async (req, res) => {
  const db = await readDB();
  const newTodos = db.todos.filter((item) => item.id !== Number(req.params.id));

  if (newTodos.length === db.todos.length) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.todos = newTodos;
  await collectData(db, res);
  res.json({ message: "Todo deleted successfully" });
});

//  Update
app.put("/item/:id", async (req, res) => {
  const db = await readDB();
  const item = db.todos.find((item) => item.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (!req.body.todos) return res.status(400).json({ error: "Todo content required" });

  item.todos = req.body.todos;
  await collectData(db, res);

  res.json({ message: "Todo updated successfully", item });
});


app.listen(8080, () => console.log(" Server running on 8080"));
