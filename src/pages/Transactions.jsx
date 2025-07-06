import "../App.css";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import TransactionArticles from "../components/TransactionArticles";

function Transactions() {
  return (
    <>
      <Header />
      <MainContent>
        <TransactionArticles />
      </MainContent>
    </>
  );
}

export default Transactions;
