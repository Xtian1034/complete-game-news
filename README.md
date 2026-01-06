# Complete Game News

A baseball-focused full-stack web app: **React + Vite** frontend with a **Node/Express + SQLite** backend for storing and serving articles, plus cached MLB team/player data (via the MLB Stats API)

This repo is designed as a portfolio that demonstrates:

- Modern react routing + component structure
- a simple REST API (Express)
- Persistent Storage (SQLite)
- Working with real sports data (MLB Stats API)

---

# Intent

The idea is a "baseball news hub" site where you can:

- Read articles
- Browse by category/tag (Team Analysis / Player Analysis / Transactions)
- Eventually attach articles to specific teams/players
- Use cached MLB team and player data, so the UI has dropdowns and the backend has stable IDs

---

# Tech Stack

**Frontend**

- React (React 19)
- Vite
- React Router ('react-router-dom')

**Backend**

- Express (v5)
- SQLite ('sqlite3')
- 'node-fetch' (used in caching scripts)
- CORS + body parsing

---

# Repo Structure

```txt
complete-game-news/
  src/                    # React app (pages + components)
  public/                 # static assets
  server/
    server.js             # Express API + SQLite table setup
    articles.db           # SQLite DB (articles + teams + players + junction tables)
    teams.json            # cached teams from MLB Stats API
    players.json          # cached players from MLB Stats API (40-man rosters)
    fetchAndCacheTeams    # script to refresh teams.json
    fetchAndCachePlayers.js # script to refresh players.json
```
