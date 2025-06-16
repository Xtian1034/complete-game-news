import "../App.css";
import Header from "../components/Header";

function PostSubmission() {
  return (
    <>
      <Header />
      <div className="title-text">
        <input
          type="text"
          placeholder="Article Title"
          maxLength={50}
          style={{
            width: "400px",
          }}
        />
      </div>
      <div className="article-text">
        <textarea
          type="text"
          placeholder="Article Body"
          maxLength={5000}
          style={{
            width: "600px",
            height: "300px",
          }}
        />
      </div>
    </>
  );
}

export default PostSubmission;
