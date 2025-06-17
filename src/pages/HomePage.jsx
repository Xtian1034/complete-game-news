import "../App.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import MainContent from "../components/MainContent";

//Admin functionality to be chagned later
const isAdmin = true; //Add functionality for admin access later

function Home() {
  // Allows the functionality of moving to PostSubmission page
  const navigate = useNavigate();
  const goToSubmission = () => {
    navigate("/PostSubmission");
  };

  return (
    <>
      <Header />

      {/* Button to go to Submission Page */}
      <div className="go-to-submission-button">
        {isAdmin && <button onClick={goToSubmission}>Submit an Article</button>}
      </div>
      <MainContent />
    </>
  );
}

export default Home;
