/** @format */

import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import ListArticles from "./components/TestPostman";
import Pagination from "./components/Pagination";
import { BASE_URL, PAGINATION } from "./constants";
import api from "./configApi";

// import ColorBox from "./components/ColorBox";
function App() {
  const [listArticle, setListArticle] = useState([]);
  const [pagination, setPagination] = useState({
    offset: PAGINATION.PAGE,
    limit: PAGINATION.LIMIT,
    articleCount: PAGINATION.TOTAL_RECORD,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckRenderFavorite, setIsCheckRenderFavorite] = useState(false);

  useEffect(() => {
    async function fetchArticleList() {
      setIsLoading(true);
      try {
        const requestUrl = `/articles/?limit=${PAGINATION.LIMIT}&offset=${pagination.offset}`;
        console.log("api", api.head);
        const response = await api.get(requestUrl);

        setIsLoading(false);

        setListArticle(response?.data?.articles);
        setPagination({
          ...pagination,
          articleCount: response?.data?.articlesCount,
        });
      } catch (error) {
        //Không data
        // setListArticle([]);
        setIsLoading(false);
        setListArticle((pre) => (pre = [])); //ưu tiên viết cách này hơn
        setPagination({
          ...pagination,
          articleCount: PAGINATION.TOTAL_RECORD,
        });
        console.log("Failed to call data!", error.message);
      }
    }
    fetchArticleList();
  }, [pagination.offset, isCheckRenderFavorite]);

  function handlePageChange(newPage) {
    setPagination({
      ...pagination,
      offset: newPage,
    });
  }

  const handleUpdateFavorite = () => {
    setIsCheckRenderFavorite((pre) => !pre);
  };

  return (
    <div className='app'>
      <h1>Article List - Postman</h1>
      {isLoading ? (
        <h2>Fetching data ...</h2>
      ) : (
        <ListArticles
          list={listArticle}
          setIsCheckRenderFavorite={handleUpdateFavorite}
        />
      )}

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
