import { useState, useEffect } from "react";

function PlayerSelector({ selectedPlayers, setSelectedPlayers }) {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("http://localhost:3000/api/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    }

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedPlayers.some((t) => t.id === player.id) // prevent already selected
  );

  const handleSelectPlayer = (player) => {
    setSelectedPlayers((prev) => [...prev, player]);
    setSearchTerm("");
  };

  const handleRemovePlayer = (id) => {
    setSelectedPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  return (
    <div style={{ position: "relative", maxWidth: "400px", margin: "auto" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Player..."
        style={{
          width: "15rem",
          height: "1rem",
          border: "1px solid #ccc",
          padding: "4px",
        }}
      />

      {searchTerm && filteredPlayers.length > 0 && (
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
          {filteredPlayers.map((player) => (
            <li
              key={player.id}
              onClick={() => handleSelectPlayer(player)}
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
              {player.name}
            </li>
          ))}
        </ul>
      )}

      {/* Display selected players as tags */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {selectedPlayers.map((player) => (
          <div
            key={player.id}
            style={{
              backgroundColor: "rgba(218, 122, 54, 1)",
              padding: "4px 8px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              fontSize: "0.85rem",
            }}
          >
            {player.name}
            <button
              onClick={() => handleRemovePlayer(player.id)}
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

export default PlayerSelector;
