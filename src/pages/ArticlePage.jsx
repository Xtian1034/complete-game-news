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
            <h1>{article.title}</h1>
            <div>{article.text}</div>
          </>
        ) : (
          <p>Loading article...</p>
        )}
      </MainContent>
    </>
  );
}

export default ArticlePage;
