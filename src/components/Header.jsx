import "../App.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      {/* Complete Game title and Search Bar */}
      <div className="header-top">
        <Link to="/" className="home-link">
          <h1 className="complete-game-title">Complete Game News</h1>
          <img
            src="/images/player.png"
            alt="Pitcher"
            className="pitcher-logo"
          />
        </Link>

        <input
          className="search-bar"
          type="text"
          placeholder="Search players or teams"
        />
      </div>

      {/* Teams, Team Analysis, Player Analysis, Transactions Navigation */}
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
