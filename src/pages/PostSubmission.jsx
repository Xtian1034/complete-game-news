import "../App.css";
import Header from "../components/Header";
import { useState } from "react";
import OptionButtons from "../components/OptionButtons";
import TeamSelector from "../components/TeamSelector";

function PostSubmission() {
  //Creating handle submit for posting articles
  const [articletitle, setArticleTitle] = useState("");
  const [articletext, setArticleText] = useState("");
  const [articlecaption, setArticleCaption] = useState("");
  const [author, SetAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: articletitle,
          text: articletext,
          caption: articlecaption,
          author: author,
        }),
      });
      if (!res.ok) throw new Error("Failed to post article");
      alert("Article Submitted!");
      setArticleTitle("");
      setArticleText("");
      setArticleCaption("");
      SetAuthor("");
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
              value={articletitle}
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
              value={articlecaption}
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
              value={author}
              onChange={(e) => SetAuthor(e.target.value)}
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
              value={articletext}
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
            <OptionButtons />
          </div>
          {/*Team Selector drop down */}
          <div className="team-selector">
            <TeamSelector />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostSubmission;
