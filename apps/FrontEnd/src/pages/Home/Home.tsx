import React from "react";
import "./Home.css";
import ArticleCard from "../../components/ArticleCard/ArticleCard.tsx";
import Presentation from "../../components/Presentation/Presentation.tsx";
import ArticleSection from "../../components/ArticleSection/ArticleSection.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import SideArticleCard from "../../components/SideArticleCard/SideArticleCard.tsx";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Presentation />
      <div className="container">
        <div className="main-article">
          <ArticleCard />
        </div>
        <div className="side-articles">
          <SideArticleCard />
        </div>
      </div>
      <div className="side-articles">
        <ArticleSection />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
