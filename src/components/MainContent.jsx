import "../App.css";
import { useState, useEffect } from "react";

function MainContent() {
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
        <main className="article-section">
          <div className="cover-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6YzANn7Tjd45M_OIEpJF0MODJ2JuJ8BSuw&s"
              alt="Article cover"
            />
          </div>
          <article>
            <h2>Yankees Rally Past Red Sox in Thrilling Game</h2>
            <p>
              The New York Yankees overcame a late-game deficit to defeat the
              Boston Red Sox 6-4, thanks to a clutch home run by Aaron Judge.
            </p>
          </article>
          <article>
            <h2>Top Players to Watch This Season</h2>
            <p>
              Here’s a breakdown of the top players to watch this season in the
              MLB — from young stars to seasoned veterans.
            </p>
          </article>
          <article>
            <h2>Soto Trade Rumors Heat Up</h2>
            <p>
              With the trade deadline approaching, Juan Soto has been the
              subject of rumors linking him to multiple teams across the league.
            </p>
          </article>
        </main>

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
