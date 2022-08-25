/** @format */

import React from "react";
import PropTypes from "prop-types";
import "./TestPostman.scss";
ListArticles.propTypes = {
  list: PropTypes.array,
  onItemClick: PropTypes.func,
};
ListArticles.defaultProps = {
  list: [],
  onItemClick: null,
};

function ListArticles(props) {
  const { list, onItemClick } = props;

  console.log(list, onItemClick);
  return (
    <div className='list'>
      {list.length > 0 &&
        list.map((item) => {
          return (
            <div className='item'>
              <div className='post' key={item.key}>
                <div className='top_post'>
                  <div className='top_post-left'>
                    <img
                      src={item.author.image}
                      alt=''
                      className='img-avatar'
                    />
                    <div className='group-info'>
                      <h3>{item.author.username}</h3>
                      <div className='date'>{item.createdAt}</div>
                    </div>
                  </div>
                  <div className='favorite'>
                    <button className='btn-f'>🤍{item.favoritesCount}</button>
                  </div>
                </div>
                <div className='mid_post'>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className='bottom_post'>
                  <div className='readmore'>Readmore...</div>
                  <div className='taglist'>
                    {item.tagList.map((list) => {
                      return <div className='tag'>{list}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {list.length <= 0 && <h2>No Data</h2>}
    </div>
  );
}

export default ListArticles;
