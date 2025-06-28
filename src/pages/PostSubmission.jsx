import "../App.css";
import Header from "../components/Header";
import { useState } from "react";
import OptionButtons from "../components/OptionButtons";
import TeamSelector from "../components/TeamSelector";
import PlayerSelector from "../components/PlayerSelector";

function PostSubmission() {
  //Creating handle submit for posting articles
  const [articleTitle, setArticleTitle] = useState("");
  const [articleText, setArticleText] = useState("");
  const [articleCaption, setArticleCaption] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleTag, setArticleTag] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: articleTitle,
          text: articleText,
          caption: articleCaption,
          author: articleAuthor,
          tag: articleTag,
          teams: selectedTeams.map((t) => t.id),
          players: selectedPlayers.map((p) => p.id),
        }),
      });
      if (!res.ok) throw new Error("Failed to post article");
      alert("Article Submitted!");
      setArticleTitle("");
      setArticleText("");
      setArticleCaption("");
      setArticleAuthor("");
      setArticleTag("");
      setSelectedTeams([]);
      setSelectedPlayers([]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="post-submission-wrapper">
        <div className="post-submission-centered">
          {/* Article title box */}
          <div className="title-text">
            <input
              type="text"
              placeholder="Article Title"
              maxLength={50}
              style={{
                width: "400px",
              }}
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
            />
          </div>
          {/* Article captain box */}
          <div className="caption-text">
            <input
              type="text"
              placeholder="Article Caption"
              maxLength={100}
              style={{
                width: "400px",
              }}
              value={articleCaption}
              onChange={(e) => setArticleCaption(e.target.value)}
            />
          </div>
          {/* Author name text box */}
          <div className="author-text">
            <input
              type="text"
              placeholder="Author Name"
              maxLength={50}
              style={{
                width: "400px",
              }}
              value={articleAuthor}
              onChange={(e) => setArticleAuthor(e.target.value)}
            />
          </div>
          {/* Article body text box */}
          <div className="article-text">
            <textarea
              type="text"
              placeholder="Article Body"
              maxLength={5000}
              style={{
                width: "600px",
                height: "300px",
              }}
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div className="submit-button">
            <form onSubmit={handleSubmit}>
              <button>Submit Article</button>
            </form>
          </div>
        </div>
        <div className="right-sidebar">
          {/*Options Button*/}
          <div className="option-buttons">
            <OptionButtons
              selectedOption={articleTag}
              setSelectedOption={setArticleTag}
            />
          </div>
          {/*Team Selector drop down */}
          <div className="team-selector">
            <TeamSelector
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
            />
          </div>

          {/*Playor Selector drop down */}
          <div className="player-selector">
            <PlayerSelector
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostSubmission;
