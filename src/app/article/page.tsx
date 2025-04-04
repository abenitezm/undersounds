import ArticleView from "@/views/ArticleView";

const ArticlePage: React.FC = () => {
  const metadata = {
    title: "Riffs Brutalistas: Una guía sobre math rock",
    date: "13 de marzo de 2025, por Erick Bradshaw",
    image: "articles/article1.jpg",
  };

  return <ArticleView metadata={metadata} />;
};

export default ArticlePage;
