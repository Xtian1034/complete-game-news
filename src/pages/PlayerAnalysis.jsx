import "../App.css";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import PlayerAnalysisArticles from "../components/PlayerAnalysisArticles";

function PlayerAnalysis() {
  return (
    <>
      <Header />
      <MainContent>
        <PlayerAnalysisArticles />
      </MainContent>
    </>
  );
}

export default PlayerAnalysis;
