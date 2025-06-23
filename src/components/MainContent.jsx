import "../App.css";
import { useState, useEffect } from "react";

function MainContent({ children }) {
  // Gathering of standings from MLB API
  const [alDivisions, setAlDivisions] = useState({});
  const [nlDivisions, setNlDivisions] = useState({});

  useEffect(() => {
    async function fetchStandings() {
      try {
        const response = await fetch(
          "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104"
        );
        const data = await response.json();

        const al = {};
        const nl = {};

        const divisionNames = {
          201: "AL East",
          202: "AL Central",
          200: "AL West",
          204: "NL East",
          205: "NL Central",
          203: "NL West",
        };

        data.records.forEach((record) => {
          const divisionName = divisionNames[record.division.id];
          const teams = record.teamRecords.map((team) => ({
            name: team.team.name,
            wins: team.wins,
            losses: team.losses,
          }));

          if (divisionName) {
            if (divisionName.startsWith("AL")) {
              al[divisionName] = teams;
            } else if (divisionName.startsWith("NL")) {
              nl[divisionName] = teams;
            }
          }
        });

        setAlDivisions(al);
        setNlDivisions(nl);
      } catch (error) {
        console.error("Failed to fetch standings:", error);
      }
    }

    fetchStandings();
  }, []);

  return (
    <>
      {/* Main Content including standings and article section */}
      <div className="main-content">
        {/* AL Standings */}
        <aside className="al-standings">
          {Object.entries(alDivisions).map(([divisionName, teams]) => (
            <div key={divisionName} className="division">
              <h3>{divisionName}</h3>
              <ul>
                {teams.map((team) => (
                  <li key={team.name}>
                    {team.name} {team.wins} - {team.losses}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Article Section */}
        <main className="article-section">{children}</main>

        {/* NL Standings */}
        <aside className="nl-standings">
          {Object.entries(nlDivisions).map(([divisionName, teams]) => (
            <div key={divisionName} className="division">
              <h3>{divisionName}</h3>
              <ul>
                {teams.map((team) => (
                  <li key={team.name}>
                    {team.name} {team.wins} - {team.losses}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

export default MainContent;
