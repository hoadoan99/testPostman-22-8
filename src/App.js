/** @format */

import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import ListArticles from "./components/TestPostman";
import Pagination from "./components/Pagination";
import { BASE_URL, PAGINATION } from "./constant";

// import ColorBox from "./components/ColorBox";
function App() {
  const [listArticle, setListArticle] = useState([]);
  const [pagination, setPagination] = useState({
    offset: PAGINATION.OFFSET,
    limit: PAGINATION.LIMIT,
    articleCount: PAGINATION.TOTALPAGE,
  });
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchArticleList = async function () {
      setIsLoad(true);
      try {
        // const paramsString = queryString.stringify(filter);
        const requestUrl = `${BASE_URL}/articles/?limit=${pagination.limit}&offset=${pagination.offset}`;
        const response = await fetch(requestUrl);
        setIsLoad(false);
        const responseJSON = await response.json();

        const { articles } = responseJSON;
        if (articles?.length) {
          setListArticle(articles);
          setPagination({
            ...pagination,
            articleCount: articles.length,
          });
          return;
        }

        setListArticle([]);
        setPagination({
          ...pagination,
          articleCount: PAGINATION.TOTALPAGE,
        });
      } catch (error) {
        setIsLoad(false);
        setListArticle([]);
        setPagination({
          ...pagination,
          offset: PAGINATION.OFFSET,
          limit: PAGINATION.LIMIT,
          articleCount: PAGINATION.TOTALPAGE,
        });
        console.log("Failed to call data!", error.message);
      }
    };
    fetchArticleList();
  }, [pagination.offset]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const paramsString = queryString.stringify(filter);
  //     const requestUrl = `https://api.realworld.io/api/articles/?${paramsString}`;
  //     const data = await axios.get(requestUrl);
  //     const pagination = await axios.get(requestUrl);
  //     setListArticle(data.data.articles);
  //     setPagination(pagination);
  //   };
  //   getData();
  // }, [filter]);
  function handlePageChange(newPage) {
    console.log("NewPage:", newPage);
    setPagination({
      ...pagination,
      offset: +newPage,
    });
  }
  return (
    <div className='app'>
      <h1>Article List - Postman</h1>
      {isLoad ? (
        <h2>Fetching data ...</h2>
      ) : (
        <ListArticles list={listArticle} />
      )}

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
