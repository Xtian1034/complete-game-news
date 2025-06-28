import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import bodyParse from "body-parser";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParse.json());

const dbPath = path.resolve("./articles.db");
const db = new sqlite3.Database(dbPath);

//Setting up SQLite database for articles

db.run(`CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  caption TEXT NOT NULL,
  author TEXT NOT NULL,
  tag TEXT NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

//Setting up SQLite database for teams
db.run(`CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
    )`);

//Setting up SQLite database for players
db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
    )`);

//Articles-Team Junction Table (many to many)
db.run(`CREATE TABLE IF NOT EXISTS article_teams(
    article_id INTEGER,
    team_id INTEGER,
    FOREIGN KEY(article_id) REFERENCES articles(id),
    FOREIGN KEY(team_id) REFERENCES teams(id)
    )`);

//Articles-Players Junction Table (many to many)
db.run(`CREATE TABLE IF NOT EXISTS article_players (
    article_id INTEGER,
    player_id INTEGER,
    FOREIGN KEY(article_id) REFERENCES articles(id),
    FOREIGN KEY(player_id) REFERENCES players(id)
    )`);

function cacheTeamsToDB() {
  const data = JSON.parse(fs.readFileSync("./teams.json", "utf-8"));
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO teams (id, name) VALUES  (? , ?)"
  );
  data.forEach((team) => stmt.run(team.id, team.name));
  stmt.finalize();
  console.log("Teams cached into database");
}

function cachePlayersToDB() {
  const data = JSON.parse(fs.readFileSync("./players.json", "utf-8"));
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO players (id, name) VALUES (? , ?)"
  );
  data.forEach((player) => stmt.run(player.id, player.name));
  stmt.finalize();
  console.log("Players cached into database");
}

cacheTeamsToDB();
cachePlayersToDB();

//Endpoint to receive articles
app.post("/api/articles", (req, res) => {
  const { title, text, caption, author, tag, teams, players } = req.body;
  console.log("Recieved articles:", title, text, caption, author, tag);
  db.run(
    `INSERT INTO articles (title, text, caption, author, tag) VALUES (?, ?, ?, ?, ?)`,
    [title, text, caption, author, tag],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      const articleId = this.lastID;

      const insertTeam = db.prepare(
        "INSERT INTO article_teams (article_id, team_id) VALUES (?, ?)"
      );
      teams.forEach((teamId) => {
        insertTeam.run(articleId, teamId);
      });
      insertTeam.finalize();

      const insertPlayer = db.prepare(
        "INSERT INTO article_players (article_id, player_id) VALUES (?, ?)"
      );
      players.forEach((playerId) => {
        insertPlayer.run(articleId, playerId);
      });
      insertPlayer.finalize();

      res.json({ message: "Article Posted!", articleId });
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

//endpoint to fetch teams
app.get("/api/teams", (req, res) => {
  db.all("SELECT * FROM teams ORDER BY name", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//endpoint to fetch players
app.get("/api/players", (req, res) => {
  db.all("SELECT * FROM players ORDER BY name", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//Start server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
