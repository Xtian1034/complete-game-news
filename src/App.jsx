import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import PostSubmission from "./pages/PostSubmission";
import Home from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<PostSubmission />} />
      </Routes>
    </Router>
  );
}
