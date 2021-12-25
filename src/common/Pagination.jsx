import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import PropType from "prop-type";

class Pagination extends React.Component {
  createPaginationElements = () => {
    // get parent props
    const { pageSize, currentPage, onPageChange } = this.props;
    const itemsCount = this.props.itemsCount;
    // calculate the number of pages based on the total movies and the page size
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    return _.range(1, pageCount + 1).map((i) => {
      return (
        <li key={i} className="page-item">
          <a
            className={
              i === currentPage ? "page-link text-danger" : "page-link"
            }
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="">
        <ul className="pagination">{this.createPaginationElements()}</ul>
      </div>
    );
  }
}

export default Pagination;
