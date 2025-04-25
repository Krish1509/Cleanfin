/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// StaticPage.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRequest } from "../../service/fetch-services";
import "./StaticPage.css";

const StaticPage = () => {
  const { pageName } = useParams();
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await postRequest("static-pages/detail", { pageName }, false);
      const { page } = result;
      setPageContent(page);
    } catch (err) {
      console.log(err);
      setError("Failed to load page content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageName]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={fetchData} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="static-page-container">
      <h1 className="static-page-title">{pageContent?.pageName?.replace(/-/g, " ")}</h1>
      <div className="static-page-content" dangerouslySetInnerHTML={{ __html: pageContent?.content }} />
    </div>
  );
};

export default StaticPage;
