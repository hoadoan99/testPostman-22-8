/** @format */

import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./TestPostman.scss";
import api from "../../configApi";

ListArticles.propTypes = {
  list: PropTypes.array,
  onItemClick: PropTypes.func,
  setIsCheckRenderFavorite: PropTypes.func,
};
ListArticles.defaultProps = {
  list: [],
  onItemClick: null,
  setIsCheckRenderFavorite: null,
};

function ListArticles(props) {
  const { list, onItemClick, setIsCheckRenderFavorite } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorited = (item) => {
    console.log("item", item);
    let { favorited, favoritesCount, slug } = item;

    if (!favorited) {
      setIsLoading(true);
      api
        .post(`articles/${slug}/favorite`)
        .then(() => {
          setIsLoading(false);
          setIsCheckRenderFavorite(true);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      api
        .delete(`articles/${slug}/favorite`)
        .then(() => {
          setIsCheckRenderFavorite(true);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  console.log(list, onItemClick);
  return (
    <div className='list'>
      {list.length >= 1 &&
        list.map((item, index) => {
          return (
            <Fragment key={index}>
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
                      <button
                        className={`${item.favorited ? "btn-f" : ""} `}
                        onClick={() => handleFavorited(item)}
                      >
                        🤍{item.favoritesCount}
                      </button>
                    </div>
                  </div>
                  <div className='mid_post'>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                  <div className='bottom_post'>
                    <div className='readmore'>Readmore...</div>
                    <div className='taglist'>
                      {item.tagList.map((list, index) => {
                        return (
                          <div className='tag' key={index}>
                            {list}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      {!list?.length && <h2>Không có data</h2>}
    </div>
  );
}

export default ListArticles;
