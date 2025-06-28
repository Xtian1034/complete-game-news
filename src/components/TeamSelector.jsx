import { useState, useEffect } from "react";

function TeamSelector() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("http://localhost:3000/api/teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    }

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTeams.some((t) => t.id === team.id) // prevent already selected
  );

  const handleSelectTeam = (team) => {
    setSelectedTeams((prev) => [...prev, team]);
    setSearchTerm("");
  };

  const handleRemoveTeam = (id) => {
    setSelectedTeams((prev) => prev.filter((team) => team.id !== id));
  };

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
          padding: "4px",
        }}
      />

      {searchTerm && filteredTeams.length > 0 && (
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
            background: "white",
            zIndex: 1000,
            listStyle: "none",
            border: "1px solid #ccc",
          }}
        >
          {filteredTeams.map((team) => (
            <li
              key={team.id}
              onClick={() => handleSelectTeam(team)}
              style={{
                padding: "5px 12px",
                cursor: "pointer",
                fontSize: "0.9rem",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e6f0ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {team.name}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected teams as tags */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {selectedTeams.map((team) => (
          <div
            key={team.id}
            style={{
              backgroundColor: "rgba(218, 122, 54, 1)",
              padding: "4px 8px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              fontSize: "0.85rem",
            }}
          >
            {team.name}
            <button
              onClick={() => handleRemoveTeam(team.id)}
              style={{
                marginLeft: "6px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamSelector;
