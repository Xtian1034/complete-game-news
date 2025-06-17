import "../App.css";
import { useState, useEffect } from "react";

function RecentArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      {articles.length === 0 && <p>No Articles Yet.</p>}
      {articles.map((article) => (
        <article key={article.id}>
          <h3>
            {article.title}
            <p>{article.content}</p>
            <small>
              Posted on:{" "}
              {article.created_at
                ? new Date(article.created_at).toLocaleString()
                : "Unknown date"}
            </small>
          </h3>
        </article>
      ))}
    </div>
  );
}
export default RecentArticles;
