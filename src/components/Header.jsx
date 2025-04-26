function Header() {
    return (
        <header className ="site-header">
            <div className = "header-top">
                <h1 className= "complete-game-title"> Complete Game News</h1>
                    <input
                    className = "search-bar"
                    type = "text"
                    placeholder = "Search players or teams"
                    />
            </div> 
        
            <nav className ="main-nav">
                <ul>
                    <li>Teams</li>
                    <li>Team Analysis</li>
                    <li>Player Analysis</li>
                    <li>Transactions</li>
                </ul>
            </nav>

           
        </header>
    )
}

export default Header;