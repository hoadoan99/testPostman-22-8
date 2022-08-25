/** @format */

import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import TestPostman from "./components/TestPostman";
import Pagination from "./components/Pagination";

// import ColorBox from "./components/ColorBox";
function App() {
  const [listArticle, setListArticle] = useState([]);
  const [pagination, setPagination] = useState({
    offset: 1,
    limit: 10,
    articleCount: 3,
  });
  const [filter, setFilter] = useState({
    limit: 10,
    offset: 1,
  });
  // useEffect(() => {
  //   async function fetchArticleList() {
  //     try {
  //       const paramsString = queryString.stringify(filter);
  //       const requestUrl = `https://api.realworld.io/api/articles/?${paramsString}`;
  //       const response = await fetch(requestUrl);
  //       const responseJSON = await response.json();
  //       const { data, pagination } = responseJSON;
  //       setListArticle(data.articles);
  //       setPagination(pagination);
  //     } catch (error) {
  //       console.log("Failed to call data!", error.message);
  //     }
  //   }
  //   fetchArticleList();
  // }, [filter]);

  useEffect(() => {
    const getData = async () => {
      const paramsString = queryString.stringify(filter);
      const requestUrl = `https://api.realworld.io/api/articles/?${paramsString}`;
      const data = await axios.get(requestUrl);
      const pagination = await axios.get(requestUrl);
      setListArticle(data.data.articles);
      // setPagination(pagination);
    };
    getData();
  }, [filter]);
  function handlePageChange(newPage) {
    setFilter({
      ...filter,
      offset: newPage,
    });
  }
  return (
    <div className="app">
      <h1>Article List - Postman</h1>
      <TestPostman list={listArticle} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
