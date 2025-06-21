import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import PostSubmission from "./pages/PostSubmission";
import TeamAnalysis from "./pages/TeamAnalysis";
import PlayerAnalysis from "./pages/PlayerAnalysis";
import Transactions from "./pages/Transactions";
import Teams from "./pages/Teams";
import Home from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PostSubmission" element={<PostSubmission />} />
        <Route path="/TeamAnalysis" element={<TeamAnalysis />} />
        <Route path="/PlayerAnalysis" element={<PlayerAnalysis />} />
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}
