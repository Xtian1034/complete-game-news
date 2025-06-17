import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import bodyParse from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParse.json());

//Setting up SQLite database
const db = new sqlite3.Database("./articles.db");
db.run(`CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

//Endpoint to receive articles
app.post("/api/articles", (req, res) => {
  const { title, content } = req.body;
  db.run(
    `INSERT INTO articles (title, content) VALUES (?, ?)`,
    [title, content],
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

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
