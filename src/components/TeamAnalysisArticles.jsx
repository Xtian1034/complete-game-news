import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TeamAnalysisArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/by-tag?tag=Team%20Analysis")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched articles:", data);
        setArticles(data);
      })
      .catch((err) => console.error("Error fetching Articles:", err));
  }, []);

  return (
    <div>
      {articles.length === 0 && <p>No Articles Yet.</p>}
      {articles.map((article) => (
        <article key={article.id}>
          <h1>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </h1>
          <p>{article.caption}</p>
          <small>
            {article.author}
            {"  "}
            {new Date(article.created_at).toLocaleDateString()}
          </small>
        </article>
      ))}
    </div>
  );
}
export default TeamAnalysisArticles;
