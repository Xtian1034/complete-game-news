import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import bodyParse from "body-parser";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParse.json());

const dbPath = path.resolve("./articles.db");

//Setting up SQLite database
const db = new sqlite3.Database(dbPath);
db.run(`CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  caption TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

//Endpoint to receive articles
app.post("/api/articles", (req, res) => {
  const { title, text, caption, author } = req.body;
  console.log("Recieved articles:", title, text, caption);
  db.run(
    `INSERT INTO articles (title, text, caption, author) VALUES (?, ?, ?, ?)`,
    [title, text, caption, author],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Article posted", articleId: this.lastID });
    }
  );
});

//Endpoint to fetch articles
app.get("/api/articles", (req, res) => {
  db.all("SELECT * FROM articles ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("SELECT * FROM articles WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
