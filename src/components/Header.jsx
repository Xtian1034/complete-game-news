import "../App.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-top">
        <Link to="/" className="home-link">
          <h1 className="complete-game-title">Complete Game</h1>
        </Link>

        <input
          className="search-bar"
          type="text"
          placeholder="Search players or teams"
        />
      </div>

      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/Teams">Teams</Link>
          </li>
          <li>
            <Link to="/TeamAnalysis">Team Analysis</Link>
          </li>
          <li>
            <Link to="/PlayerAnalysis">Player Analysis</Link>
          </li>
          <li>
            <Link to="/Transactions">Transactions</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
