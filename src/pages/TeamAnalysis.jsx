import "../App.css";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import TeamAnalysisArticles from "../components/TeamAnalysisArticles";

function TeamAnalysis() {
  return (
    <>
      <Header />
      <MainContent>
        <TeamAnalysisArticles />
      </MainContent>
    </>
  );
}

export default TeamAnalysis;
