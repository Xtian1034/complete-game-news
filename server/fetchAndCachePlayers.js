import fs from "fs";
import fetch from "node-fetch";

async function fetchAndCachePlayers() {
  const TeamsRes = await fetch(
    "https://statsapi.mlb.com/api/v1/teams?sportId=1"
  );
  const { teams } = await TeamsRes.json();

  const allRosters = await Promise.all(
    teams.map(async (team) => {
      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/teams/${team.id}/roster/40Man`
      );
      const { roster } = await res.json();
      return roster.map((entry) => ({
        id: entry.person.id,
        name: entry.person.fullName,
        team: team.name,
        teamId: team.id,
      }));
    })
  );

  const allPlayers = allRosters.flat();

  fs.writeFileSync("./players.json", JSON.stringify(allPlayers, null, 2));
  console.log("Cached players to players.json");
}

fetchAndCachePlayers();
