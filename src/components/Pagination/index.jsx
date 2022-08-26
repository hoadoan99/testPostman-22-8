/** @format */

import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { offset, limit, articleCount } = pagination;

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div className='pagination'>
      <button
        className='btn-prev'
        disabled={offset <= 0}
        onClick={() => handlePageChange(offset - 1)}
      >
        Prev
      </button>
      {offset}
      <button
        className='btn-next'
        disabled={articleCount === 0}
        onClick={() => handlePageChange(offset + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
