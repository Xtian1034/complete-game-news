import { useState, useEffect } from "react";

function TeamSelector() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(
          "https://statsapi.mlb.com/api/v1/teams?sportId=1"
        );
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    }

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative", maxWidth: "400px", margin: "auto" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search MLB team..."
        style={{
          width: "15rem",
          height: "1rem",
          border: "1px solid #ccc",
        }}
      />
      {searchTerm && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: "200px",
            margin: 0,
            padding: 0,
            overflowY: "auto",
            color: "black",
            zIndex: 1000,
          }}
        >
          {filteredTeams.map((team) => (
            <li
              key={team.id}
              onClick={() => {
                setSelectedTeam(team);
                setSearchTerm(team.name);
              }}
              style={{
                padding: "5px 12px",
                cursor: "pointer",
                fontSize: "0.9rem",
                backgroundColor:
                  selectedTeam?.id === team.id ? "#cce4ff" : "white",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e6f0ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selectedTeam?.id === team.id ? "#cce4ff" : "white")
              }
            >
              {team.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeamSelector;
