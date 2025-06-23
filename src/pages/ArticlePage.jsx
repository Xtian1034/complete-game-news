import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched article:", data);
        setArticle(data);
      })
      .catch((err) => console.error("Error fetching article:", err));
  }, [id]);

  return (
    <>
      <Header />
      <MainContent>
        {article ? (
          <>
            <div className="article-layout-page">
              <h1>{article.title}</h1>
              <small>
                {article.author} on{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </small>
              <p>{article.text}</p>
            </div>
          </>
        ) : (
          <p>Loading article...</p>
        )}
      </MainContent>
    </>
  );
}

export default ArticlePage;
