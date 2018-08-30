import React from "react";
import { sortBy } from "lodash";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaUp,
  faSortAmountUp,
  faSortAmountDown,
  faSortAlphaDown
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Button from "../Button";
import PropTypes from "prop-types";
import "./index.css";

// Loading Indicator
library.add(faSortAlphaDown);
library.add(faSortAlphaUp);
library.add(faSortAmountDown);
library.add(faSortAmountUp);

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

// Sort Component
const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  // const sortClass = ['sort-button'];
  // if (sortKey === activeSortKey) {
  //     sortClass.push('sort-active')
  // }
  // className={sortClass.join(' ')}
  const sortClass = classNames("sort-button", {
    "sort-active": sortKey === activeSortKey
  });

  return (
    <button className={sortClass} onClick={() => onSort(sortKey)}>
      {children}
    </button>
  );
};

//Table Functional stateless Component
const Table = ({
  list,
  sortKey,
  isSortReverse,
  onSort,
  pattern,
  onDismiss
}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="table">
      {/* Table header */}
      <div className="table-header">
        <span style={{ width: "40%" }}>
          <Sort sortKey={"TITLE"} onSort={onSort} activeSortKey={sortKey}>
            Title{" "}
            {isSortReverse ? (
              <FontAwesomeIcon icon="sort-alpha-up" className="sort-icon" />
            ) : (
              <FontAwesomeIcon icon="sort-alpha-down" className="sort" />
            )}
          </Sort>
        </span>
        <span style={{ width: "20%" }}>
          <Sort sortKey={"AUTHOR"} onSort={onSort} activeSortKey={sortKey}>
            Author{" "}
            
            {isSortReverse ? (
              <FontAwesomeIcon icon="sort-alpha-up" className="sort-icon" />
            ) : (
              <FontAwesomeIcon icon="sort-alpha-down" className="sort" />
            )}
          </Sort>
        </span>
        <span style={{ width: "15%" }}>
          <Sort sortKey={"COMMENTS"} onSort={onSort} activeSortKey={sortKey}>
            Comments{" "}
            {isSortReverse ? (
              <FontAwesomeIcon icon="sort-amount-up" className="sort-icon" />
            ) : (
              <FontAwesomeIcon icon="sort-amount-down" className="sort" />
            )}
          </Sort>
        </span>
        <span style={{ width: "15%" }}>
          <Sort sortKey={"POINTS"} onSort={onSort} activeSortKey={sortKey}>
            Points{" "}
            {isSortReverse ? (
              <FontAwesomeIcon icon="sort-amount-up" className="sort-icon" />
            ) : (
              <FontAwesomeIcon icon="sort-amount-down" className="sort" />
            )}
          </Sort>
        </span>
        <span style={{ width: "10%" }}>&nbsp;</span>
      </div>
      {/* Table header ends here */}

      {reverseSortedList.map(item => {
        return (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "40%" }}>
              <a className="title" href={item.url}>
                {item.title}
              </a>
            </span>
            <span style={{ width: "20%" }}>{item.author}</span>
            <span style={{ width: "15%" }}>{item.num_comments} comments</span>
            <span style={{ width: "15%" }}>{item.points} points</span>
            <span style={{ width: "10%" }}>
              <Button onClick={() => onDismiss(item.objectID)} className="">
                Dismiss
              </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Adding proptypes
Table.PropTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
