import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

//Search Functional stateless Component
/*
const Search = ({value, onChange, onSubmit, children}) =>
    let input;
    <form onSubmit={onSubmit}>
        {children}
        <input type="text"
               value={value}
               onChange={onChange}
               ref= {(node) => input = node }
        />
        <button type="submit">{children}</button>
    </form>

*/

// Refactor Stateless Component to Class Component in order to ref DOM
class Search extends Component {
    componentDidMount() {
        if(this.input) {
            this.input.focus();
        }
    }
  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        {children}
        <input type="text" value={value} onChange={onChange}
            ref={(node) => { this.input = node}}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

Search.PropTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Search;
