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
      {articles.length === 0 && <p>No Articles Yet.</p>}
      {articles.map((article) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.caption}</p>
        </article>
      ))}
    </div>
  );
}
export default RecentArticles;
