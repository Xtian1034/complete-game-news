import "../App.css";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContent from "../components/MainContent";

const isAdmin = true; //Add functionality for admin access later

function Home() {
  const navigate = useNavigate();
  const goToSubmission = () => {
    navigate("/PostSubmission");
  };

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
      <Header />

      <div className="submit-article-button">
        {isAdmin && <button onClick={goToSubmission}>Submit an Article</button>}
      </div>
      <MainContent />
    </>
  );
}

export default Home;
