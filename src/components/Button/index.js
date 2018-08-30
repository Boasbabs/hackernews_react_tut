import React from "react";
import PropTypes from "prop-types";
import "./index.css";

//Button Functional stateless Component
const Button = ({ onClick, className, children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

Button.defaultProps = {
    className: '',
};

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;
